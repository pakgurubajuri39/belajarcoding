import React, { useState } from 'react';
import { SpriteState } from './scratchTypes';
import {
  Paintbrush, MousePointer, Eraser, PaintBucket, Type,
  Circle, Square, Slash, FlipHorizontal, FlipVertical, Plus,
  Layers, RotateCcw
} from 'lucide-react';

interface ScratchCostumesTabProps {
  selectedSprite: SpriteState;
  onUpdateSprite: (updates: Partial<SpriteState>) => void;
}

export const ScratchCostumesTab: React.FC<ScratchCostumesTabProps> = ({
  selectedSprite,
  onUpdateSprite
}) => {
  const [activeTool, setActiveTool] = useState<'brush' | 'select' | 'eraser' | 'bucket' | 'text' | 'circle' | 'rect' | 'line'>('brush');
  const [fillColor, setFillColor] = useState('#F59E0B');
  const [brushSize, setBrushSize] = useState(10);
  const [activeCostumeIndex, setActiveCostumeIndex] = useState(0);

  const costumes = [
    { name: `${selectedSprite.name} - Pose 1`, emoji: selectedSprite.emoji },
    { name: `${selectedSprite.name} - Pose 2 (Jalan)`, emoji: selectedSprite.emoji }
  ];

  return (
    <div className="flex-1 flex bg-[#F9F9F9] select-none h-full overflow-hidden">
      
      {/* 1. LEFT: COSTUMES LIST */}
      <div className="w-48 bg-[#F2F7FE] border-r border-[#D0E2FB] p-2 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-1.5 overflow-y-auto">
          <span className="text-[10px] font-black uppercase text-slate-500 px-1">Daftar Kostum</span>
          {costumes.map((c, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveCostumeIndex(idx);
                onUpdateSprite({ costumeIndex: idx });
              }}
              className={`p-2 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                activeCostumeIndex === idx
                  ? 'bg-white border-[#9966FF] shadow-sm ring-2 ring-[#9966FF]/30'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="w-10 h-10 rounded bg-white border border-slate-200 flex items-center justify-center text-xl shadow-inner">
                {c.emoji}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-slate-800 truncate">{c.name}</span>
                <span className="text-[9px] text-slate-400">Kostum {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Costume (+) Button */}
        <button
          onClick={() => {}}
          className="w-full py-2 bg-[#9966FF] hover:bg-[#854BE3] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-all"
          title="Tambah Kostum Baru"
        >
          <Plus className="w-4 h-4" />
          <span>Pilih Kostum</span>
        </button>
      </div>

      {/* 2. CENTER: VECTOR PAINT EDITOR */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* Paint Toolbar (Color, Thickness, Flip) */}
        <div className="bg-[#E9F1FC] p-2 border-b border-[#D0E2FB] flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Color & Brush Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-300">
              <span className="text-[10px] font-bold text-slate-600">Isi:</span>
              <input
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                className="w-6 h-5 cursor-pointer rounded border-0 bg-transparent"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border border-slate-300">
              <span className="text-[10px] font-bold text-slate-600">Ketebalan:</span>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-20 accent-[#9966FF]"
              />
              <span className="text-[10px] font-bold text-slate-700 w-4">{brushSize}</span>
            </div>
          </div>

          {/* Flip Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onUpdateSprite({ direction: (selectedSprite.direction + 180) % 360 })}
              className="p-1.5 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 flex items-center gap-1 text-[11px] font-bold"
              title="Balik Horizontal"
            >
              <FlipHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Balik Horizontal</span>
            </button>
            <button
              onClick={() => onUpdateSprite({ colorHue: (selectedSprite.colorHue + 45) % 360 })}
              className="p-1.5 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 flex items-center gap-1 text-[11px] font-bold"
              title="Ubah Warna Kostum"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Variasi Warna</span>
            </button>
          </div>
        </div>

        {/* Paint Canvas Workspace with Tools */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Vertical Paint Tools */}
          <div className="w-12 bg-[#F2F7FE] border-r border-[#D0E2FB] py-2 flex flex-col items-center gap-1">
            <button
              onClick={() => setActiveTool('select')}
              className={`p-2 rounded-lg transition-all ${activeTool === 'select' ? 'bg-[#9966FF] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
              title="Pilih (Select)"
            >
              <MousePointer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('brush')}
              className={`p-2 rounded-lg transition-all ${activeTool === 'brush' ? 'bg-[#9966FF] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
              title="Kuas Lukis (Brush)"
            >
              <Paintbrush className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('eraser')}
              className={`p-2 rounded-lg transition-all ${activeTool === 'eraser' ? 'bg-[#9966FF] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
              title="Penghapus (Eraser)"
            >
              <Eraser className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('bucket')}
              className={`p-2 rounded-lg transition-all ${activeTool === 'bucket' ? 'bg-[#9966FF] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
              title="Cat Isi (Fill Bucket)"
            >
              <PaintBucket className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('text')}
              className={`p-2 rounded-lg transition-all ${activeTool === 'text' ? 'bg-[#9966FF] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
              title="Teks"
            >
              <Type className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('circle')}
              className={`p-2 rounded-lg transition-all ${activeTool === 'circle' ? 'bg-[#9966FF] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
              title="Lingkaran"
            >
              <Circle className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('rect')}
              className={`p-2 rounded-lg transition-all ${activeTool === 'rect' ? 'bg-[#9966FF] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
              title="Kotak Persegi"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>

          {/* Center Paint Canvas Drawing Surface */}
          <div
            className="flex-1 flex items-center justify-center p-8 bg-[#F9F9F9] overflow-auto"
            style={{
              backgroundImage: 'radial-gradient(#E2E8F0 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px'
            }}
          >
            <div className="w-[360px] h-[280px] bg-white rounded-xl shadow-md border border-slate-300 flex flex-col items-center justify-center relative select-none">
              {/* Costume Sprite Mascot Preview */}
              <div
                className="text-8xl transition-transform duration-300"
                style={{
                  filter: `hue-rotate(${selectedSprite.colorHue}deg)`,
                  transform: `rotate(${selectedSprite.direction - 90}deg)`
                }}
              >
                {selectedSprite.emoji}
              </div>

              <div className="absolute bottom-3 text-center">
                <span className="text-xs font-bold text-slate-600 block">{costumes[activeCostumeIndex].name}</span>
                <span className="text-[10px] text-slate-400">Editor Vektor Scratch 3.0 Aktif</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
