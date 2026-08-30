export type ScratchCategory =
  | 'motion'
  | 'looks'
  | 'sound'
  | 'events'
  | 'control'
  | 'sensing'
  | 'operators'
  | 'variables'
  | 'myblocks'
  | 'pen'
  | 'music';

export interface ScratchBlockData {
  id: string;
  category: ScratchCategory;
  type: 'hat' | 'stack' | 'c-block' | 'reporter' | 'boolean';
  template: string;
  opcode: string;
  params: Record<string, string | number>;
  nestedBlocks?: ScratchBlockData[];
}

export interface SpriteState {
  id: string;
  name: string;
  emoji: string;
  type: 'cat' | 'robot' | 'rocket' | 'dino' | 'star' | 'alien' | 'dog';
  x: number; // Scratch coord: -240 to 240
  y: number; // Scratch coord: -180 to 180
  direction: number; // 0 to 360 deg (90 is facing right)
  size: number; // Percentage, e.g. 100
  visible: boolean;
  colorHue: number;
  costumeIndex: number;
  sayText: string | null;
  sayType: 'say' | 'think' | null;
  penDown: boolean;
  penColor: string;
}

export interface ScratchCategoryMeta {
  id: ScratchCategory;
  name: string;
  color: string;
  hoverColor: string;
  textColor: string;
  iconBg: string;
}

export const SCRATCH_CATEGORIES: ScratchCategoryMeta[] = [
  { id: 'motion', name: 'Gerakan', color: '#4C97FF', hoverColor: '#3373CC', textColor: '#FFFFFF', iconBg: '#4C97FF' },
  { id: 'looks', name: 'Tampilan', color: '#9966FF', hoverColor: '#774DCB', textColor: '#FFFFFF', iconBg: '#9966FF' },
  { id: 'sound', name: 'Suara', color: '#CF63CF', hoverColor: '#BD42BD', textColor: '#FFFFFF', iconBg: '#CF63CF' },
  { id: 'events', name: 'Kejadian', color: '#FFBF00', hoverColor: '#CC9900', textColor: '#573E00', iconBg: '#FFBF00' },
  { id: 'control', name: 'Kontrol', color: '#FFAB19', hoverColor: '#CF8B17', textColor: '#FFFFFF', iconBg: '#FFAB19' },
  { id: 'sensing', name: 'Sensor', color: '#5CB1D6', hoverColor: '#2E8EB8', textColor: '#FFFFFF', iconBg: '#5CB1D6' },
  { id: 'operators', name: 'Operator', color: '#59C059', hoverColor: '#389438', textColor: '#FFFFFF', iconBg: '#59C059' },
  { id: 'variables', name: 'Variabel', color: '#FF8C1A', hoverColor: '#DB6E00', textColor: '#FFFFFF', iconBg: '#FF8C1A' },
  { id: 'myblocks', name: 'Balok Saya', color: '#FF6680', hoverColor: '#E64D66', textColor: '#FFFFFF', iconBg: '#FF6680' }
];

export const SCRATCH_PALETTE_BLOCKS: Omit<ScratchBlockData, 'id'>[] = [
  // MOTION (Gerakan)
  { category: 'motion', type: 'stack', opcode: 'motion_movesteps', template: 'gerak [steps] langkah', params: { steps: 10 } },
  { category: 'motion', type: 'stack', opcode: 'motion_turnright', template: 'putar kanan ↷ [degrees] derajat', params: { degrees: 15 } },
  { category: 'motion', type: 'stack', opcode: 'motion_turnleft', template: 'putar kiri ↶ [degrees] derajat', params: { degrees: 15 } },
  { category: 'motion', type: 'stack', opcode: 'motion_goto', template: 'pergi ke [destination]', params: { destination: 'posisi acak' } },
  { category: 'motion', type: 'stack', opcode: 'motion_gotoxy', template: 'pergi ke x: [x] y: [y]', params: { x: 0, y: 0 } },
  { category: 'motion', type: 'stack', opcode: 'motion_glideto', template: 'meluncur [secs] detik ke [destination]', params: { secs: 1, destination: 'posisi acak' } },
  { category: 'motion', type: 'stack', opcode: 'motion_pointindirection', template: 'mengarah ke arah [direction] °', params: { direction: 90 } },
  { category: 'motion', type: 'stack', opcode: 'motion_changexby', template: 'ubah x sebesar [change]', params: { change: 10 } },
  { category: 'motion', type: 'stack', opcode: 'motion_setx', template: 'atur x ke [x]', params: { x: 0 } },
  { category: 'motion', type: 'stack', opcode: 'motion_changeyby', template: 'ubah y sebesar [change]', params: { change: 10 } },
  { category: 'motion', type: 'stack', opcode: 'motion_sety', template: 'atur y ke [y]', params: { y: 0 } },
  { category: 'motion', type: 'stack', opcode: 'motion_ifonedgebounce', template: 'jika di pinggir, pantulkan', params: {} },

  // LOOKS (Tampilan)
  { category: 'looks', type: 'stack', opcode: 'looks_sayforsecs', template: 'katakan [message] selama [secs] detik', params: { message: 'Halo Dunia Coding!', secs: 2 } },
  { category: 'looks', type: 'stack', opcode: 'looks_say', template: 'katakan [message]', params: { message: 'DJuragan Coding Keren! 🚀' } },
  { category: 'looks', type: 'stack', opcode: 'looks_think', template: 'pikirkan [message] selama [secs] detik', params: { message: 'Hmm... Logika asik!', secs: 2 } },
  { category: 'looks', type: 'stack', opcode: 'looks_nextcostume', template: 'ganti kostum berikutnya', params: {} },
  { category: 'looks', type: 'stack', opcode: 'looks_changesizeby', template: 'ubah ukuran sebesar [change]', params: { change: 10 } },
  { category: 'looks', type: 'stack', opcode: 'looks_setsizeto', template: 'atur ukuran ke [size] %', params: { size: 100 } },
  { category: 'looks', type: 'stack', opcode: 'looks_changecoloreffect', template: 'ubah efek warna sebesar [change]', params: { change: 25 } },
  { category: 'looks', type: 'stack', opcode: 'looks_cleargraphiceffects', template: 'hapus semua efek grafis', params: {} },
  { category: 'looks', type: 'stack', opcode: 'looks_show', template: 'tampilkan', params: {} },
  { category: 'looks', type: 'stack', opcode: 'looks_hide', template: 'sembunyikan', params: {} },

  // SOUND (Suara)
  { category: 'sound', type: 'stack', opcode: 'sound_playuntildone', template: 'mainkan suara [sound] sampai selesai', params: { sound: 'Meow' } },
  { category: 'sound', type: 'stack', opcode: 'sound_pop', template: 'mainkan nada synth pop [note]', params: { note: 'C5' } },
  { category: 'sound', type: 'stack', opcode: 'sound_levelup', template: 'mainkan efek suara arpeggio [effect]', params: { effect: 'Menang' } },
  { category: 'sound', type: 'stack', opcode: 'sound_stopallsounds', template: 'hentikan semua suara', params: {} },
  { category: 'sound', type: 'stack', opcode: 'sound_changevolumeby', template: 'ubah volume sebesar [change]', params: { change: 10 } },

  // EVENTS (Kejadian)
  { category: 'events', type: 'hat', opcode: 'event_whenflagclicked', template: 'ketika ⚑ diklik', params: {} },
  { category: 'events', type: 'hat', opcode: 'event_whenkeypressed', template: 'ketika tombol [key] ditekan', params: { key: 'spasi' } },
  { category: 'events', type: 'hat', opcode: 'event_whenthisspriteclicked', template: 'ketika karakter ini diklik', params: {} },
  { category: 'events', type: 'hat', opcode: 'event_whenbackdropswitchesto', template: 'ketika latar berganti ke [backdrop]', params: { backdrop: 'grid' } },
  { category: 'events', type: 'stack', opcode: 'event_broadcast', template: 'siarkan pesan [message]', params: { message: 'mulai-game' } },

  // CONTROL (Kontrol)
  { category: 'control', type: 'stack', opcode: 'control_wait', template: 'tunggu [secs] detik', params: { secs: 1 } },
  { category: 'control', type: 'stack', opcode: 'control_repeat', template: 'ulangi [times] kali langkah', params: { times: 4 } },
  { category: 'control', type: 'stack', opcode: 'control_forever', template: 'selamanya (forever loop)', params: {} },
  { category: 'control', type: 'stack', opcode: 'control_ifthen', template: 'jika [condition] maka', params: { condition: 'menyentuh pinggir' } },

  // SENSING (Sensor)
  { category: 'sensing', type: 'stack', opcode: 'sensing_touching', template: 'menyentuh [target] ?', params: { target: 'penunjuk mouse' } },
  { category: 'sensing', type: 'stack', opcode: 'sensing_resettimer', template: 'atur ulang timer panggung', params: {} },

  // OPERATORS (Operator)
  { category: 'operators', type: 'stack', opcode: 'operator_random', template: 'pilih angka acak dari [min] hingga [max]', params: { min: 1, max: 10 } },
  { category: 'operators', type: 'stack', opcode: 'operator_join', template: 'gabungkan kata [text1] dan [text2]', params: { text1: 'Juara ', text2: 'Scratch' } },

  // VARIABLES (Variabel)
  { category: 'variables', type: 'stack', opcode: 'data_changevariableby', template: 'ubah [variable] sebesar [value]', params: { variable: 'skor', value: 10 } },
  { category: 'variables', type: 'stack', opcode: 'data_setvariableto', template: 'atur [variable] ke [value]', params: { variable: 'skor', value: 0 } },
  { category: 'variables', type: 'stack', opcode: 'data_changevariableby_lives', template: 'ubah [variable] sebesar [value]', params: { variable: 'nyawa', value: -1 } }
];

export const INITIAL_SPRITES: SpriteState[] = [
  {
    id: 'sprite-1',
    name: 'Kucing Scratch',
    emoji: '🐱',
    type: 'cat',
    x: 0,
    y: 0,
    direction: 90,
    size: 100,
    visible: true,
    colorHue: 0,
    costumeIndex: 0,
    sayText: 'Halo! Ayo koding di Scratch!',
    sayType: 'say',
    penDown: false,
    penColor: '#4C97FF'
  },
  {
    id: 'sprite-2',
    name: 'Robot Astro',
    emoji: '🤖',
    type: 'robot',
    x: 120,
    y: 60,
    direction: 90,
    size: 90,
    visible: true,
    colorHue: 0,
    costumeIndex: 0,
    sayText: null,
    sayType: null,
    penDown: false,
    penColor: '#5CB1D6'
  },
  {
    id: 'sprite-3',
    name: 'Roket Luar Angkasa',
    emoji: '🚀',
    type: 'rocket',
    x: -120,
    y: -50,
    direction: 45,
    size: 85,
    visible: true,
    colorHue: 0,
    costumeIndex: 0,
    sayText: null,
    sayType: null,
    penDown: false,
    penColor: '#FF6680'
  }
];

export const BACKDROP_OPTIONS = [
  { id: 'grid', name: 'Grid X/Y', emoji: '📐', desc: 'Sumbu Kartesius X: -240..240, Y: -180..180' },
  { id: 'space', name: 'Luar Angkasa', emoji: '🌌', desc: 'Galaksi bintang terang' },
  { id: 'city', name: 'Kota Malam', emoji: '🏙️', desc: 'Lanskap gedung neon malam' },
  { id: 'nature', name: 'Alam Terbuka', emoji: '🌳', desc: 'Padang rumput dan langit cerah' },
  { id: 'underwater', name: 'Bawah Laut', emoji: '🐠', desc: 'Samudra dengan terumbu karang' },
  { id: 'stage', name: 'Panggung Konser', emoji: '🎭', desc: 'Panggung musik dengan lampu sorot' }
];

export const EXTENSIONS_LIBRARY = [
  { id: 'music', name: 'Musik', icon: '🎵', desc: 'Mainkan instrumen musik dan drum.' },
  { id: 'pen', name: 'Pena (Pen)', icon: '✏️', desc: 'Gambar dengan sprite di panggung.' },
  { id: 'video_sensing', name: 'Sensor Video', icon: '📹', desc: 'Deteksi gerakan dengan webcam kamera.' },
  { id: 'text2speech', name: 'Teks ke Suara', icon: '🗣️', desc: 'Buat proyekmu dapat berbicara dengan AI.' },
  { id: 'translate', name: 'Terjemahan', icon: '🌐', desc: 'Terjemahkan teks ke berbagai bahasa dunia.' },
  { id: 'microbit', name: 'micro:bit', icon: '📟', desc: 'Hubungkan proyek ke perangkat keras fisik.' }
];
