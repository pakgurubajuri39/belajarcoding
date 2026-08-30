import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink, RefreshCw, Maximize2, Minimize2, Info,
  Laptop, Play, Square, RotateCcw, Zap, Code2, Layers,
  Volume2, Sparkles, Plus, Trash2, CheckCircle2, Gamepad2,
  FolderOpen, Save, Eye, EyeOff, Compass, Move, Settings2,
  Scissors, Copy, Download, Upload, ZoomIn, ZoomOut, Check,
  Smile, Music, Edit3, Image as ImageIcon, VolumeX, FastForward
} from 'lucide-react';

interface ScratchEmbedProps {
  currentLevelTitle?: string;
  tutorialUrl?: string;
  className?: string;
  isCompact?: boolean;
}

// Scratch Category Definitions with Exact Scratch 3.0 Colors
export type ScratchCategory =
  | 'motion'
  | 'looks'
  | 'sound'
  | 'events'
  | 'control'
  | 'sensing'
  | 'operators'
  | 'variables'
  | 'myblocks';

export interface ScratchBlockData {
  id: string;
  category: ScratchCategory;
  type: 'hat' | 'stack' | 'c-block' | 'reporter';
  template: string; // e.g. "gerak [steps] langkah"
  opcode: string;
  params: Record<string, string | number>;
  nestedBlocks?: ScratchBlockData[];
}

export interface SpriteState {
  id: string;
  name: string;
  emoji: string;
  type: 'cat' | 'robot' | 'rocket' | 'dino' | 'star' | 'alien' | 'dog';
  x: number; // Scratch coordinate: -240 to 240
  y: number; // Scratch coordinate: -180 to 180
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

export const SCRATCH_CATEGORIES: { id: ScratchCategory; name: string; color: string; hoverColor: string; textColor: string }[] = [
  { id: 'motion', name: 'Gerakan', color: '#4C97FF', hoverColor: '#3373CC', textColor: '#FFFFFF' },
  { id: 'looks', name: 'Tampilan', color: '#9966FF', hoverColor: '#774DCB', textColor: '#FFFFFF' },
  { id: 'sound', name: 'Suara', color: '#CF63CF', hoverColor: '#BD42BD', textColor: '#FFFFFF' },
  { id: 'events', name: 'Kejadian', color: '#FFBF00', hoverColor: '#CC9900', textColor: '#573E00' },
  { id: 'control', name: 'Kontrol', color: '#FFAB19', hoverColor: '#CF8B17', textColor: '#FFFFFF' },
  { id: 'sensing', name: 'Sensor', color: '#5CB1D6', hoverColor: '#2E8EB8', textColor: '#FFFFFF' },
  { id: 'operators', name: 'Operator', color: '#59C059', hoverColor: '#389438', textColor: '#FFFFFF' },
  { id: 'variables', name: 'Variabel', color: '#FF8C1A', hoverColor: '#DB6E00', textColor: '#FFFFFF' },
  { id: 'myblocks', name: 'Balok Saya', color: '#FF6680', hoverColor: '#E64D66', textColor: '#FFFFFF' }
];

export const SCRATCH_PALETTE_BLOCKS: Omit<ScratchBlockData, 'id'>[] = [
  // MOTION
  { category: 'motion', type: 'stack', opcode: 'motion_movesteps', template: 'gerak [steps] langkah', params: { steps: 10 } },
  { category: 'motion', type: 'stack', opcode: 'motion_turnright', template: 'putar kanan ↷ [degrees] derajat', params: { degrees: 15 } },
  { category: 'motion', type: 'stack', opcode: 'motion_turnleft', template: 'putar kiri ↶ [degrees] derajat', params: { degrees: 15 } },
  { category: 'motion', type: 'stack', opcode: 'motion_goto', template: 'pergi ke [destination]', params: { destination: 'posisi acak' } },
  { category: 'motion', type: 'stack', opcode: 'motion_gotoxy', template: 'pergi ke x: [x] y: [y]', params: { x: 0, y: 0 } },
  { category: 'motion', type: 'stack', opcode: 'motion_glideto', template: 'meluncur [secs] detik ke [destination]', params: { secs: 1, destination: 'posisi acak' } },
  { category: 'motion', type: 'stack', opcode: 'motion_pointindirection', template: 'mengarah ke arah [direction] °', params: { direction: 90 } },
  { category: 'motion', type: 'stack', opcode: 'motion_ifonedgebounce', template: 'jika di pinggir, pantulkan', params: {} },

  // LOOKS
  { category: 'looks', type: 'stack', opcode: 'looks_sayforsecs', template: 'katakan [message] selama [secs] detik', params: { message: 'Halo Dunia Coding!', secs: 2 } },
  { category: 'looks', type: 'stack', opcode: 'looks_say', template: 'katakan [message]', params: { message: 'DJuragan Coding Keren! 🚀' } },
  { category: 'looks', type: 'stack', opcode: 'looks_think', template: 'pikirkan [message] selama [secs] detik', params: { message: 'Hmm... Logika asik!', secs: 2 } },
  { category: 'looks', type: 'stack', opcode: 'looks_nextcostume', template: 'ganti kostum berikutnya', params: {} },
  { category: 'looks', type: 'stack', opcode: 'looks_changesizeby', template: 'ubah ukuran sebesar [change]', params: { change: 10 } },
  { category: 'looks', type: 'stack', opcode: 'looks_setsizeto', template: 'atur ukuran ke [size] %', params: { size: 100 } },
  { category: 'looks', type: 'stack', opcode: 'looks_changecoloreffect', template: 'ubah efek warna sebesar [change]', params: { change: 25 } },
  { category: 'looks', type: 'stack', opcode: 'looks_cleargraphiceffects', template: 'hapus semua efek grafis', params: {} },
  { category: 'looks', type: 'stack', opcode: 'looks_show', template: 'tampilkan karakter 👁️', params: {} },
  { category: 'looks', type: 'stack', opcode: 'looks_hide', template: 'sembunyikan karakter 🚫', params: {} },

  // SOUND
  { category: 'sound', type: 'stack', opcode: 'sound_playuntildone', template: 'mainkan suara [sound] sampai selesai', params: { sound: 'Meow Kucing 🐱' } },
  { category: 'sound', type: 'stack', opcode: 'sound_pop', template: 'mainkan nada synth pop [note]', params: { note: 'C5 (523 Hz)' } },
  { category: 'sound', type: 'stack', opcode: 'sound_levelup', template: 'mainkan efek suara arpeggio [effect]', params: { effect: 'Level Up Menang ⭐' } },
  { category: 'sound', type: 'stack', opcode: 'sound_stopallsounds', template: 'hentikan semua suara', params: {} },

  // EVENTS
  { category: 'events', type: 'hat', opcode: 'event_whenflagclicked', template: 'ketika ⚑ diklik', params: {} },
  { category: 'events', type: 'hat', opcode: 'event_whenkeypressed', template: 'ketika tombol [key] ditekan', params: { key: 'spasi' } },
  { category: 'events', type: 'hat', opcode: 'event_whenthisspriteclicked', template: 'ketika karakter ini diklik 👆', params: {} },
  { category: 'events', type: 'stack', opcode: 'event_broadcast', template: 'siarkan pesan [message]', params: { message: 'mulai-game' } },

  // CONTROL
  { category: 'control', type: 'stack', opcode: 'control_wait', template: 'tunggu [secs] detik', params: { secs: 1 } },
  { category: 'control', type: 'stack', opcode: 'control_repeat', template: 'ulangi [times] kali langkah berikut', params: { times: 4 } },
  { category: 'control', type: 'stack', opcode: 'control_forever', template: 'selamanya (forever loop)', params: {} },
  { category: 'control', type: 'stack', opcode: 'control_ifthen', template: 'jika [condition] maka', params: { condition: 'menyentuh pinggir' } },

  // SENSING
  { category: 'sensing', type: 'stack', opcode: 'sensing_touching', template: 'menyentuh [target] ?', params: { target: 'penunjuk mouse' } },
  { category: 'sensing', type: 'stack', opcode: 'sensing_resettimer', template: 'atur ulang timer panggung', params: {} },

  // OPERATORS
  { category: 'operators', type: 'stack', opcode: 'operator_random', template: 'pilih angka acak dari [min] hingga [max]', params: { min: 1, max: 10 } },
  { category: 'operators', type: 'stack', opcode: 'operator_join', template: 'gabungkan kata [text1] dan [text2]', params: { text1: 'Juara ', text2: 'Scratch' } },

  // VARIABLES
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
  { id: 'grid', name: 'Grid Sumbu X/Y', emoji: '📐', desc: 'Bidang kartesius presisi (-240..240, -180..180)' },
  { id: 'space', name: 'Luar Angkasa Bintang', emoji: '🌌', desc: 'Galaksi gelap dengan gugusan bintang cerah' },
  { id: 'city', name: 'Kota Malam Neon', emoji: '🏙️', desc: 'Gedung pencakar langit berlatar ungu cyberpunk' },
  { id: 'nature', name: 'Alam Rumput & Mentari', emoji: '🌳', desc: 'Padang rumput hijau dan langit biru cerah' },
  { id: 'underwater', name: 'Bawah Laut Biru', emoji: '🐠', desc: 'Kedalaman samudra dengan terumbu karang' },
  { id: 'stage', name: 'Panggung Konser Musik', emoji: '🎭', desc: 'Lantai panggung berlampu sorot warna-warni' }
];

export const ScratchEmbed: React.FC<ScratchEmbedProps> = ({
  currentLevelTitle = 'Studio Koding Scratch 3.0 Interaktif',
  className = ''
}) => {
  // Main Studio Mode vs Embed Player vs Launcher
  const [activeMode, setActiveMode] = useState<'studio' | 'player' | 'launcher'>('studio');
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'costumes' | 'sounds'>('code');

  // Project Header States
  const [projectTitle, setProjectTitle] = useState('Proyek Koding Scratch Saya');
  const [isTurboMode, setIsTurboMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Scratch Block Palette & Workspace States
  const [activeCategory, setActiveCategory] = useState<ScratchCategory>('motion');
  const [scriptStack, setScriptStack] = useState<ScratchBlockData[]>([
    { id: 'b-1', category: 'events', type: 'hat', opcode: 'event_whenflagclicked', template: 'ketika ⚑ diklik', params: {} },
    { id: 'b-2', category: 'looks', type: 'stack', opcode: 'looks_sayforsecs', template: 'katakan [message] selama [secs] detik', params: { message: 'Selamat datang di DJuragan Coding!', secs: 2 } },
    { id: 'b-3', category: 'motion', type: 'stack', opcode: 'motion_movesteps', template: 'gerak [steps] langkah', params: { steps: 30 } },
    { id: 'b-4', category: 'motion', type: 'stack', opcode: 'motion_turnright', template: 'putar kanan ↷ [degrees] derajat', params: { degrees: 15 } },
    { id: 'b-5', category: 'looks', type: 'stack', opcode: 'looks_changecoloreffect', template: 'ubah efek warna sebesar [change]', params: { change: 25 } },
    { id: 'b-6', category: 'sound', type: 'stack', opcode: 'sound_pop', template: 'mainkan nada synth pop [note]', params: { note: 'C5 (523 Hz)' } },
    { id: 'b-7', category: 'variables', type: 'stack', opcode: 'data_changevariableby', template: 'ubah [variable] sebesar [value]', params: { variable: 'skor', value: 10 } }
  ]);

  // Drag and Drop States
  const [draggedBlock, setDraggedBlock] = useState<Omit<ScratchBlockData, 'id'> | ScratchBlockData | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDraggingOverWorkspace, setIsDraggingOverWorkspace] = useState(false);

  // Stage Runtime States
  const [sprites, setSprites] = useState<SpriteState[]>(INITIAL_SPRITES);
  const [selectedSpriteId, setSelectedSpriteId] = useState<string>('sprite-1');
  const [selectedBackdrop, setSelectedBackdrop] = useState<string>('grid');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executingBlockId, setExecutingBlockId] = useState<string | null>(null);
  const [stageVariables, setStageVariables] = useState<{ skor: number; nyawa: number; timer: number }>({
    skor: 0,
    nyawa: 3,
    timer: 0
  });

  // Sound Sampler State
  const [selectedSoundSample, setSelectedSoundSample] = useState<'meow' | 'pop' | 'jump' | 'win' | 'laser'>('meow');
  const [soundVolume, setSoundVolume] = useState(80);
  const [soundPlaybackRate, setSoundPlaybackRate] = useState(1);

  // Pen Trails Canvas Ref
  const penTrailsRef = useRef<{ x1: number; y1: number; x2: number; y2: number; color: string }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // TurboWarp Embed state
  const [projectId, setProjectId] = useState<string>('60917032');
  const [playerIframeKey, setPlayerIframeKey] = useState<number>(0);
  const [isPlayerLoading, setIsPlayerLoading] = useState<boolean>(true);

  // Active Sprite Helper
  const currentSprite = sprites.find(s => s.id === selectedSpriteId) || sprites[0];

  const updateCurrentSprite = (updates: Partial<SpriteState>) => {
    setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, ...updates } : s));
  };

  // Web Audio Synthesizer Engine
  const playScratchSound = (type: 'meow' | 'pop' | 'jump' | 'win' | 'laser' | 'custom', freq = 440, duration = 0.25) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const adjustedGain = (soundVolume / 100) * 0.3;

      if (type === 'meow') {
        // Meow pitch glide from 380Hz to 280Hz
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380 * soundPlaybackRate, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(280 * soundPlaybackRate, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(adjustedGain, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.38);
      } else if (type === 'pop') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25 * soundPlaybackRate, ctx.currentTime);
        gain.gain.setValueAtTime(adjustedGain, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'jump') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(180 * soundPlaybackRate, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(650 * soundPlaybackRate, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(adjustedGain * 0.7, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } else if (type === 'win') {
        // Arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((n, idx) => {
          setTimeout(() => {
            try {
              const o = ctx.createOscillator();
              const g = ctx.createGain();
              o.type = 'sine';
              o.frequency.setValueAtTime(n * soundPlaybackRate, ctx.currentTime);
              g.gain.setValueAtTime(adjustedGain, ctx.currentTime);
              g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
              o.connect(g);
              g.connect(ctx.destination);
              o.start();
              o.stop(ctx.currentTime + 0.18);
            } catch {
              // ignore
            }
          }, idx * 80);
        });
      } else if (type === 'laser') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(900 * soundPlaybackRate, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100 * soundPlaybackRate, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(adjustedGain * 0.6, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * soundPlaybackRate, ctx.currentTime);
        gain.gain.setValueAtTime(adjustedGain, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      }
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  // Timer Tick
  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setStageVariables(prev => ({ ...prev, timer: Math.round((prev.timer + 0.1) * 10) / 10 }));
      }, 100);
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isRunning]);

  // Single Block Execution Logic
  const executeBlock = async (block: ScratchBlockData) => {
    setExecutingBlockId(block.id);
    const p = block.params;

    switch (block.opcode) {
      case 'event_whenflagclicked':
      case 'event_whenkeypressed':
      case 'event_whenthisspriteclicked':
        playScratchSound('pop', 440, 0.1);
        break;

      case 'motion_movesteps': {
        const steps = Number(p.steps) || 10;
        playScratchSound('custom', 600, 0.08);
        setSprites(prev => prev.map(s => {
          if (s.id !== selectedSpriteId) return s;
          const rad = ((90 - s.direction) * Math.PI) / 180;
          const nextX = Math.min(Math.max(s.x + Math.cos(rad) * steps, -220), 220);
          const nextY = Math.min(Math.max(s.y + Math.sin(rad) * steps, -160), 160);

          if (s.penDown) {
            penTrailsRef.current.push({
              x1: s.x,
              y1: s.y,
              x2: nextX,
              y2: nextY,
              color: s.penColor
            });
          }
          return { ...s, x: nextX, y: nextY };
        }));
        break;
      }

      case 'motion_turnright': {
        const deg = Number(p.degrees) || 15;
        playScratchSound('custom', 750, 0.08);
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, direction: (s.direction + deg) % 360 } : s));
        break;
      }

      case 'motion_turnleft': {
        const deg = Number(p.degrees) || 15;
        playScratchSound('custom', 550, 0.08);
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, direction: (s.direction - deg + 360) % 360 } : s));
        break;
      }

      case 'motion_goto': {
        const dest = String(p.destination);
        if (dest === 'posisi acak') {
          const rx = Math.round(-180 + Math.random() * 360);
          const ry = Math.round(-120 + Math.random() * 240);
          setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, x: rx, y: ry } : s));
        } else {
          setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, x: 0, y: 0 } : s));
        }
        break;
      }

      case 'motion_gotoxy': {
        const targetX = Number(p.x) || 0;
        const targetY = Number(p.y) || 0;
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, x: targetX, y: targetY } : s));
        break;
      }

      case 'motion_pointindirection': {
        const dir = Number(p.direction) || 90;
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, direction: dir } : s));
        break;
      }

      case 'motion_ifonedgebounce': {
        setSprites(prev => prev.map(s => {
          if (s.id !== selectedSpriteId) return s;
          if (Math.abs(s.x) >= 200 || Math.abs(s.y) >= 140) {
            playScratchSound('jump');
            return { ...s, direction: (s.direction + 180) % 360 };
          }
          return s;
        }));
        break;
      }

      case 'looks_sayforsecs':
      case 'looks_say': {
        const msg = String(p.message || 'Halo!');
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, sayText: msg, sayType: 'say' } : s));
        break;
      }

      case 'looks_think': {
        const msg = String(p.message || 'Hmm...');
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, sayText: msg, sayType: 'think' } : s));
        break;
      }

      case 'looks_nextcostume': {
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, costumeIndex: (s.costumeIndex + 1) % 2 } : s));
        break;
      }

      case 'looks_changesizeby': {
        const delta = Number(p.change) || 10;
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, size: Math.max(20, Math.min(250, s.size + delta)) } : s));
        break;
      }

      case 'looks_setsizeto': {
        const newSize = Number(p.size) || 100;
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, size: Math.max(20, Math.min(250, newSize)) } : s));
        break;
      }

      case 'looks_changecoloreffect': {
        const delta = Number(p.change) || 25;
        playScratchSound('custom', 880, 0.1);
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, colorHue: (s.colorHue + delta) % 360 } : s));
        break;
      }

      case 'looks_cleargraphiceffects': {
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, colorHue: 0, size: 100 } : s));
        break;
      }

      case 'looks_show': {
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, visible: true } : s));
        break;
      }

      case 'looks_hide': {
        setSprites(prev => prev.map(s => s.id === selectedSpriteId ? { ...s, visible: false } : s));
        break;
      }

      case 'sound_playuntildone':
      case 'sound_pop':
        playScratchSound('pop');
        break;

      case 'sound_levelup':
        playScratchSound('win');
        break;

      case 'sound_stopallsounds':
        // stopped
        break;

      case 'data_changevariableby': {
        const val = Number(p.value) || 1;
        setStageVariables(prev => ({ ...prev, skor: prev.skor + val }));
        break;
      }

      case 'data_setvariableto': {
        const val = Number(p.value) || 0;
        setStageVariables(prev => ({ ...prev, skor: val }));
        break;
      }

      case 'data_changevariableby_lives': {
        const val = Number(p.value) || -1;
        setStageVariables(prev => ({ ...prev, nyawa: Math.max(0, prev.nyawa + val) }));
        break;
      }

      case 'sensing_resettimer':
        setStageVariables(prev => ({ ...prev, timer: 0 }));
        break;

      default:
        break;
    }
  };

  // Run Entire Script Stack Sequentially with Real Visual Glow Highlight
  const handleRunGreenFlag = async () => {
    if (isRunning) return;
    setIsRunning(true);
    playScratchSound('pop', 523, 0.1);

    const delay = isTurboMode ? 80 : 350;

    for (let i = 0; i < scriptStack.length; i++) {
      const block = scriptStack[i];
      await executeBlock(block);
      await new Promise(res => setTimeout(res, delay));
    }

    setExecutingBlockId(null);
    setIsRunning(false);
  };

  // Stop All Execution & Reset
  const handleStopAll = () => {
    setIsRunning(false);
    setExecutingBlockId(null);
  };

  // Reset Stage Sprites to Initial Positions
  const handleResetStage = () => {
    handleStopAll();
    penTrailsRef.current = [];
    setSprites(INITIAL_SPRITES);
    setStageVariables({ skor: 0, nyawa: 3, timer: 0 });
  };

  // Add Block from Palette
  const handleAddBlockToScript = (blockData: Omit<ScratchBlockData, 'id'>, targetIndex?: number) => {
    const newBlock: ScratchBlockData = {
      ...blockData,
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
    };

    setScriptStack(prev => {
      if (typeof targetIndex === 'number' && targetIndex >= 0 && targetIndex <= prev.length) {
        const next = [...prev];
        next.splice(targetIndex, 0, newBlock);
        return next;
      }
      return [...prev, newBlock];
    });

    playScratchSound('pop', 650, 0.05);
  };

  // Remove Block from Script
  const handleRemoveBlockFromScript = (id: string) => {
    setScriptStack(prev => prev.filter(b => b.id !== id));
    playScratchSound('custom', 300, 0.08);
  };

  // Clear Entire Script
  const handleClearScript = () => {
    setScriptStack([
      { id: 'b-1', category: 'events', type: 'hat', opcode: 'event_whenflagclicked', template: 'ketika ⚑ diklik', params: {} }
    ]);
  };

  // Update Block Parameter Inline
  const handleUpdateBlockParam = (blockId: string, paramKey: string, value: string | number) => {
    setScriptStack(prev => prev.map(b => {
      if (b.id !== blockId) return b;
      return {
        ...b,
        params: {
          ...b.params,
          [paramKey]: value
        }
      };
    }));
  };

  // HTML5 Drag and Drop Handlers
  const handleDragStartFromPalette = (e: React.DragEvent, block: Omit<ScratchBlockData, 'id'>) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ source: 'palette', block }));
    setDraggedBlock(block);
  };

  const handleDragStartFromWorkspace = (e: React.DragEvent, block: ScratchBlockData, index: number) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ source: 'workspace', block, index }));
    setDraggedBlock(block);
  };

  const handleDragOverWorkspace = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    setIsDraggingOverWorkspace(true);
    if (typeof index === 'number') {
      setDragOverIndex(index);
    }
  };

  const handleDropOnWorkspace = (e: React.DragEvent, dropIndex?: number) => {
    e.preventDefault();
    setIsDraggingOverWorkspace(false);
    setDragOverIndex(null);

    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const data = JSON.parse(dataStr);

      if (data.source === 'palette') {
        handleAddBlockToScript(data.block, dropIndex);
      } else if (data.source === 'workspace') {
        // Reorder within workspace
        const fromIndex = data.index;
        const targetIdx = typeof dropIndex === 'number' ? dropIndex : scriptStack.length - 1;
        if (fromIndex === targetIdx) return;

        setScriptStack(prev => {
          const next = [...prev];
          const [movedItem] = next.splice(fromIndex, 1);
          next.splice(targetIdx, 0, movedItem);
          return next;
        });
        playScratchSound('pop', 700, 0.05);
      }
    } catch {
      // ignore
    } finally {
      setDraggedBlock(null);
    }
  };

  // Canvas Drawing Routine (Stage Render)
  useEffect(() => {
    if (activeMode !== 'studio') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Backdrop
    if (selectedBackdrop === 'grid') {
      // Scratch coordinate grid (-240..240, -180..180)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Grid Lines
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Origin Axes
      ctx.strokeStyle = '#4C97FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#4C97FF';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('Y (180)', width / 2 + 5, 15);
      ctx.fillText('Y (-180)', width / 2 + 5, height - 8);
      ctx.fillText('X (-240)', 8, height / 2 - 6);
      ctx.fillText('X (240)', width - 48, height / 2 - 6);
      ctx.fillText('(0, 0)', width / 2 + 6, height / 2 + 14);
    } else if (selectedBackdrop === 'space') {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#030712');
      grad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Stars
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 45; i++) {
        const sx = (i * 83 + 23) % width;
        const sy = (i * 97 + 37) % height;
        const r = (i % 3) * 0.8 + 0.8;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (selectedBackdrop === 'city') {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#312e81');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Buildings
      ctx.fillStyle = '#1e1b4b';
      for (let i = 0; i < 8; i++) {
        const bx = i * 62;
        const bw = 54;
        const bh = 110 + (i % 3) * 45;
        ctx.fillRect(bx, height - bh, bw, bh);
        ctx.strokeStyle = '#6366f1';
        ctx.strokeRect(bx, height - bh, bw, bh);

        // Windows
        ctx.fillStyle = '#facc15';
        for (let wy = height - bh + 15; wy < height - 15; wy += 22) {
          ctx.fillRect(bx + 12, wy, 8, 8);
          ctx.fillRect(bx + 32, wy, 8, 8);
        }
        ctx.fillStyle = '#1e1b4b';
      }
    } else if (selectedBackdrop === 'nature') {
      // Sky & grass
      ctx.fillStyle = '#7dd3fc';
      ctx.fillRect(0, 0, width, height * 0.65);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, height * 0.65, width, height * 0.35);

      // Sun
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(410, 60, 32, 0, Math.PI * 2);
      ctx.fill();
    } else if (selectedBackdrop === 'underwater') {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(1, '#082f49');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Sand floor
      ctx.fillStyle = '#eab308';
      ctx.fillRect(0, height * 0.85, width, height * 0.15);
    } else if (selectedBackdrop === 'stage') {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, width, height);

      // Stage planks
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, height * 0.7, width, height * 0.3);

      // Spotlight cone
      ctx.fillStyle = 'rgba(254, 240, 138, 0.15)';
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width * 0.85, height);
      ctx.lineTo(width * 0.15, height);
      ctx.closePath();
      ctx.fill();
    }

    // 2. Draw Pen Trails
    penTrailsRef.current.forEach(t => {
      ctx.strokeStyle = t.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      const sx1 = width / 2 + t.x1;
      const sy1 = height / 2 - t.y1;
      const sx2 = width / 2 + t.x2;
      const sy2 = height / 2 - t.y2;
      ctx.moveTo(sx1, sy1);
      ctx.lineTo(sx2, sy2);
      ctx.stroke();
    });

    // 3. Draw All Sprites
    sprites.forEach(sprite => {
      if (!sprite.visible) return;

      const screenX = width / 2 + sprite.x;
      const screenY = height / 2 - sprite.y;
      const scale = (sprite.size / 100) * 0.85;

      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.rotate(((sprite.direction - 90) * Math.PI) / 180);
      ctx.scale(scale, scale);

      // Hue rotate
      ctx.filter = `hue-rotate(${sprite.colorHue}deg)`;

      if (sprite.type === 'cat') {
        // Authentic Scratch Cat Mascot Vector Rendering
        // Tail
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-20, 18);
        ctx.quadraticCurveTo(-38, 5, -34, -18);
        ctx.stroke();

        // Body
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.ellipse(0, 12, 26, 32, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Belly
        ctx.fillStyle = '#FEF3C7';
        ctx.beginPath();
        ctx.ellipse(0, 16, 14, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(0, -18, 23, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Ears
        ctx.beginPath();
        ctx.moveTo(-16, -34); ctx.lineTo(-8, -48); ctx.lineTo(-2, -37);
        ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(16, -34); ctx.lineTo(8, -48); ctx.lineTo(2, -37);
        ctx.fill(); ctx.stroke();

        // Eyes (Scratch large cartoon eyes)
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(-8, -21, 6, 9, 0, 0, Math.PI * 2);
        ctx.ellipse(8, -21, 6, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Pupils
        ctx.fillStyle = '#0F172A';
        ctx.beginPath();
        ctx.arc(-7, -21, 3.5, 0, Math.PI * 2);
        ctx.arc(9, -21, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.fillStyle = '#F43F5E';
        ctx.beginPath();
        ctx.arc(0, -12, 3, 0, Math.PI * 2);
        ctx.fill();

        // Whiskers
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-10, -11); ctx.lineTo(-24, -14);
        ctx.moveTo(-10, -8); ctx.lineTo(-23, -6);
        ctx.moveTo(10, -11); ctx.lineTo(24, -14);
        ctx.moveTo(10, -8); ctx.lineTo(23, -6);
        ctx.stroke();
      } else if (sprite.type === 'robot') {
        // Robot
        ctx.fillStyle = '#06B6D4';
        ctx.fillRect(-22, -28, 44, 52);
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(-22, -28, 44, 52);

        // Robot Eyes
        ctx.fillStyle = '#FACC15';
        ctx.fillRect(-14, -20, 10, 10);
        ctx.fillRect(4, -20, 10, 10);

        // Antenna
        ctx.strokeStyle = '#FACC15';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -28); ctx.lineTo(0, -44);
        ctx.stroke();
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(0, -44, 5, 0, Math.PI * 2);
        ctx.fill();
      } else if (sprite.type === 'rocket') {
        // Rocket
        ctx.fillStyle = '#F43F5E';
        ctx.beginPath();
        ctx.moveTo(0, -42);
        ctx.lineTo(22, 18);
        ctx.lineTo(-22, 18);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Cockpit window
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(0, -6, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Flame
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.moveTo(-12, 18);
        ctx.lineTo(0, 36);
        ctx.lineTo(12, 18);
        ctx.fill();
      }

      ctx.restore();

      // 4. Draw Speech or Thought Balloon
      if (sprite.sayText) {
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 2;

        const bw = Math.min(220, Math.max(120, sprite.sayText.length * 9 + 24));
        const bh = 34;
        const bx = Math.min(Math.max(screenX - bw / 2, 10), width - bw - 10);
        const by = Math.max(screenY - 80, 10);

        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 10);
        ctx.fill();
        ctx.stroke();

        // Tail
        ctx.beginPath();
        if (sprite.sayType === 'think') {
          ctx.arc(screenX, by + bh + 6, 4, 0, Math.PI * 2);
          ctx.arc(screenX, by + bh + 14, 2.5, 0, Math.PI * 2);
        } else {
          ctx.moveTo(screenX - 6, by + bh);
          ctx.lineTo(screenX, by + bh + 10);
          ctx.lineTo(screenX + 6, by + bh);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(sprite.sayText, bx + bw / 2, by + 21);
        ctx.restore();
      }
    });
  }, [sprites, selectedBackdrop, activeMode]);

  return (
    <div
      id="scratch-embed-container"
      className={`relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 ${
        isMaximized
          ? 'fixed inset-2 sm:inset-4 z-50 bg-slate-900 border-indigo-500/60 shadow-2xl'
          : 'bg-slate-900 border-slate-700/80 shadow-2xl ' + className
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. AUTHENTIC SCRATCH 3.0 TOP NAVIGATION BAR (#4C97FF)                    */}
      {/* ========================================================================= */}
      <header className="bg-[#4C97FF] text-white px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 select-none shadow-md z-20">
        
        {/* Left: Scratch Logo, Title & Menus */}
        <div className="flex items-center gap-3">
          
          {/* Logo */}
          <div className="flex items-center gap-2 pr-2 border-r border-white/25">
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
              <span className="p-1 rounded-lg bg-white text-[#4C97FF] shadow-sm font-black text-sm">S3</span>
              <span className="hidden sm:inline font-extrabold text-sm tracking-normal">DJuragan Studio</span>
            </span>
          </div>

          {/* Project Title Input */}
          <div className="flex items-center gap-1.5 bg-black/15 hover:bg-black/25 px-2.5 py-1 rounded-lg transition-colors">
            <Edit3 className="w-3.5 h-3.5 opacity-75" />
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none w-36 sm:w-48 placeholder-white/60 truncate"
              title="Nama Proyek Scratch"
            />
          </div>

          {/* Turbo Mode Toggle */}
          <button
            onClick={() => setIsTurboMode(!isTurboMode)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
              isTurboMode ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-black/15 text-white hover:bg-black/25'
            }`}
            title="Aktifkan Mode Eksekusi Cepat (Turbo 60fps)"
          >
            <Zap className="w-3 h-3" />
            <span className="hidden md:inline">{isTurboMode ? 'Turbo Aktif ⚡' : 'Turbo Off'}</span>
          </button>

        </div>

        {/* Center/Right: Green Flag, Stop Sign, Mode Switcher & Expand */}
        <div className="flex items-center gap-2">
          
          {/* Green Flag (Run) */}
          <button
            onClick={handleRunGreenFlag}
            disabled={isRunning}
            className={`px-3.5 py-1 rounded-full font-black text-xs flex items-center gap-1.5 shadow-md transition-all ${
              isRunning
                ? 'bg-emerald-400 text-slate-950 ring-2 ring-white animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:scale-105 active:scale-95'
            }`}
            title="Jalankan Skrip (Bendera Hijau)"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">{isRunning ? 'Sedang Jalan...' : 'Mulai (Flag)'}</span>
          </button>

          {/* Red Stop Sign (Stop) */}
          <button
            onClick={handleStopAll}
            className="p-1.5 rounded-full bg-rose-500 hover:bg-rose-400 text-white shadow-md hover:scale-105 active:scale-95 transition-all"
            title="Hentikan Program"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>

          {/* Reset Stage */}
          <button
            onClick={handleResetStage}
            className="p-1.5 rounded-lg bg-black/15 hover:bg-black/25 text-white transition-all text-xs"
            title="Kembalikan Posisi Sprite & Panggung"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-white/25 mx-1" />

          {/* External Scratch Link */}
          <button
            onClick={() => window.open('https://scratch.mit.edu/projects/editor/', '_blank')}
            className="hidden sm:flex px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold items-center gap-1 transition-all"
            title="Buka Scratch MIT Resmi di Tab Baru"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Scratch MIT</span>
          </button>

          {/* Maximize Toggle */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 rounded-lg bg-black/15 hover:bg-black/25 text-white transition-all"
            title={isMaximized ? 'Kecilkan' : 'Layar Penuh'}
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

        </div>

      </header>

      {/* ========================================================================= */}
      {/* 2. MODE SELECTOR SUBHEADER TABS                                           */}
      {/* ========================================================================= */}
      <div className="bg-slate-800 px-3 py-1.5 border-b border-slate-700 flex items-center justify-between gap-2 text-xs">
        
        {/* 3 Main IDE Tabs (Kode, Kostum, Suara) */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1 rounded-t-lg font-bold flex items-center gap-1.5 transition-all border-b-2 ${
              activeTab === 'code'
                ? 'bg-slate-900 text-[#4C97FF] border-[#4C97FF]'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Kode (Code)</span>
          </button>

          <button
            onClick={() => setActiveTab('costumes')}
            className={`px-3 py-1 rounded-t-lg font-bold flex items-center gap-1.5 transition-all border-b-2 ${
              activeTab === 'costumes'
                ? 'bg-slate-900 text-purple-400 border-purple-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Kostum (Costumes)</span>
          </button>

          <button
            onClick={() => setActiveTab('sounds')}
            className={`px-3 py-1 rounded-t-lg font-bold flex items-center gap-1.5 transition-all border-b-2 ${
              activeTab === 'sounds'
                ? 'bg-slate-900 text-pink-400 border-pink-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Suara (Sounds)</span>
          </button>
        </div>

        {/* Active Mode indicator / Embed Switchers */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveMode('studio')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
              activeMode === 'studio' ? 'bg-[#4C97FF]/20 text-[#4C97FF] border border-[#4C97FF]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            IDE Bawaan
          </button>
          <button
            onClick={() => setActiveMode('player')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
              activeMode === 'player' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            TurboWarp Live
          </button>
          <button
            onClick={() => setActiveMode('launcher')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
              activeMode === 'launcher' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Peluncur
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE VIEWPORT (AUTHENTIC 3-COLUMN SCRATCH IDE LAYOUT)        */}
      {/* ========================================================================= */}
      {activeMode === 'studio' && activeTab === 'code' && (
        <div className="flex-1 flex flex-col lg:flex-row bg-slate-950 overflow-hidden min-h-[580px]">
          
          {/* COLUMN 1 & 2: CATEGORY PALETTE SIDEBAR + BLOCKS LIST (Width: 320px) */}
          <div className="w-full lg:w-[360px] flex-shrink-0 flex border-r border-slate-800 bg-slate-900/90 z-10">
            
            {/* Category Circular Icons Sidebar (Authentic Scratch 3.0 Left Rail) */}
            <div className="w-[64px] flex-shrink-0 bg-slate-900 border-r border-slate-800 py-3 flex flex-col items-center gap-2 overflow-y-auto custom-scrollbar">
              {SCRATCH_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-12 py-1.5 rounded-xl flex flex-col items-center gap-1 transition-all group ${
                    activeCategory === cat.id ? 'bg-slate-800 ring-2 ring-white/20' : 'hover:bg-slate-800/60'
                  }`}
                  title={cat.name}
                >
                  <div
                    className="w-5 h-5 rounded-full shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-[9px] font-bold text-slate-300 leading-tight text-center truncate w-full px-0.5">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Block Palette List (Draggable Scratch Blocks with notches!) */}
            <div className="flex-1 p-3 overflow-y-auto max-h-[580px] space-y-2.5 custom-scrollbar bg-slate-900/50">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-300">
                  {SCRATCH_CATEGORIES.find(c => c.id === activeCategory)?.name}
                </span>
                <span className="text-[10px] text-slate-500">Tarik ke Canvas ↘</span>
              </div>

              {SCRATCH_PALETTE_BLOCKS
                .filter(blk => blk.category === activeCategory)
                .map((blk, idx) => {
                  const catMeta = SCRATCH_CATEGORIES.find(c => c.id === blk.category)!;
                  return (
                    <div
                      key={idx}
                      draggable
                      onDragStart={(e) => handleDragStartFromPalette(e, blk)}
                      onClick={() => handleAddBlockToScript(blk)}
                      style={{ backgroundColor: catMeta.color, borderColor: catMeta.hoverColor }}
                      className="relative p-2.5 rounded-xl border text-white shadow-md cursor-grab active:cursor-grabbing hover:brightness-110 active:scale-[0.98] transition-all select-none group"
                      title="Klik untuk menambahkan atau seret ke area skrip"
                    >
                      {/* Top Puzzle Notch Decoration */}
                      {blk.type !== 'hat' && (
                        <div
                          className="absolute -top-1 left-4 w-4 h-1.5 rounded-t-sm"
                          style={{ backgroundColor: catMeta.color }}
                        />
                      )}

                      {/* Hat Curved Top for Events */}
                      {blk.type === 'hat' && (
                        <div
                          className="absolute -top-2 left-0 right-10 h-2.5 rounded-t-xl"
                          style={{ backgroundColor: catMeta.color }}
                        />
                      )}

                      <div className="flex items-center justify-between gap-1 text-[11px] font-bold font-mono">
                        <span className="leading-snug">{blk.template}</span>
                        <Plus className="w-3.5 h-3.5 flex-shrink-0 opacity-60 group-hover:opacity-100" />
                      </div>

                      {/* Bottom Puzzle Notch Decoration */}
                      <div
                        className="absolute -bottom-1.5 left-4 w-4 h-1.5 rounded-b-sm border-t border-black/20"
                        style={{ backgroundColor: catMeta.color }}
                      />
                    </div>
                  );
                })}
            </div>

          </div>

          {/* COLUMN 3: MIDDLE SCRIPT WORKSPACE (Dotted Grid Canvas Area) */}
          <div
            className="flex-1 flex flex-col bg-slate-950 relative border-r border-slate-800 overflow-hidden"
            onDragOver={(e) => handleDragOverWorkspace(e)}
            onDrop={(e) => handleDropOnWorkspace(e)}
          >
            {/* Workspace Dotted Pattern Background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#4C97FF 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Script Header Bar */}
            <div className="relative z-10 p-2.5 px-4 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#4C97FF]" />
                <span className="font-bold text-white">Area Skrip ({scriptStack.length} Balok)</span>
                <span className="text-[10px] text-slate-400">Tarik balok ke sini untuk menyusun program</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClearScript}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold flex items-center gap-1 transition-all"
                  title="Kosongkan Skrip"
                >
                  <Trash2 className="w-3 h-3 text-rose-400" />
                  <span>Hapus Semua</span>
                </button>
              </div>
            </div>

            {/* Blocks Stack Container (Interactive Drag & Drop & Live Snap) */}
            <div className="relative z-10 flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-2">
              {scriptStack.length === 0 ? (
                <div className="h-full min-h-[260px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800 rounded-3xl text-slate-500 space-y-2">
                  <Layers className="w-8 h-8 opacity-40 text-[#4C97FF]" />
                  <p className="text-xs font-bold text-slate-400">Area Skrip Masih Kosong</p>
                  <p className="text-[11px] text-slate-500 max-w-xs">
                    Seret balok kode dari panel kiri atau klik tombol tambah (+) untuk mulai memprogram sprite.
                  </p>
                </div>
              ) : (
                scriptStack.map((blk, idx) => {
                  const catMeta = SCRATCH_CATEGORIES.find(c => c.id === blk.category)!;
                  const isExecuting = executingBlockId === blk.id;
                  const isDropTarget = dragOverIndex === idx;

                  return (
                    <React.Fragment key={blk.id}>
                      {/* Insertion Drop Target Indicator */}
                      {isDropTarget && (
                        <div className="w-full h-2 rounded-full bg-amber-400 shadow-md shadow-amber-400/50 animate-pulse my-1" />
                      )}

                      <div
                        draggable
                        onDragStart={(e) => handleDragStartFromWorkspace(e, blk, idx)}
                        onDragOver={(e) => handleDragOverWorkspace(e, idx)}
                        onDrop={(e) => handleDropOnWorkspace(e, idx)}
                        style={{ backgroundColor: catMeta.color, borderColor: catMeta.hoverColor }}
                        className={`relative p-3 rounded-2xl border text-white shadow-lg cursor-grab active:cursor-grabbing transition-all select-none group max-w-md ${
                          isExecuting
                            ? 'ring-4 ring-amber-300 shadow-amber-400/40 scale-[1.02] brightness-125'
                            : 'hover:brightness-105'
                        }`}
                      >
                        {/* Hat block curved top */}
                        {blk.type === 'hat' && (
                          <div
                            className="absolute -top-2.5 left-0 right-14 h-3 rounded-t-2xl"
                            style={{ backgroundColor: catMeta.color }}
                          />
                        )}

                        <div className="flex items-center justify-between gap-3 text-xs font-bold font-mono">
                          
                          {/* Block Body with Inline Editable Parameters */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] opacity-75 font-mono px-1.5 py-0.5 rounded bg-black/20 text-white font-bold">
                              #{idx + 1}
                            </span>

                            {/* Render template with inputs */}
                            <span className="leading-snug">{blk.template.split(/\[(.*?)\]/g).map((part, pIdx) => {
                              if (pIdx % 2 === 1) {
                                const paramKey = part;
                                const paramVal = blk.params[paramKey] ?? '';
                                return (
                                  <input
                                    key={pIdx}
                                    type={typeof paramVal === 'number' ? 'number' : 'text'}
                                    value={paramVal}
                                    onChange={(e) => handleUpdateBlockParam(blk.id, paramKey, typeof paramVal === 'number' ? Number(e.target.value) : e.target.value)}
                                    className="mx-1 px-2 py-0.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400 w-auto min-w-[36px] max-w-[120px] text-center"
                                  />
                                );
                              }
                              return <span key={pIdx}>{part}</span>;
                            })}</span>
                          </div>

                          {/* Block Quick Controls (Test & Delete) */}
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => executeBlock(blk)}
                              className="p-1 rounded-lg bg-black/25 hover:bg-black/50 text-white text-[10px] font-bold px-2 flex items-center gap-1"
                              title="Uji balok ini langsung"
                            >
                              <Play className="w-2.5 h-2.5 fill-current" />
                              <span>Uji</span>
                            </button>

                            {idx > 0 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveBlockFromScript(blk.id)}
                                className="p-1 rounded-lg bg-rose-500/40 hover:bg-rose-500 text-white transition-colors"
                                title="Hapus balok"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              )}
            </div>

            {/* Bottom Right Workspace Zoom Controls */}
            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl shadow-lg">
              <button
                onClick={() => setZoomLevel(z => Math.min(1.4, z + 0.1))}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs"
                title="Perbesar"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="px-2 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-[10px] font-mono font-bold"
                title="Reset Zoom 100%"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={() => setZoomLevel(z => Math.max(0.7, z - 0.1))}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs"
                title="Perkecil"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* COLUMN 4: RIGHT COLUMN - VISUAL STAGE & SPRITE PROPERTIES (Width: 380px) */}
          <div className="w-full lg:w-[420px] flex-shrink-0 flex flex-col bg-slate-900 border-l border-slate-800 p-4 space-y-4">
            
            {/* Stage Frame & Monitors */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-[#4C97FF]" />
                  <span>Panggung Scratch 3.0 (Stage)</span>
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-amber-300">
                    ☁️ skor: {stageVariables.skor}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-cyan-300">
                    ⏱️ {stageVariables.timer}s
                  </span>
                </div>
              </div>

              {/* Canvas 480x360 scaled aspect */}
              <div className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden border-2 border-slate-800 shadow-inner flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={360}
                  className="w-full h-full object-contain cursor-crosshair"
                  onClick={() => executeBlock({ id: 'click-event', category: 'events', type: 'hat', opcode: 'event_whenthisspriteclicked', template: '', params: {} })}
                />
              </div>
            </div>

            {/* Sprite Properties Inspector (Authentic Scratch 3.0 Inspector Form) */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3 text-xs">
              
              {/* Row 1: Sprite Name & Position */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Sprite</label>
                  <input
                    type="text"
                    value={currentSprite.name}
                    onChange={(e) => updateCurrentSprite({ name: e.target.value })}
                    className="w-full px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#4C97FF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-0.5">x</label>
                  <input
                    type="number"
                    value={Math.round(currentSprite.x)}
                    onChange={(e) => updateCurrentSprite({ x: Number(e.target.value) })}
                    className="w-full px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#4C97FF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-0.5">y</label>
                  <input
                    type="number"
                    value={Math.round(currentSprite.y)}
                    onChange={(e) => updateCurrentSprite({ y: Number(e.target.value) })}
                    className="w-full px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#4C97FF]"
                  />
                </div>
              </div>

              {/* Row 2: Visibility, Size & Direction */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Tampilkan</label>
                  <button
                    onClick={() => updateCurrentSprite({ visible: !currentSprite.visible })}
                    className={`w-full py-1 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all ${
                      currentSprite.visible ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    {currentSprite.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{currentSprite.visible ? 'Lihat' : 'Sembunyi'}</span>
                  </button>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Ukuran (%)</label>
                  <input
                    type="number"
                    value={currentSprite.size}
                    onChange={(e) => updateCurrentSprite({ size: Number(e.target.value) })}
                    className="w-full px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#4C97FF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Arah (°)</label>
                  <input
                    type="number"
                    value={currentSprite.direction}
                    onChange={(e) => updateCurrentSprite({ direction: Number(e.target.value) })}
                    className="w-full px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:outline-none focus:border-[#4C97FF]"
                  />
                </div>
              </div>

            </div>

            {/* Sprites and Backdrops Manager */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              
              {/* Sprite Selector Tray */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                  <span>Daftar Karakter ({sprites.length})</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {sprites.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSpriteId(s.id)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        selectedSpriteId === s.id
                          ? 'border-[#4C97FF] bg-[#4C97FF]/20 shadow-md ring-1 ring-[#4C97FF]'
                          : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-xl">{s.emoji}</span>
                      <span className="text-[9px] text-slate-300 truncate w-full text-center mt-1 font-bold">
                        {s.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Backdrop Selector Tray */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                  <span>Latar Panggung</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {BACKDROP_OPTIONS.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBackdrop(b.id)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        selectedBackdrop === b.id
                          ? 'border-purple-400 bg-purple-500/20 shadow-md ring-1 ring-purple-400'
                          : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800'
                      }`}
                      title={b.desc}
                    >
                      <span className="text-lg">{b.emoji}</span>
                      <span className="text-[9px] text-slate-300 truncate w-full text-center mt-1 font-bold">
                        {b.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. COSTUMES TAB VIEWPORT                                                  */}
      {/* ========================================================================= */}
      {activeMode === 'studio' && activeTab === 'costumes' && (
        <div className="p-6 bg-slate-950 text-white flex-1 flex flex-col space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                <span>Editor Kostum Karakter: {currentSprite.name}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Pilih atau ganti kostum animasi untuk membuat karakter tampak berjalan atau berubah ekspresi.
              </p>
            </div>

            <button
              onClick={() => updateCurrentSprite({ costumeIndex: (currentSprite.costumeIndex + 1) % 2 })}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ganti Kostum Animasi</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border-2 border-purple-400/80 flex flex-col items-center justify-center space-y-3">
              <span className="text-6xl">{currentSprite.emoji}</span>
              <span className="text-xs font-bold text-white">Kostum 1 (Pose Utama)</span>
              <span className="text-[10px] text-slate-400">Vektor Grafis Standar</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center space-y-3">
              <span className="text-6xl scale-x-[-1]">{currentSprite.emoji}</span>
              <span className="text-xs font-bold text-white">Kostum 2 (Langkah Berjalan)</span>
              <button
                onClick={() => updateCurrentSprite({ costumeIndex: 1 })}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Pilih Kostum Ini
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-center space-y-2 text-xs">
              <span className="font-bold text-slate-200">Karakter Tersedia di Library:</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Kucing Scratch', emoji: '🐱', type: 'cat' as const },
                  { name: 'Robot Astro', emoji: '🤖', type: 'robot' as const },
                  { name: 'Roket Star', emoji: '🚀', type: 'rocket' as const },
                  { name: 'Dino Hijau', emoji: '🦖', type: 'dino' as const }
                ].map(item => (
                  <button
                    key={item.type}
                    onClick={() => updateCurrentSprite({ type: item.type, name: item.name, emoji: item.emoji })}
                    className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center gap-2 text-left"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-[11px] font-bold text-white truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SOUNDS TAB VIEWPORT                                                    */}
      {/* ========================================================================= */}
      {activeMode === 'studio' && activeTab === 'sounds' && (
        <div className="p-6 bg-slate-950 text-white flex-1 flex flex-col space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-pink-400" />
                <span>Sampler Audio & Synthesizer Scratch 3.0</span>
              </h3>
              <p className="text-xs text-slate-400">
                Putar, modifikasi kecepatan, nada, dan volume efek suara Scratch interaktif.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Audio Sampler Controls */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-300 block">Pilih Efek Suara:</span>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'meow', name: 'Meow Kucing 🐱', type: 'meow' as const },
                  { id: 'pop', name: 'Pop Synth 🎈', type: 'pop' as const },
                  { id: 'jump', name: '8-Bit Jump 🦘', type: 'jump' as const },
                  { id: 'win', name: 'Level Up Arpeggio ⭐', type: 'win' as const },
                  { id: 'laser', name: 'Laser Blaster ⚡', type: 'laser' as const }
                ].map(snd => (
                  <button
                    key={snd.id}
                    onClick={() => {
                      setSelectedSoundSample(snd.type);
                      playScratchSound(snd.type);
                    }}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all ${
                      selectedSoundSample === snd.type
                        ? 'bg-pink-600/20 border-pink-500 text-pink-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{snd.name}</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                ))}
              </div>

              {/* Volume & Speed Sliders */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Volume Audio: {soundVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={soundVolume}
                    onChange={(e) => setSoundVolume(Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Kecepatan Nada (Pitch Rate): {soundPlaybackRate}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={soundPlaybackRate}
                    onChange={(e) => setSoundPlaybackRate(Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>
              </div>

            </div>

            {/* Live Visualizer Box */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">Visualisasi Gelombang Suara</span>
                <div className="h-32 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
                  {[40, 65, 85, 30, 95, 120, 70, 45, 90, 110, 60, 80, 50, 95, 40].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h * 0.7}%` }}
                      className="w-2 rounded-full bg-gradient-to-t from-pink-600 to-purple-400 opacity-80 animate-pulse"
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => playScratchSound(selectedSoundSample)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-600/20"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Uji Putar Suara ({selectedSoundSample})</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TURBOWARP PLAYER EMBED VIEWPORT                                        */}
      {/* ========================================================================= */}
      {activeMode === 'player' && (
        <div className="p-4 sm:p-6 bg-slate-950 text-white flex-1 flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-emerald-400" />
                <span>Pemutar Scratch TurboWarp 60 FPS</span>
              </h3>
              <p className="text-xs text-slate-400">
                Jalankan proyek game atau animasi Scratch langsung dari ID proyek Scratch resmi.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value.trim())}
                placeholder="ID Proyek Scratch (cth: 60917032)"
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#4C97FF]"
              />
              <button
                onClick={() => {
                  setIsPlayerLoading(true);
                  setPlayerIframeKey(k => k + 1);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#4C97FF] hover:bg-[#3373CC] text-white text-xs font-bold flex items-center gap-1 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Muat</span>
              </button>
            </div>
          </div>

          <div className="relative w-full flex-1 min-h-[480px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center">
            {isPlayerLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm text-center p-6">
                <div className="w-10 h-10 rounded-2xl bg-[#4C97FF]/20 border border-[#4C97FF]/40 flex items-center justify-center text-[#4C97FF] mb-2 animate-spin">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-white">Memuat Proyek Scratch ID: {projectId}...</p>
              </div>
            )}

            <iframe
              key={`player-${projectId}-${playerIframeKey}`}
              src={`https://turbowarp.org/${projectId}/embed?fps=60&autoplay=true`}
              title="Scratch TurboWarp Project Player"
              className="w-full h-full min-h-[480px] border-0"
              allow="autoplay; fullscreen; microphone; camera"
              onLoad={() => setIsPlayerLoading(false)}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. LAUNCHER VIEWPORT                                                      */}
      {/* ========================================================================= */}
      {activeMode === 'launcher' && (
        <div className="p-6 sm:p-8 bg-slate-950 text-white flex-1 flex flex-col justify-center space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-white">
              Peluncur Editor Scratch 3.0 & TurboWarp
            </h3>
            <p className="text-xs text-slate-400">
              Buka aplikasi editor koding visual Scratch di tab baru dengan akses penuh penyimpanan lokal (.sb3) tanpa hambatan:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
            <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-6 rounded-3xl flex flex-col justify-between space-y-4 transition-all shadow-lg">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black text-xl">
                  🐱
                </div>
                <h4 className="text-base font-bold text-white">Scratch MIT Web Official</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Editor visual block resmi dari MIT Media Lab. Lengkap dengan ribuan library sprite, suara, dan tutorial bawaan.
                </p>
              </div>

              <button
                onClick={() => window.open('https://scratch.mit.edu/projects/editor/', '_blank')}
                className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-400/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka Scratch MIT (Tab Baru)</span>
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-3xl flex flex-col justify-between space-y-4 transition-all shadow-lg">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-xl">
                  ⚡
                </div>
                <h4 className="text-base font-bold text-white">TurboWarp 60 FPS Editor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Scratch 3.0 compiler cepat dengan fitur mode gelap, kompilator Javascript 60fps, dan ekspor langsung ke file komputer.
                </p>
              </div>

              <button
                onClick={() => window.open('https://turbowarp.org/editor', '_blank')}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka TurboWarp 60FPS (Tab Baru)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. BENTO FOOTER STATUS BAR                                               */}
      {/* ========================================================================= */}
      <footer className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#4C97FF] flex-shrink-0" />
          <span>
            {currentLevelTitle} • Studio visual Scratch 3.0 dengan drag & drop dan Web Audio sintetis.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open('https://turbowarp.org/editor', '_blank')}
            className="text-amber-400 hover:underline font-bold"
          >
            TurboWarp ↗
          </button>
          <button
            onClick={() => window.open('https://scratch.mit.edu/projects/editor/', '_blank')}
            className="text-[#4C97FF] hover:underline font-bold"
          >
            Scratch MIT ↗
          </button>
        </div>
      </footer>

    </div>
  );
};
