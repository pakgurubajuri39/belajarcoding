import React, { useState } from 'react';
import { ScratchBlockData, SCRATCH_CATEGORIES } from './scratchTypes';
import { Trash2, ZoomIn, ZoomOut, RotateCcw, ChevronUp, ChevronDown, Package } from 'lucide-react';

interface ScratchWorkspaceProps {
  scriptStack: ScratchBlockData[];
  setScriptStack: React.Dispatch<React.SetStateAction<ScratchBlockData[]>>;
  executingBlockId: string | null;
  onExecuteBlock: (block: ScratchBlockData) => void;
  onRemoveBlock: (id: string) => void;
  onClearScript: () => void;
  onUpdateBlockParam: (blockId: string, paramKey: string, value: string | number) => void;
  onDragStartFromWorkspace: (e: React.DragEvent, block: ScratchBlockData, index: number) => void;
  onDragOverWorkspace: (e: React.DragEvent, index?: number) => void;
  onDropOnWorkspace: (e: React.DragEvent, dropIndex?: number) => void;
  dragOverIndex: number | null;
}

export const ScratchWorkspace: React.FC<ScratchWorkspaceProps> = ({
  scriptStack,
  executingBlockId,
  onExecuteBlock,
  onRemoveBlock,
  onClearScript,
  onUpdateBlockParam,
  onDragStartFromWorkspace,
  onDragOverWorkspace,
  onDropOnWorkspace,
  dragOverIndex
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isBackpackOpen, setIsBackpackOpen] = useState(false);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(1.4, prev + 0.1));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(0.7, prev - 0.1));
  const handleZoomReset = () => setZoomLevel(1);

  // Render Scratch block template with inline editable inputs
  const renderWorkspaceBlockTemplate = (block: ScratchBlockData) => {
    const parts = block.template.split(/(\[[a-zA-Z0-9_]+\])/g);
    return (
      <span className="flex items-center flex-wrap gap-1 leading-tight text-xs font-bold">
        {parts.map((part, index) => {
          if (part.startsWith('[') && part.endsWith(']')) {
            const key = part.slice(1, -1);
            const val = block.params[key] !== undefined ? block.params[key] : '';
            return (
              <input
                key={index}
                type={typeof val === 'number' ? 'number' : 'text'}
                value={val}
                onChange={(e) => onUpdateBlockParam(block.id, key, typeof val === 'number' ? Number(e.target.value) : e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="bg-white text-slate-900 px-2 py-0.5 rounded-full text-xs font-bold shadow-inner border border-black/20 focus:outline-none focus:ring-2 focus:ring-amber-300 w-auto min-w-[36px] max-w-[120px] text-center"
              />
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div
      id="scratch-scripts-workspace"
      className="flex-1 flex flex-col relative overflow-hidden bg-[#F9F9F9] select-none h-full border-r border-[#D0E2FB]"
      style={{
        backgroundImage: 'radial-gradient(#D5DCE5 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
      onDragOver={(e) => onDragOverWorkspace(e)}
      onDrop={(e) => onDropOnWorkspace(e)}
    >
      {/* Workspace Top Toolbar */}
      <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 border-b border-slate-200 flex items-center justify-between text-xs z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Area Skrip ({scriptStack.length} balok)</span>
          <span className="text-[10px] text-slate-400">Klik balok untuk menguji eksekusi</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onClearScript}
            className="px-2 py-0.5 rounded text-[11px] font-bold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1"
            title="Bersihkan Semua Skrip"
          >
            <Trash2 className="w-3 h-3" />
            <span>Bersihkan</span>
          </button>
        </div>
      </div>

      {/* Main Draggable Blocks Area */}
      <div
        className="flex-1 p-6 overflow-auto custom-scrollbar flex flex-col items-start"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
      >
        <div className="flex flex-col items-start w-full max-w-xl space-y-1">
          {scriptStack.map((block, idx) => {
            const catMeta = SCRATCH_CATEGORIES.find(c => c.id === block.category) || SCRATCH_CATEGORIES[0];
            const isExecuting = executingBlockId === block.id;
            const isOverTarget = dragOverIndex === idx;

            return (
              <React.Fragment key={block.id}>
                {/* Drag Snap Indicator Line */}
                {isOverTarget && (
                  <div className="w-full h-1.5 bg-[#FFBF00] rounded-full my-1 shadow animate-pulse" />
                )}

                <div
                  draggable
                  onDragStart={(e) => onDragStartFromWorkspace(e, block, idx)}
                  onDragOver={(e) => {
                    e.stopPropagation();
                    onDragOverWorkspace(e, idx);
                  }}
                  onDrop={(e) => {
                    e.stopPropagation();
                    onDropOnWorkspace(e, idx);
                  }}
                  onClick={() => onExecuteBlock(block)}
                  style={{
                    backgroundColor: catMeta.color,
                    borderColor: isExecuting ? '#FFE54C' : 'rgba(0,0,0,0.15)',
                    boxShadow: isExecuting ? '0 0 0 3px #FFE54C, 0 4px 12px rgba(255, 229, 76, 0.4)' : '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  className={`relative px-3.5 py-2.5 rounded-lg text-white border cursor-grab active:cursor-grabbing hover:brightness-105 active:scale-[0.99] transition-all select-none group flex items-center justify-between gap-3 min-w-[260px] ${
                    isExecuting ? 'scale-[1.02]' : ''
                  }`}
                  title="Klik untuk menjalankan balok ini"
                >
                  {/* Top Notch Tab */}
                  {block.type !== 'hat' && (
                    <div
                      className="absolute -top-1.5 left-5 w-4 h-1.5 rounded-t-sm"
                      style={{ backgroundColor: catMeta.color }}
                    />
                  )}

                  {/* Hat Block Top Arched Cap */}
                  {block.type === 'hat' && (
                    <div
                      className="absolute -top-2.5 left-0 right-16 h-3 rounded-t-xl"
                      style={{ backgroundColor: catMeta.color }}
                    />
                  )}

                  {/* Block Content */}
                  <div className="flex-1 flex items-center gap-2">
                    {renderWorkspaceBlockTemplate(block)}
                  </div>

                  {/* Delete Button (visible on hover) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveBlock(block.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-black/20 text-white/80 hover:text-white transition-all text-xs"
                    title="Hapus balok ini"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Bottom Notch Socket */}
                  <div
                    className="absolute -bottom-1.5 left-5 w-4 h-1.5 rounded-b-sm border-b border-black/20"
                    style={{ backgroundColor: catMeta.color }}
                  />
                </div>
              </React.Fragment>
            );
          })}

          {scriptStack.length === 0 && (
            <div className="text-center py-16 w-full text-slate-400 text-xs font-semibold">
              Kanvas Skrip Kosong. Seret balok dari palet sebelah kiri ke sini!
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom-Right Zoom & View Controls */}
      <div className="absolute bottom-10 right-4 flex items-center gap-1 bg-white p-1 rounded-lg shadow-md border border-slate-200 z-20">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition-colors"
          title="Perbesar Kanvas (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition-colors"
          title="Perkecil Kanvas (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomReset}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition-colors"
          title="Atur Ulang Zoom (=)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Backpack (Ransel) Drawer Bar */}
      <div className="bg-[#E9F1FC] border-t border-[#D0E2FB] z-20">
        <button
          onClick={() => setIsBackpackOpen(!isBackpackOpen)}
          className="w-full px-3 py-1.5 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-[#DEEAFC] transition-colors"
        >
          <div className="flex items-center gap-2">
            <Package className="w-3.5 h-3.5 text-[#4C97FF]" />
            <span>Ransel (Backpack)</span>
          </div>
          {isBackpackOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        {isBackpackOpen && (
          <div className="p-3 bg-white border-t border-slate-200 text-xs text-slate-500 font-medium">
            Ransel kosong. Anda dapat menyeret balok atau kostum ke sini untuk disimpan dan digunakan di proyek lain.
          </div>
        )}
      </div>

    </div>
  );
};
