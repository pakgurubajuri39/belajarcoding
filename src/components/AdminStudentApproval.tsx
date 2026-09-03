import React, { useState, useEffect } from 'react';
import {
  UserCheck, CheckCircle2, XCircle, Clock, Search, Filter,
  Phone, Mail, School, Sparkles, Trash2, AlertCircle, Loader2,
  RefreshCw, PlusCircle, ExternalLink, ShieldAlert, Award, MessageSquare
} from 'lucide-react';
import { StudentRegistration, RegistrationStatus } from '../types';
import {
  subscribeToRegistrations,
  approveStudentRegistration,
  rejectStudentRegistration,
  deleteStudentRegistration,
  seedSampleRegistrationsIfEmpty
} from '../lib/firebase';
import { AVATAR_OPTIONS } from '../data/syllabus';

interface AdminStudentApprovalProps {
  adminName?: string;
  onNotification?: (msg: string) => void;
}

export const AdminStudentApproval: React.FC<AdminStudentApprovalProps> = ({
  adminName = 'Pak Guru Bajuri (Admin)',
  onNotification
}) => {
  const [registrations, setRegistrations] = useState<StudentRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<RegistrationStatus | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Action states
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectingStudent, setRejectingStudent] = useState<StudentRegistration | null>(null);
  const [rejectReason, setRejectReason] = useState('Data siswa belum lengkap atau tidak terdaftar di kelas mitra.');

  // Subscribe to real-time updates from Firebase Firestore
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToRegistrations(
      (list) => {
        setRegistrations(list);
        setLoading(false);
      },
      (error) => {
        console.error('Failed to load registrations:', error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const showMsg = (msg: string) => {
    if (onNotification) onNotification(msg);
  };

  const handleApprove = async (student: StudentRegistration) => {
    setProcessingId(student.id);
    try {
      const res = await approveStudentRegistration(student.id, adminName);
      if (res.success) {
        showMsg(`Akun siswa "${student.fullName}" berhasil disetujui! Siswa sekarang dapat langsung masuk & belajar.`);
      } else {
        alert(res.message);
      }
    } catch (err: any) {
      alert('Gagal menyetujui siswa: ' + err?.message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectingStudent) return;
    setProcessingId(rejectingStudent.id);
    try {
      const res = await rejectStudentRegistration(rejectingStudent.id, rejectReason);
      if (res.success) {
        showMsg(`Pendaftaran siswa "${rejectingStudent.fullName}" telah ditolak.`);
        setRejectingStudent(null);
      } else {
        alert(res.message);
      }
    } catch (err: any) {
      alert('Gagal menolak pendaftaran: ' + err?.message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (student: StudentRegistration) => {
    if (window.confirm(`Hapus pendaftaran ${student.fullName}? Data akan dihapus permanen dari database Firebase.`)) {
      setProcessingId(student.id);
      try {
        const res = await deleteStudentRegistration(student.id);
        if (res.success) {
          showMsg(`Data pendaftaran "${student.fullName}" berhasil dihapus.`);
        }
      } catch (err: any) {
        alert('Gagal menghapus: ' + err?.message);
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleSeedDemo = async () => {
    setLoading(true);
    await seedSampleRegistrationsIfEmpty();
    setLoading(false);
    showMsg('Data simulasi pendaftaran siswa berhasil disiapkan!');
  };

  // Metrics
  const pendingCount = registrations.filter(r => r.status === 'pending').length;
  const approvedCount = registrations.filter(r => r.status === 'approved').length;
  const rejectedCount = registrations.filter(r => r.status === 'rejected').length;

  // Filtered List
  const filteredRegistrations = registrations.filter(r => {
    const matchesFilter = filterStatus === 'all' ? true : r.status === filterStatus;
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.schoolOrClass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {pendingCount}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Menunggu Review (Pending)
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {approvedCount}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Siswa Disetujui (Aktif)
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {rejectedCount}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Pendaftaran Ditolak
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {registrations.length}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Seluruh Pendaftar
            </div>
          </div>
        </div>
      </div>

      {/* Action and Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Status Filter Tabs */}
          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                filterStatus === 'pending'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Menunggu ({pendingCount})</span>
            </button>

            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                filterStatus === 'approved'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Disetujui ({approvedCount})</span>
            </button>

            <button
              onClick={() => setFilterStatus('rejected')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                filterStatus === 'rejected'
                  ? 'bg-rose-500 text-white shadow-sm font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Ditolak ({rejectedCount})</span>
            </button>

            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                filterStatus === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Semua ({registrations.length})</span>
            </button>
          </div>

          {/* Search Input & Demo Seed Button */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, email, sekolah..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-amber-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {registrations.length === 0 && (
              <button
                onClick={handleSeedDemo}
                className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap"
                title="Isi database dengan data pendaftar simulasi untuk uji coba"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Simulasi Data Siswa</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Student List */}
      {loading ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Loader2 className="w-8 h-8 mx-auto text-amber-500 animate-spin mb-3" />
          <p className="text-xs text-slate-500">Memuat data pendaftaran dari Firebase Firestore...</p>
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <UserCheck className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Tidak ada pendaftaran ditemukan
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {filterStatus === 'pending'
              ? 'Semua pendaftaran siswa sudah direview. Jika ada siswa baru mendaftar di halaman depan, datanya akan langsung muncul di sini secara real-time.'
              : 'Tidak ada data pendaftaran yang sesuai dengan filter atau pencarian saat ini.'}
          </p>
          {registrations.length === 0 && (
            <button
              onClick={handleSeedDemo}
              className="mt-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold inline-flex items-center gap-2 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat 3 Data Siswa Simulasi untuk Uji Coba</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRegistrations.map((student) => {
            const avatarObj = AVATAR_OPTIONS.find(a => a.id === student.avatar) || AVATAR_OPTIONS[0];
            const isProcessing = processingId === student.id;

            return (
              <div
                key={student.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  student.status === 'pending'
                    ? 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-400/40 dark:border-amber-400/30'
                    : student.status === 'approved'
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                    : 'bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/30'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  
                  {/* Student Basic Info */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                      {avatarObj.emoji}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-black text-slate-900 dark:text-white">
                          {student.fullName}
                        </h3>

                        {/* Status Badge */}
                        {student.status === 'pending' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm">
                            <Clock className="w-3 h-3 animate-pulse" />
                            Menunggu Review
                          </span>
                        )}
                        {student.status === 'approved' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Disetujui
                          </span>
                        )}
                        {student.status === 'rejected' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Ditolak
                          </span>
                        )}
                      </div>

                      {/* Details row: School, Email, Phone */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                          <School className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{student.schoolOrClass}</span>
                        </div>

                        <div className="flex items-center gap-1.5 font-mono">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{student.email}</span>
                        </div>

                        {student.phone && (
                          <a
                            href={`https://wa.me/${student.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
                            title="Kirim pesan WhatsApp ke siswa/wali"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{student.phone}</span>
                          </a>
                        )}

                        <span className="text-[11px] text-slate-400">
                          Daftar: {new Date(student.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Motivation Note */}
                      {student.motivation && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-0.5">
                          "{student.motivation}"
                        </p>
                      )}

                      {/* Approval / Rejection Metadata */}
                      {student.status === 'approved' && student.approvedAt && (
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Disetujui oleh <strong>{student.approvedBy || 'Admin'}</strong> pada {new Date(student.approvedAt).toLocaleString('id-ID')}</span>
                        </div>
                      )}
                      {student.status === 'rejected' && student.rejectionReason && (
                        <div className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 pt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Alasan Penolakan: {student.rejectionReason}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex items-center gap-2 self-end lg:self-center w-full lg:w-auto justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200 dark:border-slate-800">
                    {student.status === 'pending' && (
                      <>
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => handleApprove(student)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50"
                          title="Setujui pendaftaran agar siswa dapat langsung masuk & belajar"
                        >
                          {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                          <span>Setujui Siswa (Approve)</span>
                        </button>

                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => setRejectingStudent(student)}
                          className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                          title="Tolak pendaftaran dengan catatan"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Tolak</span>
                        </button>
                      </>
                    )}

                    {student.status === 'approved' && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Akses Belajar Aktif
                        </span>
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => setRejectingStudent(student)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all text-xs"
                          title="Ubah status menjadi ditolak / tangguhkan"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {student.status === 'rejected' && (
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => handleApprove(student)}
                        className="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                        title="Ubah status dan setujui siswa ini"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Buka Kunci & Setujui</span>
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleDelete(student)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all"
                      title="Hapus data pendaftaran secara permanen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Dialog Alasan Penolakan */}
      {rejectingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Tolak Pendaftaran Siswa</h3>
                <p className="text-xs text-slate-400">{rejectingStudent.fullName} ({rejectingStudent.schoolOrClass})</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Alasan / Catatan Penolakan (Akan tampil pada siswa saat mengecek):
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectingStudent(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Konfirmasi Tolak</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
