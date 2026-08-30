import React, { useState } from 'react';
import { SpriteState, BACKDROP_OPTIONS } from './scratchTypes';
import { Eye, EyeOff, Trash2, Plus, Image as ImageIcon, Compass, Sparkles, Upload, Paintbrush, Search } from 'lucide-react';

interface ScratchSpritePaneProps {
  sprites: SpriteState[];
  selectedSpriteId: string;
  onSelectSprite: (id: string) => void;
  onUpdateSprite: (updates: Partial<SpriteState>) => void;
  onAddSprite: (type: 'cat' | 'robot' | 'rocket' | 'dino' | 'star') => void;
  onRemoveSprite: (id: string) => void;
  selectedBackdrop: string;
  onSelectBackdrop: (backdropId: string) => void;
}

export const ScratchSpritePane: React.FC<ScratchSpritePaneProps> = ({
  sprites,
  selectedSpriteId,
  onSelectSprite,
  onUpdateSprite,
  onAddSprite,
  onRemoveSprite,
  selectedBackdrop,
  onSelectBackdrop
}) => {
  const [showSpritePickerMenu, setShowSpritePickerMenu] = useState(false);
  const [showBackdropPickerMenu, setShowBackdropPickerMenu] = useState(false);
  const [showDirectionDial, setShowDirectionDial] = useState(false);

  const currentSprite = sprites.find(s => s.id === selectedSpriteId) || sprites[0];

  return (
    <div className="flex flex-col bg-[#F2F7FE] border-t border-[#D0E2FB] select-none text-xs">
      
      {/* 1. SPRITE INSPECTOR PROPERTIES BAR (EXACT SCRATCH 3.0) */}
      <div className="bg-[#E9F1FC] p-2 border-b border-[#D0E2FB] grid grid-cols-2 sm:grid-cols-6 gap-2 items-center">
        
        {/* Sprite Name */}
        <div className="flex items-center gap-1.5 col-span-2 sm:col-span-2 bg-white px-2 py-1 rounded-md border border-slate-300">
          <span className="text-[10px] font-bold text-slate-500">Sprite</span>
          <input
            type="text"
            value={currentSprite?.name || ''}
            onChange={(e) => onUpdateSprite({ name: e.target.value })}
            className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none w-full truncate"
          />
        </div>

        {/* X Coordinate */}
        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-300">
          <span className="text-[10px] font-bold text-slate-500">x</span>
          <input
            type="number"
            value={currentSprite?.x ?? 0}
            onChange={(e) => onUpdateSprite({ x: Number(e.target.value) })}
            className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none w-full text-center"
          />
        </div>

        {/* Y Coordinate */}
        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-300">
          <span className="text-[10px] font-bold text-slate-500">y</span>
          <input
            type="number"
            value={currentSprite?.y ?? 0}
            onChange={(e) => onUpdateSprite({ y: Number(e.target.value) })}
            className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none w-full text-center"
          />
        </div>

        {/* Visibility Buttons (Show / Hide) */}
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-md border border-slate-300">
          <button
            onClick={() => onUpdateSprite({ visible: true })}
            className={`flex-1 py-1 rounded flex items-center justify-center transition-colors ${
              currentSprite?.visible ? 'bg-[#4C97FF] text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
            title="Tampilkan Karakter"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onUpdateSprite({ visible: false })}
            className={`flex-1 py-1 rounded flex items-center justify-center transition-colors ${
              !currentSprite?.visible ? 'bg-[#4C97FF] text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
            title="Sembunyikan Karakter"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Size & Direction */}
        <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
          {/* Size */}
          <div className="flex-1 flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-300">
            <span className="text-[10px] font-bold text-slate-500">Ukuran</span>
            <input
              type="number"
              value={currentSprite?.size ?? 100}
              onChange={(e) => onUpdateSprite({ size: Math.max(10, Math.min(300, Number(e.target.value))) })}
              className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none w-full text-center"
            />
          </div>

          {/* Direction with Compass Popup */}
          <div className="relative flex-1">
            <button
              onClick={() => setShowDirectionDial(!showDirectionDial)}
              className="w-full flex items-center justify-between gap-1 bg-white px-2 py-1 rounded-md border border-slate-300 hover:border-[#4C97FF] text-slate-800 font-bold"
              title="Arah Hadap Sprite (°)"
            >
              <span className="text-[10px] text-slate-500">Arah</span>
              <span>{currentSprite?.direction ?? 90}°</span>
            </button>

            {showDirectionDial && (
              <div className="absolute bottom-full right-0 mb-1 bg-white rounded-xl shadow-xl border border-slate-300 p-3 z-50 w-44 flex flex-col items-center gap-2">
                <span className="text-[11px] font-bold text-slate-700">Arah (0°..360°)</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={currentSprite?.direction ?? 90}
                  onChange={(e) => onUpdateSprite({ direction: Number(e.target.value) })}
                  className="w-full accent-[#4C97FF]"
                />
                <div className="flex gap-1">
                  <button
                    onClick={() => { onUpdateSprite({ direction: 90 }); setShowDirectionDial(false); }}
                    className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold hover:bg-slate-200"
                  >
                    90° (Kanan)
                  </button>
                  <button
                    onClick={() => { onUpdateSprite({ direction: -90 }); setShowDirectionDial(false); }}
                    className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold hover:bg-slate-200"
                  >
                    -90° (Kiri)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 2. SPRITES GRID & STAGE BACKDROPS SELECTION (BOTTOM AREA) */}
      <div className="p-2 flex gap-2 h-36">
        
        {/* LEFT: SPRITES LIST PANE */}
        <div className="flex-1 bg-white rounded-lg border border-[#D0E2FB] p-2 flex flex-col justify-between relative overflow-hidden">
          
          {/* Sprites Thumbnails Grid */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
            {sprites.map(s => {
              const isSelected = s.id === selectedSpriteId;
              return (
                <div
                  key={s.id}
                  onClick={() => onSelectSprite(s.id)}
                  className={`relative flex-shrink-0 w-16 h-20 rounded-lg border flex flex-col items-center justify-between p-1.5 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#E9F1FC] border-[#4C97FF] shadow-sm ring-2 ring-[#4C97FF]/30'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {/* Sprite Mascot Emoji/Icon */}
                  <span className="text-2xl mt-1">{s.emoji}</span>

                  {/* Sprite Name */}
                  <span className="text-[9px] font-bold text-slate-700 truncate w-full text-center">
                    {s.name}
                  </span>

                  {/* Delete Sprite Button */}
                  {sprites.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveSprite(s.id);
                      }}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-rose-600 shadow transition-opacity"
                      title="Hapus Sprite"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floating Blue Button: Choose a Sprite (Pilih Sprite) */}
          <div className="relative self-end">
            <button
              onClick={() => setShowSpritePickerMenu(!showSpritePickerMenu)}
              className="w-9 h-9 rounded-full bg-[#4C97FF] hover:bg-[#3373CC] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
              title="Pilih Karakter Sprite Baru"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>

            {showSpritePickerMenu && (
              <div
                className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 w-48 z-50 flex flex-col text-xs font-semibold"
                onMouseLeave={() => setShowSpritePickerMenu(false)}
              >
                <button
                  onClick={() => { onAddSprite('cat'); setShowSpritePickerMenu(false); }}
                  className="px-3 py-1.5 text-left hover:bg-blue-50 text-slate-700 flex items-center gap-2"
                >
                  <span>🐱</span>
                  <span>Kucing Scratch Baru</span>
                </button>
                <button
                  onClick={() => { onAddSprite('robot'); setShowSpritePickerMenu(false); }}
                  className="px-3 py-1.5 text-left hover:bg-blue-50 text-slate-700 flex items-center gap-2"
                >
                  <span>🤖</span>
                  <span>Robot Astro</span>
                </button>
                <button
                  onClick={() => { onAddSprite('rocket'); setShowSpritePickerMenu(false); }}
                  className="px-3 py-1.5 text-left hover:bg-blue-50 text-slate-700 flex items-center gap-2"
                >
                  <span>🚀</span>
                  <span>Roket Angkasa</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT: STAGE / BACKDROP TILE PANE */}
        <div className="w-28 bg-white rounded-lg border border-[#D0E2FB] p-2 flex flex-col justify-between items-center relative flex-shrink-0">
          
          <div className="w-full flex flex-col items-center gap-1">
            <span className="text-[10px] font-black text-slate-600">Panggung</span>
            <div className="w-14 h-11 rounded border border-slate-300 bg-slate-100 flex items-center justify-center text-xl shadow-inner">
              {BACKDROP_OPTIONS.find(b => b.id === selectedBackdrop)?.emoji || '📐'}
            </div>
            <span className="text-[9px] font-bold text-slate-500 truncate w-full text-center">
              {BACKDROP_OPTIONS.find(b => b.id === selectedBackdrop)?.name || 'Grid'}
            </span>
          </div>

          {/* Floating Blue Button: Choose a Backdrop (Pilih Latar) */}
          <div className="relative w-full flex justify-center">
            <button
              onClick={() => setShowBackdropPickerMenu(!showBackdropPickerMenu)}
              className="w-8 h-8 rounded-full bg-[#4C97FF] hover:bg-[#3373CC] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
              title="Ganti Latar Panggung (Backdrop)"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            {showBackdropPickerMenu && (
              <div
                className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 w-48 z-50 flex flex-col text-xs font-semibold"
                onMouseLeave={() => setShowBackdropPickerMenu(false)}
              >
                {BACKDROP_OPTIONS.map(b => (
                  <button
                    key={b.id}
                    onClick={() => { onSelectBackdrop(b.id); setShowBackdropPickerMenu(false); }}
                    className={`px-3 py-1.5 text-left hover:bg-blue-50 flex items-center gap-2 ${
                      selectedBackdrop === b.id ? 'text-[#4C97FF] font-bold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{b.emoji}</span>
                    <span>{b.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
