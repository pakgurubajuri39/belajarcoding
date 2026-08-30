import { SyllabusLevel, Badge } from '../types';

export const SYLLABUS_DATA: SyllabusLevel[] = [
  // ==========================================
  // SEMESTER GANJIL (LEVEL 01 - 10)
  // ==========================================
  {
    id: 1,
    semester: 1,
    semesterLevel: 1,
    title: 'Mengenal Bagian Menu Scratch',
    topics: ['Menu Utama', 'Menu Perintah', 'Ruang Kerja (Workspace)'],
    indicator: 'Siswa mampu mengidentifikasi dan menjelaskan fungsi-fungsi utama pada menu Scratch 3.0',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 150,
    iconName: 'Layout',
    category: 'Foundation',
    summary: 'Mengenal antarmuka Scratch 3.0: Stage, Sprite List, Block Palette, Scripts Area, Toolbar, dan Tutorial terintegrasi.',
    conceptExplanation: 'Scratch adalah platform coding visual berbasis blok yang dikembangkan oleh MIT Media Lab. Di sini kita memprogram dengan menyusun blok-blok kode warna-warni seperti puzzle tanpa takut salah ketik (syntax error). Setiap warna blok memiliki fungsi spesifik, memudahkan kita mengorganisasi logika animasi dan game.',
    learningGoals: [
      'Mengenal 3 area kerja utama: Block Palette, Scripts Area, dan Stage Panggung',
      'Memahami cara menghubungkan blok peristiwa (Events) dengan blok tampilan (Looks)',
      'Mampu menjalankan program pertama dengan tombol Bendera Hijau dan menghentikannya dengan Tombol Merah',
      'Mengganti nama sprite dan melihat animasi frame di tab Costumes'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip 1: Program Pertama Menyapa Dunia',
        spriteName: 'Sprite1 (Kucing)',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'katakan [Halo DJuragan Coder!] selama (3) detik', category: 'Looks', indent: 0 },
          { text: 'mainkan suara [Meow] sampai selesai', category: 'Sound', indent: 0 }
        ],
        explanation: 'Saat bendera hijau ditekan, sprite kucing akan memunculkan balon percakapan selama 3 detik, kemudian memainkan suara Meow.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Sprite tidak bereaksi saat Bendera Hijau diklik.',
        solution: 'Pastikan blok paling atas adalah blok kuning "when green flag clicked" dan blok di bawahnya telah menempel rapat (terdengar bunyi klik).'
      },
      {
        problem: 'Balon teks salam menghilang terlalu cepat.',
        solution: 'Gunakan blok "say [...] for [2] secs" dan atur durasi detik menjadi 3 atau 4 detik, bukan blok "say [...]" tanpa durasi.'
      }
    ],
    summaryPoints: [
      'Stage (Panggung) adalah layar tempat hasil animasi dan game ditampilkan (koordinat X: -240 s/d +240, Y: -180 s/d +180).',
      'Kategori blok dibedakan oleh warna: Biru (Motion), Ungu (Looks), Pink (Sound), Kuning (Events), Oranye (Control).',
      'Tab Costumes digunakan untuk melihat pose/frame gambar sprite guna membuat animasi bergerak.'
    ],
    keyBlocks: [
      { name: 'when green flag clicked', category: 'Events', description: 'Memulai eksekusi program saat bendera hijau ditekan', color: '#FFBF00' },
      { name: 'say [Halo Dunia!] for [2] secs', category: 'Looks', description: 'Membuat sprite berbicara dengan balon teks selama durasi waktu tertentu', color: '#9966FF' },
      { name: 'play sound [Meow v] until done', category: 'Sound', description: 'Memainkan efek audio hingga suara selesai diputar', color: '#CF63CF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mengenal 3 Area Ruang Kerja',
        instruction: 'Buka Scratch Editor di tab samping. Kenali 3 bagian: Palet Blok di kiri, Lembar Kerja Kode di tengah, dan Panggung Hasil di kanan.',
        hint: 'Perhatikan warna blok: Biru = Gerak, Ungu = Tampilan, Kuning = Peristiwa.',
        blockGuide: 'Events > when green flag clicked'
      },
      {
        stepNumber: 2,
        title: 'Menyusun Program Salam Pertama',
        instruction: 'Tarik blok kuning "when green flag clicked" ke lembar kerja, lalu pasang blok ungu "say [Halo DJuragan Coding!] for [3] secs" tepat di bawahnya.',
        hint: 'Klik bendera hijau di atas panggung untuk menguji hasilnya!',
        blockGuide: 'Looks > say [...] for [3] secs'
      },
      {
        stepNumber: 3,
        title: 'Menambahkan Efek Audio',
        instruction: 'Buka kategori Sound (Pink), tarik blok "play sound [Meow] until done" dan pasang di urutan ketiga.',
        hint: 'Pastikan volume suara komputermu aktif.'
      }
    ],
    quizQuestions: [
      {
        question: 'Bagian manakah di Scratch yang digunakan untuk melihat hasil gerakan dan animasi sprite?',
        options: ['Scripts Area (Lembar Kode)', 'Stage (Panggung Tampilan)', 'Block Palette (Palet Blok)', 'Costume Tab'],
        correctAnswerIndex: 1,
        explanation: 'Stage (Panggung) adalah layar tampilan interaktif tempat seluruh sprite beraksi dan animasi ditampilkan.'
      },
      {
        question: 'Kategori blok warna apakah yang berfungsi sebagai pemicu awal program ketika bendera hijau ditekan?',
        options: ['Motion (Biru)', 'Looks (Ungu)', 'Events (Kuning)', 'Control (Oranye)'],
        correctAnswerIndex: 2,
        explanation: 'Events (Peristiwa) berwarna kuning dan memuat blok pemicu utama seperti "when green flag clicked".'
      }
    ],
    challenge: {
      title: 'Tantangan: Kucing Berpikir & Berganti Kostum',
      description: 'Tambahkan blok "think [Hmm, aku siap belajar coding!] for [2] secs" dan blok "next costume" agar kucing berganti pose kaki!',
      bonusXp: 50,
      tips: ['Cari blok "think" dan "next costume" di kategori Looks (Ungu)']
    }
  },
  {
    id: 2,
    semester: 1,
    semesterLevel: 2,
    title: 'Menyusun dan Menjalankan Perintah',
    topics: ['Start/Stop', 'Sprite', 'Point Toward', 'Algoritma Sekuensial'],
    indicator: 'Siswa mampu menyusun serangkaian perintah menggunakan blok-blok kode sederhana secara berurutan',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 200,
    iconName: 'PlayCircle',
    category: 'Foundation',
    summary: 'Belajar mengeksekusi program berurutan (algoritma sekuensial), mengarahkan sprite dengan Point Toward, dan kontrol Start/Stop.',
    conceptExplanation: 'Komputer bekerja dengan membaca instruksi secara sekuensial (dari baris atas ke baris bawah satu per satu). Memahami urutan eksekusi sangat penting agar sprite tidak melompat sebelum diarahkan atau berbicara sebelum berpindah tempat.',
    learningGoals: [
      'Memahami konsep dasar Algoritma Sekuensial (urutan langkah logis)',
      'Menggunakan blok "point towards [mouse-pointer]" untuk mengarahkan pandangan sprite',
      'Mengatur ritme eksekusi menggunakan blok jeda "wait (1) seconds"',
      'Menghentikan jalannya seluruh skrip dengan blok "stop all"'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Menghadap Mouse dan Meluncur',
        spriteName: 'Sprite1',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'menghadap ke arah [penunjuk-mouse v]', category: 'Motion', indent: 0 },
          { text: 'tunggu (1) detik', category: 'Control', indent: 0 },
          { text: 'gerak (60) langkah', category: 'Motion', indent: 0 },
          { text: 'katakan [Aku melihatmu!] selama (2) detik', category: 'Looks', indent: 0 }
        ],
        explanation: 'Sprite pertama kali menghadap ke kursor mouse, menunggu 1 detik, melangkah maju 60 pixel, lalu berbicara.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Sprite bergerak terlalu cepat sehingga langkahnya tidak terlihat.',
        solution: 'Sisipkan blok "wait (0.5) seconds" di antara blok pergerakan agar mata manusia sempat menangkap transisi posisinya.'
      },
      {
        problem: 'Sprite berputar miring atau terbalik saat menghadap mouse.',
        solution: 'Atur rotation style ke "left-right" menggunakan blok Motion "set rotation style [left-right]".'
      }
    ],
    summaryPoints: [
      'Algoritma sekuensial mengeksekusi blok dari atas ke bawah secara teratur.',
      'Perintah "point towards" berguna untuk menciptakan interaksi di mana karakter bereaksi terhadap posisi pemain.',
      'Blok "stop all" berguna untuk kondisi darurat atau Game Over.'
    ],
    keyBlocks: [
      { name: 'point towards [mouse-pointer v]', category: 'Motion', description: 'Memutar orientasi hadap sprite langsung ke posisi kursor mouse', color: '#4C97FF' },
      { name: 'wait [1] seconds', category: 'Control', description: 'Memberikan jeda waktu sebelum melanjutkan ke perintah baris berikutnya', color: '#FFAB19' },
      { name: 'stop [all v]', category: 'Control', description: 'Menghentikan seluruh eksekusi program di panggung', color: '#FFAB19' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mengarahkan Pandangan Sprite',
        instruction: 'Pasang blok "point towards [mouse-pointer]" di bawah "when green flag clicked". Gerakkan mouse ke sudut lain, lalu klik bendera hijau.',
        hint: 'Perhatikan arah hadap kepala sprite.',
        blockGuide: 'Motion > point towards [mouse-pointer]'
      },
      {
        stepNumber: 2,
        title: 'Menambahkan Langkah dan Jeda',
        instruction: 'Tambahkan blok "wait 1 secs", lalu pasang "move 50 steps" dan "say [Ketemu!] for 2 secs".',
        hint: 'Coba variasikan jarak langkah menjadi 100.'
      }
    ],
    quizQuestions: [
      {
        question: 'Bagaimana cara komputer membaca dan mengeksekusi blok-blok kode di Scratch?',
        options: ['Secara acak / random', 'Dari bawah ke atas', 'Dari atas ke bawah secara berurutan (Sekuensial)', 'Hanya blok berwarna kuning saja'],
        correctAnswerIndex: 2,
        explanation: 'Algoritma komputer membaca instruksi secara sekuensial dari atas ke bawah satu demi satu.'
      }
    ],
    challenge: {
      title: 'Tantangan: Meluncur Mulus (Glide)',
      description: 'Ganti blok "move" dengan blok "glide (1) secs to [mouse-pointer]" agar sprite meluncur dengan mulus ke posisi mouse!',
      bonusXp: 60,
      tips: ['Blok glide ada di kategori Motion berwarna biru']
    }
  },
  {
    id: 3,
    semester: 1,
    semesterLevel: 3,
    title: 'Membuat Sprite Bergerak 1',
    topics: ['Gerakan Memantul', 'Repeat and Forever', 'Looping Dasar'],
    indicator: 'Siswa mampu membuat sprite bergerak dengan menggunakan perintah pergerakan dasar dan perulangan',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 200,
    iconName: 'Repeat',
    category: 'Motion & Loop',
    summary: 'Menggunakan struktur perulangan (Repeat & Forever) serta perintah if on edge, bounce agar sprite memantul otomatis saat menabrak dinding.',
    conceptExplanation: 'Perulangan (Loop) adalah salah satu konsep terpenting dalam ilmu komputer. Daripada menyusun blok "move 10 steps" sebanyak 100 kali, kita cukup membungkusnya dalam satu blok "repeat (100)" atau "forever". Ini membuat kode lebih rapi, efisien, dan dinamis.',
    learningGoals: [
      'Membedakan perulangan terbatas "repeat (N)" dengan perulangan tak terhingga "forever"',
      'Menggunakan blok "if on edge, bounce" agar sprite tidak hilang keluar batas panggung',
      'Mencegah sprite terbalik dengan mengatur gaya rotasi "set rotation style [left-right]"',
      'Mengkombinasikan gerakan dengan animasi kostum langkah kaki ("next costume")'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Patroli Kucing Bolak-Balik',
        spriteName: 'Sprite1',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'atur gaya rotasi [kiri-kanan v]', category: 'Motion', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'gerak (10) langkah', category: 'Motion', indent: 1 },
          { text: 'berikutnya kostum', category: 'Looks', indent: 1 },
          { text: 'jika di pinggir, pantulkan', category: 'Motion', indent: 1 },
          { text: 'tunggu (0.1) detik', category: 'Control', indent: 1 }
        ],
        explanation: 'Loop forever menjalankan 4 perintah di dalamnya berulang kali tanpa henti, menghasilkan animasi kucing berjalan dan memantul bolak-balik.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Kucing berjalan terbalik (kepala di bawah) saat memantul dari dinding kanan.',
        solution: 'Tambahkan blok "set rotation style [left-right]" di awal skrip sebelum perulangan forever.'
      },
      {
        problem: 'Kucing berjalan terlalu cepat seperti kilat.',
        solution: 'Masukkan blok "wait (0.1) seconds" di dalam loop forever agar ada jeda waktu antar-frame kostum.'
      }
    ],
    summaryPoints: [
      'Blok "forever" mengulang perintah di dalamnya tanpa batas waktu sampai tombol Stop ditekan.',
      'Blok "if on edge, bounce" secara otomatis membalikkan arah hadap sprite 180 derajat saat menyentuh tepi panggung.',
      'Kombinasi "move" + "next costume" + "wait 0.1s" adalah rumus standar menciptakan animasi berjalan di Scratch.'
    ],
    keyBlocks: [
      { name: 'forever { ... }', category: 'Control', description: 'Menjalankan semua blok di dalamnya secara terus-menerus tanpa henti', color: '#FFAB19' },
      { name: 'repeat (10) { ... }', category: 'Control', description: 'Mengulang blok di dalamnya sebanyak hitungan angka tertentu', color: '#FFAB19' },
      { name: 'if on edge, bounce', category: 'Motion', description: 'Membalikkan arah hadap sprite otomatis jika menyentuh batas tepi layar', color: '#4C97FF' },
      { name: 'set rotation style [left-right v]', category: 'Motion', description: 'Mengunci sumbu rotasi agar sprite tidak terbalik jungkir balik', color: '#4C97FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membangun Loop Animasi Kaki',
        instruction: 'Tarik blok "forever", lalu masukkan "move 10 steps", "next costume", dan "wait 0.1 secs" ke dalam mulut loop.',
        hint: 'Perhatikan kucing mulai melangkah di tempat.'
      },
      {
        stepNumber: 2,
        title: 'Menambahkan Sensor Pantul Dinding',
        instruction: 'Tambahkan blok "if on edge, bounce" di dalam loop, dan pasang "set rotation style [left-right]" tepat di atas forever.',
        hint: 'Sekarang kucing akan berpatroli bolak-balik dari kiri ke kanan!'
      }
    ],
    quizQuestions: [
      {
        question: 'Blok apakah yang berfungsi mencegah sprite keluar menembus batas tepi panggung Scratch?',
        options: ['move 10 steps', 'if on edge, bounce', 'stop all', 'hide'],
        correctAnswerIndex: 1,
        explanation: 'Blok "if on edge, bounce" mendeteksi tepi panggung dan memantulkan arah gerak sprite.'
      },
      {
        question: 'Apa fungsi dari blok "set rotation style [left-right]"?',
        options: ['Membuat sprite menghilang', 'Menambah kecepatan langkah', 'Mencegah sprite terbalik saat berbalik arah ke kiri', 'Mengubah warna panggung'],
        correctAnswerIndex: 2,
        explanation: 'Gaya rotasi left-right memastikan gambar sprite hanya membalik secara horizontal (kiri/kanan) tanpa terbalik vertikal.'
      }
    ],
    challenge: {
      title: 'Tantangan: Balapan Dua Karakter',
      description: 'Tambahkan sprite kedua (misal: Burung atau Anjing) dan buat keduanya bergerak memantul dengan kecepatan langkah berbeda (misal 8 langkah vs 15 langkah)!',
      bonusXp: 75,
      tips: ['Ubah angka di dalam blok "move (15) steps" untuk karakter yang lebih cepat']
    }
  },
  {
    id: 4,
    semester: 1,
    semesterLevel: 4,
    title: 'Membuat Sprite Bergerak 2',
    topics: ['Go To', 'If then else', 'Koordinat X & Y Dasar'],
    indicator: 'Siswa mampu mengembangkan sprite yang memiliki gerakan lebih kompleks dengan percabangan logika',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 250,
    iconName: 'GitBranch',
    category: 'Motion & Loop',
    summary: 'Percabangan logika dengan "if then else" dan penentuan posisi spesifik (X, Y) menggunakan "go to x: y:".',
    conceptExplanation: 'Logika percabangan (Conditionals) memungkinkan program mengambil keputusan cerdas seperti otak manusia: "JIKA mouse menyentuh sprite MAKA ubah warna, JIKA TIDAK MAKA tetap warna normal". Ini adalah pondasi logika semua game di dunia.',
    learningGoals: [
      'Memahami sistem koordinat kartesius $X$ (horizontal) dan $Y$ (vertikal) di Scratch',
      'Mereset posisi awal sprite dengan blok "go to x: (0) y: (0)"',
      'Menerapkan struktur logika kondisional "if <...> then ... else ..."',
      'Menggunakan sensor sentuhan "touching [mouse-pointer]?" untuk memicu perubahan visual'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Sprite Bunglon Interaktif',
        spriteName: 'Sprite1',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'pergi ke x: (0) y: (0)', category: 'Motion', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'jika <menyentuh [penunjuk-mouse v] ?> maka', category: 'Control', indent: 1 },
          { text: 'ubah efek [warna v] sebesar (25)', category: 'Looks', indent: 2 },
          { text: 'katakan [Kamu menyentuhku!] selama (0.2) detik', category: 'Looks', indent: 2 },
          { text: 'jika tidak', category: 'Control', indent: 1 },
          { text: 'hapus efek grafik', category: 'Looks', indent: 2 }
        ],
        explanation: 'Setiap frame, program mengecek apakah kursor menyentuh sprite. Jika ya, warna berubah; jika tidak, efek grafik direset.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Setiap kali bendera hijau ditekan, sprite tetap berada di posisi terakhir dan tidak kembali ke tempat semula.',
        solution: 'Selalu letakkan blok inisialisasi "go to x: (...) y: (...)" di baris pertama skrip di bawah bendera hijau.'
      },
      {
        problem: 'Perubahan warna hanya terjadi 1 kali lalu macet.',
        solution: 'Pastikan blok "if-then-else" berada di dalam pembungkus "forever", bukan berdiri sendiri.'
      }
    ],
    summaryPoints: [
      'Pusat panggung Scratch berada di koordinat (X: 0, Y: 0). Nilai X bernilai positif ke kanan dan negatif ke kiri. Nilai Y positif ke atas dan negatif ke bawah.',
      'Blok "if-then-else" memberikan 2 cabang aksi: cabang "then" jika kondisi benar, dan cabang "else" jika kondisi salah.'
    ],
    keyBlocks: [
      { name: 'go to x: (0) y: (0)', category: 'Motion', description: 'Memindahkan posisi sprite secara instan ke koordinat tertentu', color: '#4C97FF' },
      { name: 'if <...> then { } else { }', category: 'Control', description: 'Struktur logika percabangan dua kondisi berlawanan', color: '#FFAB19' },
      { name: 'touching [mouse-pointer v] ?', category: 'Sensing', description: 'Sensor yang mengembalikan nilai Benar jika bersentuhan dengan pointer', color: '#5CB1D6' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mereset Posisi Awal (Reset Coordinate)',
        instruction: 'Awali skrip dengan "go to x: 0 y: 0" agar sprite selalu berada di tengah panggung saat permainan baru dimulai.',
        hint: 'Koordinat panggung Scratch berpusat di X: 0, Y: 0.'
      },
      {
        stepNumber: 2,
        title: 'Menyusun Logika Sensor Sentuh',
        instruction: 'Di dalam perulangan forever: buat IF touching mouse-pointer THEN ubah warna (change color effect by 25) ELSE hapus efek grafik (clear graphic effects).',
        hint: 'Blok touching ada di Sensing (Cyan) dan blok efek ada di Looks (Ungu).'
      }
    ],
    quizQuestions: [
      {
        question: 'Berapakah nilai koordinat pusat tengah layar panggung Scratch?',
        options: ['x: 100, y: 100', 'x: 0, y: 0', 'x: -240, y: -180', 'x: 240, y: 180'],
        correctAnswerIndex: 1,
        explanation: 'Pusat panggung Scratch adalah titik koordinat kartesius (0, 0).'
      },
      {
        question: 'Kapan baris perintah di dalam bagian "ELSE" (JIKA TIDAK) akan dijalankan?',
        options: ['Saat kondisi syarat bernilai SALAH (False)', 'Saat kondisi syarat bernilai BENAR', 'Setiap kali bendera hijau ditekan', 'Tidak pernah dijalankan'],
        correctAnswerIndex: 0,
        explanation: 'Bagian ELSE dieksekusi oleh komputer ketika kondisi syarat pada IF bernilai SALAH.'
      }
    ],
    challenge: {
      title: 'Tantangan: Sensor Suara Sentuhan',
      description: 'Tambahkan efek suara "Pop" saat mouse menyentuh sprite, dan buat ukuran sprite membesar 120% saat disentuh!',
      bonusXp: 80,
      tips: ['Gunakan blok "set size to (120) %" pada cabang THEN dan "set size to (100) %" pada cabang ELSE']
    }
  },
  {
    id: 5,
    semester: 1,
    semesterLevel: 5,
    title: 'Projek Game Saling Menembak',
    topics: ['Koordinat X/Y', 'Sensing Collision', 'Point in Direction', 'Cloning Proyektil'],
    indicator: 'Siswa memahami dan mampu merancang permainan aksi tembak-menembak sederhana dengan sistem peluru',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 350,
    iconName: 'Crosshair',
    category: 'Game Dev',
    summary: 'Membangun game aksi tembak-menembak sederhana: Sprite Pemain, Peluru (Laser), dan Target Musuh dengan sistem cloning/koordinat.',
    conceptExplanation: 'Dalam game development, mekanisme tembakan proyektil dibuat menggunakan teknik Cloning. Daripada membuat 50 sprite peluru manual, kita cukup membuat 1 sprite peluru master yang digandakan ("create clone of myself") setiap kali pemain menekan tombol spasi.',
    learningGoals: [
      'Mengendalikan pesawat pemain secara vertikal menggunakan tombol panah',
      'Membuat sistem tembakan peluru berulang dengan blok kloning (Cloning)',
      'Menerapkan deteksi tabrakan (Collision Detection) antara peluru dan musuh',
      'Mengatur sudut derajat arah tembakan (Point in Direction: 90 = Kanan)'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip 1: Kontrol Gerak Pesawat Pemain',
        spriteName: 'Pesawat',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'pergi ke x: (-180) y: (0)', category: 'Motion', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'jika <tombol [panah atas v] ditekan ?> maka', category: 'Control', indent: 1 },
          { text: 'ubah y sebesar (8)', category: 'Motion', indent: 2 },
          { text: 'jika <tombol [panah bawah v] ditekan ?> maka', category: 'Control', indent: 1 },
          { text: 'ubah y sebesar (-8)', category: 'Motion', indent: 2 }
        ],
        explanation: 'Pesawat bergerak naik turun mengikuti input pemain di sumbu Y.'
      },
      {
        title: 'Skrip 2: Sistem Peluru Laser',
        spriteName: 'Laser',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik -> sembunyikan', category: 'Looks', indent: 0 },
          { text: 'ketika tombol [spasi v] ditekan', category: 'Events', indent: 0 },
          { text: 'buat klona dari [diriku sendiri v]', category: 'Control', indent: 0 },
          { text: 'ketika aku mulai sebagai klona', category: 'Control', indent: 0 },
          { text: 'pergi ke [Pesawat v] -> tampilkan', category: 'Motion', indent: 1 },
          { text: 'ulangi sampai <<menyentuh [Musuh v] ?> atau <menyentuh [pinggir v] ?>>', category: 'Control', indent: 1 },
          { text: 'ubah x sebesar (15)', category: 'Motion', indent: 2 },
          { text: 'hapus klona ini', category: 'Control', indent: 1 }
        ],
        explanation: 'Setiap peluru clone meluncur cepat ke kanan hingga mengenai musuh atau batas layar, lalu menghapus dirinya sendiri agar memori hemat.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Peluru menumpuk di layar dan tidak mau bergerak.',
        solution: 'Pastikan di skrip "when I start as a clone" ada blok "show" dan loop pergerakan "change x by 15".'
      },
      {
        problem: 'Game melambat setelah menembak berkali-kali.',
        solution: 'Selalu akhiri skrip klon dengan blok "delete this clone" agar klon tidak membebani memori panggung.'
      }
    ],
    summaryPoints: [
      'Cloning memungkinkan satu sprite master menghasilkan duplikat tak terbatas secara otomatis.',
      'Sumbu Y positif = Naik, Sumbu Y negatif = Turun. Sumbu X positif = Kanan, Sumbu X negatif = Kiri.',
      'Blok "delete this clone" sangat penting untuk menjaga performa game tetap lancar 30 FPS.'
    ],
    keyBlocks: [
      { name: 'point in direction (90)', category: 'Motion', description: 'Mengatur sudut orientasi (90 = Kanan, -90 = Kiri, 0 = Atas, 180 = Bawah)', color: '#4C97FF' },
      { name: 'create clone of [myself v]', category: 'Control', description: 'Menciptakan duplikat mandiri dari sprite saat runtime', color: '#FFAB19' },
      { name: 'when I start as a clone', category: 'Control', description: 'Blok pemicu khusus yang hanya dijalankan oleh klon baru', color: '#FFAB19' },
      { name: 'delete this clone', category: 'Control', description: 'Menghapus klon dari memori panggung setelah tugasnya selesai', color: '#FFAB19' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuat Kontrol Pesawat Vertikal',
        instruction: 'Buat sprite Pesawat di sisi kiri (X: -180). Pasang deteksi tombol panah atas (change y by 8) dan panah bawah (change y by -8).',
        hint: 'Gunakan blok forever agar responsif.'
      },
      {
        stepNumber: 2,
        title: 'Mekanisme Tembakan Laser Spasi',
        instruction: 'Pada sprite Laser: saat tombol spasi ditekan -> create clone of myself. Di blok "when I start as a clone" -> go to Pesawat -> show -> repeat until touching edge (change x by 15) -> delete this clone.',
        hint: 'Pastikan sprite master Laser di-hide saat bendera hijau diklik.'
      },
      {
        stepNumber: 3,
        title: 'Membuat Musuh Muncul Acak',
        instruction: 'Pada sprite Musuh di sisi kanan: bergerak meluncur naik turun di koordinat X: 180 dengan Y acak.',
        hint: 'Gunakan "pick random -140 to 140".'
      }
    ],
    quizQuestions: [
      {
        question: 'Sudut derajat berapakah yang menunjukkan arah gerak lurus ke ATAS pada Scratch?',
        options: ['90 derajat', '180 derajat', '0 derajat', '-90 derajat'],
        correctAnswerIndex: 2,
        explanation: '0 derajat mengarah ke Atas, 90 derajat ke Kanan, 180 derajat ke Bawah, dan -90 derajat ke Kiri.'
      },
      {
        question: 'Mengapa kita harus memasang blok "delete this clone" setelah peluru mengenai musuh atau tepi layar?',
        options: ['Supaya musuh menang', 'Untuk membebaskan memori panggung agar game tidak lag / macet', 'Agar warna peluru berganti', 'Untuk mematikan komputer'],
        correctAnswerIndex: 1,
        explanation: 'Menghapus klon yang sudah tidak terpakai menjaga jumlah objek di memori tetap ringan dan performa lancar.'
      }
    ],
    challenge: {
      title: 'Tantangan: Efek Ledakan Musuh & Skor',
      description: 'Saat peluru mengenai musuh, ganti kostum musuh menjadi ledakan ("boom"), mainkan suara ledakan, dan buat musuh respawn di posisi baru!',
      bonusXp: 100,
      tips: ['Gunakan "switch costume to [explosion]" lalu "wait 0.2 secs" sebelum respawn']
    }
  },
  {
    id: 6,
    semester: 1,
    semesterLevel: 6,
    title: 'Memahami Looks (Tampilan & Efek)',
    topics: ['Menu Looks', 'Visual Effects', 'Kostum & Rotasi', 'Transparansi Ghost'],
    indicator: 'Siswa mampu memanipulasi tampilan sprite seperti mengubah kostum, rotasi, dan efek visual digital',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 200,
    iconName: 'Sparkles',
    category: 'Looks & Art',
    summary: 'Bereksperimen dengan efek grafis menarik: Color, Fisheye, Whirl, Pixelate, Mosaic, Brightness, dan Ghost (transparansi).',
    conceptExplanation: 'Menu Looks mengontrol aspek visual shader grafis dari setiap sprite. Kita bisa mengubah warna (hue shift), memperbesar mata (fisheye), memutar pusaran (whirl), mengubah resolusi jadi kotak-kotak (pixelate), hingga membuat efek hantu tembus pandang (ghost transparency).',
    learningGoals: [
      'Memahami 7 efek visual bawaan Scratch: Color, Fisheye, Whirl, Pixelate, Mosaic, Brightness, dan Ghost',
      'Membuat animasi menghilang perlahan (Fade Out / Fade In) menggunakan Ghost effect',
      'Mengatur urutan layer visual (Go to Front Layer / Go Back 1 Layer)',
      'Mengubah ukuran skala sprite secara proporsional dengan "set size to (%)"'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Portal Sihir Berputar & Pelangi',
        spriteName: 'Portal',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'atur ukuran ke (100) %', category: 'Looks', indent: 0 },
          { text: 'hapus efek grafik', category: 'Looks', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'ubah efek [warna v] sebesar (5)', category: 'Looks', indent: 1 },
          { text: 'putar ke kanan (4) derajat', category: 'Motion', indent: 1 },
          { text: 'ubah efek [whirl v] sebesar (10)', category: 'Looks', indent: 1 }
        ],
        explanation: 'Kombinasi putaran, perubahan warna, dan efek whirl menghasilkan animasi portal sihir galaksi yang memukau.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Efek grafis menumpuk dan sprite terlihat rusak/cacat permanen.',
        solution: 'Selalu panggil blok "clear graphic effects" di awal program saat bendera hijau diklik.'
      },
      {
        problem: 'Sprite tidak terlihat sama sekali di layar padahal ada blok "show".',
        solution: 'Periksa apakah "ghost effect" bernilai 100. Panggil "set ghost effect to 0" untuk mengembalikannya.'
      }
    ],
    summaryPoints: [
      'Nilai Ghost effect 0 = Padat terlihat jelas, sedangkan nilai 100 = Benar-benar transparan (tak kasat mata).',
      'Efek Pixelate membagi gambar sprite menjadi grid mozaik retro 8-bit.',
      'Blok "clear graphic effects" mereset seluruh filter visual kembali ke tampilan gambar asli.'
    ],
    keyBlocks: [
      { name: 'change [color v] effect by (25)', category: 'Looks', description: 'Menggeser palet warna spektrum sprite secara dinamis', color: '#9966FF' },
      { name: 'set [ghost v] effect to (50)', category: 'Looks', description: 'Mengatur tingkat transparansi tembus pandang (0 - 100)', color: '#9966FF' },
      { name: 'clear graphic effects', category: 'Looks', description: 'Menghapus seluruh efek shader dan mengembalikan visual asli', color: '#9966FF' },
      { name: 'go to [front v] layer', category: 'Looks', description: 'Membawa sprite ke lapisan visual paling depan di atas sprite lain', color: '#9966FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mencoba Efek Spektrum Warna Neon',
        instruction: 'Susun: forever { change color effect by 5, turn right 3 degrees } di bawah bendera hijau.',
        hint: 'Lihat bagaimana warnanya bertransisi mulus seperti pelangi neon.'
      },
      {
        stepNumber: 2,
        title: 'Animasi Menghilang Halus (Fade Out)',
        instruction: 'Buat tombol: saat sprite diklik -> repeat 10 { change ghost effect by 10, wait 0.05 secs } -> hide.',
        hint: 'Ini adalah teknik dasar membuat efek karakter menghilang / teleportasi.'
      }
    ],
    quizQuestions: [
      {
        question: 'Efek visual apakah di menu Looks yang digunakan untuk membuat karakter tampak tembus pandang / transparan?',
        options: ['Pixelate', 'Whirl', 'Ghost (Hantu)', 'Mosaic'],
        correctAnswerIndex: 2,
        explanation: 'Ghost effect mengatur tingkat transparansi sprite dari 0 (padat) sampai 100 (tembus pandang total).'
      }
    ],
    challenge: {
      title: 'Tantangan: Karakter Berdenyut Detak Jantung',
      description: 'Buat karakter membesar dari 100% ke 120% lalu mengecil kembali ke 100% secara berirama seperti detak jantung!',
      bonusXp: 70,
      tips: ['Gunakan dua perulangan repeat: repeat 10 { change size by 2 } lalu repeat 10 { change size by -2 }']
    }
  },
  {
    id: 7,
    semester: 1,
    semesterLevel: 7,
    title: 'Mengendalikan Sprite: Keyboard & Mouse',
    topics: ['Sensing Keyboard', 'Sensing Mouse', 'Kontrol 4 Arah Halus', 'Smooth Movement'],
    indicator: 'Siswa mampu menghubungkan input dari keyboard dan mouse untuk mengendalikan pergerakan sprite secara responsif',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 250,
    iconName: 'Gamepad2',
    category: 'Input & Sensing',
    summary: 'Menerapkan event input responsif: tombol panah (Arrow keys), tombol WASD, mouse click, dan koordinat mouse_x / mouse_y.',
    conceptExplanation: 'Game yang menyenangkan membutuhkan kontrol yang responsif dan mulus. Dengan menggabungkan sensor "key [space] pressed?" di dalam loop "forever", kita membaca input tombol keyboard setiap frame tanpa mengalami jeda awal (stutter delay) dari sistem operasi.',
    learningGoals: [
      'Membuat sistem pergerakan 4 arah (Atas, Bawah, Kiri, Kanan) yang responsif dan mulus',
      'Membaca koordinat mouse real-time dengan sensor "mouse x" dan "mouse y"',
      'Menerapkan tombol aksi khusus (seperti tombol Shift untuk sprint/lari cepat)',
      'Memahami perbedaan event listener tunggal dengan polling loop kontinu'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Navigasi Karakter 4 Arah Mulus',
        spriteName: 'Player',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'jika <tombol [panah kanan v] ditekan ?> maka', category: 'Control', indent: 1 },
          { text: 'ubah x sebesar (7)', category: 'Motion', indent: 2 },
          { text: 'jika <tombol [panah kiri v] ditekan ?> maka', category: 'Control', indent: 1 },
          { text: 'ubah x sebesar (-7)', category: 'Motion', indent: 2 },
          { text: 'jika <tombol [panah atas v] ditekan ?> maka', category: 'Control', indent: 1 },
          { text: 'ubah y sebesar (7)', category: 'Motion', indent: 2 },
          { text: 'jika <tombol [panah bawah v] ditekan ?> maka', category: 'Control', indent: 1 },
          { text: 'ubah y sebesar (-7)', category: 'Motion', indent: 2 }
        ],
        explanation: 'Pemeriksaan status tombol dilakukan kontinu setiap frame, menghasilkan pergerakan game standar konsol yang halus.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Pergerakan karakter terasa tersendat/patah-patah saat tombol ditahan.',
        solution: 'Gunakan blok sensor "key [...] pressed?" di dalam perulangan "forever", JANGAN gunakan event "when [...] key pressed" terpisah-pisah.'
      },
      {
        problem: 'Karakter bergerak terlalu lambat di layar.',
        solution: 'Tingkatkan nilai di dalam blok "change x by" dari 3 menjadi 7 atau 8.'
      }
    ],
    summaryPoints: [
      'Sensing Keyboard di dalam loop "forever" memeriksa input 30 kali per detik untuk respon instan.',
      'Sumbu X mengontrol horizontal (Kanan/Kiri), Sumbu Y mengontrol vertikal (Atas/Bawah).',
      'Sensor "mouse down?" mendeteksi apakah pemain sedang menekan klik mouse.'
    ],
    keyBlocks: [
      { name: 'key [space v] pressed ?', category: 'Sensing', description: 'Sensor bernilai Benar saat tombol keyboard tertentu sedang ditekan', color: '#5CB1D6' },
      { name: 'mouse down ?', category: 'Sensing', description: 'Sensor mendeteksi klik tombol mouse pemain', color: '#5CB1D6' },
      { name: 'mouse x / mouse y', category: 'Sensing', description: 'Nilai posisi koordinat kursor mouse saat ini di panggung', color: '#5CB1D6' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membangun Kontrol 4 Arah Sumbu X & Y',
        instruction: 'Di dalam blok forever: buat 4 blok IF untuk tombol Panah Kanan (change x by 7), Kiri (change x by -7), Atas (change y by 7), dan Bawah (change y by -7).',
        hint: 'Perhatikan tanda minus (-) untuk arah kiri dan bawah.'
      },
      {
        stepNumber: 2,
        title: 'Mengikuti Kursor Mouse',
        instruction: 'Coba buat skrip alternatif: jika mouse down? maka pergi ke mouse-pointer.',
        hint: 'Ini cocok untuk game genre strategi atau sentuh layar.'
      }
    ],
    quizQuestions: [
      {
        question: 'Mengapa menggunakan "if key [right] pressed" di dalam loop forever lebih disukai dibanding "when right key pressed"?',
        options: ['Karena lebih boros memori', 'Menghasilkan pergerakan yang jauh lebih halus dan responsif tanpa jeda delay', 'Agar tombol terkunci', 'Hanya bisa dipakai untuk backdrop'],
        correctAnswerIndex: 1,
        explanation: 'Loop forever memeriksa status tombol setiap frame (30 kali per detik), sehingga pergerakan mulus tanpa delay bawaan keyboard.'
      }
    ],
    challenge: {
      title: 'Tantangan: Tombol Nitro / Sprint',
      description: 'Tambahkan fitur: jika tombol Shift atau Spasi ditekan bersamaan dengan tombol arah, karakter melaju dengan kecepatan dobel (14 pixel)!',
      bonusXp: 85,
      tips: ['Gunakan variabel "Kecepatan" yang bernilai 7 normal dan bernilai 14 saat tombol lari ditekan']
    }
  },
  {
    id: 8,
    semester: 1,
    semesterLevel: 8,
    title: 'Membuat dan Mengubah Sprite di Menu Paint',
    topics: ['Paint Scratch', 'Vector Editor', 'Alat Desain Sprite', 'Titik Pusat Crosshair'],
    indicator: 'Siswa mampu membuat dan mengedit sprite menggunakan alat-alat di menu Paint Scratch',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 200,
    iconName: 'Palette',
    category: 'Looks & Art',
    summary: 'Menguasai editor gambar internal Scratch: Mode Vektor vs Bitmap, Reshape tool, Fill gradient, Grouping, dan Layering.',
    conceptExplanation: 'Karakter game orisinal dibuat melalui Editor Vektor Scratch. Gambar vektor tersusun dari garis matematis sehingga tidak pernah pecah saat di-zoom. Kita bisa memanipulasi bentuk kurva (Reshape), memadukan gradasi warna neon, dan menyelaraskan titik pusat rotasi karakter.',
    learningGoals: [
      'Memahami perbedaan grafik Vektor (garis tajam) dengan Bitmap (piksel kotak)',
      'Menggunakan alat Select, Reshape, Line, Circle, Rectangle, Text, dan Fill',
      'Menyelaraskan titik tengah karakter dengan simbol crosshair (+) kanvas panggung',
      'Membuat multi-frame kostum untuk animasi berjalan dan ekspresi wajah'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Menjalankan Karakter Karya Sendiri',
        spriteName: 'RobotBuatanSendiri',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'ganti kostum ke [Robot_Senyum v]', category: 'Looks', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'jika <menyentuh [penunjuk-mouse v] ?> maka', category: 'Control', indent: 1 },
          { text: 'ganti kostum ke [Robot_Kaget v]', category: 'Looks', indent: 2 },
          { text: 'jika tidak', category: 'Control', indent: 1 },
          { text: 'ganti kostum ke [Robot_Senyum v]', category: 'Looks', indent: 2 }
        ],
        explanation: 'Karakter berganti kostum sesuai ekspresi saat disentuh oleh mouse pemain.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Sprite berputar aneh dan melayang jauh dari posisinya saat diarahkan.',
        solution: 'Gambar sprite belum berada di titik tengah. Buka tab Costumes, pilih semua bagian gambar, lalu geser hingga tanda plus di tengah gambar menempel tepat pada tanda plus crosshair kanvas.'
      },
      {
        problem: 'Garis gambar terlihat pecah dan buram.',
        solution: 'Pastikan bekerja dalam mode "Vector" (klik tombol "Convert to Vector" di bagian bawah kanvas).'
      }
    ],
    summaryPoints: [
      'Mode Vektor memungkinkan pengubahan bentuk kurva dengan alat Reshape kapan saja tanpa merusak gambar.',
      'Titik pusat (Center Crosshair) menentukan poros putaran dan koordinat (X, Y) sprite.',
      'Membuat 2 atau 3 kostum berbeda memungkinkan kita menciptakan animasi ekspresi wajah dan gerakan kaki.'
    ],
    keyBlocks: [
      { name: 'switch costume to [kostum v]', category: 'Looks', description: 'Mengganti tampilan aktif sprite ke frame kostum tertentu', color: '#9966FF' },
      { name: 'next costume', category: 'Looks', description: 'Berpindah ke frame kostum berikutnya dalam daftar secara berurutan', color: '#9966FF' },
      { name: 'costume [number v]', category: 'Looks', description: 'Mengembalikan nomor indeks kostum yang sedang aktif', color: '#9966FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuka Kanvas Paint Vektor',
        instruction: 'Arahkan mouse ke ikon "Choose a Sprite" di pojok kanan bawah, lalu klik ikon kuas cat "Paint".',
        hint: 'Kamu akan masuk ke ruang desain visual Scratch.'
      },
      {
        stepNumber: 2,
        title: 'Menggambar Karakter Robot Cyber',
        instruction: 'Gunakan Circle tool dan Rectangle tool dengan warna biru-cyan neon. Buat badan, kepala, mata, dan antena robot.',
        hint: 'Pastikan titik tengah badan robot tepat menempel di tanda silang (+) pusat kanvas.'
      },
      {
        stepNumber: 3,
        title: 'Membuat Frame Kostum Kedua',
        instruction: 'Klik kanan pada kostum 1 lalu pilih Duplicate. Di kostum 2, ubah bentuk mata dan mulut menjadi ekspresi senang!',
        hint: 'Ganti kostum di skrip kode menggunakan "next costume".'
      }
    ],
    quizQuestions: [
      {
        question: 'Mengapa titik tengah (Center Crosshair) pada kanvas Paint Scratch sangat krusial?',
        options: ['Agar warna lebih cerah', 'Sebagai poros pusat putaran rotasi dan titik acuan koordinat posisi sprite', 'Untuk menghapus kanvas', 'Supaya sprite tidak bisa bergerak'],
        correctAnswerIndex: 1,
        explanation: 'Titik pusat kanvas menentukan titik tumpu rotasi dan titik referensi koordinat (X, Y) sprite di panggung.'
      }
    ],
    challenge: {
      title: 'Tantangan: Karakter Kustom Bersuara',
      description: 'Gambar karakter monster alien buatanmu sendiri, buat 3 variasi ekspresi wajah, dan program agar ekspresinya berganti saat ditekan!',
      bonusXp: 80,
      tips: ['Gunakan Reshape tool untuk melengkungkan bentuk senyum monster']
    }
  },
  {
    id: 9,
    semester: 1,
    semesterLevel: 9,
    title: 'Projek Game Tikus Mencari Keju',
    topics: ['Sensing Warna', 'Looks', 'Customes', 'Labirin & Rintangan', 'Broadcast Message'],
    indicator: 'Siswa mampu merancang dan membuat permainan sprite tikus mencari keju dengan rintangan dinding dan sistem menang/kalah',
    allocation: '3 Pertemuan (3 x 45 menit)',
    xpReward: 400,
    iconName: 'Rat',
    category: 'Game Dev',
    summary: 'Membangun game labirin (Maze Game): Navigasi pemain, dinding pembatas berwarna, target keju, dan musuh kucing penjaga.',
    conceptExplanation: 'Game labirin memadukan mekanika fisik sentuhan warna "touching color (?)", sistem win/lose condition, dan reset posisi pemain. Komunikasi antar-sprite dikelola menggunakan Broadcast Message (pesan global) saat kemenangan diraih.',
    learningGoals: [
      'Mendesain labirin rintangan pada latar Backdrop dengan warna dinding solid',
      'Menerapkan logika pantulan dinding labirin ("touching color [...] then move -5 steps")',
      'Mengirim dan menerima sinyal pesan global menggunakan "broadcast [Menang!]"',
      'Menampilkan layar selebrasi kemenangan dan menghentikan game'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip 1: Logika Tikus & Fisika Dinding',
        spriteName: 'Tikus',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'pergi ke x: (-200) y: (140)', category: 'Motion', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'jika <menyentuh warna [#002244] ?> maka', category: 'Control', indent: 1 },
          { text: 'gerak (-6) langkah', category: 'Motion', indent: 2 },
          { text: 'jika <menyentuh [Keju v] ?> maka', category: 'Control', indent: 1 },
          { text: 'siarkan pesan [Menang! v]', category: 'Events', indent: 2 },
          { text: 'katakan [Hore, dapat keju!] selama (2) detik', category: 'Looks', indent: 2 },
          { text: 'berhenti [semua v]', category: 'Control', indent: 2 }
        ],
        explanation: 'Jika menabrak dinding biru tua, tikus mundur 6 langkah (efek membentur). Jika menyentuh keju, kirim siaran kemenangan.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Tikus bisa menembus dinding labirin tanpa hambatan.',
        solution: 'Gunakan pipet warna pada blok "touching color [...]" untuk menyamakan warna sensor dengan warna dinding labirin secara persis.'
      },
      {
        problem: 'Tikus terjebak di dalam dinding dan tidak bisa bergerak lagi.',
        solution: 'Pastikan ukuran sprite tikus cukup kecil (misal: size 40%) agar muat melintasi lorong labirin.'
      }
    ],
    summaryPoints: [
      'Gunakan pipet warna (Color Picker) untuk memilih warna sensor dengan akurasi 100%.',
      'Broadcast Message mengirimkan sinyal pemicu ke seluruh sprite sekaligus.',
      'Mekanisme "move -5 steps" saat menabrak dinding adalah cara paling sederhana menciptakan dinding padat di Scratch.'
    ],
    keyBlocks: [
      { name: 'touching color [#000000] ?', category: 'Sensing', description: 'Sensor mendeteksi tabrakan dengan warna pixel tertentu di panggung', color: '#5CB1D6' },
      { name: 'broadcast [Menang! v]', category: 'Events', description: 'Mengirimkan sinyal siaran pesan ke seluruh sprite dalam proyek', color: '#FFBF00' },
      { name: 'when I receive [Menang! v]', category: 'Events', description: 'Menerima sinyal pesan siaran dan mengeksekusi reaksi terkait', color: '#FFBF00' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mendesain Jalur Labirin',
        instruction: 'Di tab Backdrop, gambar jalur labirin dengan garis tebal satu warna solid (misal: Biru Gelap). Pastikan lorong cukup lebar.',
        hint: 'Gunakan satu warna yang seragam untuk seluruh rintangan dinding.'
      },
      {
        stepNumber: 2,
        title: 'Fisika Dinding Tikus',
        instruction: 'Pada sprite Tikus: jika menyentuh warna dinding -> gerak -6 langkah. Atur ukuran tikus menjadi 40%.',
        hint: 'Gunakan pipet untuk mengambil warna dinding persis.'
      },
      {
        stepNumber: 3,
        title: 'Target Keju & Selebrasi',
        instruction: 'Letakkan sprite Keju di ujung labirin. Saat tikus menyentuh keju -> siarkan pesan "Menang!" dan bunyikan suara sorak.',
        hint: 'Broadcast memungkinkan backdrop berganti ke tulisan "Selamat!".'
      }
    ],
    quizQuestions: [
      {
        question: 'Fitur apakah di Scratch yang memungkinkan satu sprite mengirimkan sinyal pemicu secara bersamaan ke sprite lainnya?',
        options: ['Broadcast Message (Siaran Pesan)', 'Wait 1 secs', 'Set size to', 'Clear graphic effects'],
        correctAnswerIndex: 0,
        explanation: 'Broadcast Message mengirimkan sinyal global yang ditangkap oleh sprite lain dengan blok "when I receive".'
      }
    ],
    challenge: {
      title: 'Tantangan: Tambahkan Timer Hitung Mundur',
      description: 'Buat batas waktu 30 detik untuk mencapai keju. Jika waktu habis sebelum menyentuh keju, tampilkan layar Game Over!',
      bonusXp: 120,
      tips: ['Gunakan perulangan repeat 30 { wait 1 secs, change Waktu by -1 }']
    }
  },
  {
    id: 10,
    semester: 1,
    semesterLevel: 10,
    title: 'Memahami Variabel (Data & Skor)',
    topics: ['My Variable', 'Skor Game', 'Manipulasi Data', 'Sistem Nyawa'],
    indicator: 'Siswa mampu memahami konsep variabel dan menggunakannya untuk menyimpan serta memanipulasi data dalam proyek Scratch',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 300,
    iconName: 'Database',
    category: 'Math & Logic',
    summary: 'Memahami variabel sebagai kotak penyimpan memori: membuat variabel Skor, Nyawa (Lives), Timer, dan High Score.',
    conceptExplanation: 'Variabel adalah wadah penyimpanan dalam memori komputer yang memiliki label nama dan nilai yang bisa berubah-ubah secara dinamis selama program berjalan. Dalam game, variabel digunakan untuk mencatat Skor, Nyawa, Kecepatan, Level, dan Catatan Waktu.',
    learningGoals: [
      'Memahami konsep variabel sebagai memori dinamis komputer',
      'Melakukan inisialisasi variabel (Reset Nilai Awal saat game mulai)',
      'Memanipulasi nilai variabel (Menambah dengan nilai positif, mengurangi dengan nilai negatif)',
      'Membangun sistem Game Over saat variabel Nyawa habis (<= 0)'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Inisialisasi & Logika Skor Tangkap Koin',
        spriteName: 'Koin',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'atur [Skor v] ke (0)', category: 'Variables', indent: 0 },
          { text: 'atur [Nyawa v] ke (3)', category: 'Variables', indent: 0 },
          { text: 'tampilkan variabel [Skor v]', category: 'Variables', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'jika <menyentuh [Pemain v] ?> maka', category: 'Control', indent: 1 },
          { text: 'ubah [Skor v] sebesar (10)', category: 'Variables', indent: 2 },
          { text: 'mainkan suara [Coin v] sampai selesai', category: 'Sound', indent: 2 },
          { text: 'pergi ke x: (acak -200 s/d 200) y: (160)', category: 'Motion', indent: 2 }
        ],
        explanation: 'Variabel Skor bertambah 10 setiap kali koin disentuh, lalu koin berpindah ke posisi baru.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Skor bertambah ratusan angka sekaligus hanya dalam sekali sentuhan koin.',
        solution: 'Segera pindahkan posisi koin atau sembunyikan koin ("hide") sesaat setelah Skor ditambah agar sensor tidak mendeteksi sentuhan berulang dalam 1 detik.'
      },
      {
        problem: 'Skor tidak kembali ke 0 saat permainan dimulai ulang.',
        solution: 'Pastikan ada blok "set [Skor] to 0" tepat di bawah "when green flag clicked".'
      }
    ],
    summaryPoints: [
      'Inisialisasi variabel adalah langkah krusial untuk memastikan game dimulai dalam kondisi bersih.',
      'Gunakan "change [Variabel] by 1" untuk menambah, dan "change [Variabel] by -1" untuk mengurangi.',
      'Variabel "For all sprites" (Global) dapat dibaca dan diubah oleh seluruh sprite dalam proyek.'
    ],
    keyBlocks: [
      { name: 'set [Skor v] to (0)', category: 'Variables', description: 'Mengisi nilai awal variabel (Inisialisasi)', color: '#FF8C1A' },
      { name: 'change [Skor v] by (10)', category: 'Variables', description: 'Menambah atau mengurangi nilai variabel secara matematis', color: '#FF8C1A' },
      { name: 'show variable [Skor v]', category: 'Variables', description: 'Menampilkan display papan angka variabel di panggung', color: '#FF8C1A' },
      { name: 'hide variable [Skor v]', category: 'Variables', description: 'Menyembunyikan display papan angka variabel', color: '#FF8C1A' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuat Variabel "Skor" Baru',
        instruction: 'Buka menu Variables (Oranye), klik "Make a Variable", beri nama "Skor" dan pilih opsi "For all sprites".',
        hint: 'Papan skor akan muncul di pojok kiri atas panggung.'
      },
      {
        stepNumber: 2,
        title: 'Inisialisasi Nilai Awal',
        instruction: 'Pasang blok "set [Skor] to 0" tepat di bawah bendera hijau. Lalu setiap kali pemain menangkap koin, pasang "change [Skor] by 10".',
        hint: 'Pastikan koin berpindah posisi setelah disentuh.'
      },
      {
        stepNumber: 3,
        title: 'Sistem 3 Nyawa (Lives)',
        instruction: 'Buat variabel "Nyawa", atur ke 3 saat mulai. Kurangi 1 jika menyentuh bom. Jika Nyawa = 0 -> Game Over.',
        hint: 'Gunakan operator "<= 0".'
      }
    ],
    quizQuestions: [
      {
        question: 'Kapan waktu yang paling tepat untuk melakukan inisialisasi variabel (seperti set Skor to 0)?',
        options: ['Saat game over', 'Tepat di awal saat program dimulai (when green flag clicked)', 'Di dalam loop forever', 'Tidak perlu diatur'],
        correctAnswerIndex: 1,
        explanation: 'Inisialisasi di awal program menjamin setiap sesi permainan baru selalu dimulai dari skor nol dan nyawa penuh.'
      }
    ],
    challenge: {
      title: 'Tantangan: Rekor Skor Tertinggi (High Score)',
      description: 'Buat variabel HighScore yang otomatis diperbarui jika Skor saat ini berhasil mengalahkan rekor sebelumnya!',
      bonusXp: 100,
      tips: ['Gunakan logika: if <Skor > HighScore> then set HighScore to Skor']
    }
  },

  // ==========================================
  // SEMESTER GENAP (LEVEL 11 - 20)
  // ==========================================
  {
    id: 11,
    semester: 2,
    semesterLevel: 1,
    title: 'Memahami Menu Operator Matematika',
    topics: ['Operator Matematika', 'Lebih / Kurang', 'Logika Boolean (And, Or, Not)', 'Penggabungan Teks Join'],
    indicator: 'Siswa mampu menggunakan menu operator matematika Scratch untuk melakukan perhitungan dan evaluasi logika komparasi',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 250,
    iconName: 'Calculator',
    category: 'Math & Logic',
    summary: 'Menggunakan operasi aritmatika (+, -, *, /), pembanding (<, =, >), logika boolean (AND, OR, NOT), string join, dan mod (sisa bagi).',
    conceptExplanation: 'Kecerdasan buatan (AI) dan komputasi bertumpu pada matematika dan logika Boolean. Operator memungkinkan kita membuat kalkulator otomatis, sistem kuis interaktif, dan evaluasi kondisi bersyarat ganda seperti "JIKA Skor > 50 DAN Nyawa > 0".',
    learningGoals: [
      'Melakukan operasi aritmatika (+, -, *, /) pada data input pemain',
      'Menerapkan perbandingan nilai (<, =, >) untuk aturan permainan',
      'Menggabungkan multi-syarat dengan operator logika Boolean (AND, OR, NOT)',
      'Menggabungkan teks dengan variabel menggunakan operator "join [teks] [variabel]"'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Robot Guru Matematika Cerdas',
        spriteName: 'RobotMatematika',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'atur [AngkaA v] ke (pilih acak 1 s/d 10)', category: 'Variables', indent: 0 },
          { text: 'atur [AngkaB v] ke (pilih acak 1 s/d 10)', category: 'Variables', indent: 0 },
          { text: 'tanya (gabungkan [Berapakah ] (gabungkan (AngkaA) (gabungkan [ + ] (AngkaB)))) dan tunggu', category: 'Sensing', indent: 0 },
          { text: 'jika <(jawaban) = ((AngkaA) + (AngkaB))> maka', category: 'Control', indent: 0 },
          { text: 'katakan [Luar Biasa, Jawabanmu Tepat!] selama (2) detik', category: 'Looks', indent: 1 },
          { text: 'jika tidak', category: 'Control', indent: 0 },
          { text: 'katakan [Yah, coba hitung lagi ya!] selama (2) detik', category: 'Looks', indent: 1 }
        ],
        explanation: 'Program membuat soal penjumlahan otomatis dengan angka acak dan mencocokkan jawaban pemain secara matematis.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Penggabungan teks terlihat menempel tanpa spasi (contoh: "Skor:10").',
        solution: 'Tambahkan spasi manual di akhir teks pertama di dalam blok join, misalnya "Skor: ".'
      },
      {
        problem: 'Kondisi AND tidak pernah aktif.',
        solution: 'Ingat bahwa operator AND membutuhkan KEDUA syarat bernilai BENAR. Jika salah satu salah, seluruh blok AND bernilai SALAH.'
      }
    ],
    summaryPoints: [
      'Operator hijau berbentuk bulat menghasilkan angka/teks, sedangkan operator bersegi enam menghasilkan nilai Boolean (True/False).',
      'Operator AND = Semua syarat harus terpenuhi. Operator OR = Cukup salah satu syarat terpenuhi.',
      'Operator MOD menghitung sisa hasil pembagian (misal: 10 mod 3 = 1).'
    ],
    keyBlocks: [
      { name: '( ) + ( )  /  ( ) * ( )', category: 'Operators', description: 'Operasi perhitungan matematika dasar (tambah, kurang, kali, bagi)', color: '#59C059' },
      { name: '< ( ) > ( ) >', category: 'Operators', description: 'Membandingkan apakah nilai kiri lebih besar dari nilai kanan', color: '#59C059' },
      { name: '< < > and < > >', category: 'Operators', description: 'Evaluasi logika yang bernilai benar hanya jika KEDUA syarat terpenuhi', color: '#59C059' },
      { name: 'join [apple] [banana]', category: 'Operators', description: 'Menggabungkan dua potongan teks atau variabel menjadi satu kalimat utuh', color: '#59C059' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuat Game Kuis Penjumlahan',
        instruction: 'Buat 2 variabel: AngkaA dan AngkaB. Isi dengan angka acak 1-10. Tanyakan hasilnya kepada pemain dengan blok "ask [...] and wait".',
        hint: 'Gunakan blok operator (+) warna hijau.'
      },
      {
        stepNumber: 2,
        title: 'Logika Multi-Syarat dengan AND',
        instruction: 'Buat aturan bonus: jika Skor > 50 DAN Nyawa = 3, beri pesan "Kamu berada dalam Mode Super Juara!".',
        hint: 'Masukkan dua blok perbandingan ke dalam satu slot blok "and".'
      }
    ],
    quizQuestions: [
      {
        question: 'Jika kondisi A bernilai BENAR dan kondisi B bernilai SALAH, apa hasil akhir dari blok <A and B>?',
        options: ['BENAR (True)', 'SALAH (False)', 'Tidak terdefinisi', 'Error sistem'],
        correctAnswerIndex: 1,
        explanation: 'Operator AND mensyaratkan kedua belah pihak harus BENAR. Karena B salah, maka hasilnya SALAH.'
      }
    ],
    challenge: {
      title: 'Tantangan: Detektor Bilangan Genap/Ganjil',
      description: 'Buat program yang meminta input angka dari user dan menebak apakah angka tersebut Genap atau Ganjil menggunakan operator "mod 2"!',
      bonusXp: 90,
      tips: ['Jika ((angka) mod (2)) = 0 maka angka tersebut adalah GENAP']
    }
  },
  {
    id: 12,
    semester: 2,
    semesterLevel: 2,
    title: 'Projek Mission Target Pursuit',
    topics: ['Sensing Jarak', 'Point Direction', 'Random Pick', 'Sistem Skor & AI Kejar'],
    indicator: 'Siswa mampu merancang dan membuat projek misi di mana sprite mengejar target dengan logika pergerakan dan sistem skor dinamis',
    allocation: '3 Pertemuan (3 x 45 menit)',
    xpReward: 400,
    iconName: 'Target',
    category: 'Game Dev',
    summary: 'Membuat game kejar target dinamis: Sprite Drone AI yang mengejar target bergerak acak, penghitung skor berwaktu, dan power-up.',
    conceptExplanation: 'Dalam logika game AI, algoritma "Target Pursuit" membuat agen virtual mengarahkan sudut hadapnya secara terus-menerus ke target dan bergerak mendekatinya. Ini adalah dasar logika musuh pintar pada game arcade legendaris seperti Pac-Man.',
    learningGoals: [
      'Menerapkan algoritma pengejaran otomatis menggunakan "point towards [Target]"',
      'Mengukur jarak pixel antara dua sprite dengan sensor "distance to [Target]"',
      'Menghasilkan pergerakan target yang tidak terduga dengan "pick random"',
      'Membangun sistem level di mana kecepatan musuh meningkat seiring bertambahnya skor'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip 1: Target Bergerak Acak Meluncur',
        spriteName: 'TargetEmas',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'meluncur (1.5) detik ke x: (pilih acak -200 s/d 200) y: (pilih acak -140 s/d 140)', category: 'Motion', indent: 1 }
        ],
        explanation: 'Target meluncur ke koordinat acak secara kontinu di seluruh area panggung.'
      },
      {
        title: 'Skrip 2: Drone Pemburu Otomatis (AI Pursuer)',
        spriteName: 'DroneAI',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'pergi ke x: (-180) y: (-120)', category: 'Motion', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'menghadap ke arah [TargetEmas v]', category: 'Motion', indent: 1 },
          { text: 'gerak (4) langkah', category: 'Motion', indent: 1 },
          { text: 'jika <menyentuh [TargetEmas v] ?> maka', category: 'Control', indent: 1 },
          { text: 'ubah [Skor v] sebesar (1)', category: 'Variables', indent: 2 },
          { text: 'mainkan suara [Pop] sampai selesai', category: 'Sound', indent: 2 }
        ],
        explanation: 'Drone selalu mengarahkan pandangannya ke target dan maju 4 langkah setiap frame.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Target meluncur keluar dari batas layar panggung.',
        solution: 'Batasi nilai acak koordinat X maksimal antara -200 s/d +200, dan koordinat Y antara -140 s/d +140.'
      },
      {
        problem: 'Drone bergetar hebat saat menyentuh target.',
        solution: 'Beri kondisi: "jika jarak ke target > 10 langkah baru bergerak maju".'
      }
    ],
    summaryPoints: [
      'Algoritma "point towards" + "move steps" adalah resep klasik menciptakan musuh pengejar pintar.',
      'Sensor "distance to" memberikan nilai jarak numerik dalam satuan pixel.',
      'Kombinasi "pick random" mencegah pola pergerakan game menjadi monoton dan mudah ditebak.'
    ],
    keyBlocks: [
      { name: 'point towards [Target v]', category: 'Motion', description: 'Algoritma orientasi sudut hadap otomatis mengunci posisi target', color: '#4C97FF' },
      { name: 'pick random (1) to (10)', category: 'Operators', description: 'Menghasilkan angka acak yang dinamis dan bervariasi', color: '#59C059' },
      { name: 'distance to [Target v]', category: 'Sensing', description: 'Mengukur jarak numerik pixel Euclidean ke sprite target', color: '#5CB1D6' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Target Meluncur Acak',
        instruction: 'Pada sprite Target: buat meluncur ke koordinat acak: glide 1.5 secs to x: (pick random -200 to 200) y: (pick random -140 to 140).',
        hint: 'Gunakan loop forever.'
      },
      {
        stepNumber: 2,
        title: 'Drone Pemburu AI',
        instruction: 'Pada sprite Drone: forever { point towards Target, move 4 steps, if touching Target then change Skor by 1 }.',
        hint: 'Atur kecepatan langkah drone agar seimbang dan menantang.'
      }
    ],
    quizQuestions: [
      {
        question: 'Blok apakah yang digunakan untuk menghasilkan posisi atau angka yang bervariasi secara otomatis tanpa ditentukan sebelumnya?',
        options: ['pick random (...) to (...)', 'set size to 100', 'wait 1 secs', 'stop this script'],
        correctAnswerIndex: 0,
        explanation: 'Blok "pick random" menghasilkan bilangan acak untuk simulasi, posisi spawn, dan variasi game.'
      }
    ],
    challenge: {
      title: 'Tantangan: Kecepatan Naik Tiap 5 Poin',
      description: 'Buat variabel Kecepatan yang otomatis bertambah cepat setiap kali pemain berhasil mengumpulkan 5 target!',
      bonusXp: 110,
      tips: ['Gunakan variabel Kecepatan di dalam blok "move (Kecepatan) steps"']
    }
  },
  {
    id: 13,
    semester: 2,
    semesterLevel: 3,
    title: 'Membuat Animasi Hujan',
    topics: ['Paint Scratch', 'Next Costumes', 'Sistem Partikel Cuaca', 'Gravitasi Jatuh'],
    indicator: 'Siswa mampu membuat simulasi efek cuaca hujan dengan perubahan visual partikel dan kloning',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 250,
    iconName: 'CloudRain',
    category: 'Simulation',
    summary: 'Mensimulasikan sistem partikel cuaca (Weather Particle System): titik-titik air hujan jatuh, kilatan petir dengan kostum, dan genangan air.',
    conceptExplanation: 'Sistem Partikel (Particle System) adalah teknik grafis komputer di mana ratusan objek kecil (tetesan air hujan, butiran salju, percikan api) dihasilkan secara berulang dengan variasi posisi dan kecepatan acak, lalu dihapus saat mencapai tanah.',
    learningGoals: [
      'Memahami konsep dasar Generator Partikel Kloning di Scratch',
      'Mensimulasikan gravitasi tetesan air jatuh dengan "change y by (-15)"',
      'Membuat animasi percikan air (Splash effect) saat menyentuh dasar panggung',
      'Menggabungkan efek visual kilat petir dan suara guntur audio'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Generator Butiran Hujan & Efek Pecah',
        spriteName: 'ButiranHujan',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'sembunyikan', category: 'Looks', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'buat klona dari [diriku sendiri v]', category: 'Control', indent: 1 },
          { text: 'tunggu (0.05) detik', category: 'Control', indent: 1 },
          { text: 'ketika aku mulai sebagai klona', category: 'Control', indent: 0 },
          { text: 'ganti kostum ke [tetes_air v]', category: 'Looks', indent: 1 },
          { text: 'pergi ke x: (pilih acak -230 s/d 230) y: (170)', category: 'Motion', indent: 1 },
          { text: 'tampilkan', category: 'Looks', indent: 1 },
          { text: 'ulangi sampai <posisi y < (-150)>', category: 'Control', indent: 1 },
          { text: 'ubah y sebesar (-14)', category: 'Motion', indent: 2 },
          { text: 'ganti kostum ke [percikan_air v]', category: 'Looks', indent: 1 },
          { text: 'tunggu (0.1) detik', category: 'Control', indent: 1 },
          { text: 'hapus klona ini', category: 'Control', indent: 1 }
        ],
        explanation: 'Setiap butiran hujan muncul di posisi X acak di atas awan, jatuh cepat ke bawah, berubah jadi percikan air saat menyentuh lantai, lalu menghapus diri.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Hujan tampak menumpuk di atas dan tidak mau turun.',
        solution: 'Periksa tanda minus pada kecepatan jatuh. Harus bernilai negatif, misalnya "change y by -12", bukan positif.'
      },
      {
        problem: 'Scratch terasa lambat setelah hujan berjalan beberapa saat.',
        solution: 'Pastikan blok "delete this clone" selalu dieksekusi di akhir masa hidup setiap tetesan hujan.'
      }
    ],
    summaryPoints: [
      'Sistem partikel meniru fenomena alam dengan menciptakan banyak klon kecil berumur pendek.',
      'Sumbu Y negatif menggerakkan objek ke arah gravitasi bumi (bawah).',
      'Mengganti kostum ke frame "splash" sebelum klon dihapus memberikan dampak visual yang sangat realistis.'
    ],
    keyBlocks: [
      { name: 'create clone of [myself v]', category: 'Control', description: 'Menghasilkan ratusan butiran tetesan air hujan secara berkala', color: '#FFAB19' },
      { name: 'change y by (-14)', category: 'Motion', description: 'Simulasi gaya gravitasi jatuhnya tetesan air ke bawah', color: '#4C97FF' },
      { name: 'delete this clone', category: 'Control', description: 'Menghapus butiran hujan setelah menyentuh tanah', color: '#FFAB19' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Menggambar Tetesan & Percikan Air',
        instruction: 'Di Paint Editor, buat Kostum 1 berupa garis tetesan air biru, dan Kostum 2 berupa lingkaran percikan air kecil.',
        hint: 'Beri nama kostum "drop" dan "splash".'
      },
      {
        stepNumber: 2,
        title: 'Membuat Generator Kloning Hujan',
        instruction: 'Pada sprite utama: sembunyikan (hide), lalu dalam loop forever buat clone setiap 0.05 detik.',
        hint: 'Saat mulai sebagai clone: munculkan di koordinat Y atas (y: 170) dengan X acak.'
      },
      {
        stepNumber: 3,
        title: 'Fisika Jatuh & Percikan Tanah',
        instruction: 'Ulangi "change y by -14" sampai koordinat y < -150, ganti ke kostum splash, tunggu 0.1 detik, lalu delete clone.',
        hint: 'Ini menciptakan efek tetesan air pecah saat menghujam tanah!'
      }
    ],
    quizQuestions: [
      {
        question: 'Arah koordinat manakah yang harus diubah dengan nilai negatif agar suatu objek bergerak jatuh ke bawah?',
        options: ['Koordinat X (Horizontal)', 'Koordinat Y (Vertikal)', 'Ukuran Sprite (%)', 'Ghost Effect'],
        correctAnswerIndex: 1,
        explanation: 'Sumbu Y adalah vertikal. Nilai negatif (change y by -10) menyebabkan objek bergerak ke bawah.'
      }
    ],
    challenge: {
      title: 'Tantangan: Efek Angin Miring & Kilat Petir',
      description: 'Tambahkan efek tiupan angin miring (change x by -3 saat jatuh) dan efek kilat petir yang berkedip terang dengan suara guntur!',
      bonusXp: 95,
      tips: ['Gunakan suara "Thunder" dari pustaka suara bawaan Scratch']
    }
  },
  {
    id: 14,
    semester: 2,
    semesterLevel: 4,
    title: 'Mengenal Drag and Drop',
    topics: ['Screen Mode', 'Draggable', 'Not Draggable', 'Interaksi Sentuh Puzzle'],
    indicator: 'Siswa mampu menggunakan fungsi "Drag and Drop" dalam Scratch untuk mengatur dan mencocokkan objek interaktif',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 200,
    iconName: 'Move',
    category: 'Input & Sensing',
    summary: 'Menerapkan mode drag-and-drop interaktif untuk membuat game puzzle, mencocokkan benda ke wadah yang tepat, dan kustomisasi inventori.',
    conceptExplanation: 'Fungsi drag mode mengontrol apakah pemain diizinkan menyeret sprite secara langsung dengan kursor mouse saat game sedang aktif di mode layar penuh. Mode ini sangat ideal untuk game edukasi mencocokkan bentuk, pilah sampah, dan puzzle kartu.',
    learningGoals: [
      'Memahami fungsi blok "set drag mode [draggable]" dan "set drag mode [not draggable]"',
      'Mendesain game klasifikasi objek (Pilah Sampah / Cocokkan Bentuk)',
      'Mengevaluasi letak pelepasan objek dengan sensor "touching [Wadah Target]?"',
      'Mereset posisi benda kembali ke tempat semula jika diletakkan di wadah yang salah'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Game Pilah Sampah Interaktif',
        spriteName: 'BotolPlastik',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'atur mode seret [dapat diseret v]', category: 'Sensing', indent: 0 },
          { text: 'pergi ke x: (-150) y: (-80)', category: 'Motion', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'jika <tidak <mouse ditekan ?> dan <menyentuh [Tong_Anorganik v] ?>> maka', category: 'Control', indent: 1 },
          { text: 'mainkan suara [Collect] sampai selesai', category: 'Sound', indent: 2 },
          { text: 'ubah [Skor v] sebesar (10)', category: 'Variables', indent: 2 },
          { text: 'sembunyikan', category: 'Looks', indent: 2 },
          { text: 'berhenti [skrip ini v]', category: 'Control', indent: 2 }
        ],
        explanation: 'Botol plastik dapat diseret bebas oleh pemain. Saat dilepas di atas tong anorganik yang benar, skor bertambah.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Sprite tidak bisa diseret dengan mouse saat game dimainkan.',
        solution: 'Pastikan game dijalankan dalam mode layar penuh (Full Screen) dan blok "set drag mode [draggable]" telah dieksekusi.'
      },
      {
        problem: 'Pemain bisa mencurangi game platformer dengan menyeret karakter langsung ke garis finish.',
        solution: 'Pasang blok "set drag mode [not draggable]" pada karakter utama agar hanya bisa digerakkan lewat tombol keyboard.'
      }
    ],
    summaryPoints: [
      'Mode "draggable" mengizinkan pemain menyeret sprite langsung di layar penuh.',
      'Mode "not draggable" mengunci posisi sprite dari interaksi seret manual.',
      'Kombinasi "distance to Target < 30" memungkinkan fitur magnet otomatis (Snap-to-target).'
    ],
    keyBlocks: [
      { name: 'set drag mode [draggable v]', category: 'Sensing', description: 'Mengizinkan pemain menyeret sprite dengan mouse pada layar penuh', color: '#5CB1D6' },
      { name: 'set drag mode [not draggable v]', category: 'Sensing', description: 'Mengunci sprite agar tidak bisa diseret sembarangan oleh pemain', color: '#5CB1D6' },
      { name: 'touching [Wadah_Target v] ?', category: 'Sensing', description: 'Mendeteksi apakah objek yang ditarik masuk ke target yang benar', color: '#5CB1D6' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mengaktifkan Drag Mode',
        instruction: 'Pada awal program, pasang blok "set drag mode [draggable]" pada sprite item.',
        hint: 'Uji di mode layar penuh.'
      },
      {
        stepNumber: 2,
        title: 'Membuat Game Pilah Sampah',
        instruction: 'Buat 2 wadah: "Organik" dan "Anorganik". Jika sampah dilepas di wadah yang benar -> mainkan suara sukses dan tambah skor.',
        hint: 'Jika salah wadah -> kembalikan ke koordinat awal.'
      }
    ],
    quizQuestions: [
      {
        question: 'Mengapa kita perlu mengatur "set drag mode [not draggable]" pada karakter utama dalam game aksi rintangan?',
        options: ['Agar karakter bisa terbang', 'Mencegah pemain mencurangi rintangan game dengan menyeret karakter langsung ke garis finish', 'Agar game lebih cepat selesai', 'Untuk menghemat listrik'],
        correctAnswerIndex: 1,
        explanation: 'Mengunci mode seret memastikan pemain harus melewati rintangan dengan tombol kontrol yang semestinya.'
      }
    ],
    challenge: {
      title: 'Tantangan: Magnet Otomatis (Snap to Grid)',
      description: 'Buat 3 bagian tubuh robot yang akan otomatis menempel tepat di posisinya (snap) saat dilepas dekat dengan titik target!',
      bonusXp: 85,
      tips: ['Gunakan rumus: if <distance to Target < 30> then go to Target']
    }
  },
  {
    id: 15,
    semester: 2,
    semesterLevel: 5,
    title: 'Projek Scratch Bus Street',
    topics: ['Motion', 'Sensing', 'Pick Random', 'Effect', 'Simulasi Lalu Lintas'],
    indicator: 'Siswa mampu merancang dan membuat simulasi lalu lintas jalan raya dengan sprite bus dan kendaraan lainnya',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 350,
    iconName: 'Bus',
    category: 'Simulation',
    summary: 'Membangun simulasi jalan raya: Bus kota dengan multi-jalur (lanes), mobil-mobil lain dengan kecepatan acak, lampu lalu lintas, dan klakson.',
    conceptExplanation: 'Simulasi Dunia Nyata (Real-World Simulation) memodelkan sistem lalu lintas dengan aturan multi-jalur, variasi laju kendaraan, jarak aman, dan perubahan sinyal lampu lalu lintas secara terprogram.',
    learningGoals: [
      'Mendesain latar jalan raya dengan sistem 3 lajur koordinat Y tetap',
      'Membuat generator mobil lain yang melaju dengan kecepatan acak',
      'Mengendalikan bus kota untuk berpindah jalur menghindari rintangan',
      'Menerapkan sistem pemberhentian halte dan lampu lalu lintas'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Generator Mobil Lajur Acak',
        spriteName: 'MobilLain',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'sembunyikan', category: 'Looks', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'buat klona dari [diriku sendiri v]', category: 'Control', indent: 1 },
          { text: 'tunggu (pilih acak 1.5 s/d 3) detik', category: 'Control', indent: 1 },
          { text: 'ketika aku mulai sebagai klona', category: 'Control', indent: 0 },
          { text: 'atur [PilihanLajur v] ke (pilih acak 1 s/d 3)', category: 'Variables', indent: 1 },
          { text: 'jika <(PilihanLajur) = (1)> maka pergi ke x: (-240) y: (80)', category: 'Motion', indent: 1 },
          { text: 'jika <(PilihanLajur) = (2)> maka pergi ke x: (-240) y: (0)', category: 'Motion', indent: 1 },
          { text: 'jika <(PilihanLajur) = (3)> maka pergi ke x: (-240) y: (-80)', category: 'Motion', indent: 1 },
          { text: 'tampilkan', category: 'Looks', indent: 1 },
          { text: 'meluncur (pilih acak 2 s/d 4) detik ke x: (240) y: (posisi y)', category: 'Motion', indent: 1 },
          { text: 'hapus klona ini', category: 'Control', indent: 1 }
        ],
        explanation: 'Mobil muncul di salah satu dari 3 jalur jalan raya dan meluncur ke sisi kanan dengan kecepatan bervariasi.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Mobil melaju miring keluar dari aspal jalan.',
        solution: 'Pastikan nilai koordinat Y tujuan pada blok glide sama persis dengan posisi Y awal jalur mobil.'
      },
      {
        problem: 'Bus menabrak mobil tetapi tidak terjadi reaksi apa pun.',
        solution: 'Tambahkan pemeriksaan sentuhan "if touching [MobilLain] then play sound [Crash] and stop all".'
      }
    ],
    summaryPoints: [
      'Jalur lalu lintas dapat dimodelkan dengan menetapkan nilai Y tetap (misal: Atas = 80, Tengah = 0, Bawah = -80).',
      'Pengacakan waktu spawn membuat lalu lintas tampak natural.',
      'Sistem kloning memungkinkan simulasi jalan raya dipenuhi puluhan kendaraan tanpa repot.'
    ],
    keyBlocks: [
      { name: 'glide (2) secs to x: (240) y: (y-lane)', category: 'Motion', description: 'Simulasi laju mobil menyeberangi jalan dengan durasi waktu halus', color: '#4C97FF' },
      { name: 'pick random (1) to (3)', category: 'Operators', description: 'Memilih 1 dari 3 jalur lalu lintas secara acak', color: '#59C059' },
      { name: 'touching [Lampu_Merah v] ?', category: 'Sensing', description: 'Sensor berhenti saat lampu lalu lintas menyala merah', color: '#5CB1D6' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mendesain Jalan Raya 3 Jalur',
        instruction: 'Desain jalan aspal dengan 3 jalur horizontal dengan garis marka putih putus-putus. Catat koordinat Y untuk masing-masing jalur.',
        hint: 'Jalur 1 = Y: 80, Jalur 2 = Y: 0, Jalur 3 = Y: -80.'
      },
      {
        stepNumber: 2,
        title: 'Generator Mobil Acak',
        instruction: 'Buat sprite mobil muncul dari sisi kiri, pilih jalur acak, dan meluncur ke kanan dengan kecepatan acak.',
        hint: 'Gunakan blok glide dengan durasi random.'
      },
      {
        stepNumber: 3,
        title: 'Kontrol Bus Penumpang',
        instruction: 'Pemain mengendalikan bus kota dengan tombol Atas/Bawah untuk berpindah jalur menghindari tabrakan.',
        hint: 'Gunakan change y by 80 atau change y by -80.'
      }
    ],
    quizQuestions: [
      {
        question: 'Konsep komputasi apakah yang diterapkan saat mobil muncul di jalur dan kecepatan yang berbeda-beda setiap saat?',
        options: ['Variabel Konstan', 'Randomization (Pengacakan Nilai)', 'Ghost Effect', 'Sound Pitch'],
        correctAnswerIndex: 1,
        explanation: 'Randomization menghasilkan dinamika variasi yang realistis seperti simulasi kondisi dunia nyata.'
      }
    ],
    challenge: {
      title: 'Tantangan: Sistem Lampu Merah Interaktif',
      description: 'Tambahkan tiang lampu lalu lintas yang otomatis berganti Hijau, Kuning, Merah. Saat Merah, semua mobil wajib berhenti melaju!',
      bonusXp: 110,
      tips: ['Gunakan siaran pesan "Lampu_Merah" dan "Lampu_Hijau"']
    }
  },
  {
    id: 16,
    semester: 2,
    semesterLevel: 6,
    title: 'Membuat Pola Garis Berwarna (Pen Art 1)',
    topics: ['Paint Scratch', 'Pen Extension', 'Pola Geometri Poligon', 'Spirograph Pelangi'],
    indicator: 'Siswa mampu membuat pola garis geometri berwarna dengan perintah ekstensi Pena (Pen Extension) dan perulangan sudut',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 300,
    iconName: 'PenTool',
    category: 'Creative Arts',
    summary: 'Memanfaatkan Scratch Pen Extension untuk coding seni generatif: Pola Geometri, Bintang Bertingkat, dan Roda Warna.',
    conceptExplanation: 'Coding Seni (Generative Art) menggabungkan matematika sudut dan perulangan untuk menggambar pola visual simetris yang indah. Konsep ini berakar dari logika pemrograman Turtle Graphics legendaris karya Seymour Papert.',
    learningGoals: [
      'Mengaktifkan dan menggunakan blok dari Pen Extension di Scratch 3.0',
      'Memahami rumus sudut luar bangun datar geometri: $Sudut = 360 / Jumlah Sisi$',
      'Menggambar Persegi (4x 90°), Segitiga (3x 120°), dan Segilima (5x 72°)',
      'Membuat karya seni Spirograph pelangi dengan memutar pola poligon secara berulang'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Spirograph Mandala Pelangi Geometri',
        spriteName: 'PenaAjaib',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'hapus semua', category: 'Pen', indent: 0 },
          { text: 'atur ukuran pena ke (3)', category: 'Pen', indent: 0 },
          { text: 'pergi ke x: (0) y: (0)', category: 'Motion', indent: 0 },
          { text: 'turunkan pena', category: 'Pen', indent: 0 },
          { text: 'ulangi (36) kali', category: 'Control', indent: 0 },
          { text: 'ubah warna pena sebesar (10)', category: 'Pen', indent: 1 },
          { text: 'ulangi (4) kali', category: 'Control', indent: 1 },
          { text: 'gerak (80) langkah', category: 'Motion', indent: 2 },
          { text: 'putar ke kanan (90) derajat', category: 'Motion', indent: 2 },
          { text: 'putar ke kanan (10) derajat', category: 'Motion', indent: 1 },
          { text: 'angkat pena', category: 'Pen', indent: 0 }
        ],
        explanation: 'Skrip menggambar bujur sangkar 4 sisi sebanyak 36 kali dengan pergeseran sudut 10 derajat, membentuk mandala bunga 360 derajat.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Kategori blok Pen tidak ditemukan di palet Scratch.',
        solution: 'Klik tombol biru "Add Extension" di pojok kiri paling bawah Scratch, lalu pilih kartu ekstensi "Pen".'
      },
      {
        problem: 'Layar penuh dengan coretan garis lama dan tidak bersih.',
        solution: 'Selalu letakkan blok "erase all" di baris pertama skrip sebelum menurunkan pena ("pen down").'
      }
    ],
    summaryPoints: [
      'Blok "pen down" menempelkan ujung pena ke kanvas, sedangkan "pen up" mengangkat pena agar tidak mencoret saat berpindah posisi.',
      'Total sudut putaran luar semua bangun datar tertutup selalu sama dengan 360 derajat.',
      'Perpaduan "change pen color" di dalam loop menghasilkan spektrum gradasi warna pelangi yang mulus.'
    ],
    keyBlocks: [
      { name: 'pen down  /  pen up', category: 'Pen', description: 'Menempelkan atau mengangkat ujung mata pena ke kanvas panggung', color: '#0FBD8C' },
      { name: 'erase all', category: 'Pen', description: 'Membersihkan seluruh bekas goresan tinta pena di panggung', color: '#0FBD8C' },
      { name: 'change pen color by (10)', category: 'Pen', description: 'Menggeser spektrum warna tinta pena secara bertahap', color: '#0FBD8C' },
      { name: 'set pen size to (3)', category: 'Pen', description: 'Mengatur ketebalan garis goresan tinta', color: '#0FBD8C' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mengaktifkan Ekstensi Pen',
        instruction: 'Klik tombol "Add Extension" di pojok kiri paling bawah Scratch, lalu klik kartu "Pen". Kategori hijau toska baru akan muncul.',
        hint: 'Kamu sekarang memiliki kekuatan coding seni grafis!'
      },
      {
        stepNumber: 2,
        title: 'Menggambar Persegi Pelangi',
        instruction: 'Susun: erase all -> pen down -> repeat 4 { move 80 steps, turn right 90 degrees, change pen color by 25 }.',
        hint: 'Sprite akan menggambar kotak dengan 4 sisi warna berbeda.'
      },
      {
        stepNumber: 3,
        title: 'Membuat Bunga Spirograph',
        instruction: 'Bungkus skrip kotak tadi ke dalam "repeat 36 { [gambar kotak], turn right 10 degrees }".',
        hint: 'Perhatikan bagaimana pola mandala bunga simetris terbentuk otomatis!'
      }
    ],
    quizQuestions: [
      {
        question: 'Berapakah sudut putaran yang dibutuhkan untuk menggambar sebuah segitiga sama sisi dengan blok "turn right"?',
        options: ['60 derajat', '90 derajat', '120 derajat (360 dibagi 3)', '180 derajat'],
        correctAnswerIndex: 2,
        explanation: 'Total sudut luar poligon tertutup adalah 360 derajat. Untuk segitiga: 360 / 3 = 120 derajat.'
      }
    ],
    challenge: {
      title: 'Tantangan: Mandala Bintang Oktagon (Segi-8)',
      description: 'Ganti pola menjadi segi-8 (turn right 45 degrees) dan buat mandala bintang pelangi yang mempesona!',
      bonusXp: 95,
      tips: ['Sudut luar segi-8 adalah 360 / 8 = 45 derajat']
    }
  },
  {
    id: 17,
    semester: 2,
    semesterLevel: 7,
    title: 'Membuat Garis Melengkung Berwarna-warni',
    topics: ['Paint Scratch', 'Pen Extension', 'Kurva & Spiral Archimedes', 'Warna Gradasi Dinamis'],
    indicator: 'Siswa mampu membuat garis melengkung spiral dengan variasi warna menggunakan ekstensi Pen dan pertambahan variabel',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 300,
    iconName: 'Spline',
    category: 'Creative Arts',
    summary: 'Mengeksplorasi matematika kurva lingkaran, spiral Archimedes bergradasi, dan gelombang sinus menggunakan Pen.',
    conceptExplanation: 'Garis lengkung dan spiral tercipta dari perpaduan langkah-langkah sangat kecil dengan sudut belok yang sangat halus secara berulang. Dengan menambah variabel panjang langkah di setiap putaran, kita menciptakan spiral galaksi (Archimedean Spiral).',
    learningGoals: [
      'Menggambar lingkaran sempurna dengan algoritma 360 langkah kecil',
      'Menggunakan variabel dinamis untuk membuat spiral Archimedes yang membesar',
      'Mengatur saturasi (kepekatan) dan brightness (kecerahan) tinta pena',
      'Memahami hubungan antara kelengkungan kurva dengan rasio langkah/sudut'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Galaksi Spiral Archimedes Neon',
        spriteName: 'PenaSpiral',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'hapus semua', category: 'Pen', indent: 0 },
          { text: 'pergi ke x: (0) y: (0)', category: 'Motion', indent: 0 },
          { text: 'atur [PanjangLangkah v] ke (1)', category: 'Variables', indent: 0 },
          { text: 'atur ukuran pena ke (2)', category: 'Pen', indent: 0 },
          { text: 'turunkan pena', category: 'Pen', indent: 0 },
          { text: 'ulangi (250) kali', category: 'Control', indent: 0 },
          { text: 'gerak (PanjangLangkah) langkah', category: 'Motion', indent: 1 },
          { text: 'putar ke kanan (15) derajat', category: 'Motion', indent: 1 },
          { text: 'ubah [PanjangLangkah v] sebesar (0.4)', category: 'Variables', indent: 1 },
          { text: 'ubah warna pena sebesar (1)', category: 'Pen', indent: 1 },
          { text: 'angkat pena', category: 'Pen', indent: 0 }
        ],
        explanation: 'Karena variabel PanjangLangkah bertambah 0.4 di setiap iterasi, lingkaran yang digambar terus membesar membentuk pusaran galaksi spiral.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Spiral terlalu cepat melebar dan menabrak pinggir layar.',
        solution: 'Kecilkan nilai pertambahan variabel, misalnya dari 1 menjadi 0.2 atau 0.3.'
      },
      {
        problem: 'Warna garis tampak redup atau hitam.',
        solution: 'Gunakan blok "set pen brightness to (100)" dan "set pen saturation to (100)" untuk warna cerah maksimal.'
      }
    ],
    summaryPoints: [
      'Rumus dasar lingkaran: repeat 360 { move 2 steps, turn 1 degree }.',
      'Spiral terbentuk saat jarak langkah membesar di setiap putaran sudut.',
      'Kombinasi matematika dan coding dapat menghasilkan karya seni visual modern yang memukau.'
    ],
    keyBlocks: [
      { name: 'repeat (360) { move 2, turn 1 }', category: 'Pen', description: 'Algoritma standar menggambar kurva lingkaran penuh 360 derajat', color: '#0FBD8C' },
      { name: 'change [Panjang v] by (0.5)', category: 'Variables', description: 'Menambah radius spiral secara gradual di setiap perulangan', color: '#FF8C1A' },
      { name: 'set pen [saturation v] to (100)', category: 'Pen', description: 'Mengatur kepekatan dan intensitas warna tinta', color: '#0FBD8C' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Algoritma Lingkaran Pelangi',
        instruction: 'Buat perulangan repeat 360 { move 2 steps, turn right 1 degrees, change pen color by 1 } di bawah blok pen down.',
        hint: 'Sprite akan membentuk lingkaran pelangi penuh.'
      },
      {
        stepNumber: 2,
        title: 'Pusaran Spiral Galaksi Emas',
        instruction: 'Buat variabel "Panjang". Mulai dari 1, di dalam repeat 200 { move (Panjang) steps, turn right 15 degrees, change Panjang by 0.4, change pen color by 2 }.',
        hint: 'Lihat bagaimana garis melengkung membentuk pusaran spiral kosmik!'
      }
    ],
    quizQuestions: [
      {
        question: 'Bagaimana cara membuat efek kurva spiral yang ukurannya terus membesar?',
        options: ['Mengurangi kecepatan sprite', 'Menambah nilai jarak langkah (move steps) secara bertahap pada setiap perulangan', 'Mengganti backdrop ke hitam', 'Mengunci rotasi sprite'],
        correctAnswerIndex: 1,
        explanation: 'Dengan menambah variabel jarak langkah di setiap perulangan, lingkaran membesar secara bertahap membentuk spiral.'
      }
    ],
    challenge: {
      title: 'Tantangan: Gelombang Ombak Laut (Wave Effect)',
      description: 'Program sprite agar menggambar kurva naik-turun seperti ombak laut samudera dengan gradasi warna biru toska!',
      bonusXp: 100,
      tips: ['Gunakan perpaduan belok kiri dan belok kanan berirama secara berulang']
    }
  },
  {
    id: 18,
    semester: 2,
    semesterLevel: 8,
    title: 'Membuat Scroll Backdrop: Atas ke Bawah',
    topics: ['Customes', 'Parallax Scrolling', 'Pergerakan Vertikal Latar', 'Seamless Loop'],
    indicator: 'Siswa mampu membuat efek backdrop bergerak secara vertikal dari atas ke bawah menggunakan pergerakan latar tanpa putus',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 350,
    iconName: 'ArrowDownCircle',
    category: 'Game Dev',
    summary: 'Teknik Scrolling Background vertikal tak terbatas (Infinite Vertical Scroller) untuk game pesawat luar angkasa dan balap mobil.',
    conceptExplanation: 'Karena backdrop panggung bawaan Scratch bersifat statis (tidak bisa digerakkan dengan blok Motion), efek pemandangan berjalan dibuat dengan mengubah latar belakang menjadi 2 Sprite Kembar (Sprite BG1 dan Sprite BG2) yang saling bergantian bergeser ke bawah dan mereset posisinya saat menyentuh batas bawah layar.',
    learningGoals: [
      'Memahami keterbatasan backdrop statis dan solusinya dengan Sprite Latar',
      'Mengatur posisi awal 2 sprite latar bertingkat (Y: 0 dan Y: 360)',
      'Membuat sistem pergeseran kontinu tanpa celah (Seamless Infinite Loop)',
      'Memastikan sprite latar selalu berada di belakang karakter utama dengan "go to back layer"'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip: Sprite Latar 1 & Sprite Latar 2 (Kembar)',
        spriteName: 'Sprite_BG1',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'pergi ke lapisan [paling belakang v]', category: 'Looks', indent: 0 },
          { text: 'pergi ke x: (0) y: (0)', category: 'Motion', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'ubah y sebesar (-5)', category: 'Motion', indent: 1 },
          { text: 'jika <posisi y < (-355)> maka', category: 'Control', indent: 1 },
          { text: 'atur y ke (355)', category: 'Motion', indent: 2 }
        ],
        explanation: 'Sprite BG1 mulai di y:0, bergerak turun ke bawah. Saat menyentuh y:-355, posisinya langsung diteleportasi kembali ke atas di y:355 (tepat di belakang BG2).'
      },
      {
        title: 'Skrip: Sprite Latar 2 (Mulai di Posisi Atas)',
        spriteName: 'Sprite_BG2',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'pergi ke lapisan [paling belakang v]', category: 'Looks', indent: 0 },
          { text: 'pergi ke x: (0) y: (360)', category: 'Motion', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'ubah y sebesar (-5)', category: 'Motion', indent: 1 },
          { text: 'jika <posisi y < (-355)> maka', category: 'Control', indent: 1 },
          { text: 'atur y ke (355)', category: 'Motion', indent: 2 }
        ],
        explanation: 'BG2 identik dengan BG1, hanya posisi awalnya yang berada di y:360.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Muncul garis celah putih berkedip di antara kedua sprite latar saat bergeser.',
        solution: 'Pastikan nilai reset adalah 355 atau 360 dan ukuran gambar latar menutup layar penuh (480 x 360 pixel).'
      },
      {
        problem: 'Sprite latar menutupi pesawat pemain sehingga pemain tidak kelihatan.',
        solution: 'Pasang blok "go to back layer" pada kedua sprite latar, dan "go to front layer" pada pesawat pemain.'
      }
    ],
    summaryPoints: [
      'Tinggi layar panggung Scratch adalah 360 pixel (dari Y: -180 sampai Y: +180).',
      'Teknik 2 Sprite Kembar adalah standar industri untuk menciptakan efek latar bergerak tak terbatas.',
      'Semua game pesawat luar angkasa vertikal menggunakan prinsip pergeseran Y negatif ini.'
    ],
    keyBlocks: [
      { name: 'set y to (360) -> repeat (change y by -5)', category: 'Motion', description: 'Menggeser latar ke bawah secara kontinu', color: '#4C97FF' },
      { name: 'if <y position < -355> then { set y to (355) }', category: 'Control', description: 'Mereset latar kembali ke atas saat menyentuh batas bawah (Seamless Loop)', color: '#FFAB19' },
      { name: 'go to [back v] layer', category: 'Looks', description: 'Memastikan sprite latar selalu berada di lapisan visual paling belakang', color: '#9966FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuat 2 Sprite Latar Bintang',
        instruction: 'Buat 2 sprite berukuran penuh layar dengan gambar luar angkasa berbintang. Beri nama "BG1" dan "BG2".',
        hint: 'Gunakan blok "go to back layer" pada keduanya.'
      },
      {
        stepNumber: 2,
        title: 'Mengatur Posisi Awal Bertingkat',
        instruction: 'Atur BG1 di posisi (x: 0, y: 0) dan BG2 tepat di atasnya (x: 0, y: 360).',
        hint: 'Tinggi panggung Scratch adalah 360 pixel.'
      },
      {
        stepNumber: 3,
        title: 'Looping Gerakan Vertikal Mulus',
        instruction: 'Pada kedua sprite: forever { change y by -5, if y position < -355 then set y to 355 }.',
        hint: 'Sekarang kamu memiliki efek pesawat terbang menembus luar angkasa tanpa henti!'
      }
    ],
    quizQuestions: [
      {
        question: 'Berapa tinggi total layar panggung Scratch dalam satuan pixel?',
        options: ['100 pixel', '240 pixel', '360 pixel (dari -180 sampai +180)', '480 pixel'],
        correctAnswerIndex: 2,
        explanation: 'Layar Scratch memiliki lebar 480 pixel (-240 sampai +240) dan tinggi 360 pixel (-180 sampai +180).'
      }
    ],
    challenge: {
      title: 'Tantangan: Kecepatan Warp Speed',
      description: 'Buat tombol Turbo (Spasi) yang melipatgandakan kecepatan scroll latar menjadi -15 pixel per frame dengan efek bintang melesat!',
      bonusXp: 90,
      tips: ['Gunakan variabel KecepatanScroll di dalam blok change y']
    }
  },
  {
    id: 19,
    semester: 2,
    semesterLevel: 9,
    title: 'Membuat Scroll Backdrop: Bawah ke Atas / Horizontal',
    topics: ['Customes', 'Horizontal Scrolling', 'Platformer Runner', 'Efek Kedalaman Parallax'],
    indicator: 'Siswa mampu membuat efek backdrop bergerak secara horizontal dengan efek kedalaman lapisan visual Parallax Multi-Layer',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 350,
    iconName: 'ArrowRightCircle',
    category: 'Game Dev',
    summary: 'Menerapkan horizontal scrolling (Side-scrolling Platformer seperti Mario/Flappy Bird) dengan efek kedalaman Parallax Multi-Layer.',
    conceptExplanation: 'Parallax Scrolling memberikan ilusi kedalaman 3D pada game 2D di mana lapisan latar depan (pohon, tanah jalan) bergerak lebih cepat daripada lapisan latar belakang (gunung, awan jauh). Ini meniru cara mata manusia melihat pemandangan dari dalam kereta api yang bergerak.',
    learningGoals: [
      'Menerapkan pergeseran horizontal Sumbu X (Kanan ke Kiri) tak terbatas',
      'Membuat sistem 2 Lapisan Parallax: Latar Jauh (Lambat) dan Latar Dekat (Cepat)',
      'Membuat mekanika lompatan karakter pelari dengan fisika gravitasi sederhana',
      'Menghasilkan rintangan rintangan tanah yang muncul secara berkala'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip 1: Lapisan Awan Jauh (Parallax Lambat)',
        spriteName: 'AwanJauh',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'pergi ke lapisan [paling belakang v]', category: 'Looks', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'ubah x sebesar (-2)', category: 'Motion', indent: 1 },
          { text: 'jika <posisi x < (-475)> maka', category: 'Control', indent: 1 },
          { text: 'atur x ke (475)', category: 'Motion', indent: 2 }
        ],
        explanation: 'Awan bergerak perlahan (-2 pixel per frame) karena berada sangat jauh di cakrawala.'
      },
      {
        title: 'Skrip 2: Lapisan Tanah & Pohon Depan (Parallax Cepat)',
        spriteName: 'TanahDepan',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'ubah x sebesar (-8)', category: 'Motion', indent: 1 },
          { text: 'jika <posisi x < (-475)> maka', category: 'Control', indent: 1 },
          { text: 'atur x ke (475)', category: 'Motion', indent: 2 }
        ],
        explanation: 'Tanah di dekat kamera bergerak 4x lebih cepat (-8 pixel per frame), menciptakan efek kedalaman 3D yang sangat nyata.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Lebar panggung Scratch adalah 480 pixel, sprite tanah berhenti sebelum menutup layar penuh.',
        solution: 'Di editor Paint, buat gambar sprite tanah memiliki lebar minimal 480 pixel atau gandakan menjadi 2 sprite BG tanah (BG1 dan BG2).'
      },
      {
        problem: 'Karakter pelari melayang di udara saat melompat.',
        solution: 'Gunakan perulangan naik (repeat 10 change y by 10) lalu segera ikuti dengan perulangan turun (repeat 10 change y by -10).'
      }
    ],
    summaryPoints: [
      'Lebar panggung Scratch adalah 480 pixel (dari X: -240 sampai X: +240).',
      'Prinsip Parallax: Objek yang semakin jauh dari kamera bergerak semakin lambat.',
      'Parallax scrolling adalah kunci visual yang membuat game indie 2D terlihat profesional.'
    ],
    keyBlocks: [
      { name: 'if <x position < -475> then { set x to (475) }', category: 'Control', description: 'Looping horizontal mulus saat latar menyentuh sisi kiri layar', color: '#FFAB19' },
      { name: 'change x by (-2) vs change x by (-8)', category: 'Motion', description: 'Perbedaan rasio kecepatan menghasilkan ilusi kedalaman Parallax 3D', color: '#4C97FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Menyiapkan Latar Gunung & Awan',
        instruction: 'Buat Sprite "Awan_Jauh" dan Sprite "Tanah_Depan".',
        hint: 'Awan diatur di layer belakang, tanah di layer depan.'
      },
      {
        stepNumber: 2,
        title: 'Menerapkan Efek Parallax 2 Lapisan',
        instruction: 'Gerakkan Awan perlahan (change x by -2) dan gerakkan Tanah lebih cepat (change x by -8).',
        hint: 'Pemain akan merasakan kedalaman atmosfer yang memukau!'
      },
      {
        stepNumber: 3,
        title: 'Karakter Melompat Melintasi Rintangan',
        instruction: 'Tambahkan karakter pelari (Runner) yang bisa melompat dengan tombol Spasi untuk melewati rintangan batu kaktus.',
        hint: 'Gunakan gravitasi: repeat 10 (change y by 12) lalu repeat 10 (change y by -12).'
      }
    ],
    quizQuestions: [
      {
        question: 'Apa prinsip dasar dari efek Parallax Scrolling pada game 2D?',
        options: ['Semua objek bergerak dengan kecepatan sama', 'Objek yang berada lebih jauh dari kamera bergerak lebih lambat dibanding objek di dekat kamera', 'Mengubah karakter jadi tembus pandang', 'Menghilangkan semua rintangan'],
        correctAnswerIndex: 1,
        explanation: 'Parallax meniru persepsi mata di mana objek jauh (seperti gunung) tampak bergerak jauh lebih lambat dibanding objek dekat.'
      }
    ],
    challenge: {
      title: 'Tantangan: Endless Runner dengan Skor Jarak',
      description: 'Buat variabel "Jarak Tempuh (Meter)" yang otomatis bertambah seiring berjalannya latar belakang!',
      bonusXp: 100,
      tips: ['Tambahkan rintangan batu yang muncul dengan sistem kloning acak']
    }
  },
  {
    id: 20,
    semester: 2,
    semesterLevel: 10,
    title: 'Projek Scratch Pong Game (Multiplayer & AI)',
    topics: ['Paint Scratch', 'Sensing', 'Motion', 'Multiplayer 2-Pemain', 'Deteksi Pantulan Vektor', 'Sistem Skor Juara'],
    indicator: 'Siswa mampu merancang dan membuat permainan klasik Pong dengan kontrol multiplayer, fisika pantulan sudut, dan papan skor juara',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 500,
    iconName: 'Trophy',
    category: 'Game Dev',
    summary: 'Membangun game legendaris Pong Arcade: Raket Pemain 1 (W/S), Raket Pemain 2 (Up/Down), Fisika Pantulan Bola Sudut Cerdas, dan Papan Skor Juara.',
    conceptExplanation: 'Game Pong adalah mahakarya penutup silabus 20 Level DJuragan Coding! Proyek ini mengintegrasikan seluruh kompetensi: Variabel Skor ganda (P1 & P2), Sensing batas gawang, Kalkulasi sudut pantul vektor matematika (point in direction 180 - direction), Mode Multiplayer, serta State Kemenangan Juara.',
    learningGoals: [
      'Membuat kontrol independen untuk Raket Pemain 1 (W/S) dan Raket Pemain 2 (Panah Atas/Bawah)',
      'Menerapkan rumus fisika sudut pantul vektor bola: "point in direction ((180) - (direction))"',
      'Mendeteksi gol saat bola melewati koordinat X batas gawang (x < -220 atau x > 220)',
      'Mereset posisi bola ke tengah (0,0) setiap kali gol terjadi dan menentukan pemenang di skor 5'
    ],
    scriptPseudocode: [
      {
        title: 'Skrip 1: Fisika Pantulan & Skor Bola Pong',
        spriteName: 'BolaPong',
        codeBlocks: [
          { text: 'ketika bendera hijau diklik', category: 'Events', indent: 0 },
          { text: 'atur [Skor_P1 v] ke (0)', category: 'Variables', indent: 0 },
          { text: 'atur [Skor_P2 v] ke (0)', category: 'Variables', indent: 0 },
          { text: 'pergi ke x: (0) y: (0)', category: 'Motion', indent: 0 },
          { text: 'menghadap ke arah (pilih acak 45 s/d 135)', category: 'Motion', indent: 0 },
          { text: 'selamanya', category: 'Control', indent: 0 },
          { text: 'gerak (8) langkah', category: 'Motion', indent: 1 },
          { text: 'jika di pinggir, pantulkan', category: 'Motion', indent: 1 },
          { text: 'jika <<menyentuh [Paddle_P1 v] ?> atau <menyentuh [Paddle_P2 v] ?>> maka', category: 'Control', indent: 1 },
          { text: 'menghadap ke arah ((180) - (arah) + (pilih acak -15 s/d 15))', category: 'Motion', indent: 2 },
          { text: 'mainkan suara [Pop] sampai selesai', category: 'Sound', indent: 2 },
          { text: 'jika <posisi x < (-220)> maka', category: 'Control', indent: 1 },
          { text: 'ubah [Skor_P2 v] sebesar (1)', category: 'Variables', indent: 2 },
          { text: 'pergi ke x: (0) y: (0)', category: 'Motion', indent: 2 },
          { text: 'tunggu (1) detik', category: 'Control', indent: 2 },
          { text: 'jika <posisi x > (220)> maka', category: 'Control', indent: 1 },
          { text: 'ubah [Skor_P1 v] sebesar (1)', category: 'Variables', indent: 2 },
          { text: 'pergi ke x: (0) y: (0)', category: 'Motion', indent: 2 },
          { text: 'tunggu (1) detik', category: 'Control', indent: 2 }
        ],
        explanation: 'Bola bergerak kontinu. Saat menyentuh paddle pemain, arah sudutnya dibalik dengan rumus matematika pantulan vektor. Saat bola menembus garis gawang kiri/kanan, skor pemain lawan bertambah.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Bola tersangkut di dalam paddle pemain dan memantul bolak-balik berkali-kali.',
        solution: 'Tambahkan "move 10 steps" segera setelah arah hadap bola dibalikkan agar bola langsung keluar dari area paddle.'
      },
      {
        problem: 'Gerakan bola terlalu lambat atau terlalu cepat.',
        solution: 'Atur kecepatan awal di "move (8) steps" dan tambahkan variabel KecepatanBola yang bertambah 0.5 setiap kali bola berhasil ditepis.'
      }
    ],
    summaryPoints: [
      'Rumus arah pantulan: (180 - direction) membalikkan sudut pantul secara optik simetris.',
      'Sistem Multiplayer lokal memanfaatkan pembagian tombol keyboard (W/S untuk Kiri, Panah untuk Kanan).',
      'Selamat! Kamu telah menguasai seluruh 20 modul dasar pemrograman dan game development Scratch 3.0!'
    ],
    keyBlocks: [
      { name: 'point in direction ((180) - (direction))', category: 'Motion', description: 'Rumus matematika fisika pantulan sudut bola saat mengenai paddle', color: '#4C97FF' },
      { name: 'touching [Paddle_P1 v] or touching [Paddle_P2 v]', category: 'Sensing', description: 'Deteksi sentuhan bola dengan paddle raket pemain 1 atau pemain 2', color: '#5CB1D6' },
      { name: 'if <Skor_P1 = 5> then { broadcast [P1_Menang v] }', category: 'Control', description: 'Logika penentu selebrasi pemenang pertama yang mencapai skor 5', color: '#FFAB19' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mendesain 2 Paddle & Bola Tenis',
        instruction: 'Desain Paddle P1 (Kiri - Biru), Paddle P2 (Kanan - Merah), dan Bola Kuning Neon.',
        hint: 'Paddle P1 dikendalikan tombol W & S, Paddle P2 dengan Tombol Panah Atas & Bawah.'
      },
      {
        stepNumber: 2,
        title: 'Fisika Pantulan Bola Dinamis',
        instruction: 'Bola bergerak terus-menerus: jika menyentuh tepi atas/bawah -> pantulkan. Jika menyentuh paddle -> balikkan arah sudut dengan rumus ((180) - (direction)).',
        hint: 'Beri sedikit variasi acak sudut agar permainan seru.'
      },
      {
        stepNumber: 3,
        title: 'Sistem Skor Goal & Kondisi Menang',
        instruction: 'Jika bola melewati garis x < -220 -> P2 dapat 1 poin. Jika x > 220 -> P1 dapat 1 poin. Pemain pertama yang meraih 5 poin menang!',
        hint: 'Reset posisi bola ke tengah (0,0) setiap kali terjadi gol.'
      }
    ],
    quizQuestions: [
      {
        question: 'Bagaimana cara mereset bola ke tengah lapangan setiap kali salah satu pemain mencetak skor gol?',
        options: ['go to x: 0 y: 0 lalu beri jeda tunggu 1 detik', 'Hapus sprite bola', 'Ganti kostum backdrop', 'Matikan komputer'],
        correctAnswerIndex: 0,
        explanation: 'Perintah "go to x: 0 y: 0" mengembalikan posisi bola ke pusat lapangan untuk memulai babak reli baru.'
      },
      {
        question: 'Selamat! Kamu telah menyelesaikan seluruh 20 Level Silabus DJuragan Coding! Apa langkah terbaik selanjutnya?',
        options: ['Berhenti coding selamanya', 'Terus berkarya membuat game & aplikasi AI sendiri serta berbagi ke teman-teman', 'Menghapus semua karya', 'Hanya bermain game tanpa membuat'],
        correctAnswerIndex: 1,
        explanation: 'Seorang DJuragan Coder sejati terus bereksperimen, menciptakan game seru, dan mempelajari kecerdasan buatan!'
      }
    ],
    challenge: {
      title: 'Tantangan Pamungkas: Mode Lawan Bot AI (Single Player)',
      description: 'Program Paddle P2 agar digerakkan otomatis oleh komputer dengan logika AI: forever { set y to (y position of Bola) }!',
      bonusXp: 150,
      tips: ['Kamu bisa memberi sedikit jeda delay pada Bot AI agar tidak mustahil dikalahkan!']
    }
  }
];

export const BADGES_DATA: Badge[] = [
  { id: 'first_step', name: 'First Step Coder', icon: 'Sparkles', description: 'Menyelesaikan level pertama di DJuragan Coding', category: 'Starter' },
  { id: 'loop_master', name: 'Loop & Motion Wizard', icon: 'Repeat', description: 'Menguasai perulangan dan gerakan berulang', category: 'Logic' },
  { id: 'game_creator', name: 'Game Dev Prodigy', icon: 'Gamepad2', description: 'Berhasil membuat game interaktif pertamamu', category: 'Projects' },
  { id: 'creative_artist', name: 'Pixel & Pen Artist', icon: 'Palette', description: 'Menciptakan karya seni grafis dan mandala dengan kode', category: 'Creativity' },
  { id: 'logic_champion', name: 'Logic & Math Champion', icon: 'Calculator', description: 'Menguasai operator matematika dan variabel data', category: 'Mastery' },
  { id: 'semester_1_complete', name: 'Ganjil Graduate', icon: 'Award', description: 'Menyelesaikan 10 Level Semester Ganjil', category: 'Milestone' },
  { id: 'semester_2_complete', name: 'Genap Master', icon: 'Trophy', description: 'Menyelesaikan 10 Level Semester Genap', category: 'Milestone' },
  { id: 'grandmaster', name: 'DJuragan Coding Grandmaster', icon: 'Crown', description: 'Menyelesaikan semua 20 level silabus & meraih 3000+ XP!', category: 'Honor' }
];

export const AVATAR_OPTIONS = [
  { id: 'bot_neon', name: 'Neon AI Bot', emoji: '🤖', color: 'from-cyan-500 to-blue-600' },
  { id: 'cat_scratch', name: 'Scratch Cat Hero', emoji: '🐱', color: 'from-amber-400 to-orange-600' },
  { id: 'rocket_coder', name: 'Astro Coder', emoji: '🚀', color: 'from-purple-500 to-indigo-600' },
  { id: 'wizard_math', name: 'Cyber Wizard', emoji: '🧙‍♂️', color: 'from-emerald-400 to-teal-600' },
  { id: 'ninja_logic', name: 'Code Ninja', emoji: '🥷', color: 'from-rose-500 to-red-600' },
  { id: 'dragon_ai', name: 'AI Dragon', emoji: '🐉', color: 'from-fuchsia-500 to-pink-600' }
];
