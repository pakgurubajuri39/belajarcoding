import { jsPDF } from 'jspdf';
import { StudentProgress, UserSession } from '../types';
import { SYLLABUS_DATA, BADGES_DATA } from '../data/syllabus';
import { getRankFromXp } from './storage';

export function generateStudentProgressPDF(progress: StudentProgress, session: UserSession) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const rankInfo = getRankFromXp(progress.xp);
  const totalLevels = SYLLABUS_DATA.length;
  const completedCount = progress.completedLevelIds.length;
  const completionPercent = Math.round((completedCount / totalLevels) * 100);

  const scoredLevels = Object.keys(progress.levelScores);
  const averageQuizScore = scoredLevels.length > 0
    ? Math.round(scoredLevels.reduce((sum, id) => sum + (progress.levelScores[Number(id)] || 0), 0) / scoredLevels.length)
    : (completedCount > 0 ? 100 : 0);

  const sem1Completed = progress.completedLevelIds.filter(id => id <= 10).length;
  const sem2Completed = progress.completedLevelIds.filter(id => id > 10).length;

  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const timeStr = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const printDate = `${dateStr} • ${timeStr} WIB`;

  // ==========================================
  // HELPER DRAWING FUNCTIONS (Clean & Robust)
  // ==========================================
  const drawStatusPill = (x: number, yPos: number, isCompleted: boolean) => {
    if (isCompleted) {
      doc.setFillColor(236, 253, 245); // emerald-50
      doc.setDrawColor(52, 211, 153); // emerald-400
      doc.roundedRect(x, yPos - 3.8, 20, 5.2, 1.2, 1.2, 'FD');
      doc.setTextColor(5, 150, 105); // emerald-600
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.text('SELESAI', x + 10, yPos - 0.2, { align: 'center' });
    } else {
      doc.setFillColor(241, 245, 249); // slate-100
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.roundedRect(x, yPos - 3.8, 20, 5.2, 1.2, 1.2, 'FD');
      doc.setTextColor(100, 116, 139); // slate-500
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.text('BELUM', x + 10, yPos - 0.2, { align: 'center' });
    }
  };

  // ==========================================
  // PAGE 1: SEMESTER GANJIL & RINGKASAN
  // ==========================================
  // Header Banner Background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 34, 'F');

  // Accent Gold Stripe
  doc.setFillColor(245, 158, 11); // amber-500
  doc.rect(0, 34, 210, 2, 'F');

  // Brand Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('SOBAT KODING', 14, 14);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('Akademi Koding Visual Scratch 3.0 & Computational Thinking', 14, 20);
  doc.text('Kurikulum Standar 20 Modul Terstruktur | Sertifikasi Progres Resmi', 14, 25);

  // Document Title Badge (Top Right)
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.roundedRect(122, 7, 74, 20, 2.5, 2.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('LAPORAN HASIL BELAJAR SISWA', 159, 14, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(224, 231, 255);
  doc.text('DOKUMEN RESMI AKADEMIK', 159, 20, { align: 'center' });

  // Section 1: Student Information Card
  let y = 42;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 34, 2.5, 2.5, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`Nama Siswa: ${session.studentName}`, 20, y + 8);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Peringkat / Gelar: ${rankInfo.title} (Level ${rankInfo.level})`, 20, y + 15);
  doc.text(`Status Akun: ${session.role === 'admin' ? 'Instruktur / Guru' : session.role === 'student' ? 'Siswa Aktif Terdaftar' : 'Akun Tamu (Trial)'}`, 20, y + 21);
  doc.text(`Waktu Cetak: ${printDate}`, 20, y + 27);

  // Metrics Boxes inside Student Info Card (Right Side)
  doc.setFillColor(238, 242, 255); // indigo-50
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(118, y + 4.5, 36, 25, 2, 2, 'FD');
  doc.setTextColor(79, 70, 229);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`${progress.xp.toLocaleString()}`, 136, y + 14, { align: 'center' });
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(99, 102, 241);
  doc.text('TOTAL XP', 136, y + 22, { align: 'center' });

  doc.setFillColor(236, 253, 245); // emerald-50
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(157, y + 4.5, 34, 25, 2, 2, 'FD');
  doc.setTextColor(5, 150, 105);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`${completionPercent}%`, 174, y + 14, { align: 'center' });
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(16, 185, 129);
  doc.text('SELESAI', 174, y + 22, { align: 'center' });

  // Section 2: Summary Stats Grid
  y = 82;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('RINGKASAN CAPAIAN PEMBELAJARAN', 14, y);

  y += 4;
  const statBoxWidth = 43.5;
  const stats = [
    { label: 'Modul Tuntas', value: `${completedCount} / 20 Modul`, color: [79, 70, 229] },
    { label: 'Rata-Rata Kuis', value: `${averageQuizScore}% Nilai`, color: [5, 150, 105] },
    { label: 'Semester Ganjil', value: `${sem1Completed} / 10 Modul`, color: [217, 119, 6] },
    { label: 'Semester Genap', value: `${sem2Completed} / 10 Modul`, color: [190, 24, 93] }
  ];

  stats.forEach((st, idx) => {
    const xPos = 14 + idx * (statBoxWidth + 2.6);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(xPos, y, statBoxWidth, 16, 2, 2, 'FD');

    doc.setFontSize(6.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(st.label, xPos + 4, y + 5.5);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(st.color[0], st.color[1], st.color[2]);
    doc.text(st.value, xPos + 4, y + 12);
  });

  // Section 3: Detailed Syllabus Table (First 10 Levels on Page 1)
  y = 108;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('DAFTAR CAPAIAN MATERI: SEMESTER GANJIL (LEVEL 1 - 10)', 14, y);

  y += 4.5;
  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(14, y, 182, 6.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('LVL', 17, y + 4.5);
  doc.text('JUDUL MODUL KODING', 30, y + 4.5);
  doc.text('KATEGORI', 105, y + 4.5);
  doc.text('STATUS', 140, y + 4.5);
  doc.text('NILAI KUIS', 165, y + 4.5);
  doc.text('XP', 186, y + 4.5);

  y += 6.5;
  for (let i = 0; i < 10; i++) {
    const lvl = SYLLABUS_DATA[i];
    const isCompleted = progress.completedLevelIds.includes(lvl.id);
    const score = progress.levelScores[lvl.id] || (isCompleted ? 100 : 0);

    // Alternate Row Colors
    if (i % 2 === 0) {
      doc.setFillColor(248, 250, 252);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(14, y, 182, 7.2, 'F');
    doc.setDrawColor(241, 245, 249);
    doc.line(14, y + 7.2, 196, y + 7.2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(15, 23, 42);
    doc.text(`#${lvl.id}`, 17, y + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(30, 41, 59);
    const truncatedTitle = lvl.title.length > 38 ? lvl.title.substring(0, 36) + '...' : lvl.title;
    doc.text(truncatedTitle, 30, y + 4.8);

    doc.setTextColor(100, 116, 139);
    doc.text(lvl.category, 105, y + 4.8);

    // Status Pill
    drawStatusPill(138, y + 4.8, isCompleted);

    if (isCompleted) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`${score}%`, 168, y + 4.8);
      doc.setTextColor(217, 119, 6);
      doc.text(`+${lvl.xpReward}`, 186, y + 4.8);
    } else {
      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'normal');
      doc.text('-', 170, y + 4.8);
      doc.text('0', 188, y + 4.8);
    }

    y += 7.2;
  }

  // Page 1 Footer Note
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Halaman 1 dari 2 | Dilanjutkan pada halaman berikutnya untuk Semester Genap & Lencana Prestasi.', 14, 287);
  doc.text('Verifikasi Digital: Sobat-Koding-Valid', 145, 287);

  // ==========================================
  // PAGE 2: SEMESTER GENAP, BADGES, & EVALUASI
  // ==========================================
  doc.addPage('a4', 'portrait');

  // Mini Header Page 2
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 16, 'F');
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 16, 210, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('SOBAT KODING - LAPORAN CAPAIAN SEMESTER GENAP & PRESTASI', 14, 10.5);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`Siswa: ${session.studentName}`, 160, 10.5);

  // Section 4: Detailed Syllabus Table (Semester Genap Level 11 - 20)
  y = 24;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('DAFTAR CAPAIAN MATERI: SEMESTER GENAP (LEVEL 11 - 20)', 14, y);

  y += 4.5;
  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(14, y, 182, 6.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('LVL', 17, y + 4.5);
  doc.text('JUDUL MODUL KODING', 30, y + 4.5);
  doc.text('KATEGORI', 105, y + 4.5);
  doc.text('STATUS', 140, y + 4.5);
  doc.text('NILAI KUIS', 165, y + 4.5);
  doc.text('XP', 186, y + 4.5);

  y += 6.5;
  for (let i = 10; i < 20; i++) {
    const lvl = SYLLABUS_DATA[i];
    const isCompleted = progress.completedLevelIds.includes(lvl.id);
    const score = progress.levelScores[lvl.id] || (isCompleted ? 100 : 0);

    // Alternate Row Colors
    if (i % 2 === 0) {
      doc.setFillColor(248, 250, 252);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(14, y, 182, 7.2, 'F');
    doc.setDrawColor(241, 245, 249);
    doc.line(14, y + 7.2, 196, y + 7.2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(15, 23, 42);
    doc.text(`#${lvl.id}`, 17, y + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(30, 41, 59);
    const truncatedTitle = lvl.title.length > 38 ? lvl.title.substring(0, 36) + '...' : lvl.title;
    doc.text(truncatedTitle, 30, y + 4.8);

    doc.setTextColor(100, 116, 139);
    doc.text(lvl.category, 105, y + 4.8);

    // Status Pill
    drawStatusPill(138, y + 4.8, isCompleted);

    if (isCompleted) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`${score}%`, 168, y + 4.8);
      doc.setTextColor(217, 119, 6);
      doc.text(`+${lvl.xpReward}`, 186, y + 4.8);
    } else {
      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'normal');
      doc.text('-', 170, y + 4.8);
      doc.text('0', 188, y + 4.8);
    }

    y += 7.2;
  }

  // Section 5: Badges Showcase (8 Badges in 2 columns x 4 rows)
  y += 6;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`LENCANA PRESTASI SISWA (${progress.unlockedBadges.length} DARI 8 TELAH DIRAIH)`, 14, y);

  y += 4;
  const badgeCardWidth = 89;
  BADGES_DATA.forEach((b, idx) => {
    const isUnlocked = progress.unlockedBadges.includes(b.id);
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const bx = 14 + col * (badgeCardWidth + 4);
    const by = y + row * 14.5;

    if (isUnlocked) {
      doc.setFillColor(254, 243, 199); // amber-100
      doc.setDrawColor(245, 158, 11); // amber-500
      doc.roundedRect(bx, by, badgeCardWidth, 12.8, 1.8, 1.8, 'FD');

      // Draw Unlocked Star Vector Icon
      doc.setFillColor(245, 158, 11);
      doc.circle(bx + 5.5, by + 6.4, 2.8, 'F');
      doc.setFillColor(255, 255, 255);
      doc.circle(bx + 5.5, by + 6.4, 1.2, 'F');

      // Badge Name & Label
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(180, 83, 9); // amber-800
      doc.text(b.name, bx + 11, by + 5);

      doc.setFillColor(245, 158, 11);
      doc.roundedRect(bx + badgeCardWidth - 21, by + 2.2, 18, 4.2, 1, 1, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(5.5);
      doc.text('DIRAIH', bx + badgeCardWidth - 12, by + 5.1, { align: 'center' });

      // Badge Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(120, 53, 15);
      const desc = b.description.length > 48 ? b.description.substring(0, 46) + '...' : b.description;
      doc.text(desc, bx + 11, by + 9.5);
    } else {
      doc.setFillColor(248, 250, 252); // slate-50
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(bx, by, badgeCardWidth, 12.8, 1.8, 1.8, 'FD');

      // Draw Locked Circle Vector Icon
      doc.setFillColor(203, 213, 225);
      doc.circle(bx + 5.5, by + 6.4, 2.5, 'F');

      // Badge Name & Label
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(b.name, bx + 11, by + 5);

      doc.setFillColor(241, 245, 249);
      doc.roundedRect(bx + badgeCardWidth - 23, by + 2.2, 20, 4.2, 1, 1, 'F');
      doc.setTextColor(148, 163, 184);
      doc.setFontSize(5.5);
      doc.text('TERKUNCI', bx + badgeCardWidth - 13, by + 5.1, { align: 'center' });

      // Badge Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(148, 163, 184);
      const desc = b.description.length > 48 ? b.description.substring(0, 46) + '...' : b.description;
      doc.text(desc, bx + 11, by + 9.5);
    }
  });

  // Section 6: Official Evaluation & Signature Block
  y += 62;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 38, 2.5, 2.5, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('Catatan & Evaluasi Pembelajaran:', 20, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  const evaluationNote = completedCount === 20
    ? 'Siswa telah berhasil menuntaskan seluruh 20 Modul Kurikulum Sobat Koding dengan capaian istimewa, menguasai logika algoritma, pembuatan game, variabel, koordinat, dan dasar kecerdasan buatan Scratch.'
    : completedCount >= 10
    ? `Siswa menunjukkan dedikasi yang sangat baik dengan menuntaskan ${completedCount} modul. Terus tingkatkan latihan pembuatan game dan logika komputasional untuk meraih gelar Grandmaster Coder!`
    : `Siswa telah aktif memulai pembelajaran dan meraih ${progress.xp.toLocaleString()} XP. Disarankan untuk rutin berlatih 15 menit per hari agar kemampuan computational thinking berkembang maksimal.`;

  const splitNote = doc.splitTextToSize(evaluationNote, 105);
  doc.text(splitNote, 20, y + 13.5);

  // Signature Block on Right Side
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Disahkan Oleh:', 142, y + 6.5);
  doc.text('Instruktur Utama Sobat Koding', 142, y + 11);

  // Digital Signature Stamp Pill
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(79, 70, 229);
  doc.roundedRect(140, y + 14, 48, 14, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(79, 70, 229);
  doc.text('TERVERIFIKASI RESMI', 164, y + 20.5, { align: 'center' });
  doc.setFontSize(6.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(99, 102, 241);
  doc.text('Akademi Sobat Koding', 164, y + 25, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Pak GuruAI & Tim Pembina', 142, y + 33.5);

  // Page 2 Footer
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Halaman 2 dari 2 | Dokumen ini adalah laporan progres resmi yang di-generate dari platform Sobat Koding.', 14, 287);
  doc.text('Copyright by Pak GuruAI', 162, 287);

  // Trigger Save / Download
  const sanitizedName = (session.studentName || 'Siswa').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Laporan_Progres_Coding_${sanitizedName}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
