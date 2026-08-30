import React, { useState, useEffect, useRef } from 'react';
import {
  ScratchCategory, ScratchBlockData, SpriteState,
  INITIAL_SPRITES, SCRATCH_CATEGORIES
} from './scratch/scratchTypes';
import { ScratchHeader } from './scratch/ScratchHeader';
import { ScratchTabs } from './scratch/ScratchTabs';
import { ScratchBlocksPalette } from './scratch/ScratchBlocksPalette';
import { ScratchWorkspace } from './scratch/ScratchWorkspace';
import { ScratchStage } from './scratch/ScratchStage';
import { ScratchSpritePane } from './scratch/ScratchSpritePane';
import { ScratchCostumesTab } from './scratch/ScratchCostumesTab';
import { ScratchSoundsTab } from './scratch/ScratchSoundsTab';
import { ScratchExtensionModal } from './scratch/ScratchExtensionModal';

interface ScratchEmbedProps {
  currentLevelTitle?: string;
  tutorialUrl?: string;
  className?: string;
  isCompact?: boolean;
}

export const ScratchEmbed: React.FC<ScratchEmbedProps> = ({
  currentLevelTitle,
  className = '',
  isCompact = false
}) => {
  // Navigation & Project Meta
  const [projectTitle, setProjectTitle] = useState('Proyek Scratch Saya - DJuragan');
  const [isTurboMode, setIsTurboMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'costumes' | 'sounds'>('code');
  const [activeCategory, setActiveCategory] = useState<ScratchCategory>('motion');
  const [stageLayout, setStageLayout] = useState<'standard' | 'small' | 'large'>('standard');
  const [isMaximized, setIsMaximized] = useState(false);
  const [isExtensionsModalOpen, setIsExtensionsModalOpen] = useState(false);

  // Sprites & Stage State
  const [sprites, setSprites] = useState<SpriteState[]>(INITIAL_SPRITES);
  const [selectedSpriteId, setSelectedSpriteId] = useState<string>(INITIAL_SPRITES[0].id);
  const [selectedBackdrop, setSelectedBackdrop] = useState<string>('grid');
  const [stageVariables, setStageVariables] = useState({
    skor: 0,
    nyawa: 3,
    timer: 0.0
  });

  // Keep references to latest state to avoid stale closures in execution loops
  const spritesRef = useRef<SpriteState[]>(sprites);
  const selectedSpriteIdRef = useRef<string>(selectedSpriteId);
  const isRunningRef = useRef<boolean>(false);

  useEffect(() => {
    spritesRef.current = sprites;
  }, [sprites]);

  useEffect(() => {
    selectedSpriteIdRef.current = selectedSpriteId;
  }, [selectedSpriteId]);

  // Scripts & Execution State
  const [scriptStack, setScriptStack] = useState<ScratchBlockData[]>([
    { id: 'b-1', category: 'events', type: 'hat', opcode: 'event_whenflagclicked', template: 'ketika ⚑ diklik', params: {} },
    { id: 'b-2', category: 'looks', type: 'stack', opcode: 'looks_sayforsecs', template: 'katakan [message] selama [secs] detik', params: { message: 'Halo Dunia Coding! 🚀', secs: 2 } },
    { id: 'b-3', category: 'motion', type: 'stack', opcode: 'motion_movesteps', template: 'gerak [steps] langkah', params: { steps: 30 } },
    { id: 'b-4', category: 'motion', type: 'stack', opcode: 'motion_turnright', template: 'putar kanan ↷ [degrees] derajat', params: { degrees: 30 } },
    { id: 'b-5', category: 'motion', type: 'stack', opcode: 'motion_movesteps', template: 'gerak [steps] langkah', params: { steps: 30 } },
    { id: 'b-6', category: 'sound', type: 'stack', opcode: 'sound_pop', template: 'mainkan nada synth pop [note]', params: { note: 'C5' } }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [executingBlockId, setExecutingBlockId] = useState<string | null>(null);

  // Drag and Drop State
  const [draggedBlock, setDraggedBlock] = useState<Omit<ScratchBlockData, 'id'> | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Pen Trails
  const penTrailsRef = useRef<{ x1: number; y1: number; x2: number; y2: number; color: string }[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Sound Synthesizer via Web Audio API
  const playScratchSound = (type: string, freq = 440, duration = 0.2) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'meow') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.15);
        osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq || 600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } else if (type === 'levelup') {
        osc.type = 'triangle';
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((n, i) => {
          osc.frequency.setValueAtTime(n, ctx.currentTime + i * 0.08);
        });
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      }
    } catch {
      // audio error handling
    }
  };

  // Timer Tick
  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval>;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setStageVariables(prev => ({ ...prev, timer: prev.timer + 0.1 }));
      }, 100);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning]);

  // Helper to update sprite and immediately update ref
  const updateSpriteState = (targetId: string, updater: (prev: SpriteState) => SpriteState) => {
    setSprites(prevList => {
      const updated = prevList.map(s => (s.id === targetId ? updater(s) : s));
      spritesRef.current = updated;
      return updated;
    });
  };

  // Execute Individual Block
  const executeSingleBlock = async (block: ScratchBlockData) => {
    setExecutingBlockId(block.id);
    const targetId = selectedSpriteIdRef.current;
    const sprite = spritesRef.current.find(s => s.id === targetId) || spritesRef.current[0];
    if (!sprite) return;

    switch (block.opcode) {
      // 1. MOTION BLOCKS
      case 'motion_movesteps': {
        const steps = Number(block.params.steps ?? 10);
        // In Scratch: 0° is UP, 90° is RIGHT, 180° is DOWN, 270°/-90° is LEFT
        const rad = (sprite.direction * Math.PI) / 180;
        const dx = Math.round(steps * Math.sin(rad));
        const dy = Math.round(steps * Math.cos(rad));
        const nx = Math.min(240, Math.max(-240, sprite.x + dx));
        const ny = Math.min(180, Math.max(-180, sprite.y + dy));

        if (sprite.penDown) {
          penTrailsRef.current.push({
            x1: sprite.x,
            y1: sprite.y,
            x2: nx,
            y2: ny,
            color: sprite.penColor
          });
        }

        updateSpriteState(sprite.id, s => ({ ...s, x: nx, y: ny }));
        playScratchSound('pop', 750, 0.05);
        break;
      }

      case 'motion_turnright': {
        const deg = Number(block.params.degrees ?? 15);
        const newDirection = ((sprite.direction + deg) % 360 + 360) % 360;
        updateSpriteState(sprite.id, s => ({ ...s, direction: newDirection }));
        playScratchSound('pop', 650, 0.04);
        break;
      }

      case 'motion_turnleft': {
        const deg = Number(block.params.degrees ?? 15);
        const newDirection = ((sprite.direction - deg) % 360 + 360) % 360;
        updateSpriteState(sprite.id, s => ({ ...s, direction: newDirection }));
        playScratchSound('pop', 650, 0.04);
        break;
      }

      case 'motion_goto': {
        const dest = String(block.params.destination || 'posisi acak');
        let targetX = 0;
        let targetY = 0;
        if (dest === 'posisi acak' || dest === 'random') {
          targetX = Math.round((Math.random() * 360) - 180);
          targetY = Math.round((Math.random() * 260) - 130);
        } else {
          targetX = Math.round((Math.random() * 200) - 100);
          targetY = Math.round((Math.random() * 150) - 75);
        }
        updateSpriteState(sprite.id, s => ({ ...s, x: targetX, y: targetY }));
        playScratchSound('pop', 700, 0.06);
        break;
      }

      case 'motion_gotoxy': {
        const targetX = Math.min(240, Math.max(-240, Number(block.params.x ?? 0)));
        const targetY = Math.min(180, Math.max(-180, Number(block.params.y ?? 0)));
        updateSpriteState(sprite.id, s => ({ ...s, x: targetX, y: targetY }));
        playScratchSound('pop', 700, 0.05);
        break;
      }

      case 'motion_glideto': {
        const secs = Math.max(0.2, Number(block.params.secs ?? 1));
        const targetX = Math.round((Math.random() * 360) - 180);
        const targetY = Math.round((Math.random() * 260) - 130);
        const startX = sprite.x;
        const startY = sprite.y;
        const totalSteps = Math.max(10, Math.round((secs * 1000) / (isTurboMode ? 16 : 33)));
        const stepDelay = (secs * 1000) / totalSteps;

        for (let step = 1; step <= totalSteps; step++) {
          if (!isRunningRef.current && isRunning) break;
          const progress = step / totalSteps;
          const curX = Math.round(startX + (targetX - startX) * progress);
          const curY = Math.round(startY + (targetY - startY) * progress);
          updateSpriteState(sprite.id, s => ({ ...s, x: curX, y: curY }));
          await new Promise(r => setTimeout(r, stepDelay));
        }
        break;
      }

      case 'motion_pointindirection': {
        const dir = ((Number(block.params.direction ?? 90) % 360) + 360) % 360;
        updateSpriteState(sprite.id, s => ({ ...s, direction: dir }));
        break;
      }

      case 'motion_changexby': {
        const ch = Number(block.params.change ?? 10);
        const nx = Math.min(240, Math.max(-240, sprite.x + ch));
        updateSpriteState(sprite.id, s => ({ ...s, x: nx }));
        playScratchSound('pop', 720, 0.04);
        break;
      }

      case 'motion_setx': {
        const nx = Math.min(240, Math.max(-240, Number(block.params.x ?? 0)));
        updateSpriteState(sprite.id, s => ({ ...s, x: nx }));
        break;
      }

      case 'motion_changeyby': {
        const ch = Number(block.params.change ?? 10);
        const ny = Math.min(180, Math.max(-180, sprite.y + ch));
        updateSpriteState(sprite.id, s => ({ ...s, y: ny }));
        playScratchSound('pop', 720, 0.04);
        break;
      }

      case 'motion_sety': {
        const ny = Math.min(180, Math.max(-180, Number(block.params.y ?? 0)));
        updateSpriteState(sprite.id, s => ({ ...s, y: ny }));
        break;
      }

      case 'motion_ifonedgebounce': {
        let bounced = false;
        let newDir = sprite.direction;
        let nx = sprite.x;
        let ny = sprite.y;

        if (sprite.x >= 220) { nx = 220; newDir = (360 - newDir + 360) % 360; bounced = true; }
        else if (sprite.x <= -220) { nx = -220; newDir = (360 - newDir + 360) % 360; bounced = true; }

        if (sprite.y >= 160) { ny = 160; newDir = (180 - newDir + 360) % 360; bounced = true; }
        else if (sprite.y <= -160) { ny = -160; newDir = (180 - newDir + 360) % 360; bounced = true; }

        if (bounced) {
          updateSpriteState(sprite.id, s => ({ ...s, x: nx, y: ny, direction: newDir }));
          playScratchSound('pop', 850, 0.1);
        }
        break;
      }

      // 2. LOOKS BLOCKS
      case 'looks_sayforsecs': {
        const msg = String(block.params.message || 'Halo!');
        const secs = Number(block.params.secs || 2);
        updateSpriteState(sprite.id, s => ({ ...s, sayText: msg, sayType: 'say' }));
        playScratchSound('pop', 550, 0.05);
        await new Promise(r => setTimeout(r, secs * (isTurboMode ? 200 : 1000)));
        updateSpriteState(sprite.id, s => ({ ...s, sayText: null }));
        break;
      }

      case 'looks_say': {
        const msg = String(block.params.message || 'Halo!');
        updateSpriteState(sprite.id, s => ({ ...s, sayText: msg, sayType: 'say' }));
        playScratchSound('pop', 550, 0.05);
        break;
      }

      case 'looks_think': {
        const msg = String(block.params.message || 'Hmm...');
        const secs = Number(block.params.secs || 2);
        updateSpriteState(sprite.id, s => ({ ...s, sayText: msg, sayType: 'think' }));
        await new Promise(r => setTimeout(r, secs * (isTurboMode ? 200 : 1000)));
        updateSpriteState(sprite.id, s => ({ ...s, sayText: null }));
        break;
      }

      case 'looks_nextcostume': {
        updateSpriteState(sprite.id, s => ({
          ...s,
          costumeIndex: (s.costumeIndex + 1) % 2,
          colorHue: (s.colorHue + 30) % 360
        }));
        playScratchSound('pop', 600, 0.05);
        break;
      }

      case 'looks_changesizeby': {
        const ch = Number(block.params.change || 10);
        updateSpriteState(sprite.id, s => ({ ...s, size: Math.max(20, Math.min(250, s.size + ch)) }));
        break;
      }

      case 'looks_setsizeto': {
        const sz = Number(block.params.size || 100);
        updateSpriteState(sprite.id, s => ({ ...s, size: Math.max(20, Math.min(250, sz)) }));
        break;
      }

      case 'looks_changecoloreffect': {
        const ch = Number(block.params.change || 25);
        updateSpriteState(sprite.id, s => ({ ...s, colorHue: (s.colorHue + ch) % 360 }));
        playScratchSound('levelup', 520, 0.1);
        break;
      }

      case 'looks_cleargraphiceffects': {
        updateSpriteState(sprite.id, s => ({ ...s, colorHue: 0, size: 100, sayText: null }));
        break;
      }

      case 'looks_show': {
        updateSpriteState(sprite.id, s => ({ ...s, visible: true }));
        break;
      }

      case 'looks_hide': {
        updateSpriteState(sprite.id, s => ({ ...s, visible: false }));
        break;
      }

      // 3. SOUND BLOCKS
      case 'sound_playuntildone': {
        playScratchSound('meow');
        await new Promise(r => setTimeout(r, isTurboMode ? 100 : 400));
        break;
      }

      case 'sound_pop': {
        playScratchSound('pop', 600, 0.15);
        break;
      }

      case 'sound_levelup': {
        playScratchSound('levelup', 500, 0.4);
        break;
      }

      case 'sound_stopallsounds': {
        if (audioContextRef.current && audioContextRef.current.state === 'running') {
          audioContextRef.current.suspend();
        }
        break;
      }

      case 'sound_changevolumeby': {
        playScratchSound('pop', 800, 0.1);
        break;
      }

      // 4. CONTROL BLOCKS
      case 'control_wait': {
        const secs = Number(block.params.secs || 1);
        await new Promise(r => setTimeout(r, secs * (isTurboMode ? 100 : 1000)));
        break;
      }

      case 'control_repeat': {
        const times = Math.max(1, Math.min(20, Number(block.params.times || 4)));
        for (let t = 0; t < times; t++) {
          if (!isRunningRef.current && isRunning) break;
          // Step animation in current direction
          const currentSp = spritesRef.current.find(s => s.id === targetId) || spritesRef.current[0];
          const rad = (currentSp.direction * Math.PI) / 180;
          const nx = Math.min(240, Math.max(-240, Math.round(currentSp.x + 10 * Math.sin(rad))));
          const ny = Math.min(180, Math.max(-180, Math.round(currentSp.y + 10 * Math.cos(rad))));
          updateSpriteState(currentSp.id, s => ({ ...s, x: nx, y: ny }));
          playScratchSound('pop', 700 + t * 40, 0.03);
          await new Promise(r => setTimeout(r, isTurboMode ? 30 : 120));
        }
        break;
      }

      // 5. VARIABLES & OPERATORS
      case 'data_changevariableby': {
        const val = Number(block.params.value || 10);
        setStageVariables(prev => ({ ...prev, skor: prev.skor + val }));
        playScratchSound('levelup');
        break;
      }

      case 'data_setvariableto': {
        const val = Number(block.params.value || 0);
        setStageVariables(prev => ({ ...prev, skor: val }));
        break;
      }

      case 'data_changevariableby_lives': {
        const val = Number(block.params.value || -1);
        setStageVariables(prev => ({ ...prev, nyawa: Math.max(0, prev.nyawa + val) }));
        playScratchSound('pop', 300, 0.15);
        break;
      }

      case 'sensing_resettimer': {
        setStageVariables(prev => ({ ...prev, timer: 0.0 }));
        break;
      }

      default:
        break;
    }

    const delay = isTurboMode ? 30 : 180;
    await new Promise(r => setTimeout(r, delay));
    setExecutingBlockId(null);
  };

  // Run Green Flag
  const handleRunGreenFlag = async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setIsRunning(true);
    playScratchSound('pop', 800, 0.08);

    try {
      for (let i = 0; i < scriptStack.length; i++) {
        if (!isRunningRef.current) break;
        await executeSingleBlock(scriptStack[i]);
      }
    } finally {
      isRunningRef.current = false;
      setIsRunning(false);
      setExecutingBlockId(null);
    }
  };

  // Stop Program
  const handleStopAll = () => {
    isRunningRef.current = false;
    setIsRunning(false);
    setExecutingBlockId(null);
    setSprites(prev => prev.map(s => ({ ...s, sayText: null })));
  };

  // Reset Stage
  const handleResetStage = () => {
    handleStopAll();
    penTrailsRef.current = [];
    setSprites(INITIAL_SPRITES);
    spritesRef.current = INITIAL_SPRITES;
    setStageVariables({ skor: 0, nyawa: 3, timer: 0 });
  };

  // Add Block to Script Stack
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

  // Drag Handlers
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
    if (typeof index === 'number') {
      setDragOverIndex(index);
    }
  };

  const handleDropOnWorkspace = (e: React.DragEvent, dropIndex?: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const data = JSON.parse(dataStr);

      if (data.source === 'palette') {
        handleAddBlockToScript(data.block, dropIndex);
      } else if (data.source === 'workspace') {
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

  // Update Block Parameter
  const handleUpdateBlockParam = (blockId: string, paramKey: string, value: string | number) => {
    setScriptStack(prev => prev.map(b => (b.id === blockId ? { ...b, params: { ...b.params, [paramKey]: value } } : b)));
  };

  const currentSprite = sprites.find(s => s.id === selectedSpriteId) || sprites[0];

  const handleUpdateSprite = (updates: Partial<SpriteState>) => {
    setSprites(prev => prev.map(s => (s.id === selectedSpriteId ? { ...s, ...updates } : s)));
  };

  const handleAddSprite = (type: 'cat' | 'robot' | 'rocket' | 'dino' | 'star') => {
    const emojis = { cat: '🐱', robot: '🤖', rocket: '🚀', dino: '🦖', star: '⭐' };
    const names = { cat: 'Kucing', robot: 'Robot', rocket: 'Roket', dino: 'Dinosaurus', star: 'Bintang' };
    const newSprite: SpriteState = {
      id: `sprite-${Date.now()}`,
      name: `${names[type]} Baru`,
      emoji: emojis[type],
      type,
      x: Math.floor(Math.random() * 160) - 80,
      y: Math.floor(Math.random() * 120) - 60,
      direction: 90,
      size: 100,
      visible: true,
      colorHue: 0,
      costumeIndex: 0,
      sayText: null,
      sayType: null,
      penDown: false,
      penColor: '#4C97FF'
    };
    setSprites(prev => [...prev, newSprite]);
    setSelectedSpriteId(newSprite.id);
  };

  const handleRemoveSprite = (id: string) => {
    if (sprites.length <= 1) return;
    setSprites(prev => prev.filter(s => s.id !== id));
    setSelectedSpriteId(sprites[0].id);
  };

  return (
    <div
      id="scratch-embed-container"
      className={`flex flex-col rounded-2xl overflow-hidden border border-[#D0E2FB] shadow-2xl transition-all duration-300 bg-white select-none ${
        isMaximized ? 'fixed inset-2 sm:inset-4 z-50 shadow-2xl' : 'w-full h-[680px] ' + className
      }`}
    >
      {/* 1. TOP SCRATCH 3.0 HEADER (#4C97FF) */}
      <ScratchHeader
        projectTitle={projectTitle}
        setProjectTitle={setProjectTitle}
        isTurboMode={isTurboMode}
        setIsTurboMode={setIsTurboMode}
        onNewProject={handleResetStage}
        onSaveToComputer={() => alert('Proyek tersimpan dengan sukses!')}
        onLoadFromComputer={() => alert('Fitur unggah file .sb3 siap!')}
        onOpenTutorials={() => window.open('https://scratch.mit.edu/ideas', '_blank')}
        onShareProject={() => alert('Proyek berhasil dibagikan!')}
        isCompact={isCompact || stageLayout === 'small'}
      />

      {/* 2. SUB-HEADER: TABS & GREEN FLAG STAGE CONTROLS */}
      <ScratchTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isRunning={isRunning}
        onGreenFlag={handleRunGreenFlag}
        onStopSign={handleStopAll}
        stageLayout={stageLayout}
        setStageLayout={setStageLayout}
        isMaximized={isMaximized}
        setIsMaximized={setIsMaximized}
        isCompact={isCompact || stageLayout === 'small'}
      />

      {/* 3. MAIN EDITOR BODY */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* TAB: CODE (Kode) */}
        {activeTab === 'code' && (
          <div className="flex-1 flex overflow-hidden min-w-0">
            {/* Left Category Rail + Blocks Palette */}
            <ScratchBlocksPalette
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onAddBlock={handleAddBlockToScript}
              onDragStartFromPalette={handleDragStartFromPalette}
              onOpenExtensionsModal={() => setIsExtensionsModalOpen(true)}
              isCompact={isCompact || stageLayout === 'small'}
            />

            {/* Middle Scripts Workspace */}
            <ScratchWorkspace
              scriptStack={scriptStack}
              setScriptStack={setScriptStack}
              executingBlockId={executingBlockId}
              onExecuteBlock={executeSingleBlock}
              onRemoveBlock={(id) => setScriptStack(prev => prev.filter(b => b.id !== id))}
              onClearScript={() => setScriptStack([])}
              onUpdateBlockParam={handleUpdateBlockParam}
              onDragStartFromWorkspace={handleDragStartFromWorkspace}
              onDragOverWorkspace={handleDragOverWorkspace}
              onDropOnWorkspace={handleDropOnWorkspace}
              dragOverIndex={dragOverIndex}
            />
          </div>
        )}

        {/* TAB: COSTUMES (Kostum) */}
        {activeTab === 'costumes' && (
          <ScratchCostumesTab
            selectedSprite={currentSprite}
            onUpdateSprite={handleUpdateSprite}
          />
        )}

        {/* TAB: SOUNDS (Suara) */}
        {activeTab === 'sounds' && (
          <ScratchSoundsTab
            onPlaySound={playScratchSound}
          />
        )}

        {/* RIGHT PANE: STAGE & SPRITE MANAGEMENT */}
        <div className={`flex-shrink-0 flex flex-col bg-[#F2F7FE] border-l border-[#D0E2FB] overflow-y-auto custom-scrollbar transition-all duration-200 ${
          isCompact || stageLayout === 'small'
            ? 'w-[260px] sm:w-[300px]'
            : 'w-[320px] sm:w-[400px]'
        }`}>
          {/* Top Stage */}
          <div className="p-2 bg-[#E9F1FC] border-b border-[#D0E2FB] flex items-center justify-center">
            <ScratchStage
              sprites={sprites}
              selectedSpriteId={selectedSpriteId}
              onSelectSprite={setSelectedSpriteId}
              onUpdateSpritePos={(id, x, y) => {
                setSprites(prev => prev.map(s => (s.id === id ? { ...s, x, y } : s)));
              }}
              selectedBackdrop={selectedBackdrop}
              stageVariables={stageVariables}
              penTrailsRef={penTrailsRef}
              isCompact={isCompact || stageLayout === 'small'}
            />
          </div>

          {/* Sprite Properties & Selection Pane */}
          <ScratchSpritePane
            sprites={sprites}
            selectedSpriteId={selectedSpriteId}
            onSelectSprite={setSelectedSpriteId}
            onUpdateSprite={handleUpdateSprite}
            onAddSprite={handleAddSprite}
            onRemoveSprite={handleRemoveSprite}
            selectedBackdrop={selectedBackdrop}
            onSelectBackdrop={setSelectedBackdrop}
            isCompact={isCompact || stageLayout === 'small'}
          />
        </div>

      </div>

      {/* Extensions Library Modal */}
      <ScratchExtensionModal
        isOpen={isExtensionsModalOpen}
        onClose={() => setIsExtensionsModalOpen(false)}
        onSelectExtension={(extId) => {
          alert(`Ekstensi ${extId} berhasil dimuat!`);
        }}
      />
    </div>
  );
};
