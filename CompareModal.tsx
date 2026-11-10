import React, { useState } from 'react';
import { X, SlidersHorizontal, Columns, Eye } from 'lucide-react';
import { LetterData } from '../types';
import { Poster } from './Poster';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: LetterData;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [mode, setMode] = useState<'side-by-side' | 'slider' | 'opacity'>('side-by-side');
  const [sliderPos, setSliderPos] = useState(50);
  const [opacity, setOpacity] = useState(50);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/80">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-gray-700" />
              Compare with Original Reference Poster
            </h2>
            <p className="text-xs text-gray-500">
              Verify pixel-precision alignment against the uploaded ChromaDiaries master template.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-200/80 p-0.5 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setMode('side-by-side')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition cursor-pointer ${
                  mode === 'side-by-side'
                    ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                Side-by-Side
              </button>
              <button
                type="button"
                onClick={() => setMode('slider')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition cursor-pointer ${
                  mode === 'slider'
                    ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Split Slider
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/70 rounded-lg transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-100 flex items-center justify-center min-h-[500px]">
          {mode === 'side-by-side' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-start">
              {/* Original Master */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 px-2.5 py-1 bg-white rounded-md border border-gray-200 shadow-2xs">
                  Original Master Poster (Reference)
                </span>
                <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white max-w-[420px] w-full">
                  <img
                    src="/assets/aistudio/Letter_Pad_author_selection_a30c26af.png"
                    alt="Original Reference Poster"
                    className="w-full h-auto block"
                  />
                </div>
              </div>

              {/* Generated Poster */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2 px-2.5 py-1 bg-white rounded-md border border-gray-300 shadow-2xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Your Generated Poster
                </span>
                <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white max-w-[420px] w-full relative">
                  {/* Container scaled down to fit */}
                  <div
                    style={{
                      width: '420px',
                      height: `${420 * (3508 / 2480)}px`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Poster
                      data={data}
                      style={{
                        transform: `scale(${420 / 2480})`,
                        transformOrigin: 'top left',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === 'slider' && (
            <div className="flex flex-col items-center w-full max-w-xl">
              {/* Slider Controller */}
              <div className="w-full mb-4 flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-xs font-semibold text-gray-700 shrink-0">
                  Slide to Reveal:
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="flex-1 cursor-pointer accent-gray-900"
                />
                <span className="text-xs font-mono font-medium text-gray-500 w-10 text-right">
                  {sliderPos}%
                </span>
              </div>

              {/* Overlaid Viewer */}
              <div
                className="relative border border-gray-300 rounded-lg shadow-xl overflow-hidden bg-white"
                style={{
                  width: '440px',
                  height: `${440 * (3508 / 2480)}px`,
                }}
              >
                {/* Generated Poster (Bottom Layer) */}
                <div className="absolute inset-0">
                  <Poster
                    data={data}
                    style={{
                      transform: `scale(${440 / 2480})`,
                      transformOrigin: 'top left',
                    }}
                  />
                </div>

                {/* Original Reference Image (Top Layer, clipped by sliderPos) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-amber-500 shadow-lg"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src="/assets/aistudio/Letter_Pad_author_selection_a30c26af.png"
                    alt="Original"
                    className="absolute top-0 left-0 max-w-none"
                    style={{
                      width: '440px',
                      height: `${440 * (3508 / 2480)}px`,
                    }}
                  />
                </div>

                {/* Slider Handle Indicator */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-md pointer-events-none text-[10px] font-bold"
                  style={{ left: `${sliderPos}%` }}
                >
                  ↔
                </div>
              </div>
              <div className="flex justify-between w-[440px] mt-2 text-[11px] text-gray-500">
                <span>◀ Original Template ({sliderPos}%)</span>
                <span>Generated Poster ({100 - sliderPos}%) ▶</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-white flex justify-between items-center text-xs text-gray-500">
          <span>Both versions rendered at authentic 2480×3508 proportions.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
