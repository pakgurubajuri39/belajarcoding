import { SyllabusLevel, Badge } from '../types';

export const SYLLABUS_DATA: SyllabusLevel[] = [
  // SEMESTER GANJIL
  {
    id: 1,
    semester: 1,
    semesterLevel: 1,
    title: 'Mengenal Bagian Menu Scratch',
    topics: ['Menu Utama', 'Menu Perintah', 'Ruang Kerja'],
    indicator: 'Siswa mampu mengidentifikasi dan menjelaskan fungsi-fungsi utama pada menu Scratch',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 150,
    iconName: 'Layout',
    category: 'Foundation',
    summary: 'Mengenal antarmuka Scratch 3.0: Stage, Sprite List, Block Palette, Scripts Area, Toolbar, dan Tutorial terintegrasi.',
    conceptExplanation: 'Scratch adalah platform coding visual berbasis blok yang dikembangkan oleh MIT Media Lab. Di sini kita memprogram dengan menyusun blok-blok kode warna-warni seperti puzzle tanpa takut salah ketik (syntax error).',
    keyBlocks: [
      { name: 'when green flag clicked', category: 'Events', description: 'Memulai program saat bendera hijau ditekan', color: '#FFBF00' },
      { name: 'say [Halo Dunia!] for [2] secs', category: 'Looks', description: 'Membuat sprite berbicara dengan balon teks', color: '#9966FF' },
      { name: 'move [10] steps', category: 'Motion', description: 'Menggerakkan sprite maju sesuai arahnya', color: '#4C97FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mengenal Ruang Kerja (Workspace)',
        instruction: 'Buka Scratch Editor di samping. Perhatikan 3 area utama: Palet Blok (kiri), Ruang Skrip (tengah), dan Panggung/Stage (kanan).',
        hint: 'Blok dikelompokkan berdasarkan warna: Biru untuk Gerakan, Ungu untuk Tampilan, Kuning untuk Peristiwa.',
        blockGuide: 'Events > when green flag clicked'
      },
      {
        stepNumber: 2,
        title: 'Membuat Program Pertama: Halo DJuragan!',
        instruction: 'Tarik blok kuning "when green flag clicked" ke area skrip, lalu sambungkan blok ungu "say [Halo DJuragan Coding!] for [3] secs".',
        hint: 'Klik bendera hijau di atas panggung untuk menjalankan skrip!',
        blockGuide: 'Looks > say [Halo DJuragan Coding!] for [3] secs'
      },
      {
        stepNumber: 3,
        title: 'Eksplorasi Sprite & Kostum',
        instruction: 'Coba ganti nama Sprite kucing menjadi "Kucing Juara" dan lihat tab "Costumes" di pojok kiri atas.',
        hint: 'Di tab Costumes kamu bisa melihat animasi 2 frame dari sprite kucing.'
      }
    ],
    quizQuestions: [
      {
        question: 'Bagian manakah di Scratch yang digunakan untuk melihat hasil gerakan dan animasi sprite?',
        options: ['Scripts Area (Ruang Kode)', 'Stage (Panggung)', 'Block Palette', 'Costume Tab'],
        correctAnswerIndex: 1,
        explanation: 'Stage (Panggung) adalah layar tampilan tempat sprite beraksi dan animasi ditampilkan.'
      },
      {
        question: 'Kategori blok warna apakah yang digunakan untuk memulai program saat bendera hijau diklik?',
        options: ['Motion (Biru)', 'Looks (Ungu)', 'Events (Kuning)', 'Control (Oranye)'],
        correctAnswerIndex: 2,
        explanation: 'Events (Peristiwa) berwarna kuning dan berisi pemicu seperti "when green flag clicked".'
      }
    ],
    challenge: {
      title: 'Tantangan: Kucing Menyapa & Bersuara',
      description: 'Tambahkan blok Sound "play sound Meow until done" setelah sprite mengucapkan salam!',
      bonusXp: 50,
      tips: ['Cari kategori Sound (Merah Muda)', 'Gabungkan di bawah blok Say']
    }
  },
  {
    id: 2,
    semester: 1,
    semesterLevel: 2,
    title: 'Menyusun dan Menjalankan Perintah',
    topics: ['Start/Stop', 'Sprite', 'Point Toward'],
    indicator: 'Siswa mampu menyusun serangkaian perintah menggunakan blok-blok kode sederhana',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 200,
    iconName: 'PlayCircle',
    category: 'Foundation',
    summary: 'Belajar mengeksekusi program berurutan (algoritma sekuensial), mengarahkan sprite dengan Point Toward, dan kontrol Start/Stop.',
    conceptExplanation: 'Komputer membaca instruksi dari atas ke bawah secara berurutan. Perintah "Point towards [mouse-pointer]" membuat sprite selalu menatap kursor mouse pemain.',
    keyBlocks: [
      { name: 'point towards [mouse-pointer v]', category: 'Motion', description: 'Memutar orientasi sprite menghadap posisi pointer', color: '#4C97FF' },
      { name: 'stop [all v]', category: 'Control', description: 'Menghentikan seluruh skrip yang sedang aktif', color: '#FFAB19' },
      { name: 'wait [1] seconds', category: 'Control', description: 'Memberikan jeda waktu sebelum perintah berikutnya', color: '#FFAB19' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Menghadap Pointer Mouse',
        instruction: 'Susun blok: when green flag clicked -> point towards [mouse-pointer] -> move [50] steps.',
        hint: 'Arahkan mouse ke posisi berbeda lalu klik bendera hijau.',
        blockGuide: 'Motion > point towards [mouse-pointer]'
      },
      {
        stepNumber: 2,
        title: 'Kombinasi Urutan Perintah (Sequencing)',
        instruction: 'Buat sprite bergerak 50 langkah, tunggu 1 detik, lalu putar 90 derajat searah jarum jam.',
        hint: 'Gunakan blok "turn right 90 degrees" dan "wait 1 secs".'
      }
    ],
    quizQuestions: [
      {
        question: 'Bagaimana cara komputer membaca susunan blok perintah di Scratch?',
        options: ['Dari bawah ke atas', 'Dari kanan ke kiri', 'Dari atas ke bawah secara berurutan', 'Secara acak'],
        correctAnswerIndex: 2,
        explanation: 'Algoritma komputer membaca instruksi secara sekuensial (dari atas ke bawah).'
      }
    ],
    challenge: {
      title: 'Tantangan: Sprite Pengikut Mouse Berjeda',
      description: 'Buat sprite berputar menghadap mouse, bersuara, lalu meluncur (glide) selama 1 detik ke arah mouse!',
      bonusXp: 60,
      tips: ['Gunakan blok Motion "glide 1 secs to mouse-pointer"']
    }
  },
  {
    id: 3,
    semester: 1,
    semesterLevel: 3,
    title: 'Membuat Sprite Bergerak 1',
    topics: ['Gerakan Memantul', 'Repeat and Forever'],
    indicator: 'Siswa mampu membuat sprite bergerak dengan menggunakan perintah pergerakan dasar seperti maju, mundur, dan berputar',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 200,
    iconName: 'Repeat',
    category: 'Motion & Loop',
    summary: 'Menggunakan struktur perulangan (Repeat & Forever) serta perintah if on edge, bounce agar sprite memantul otomatis saat menabrak dinding.',
    conceptExplanation: 'Perulangan (Loop) adalah konsep dasar coding agar komputer menjalankan serangkaian aksi berulang kali tanpa kita harus menulis blok yang sama berkali-kali.',
    keyBlocks: [
      { name: 'forever { ... }', category: 'Control', description: 'Mengulang blok di dalamnya terus menerus tanpa henti', color: '#FFAB19' },
      { name: 'repeat (10) { ... }', category: 'Control', description: 'Mengulang blok sebanyak jumlah kali tertentu', color: '#FFAB19' },
      { name: 'if on edge, bounce', category: 'Motion', description: 'Membalikkan arah gerakan jika menyentuh tepi panggung', color: '#4C97FF' },
      { name: 'set rotation style [left-right v]', category: 'Motion', description: 'Mencegah sprite terbalik saat memantul', color: '#4C97FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuat Animasi Jalan Tanpa Henti',
        instruction: 'Masukkan blok "move 10 steps" dan "next costume" ke dalam blok "forever". Sambungkan di bawah "when green flag clicked".',
        hint: 'Tambahkan "wait 0.1 secs" agar langkah kaki kucing terlihat natural!'
      },
      {
        stepNumber: 2,
        title: 'Menambahkan Pantulan Tepi',
        instruction: 'Tambahkan blok "if on edge, bounce" dan atur "set rotation style [left-right]" agar kucing tidak berjalan terbalik.',
        hint: 'Blok rotation style ada di kategori Motion.'
      }
    ],
    quizQuestions: [
      {
        question: 'Blok apakah yang mencegah sprite bergerak keluar batas layar panggung?',
        options: ['move 10 steps', 'if on edge, bounce', 'stop all', 'hide'],
        correctAnswerIndex: 1,
        explanation: 'Blok "if on edge, bounce" mendeteksi tepi panggung dan memantulkan arah sprite.'
      }
    ],
    challenge: {
      title: 'Tantangan: Balapan 2 Sprite',
      description: 'Tambahkan sprite kedua (misal: Anjing atau Burung) dan buat keduanya bergerak memantul dengan kecepatan berbeda!',
      bonusXp: 75,
      tips: ['Gunakan move 15 steps untuk sprite yang lebih cepat']
    }
  },
  {
    id: 4,
    semester: 1,
    semesterLevel: 4,
    title: 'Membuat Sprite Bergerak 2',
    topics: ['Go To', 'If then else'],
    indicator: 'Siswa mampu mengembangkan sprite yang memiliki gerakan lebih kompleks',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 250,
    iconName: 'GitBranch',
    category: 'Motion & Loop',
    summary: 'Percabangan logika dengan "if then else" dan penentuan posisi spesifik (X, Y) menggunakan "go to x: y:".',
    conceptExplanation: 'Logika kondisional (If-Then-Else) memungkinkan komputer mengambil keputusan cerdas: "JIKA kondisi terpenuhi MAKA lakukan A, JIKA TIDAK lakukan B".',
    keyBlocks: [
      { name: 'go to x: (0) y: (0)', category: 'Motion', description: 'Mereset posisi sprite ke koordinat pusat layar', color: '#4C97FF' },
      { name: 'if <...> then { } else { }', category: 'Control', description: 'Struktur logika percabangan dua kondisi', color: '#FFAB19' },
      { name: 'touching [mouse-pointer v] ?', category: 'Sensing', description: 'Sensor mendeteksi sentuhan pointer/sprite lain', color: '#5CB1D6' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Menentukan Posisi Awal (Reset)',
        instruction: 'Awali skrip dengan "go to x: -180 y: 0" agar sprite selalu mulai dari sisi kiri panggung setiap kali bendera hijau ditekan.',
        hint: 'Koordinat panggung Scratch berpusat di X: 0, Y: 0.'
      },
      {
        stepNumber: 2,
        title: 'Kondisi Sentuhan Mouse',
        instruction: 'Di dalam perulangan forever: buat IF touching mouse-pointer THEN ubah warna (change color effect by 25) ELSE kembalikan efek (clear graphic effects).',
        hint: 'Efek warna ada di kategori Looks (Ungu).'
      }
    ],
    quizQuestions: [
      {
        question: 'Berapakah koordinat pusat tengah layar pada panggung Scratch?',
        options: ['x: 100, y: 100', 'x: 0, y: 0', 'x: -240, y: -180', 'x: 240, y: 180'],
        correctAnswerIndex: 1,
        explanation: 'Pusat panggung Scratch adalah koordinat kartesius (0, 0).'
      }
    ],
    challenge: {
      title: 'Tantangan: Area Terlarang Sensor',
      description: 'Buat sprite berganti kostum menjadi ekspresi terkejut jika koordinat X lebih besar dari 100!',
      bonusXp: 80,
      tips: ['Gunakan operator ">" dari kategori Operator warna hijau']
    }
  },
  {
    id: 5,
    semester: 1,
    semesterLevel: 5,
    title: 'Projek Game Saling Menembak',
    topics: ['Koordinat', 'Sensing', 'Point in Direction'],
    indicator: 'Siswa memahami dan mampu merancang dan membuat permainan interaktif sederhana',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 350,
    iconName: 'Crosshair',
    category: 'Game Dev',
    summary: 'Membangun game aksi tembak-menembak sederhana: Sprite Pemain, Peluru (Laser), dan Target Musuh dengan sistem cloning/koordinat.',
    conceptExplanation: 'Dalam game development, kita mengkoordinasikan input pemain untuk mengarahkan bidikan (Point in Direction), meluncurkan proyektil, dan mendeteksi tabrakan (Collision Detection).',
    keyBlocks: [
      { name: 'point in direction (90)', category: 'Motion', description: 'Mengatur sudut hadap (90 = Kanan, -90 = Kiri, 0 = Atas, 180 = Bawah)', color: '#4C97FF' },
      { name: 'create clone of [myself v]', category: 'Control', description: 'Menciptakan duplikat sprite (seperti peluru beruntun)', color: '#FFAB19' },
      { name: 'when I start as a clone', category: 'Control', description: 'Skrip yang dijalankan oleh setiap peluru clone baru', color: '#FFAB19' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Kontrol Pesawat/Pemain',
        instruction: 'Buat sprite pemain bergerak ke atas dan bawah dengan tombol panah (Up Arrow / Down Arrow).',
        hint: 'Gunakan blok "change y by 10" untuk naik dan "change y by -10" untuk turun.'
      },
      {
        stepNumber: 2,
        title: 'Mekanisme Tembakan Laser',
        instruction: 'Saat tombol Space ditekan -> buat clone dari sprite Laser -> buat laser meluncur cepat ke kanan sampai menyentuh musuh atau tepi.',
        hint: 'Pada laser: when I start as a clone -> go to Pesawat -> show -> repeat until touching edge (change x by 15) -> delete this clone.'
      }
    ],
    quizQuestions: [
      {
        question: 'Arah sudut berapakah yang menunjukkan arah ke ATAS pada Scratch?',
        options: ['90 derajat', '180 derajat', '0 derajat', '-90 derajat'],
        correctAnswerIndex: 2,
        explanation: '0 derajat mengarah ke atas, 90 ke kanan, 180 ke bawah, dan -90 ke kiri.'
      }
    ],
    challenge: {
      title: 'Tantangan: Efek Ledakan Musuh',
      description: 'Saat peluru mengenai musuh, ganti kostum musuh menjadi ledakan lalu buat musuh muncul kembali di posisi acak!',
      bonusXp: 100,
      tips: ['Gunakan "pick random -150 to 150" untuk koordinat Y musuh']
    }
  },
  {
    id: 6,
    semester: 1,
    semesterLevel: 6,
    title: 'Memahami Looks (Tampilan & Efek)',
    topics: ['Menu Looks', 'Visual Effects', 'Kostum & Rotasi'],
    indicator: 'Siswa mampu memanipulasi tampilan sprite seperti mengubah kostum, rotasi, dan efek visual',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 200,
    iconName: 'Sparkles',
    category: 'Looks & Art',
    summary: 'Bereksperimen dengan efek grafis menarik: Color, Fisheye, Whirl, Pixelate, Mosaic, Brightness, dan Ghost (transparansi).',
    conceptExplanation: 'Menu Looks mengontrol segala hal visual dari sprite: ukuran (scale), animasi pergantian frame (costume), urutan layer, dan efek shader digital.',
    keyBlocks: [
      { name: 'change [color v] effect by (25)', category: 'Looks', description: 'Mengubah palet warna sprite secara dinamis', color: '#9966FF' },
      { name: 'set [ghost v] effect to (50)', category: 'Looks', description: 'Mengatur tingkat transparansi tembus pandang sprite', color: '#9966FF' },
      { name: 'switch costume to [costume2 v]', category: 'Looks', description: 'Mengganti pose/tampilan gambar sprite', color: '#9966FF' },
      { name: 'change size by (10)', category: 'Looks', description: 'Memperbesar atau memperkecil ukuran sprite', color: '#9966FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Efek Pelangi Berputar',
        instruction: 'Susun blok: forever { change color effect by 5, turn right 5 degrees } di bawah bendera hijau.',
        hint: 'Sprite akan berputar sambil warnanya berganti secara mulus seperti roda warna neon!'
      },
      {
        stepNumber: 2,
        title: 'Efek Berkedip & Hantu (Ghost Effect)',
        instruction: 'Gunakan perulangan untuk menaikkan ghost effect dari 0 ke 100 lalu kembali ke 0.',
        hint: 'Ini teknik dasar membuat animasi sprite menghilang perlahan (fade out).'
      }
    ],
    quizQuestions: [
      {
        question: 'Efek apakah di menu Looks yang digunakan untuk membuat sprite tampak transparan / tembus pandang?',
        options: ['Pixelate', 'Whirl', 'Ghost', 'Mosaic'],
        correctAnswerIndex: 2,
        explanation: 'Ghost effect mengatur tingkat transparansi dari 0 (padat) hingga 100 (tak terlihat).'
      }
    ],
    challenge: {
      title: 'Tantangan: Animasi Karakter Berbicara & Membesar',
      description: 'Saat diklik, buat sprite membesar 20%, mengucapkan mantra sulap, lalu kembali ke ukuran semula!',
      bonusXp: 70,
      tips: ['Gunakan trigger "when this sprite clicked"']
    }
  },
  {
    id: 7,
    semester: 1,
    semesterLevel: 7,
    title: 'Mengendalikan Sprite: Keyboard & Mouse',
    topics: ['Sensing Keyboard', 'Sensing Mouse'],
    indicator: 'Siswa mampu menghubungkan input dari keyboard dan mouse untuk mengendalikan dan tindakan pergerakan sprite',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 250,
    iconName: 'Gamepad2',
    category: 'Input & Sensing',
    summary: 'Menerapkan event input responsif: tombol panah (Arrow keys), tombol WASD, mouse click, dan koordinat mouse_x / mouse_y.',
    conceptExplanation: 'Interaktivitas dalam game lahir dari respons terhadap aksi pengguna. Kita menggunakan sensor input untuk membaca tekanan tombol secara kontinu (smooth movement).',
    keyBlocks: [
      { name: 'key [space v] pressed ?', category: 'Sensing', description: 'Mendeteksi apakah suatu tombol keyboard sedang ditekan', color: '#5CB1D6' },
      { name: 'mouse down ?', category: 'Sensing', description: 'Mendeteksi klik mouse pemain', color: '#5CB1D6' },
      { name: 'mouse x / mouse y', category: 'Sensing', description: 'Memberikan nilai posisi kursor secara real-time', color: '#5CB1D6' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Gerakan 4 Arah Halus (Smooth 4-Way)',
        instruction: 'Di dalam blok forever, buat 4 blok IF untuk tombol panah Kanan (change x by 8), Kiri (change x by -8), Atas (change y by 8), dan Bawah (change y by -8).',
        hint: 'Jangan gunakan event "when key pressed" terpisah agar gerakan tidak patah-patah.'
      },
      {
        stepNumber: 2,
        title: 'Menggambar dengan Jejak Mouse',
        instruction: 'Buat sprite mengikuti posisi mouse x dan mouse y saat tombol mouse ditekan.',
        hint: 'Gunakan "go to x: (mouse x) y: (mouse y)".'
      }
    ],
    quizQuestions: [
      {
        question: 'Mengapa menggunakan "if key [right] pressed" di dalam loop forever lebih disukai untuk game dibanding "when right key pressed"?',
        options: ['Karena lebih boros memori', 'Menghasilkan pergerakan yang jauh lebih halus tanpa jeda awal', 'Agar tombol tidak bisa ditekan', 'Hanya bisa dipakai di panggung'],
        correctAnswerIndex: 1,
        explanation: 'Loop forever memeriksa status tombol setiap frame (30 fps), sehingga gerakan responsif tanpa jeda delay keyboard OS.'
      }
    ],
    challenge: {
      title: 'Tantangan: Karakter Dash Cepat',
      description: 'Tambahkan tombol Shift atau Spasi agar saat ditekan bersamaan dengan tombol arah, karakter melaju 2x lebih kencang!',
      bonusXp: 85,
      tips: ['Gunakan blok Operator "and" untuk mengecek dua tombol sekaligus']
    }
  },
  {
    id: 8,
    semester: 1,
    semesterLevel: 8,
    title: 'Membuat dan Mengubah Sprite di Menu Paint',
    topics: ['Paint Scratch', 'Vector Editor', 'Alat Desain Sprite'],
    indicator: 'Siswa mampu membuat dan mengedit sprite menggunakan alat-alat di menu Paint Scratch',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 200,
    iconName: 'Palette',
    category: 'Looks & Art',
    summary: 'Menguasai editor gambar internal Scratch: Mode Vektor vs Bitmap, Reshape tool, Fill gradient, Grouping, dan Layering.',
    conceptExplanation: 'Karakter game yang unik dibuat melalui Vector Art. Gambar vektor tidak pecah saat diperbesar dan setiap bentuk dapat diubah titik sudutnya (nodes/points).',
    keyBlocks: [
      { name: 'Paint Editor Tools', category: 'Looks', description: 'Brush, Line, Rectangle, Circle, Reshape, Text, Fill Bucket', color: '#9966FF' },
      { name: 'Center Point Calibration', category: 'Looks', description: 'Menyelaraskan titik tengah gambar dengan poros rotasi panggung', color: '#9966FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuka Paint Editor',
        instruction: 'Arahkan mouse ke ikon "Choose a Sprite" di pojok kanan bawah, lalu klik ikon kuas cat "Paint".',
        hint: 'Kamu akan diarahkan ke kanvas gambar Vektor Scratch.'
      },
      {
        stepNumber: 2,
        title: 'Menggambar Karakter Robot AI Sederhana',
        instruction: 'Gunakan Circle tool dan Rectangle tool dengan warna biru-cyan neon. Buat badan, kepala, dan antena robot.',
        hint: 'Pastikan titik tengah karakter tepat berada di tanda plus (+) kanvas.'
      },
      {
        stepNumber: 3,
        title: 'Membuat 2 Frame Kostum untuk Animasi Berjalan',
        instruction: 'Duplikat kostum robot, lalu geser posisi kaki dan tangan di kostum kedua.',
        hint: 'Ganti kostum di skrip kode menggunakan "next costume".'
      }
    ],
    quizQuestions: [
      {
        question: 'Mengapa titik tengah (center crosshair) pada kanvas gambar Paint Scratch sangat penting?',
        options: ['Agar warna lebih cerah', 'Sebagai poros pusat putaran dan titik koordinat posisi sprite di panggung', 'Untuk menghapus gambar', 'Supaya sprite tidak bisa bergerak'],
        correctAnswerIndex: 1,
        explanation: 'Titik pusat kanvas menentukan titik tumpu (pivot point) saat sprite berputar dan diposisikan dengan koordinat (X, Y).'
      }
    ],
    challenge: {
      title: 'Tantangan: Karakter Kustom Bersuara',
      description: 'Gambar karakter monster atau alien buatanmu sendiri, buat 3 variasi ekspresi wajah, dan program agar ekspresinya berganti saat ditekan!',
      bonusXp: 80,
      tips: ['Gunakan Reshape tool untuk melengkungkan bentuk mulut']
    }
  },
  {
    id: 9,
    semester: 1,
    semesterLevel: 9,
    title: 'Projek Game Tikus Mencari Keju',
    topics: ['Sensing', 'Looks', 'Customes', 'Labirin & Rintangan'],
    indicator: 'Siswa mampu merancang dan membuat permainan sprite tikus mencari keju dengan rintangan dan logika pergerakan',
    allocation: '3 Pertemuan (3 x 45 menit)',
    xpReward: 400,
    iconName: 'Rat',
    category: 'Game Dev',
    summary: 'Membangun game labirin (Maze Game): Navigasi pemain, dinding pembatas berwarna, target keju, dan musuh kucing penjaga.',
    conceptExplanation: 'Game labirin menggabungkan sensor warna "touching color (?)", sistem win/lose condition, dan reset posisi pemain saat menabrak rintangan.',
    keyBlocks: [
      { name: 'touching color [#000000] ?', category: 'Sensing', description: 'Mendeteksi sentuhan dengan warna dinding labirin', color: '#5CB1D6' },
      { name: 'broadcast [Menang! v]', category: 'Events', description: 'Mengirim sinyal pesan ke semua sprite saat target tercapai', color: '#FFBF00' },
      { name: 'when I receive [Menang! v]', category: 'Events', description: 'Menerima sinyal kemenangan dan menampilkan layar selebrasi', color: '#FFBF00' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuat Latar Labirin (Maze Backdrop)',
        instruction: 'Gambar jalur labirin sederhana menggunakan garis tebal berwarna biru gelap pada Backdrop.',
        hint: 'Gunakan satu warna solid untuk semua dinding labirin agar mudah dideteksi oleh sensor.'
      },
      {
        stepNumber: 2,
        title: 'Mekanika Fisika Dinding (Wall Collision)',
        instruction: 'Pada sprite tikus: jika menyentuh warna dinding, mundurkan tikus sejauh langkahnya (misal: move -5 steps) atau kembalikan ke start.',
        hint: 'Logika: if touching color [Biru Dinding] then move -5 steps.'
      },
      {
        stepNumber: 3,
        title: 'Target Keju & Pesan Kemenangan',
        instruction: 'Saat tikus menyentuh sprite Keju, sembunyikan keju, mainkan suara kemenangan, dan kirim pesan broadcast "Menang!".',
        hint: 'Broadcast adalah cara sprite saling berkomunikasi.'
      }
    ],
    quizQuestions: [
      {
        question: 'Fitur apakah di Scratch yang memungkinkan satu sprite mengirimkan sinyal pemicu ke sprite lain?',
        options: ['Broadcast Message', 'Wait 1 secs', 'Set size to', 'Clear sound effects'],
        correctAnswerIndex: 0,
        explanation: 'Broadcast message mengirimkan sinyal global yang dapat ditangkap oleh sprite lain dengan blok "when I receive".'
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
    topics: ['My Variable', 'Skor Game', 'Manipulasi Data'],
    indicator: 'Siswa mampu memahami konsep variabel dan menggunakan untuk menyimpan dan memanipulasi data dalam proyek Scratch',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 300,
    iconName: 'Database',
    category: 'Math & Logic',
    summary: 'Memahami variabel sebagai kotak penyimpan memori: membuat variabel Skor, Nyawa (Lives), Timer, dan High Score.',
    conceptExplanation: 'Variabel adalah wadah penyimpanan dalam memori komputer yang memiliki nama dan nilai yang bisa berubah-ubah (dinamis) selama program berjalan.',
    keyBlocks: [
      { name: 'set [Skor v] to (0)', category: 'Variables', description: 'Mengisi nilai awal variabel (inisialisasi)', color: '#FF8C1A' },
      { name: 'change [Skor v] by (1)', category: 'Variables', description: 'Menambah atau mengurangi nilai variabel', color: '#FF8C1A' },
      { name: 'show variable [Skor v]', category: 'Variables', description: 'Menampilkan display papan skor di panggung', color: '#FF8C1A' },
      { name: 'hide variable [Skor v]', category: 'Variables', description: 'Menyembunyikan display papan skor', color: '#FF8C1A' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuat Variabel "Skor" Baru',
        instruction: 'Buka menu Variables (Oranye), klik "Make a Variable", beri nama "Skor" dan pilih "For all sprites".',
        hint: 'Variabel global bisa diakses oleh semua sprite di dalam game.'
      },
      {
        stepNumber: 2,
        title: 'Inisialisasi & Penambahan Skor',
        instruction: 'Set Skor ke 0 saat bendera hijau diklik. Setiap kali sprite menangkap item koin, tambah Skor sebesar 10.',
        hint: 'Gunakan blok "change Skor by 10".'
      },
      {
        stepNumber: 3,
        title: 'Sistem Nyawa (Lives System)',
        instruction: 'Buat variabel kedua bernama "Nyawa" dan atur nilai awalnya = 3. Kurangi 1 jika menyentuh rintangan.',
        hint: 'Gunakan "change Nyawa by -1" lalu cek IF Nyawa <= 0 THEN stop all.'
      }
    ],
    quizQuestions: [
      {
        question: 'Kapan waktu terbaik untuk melakukan inisialisasi variabel (misal: set Skor to 0)?',
        options: ['Saat game over', 'Tepat di awal saat program dimulai (when green flag clicked)', 'Di tengah-tengah perulangan forever', 'Tidak perlu diatur'],
        correctAnswerIndex: 1,
        explanation: 'Inisialisasi dilakukan di awal program agar setiap permainan baru dimulai dari kondisi bersih (skor 0).'
      }
    ],
    challenge: {
      title: 'Tantangan: Rekor Skor Tertinggi (High Score)',
      description: 'Buat variabel HighScore yang otomatis diperbarui jika Skor saat ini mengalahkan rekor sebelumnya!',
      bonusXp: 100,
      tips: ['Gunakan operator perbandingan: if <Skor > HighScore> then set HighScore to Skor']
    }
  },

  // SEMESTER GENAP
  {
    id: 11,
    semester: 2,
    semesterLevel: 1,
    title: 'Memahami Menu Operator Matematika',
    topics: ['Operator Matematika', 'Lebih / Kurang', 'And, Or, Not'],
    indicator: 'Siswa mampu menggunakan menu operator matematika Scratch untuk melakukan operasi matematika',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 250,
    iconName: 'Calculator',
    category: 'Math & Logic',
    summary: 'Menggunakan operasi aritmatika (+, -, *, /), pembanding (<, =, >), logika boolean (AND, OR, NOT), string join, dan mod (sisa bagi).',
    conceptExplanation: 'Kecerdasan buatan dan komputasi bertumpu pada matematika dan logika Boolean. Operator memungkinkan kita membuat kalkulator otomatis dan sistem penentu aturan cerdas.',
    keyBlocks: [
      { name: '( ) + ( )  /  ( ) * ( )', category: 'Operators', description: 'Operasi perhitungan matematika dasar', color: '#59C059' },
      { name: '< ( ) > ( ) >', category: 'Operators', description: 'Membandingkan apakah nilai kiri lebih besar dari kanan', color: '#59C059' },
      { name: '< < > and < > >', category: 'Operators', description: 'Kondisi bernilai benar hanya jika KEDUA syarat terpenuhi', color: '#59C059' },
      { name: '< not < > >', category: 'Operators', description: 'Membalikkan kondisi (True jadi False, False jadi True)', color: '#59C059' },
      { name: 'join [apple] [banana]', category: 'Operators', description: 'Menggabungkan dua teks menjadi satu kalimat', color: '#59C059' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuat Game Kuis Matematika Otomatis',
        instruction: 'Buat program yang menanyakan 2 angka acak: "Berapa hasil dari AngkaA + AngkaB?", lalu cocokkan jawaban siswa dengan operator (+).',
        hint: 'Gunakan blok "ask [pertanyaan] and wait" dan bandingkan (answer) = (AngkaA + AngkaB).'
      },
      {
        stepNumber: 2,
        title: 'Logika Multi-Syarat dengan AND',
        instruction: 'Buat kondisi: jika Skor > 50 DAN Nyawa > 0 maka beri gelar "Juara Bertahan".',
        hint: 'Gabungkan dua blok perbandingan hijau ke dalam satu blok "and".'
      }
    ],
    quizQuestions: [
      {
        question: 'Jika kondisi A = BENAR dan kondisi B = SALAH, apa hasil dari blok <A and B>?',
        options: ['BENAR (True)', 'SALAH (False)', 'Tidak bisa ditentukan', 'Error'],
        correctAnswerIndex: 1,
        explanation: 'Operator AND mensyaratkan kedua kondisi harus BENAR sekaligus. Jika salah satu salah, hasilnya SALAH.'
      }
    ],
    challenge: {
      title: 'Tantangan: Detektor Bilangan Genap/Ganjil',
      description: 'Buat program dengan operator "mod 2" yang bisa menebak apakah angka yang diinput user adalah Genap atau Ganjil!',
      bonusXp: 90,
      tips: ['Jika (angka mod 2) = 0 maka angka tersebut adalah GENAP']
    }
  },
  {
    id: 12,
    semester: 2,
    semesterLevel: 2,
    title: 'Projek Mission Target Pursuit',
    topics: ['Sensing', 'Point Direction', 'Random Pick', 'Sistem Skor & AI Kejar'],
    indicator: 'Siswa mampu merancang dan membuat projek misi di mana sprite mengejar target dengan logika pergerakan dan sistem skor.',
    allocation: '3 Pertemuan (3 x 45 menit)',
    xpReward: 400,
    iconName: 'Target',
    category: 'Game Dev',
    summary: 'Membuat game kejar target dinamis: Sprite Drone AI yang mengejar target bergerak acak, penghitung skor berwaktu, dan power-up.',
    conceptExplanation: 'Dalam logika game AI, algoritma "Target Pursuit" membuat agen virtual mengarahkan sudut hadapnya secara terus-menerus ke target dan bergerak mendekatinya.',
    keyBlocks: [
      { name: 'point towards [Target v]', category: 'Motion', description: 'Algoritma orientasi otomatis mengejar target', color: '#4C97FF' },
      { name: 'pick random (1) to (10)', category: 'Operators', description: 'Menghasilkan angka acak yang tidak terduga', color: '#59C059' },
      { name: 'distance to [Target v]', category: 'Sensing', description: 'Mengukur jarak Euclidean pixel ke target', color: '#5CB1D6' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Target Bergerak Acak (Wandering Target)',
        instruction: 'Pada sprite Target: buat bergerak meluncur secara terus menerus ke koordinat acak: glide 1 secs to x: (pick random -200 to 200) y: (pick random -140 to 140).',
        hint: 'Angka acak membuat gerakan target tidak monoton.'
      },
      {
        stepNumber: 2,
        title: 'Drone Pengejar (AI Pursuer)',
        instruction: 'Pada sprite Drone: forever { point towards Target, move 4 steps, if touching Target then change Skor by 1 and play Pop }.',
        hint: 'Kecepatan drone menentukan tingkat kesulitan game.'
      }
    ],
    quizQuestions: [
      {
        question: 'Blok apakah yang digunakan untuk menghasilkan posisi atau angka yang bervariasi secara otomatis?',
        options: ['pick random (...) to (...)', 'set size to 100', 'wait 1 secs', 'stop this script'],
        correctAnswerIndex: 0,
        explanation: 'Blok "pick random" menghasilkan bilangan acak untuk simulasi, posisi spawn, dan variasi game.'
      }
    ],
    challenge: {
      title: 'Tantangan: Kecepatan Bertambah Setiap 5 Poin',
      description: 'Buat variabel Kecepatan yang otomatis bertambah cepat setiap kali pemain berhasil mengumpulkan 5 target!',
      bonusXp: 110,
      tips: ['Gunakan variabel Kecepatan di dalam blok move (Kecepatan) steps']
    }
  },
  {
    id: 13,
    semester: 2,
    semesterLevel: 3,
    title: 'Membuat Animasi Hujan',
    topics: ['Paint Scratch', 'Next Costumes', 'Efek Partikel Hujan'],
    indicator: 'Siswa mampu membuat animasi dengan efek hujan dengan perubahan tampilan visual',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 250,
    iconName: 'CloudRain',
    category: 'Simulation',
    summary: 'Mensimulasikan sistem partikel cuaca (Weather Particle System): titik-titik air hujan jatuh, kilatan petir dengan kostum, dan genangan air.',
    conceptExplanation: 'Sistem partikel adalah teknik grafis komputer di mana ratusan objek kecil (tetesan hujan/salju/percikan api) dihasilkan secara berulang dengan variasi kecepatan dan ukuran.',
    keyBlocks: [
      { name: 'create clone of [myself v]', category: 'Control', description: 'Menghasilkan ratusan butiran tetesan hujan', color: '#FFAB19' },
      { name: 'change y by (-15)', category: 'Motion', description: 'Simulasi gravitasi jatuhnya tetesan air ke bawah', color: '#4C97FF' },
      { name: 'next costume', category: 'Looks', description: 'Animasi percikan air (splash) saat menyentuh tanah', color: '#9966FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Menggambar Butiran Hujan & Percikan',
        instruction: 'Di Paint Editor, gambar garis biru ramping untuk tetesan air (Kostum 1) dan lingkaran kecil percikan air (Kostum 2).',
        hint: 'Beri nama kostum "drop" dan "splash".'
      },
      {
        stepNumber: 2,
        title: 'Membuat Generator Kloning Hujan',
        instruction: 'Pada sprite utama: sembunyikan (hide), lalu dalam forever buat clone setiap 0.05 detik.',
        hint: 'Saat mulai sebagai clone: munculkan di koordinat Y atas (y: 170) dengan X acak.'
      },
      {
        stepNumber: 3,
        title: 'Fisika Jatuh & Percikan Tanah',
        instruction: 'Ulangi "change y by -12" sampai koordinat y < -160, lalu ganti ke kostum splash, tunggu 0.1 detik, dan delete clone.',
        hint: 'Ini menciptakan efek tetesan air pecah saat menghujam tanah!'
      }
    ],
    quizQuestions: [
      {
        question: 'Arah koordinat manakah yang harus diubah dengan nilai negatif agar objek bergerak jatuh ke bawah?',
        options: ['Koordinat X (Horizontal)', 'Koordinat Y (Vertikal)', 'Ukuran Sprite', 'Ghost Effect'],
        correctAnswerIndex: 1,
        explanation: 'Sumbu Y adalah vertikal. Nilai positif bergerak ke atas, dan nilai negatif (change y by -10) bergerak ke bawah.'
      }
    ],
    challenge: {
      title: 'Tantangan: Efek Angin Miring & Kilat Petir',
      description: 'Tambahkan efek angin miring (change x by -3 saat jatuh) dan backdrop petir yang berkedip terang dengan suara guntur!',
      bonusXp: 95,
      tips: ['Gunakan suara "Thunder" dari pustaka suara Scratch']
    }
  },
  {
    id: 14,
    semester: 2,
    semesterLevel: 4,
    title: 'Mengenal Drag and Drop',
    topics: ['Screen Mode', 'Draggable', 'Not Draggable', 'Interaksi Sentuh'],
    indicator: 'Siswa mampu menggunakan fungsi "Drag and Drop" dalam Scratch untuk mengatur dan menghubungkan blok-blok kode',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 200,
    iconName: 'Move',
    category: 'Input & Sensing',
    summary: 'Menerapkan mode drag-and-drop interaktif untuk membuat game puzzle, mencocokkan benda ke wadah yang tepat, dan kustomisasi inventori.',
    conceptExplanation: 'Fungsi drag mode menentukan apakah pemain diizinkan menggeser sprite langsung dengan kursor mouse saat game sedang aktif (full screen mode).',
    keyBlocks: [
      { name: 'set drag mode [draggable v]', category: 'Sensing', description: 'Mengizinkan pemain menyeret sprite dengan mouse', color: '#5CB1D6' },
      { name: 'set drag mode [not draggable v]', category: 'Sensing', description: 'Mengunci sprite agar tidak bisa digeser sembarangan', color: '#5CB1D6' },
      { name: 'touching [Kotak_Sampah v] ?', category: 'Sensing', description: 'Mendeteksi apakah barang yang ditarik masuk ke wadah target', color: '#5CB1D6' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mengaktifkan Drag Mode',
        instruction: 'Pada awal program, pasang blok "set drag mode [draggable]" pada sprite item.',
        hint: 'Coba jalankan mode layar penuh untuk menguji apakah sprite bisa ditarik.'
      },
      {
        stepNumber: 2,
        title: 'Membuat Game Pilah Sampah (Sort Puzzle)',
        instruction: 'Buat 2 wadah: "Organik" dan "Anorganik". Jika sampah ditarik ke wadah yang benar -> mainkan suara sukses dan tambah skor.',
        hint: 'Jika ditarik ke wadah yang salah -> kembalikan sprite sampah ke posisi awal.'
      }
    ],
    quizQuestions: [
      {
        question: 'Mengapa kita perlu mengatur "set drag mode [not draggable]" pada karakter utama dalam game aksi?',
        options: ['Agar karakter bisa terbang', 'Agar pemain tidak mencurangi game dengan menyeret karakter langsung ke garis finish', 'Supaya game lebih cepat selesai', 'Untuk menghemat baterai'],
        correctAnswerIndex: 1,
        explanation: 'Mengunci drag mode mencegah pemain menyeret paksa sprite dan melewati rintangan game.'
      }
    ],
    challenge: {
      title: 'Tantangan: Puzzle Menyusun Robot (Snap to Grid)',
      description: 'Buat 3 bagian tubuh robot (kepala, badan, kaki) yang akan otomatis menempel tepat di posisinya (snap) saat dilepas dekat target!',
      bonusXp: 85,
      tips: ['Gunakan rumus: if distance to Target < 30 then go to Target']
    }
  },
  {
    id: 15,
    semester: 2,
    semesterLevel: 5,
    title: 'Projek Scratch Bus Street',
    topics: ['Motion', 'Sensing', 'Pick Random', 'Effect', 'Simulasi Lalu Lintas'],
    indicator: 'Siswa mampu merancang dan membuat simulasi lalu lintas jalan dengan sprite bus dan kendaraan lainnya',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 350,
    iconName: 'Bus',
    category: 'Simulation',
    summary: 'Membangun simulasi jalan raya: Bus kota dengan multi-jalur (lanes), mobil-mobil lain dengan kecepatan acak, lampu lalu lintas, dan klakson.',
    conceptExplanation: 'Simulasi dunia nyata (Real-World Simulation) memodelkan sistem lalu lintas dengan aturan jalur, jarak aman antar kendaraan, dan perubahan sinyal lampu lalu lintas.',
    keyBlocks: [
      { name: 'glide (2) secs to x: (240) y: (y-lane)', category: 'Motion', description: 'Simulasi laju kendaraan menyeberangi jalan', color: '#4C97FF' },
      { name: 'pick random (1) to (3)', category: 'Operators', description: 'Memilih jalur jalan raya secara acak (Lane 1, 2, atau 3)', color: '#59C059' },
      { name: 'touching [Lampu_Merah v] ?', category: 'Sensing', description: 'Sensor berhenti saat lampu lalu lintas berwarna merah', color: '#5CB1D6' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuat Backdrop Jalan Raya 3 Jalur',
        instruction: 'Desain jalan aspal dengan 3 jalur vertikal/horizontal lengkap dengan garis marka putus-putus putih.',
        hint: 'Catat koordinat Y untuk masing-masing jalur (misal Y: -100, Y: 0, Y: 100).'
      },
      {
        stepNumber: 2,
        title: 'Generator Kendaraan Berkecepatan Acak',
        instruction: 'Buat sprite Mobil muncul dari sisi kiri, pilih jalur acak, dan meluncur ke kanan dengan kecepatan bervariasi.',
        hint: 'Gunakan "glide (pick random 1.5 to 3.5) secs to x: 250 y: (jalurTerpilih)".'
      },
      {
        stepNumber: 3,
        title: 'Kontrol Bus Penumpang',
        instruction: 'Pemain mengendalikan bus untuk berpindah jalur menghindari kemacetan dan menjemput penumpang di halte.',
        hint: 'Gunakan tombol Up/Down untuk ganti jalur.'
      }
    ],
    quizQuestions: [
      {
        question: 'Konsep apakah yang diterapkan saat membuat kendaraan muncul di jalur yang berbeda-beda setiap kali jalan dibuka?',
        options: ['Variabel Konstan', 'Randomization (Pengacakan)', 'Ghost Effect', 'Sound Volume'],
        correctAnswerIndex: 1,
        explanation: 'Randomization membuat simulasi tampak dinamis dan realistis seperti lalu lintas asli.'
      }
    ],
    challenge: {
      title: 'Tantangan: Sistem Lampu Merah Interaktif',
      description: 'Tambahkan tiang lampu lalu lintas yang otomatis berganti Hijau, Kuning, Merah. Saat Merah, semua mobil berhenti!',
      bonusXp: 110,
      tips: ['Gunakan broadcast "Lampu_Merah" dan "Lampu_Hijau"']
    }
  },
  {
    id: 16,
    semester: 2,
    semesterLevel: 6,
    title: 'Membuat Pola Garis Berwarna (Pen Art 1)',
    topics: ['Paint Scratch', 'Pen Extension', 'Pola Garis', 'Ubah Warna'],
    indicator: 'Siswa mampu membuat pola garis berwarna dengan menggunakan perintah penggambaran dasar dan mengubah warna garis',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 300,
    iconName: 'PenTool',
    category: 'Creative Arts',
    summary: 'Memanfaatkan Scratch Pen Extension untuk coding seni generatif: Pola Geometri, Bintang Bertingkat, dan Roda Warna.',
    conceptExplanation: 'Coding Seni (Generative Art) menggunakan matematika dan perulangan untuk menggambar pola visual yang indah. Konsep ini mirip dengan logika gerakan robot kura-kura (Turtle Graphics).',
    keyBlocks: [
      { name: 'pen down  /  pen up', category: 'Pen', description: 'Menempelkan atau mengangkat pena ke kanvas panggung', color: '#0FBD8C' },
      { name: 'erase all', category: 'Pen', description: 'Membersihkan seluruh coretan gambar di layar', color: '#0FBD8C' },
      { name: 'change pen color by (10)', category: 'Pen', description: 'Mengubah warna tinta secara gradual', color: '#0FBD8C' },
      { name: 'set pen size to (3)', category: 'Pen', description: 'Mengatur ketebalan garis gambar', color: '#0FBD8C' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Mengaktifkan Ekstensi Pen (Pena)',
        instruction: 'Klik tombol "Add Extension" di pojok kiri paling bawah Scratch, lalu pilih ekstensi "Pen".',
        hint: 'Kategori baru berwarna hijau toska "Pen" akan muncul di palet blok.'
      },
      {
        stepNumber: 2,
        title: 'Menggambar Persegi Berwarna-warni',
        instruction: 'Susun: erase all -> pen down -> repeat 4 { move 100 steps, turn right 90 degrees, change pen color by 25 }.',
        hint: 'Sprite akan menggambar bujur sangkar dengan 4 sisi warna berbeda!'
      },
      {
        stepNumber: 3,
        title: 'Membuat Pola Bintang Poligon (Spirograph)',
        instruction: 'Ulangi pola persegi sebanyak 36 kali dengan sedikit memutar sprite 10 derajat setiap putaran.',
        hint: 'Rumus: repeat 36 { [gambar persegi], turn right 10 degrees }.'
      }
    ],
    quizQuestions: [
      {
        question: 'Berapakah sudut putaran yang dibutuhkan untuk menggambar sebuah segitiga sama sisi dengan blok turn right?',
        options: ['60 derajat', '90 derajat', '120 derajat (360 / 3)', '180 derajat'],
        correctAnswerIndex: 2,
        explanation: 'Total sudut luar bangun datar tertutup adalah 360 derajat. Untuk segitiga: 360 / 3 = 120 derajat.'
      }
    ],
    challenge: {
      title: 'Tantangan: Mandala Geometri Pelangi',
      description: 'Buat pola segi-8 (oktagon) yang berputar 45 kali dan menghasilkan karya seni mandala pelangi yang simetris!',
      bonusXp: 95,
      tips: ['Sudut luar oktagon adalah 360 / 8 = 45 derajat']
    }
  },
  {
    id: 17,
    semester: 2,
    semesterLevel: 7,
    title: 'Membuat Garis Melengkung Berwarna-warni',
    topics: ['Paint Scratch', 'Pen Extension', 'Kurva & Spiral', 'Warna Dinamis'],
    indicator: 'Siswa mampu membuat garis melengkung dengan variasi warna menggunakan perintah penggambaran dan perubahan warna pada sprite',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 300,
    iconName: 'Spline',
    category: 'Creative Arts',
    summary: 'Mengeksplorasi matematika kurva lingkaran, spiral Archimedes bergradasi, dan gelombang sinus menggunakan Pen.',
    conceptExplanation: 'Garis lengkung tercipta dari perpaduan langkah-langkah sangat kecil dengan sudut belok yang sangat halus secara berulang (misal: move 2 steps, turn 1 degree).',
    keyBlocks: [
      { name: 'repeat (360) { move 2 steps, turn 1 deg }', category: 'Pen', description: 'Algoritma menggambar lingkaran sempurna 360 derajat', color: '#0FBD8C' },
      { name: 'move (Langkah) steps, change Langkah by 0.5', category: 'Pen', description: 'Algoritma membuat garis spiral yang semakin melebar', color: '#0FBD8C' },
      { name: 'set pen [color/saturation/brightness] to (...)', category: 'Pen', description: 'Mengatur intensitas dan kecerahan warna tinta', color: '#0FBD8C' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Algoritma Lingkaran Pelangi',
        instruction: 'Buat perulangan repeat 360 { move 2 steps, turn right 1 degrees, change pen color by 1 }.',
        hint: 'Sprite akan membentuk lingkaran pelangi penuh yang mempesona.'
      },
      {
        stepNumber: 2,
        title: 'Spiral Emas (Golden Spiral)',
        instruction: 'Gunakan variabel "Panjang". Mulai dari 1, di dalam repeat 200 { move (Panjang) steps, turn right 15 degrees, change Panjang by 0.5, change pen color by 2 }.',
        hint: 'Perhatikan bagaimana garis melengkung membentuk pusaran spiral galaksi!'
      }
    ],
    quizQuestions: [
      {
        question: 'Bagaimana cara membuat efek spiral yang ukurannya terus membesar?',
        options: ['Mengurangi kecepatan sprite', 'Menambah nilai jarak langkah (move steps) secara bertahap pada setiap perulangan', 'Mengganti backdrop ke warna hitam', 'Mengunci rotasi sprite'],
        correctAnswerIndex: 1,
        explanation: 'Dengan menambah variabel panjang langkah di setiap iterasi, jarak tempuh membesar sehingga putaran membentuk spiral.'
      }
    ],
    challenge: {
      title: 'Tantangan: Gelombang Ombak Sinus (Wave Effect)',
      description: 'Program sprite agar menggambar kurva naik-turun seperti ombak laut dengan warna biru laut gradasi!',
      bonusXp: 100,
      tips: ['Gunakan koordinat y = sin(x) atau perpaduan belok kiri dan belok kanan berirama']
    }
  },
  {
    id: 18,
    semester: 2,
    semesterLevel: 8,
    title: 'Membuat Scroll Backdrop: Atas ke Bawah',
    topics: ['Customes', 'Parallax Scrolling', 'Pergerakan Vertikal Latar'],
    indicator: 'Siswa mampu membuat efek backdrop bergerak secara vertikal dari atas ke bawah menggunakan pergerakan latar',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 350,
    iconName: 'ArrowDownCircle',
    category: 'Game Dev',
    summary: 'Teknik Scrolling Background vertikal tak terbatas (Infinite Vertical Scroller) untuk game pesawat luar angkasa dan balap mobil.',
    conceptExplanation: 'Karena backdrop panggung Scratch bersifat diam, efek scrolling diciptakan dengan menjadikan latar belakang sebagai 2 sprite kembar (Sprite BG 1 dan Sprite BG 2) yang bergantian bergeser dari atas ke bawah.',
    keyBlocks: [
      { name: 'set y to (360) -> repeat (change y by -5)', category: 'Motion', description: 'Menggeser latar ke bawah secara kontinu', color: '#4C97FF' },
      { name: 'if <y position < -355> then { set y to (360) }', category: 'Control', description: 'Mereset latar kembali ke atas saat menyentuh bawah (Seamless Loop)', color: '#FFAB19' },
      { name: 'go to back layer', category: 'Looks', description: 'Memastikan sprite latar selalu berada di belakang karakter utama', color: '#9966FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuat 2 Sprite Latar Luar Angkasa',
        instruction: 'Buat 2 sprite berukuran penuh layar dengan gambar bintang. Beri nama "BG1" dan "BG2".',
        hint: 'Gunakan blok "go to back layer" pada keduanya.'
      },
      {
        stepNumber: 2,
        title: 'Mengatur Posisi Awal Vertikal',
        instruction: 'Atur BG1 di posisi (x: 0, y: 0) dan BG2 di posisi tepat di atasnya (x: 0, y: 360).',
        hint: 'Tinggi panggung Scratch adalah 360 pixel (dari y: -180 sampai y: 180).'
      },
      {
        stepNumber: 3,
        title: 'Looping Gerakan Vertikal Mulus',
        instruction: 'Pada kedua sprite BG: forever { change y by -4, if y position < -355 then set y to 360 }.',
        hint: 'Sekarang kamu memiliki efek pesawat terbang menembus luar angkasa tanpa batas!'
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
      description: 'Buat tombol Turbo (Spasi) yang melipatgandakan kecepatan scroll latar belakang menjadi -15 pixel per frame!',
      bonusXp: 90,
      tips: ['Gunakan variabel KecepatanScroll']
    }
  },
  {
    id: 19,
    semester: 2,
    semesterLevel: 9,
    title: 'Membuat Scroll Backdrop: Bawah ke Atas / Horizontal',
    topics: ['Customes', 'Horizontal Scrolling', 'Platformer Runner', 'Parallax'],
    indicator: 'Siswa mampu membuat efek backdrop bergerak secara vertikal dari bawah ke atas / horizontal (kiri ke kanan)',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 350,
    iconName: 'ArrowRightCircle',
    category: 'Game Dev',
    summary: 'Menerapkan horizontal scrolling (Side-scrolling Platformer seperti Mario/Flappy Bird) dengan efek kedalaman Parallax Multi-Layer.',
    conceptExplanation: 'Parallax Scrolling memberikan ilusi kedalaman 3D 2.5D di mana lapisan latar depan (pohon/tanah) bergerak lebih cepat daripada lapisan latar belakang (gunung/awan jauh).',
    keyBlocks: [
      { name: 'if <x position < -475> then { set x to (475) }', category: 'Control', description: 'Looping horizontal mulus saat latar menyentuh sisi kiri', color: '#FFAB19' },
      { name: 'change x by (-3) vs change x by (-8)', category: 'Motion', description: 'Perbedaan kecepatan menciptakan ilusi kedalaman Parallax', color: '#4C97FF' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Menyiapkan Latar Gunung & Awan',
        instruction: 'Buat Sprite "Awan_Jauh" dan Sprite "Tanah_Depan".',
        hint: 'Awan berada di layer belakang, tanah di layer depan.'
      },
      {
        stepNumber: 2,
        title: 'Menerapkan Efek Parallax 2 Lapisan',
        instruction: 'Gerakkan Awan perlahan (change x by -1) dan gerakkan Tanah lebih cepat (change x by -6).',
        hint: 'Pemain akan merasakan kedalaman atmosfer yang memukau seperti game profesional!'
      },
      {
        stepNumber: 3,
        title: 'Karakter Melompat di Atas Tanah Berjalan',
        instruction: 'Tambahkan karakter pelari (Runner) yang bisa melompat dengan tombol Spasi untuk melewati rintangan batu.',
        hint: 'Gunakan gravitasi sederhana: repeat 10 (change y by 12) lalu repeat 10 (change y by -12).'
      }
    ],
    quizQuestions: [
      {
        question: 'Apa prinsip dasar dari efek Parallax Scrolling pada game 2D?',
        options: ['Semua objek bergerak dengan kecepatan sama', 'Objek yang berada lebih jauh bergerak lebih lambat dibanding objek di dekat kamera', 'Mengubah karakter menjadi transparan', 'Menghilangkan semua rintangan'],
        correctAnswerIndex: 1,
        explanation: 'Parallax meniru penglihatan manusia di mana objek jauh (seperti gunung) tampak bergerak jauh lebih lambat dibanding pohon di dekat jalan.'
      }
    ],
    challenge: {
      title: 'Tantangan: Endless Runner dengan Skor Jarak',
      description: 'Buat variabel "Jarak Tempuh (Meter)" yang otomatis bertambah seiring berjalannya latar belakang!',
      bonusXp: 100,
      tips: ['Tambahkan rintangan kaktus yang muncul dengan cloning acak']
    }
  },
  {
    id: 20,
    semester: 2,
    semesterLevel: 10,
    title: 'Projek Scratch Pong Game (Multiplayer)',
    topics: ['Paint Scratch', 'Sensing', 'Motion', 'Multiplayer 2-Pemain', 'Deteksi Pantulan & Skor'],
    indicator: 'Siswa mampu merancang dan membuat permainan klasik Pong dengan menggunakan kontrol, deteksi, dan sistem skor (+Multiplayer)',
    allocation: '2 Pertemuan (2 x 45 menit)',
    xpReward: 500,
    iconName: 'Trophy',
    category: 'Game Dev',
    summary: 'Membangun game legendaris Pong Arcade: Raket Pemain 1 (W/S), Raket Pemain 2 (Up/Down), Fisika Pantulan Bola Sudut Cerdas, dan Papan Skor Juara.',
    conceptExplanation: 'Game Pong adalah mahakarya penutup silabus! Mengintegrasikan seluruh kompetensi: Variabel Skor ganda, Sensing batas dinding, Kalkulasi sudut pantul vektor (point in direction 180 - direction), dan Game Over State.',
    keyBlocks: [
      { name: 'point in direction ((180) - (direction))', category: 'Motion', description: 'Rumus fisika pantulan bola saat mengenai raket paddle', color: '#4C97FF' },
      { name: 'touching [Paddle_P1 v] or touching [Paddle_P2 v]', category: 'Sensing', description: 'Deteksi sentuhan paddle pemain 1 atau pemain 2', color: '#5CB1D6' },
      { name: 'if <Skor_P1 = 5> then { broadcast [P1_Menang v] }', category: 'Control', description: 'Logika penentu juara pertama yang mencapai skor 5', color: '#FFAB19' }
    ],
    missionSteps: [
      {
        stepNumber: 1,
        title: 'Membuat 2 Paddle & Bola Tenis',
        instruction: 'Desain Paddle P1 (Kiri - Biru), Paddle P2 (Kanan - Merah), dan Bola Kuning Neon.',
        hint: 'Paddle P1 dikendalikan tombol W & S, Paddle P2 dengan Tombol Panah Atas & Bawah.'
      },
      {
        stepNumber: 2,
        title: 'Fisika Pantulan Bola Dinamis',
        instruction: 'Bola bergerak terus-menerus: jika menyentuh tepi atas/bawah -> pantulkan. Jika menyentuh paddle -> balikkan arah sudut dan tambah kecepatan bola sedikit!',
        hint: 'Gunakan: point in direction ((0) - (direction) + pick random -10 to 10).'
      },
      {
        stepNumber: 3,
        title: 'Sistem Skor Goal & Kondisi Menang',
        instruction: 'Jika bola melewati garis x < -220 -> P2 dapat 1 poin. Jika x > 220 -> P1 dapat 1 poin. Pemain pertama yang dapat 5 poin menang!',
        hint: 'Reset posisi bola ke tengah (0,0) setiap kali terjadi gol.'
      }
    ],
    quizQuestions: [
      {
        question: 'Bagaimana cara mereset bola ke tengah lapangan setiap kali salah satu pemain mencetak skor?',
        options: ['go to x: 0 y: 0 lalu tunggu 1 detik', 'Hapus sprite bola', 'Ganti kostum backdrop', 'Matikan komputer'],
        correctAnswerIndex: 0,
        explanation: 'Perintah "go to x: 0 y: 0" mengembalikan bola ke pusat lapangan untuk memulai reli baru.'
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
