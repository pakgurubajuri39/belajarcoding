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

  const printDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // PAGE 1: Header & Profile & Summary Matrix
  // Header background banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 36, 'F');

  // Accent Gold Stripe
  doc.setFillColor(245, 158, 11); // amber-500
  doc.rect(0, 36, 210, 2, 'F');

  // Brand Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('DJURAGAN CODING', 14, 15);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('Akademi Koding Visual Scratch 3.0 & Computational Thinking', 14, 21);
  doc.text('Kurikulum Standar 20 Modul Terstruktur • Sertifikasi Digital', 14, 26);

  // Document Title Pill on right
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.roundedRect(125, 8, 72, 20, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('LAPORAN HASIL BELAJAR', 161, 16, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('PROGRES SISWA RESMI', 161, 22, { align: 'center' });

  // Section 1: Student Information Card
  let y = 46;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 38, 3, 3, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Nama Siswa: ${session.studentName}`, 20, y + 9);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Peringkat / Gelar: ${rankInfo.title} (Level ${rankInfo.level})`, 20, y + 17);
  doc.text(`Status Akses: ${session.role === 'admin' ? 'Instruktur / Guru' : session.role === 'student' ? 'Siswa Aktif Terdaftar' : 'Akun Tamu (Trial)'}`, 20, y + 24);
  doc.text(`Tanggal Cetak: ${printDate} WIB`, 20, y + 31);

  // Metrics Boxes inside Student Info Card
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(120, y + 5, 34, 28, 2, 2, 'F');
  doc.setTextColor(79, 70, 229);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`${progress.xp.toLocaleString()}`, 137, y + 16, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('TOTAL XP', 137, y + 24, { align: 'center' });

  doc.setFillColor(236, 253, 245);
  doc.roundedRect(158, y + 5, 34, 28, 2, 2, 'F');
  doc.setTextColor(16, 185, 129);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`${completionPercent}%`, 175, y + 16, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('SELESAI', 175, y + 24, { align: 'center' });

  // Section 2: Summary Stats Grid
  y = 90;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('RINGKASAN CAPAIAN PEMBELAJARAN', 14, y);

  y += 5;
  const statBoxWidth = 43.5;
  const stats = [
    { label: 'Modul Selesai', value: `${completedCount} / 20 Modul`, color: [79, 70, 229] },
    { label: 'Rata-Rata Kuis', value: `${averageQuizScore}% Nilai`, color: [16, 185, 129] },
    { label: 'Semester Ganjil', value: `${sem1Completed} / 10 Modul`, color: [245, 158, 11] },
    { label: 'Semester Genap', value: `${sem2Completed} / 10 Modul`, color: [236, 72, 153] }
  ];

  stats.forEach((st, idx) => {
    const xPos = 14 + idx * (statBoxWidth + 2.6);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(xPos, y, statBoxWidth, 18, 2, 2, 'FD');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(st.label, xPos + 4, y + 6);

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(st.color[0], st.color[1], st.color[2]);
    doc.text(st.value, xPos + 4, y + 13);
  });

  // Section 3: Detailed Syllabus Table (First 10 Levels on Page 1)
  y = 120;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('DAFTAR CAPAIAN MATERI: SEMESTER GANJIL (LEVEL 1 - 10)', 14, y);

  y += 5;
  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(14, y, 182, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('LVL', 17, y + 5);
  doc.text('JUDUL MODUL KODING', 30, y + 5);
  doc.text('KATEGORI', 105, y + 5);
  doc.text('STATUS', 142, y + 5);
  doc.text('NILAI KUIS', 165, y + 5);
  doc.text('XP', 186, y + 5);

  y += 7;
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
    doc.rect(14, y, 182, 7.5, 'F');
    doc.setDrawColor(241, 245, 249);
    doc.line(14, y + 7.5, 196, y + 7.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`#${lvl.id}`, 17, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    const truncatedTitle = lvl.title.length > 38 ? lvl.title.substring(0, 36) + '...' : lvl.title;
    doc.text(truncatedTitle, 30, y + 5);

    doc.setTextColor(100, 116, 139);
    doc.text(lvl.category, 105, y + 5);

    if (isCompleted) {
      doc.setTextColor(16, 185, 129);
      doc.setFont('helvetica', 'bold');
      doc.text('✓ SELESAI', 142, y + 5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${score}%`, 168, y + 5);
      doc.setTextColor(245, 158, 11);
      doc.text(`+${lvl.xpReward}`, 186, y + 5);
    } else {
      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'normal');
      doc.text('Belum Selesai', 142, y + 5);
      doc.text('-', 170, y + 5);
      doc.text('0', 189, y + 5);
    }

    y += 7.5;
  }

  // Page 1 Footer Note
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(148, 163, 184);
  doc.text('Halaman 1 dari 2 • Dilanjutkan pada halaman berikutnya untuk Semester Genap & Lencana Prestasi.', 14, 287);
  doc.text('Verifikasi Digital: DJuragan-Progress-Valid', 150, 287);

  // ==========================================
  // PAGE 2: Semester Genap (Level 11-20) & Badges & Signature
  // ==========================================
  doc.addPage('a4', 'portrait');

  // Mini Header Page 2
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 18, 'F');
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 18, 210, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('DJURAGAN CODING • LAPORAN CAPAIAN SEMESTER GENAP & PRESTASI', 14, 12);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Siswa: ${session.studentName}`, 160, 12);

  // Section 4: Detailed Syllabus Table (Semester Genap Level 11 - 20)
  y = 28;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('DAFTAR CAPAIAN MATERI: SEMESTER GENAP (LEVEL 11 - 20)', 14, y);

  y += 5;
  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(14, y, 182, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('LVL', 17, y + 5);
  doc.text('JUDUL MODUL KODING', 30, y + 5);
  doc.text('KATEGORI', 105, y + 5);
  doc.text('STATUS', 142, y + 5);
  doc.text('NILAI KUIS', 165, y + 5);
  doc.text('XP', 186, y + 5);

  y += 7;
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
    doc.rect(14, y, 182, 7.5, 'F');
    doc.setDrawColor(241, 245, 249);
    doc.line(14, y + 7.5, 196, y + 7.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`#${lvl.id}`, 17, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    const truncatedTitle = lvl.title.length > 38 ? lvl.title.substring(0, 36) + '...' : lvl.title;
    doc.text(truncatedTitle, 30, y + 5);

    doc.setTextColor(100, 116, 139);
    doc.text(lvl.category, 105, y + 5);

    if (isCompleted) {
      doc.setTextColor(16, 185, 129);
      doc.setFont('helvetica', 'bold');
      doc.text('✓ SELESAI', 142, y + 5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${score}%`, 168, y + 5);
      doc.setTextColor(245, 158, 11);
      doc.text(`+${lvl.xpReward}`, 186, y + 5);
    } else {
      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'normal');
      doc.text('Belum Selesai', 142, y + 5);
      doc.text('-', 170, y + 5);
      doc.text('0', 189, y + 5);
    }

    y += 7.5;
  }

  // Section 5: Badges Unlocked Showcase
  y += 8;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`LENCANA PRESTASI SISWA (${progress.unlockedBadges.length} DARI 8 DIRAマジ/DIRAIH)`, 14, y);

  y += 5;
  const badgeCardWidth = 89;
  BADGES_DATA.forEach((b, idx) => {
    const isUnlocked = progress.unlockedBadges.includes(b.id);
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const bx = 14 + col * (badgeCardWidth + 4);
    const by = y + row * 16;

    if (isUnlocked) {
      doc.setFillColor(254, 243, 199); // amber-100
      doc.setDrawColor(245, 158, 11); // amber-500
    } else {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
    }
    doc.roundedRect(bx, by, badgeCardWidth, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(isUnlocked ? 180 : 100, isUnlocked ? 83 : 116, isUnlocked ? 9 : 139);
    doc.text(`${isUnlocked ? '★' : '○'} ${b.name}`, bx + 4, by + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(71, 85, 105);
    const desc = b.description.length > 50 ? b.description.substring(0, 48) + '...' : b.description;
    doc.text(desc, bx + 4, by + 10);
  });

  // Section 6: Official Evaluation & Signature Block
  y += 72;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 42, 3, 3, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Catatan & Evaluasi Pembelajaran:', 20, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const evaluationNote = completedCount === 20
    ? 'Siswa telah berhasil menuntaskan seluruh 20 Modul Kurikulum DJuragan Coding dengan capaian istimewa, menguasai logika algoritma, pembuatan game, variabel, koordinat, dan dasar kecerdasan buatan Scratch.'
    : completedCount >= 10
    ? `Siswa menunjukkan dedikasi yang sangat baik dengan menuntaskan ${completedCount} modul. Terus tingkatkan latihan pembuatan game dan logika komputasional untuk meraih gelar Grandmaster Coder!`
    : `Siswa telah aktif memulai pembelajaran dan meraih ${progress.xp.toLocaleString()} XP. Disarankan untuk rutin berlatih 15 menit per hari agar kemampuan computational thinking berkembang maksimal.`;

  const splitNote = doc.splitTextToSize(evaluationNote, 105);
  doc.text(splitNote, 20, y + 14);

  // Signature Block on Right
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Disahkan Oleh:', 145, y + 7);
  doc.text('Instruktur Utama DJuragan Coding', 145, y + 12);

  // Digital Signature Stamp
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(79, 70, 229);
  doc.roundedRect(143, y + 16, 45, 15, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(79, 70, 229);
  doc.text('TERVERIFIKASI', 165.5, y + 23, { align: 'center' });
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Pak GuruAI Academy', 165.5, y + 28, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Tim Pembina Coding', 145, y + 37);

  // Page 2 Footer
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(148, 163, 184);
  doc.text('Halaman 2 dari 2 • Dokumen ini adalah laporan progres resmi yang di-generate dari platform DJuragan Coding.', 14, 287);
  doc.text('@copyright by Pak GuruAI', 165, 287);

  // Save / Trigger Download
  const sanitizedName = session.studentName.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Laporan_Progres_Coding_${sanitizedName}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
