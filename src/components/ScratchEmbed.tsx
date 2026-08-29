import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink, RefreshCw, Maximize2, Minimize2, Info,
  Laptop, Play, Square, RotateCcw,
  Zap, Code2, Layers, Volume2, Sparkles, Plus, Trash2, CheckCircle2, Gamepad2
} from 'lucide-react';

interface ScratchEmbedProps {
  currentLevelTitle?: string;
  tutorialUrl?: string;
  className?: string;
  isCompact?: boolean;
}

type BlockCategory = 'motion' | 'looks' | 'sound' | 'events' | 'control' | 'variables';

interface ScratchBlockItem {
  id: string;
  category: BlockCategory;
  name: string;
  code: string;
  action: string;
  colorClass: string;
  textColor: string;
}

export const ScratchEmbed: React.FC<ScratchEmbedProps> = ({
  currentLevelTitle = 'Latihan Scratch Studio',
  className = ''
}) => {
  // Modes: 'studio' (Interactive Built-in Studio IDE) | 'player' (TurboWarp Embed Player) | 'launcher' (Direct Fullscreen Web Editor)
  const [activeMode, setActiveMode] = useState<'studio' | 'player' | 'launcher'>('studio');
  const [isMaximized, setIsMaximized] = useState(false);

  // TurboWarp Embed Player state
  const [projectId, setProjectId] = useState<string>('60917032'); // Valid Scratch Starter Demo
  const [playerIframeKey, setPlayerIframeKey] = useState<number>(0);
  const [isPlayerLoading, setIsPlayerLoading] = useState<boolean>(true);

  // Interactive Studio Canvas & Script State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [spriteType, setSpriteType] = useState<'cat' | 'robot' | 'rocket' | 'star' | 'dino'>('cat');
  const [backdrop, setBackdrop] = useState<'grid' | 'space' | 'city' | 'nature'>('grid');
  const [spritePos, setSpritePos] = useState({ x: 200, y: 150, angle: 0, size: 1, colorHue: 0 });
  const [speechBubble, setSpeechBubble] = useState<string | null>('Halo! Ayo koding!');
  const [isRunning, setIsRunning] = useState(false);
  const [activeCategory, setActiveCategory] = useState<BlockCategory>('motion');
  const [score, setScore] = useState(0);

  // Script stack (list of active blocks)
  const [scriptStack, setScriptStack] = useState<ScratchBlockItem[]>([
    { id: '1', category: 'events', name: 'ketika bendera hijau diklik ⚑', code: 'when_flag', action: 'flag', colorClass: 'bg-amber-500 border-amber-600', textColor: 'text-slate-950 font-black' },
    { id: '2', category: 'motion', name: 'gerak (25) langkah', code: 'move_25', action: 'move', colorClass: 'bg-blue-600 border-blue-700', textColor: 'text-white font-bold' },
    { id: '3', category: 'motion', name: 'putar kanan ↷ (15) derajat', code: 'turn_15', action: 'turn', colorClass: 'bg-blue-600 border-blue-700', textColor: 'text-white font-bold' },
    { id: '4', category: 'looks', name: 'katakan [DJuragan Coding Keren!]', code: 'say_text', action: 'say', colorClass: 'bg-purple-600 border-purple-700', textColor: 'text-white font-bold' },
    { id: '5', category: 'sound', name: 'mainkan suara nada (Pop Synth)', code: 'play_sound', action: 'sound', colorClass: 'bg-pink-600 border-pink-700', textColor: 'text-white font-bold' }
  ]);

  // Audio synthesizer for real Sound Blocks
  const playWebAudioSound = (frequency = 440, type: OscillatorType = 'sine', duration = 0.25) => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  // Available Block Library by Category
  const blockLibrary: Record<BlockCategory, Omit<ScratchBlockItem, 'id'>[]> = {
    motion: [
      { category: 'motion', name: 'gerak (20) langkah ke depan', code: 'move_20', action: 'move_forward', colorClass: 'bg-blue-600 border-blue-700', textColor: 'text-white font-bold' },
      { category: 'motion', name: 'mundur (-20) langkah', code: 'move_back', action: 'move_backward', colorClass: 'bg-blue-600 border-blue-700', textColor: 'text-white font-bold' },
      { category: 'motion', name: 'putar kanan ↷ (15) derajat', code: 'turn_right', action: 'turn_right', colorClass: 'bg-blue-600 border-blue-700', textColor: 'text-white font-bold' },
      { category: 'motion', name: 'putar kiri ↶ (15) derajat', code: 'turn_left', action: 'turn_left', colorClass: 'bg-blue-600 border-blue-700', textColor: 'text-white font-bold' },
      { category: 'motion', name: 'pergi ke x:(0) y:(0) pusat', code: 'goto_center', action: 'goto_center', colorClass: 'bg-blue-600 border-blue-700', textColor: 'text-white font-bold' },
      { category: 'motion', name: 'geser ke posisi acak', code: 'glide_random', action: 'glide_random', colorClass: 'bg-blue-600 border-blue-700', textColor: 'text-white font-bold' }
    ],
    looks: [
      { category: 'looks', name: 'katakan [Halo Dunia Koding!] (2 detik)', code: 'say_hello', action: 'say_hello', colorClass: 'bg-purple-600 border-purple-700', textColor: 'text-white font-bold' },
      { category: 'looks', name: 'pikirkan [Hmm... Algoritma Asik!] (2 detik)', code: 'think_algo', action: 'think_algo', colorClass: 'bg-purple-600 border-purple-700', textColor: 'text-white font-bold' },
      { category: 'looks', name: 'ubah efek warna sebesar (25)', code: 'change_color', action: 'change_color', colorClass: 'bg-purple-600 border-purple-700', textColor: 'text-white font-bold' },
      { category: 'looks', name: 'ubah ukuran sebesar (10)', code: 'size_plus', action: 'size_plus', colorClass: 'bg-purple-600 border-purple-700', textColor: 'text-white font-bold' },
      { category: 'looks', name: 'atur ukuran ke (100)% normal', code: 'size_reset', action: 'size_reset', colorClass: 'bg-purple-600 border-purple-700', textColor: 'text-white font-bold' }
    ],
    sound: [
      { category: 'sound', name: 'mainkan nada Pop Tinggi (880 Hz)', code: 'sound_high', action: 'sound_high', colorClass: 'bg-pink-600 border-pink-700', textColor: 'text-white font-bold' },
      { category: 'sound', name: 'mainkan nada Melodi Game (587 Hz)', code: 'sound_melody', action: 'sound_melody', colorClass: 'bg-pink-600 border-pink-700', textColor: 'text-white font-bold' },
      { category: 'sound', name: 'mainkan suara Meow Kucing (330 Hz)', code: 'sound_meow', action: 'sound_meow', colorClass: 'bg-pink-600 border-pink-700', textColor: 'text-white font-bold' },
      { category: 'sound', name: 'mainkan efek Level Up (Arpeggio)', code: 'sound_levelup', action: 'sound_levelup', colorClass: 'bg-pink-600 border-pink-700', textColor: 'text-white font-bold' }
    ],
    events: [
      { category: 'events', name: 'ketika bendera hijau diklik ⚑', code: 'when_flag', action: 'flag', colorClass: 'bg-amber-500 border-amber-600', textColor: 'text-slate-950 font-black' },
      { category: 'events', name: 'ketika spasi ditekan', code: 'when_space', action: 'key_space', colorClass: 'bg-amber-500 border-amber-600', textColor: 'text-slate-950 font-black' },
      { category: 'events', name: 'ketika karakter ini diklik 👆', code: 'when_clicked', action: 'sprite_click', colorClass: 'bg-amber-500 border-amber-600', textColor: 'text-slate-950 font-black' }
    ],
    control: [
      { category: 'control', name: 'ulangi (4) kali loop', code: 'repeat_4', action: 'repeat_4', colorClass: 'bg-amber-600 border-amber-700', textColor: 'text-white font-bold' },
      { category: 'control', name: 'tunggu (0.5) detik', code: 'wait_half', action: 'wait_half', colorClass: 'bg-amber-600 border-amber-700', textColor: 'text-white font-bold' },
      { category: 'control', name: 'pantul jika di pinggir panggung', code: 'bounce_edge', action: 'bounce_edge', colorClass: 'bg-amber-600 border-amber-700', textColor: 'text-white font-bold' }
    ],
    variables: [
      { category: 'variables', name: 'ubah [Skor] sebesar (10)', code: 'score_10', action: 'score_10', colorClass: 'bg-emerald-600 border-emerald-700', textColor: 'text-white font-bold' },
      { category: 'variables', name: 'atur [Skor] ke (0)', code: 'score_reset', action: 'score_reset', colorClass: 'bg-emerald-600 border-emerald-700', textColor: 'text-white font-bold' }
    ]
  };

  // Add block to script stack
  const handleAddBlock = (block: Omit<ScratchBlockItem, 'id'>) => {
    const newBlock: ScratchBlockItem = {
      ...block,
      id: Math.random().toString(36).substring(2, 9)
    };
    setScriptStack(prev => [...prev, newBlock]);
  };

  // Remove block from script stack
  const handleRemoveBlock = (id: string) => {
    setScriptStack(prev => prev.filter(b => b.id !== id));
  };

  // Clear script
  const handleClearScript = () => {
    setScriptStack([
      { id: '1', category: 'events', name: 'ketika bendera hijau diklik ⚑', code: 'when_flag', action: 'flag', colorClass: 'bg-amber-500 border-amber-600', textColor: 'text-slate-950 font-black' }
    ]);
  };

  // Run script stack sequentially
  const handleRunScript = () => {
    if (isRunning) return;
    setIsRunning(true);
    setSpeechBubble('Memulai Eksekusi Skrip Scratch...');

    let index = 0;
    const interval = setInterval(() => {
      if (index >= scriptStack.length) {
        clearInterval(interval);
        setIsRunning(false);
        setSpeechBubble('Selesai! Tekan Bendera Hijau untuk mengulang 🚀');
        return;
      }

      const block = scriptStack[index];
      executeSingleAction(block.action);
      index++;
    }, 550);
  };

  // Action executor
  const executeSingleAction = (action: string) => {
    switch (action) {
      case 'flag':
        playWebAudioSound(523.25, 'triangle', 0.15); // C5
        setSpeechBubble('Bendera Hijau Aktif!');
        break;
      case 'move':
      case 'move_forward':
        playWebAudioSound(659.25, 'sine', 0.1); // E5
        setSpritePos(prev => {
          const rad = (prev.angle * Math.PI) / 180;
          const nextX = Math.min(Math.max(prev.x + Math.cos(rad) * 30, 40), 380);
          const nextY = Math.min(Math.max(prev.y + Math.sin(rad) * 30, 40), 260);
          return { ...prev, x: nextX, y: nextY };
        });
        setSpeechBubble('Maju Langkah!');
        break;
      case 'move_backward':
        playWebAudioSound(440, 'sine', 0.1);
        setSpritePos(prev => {
          const rad = (prev.angle * Math.PI) / 180;
          const nextX = Math.min(Math.max(prev.x - Math.cos(rad) * 30, 40), 380);
          const nextY = Math.min(Math.max(prev.y - Math.sin(rad) * 30, 40), 260);
          return { ...prev, x: nextX, y: nextY };
        });
        setSpeechBubble('Mundur Langkah!');
        break;
      case 'turn':
      case 'turn_right':
        playWebAudioSound(783.99, 'sine', 0.1); // G5
        setSpritePos(prev => ({ ...prev, angle: (prev.angle + 25) % 360 }));
        setSpeechBubble('Putar Kanan ↷');
        break;
      case 'turn_left':
        playWebAudioSound(587.33, 'sine', 0.1); // D5
        setSpritePos(prev => ({ ...prev, angle: (prev.angle - 25 + 360) % 360 }));
        setSpeechBubble('Putar Kiri ↶');
        break;
      case 'goto_center':
        setSpritePos(prev => ({ ...prev, x: 200, y: 150 }));
        setSpeechBubble('Kembali ke Pusat (0,0)');
        break;
      case 'glide_random':
        playWebAudioSound(698.46, 'sine', 0.2);
        setSpritePos(prev => ({
          ...prev,
          x: 60 + Math.random() * 280,
          y: 60 + Math.random() * 180
        }));
        setSpeechBubble('Meluncur Acak!');
        break;
      case 'say':
      case 'say_hello':
        setSpeechBubble('Halo DJuragan Coding! 🚀');
        break;
      case 'think_algo':
        setSpeechBubble('Hmm... Koding itu seru! 💡');
        break;
      case 'change_color':
        playWebAudioSound(880, 'sine', 0.15);
        setSpritePos(prev => ({ ...prev, colorHue: (prev.colorHue + 60) % 360 }));
        setSpeechBubble('Efek Warna Berubah! ✨');
        break;
      case 'size_plus':
        setSpritePos(prev => ({ ...prev, size: Math.min(prev.size + 0.2, 1.8) }));
        setSpeechBubble('Karakter Membesar!');
        break;
      case 'size_reset':
        setSpritePos(prev => ({ ...prev, size: 1 }));
        setSpeechBubble('Ukuran Normal 100%');
        break;
      case 'sound':
      case 'sound_high':
        playWebAudioSound(880, 'square', 0.2);
        setSpeechBubble('🔊 Pop Synth!');
        break;
      case 'sound_melody':
        playWebAudioSound(587, 'triangle', 0.25);
        setSpeechBubble('🎵 Nada Melodi!');
        break;
      case 'sound_meow':
        playWebAudioSound(349, 'sine', 0.35);
        setSpeechBubble('🐱 Meow Scratch!');
        break;
      case 'sound_levelup':
        // Arpeggio sound
        playWebAudioSound(523.25, 'sine', 0.1);
        setTimeout(() => playWebAudioSound(659.25, 'sine', 0.1), 100);
        setTimeout(() => playWebAudioSound(783.99, 'sine', 0.1), 200);
        setTimeout(() => playWebAudioSound(1046.50, 'sine', 0.25), 300);
        setSpeechBubble('🎉 Level Up Arpeggio!');
        break;
      case 'score_10':
        setScore(prev => prev + 10);
        setSpeechBubble('Skor +10 Ditambahkan!');
        break;
      case 'score_reset':
        setScore(0);
        setSpeechBubble('Skor di-reset ke 0');
        break;
      case 'bounce_edge':
        setSpritePos(prev => {
          let newAngle = prev.angle;
          if (prev.x <= 50 || prev.x >= 350 || prev.y <= 50 || prev.y >= 250) {
            newAngle = (prev.angle + 180) % 360;
          }
          return { ...prev, angle: newAngle };
        });
        setSpeechBubble('Pantul dari Pinggir!');
        break;
      default:
        break;
    }
  };

  // Reset Stage
  const handleResetStage = () => {
    setIsRunning(false);
    setSpritePos({ x: 200, y: 150, angle: 0, size: 1, colorHue: 0 });
    setSpeechBubble('Panggung siap! Klik Bendera Hijau');
    setScore(0);
  };

  // Canvas Drawing Routine
  useEffect(() => {
    if (activeMode !== 'studio') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Backdrop
    if (backdrop === 'grid') {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Coordinate Grid Lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Origin Axes
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText('(0,0)', canvas.width / 2 + 6, canvas.height / 2 + 14);
    } else if (backdrop === 'space') {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#030712');
      grad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 40; i++) {
        const sx = (i * 73 + 19) % canvas.width;
        const sy = (i * 97 + 31) % canvas.height;
        const r = (i % 3) + 1;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (backdrop === 'city') {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#312e81');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Neon buildings
      ctx.fillStyle = '#1e1b4b';
      for (let i = 0; i < 7; i++) {
        const bx = i * 65;
        const bw = 55;
        const bh = 100 + (i % 3) * 40;
        ctx.fillRect(bx, canvas.height - bh, bw, bh);
        ctx.strokeStyle = '#6366f1';
        ctx.strokeRect(bx, canvas.height - bh, bw, bh);
      }
    } else if (backdrop === 'nature') {
      // Sky & grass
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.65);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, canvas.height * 0.65, canvas.width, canvas.height * 0.35);

      // Sun
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(360, 50, 28, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Sprite
    ctx.save();
    ctx.translate(spritePos.x, spritePos.y);
    ctx.rotate((spritePos.angle * Math.PI) / 180);
    ctx.scale(spritePos.size, spritePos.size);

    // Color filter
    ctx.filter = `hue-rotate(${spritePos.colorHue}deg)`;

    if (spriteType === 'cat') {
      // Scratch Cat Mascot
      // Body
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.ellipse(0, 10, 24, 28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Head
      ctx.beginPath();
      ctx.arc(0, -15, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Ears
      ctx.beginPath();
      ctx.moveTo(-14, -28); ctx.lineTo(-6, -40); ctx.lineTo(-2, -30);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(14, -28); ctx.lineTo(6, -40); ctx.lineTo(2, -30);
      ctx.fill(); ctx.stroke();

      // Eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-7, -18, 5, 7, 0, 0, Math.PI * 2);
      ctx.ellipse(7, -18, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-6, -18, 3, 0, Math.PI * 2);
      ctx.arc(8, -18, 3, 0, Math.PI * 2);
      ctx.fill();

      // Nose & Whiskers
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(0, -11, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-8, -10); ctx.lineTo(-20, -12);
      ctx.moveTo(-8, -8); ctx.lineTo(-19, -6);
      ctx.moveTo(8, -10); ctx.lineTo(20, -12);
      ctx.moveTo(8, -8); ctx.lineTo(19, -6);
      ctx.stroke();
    } else if (spriteType === 'robot') {
      // Robot Sprite
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(-20, -25, 40, 45);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(-20, -25, 40, 45);

      // Robot Eyes
      ctx.fillStyle = '#facc15';
      ctx.fillRect(-12, -18, 8, 8);
      ctx.fillRect(4, -18, 8, 8);

      // Antenna
      ctx.strokeStyle = '#facc15';
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.lineTo(0, -38);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(0, -38, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (spriteType === 'rocket') {
      // Rocket Sprite
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(0, -35);
      ctx.lineTo(18, 15);
      ctx.lineTo(-18, 15);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Window
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(0, -5, 7, 0, Math.PI * 2);
      ctx.fill();

      // Flame
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(-10, 15);
      ctx.lineTo(0, 30);
      ctx.lineTo(10, 15);
      ctx.fill();
    } else if (spriteType === 'star') {
      // Star Sprite
      ctx.fillStyle = '#facc15';
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const ang = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const sx = Math.cos(ang) * 24;
        const sy = Math.sin(ang) * 24;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (spriteType === 'dino') {
      // Dino Sprite
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.ellipse(0, 5, 20, 24, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(8, -15, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(12, -18, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(14, -18, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    // Draw Speech Balloon if any
    if (speechBubble) {
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      const bx = Math.min(Math.max(spritePos.x - 30, 20), canvas.width - 220);
      const by = Math.max(spritePos.y - 70, 20);

      ctx.beginPath();
      ctx.roundRect(bx, by, 200, 34, 8);
      ctx.fill();
      ctx.stroke();

      // Tail
      ctx.beginPath();
      ctx.moveTo(spritePos.x, by + 34);
      ctx.lineTo(spritePos.x + 8, by + 42);
      ctx.lineTo(spritePos.x + 16, by + 34);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px system-ui';
      ctx.fillText(speechBubble, bx + 10, by + 21);
      ctx.restore();
    }
  }, [spritePos, spriteType, backdrop, speechBubble, activeMode]);

  return (
    <div
      id="scratch-embed-container"
      className={`relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 ${
        isMaximized
          ? 'fixed inset-3 z-50 bg-slate-950 border-indigo-500/50 shadow-2xl'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl ' + className
      }`}
    >
      {/* Top Header Bento Bar */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-5 py-3 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 gap-3 flex-shrink-0">
        
        {/* Left: Mode Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 dark:bg-slate-900 p-1 rounded-2xl border border-slate-300 dark:border-slate-800">
          <button
            onClick={() => setActiveMode('studio')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'studio'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Studio Interaktif Scratch Bawaan</span>
          </button>

          <button
            onClick={() => setActiveMode('player')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'player'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pemutar Proyek Scratch Live</span>
          </button>

          <button
            onClick={() => setActiveMode('launcher')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'launcher'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Peluncur Cepat Editor Resmi</span>
          </button>
        </div>

        {/* Right: Quick Controls */}
        <div className="flex items-center gap-2">
          {activeMode === 'studio' && (
            <button
              onClick={handleResetStage}
              title="Reset Panggung & Karakter"
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Posisi</span>
            </button>
          )}

          <button
            onClick={() => window.open('https://scratch.mit.edu/projects/editor/', '_blank')}
            className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-sm"
            title="Buka Scratch MIT Resmi di Tab Baru"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Buka Scratch MIT ↗</span>
          </button>

          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-200/60 dark:bg-slate-800 transition-all"
            title={isMaximized ? 'Perkecil' : 'Perbesar Penuh'}
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Main Mode Body */}
      {activeMode === 'studio' && (
        <div className="p-4 sm:p-6 bg-slate-950 text-white flex-1 flex flex-col gap-6">
          
          {/* Top Row: Visual Stage on Left + Script Stack on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Stage Canvas Card (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col space-y-4 shadow-xl">
              
              {/* Stage Header: Green Flag & Stop */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-200">Panggung Visual Scratch</span>
                  <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Skor: {score}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunScript}
                    disabled={isRunning}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isRunning ? 'Menjalankan...' : 'Bendera Hijau'}</span>
                  </button>

                  <button
                    onClick={handleResetStage}
                    className="p-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold transition-all shadow-md shadow-rose-500/20"
                    title="Stop & Reset"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>

              {/* Canvas Frame */}
              <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={300}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => executeSingleAction('sprite_click')}
                />
              </div>

              {/* Customizer: Sprite & Backdrop Selectors */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1.5">Pilih Karakter (Sprite):</label>
                  <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                    {(['cat', 'robot', 'rocket', 'star', 'dino'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setSpriteType(s)}
                        className={`flex-1 py-1 text-xs rounded-lg font-bold transition-all ${
                          spriteType === s ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {s === 'cat' ? '🐱' : s === 'robot' ? '🤖' : s === 'rocket' ? '🚀' : s === 'star' ? '⭐' : '🦖'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1.5">Latar Panggung (Backdrop):</label>
                  <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                    {(['grid', 'space', 'city', 'nature'] as const).map(b => (
                      <button
                        key={b}
                        onClick={() => setBackdrop(b)}
                        className={`flex-1 py-1 text-xs rounded-lg font-bold transition-all ${
                          backdrop === b ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {b === 'grid' ? '📐' : b === 'space' ? '🌌' : b === 'city' ? '🏙️' : '🌳'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coordinates Indicator */}
              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
                <span>Posisi: X: {Math.round(spritePos.x - 200)}, Y: {Math.round(150 - spritePos.y)}</span>
                <span>Sudut: {spritePos.angle}°</span>
              </div>

            </div>

            {/* Script Workspace (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col space-y-4 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-black text-slate-200">Area Skrip Program ({scriptStack.length} Blok)</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearScript}
                    className="px-2.5 py-1 text-xs rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-all flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Skrip</span>
                  </button>
                </div>
              </div>

              {/* Stacked Code Blocks */}
              <div className="space-y-2 min-h-[220px] max-h-[300px] overflow-y-auto p-2 bg-slate-950 rounded-2xl border border-slate-800/80 custom-scrollbar">
                {scriptStack.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    Belum ada blok kode. Tambahkan blok dari kategori di bawah!
                  </div>
                ) : (
                  scriptStack.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-2xl border ${item.colorClass} shadow-md flex items-center justify-between group transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] opacity-75 font-mono px-1.5 py-0.5 rounded bg-black/20 text-white font-bold">
                          #{idx + 1}
                        </span>
                        <span className={`text-xs font-mono ${item.textColor}`}>
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={() => executeSingleAction(item.action)}
                          className="p-1 rounded-lg bg-black/30 hover:bg-black/50 text-white text-[10px] font-bold px-2 flex items-center gap-1"
                          title="Jalankan blok ini saja"
                        >
                          <Play className="w-2.5 h-2.5 fill-current" />
                          <span>Uji</span>
                        </button>
                        {idx > 0 && (
                          <button
                            onClick={() => handleRemoveBlock(item.id)}
                            className="p-1 rounded-lg bg-rose-500/40 hover:bg-rose-500 text-white transition-colors"
                            title="Hapus blok ini"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Block Palette Category Tabs */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                  {(['motion', 'looks', 'sound', 'events', 'control', 'variables'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                        activeCategory === cat
                          ? cat === 'motion' ? 'bg-blue-600 text-white'
                            : cat === 'looks' ? 'bg-purple-600 text-white'
                            : cat === 'sound' ? 'bg-pink-600 text-white'
                            : cat === 'events' ? 'bg-amber-500 text-slate-950 font-black'
                            : cat === 'control' ? 'bg-amber-600 text-white'
                            : 'bg-emerald-600 text-white'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {cat === 'motion' && '🔵 Gerak (Motion)'}
                      {cat === 'looks' && '🟣 Tampilan (Looks)'}
                      {cat === 'sound' && '🔊 Suara (Sound)'}
                      {cat === 'events' && '🟡 Kejadian (Events)'}
                      {cat === 'control' && '🟠 Kontrol (Control)'}
                      {cat === 'variables' && '🟢 Variabel (Score)'}
                    </button>
                  ))}
                </div>

                {/* Available Blocks to Add */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                  {blockLibrary[activeCategory].map((blk, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAddBlock(blk)}
                      className={`p-2.5 rounded-xl border ${blk.colorClass} hover:brightness-110 shadow-sm flex items-center justify-between text-left transition-all`}
                    >
                      <span className={`text-[11px] font-mono truncate ${blk.textColor}`}>
                        {blk.name}
                      </span>
                      <Plus className="w-3.5 h-3.5 flex-shrink-0 text-white opacity-80" />
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Mode 2: TurboWarp Project Player */}
      {activeMode === 'player' && (
        <div className="p-4 sm:p-6 bg-slate-950 text-white flex-1 flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-emerald-400" />
                <span>Pemutar Scratch TurboWarp (60 FPS Lancar)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Mainkan proyek animasi & game Scratch langsung tanpa lag melalui embed resmi yang valid.
              </p>
            </div>

            {/* Project ID input selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value.trim())}
                placeholder="ID Proyek Scratch (cth: 60917032)"
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => {
                  setIsPlayerLoading(true);
                  setPlayerIframeKey(k => k + 1);
                }}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Muat</span>
              </button>
            </div>
          </div>

          {/* Player Iframe Frame */}
          <div className="relative w-full flex-1 min-h-[480px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center">
            {isPlayerLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm text-center p-6">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-2 animate-spin">
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

      {/* Mode 3: Rapid Launcher Cards */}
      {activeMode === 'launcher' && (
        <div className="p-6 sm:p-8 bg-slate-950 text-white flex-1 flex flex-col justify-center space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-white">
              Peluncur Editor Scratch 3.0 & TurboWarp
            </h3>
            <p className="text-xs text-slate-400">
              Buka aplikasi editor koding visual Scratch di tab baru dengan akses penuh penyimpanan lokal (.sb3) tanpa hambatan browser:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
            {/* Launcher Card 1: Scratch MIT Official */}
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

            {/* Launcher Card 2: TurboWarp Editor */}
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

      {/* Bento Footer Helper Bar */}
      <div className="px-4 py-3 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
          <span>
            {currentLevelTitle} • Eksekusi visual Scratch mandiri & tersimpan di perangkat.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open('https://turbowarp.org/editor', '_blank')}
            className="text-amber-500 hover:underline font-bold"
          >
            TurboWarp ↗
          </button>
          <button
            onClick={() => window.open('https://scratch.mit.edu/projects/editor/', '_blank')}
            className="text-indigo-500 hover:underline font-bold"
          >
            Scratch MIT ↗
          </button>
        </div>
      </div>

    </div>
  );
};
