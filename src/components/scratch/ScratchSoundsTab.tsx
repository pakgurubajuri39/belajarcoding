import React, { useState } from 'react';
import {
  Volume2, Play, Square, FastForward, Rewind,
  VolumeX, Plus, Sparkles, Cpu, RotateCcw
} from 'lucide-react';

interface ScratchSoundsTabProps {
  onPlaySound: (type: string, freq?: number, duration?: number) => void;
}

export const ScratchSoundsTab: React.FC<ScratchSoundsTabProps> = ({
  onPlaySound
}) => {
  const [activeSoundIndex, setActiveSoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const sounds = [
    { name: 'Meow Kucing 🐱', duration: '0.85s', type: 'meow' },
    { name: 'Pop Synth 🎵', duration: '0.15s', type: 'pop' },
    { name: 'Menang (Level Up) ⭐', duration: '1.20s', type: 'levelup' },
    { name: 'Laser 8-Bit ⚡', duration: '0.30s', type: 'laser' }
  ];

  const currentSound = sounds[activeSoundIndex];

  const handlePlayCurrentSound = (customPitch = 1) => {
    setIsPlaying(true);
    if (currentSound.type === 'meow') {
      onPlaySound('meow', 440 * customPitch, 0.4);
    } else if (currentSound.type === 'pop') {
      onPlaySound('pop', 600 * customPitch, 0.1);
    } else if (currentSound.type === 'levelup') {
      onPlaySound('levelup', 520 * customPitch, 0.6);
    } else {
      onPlaySound('laser', 800 * customPitch, 0.3);
    }

    setTimeout(() => setIsPlaying(false), 500);
  };

  return (
    <div className="flex-1 flex bg-[#F9F9F9] select-none h-full overflow-hidden">
      
      {/* 1. LEFT: SOUNDS LIST */}
      <div className="w-52 bg-[#F2F7FE] border-r border-[#D0E2FB] p-2 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-1.5 overflow-y-auto">
          <span className="text-[10px] font-black uppercase text-slate-500 px-1">Daftar Suara</span>
          {sounds.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setActiveSoundIndex(idx)}
              className={`p-2 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                activeSoundIndex === idx
                  ? 'bg-white border-[#CF63CF] shadow-sm ring-2 ring-[#CF63CF]/30'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="w-9 h-9 rounded bg-[#CF63CF]/15 text-[#CF63CF] flex items-center justify-center shadow-inner">
                <Volume2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-slate-800 truncate">{s.name}</span>
                <span className="text-[10px] text-slate-400 font-semibold">{s.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Sound (+) Button */}
        <button
          onClick={() => {}}
          className="w-full py-2 bg-[#CF63CF] hover:bg-[#B54FB5] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-all"
          title="Pilih Suara dari Perpustakaan"
        >
          <Plus className="w-4 h-4" />
          <span>Pilih Suara</span>
        </button>
      </div>

      {/* 2. CENTER: SOUND WAVEFORM & AUDIO EFFECTS */}
      <div className="flex-1 flex flex-col bg-white p-6 justify-between">
        
        {/* Sound Header & Play Button */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePlayCurrentSound(1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-all ${
                isPlaying ? 'bg-[#CF63CF] scale-105 animate-pulse' : 'bg-[#CF63CF] hover:bg-[#B54FB5] active:scale-95'
              }`}
              title="Putar Suara"
            >
              {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <div>
              <input
                type="text"
                value={currentSound.name}
                readOnly
                className="font-black text-slate-800 text-sm focus:outline-none bg-transparent"
              />
              <span className="text-[11px] text-slate-400 block font-semibold">Durasi: {currentSound.duration}</span>
            </div>
          </div>
        </div>

        {/* Sound Waveform Visualization */}
        <div className="my-6 bg-[#F2F7FE] border border-[#D0E2FB] rounded-xl h-36 flex items-center justify-center p-4 relative overflow-hidden">
          <div className="flex items-center justify-center gap-1.5 w-full h-full">
            {[20, 45, 60, 90, 75, 40, 85, 100, 65, 30, 70, 95, 80, 50, 25, 60, 40, 20].map((h, i) => (
              <div
                key={i}
                style={{ height: `${isPlaying ? Math.min(100, h * 1.2) : h}%` }}
                className={`w-2.5 rounded-full transition-all duration-150 ${
                  isPlaying ? 'bg-[#CF63CF]' : 'bg-[#D0E2FB]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Authentic Scratch 3.0 Sound Effects Toolbar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          
          <button
            onClick={() => handlePlayCurrentSound(1.4)}
            className="p-2 rounded-lg bg-slate-50 hover:bg-[#F2F7FE] border border-slate-200 hover:border-[#CF63CF] flex flex-col items-center gap-1 text-slate-700 transition-all active:scale-95"
            title="Lebih Cepat"
          >
            <FastForward className="w-4 h-4 text-[#CF63CF]" />
            <span className="text-[9.5px] font-bold">Lebih Cepat</span>
          </button>

          <button
            onClick={() => handlePlayCurrentSound(0.7)}
            className="p-2 rounded-lg bg-slate-50 hover:bg-[#F2F7FE] border border-slate-200 hover:border-[#CF63CF] flex flex-col items-center gap-1 text-slate-700 transition-all active:scale-95"
            title="Lebih Lambat"
          >
            <Rewind className="w-4 h-4 text-[#CF63CF]" />
            <span className="text-[9.5px] font-bold">Lebih Lambat</span>
          </button>

          <button
            onClick={() => handlePlayCurrentSound(1.2)}
            className="p-2 rounded-lg bg-slate-50 hover:bg-[#F2F7FE] border border-slate-200 hover:border-[#CF63CF] flex flex-col items-center gap-1 text-slate-700 transition-all active:scale-95"
            title="Lebih Keras"
          >
            <Volume2 className="w-4 h-4 text-[#CF63CF]" />
            <span className="text-[9.5px] font-bold">Lebih Keras</span>
          </button>

          <button
            onClick={() => handlePlayCurrentSound(0.8)}
            className="p-2 rounded-lg bg-slate-50 hover:bg-[#F2F7FE] border border-slate-200 hover:border-[#CF63CF] flex flex-col items-center gap-1 text-slate-700 transition-all active:scale-95"
            title="Lebih Pelan"
          >
            <Volume2 className="w-4 h-4 text-slate-400" />
            <span className="text-[9.5px] font-bold">Lebih Pelan</span>
          </button>

          <button
            onClick={() => {}}
            className="p-2 rounded-lg bg-slate-50 hover:bg-[#F2F7FE] border border-slate-200 hover:border-[#CF63CF] flex flex-col items-center gap-1 text-slate-700 transition-all active:scale-95"
            title="Senyap"
          >
            <VolumeX className="w-4 h-4 text-slate-400" />
            <span className="text-[9.5px] font-bold">Senyap</span>
          </button>

          <button
            onClick={() => handlePlayCurrentSound(1.1)}
            className="p-2 rounded-lg bg-slate-50 hover:bg-[#F2F7FE] border border-slate-200 hover:border-[#CF63CF] flex flex-col items-center gap-1 text-slate-700 transition-all active:scale-95"
            title="Fade In"
          >
            <Sparkles className="w-4 h-4 text-[#CF63CF]" />
            <span className="text-[9.5px] font-bold">Fade In</span>
          </button>

          <button
            onClick={() => handlePlayCurrentSound(0.9)}
            className="p-2 rounded-lg bg-slate-50 hover:bg-[#F2F7FE] border border-slate-200 hover:border-[#CF63CF] flex flex-col items-center gap-1 text-slate-700 transition-all active:scale-95"
            title="Balik Suara"
          >
            <RotateCcw className="w-4 h-4 text-[#CF63CF]" />
            <span className="text-[9.5px] font-bold">Balik</span>
          </button>

          <button
            onClick={() => handlePlayCurrentSound(1.6)}
            className="p-2 rounded-lg bg-slate-50 hover:bg-[#F2F7FE] border border-slate-200 hover:border-[#CF63CF] flex flex-col items-center gap-1 text-slate-700 transition-all active:scale-95"
            title="Efek Robot"
          >
            <Cpu className="w-4 h-4 text-[#CF63CF]" />
            <span className="text-[9.5px] font-bold">Robot</span>
          </button>

        </div>

      </div>

    </div>
  );
};
