import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { StudentRegistration, RegistrationStatus } from '../types';

// Inisialisasi Database App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inisialisasi Firestore Database
let firestoreInstance;
try {
  if (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)') {
    firestoreInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  } else {
    firestoreInstance = getFirestore(app);
  }
} catch {
  firestoreInstance = getFirestore(app);
}
export const db = firestoreInstance;

export const REGISTRATIONS_COLLECTION = 'student_registrations';

/**
 * Mendaftarkan siswa baru ke Database
 * Status awal selalu 'pending' (menunggu review admin)
 */
export async function registerStudentInFirebase(data: {
  fullName: string;
  email: string;
  schoolOrClass: string;
  phone?: string;
  password?: string;
  avatar: string;
  motivation?: string;
}): Promise<{ success: boolean; message: string; registrationId?: string; data?: StudentRegistration }> {
  try {
    const normalizedEmail = data.email.trim().toLowerCase();
    
    // Cek apakah email sudah pernah terdaftar
    const q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where('email', '==', normalizedEmail)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const existingDoc = querySnapshot.docs[0];
      const existingData = existingDoc.data() as StudentRegistration;
      if (existingData.status === 'pending') {
        return {
          success: false,
          message: `Email "${data.email}" sudah pernah didaftarkan dan saat ini sedang menunggu persetujuan (Pending) oleh Guru/Admin.`
        };
      } else if (existingData.status === 'approved') {
        return {
          success: false,
          message: `Email "${data.email}" sudah disetujui sebelumnya. Silakan langsung masuk di tab "Masuk Siswa".`
        };
      } else {
        return {
          success: false,
          message: `Email "${data.email}" sudah terdaftar sebelumnya. Silakan hubungi guru pembina.`
        };
      }
    }

    const newRecord: Omit<StudentRegistration, 'id'> = {
      fullName: data.fullName.trim(),
      email: normalizedEmail,
      schoolOrClass: data.schoolOrClass.trim(),
      phone: data.phone?.trim() || '',
      password: data.password || '',
      avatar: data.avatar || 'bot_neon',
      motivation: data.motivation?.trim() || 'Ingin belajar membuat game dan koding Scratch',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, REGISTRATIONS_COLLECTION), newRecord);
    
    return {
      success: true,
      message: 'Pendaftaran berhasil dikirim! Akun Anda sedang menunggu verifikasi dari Admin/Guru.',
      registrationId: docRef.id,
      data: { id: docRef.id, ...newRecord }
    };
  } catch (error: any) {
    console.error('Error registerStudentInFirebase:', error);
    return {
      success: false,
      message: error?.message || 'Gagal mendaftar ke database. Periksa koneksi internet.'
    };
  }
}

/**
 * Login siswa dengan email & password yang telah didaftarkan
 * Memeriksa status persetujuan dari Admin:
 * - Jika status == 'approved' -> Berhasil login, dapat langsung belajar
 * - Jika status == 'pending' -> Menolak login dengan pesan ramah akun belum disetujui
 * - Jika status == 'rejected' -> Menolak login dengan alasan penolakan
 */
export async function loginStudentWithFirebase(
  emailOrId: string,
  pass: string
): Promise<{
  success: boolean;
  message: string;
  status?: RegistrationStatus;
  registration?: StudentRegistration;
}> {
  try {
    const normalizedInput = emailOrId.trim().toLowerCase();
    
    // Cari pendaftaran berdasarkan email
    const q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where('email', '==', normalizedInput)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        success: false,
        message: 'Akun dengan email tersebut belum terdaftar. Silakan daftar terlebih dahulu di tab "Daftar Siswa Baru".'
      };
    }

    const docSnap = querySnapshot.docs[0];
    const student = { id: docSnap.id, ...docSnap.data() } as StudentRegistration;

    // Cek password jika pendaftar mengisi password
    if (student.password && student.password !== pass.trim()) {
      return {
        success: false,
        message: 'Kata sandi yang dimasukkan salah. Silakan periksa kembali.'
      };
    }

    // Evaluasi Status Persetujuan Admin
    if (student.status === 'pending') {
      return {
        success: false,
        status: 'pending',
        registration: student,
        message: 'Akun Anda sedang dalam antrean review oleh Guru Pembina / Admin (Status: Pending). Mohon menunggu hingga disetujui.'
      };
    }

    if (student.status === 'rejected') {
      return {
        success: false,
        status: 'rejected',
        registration: student,
        message: `Pendaftaran Anda belum disetujui oleh admin.${
          student.rejectionReason ? ` Catatan: "${student.rejectionReason}"` : ''
        }`
      };
    }

    // Status 'approved' -> Sukses login!
    return {
      success: true,
      status: 'approved',
      registration: student,
      message: 'Login berhasil! Selamat belajar di DJuragan Coding.'
    };
  } catch (error: any) {
    console.error('Error loginStudentWithFirebase:', error);
    return {
      success: false,
      message: 'Terjadi kendala saat menghubungkan ke database.'
    };
  }
}

/**
 * Cek status pendaftaran spesifik berdasarkan email
 */
export async function checkStudentStatusByEmail(
  email: string
): Promise<{ found: boolean; registration?: StudentRegistration; message?: string }> {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where('email', '==', normalizedEmail)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { found: false, message: 'Email tidak ditemukan dalam antrean pendaftaran.' };
    }

    const docSnap = querySnapshot.docs[0];
    return {
      found: true,
      registration: { id: docSnap.id, ...docSnap.data() } as StudentRegistration
    };
  } catch (error: any) {
    console.error('Error checkStudentStatusByEmail:', error);
    return { found: false, message: 'Gagal mengecek status pendaftaran.' };
  }
}

/**
 * Realtime Listener untuk Admin Panel:
 * Setiap ada siswa yang mendaftar atau berubah statusnya, callback langsung dipanggil
 */
export function subscribeToRegistrations(
  onUpdate: (registrations: StudentRegistration[]) => void,
  onError?: (err: any) => void
) {
  try {
    const q = query(
      collection(db, REGISTRATIONS_COLLECTION)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const list: StudentRegistration[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as StudentRegistration);
        });
        
        // Urutkan pendaftaran terbaru di atas
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onUpdate(list);
      },
      (error) => {
        console.error('Firestore onSnapshot error:', error);
        if (onError) onError(error);
      }
    );
  } catch (err) {
    console.error('Failed to initiate subscribeToRegistrations:', err);
    return () => {};
  }
}

/**
 * Admin: Menyetujui pendaftaran siswa (Approve)
 * Setelah di-approve, siswa dapat langsung login dan belajar
 */
export async function approveStudentRegistration(
  registrationId: string,
  adminName: string = 'Pak Guru Bajuri (Admin)'
): Promise<{ success: boolean; message: string }> {
  try {
    const docRef = doc(db, REGISTRATIONS_COLLECTION, registrationId);
    await updateDoc(docRef, {
      status: 'approved',
      approvedAt: new Date().toISOString(),
      approvedBy: adminName,
      updatedAt: new Date().toISOString()
    });
    return { success: true, message: 'Siswa berhasil disetujui! Siswa kini dapat langsung login dan belajar.' };
  } catch (error: any) {
    console.error('Error approving student:', error);
    return { success: false, message: error?.message || 'Gagal menyetujui siswa di database.' };
  }
}

/**
 * Admin: Menolak pendaftaran siswa (Reject) dengan catatan alasan
 */
export async function rejectStudentRegistration(
  registrationId: string,
  reason: string = 'Data belum lengkap atau siswa tidak terdaftar di kelas mitra'
): Promise<{ success: boolean; message: string }> {
  try {
    const docRef = doc(db, REGISTRATIONS_COLLECTION, registrationId);
    await updateDoc(docRef, {
      status: 'rejected',
      rejectionReason: reason,
      updatedAt: new Date().toISOString()
    });
    return { success: true, message: 'Pendaftaran siswa telah ditolak dengan catatan.' };
  } catch (error: any) {
    console.error('Error rejecting student:', error);
    return { success: false, message: error?.message || 'Gagal menolak pendaftaran di database.' };
  }
}

/**
 * Admin: Menghapus data pendaftaran siswa
 */
export async function deleteStudentRegistration(
  registrationId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const docRef = doc(db, REGISTRATIONS_COLLECTION, registrationId);
    await deleteDoc(docRef);
    return { success: true, message: 'Data pendaftaran siswa berhasil dihapus.' };
  } catch (error: any) {
    console.error('Error deleting student:', error);
    return { success: false, message: error?.message || 'Gagal menghapus pendaftaran di database.' };
  }
}

/**
 * Admin: Seed sample registrations jika database masih baru/kosong
 * Memudahkan pengujian alur persetujuan admin secara instan
 */
export async function seedSampleRegistrationsIfEmpty(): Promise<void> {
  try {
    const snapshot = await getDocs(collection(db, REGISTRATIONS_COLLECTION));
    if (!snapshot.empty) return; // Sudah ada data

    const sampleStudents: Omit<StudentRegistration, 'id'>[] = [
      {
        fullName: 'Alif Kurniawan Pratama',
        email: 'alif.kurniawan@gmail.com',
        schoolOrClass: 'SDN Menteng 01 / Kelas 4A',
        phone: '081234567890',
        password: '123',
        avatar: 'bot_neon',
        motivation: 'Ingin belajar membuat game labirin dan animasi Scratch bersama teman sekelas.',
        status: 'pending',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
      },
      {
        fullName: 'Nadia Safira Putri',
        email: 'nadia.safira@gmail.com',
        schoolOrClass: 'SDIT Al-Hikmah / Kelas 5B',
        phone: '085712345678',
        password: '123',
        avatar: 'ninja_logic',
        motivation: 'Sangat suka menggambar karakter kartun dan ingin belajar menggerakkannya dengan koding visual.',
        status: 'pending',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
      },
      {
        fullName: 'Bima Satria Wijaya',
        email: 'bima.satria@gmail.com',
        schoolOrClass: 'SMP Negeri 1 / Kelas 7C',
        phone: '081987654321',
        password: '123',
        avatar: 'astro_coder',
        motivation: 'Tertarik dengan game dev dan ingin mengikuti kompetisi coding Scratch tingkat kota.',
        status: 'approved',
        approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        approvedBy: 'Pak Guru Bajuri (Admin)',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
      }
    ];

    for (const student of sampleStudents) {
      await addDoc(collection(db, REGISTRATIONS_COLLECTION), student);
    }
    console.log('Sample registrations seeded to Firestore.');
  } catch (err) {
    console.warn('Could not seed sample registrations:', err);
  }
}
