import React from 'react';
import {
  ScratchCategory, ScratchBlockData,
  SCRATCH_CATEGORIES, SCRATCH_PALETTE_BLOCKS
} from './scratchTypes';
import { Plus, Layers } from 'lucide-react';

interface ScratchBlocksPaletteProps {
  activeCategory: ScratchCategory;
  setActiveCategory: (cat: ScratchCategory) => void;
  onAddBlock: (block: Omit<ScratchBlockData, 'id'>) => void;
  onDragStartFromPalette: (e: React.DragEvent, block: Omit<ScratchBlockData, 'id'>) => void;
  onOpenExtensionsModal: () => void;
  isCompact?: boolean;
}

export const ScratchBlocksPalette: React.FC<ScratchBlocksPaletteProps> = ({
  activeCategory,
  setActiveCategory,
  onAddBlock,
  onDragStartFromPalette,
  onOpenExtensionsModal,
  isCompact = false
}) => {
  const currentCategoryMeta = SCRATCH_CATEGORIES.find(c => c.id === activeCategory) || SCRATCH_CATEGORIES[0];
  const filteredBlocks = SCRATCH_PALETTE_BLOCKS.filter(b => b.category === activeCategory);

  // Render Scratch block template text and inputs
  const renderPaletteBlockTemplate = (template: string, params: Record<string, string | number>) => {
    const parts = template.split(/(\[[a-zA-Z0-9_]+\])/g);
    return (
      <span className={`flex items-center flex-wrap gap-1 leading-tight font-bold ${
        isCompact ? 'text-[10px]' : 'text-[11px]'
      }`}>
        {parts.map((part, index) => {
          if (part.startsWith('[') && part.endsWith(']')) {
            const key = part.slice(1, -1);
            const val = params[key] !== undefined ? params[key] : key;
            return (
              <span
                key={index}
                className={`bg-white text-slate-800 px-1.5 py-0.5 rounded-full font-bold shadow-inner border border-black/10 inline-flex items-center ${
                  isCompact ? 'text-[9.5px]' : 'text-[11px]'
                }`}
              >
                {String(val)}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div className={`flex-shrink-0 flex border-r border-[#D0E2FB] bg-white h-full select-none z-10 transition-all duration-200 ${
      isCompact ? 'w-[200px] sm:w-[220px]' : 'w-[260px] sm:w-[300px]'
    }`}>
      
      {/* 1. LEFT RAIL: 9 CATEGORY CIRCLES + EXTENSIONS BUTTON */}
      <div className={`flex-shrink-0 bg-[#F2F7FE] border-r border-[#D0E2FB] py-1.5 flex flex-col justify-between items-center h-full ${
        isCompact ? 'w-[46px]' : 'w-[56px]'
      }`}>
        
        {/* Top 9 Category Buttons */}
        <div className="flex flex-col items-center gap-1 w-full overflow-y-auto custom-scrollbar">
          {SCRATCH_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-lg flex flex-col items-center gap-0.5 transition-all ${
                  isCompact ? 'w-[40px] py-1' : 'w-[48px] py-1'
                } ${
                  isActive ? 'bg-[#D9E7FC] ring-1 ring-[#4C97FF]' : 'hover:bg-slate-200/60'
                }`}
                title={cat.name}
              >
                <div
                  className={`rounded-full shadow-sm flex-shrink-0 ${
                    isCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'
                  }`}
                  style={{ backgroundColor: cat.color }}
                />
                <span className={`leading-tight text-center truncate w-full px-0.5 font-bold ${
                  isCompact ? 'text-[7.5px]' : 'text-[8.5px]'
                } ${
                  isActive ? 'text-[#3373CC]' : 'text-slate-600'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom: Extension (+) Button (Authentic Scratch 3.0 Extension Button) */}
        <div className="pt-1.5 border-t border-[#D0E2FB] w-full px-1">
          <button
            onClick={onOpenExtensionsModal}
            className={`w-full rounded-lg bg-[#4C97FF] hover:bg-[#3373CC] text-white flex items-center justify-center shadow-md active:scale-95 transition-all group ${
              isCompact ? 'h-8' : 'h-9'
            }`}
            title="Tambahkan Ekstensi (Musik, Pena, Sensor Video, AI, dll)"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 group-hover:scale-110 transition-transform">
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </button>
        </div>

      </div>

      {/* 2. BLOCKS PALETTE LIST (LIGHT BACKGROUND) */}
      <div className="flex-1 p-2 overflow-y-auto custom-scrollbar bg-[#F9F9F9] flex flex-col gap-1.5 min-w-0">
        
        {/* Category Header */}
        <div className="pb-1 mb-0.5 border-b border-slate-200 flex items-center justify-between">
          <span className={`font-black uppercase tracking-wider text-slate-700 truncate ${
            isCompact ? 'text-[10px]' : 'text-[11px]'
          }`}>
            {currentCategoryMeta.name}
          </span>
          <span className="text-[8.5px] text-slate-400 font-semibold flex-shrink-0">Tarik ➔</span>
        </div>

        {/* Palette Blocks */}
        {filteredBlocks.map((blk, idx) => {
          return (
            <div
              key={idx}
              draggable
              onDragStart={(e) => onDragStartFromPalette(e, blk)}
              onClick={() => onAddBlock(blk)}
              style={{ backgroundColor: currentCategoryMeta.color }}
              className={`relative rounded-lg text-white shadow-sm cursor-grab active:cursor-grabbing hover:brightness-105 active:scale-[0.98] transition-all select-none border border-black/10 group ${
                isCompact ? 'p-2' : 'p-2.5'
              }`}
              title="Seret ke kanvas atau klik untuk menambahkan"
            >
              {/* Scratch Puzzle Notch Decoration */}
              {blk.type !== 'hat' && (
                <div
                  className="absolute -top-1 left-3.5 w-3 h-1.5 rounded-t-sm"
                  style={{ backgroundColor: currentCategoryMeta.color }}
                />
              )}

              {/* Block Content */}
              {renderPaletteBlockTemplate(blk.template, blk.params)}
            </div>
          );
        })}

        {filteredBlocks.length === 0 && (
          <div className="text-center py-6 text-xs text-slate-400 font-medium">
            Belum ada balok untuk kategori ini.
          </div>
        )}

      </div>

    </div>
  );
};
