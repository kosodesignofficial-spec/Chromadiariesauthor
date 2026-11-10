import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { LetterData, ORIGINAL_TEMPLATE_DATA } from './types';
import { Poster } from './components/Poster';
import { EditorPanel } from './components/EditorPanel';
import { CompareModal } from './components/CompareModal';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  CheckCircle2,
  Sparkles,
  Download,
  FileCheck,
  RotateCcw,
  Layers,
  Info,
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<LetterData>(ORIGINAL_TEMPLATE_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Preview container & zoom state
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const hiddenExportRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number | 'fit'>('fit');
  const [containerWidth, setContainerWidth] = useState<number>(650);

  // Measure container width for responsive scaling
  useEffect(() => {
    const updateWidth = () => {
      if (previewContainerRef.current) {
        setContainerWidth(previewContainerRef.current.clientWidth - 48);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Compute scale based on 2480px width
  const fitScale = Math.max(0.18, Math.min(0.42, containerWidth / 2480));
  const currentScale =
    zoomLevel === 'fit' ? fitScale : zoomLevel;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3800);
  };

  const handleFieldChange = (key: keyof LetterData, value: string | number) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setData(ORIGINAL_TEMPLATE_DATA);
    showToast('Reset to original master template values.');
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast('Poster generated successfully! Ready for PNG or PDF download.');
      // On mobile, scroll preview into view
      if (window.innerWidth < 1024 && previewContainerRef.current) {
        previewContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  // Helper to ensure fonts and assets are ready before capture
  const waitForReady = async () => {
    if (document.fonts) {
      await document.fonts.ready;
    }
    // Small delay to allow layout painting
    await new Promise((r) => setTimeout(r, 150));
  };

  // High-Resolution PNG Export (Full 2480 x 3508 px at 300 DPI)
  const handleDownloadPng = async () => {
    try {
      setIsDownloadingPng(true);
      await waitForReady();

      const targetEl = hiddenExportRef.current || posterRef.current;
      if (!targetEl) throw new Error('Poster element not ready');

      // Capture at pristine 1:1 scale
      const dataUrl = await toPng(targetEl, {
        width: 2480,
        height: 3508,
        pixelRatio: 1,
        cacheBust: true,
        quality: 1.0,
      });

      const cleanName = (data.writerName || 'Author')
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `ChromaDiaries_Author_Selection_${cleanName}.png`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      showToast(`High-resolution PNG downloaded: ${filename}`);
    } catch (err) {
      console.error('Failed to export PNG:', err);
      showToast('Failed to generate PNG. Please try again.');
    } finally {
      setIsDownloadingPng(false);
    }
  };

  // Print-Ready A4 PDF Export (210mm x 297mm)
  const handleDownloadPdf = async () => {
    try {
      setIsDownloadingPdf(true);
      await waitForReady();

      const targetEl = hiddenExportRef.current || posterRef.current;
      if (!targetEl) throw new Error('Poster element not ready');

      const dataUrl = await toPng(targetEl, {
        width: 2480,
        height: 3508,
        pixelRatio: 1,
        cacheBust: true,
        quality: 1.0,
      });

      // A4 portrait dimensions in millimeters
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297, undefined, 'FAST');

      const cleanName = (data.writerName || 'Author')
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `ChromaDiaries_Author_Selection_${cleanName}.pdf`;

      pdf.save(filename);
      showToast(`Print-ready A4 PDF downloaded: ${filename}`);
    } catch (err) {
      console.error('Failed to export PDF:', err);
      showToast('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-gray-900 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1a1b1d] text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-xl border border-gray-700 flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP NAVBAR */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center p-1 shadow-xs">
              <img
                src="/pen_nib_icon.png"
                alt="ChromaDiaries"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-outfit font-bold text-lg sm:text-xl tracking-tight text-gray-900">
                  ChromaDiaries
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gray-100 text-gray-700 rounded border border-gray-200">
                  Author Letter Generator
                </span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                Exact template recreation for author selections &amp; writing assessments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsCompareOpen(true)}
              className="text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200/80 px-3 py-1.5 rounded-lg border border-gray-200 flex items-center gap-1.5 transition cursor-pointer"
              title="Compare with original template"
            >
              <Eye className="w-3.5 h-3.5 text-gray-600" />
              <span className="hidden sm:inline">Compare with Original</span>
              <span className="sm:hidden">Compare</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Editing Panel (5 cols on lg) */}
          <div className="lg:col-span-5 w-full">
            <EditorPanel
              data={data}
              onChange={handleFieldChange}
              onReset={handleReset}
              onGenerate={handleGenerate}
              onDownloadPng={handleDownloadPng}
              onDownloadPdf={handleDownloadPdf}
              isGenerating={isGenerating}
              isDownloadingPng={isDownloadingPng}
              isDownloadingPdf={isDownloadingPdf}
            />
          </div>

          {/* RIGHT COLUMN: Live Poster Preview (7 cols on lg) */}
          <div
            ref={previewContainerRef}
            className="lg:col-span-7 w-full flex flex-col gap-4"
          >
            {/* Preview Toolbar */}
            <div className="bg-white rounded-xl border border-gray-200 p-3 sm:px-4 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                </span>
                <span className="text-xs font-semibold text-gray-800">
                  Live Poster Preview
                </span>
                <span className="text-[10px] text-gray-400 border-l border-gray-200 pl-2 hidden sm:inline">
                  2480 × 3508 px (300 DPI A4)
                </span>
              </div>

              {/* Zoom & Quick Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setZoomLevel('fit')}
                  className={`text-[11px] font-medium px-2 py-1 rounded transition cursor-pointer ${
                    zoomLevel === 'fit'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Fit to screen width"
                >
                  Fit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setZoomLevel((prev) =>
                      prev === 'fit'
                        ? Math.max(0.2, fitScale - 0.05)
                        : Math.max(0.2, (prev as number) - 0.05)
                    )
                  }
                  className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-gray-500 w-11 text-center">
                  {Math.round(currentScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setZoomLevel((prev) =>
                      prev === 'fit'
                        ? Math.min(0.8, fitScale + 0.05)
                        : Math.min(0.8, (prev as number) + 0.05)
                    )
                  }
                  className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Poster Stage Viewport */}
            <div className="bg-gray-200/70 border border-gray-300 rounded-2xl p-4 sm:p-6 flex items-center justify-center min-h-[500px] overflow-auto shadow-inner">
              {/* Scaled Poster Wrapper */}
              <div
                style={{
                  width: `${2480 * currentScale}px`,
                  height: `${3508 * currentScale}px`,
                  position: 'relative',
                  transition: 'width 0.15s ease, height 0.15s ease',
                }}
                className="shadow-2xl rounded-sm overflow-hidden bg-white shrink-0"
              >
                <Poster
                  data={data}
                  posterRef={posterRef}
                  style={{
                    transform: `scale(${currentScale})`,
                    transformOrigin: 'top left',
                  }}
                />
              </div>
            </div>

            {/* Quick Export Footer Bar under Poster */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 px-2">
              <div className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-gray-400" />
                <span>Original layout: Outfit Bold &amp; Poppins fonts preserved.</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={isDownloadingPng}
                  className="text-xs font-medium text-gray-700 hover:text-gray-900 hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3 h-3" />
                  Save PNG
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf}
                  className="text-xs font-medium text-gray-700 hover:text-gray-900 hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <FileCheck className="w-3 h-3" />
                  Save PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* OFF-SCREEN PRISTINE 2480x3508 ELEMENT FOR CAPTURE (unscaled) */}
      <div
        style={{
          position: 'fixed',
          top: '-10000px',
          left: '-10000px',
          width: '2480px',
          height: '3508px',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: -1,
        }}
      >
        <Poster data={data} posterRef={hiddenExportRef} />
      </div>

      {/* COMPARISON MODAL */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        data={data}
      />
    </div>
  );
}
