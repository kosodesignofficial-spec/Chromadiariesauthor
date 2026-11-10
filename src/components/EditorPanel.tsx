import React from 'react';
import { LetterData, ORIGINAL_TEMPLATE_DATA } from '../types';
import {
  FileText,
  User,
  BookOpen,
  Award,
  MessageSquare,
  Download,
  RotateCcw,
  Sparkles,
  FileCheck,
  Percent,
  Calendar,
} from 'lucide-react';

interface EditorPanelProps {
  data: LetterData;
  onChange: (key: keyof LetterData, value: string | number) => void;
  onReset: () => void;
  onGenerate: () => void;
  onDownloadPng: () => void;
  onDownloadPdf: () => void;
  isGenerating: boolean;
  isDownloadingPng: boolean;
  isDownloadingPdf: boolean;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  data,
  onChange,
  onReset,
  onGenerate,
  onDownloadPng,
  onDownloadPdf,
  isGenerating,
  isDownloadingPng,
  isDownloadingPdf,
}) => {
  const handleScoreChange = (key: keyof LetterData, rawValue: string) => {
    // Strip non-digits
    const cleanNum = rawValue.replace(/[^0-9]/g, '');
    let num = cleanNum === '' ? '' : parseInt(cleanNum, 10);
    if (typeof num === 'number' && num > 100) num = 100;
    onChange(key, num);
  };

  const sampleReviews = [
    'Very strong with minor weaknesses',
    'Exceptional emotional resonance and mature poetic cadence.',
    'Captivating storyline with vivid prose; pacing in the second act could be slightly tightened.',
    'Brilliant perspective and nuanced character portrayal throughout.',
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 lg:p-7 flex flex-col gap-6">
      {/* Title & Badge */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-700" />
            Letter Details
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Update author details, assessment scores, and editor review below.
          </p>
        </div>
        <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md border border-gray-200">
          Template Mode
        </span>
      </div>

      {/* SECTION A: WRITER INFORMATION */}
      <div className="bg-[#f9fafb] p-4.5 rounded-xl border border-gray-200/70">
        <div className="flex items-center gap-2 mb-3.5">
          <div className="w-6 h-6 rounded-md bg-gray-800 text-white flex items-center justify-center text-xs font-semibold">
            A
          </div>
          <h3 className="text-sm font-semibold text-gray-900">
            Writer Information
          </h3>
        </div>

        <div className="space-y-3.5">
          {/* Issue Date */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                Issue Date
              </span>
              <button
                type="button"
                onClick={() => {
                  const now = new Date();
                  const dd = String(now.getDate()).padStart(2, '0');
                  const mm = String(now.getMonth() + 1).padStart(2, '0');
                  const yyyy = now.getFullYear();
                  onChange('date', `${dd}/${mm}/${yyyy}`);
                }}
                className="text-[10px] text-gray-500 hover:text-gray-900 underline cursor-pointer"
              >
                Set Today
              </button>
            </label>
            <input
              type="text"
              value={data.date || ''}
              onChange={(e) => onChange('date', e.target.value)}
              placeholder="e.g. 05/04/2026"
              className="w-full text-sm font-medium px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            />
          </div>

          {/* Writer Name */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gray-500" />
                Writer Name
              </span>
              <span className="text-[10px] text-gray-400">Salutation</span>
            </label>
            <input
              type="text"
              value={data.writerName}
              onChange={(e) => onChange('writerName', e.target.value)}
              placeholder="e.g. Tanishka Lalwani"
              className="w-full text-sm font-medium px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            />
          </div>

          {/* Writing Title */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-gray-500" />
                Story / Essay / Writing Title
              </span>
              <span className="text-[10px] text-gray-400">In Quotes</span>
            </label>
            <input
              type="text"
              value={data.writingTitle}
              onChange={(e) => onChange('writingTitle', e.target.value)}
              placeholder="e.g. That type of woman"
              className="w-full text-sm font-medium px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      {/* SECTION B: WRITING ASSESSMENT SCORES */}
      <div className="bg-[#f9fafb] p-4.5 rounded-xl border border-gray-200/70">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gray-800 text-white flex items-center justify-center text-xs font-semibold">
              B
            </div>
            <h3 className="text-sm font-semibold text-gray-900">
              Writing Assessment
            </h3>
          </div>
          <span className="text-[11px] text-gray-500 flex items-center gap-1">
            <Percent className="w-3 h-3 text-gray-400" />
            Percentage (%)
          </span>
        </div>

        <div className="space-y-3">
          {/* Content & Idea */}
          <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-gray-200">
            <span className="text-xs font-medium text-gray-800">
              Content &amp; Idea
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="100"
                value={data.contentScore}
                onChange={(e) => handleScoreChange('contentScore', e.target.value)}
                className="w-16 text-center text-xs font-bold px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
              <span className="text-xs font-semibold text-gray-500">%</span>
            </div>
          </div>

          {/* Expression */}
          <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-gray-200">
            <span className="text-xs font-medium text-gray-800">
              Expression
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="100"
                value={data.expressionScore}
                onChange={(e) => handleScoreChange('expressionScore', e.target.value)}
                className="w-16 text-center text-xs font-bold px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
              <span className="text-xs font-semibold text-gray-500">%</span>
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-gray-200">
            <span className="text-xs font-medium text-gray-800">
              Language
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="100"
                value={data.languageScore}
                onChange={(e) => handleScoreChange('languageScore', e.target.value)}
                className="w-16 text-center text-xs font-bold px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
              <span className="text-xs font-semibold text-gray-500">%</span>
            </div>
          </div>

          {/* Structure & Presentation */}
          <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-gray-200">
            <span className="text-xs font-medium text-gray-800">
              Structure &amp; Presentation
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="100"
                value={data.structureScore}
                onChange={(e) => handleScoreChange('structureScore', e.target.value)}
                className="w-16 text-center text-xs font-bold px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
              <span className="text-xs font-semibold text-gray-500">%</span>
            </div>
          </div>

          {/* Overall Editorial Assessment */}
          <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-gray-300 shadow-2xs">
            <span className="text-xs font-semibold text-gray-900 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Overall Editorial Assessment
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="100"
                value={data.overallScore}
                onChange={(e) => handleScoreChange('overallScore', e.target.value)}
                className="w-16 text-center text-xs font-bold px-2 py-1.5 bg-gray-50 border border-gray-800 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
              <span className="text-xs font-semibold text-gray-500">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION C: EDITOR REVIEW */}
      <div className="bg-[#f9fafb] p-4.5 rounded-xl border border-gray-200/70">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gray-800 text-white flex items-center justify-center text-xs font-semibold">
              C
            </div>
            <h3 className="text-sm font-semibold text-gray-900">
              Editor Review
            </h3>
          </div>
          <span className="text-[10px] text-gray-400">
            {data.editorReview.length} chars
          </span>
        </div>

        <textarea
          rows={3}
          value={data.editorReview}
          onChange={(e) => onChange('editorReview', e.target.value)}
          placeholder="e.g. Very strong with minor weaknesses"
          className="w-full text-sm font-medium p-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition resize-y"
        />

        {/* Quick Review Presets */}
        <div className="mt-2.5">
          <span className="text-[10px] font-medium text-gray-500 block mb-1.5">
            Quick standard phrases:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleReviews.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange('editorReview', sample)}
                className="text-[11px] text-gray-600 bg-white hover:bg-gray-100 hover:text-gray-900 px-2 py-1 rounded border border-gray-200 transition text-left cursor-pointer"
              >
                &ldquo;{sample}&rdquo;
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="pt-2 flex flex-col gap-3">
        {/* Generate Poster button */}
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full py-3 px-4 bg-[#1a1b1d] hover:bg-black text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow flex items-center justify-center gap-2 transition cursor-pointer active:scale-[0.99] disabled:opacity-70"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          {isGenerating ? 'Updating Poster...' : 'Generate Poster'}
        </button>

        {/* Download row: PNG & PDF */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onDownloadPng}
            disabled={isDownloadingPng}
            className="py-2.5 px-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-[0.99] disabled:opacity-60 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-gray-600" />
            {isDownloadingPng ? 'Exporting PNG...' : 'Download as PNG'}
          </button>

          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={isDownloadingPdf}
            className="py-2.5 px-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-[0.99] disabled:opacity-60 shadow-2xs"
          >
            <FileCheck className="w-3.5 h-3.5 text-gray-600" />
            {isDownloadingPdf ? 'Exporting PDF...' : 'Download as PDF'}
          </button>
        </div>

        {/* Reset to Original Template button */}
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.5 px-3 text-xs font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to Original Template
        </button>
      </div>

      {/* Fixed template notice */}
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200/60 text-[11px] text-gray-500 leading-relaxed">
        <strong className="font-semibold text-gray-700">Official Letterhead:</strong>{' '}
        Header branding, font choices (Outfit Bold &amp; Poppins), letterhead copy, manager signature, and contact information are strictly preserved according to the master template.
      </div>
    </div>
  );
};
