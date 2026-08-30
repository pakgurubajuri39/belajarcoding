import React from 'react';
import { Play, Square, Code, Paintbrush, Volume2, Maximize2, Minimize2, Columns, LayoutGrid } from 'lucide-react';

interface ScratchTabsProps {
  activeTab: 'code' | 'costumes' | 'sounds';
  setActiveTab: (tab: 'code' | 'costumes' | 'sounds') => void;
  isRunning: boolean;
  onGreenFlag: () => void;
  onStopSign: () => void;
  stageLayout: 'standard' | 'small' | 'large';
  setStageLayout: (layout: 'standard' | 'small' | 'large') => void;
  isMaximized: boolean;
  setIsMaximized: (val: boolean) => void;
  isCompact?: boolean;
}

export const ScratchTabs: React.FC<ScratchTabsProps> = ({
  activeTab,
  setActiveTab,
  isRunning,
  onGreenFlag,
  onStopSign,
  stageLayout,
  setStageLayout,
  isMaximized,
  setIsMaximized,
  isCompact = false
}) => {
  return (
    <div className="bg-[#E9F1FC] border-b border-[#D0E2FB] px-1.5 sm:px-2 pt-1 flex items-end justify-between select-none">
      
      {/* LEFT: 3 AUTHENTIC TABS (Code, Costumes, Sounds) */}
      <div className="flex items-end gap-0.5 sm:gap-1 text-xs">
        
        {/* TAB 1: KODE (CODE) */}
        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 rounded-t-lg font-bold transition-all border-t border-x ${
            activeTab === 'code'
              ? 'bg-white text-[#4C97FF] border-[#D0E2FB] shadow-sm -mb-[1px] pb-2'
              : 'bg-[#DEEAFC] text-slate-600 hover:text-slate-900 border-transparent'
          }`}
        >
          <div className={`p-0.5 rounded ${activeTab === 'code' ? 'text-[#4C97FF]' : 'text-slate-500'}`}>
            <Code className="w-3.5 h-3.5" />
          </div>
          <span className={isCompact ? 'text-[11px]' : ''}>Kode</span>
        </button>

        {/* TAB 2: KOSTUM (COSTUMES) */}
        <button
          onClick={() => setActiveTab('costumes')}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 rounded-t-lg font-bold transition-all border-t border-x ${
            activeTab === 'costumes'
              ? 'bg-white text-[#9966FF] border-[#D0E2FB] shadow-sm -mb-[1px] pb-2'
              : 'bg-[#DEEAFC] text-slate-600 hover:text-slate-900 border-transparent'
          }`}
        >
          <div className={`p-0.5 rounded ${activeTab === 'costumes' ? 'text-[#9966FF]' : 'text-slate-500'}`}>
            <Paintbrush className="w-3.5 h-3.5" />
          </div>
          <span className={isCompact ? 'text-[11px]' : ''}>Kostum</span>
        </button>

        {/* TAB 3: SUARA (SOUNDS) */}
        <button
          onClick={() => setActiveTab('sounds')}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 rounded-t-lg font-bold transition-all border-t border-x ${
            activeTab === 'sounds'
              ? 'bg-white text-[#CF63CF] border-[#D0E2FB] shadow-sm -mb-[1px] pb-2'
              : 'bg-[#DEEAFC] text-slate-600 hover:text-slate-900 border-transparent'
          }`}
        >
          <div className={`p-0.5 rounded ${activeTab === 'sounds' ? 'text-[#CF63CF]' : 'text-slate-500'}`}>
            <Volume2 className="w-3.5 h-3.5" />
          </div>
          <span className={isCompact ? 'text-[11px]' : ''}>Suara</span>
        </button>

      </div>

      {/* RIGHT: STAGE CONTROLS (Green Flag, Stop, Stage Size) */}
      <div className="flex items-center gap-1 pb-1">
        
        {/* Green Flag Button */}
        <button
          onClick={onGreenFlag}
          disabled={isRunning}
          className={`p-1.5 rounded-md transition-all flex items-center justify-center cursor-pointer ${
            isRunning
              ? 'bg-emerald-100 ring-2 ring-emerald-500 text-emerald-600'
              : 'hover:bg-emerald-100/80 active:scale-95 text-[#45B854]'
          }`}
          title="Mulai Program (Bendera Hijau)"
        >
          <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
          </svg>
        </button>

        {/* Red Stop Sign (Octagon) */}
        <button
          onClick={onStopSign}
          className="p-1.5 rounded-md hover:bg-rose-100/80 active:scale-95 text-[#FF4D4D] transition-all flex items-center justify-center cursor-pointer"
          title="Hentikan Semua Program"
        >
          <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
            <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z" />
          </svg>
        </button>

        <div className="h-4 w-px bg-slate-300 mx-0.5 sm:mx-1" />

        {/* Stage Layout Size Toggle Buttons */}
        <button
          onClick={() => setStageLayout('small')}
          className={`p-1 rounded text-xs transition-colors cursor-pointer ${
            stageLayout === 'small' ? 'bg-white shadow-sm text-[#4C97FF] ring-1 ring-[#4C97FF]/40 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
          title="Panggung Kompak / Kecil (Lebih banyak ruang coding skrip)"
        >
          <Columns className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setStageLayout('standard')}
          className={`p-1 rounded text-xs transition-colors cursor-pointer ${
            stageLayout === 'standard' ? 'bg-white shadow-sm text-[#4C97FF] ring-1 ring-[#4C97FF]/40 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
          title="Panggung Standar"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsMaximized(!isMaximized)}
          className={`p-1 rounded text-xs transition-colors cursor-pointer ${
            isMaximized ? 'bg-white shadow-sm text-[#4C97FF] ring-1 ring-[#4C97FF]/40 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
          title={isMaximized ? 'Keluar Layar Penuh' : 'Layar Penuh Studio'}
        >
          {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>

      </div>

    </div>
  );
};
