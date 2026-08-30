import React from 'react';
import { EXTENSIONS_LIBRARY } from './scratchTypes';
import { X, ArrowLeft, Check } from 'lucide-react';

interface ScratchExtensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExtension: (extId: string) => void;
}

export const ScratchExtensionModal: React.FC<ScratchExtensionModalProps> = ({
  isOpen,
  onClose,
  onSelectExtension
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-[#4C97FF] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-black/15 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="font-black text-base">Pilih Ekstensi Scratch 3.0</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/15 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Extensions Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F2F7FE]">
          {EXTENSIONS_LIBRARY.map(ext => (
            <div
              key={ext.id}
              onClick={() => {
                onSelectExtension(ext.id);
                onClose();
              }}
              className="bg-white rounded-xl p-4 border border-[#D0E2FB] hover:border-[#4C97FF] hover:shadow-lg transition-all cursor-pointer flex gap-3.5 group active:scale-[0.98]"
            >
              <div className="w-14 h-14 rounded-xl bg-[#E9F1FC] text-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner flex-shrink-0">
                {ext.icon}
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-black text-sm text-slate-800 group-hover:text-[#4C97FF] transition-colors">
                  {ext.name}
                </span>
                <span className="text-xs text-slate-500 line-clamp-2 mt-0.5 font-medium">
                  {ext.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
