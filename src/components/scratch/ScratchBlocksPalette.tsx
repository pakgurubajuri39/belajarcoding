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
}

export const ScratchBlocksPalette: React.FC<ScratchBlocksPaletteProps> = ({
  activeCategory,
  setActiveCategory,
  onAddBlock,
  onDragStartFromPalette,
  onOpenExtensionsModal
}) => {
  const currentCategoryMeta = SCRATCH_CATEGORIES.find(c => c.id === activeCategory) || SCRATCH_CATEGORIES[0];
  const filteredBlocks = SCRATCH_PALETTE_BLOCKS.filter(b => b.category === activeCategory);

  // Render Scratch block template text and inputs
  const renderPaletteBlockTemplate = (template: string, params: Record<string, string | number>) => {
    const parts = template.split(/(\[[a-zA-Z0-9_]+\])/g);
    return (
      <span className="flex items-center flex-wrap gap-1 leading-tight text-[11px] font-bold">
        {parts.map((part, index) => {
          if (part.startsWith('[') && part.endsWith(']')) {
            const key = part.slice(1, -1);
            const val = params[key] !== undefined ? params[key] : key;
            return (
              <span
                key={index}
                className="bg-white text-slate-800 px-2 py-0.5 rounded-full text-[11px] font-bold shadow-inner border border-black/10 inline-flex items-center"
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
    <div className="w-[320px] flex-shrink-0 flex border-r border-[#D0E2FB] bg-white h-full select-none z-10">
      
      {/* 1. LEFT RAIL: 9 CATEGORY CIRCLES + EXTENSIONS BUTTON */}
      <div className="w-[60px] flex-shrink-0 bg-[#F2F7FE] border-r border-[#D0E2FB] py-2 flex flex-col justify-between items-center h-full">
        
        {/* Top 9 Category Buttons */}
        <div className="flex flex-col items-center gap-1.5 w-full overflow-y-auto custom-scrollbar">
          {SCRATCH_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-[52px] py-1 rounded-lg flex flex-col items-center gap-0.5 transition-all ${
                  isActive ? 'bg-[#D9E7FC] ring-1 ring-[#4C97FF]' : 'hover:bg-slate-200/60'
                }`}
                title={cat.name}
              >
                <div
                  className="w-4 h-4 rounded-full shadow-sm flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className={`text-[8.5px] leading-tight text-center truncate w-full px-0.5 font-bold ${
                  isActive ? 'text-[#3373CC]' : 'text-slate-600'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom: Extension (+) Button (Authentic Scratch 3.0 Extension Button) */}
        <div className="pt-2 border-t border-[#D0E2FB] w-full px-1">
          <button
            onClick={onOpenExtensionsModal}
            className="w-full h-10 rounded-lg bg-[#4C97FF] hover:bg-[#3373CC] text-white flex items-center justify-center shadow-md active:scale-95 transition-all group"
            title="Tambahkan Ekstensi (Musik, Pena, Sensor Video, AI, dll)"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:scale-110 transition-transform">
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
          </button>
        </div>

      </div>

      {/* 2. BLOCKS PALETTE LIST (LIGHT BACKGROUND) */}
      <div className="flex-1 p-2.5 overflow-y-auto custom-scrollbar bg-[#F9F9F9] flex flex-col gap-2">
        
        {/* Category Header */}
        <div className="pb-1 mb-1 border-b border-slate-200 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
            {currentCategoryMeta.name}
          </span>
          <span className="text-[9px] text-slate-400 font-semibold">Tarik ke Kanvas ➔</span>
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
              className="relative p-2.5 rounded-lg text-white shadow-sm cursor-grab active:cursor-grabbing hover:brightness-105 active:scale-[0.98] transition-all select-none border border-black/10 group"
              title="Seret ke kanvas atau klik untuk menambahkan"
            >
              {/* Scratch Puzzle Notch Decoration */}
              {blk.type !== 'hat' && (
                <div
                  className="absolute -top-1 left-4 w-3.5 h-1.5 rounded-t-sm"
                  style={{ backgroundColor: currentCategoryMeta.color }}
                />
              )}

              {/* Block Content */}
              {renderPaletteBlockTemplate(blk.template, blk.params)}
            </div>
          );
        })}

        {filteredBlocks.length === 0 && (
          <div className="text-center py-8 text-xs text-slate-400 font-medium">
            Belum ada balok untuk kategori ini.
          </div>
        )}

      </div>

    </div>
  );
};
