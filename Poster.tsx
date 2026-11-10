import React from 'react';
import { LetterData } from '../types';

interface PosterProps {
  data: LetterData;
  posterRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  style?: React.CSSProperties;
}

export const Poster: React.FC<PosterProps> = ({
  data,
  posterRef,
  className = '',
  style = {},
}) => {
  // Format score helper (clean single % symbol)
  const formatScore = (val: number | string) => {
    if (val === '' || val === undefined || val === null) return '0%';
    const str = String(val).trim().replace(/%/g, '');
    return `${str}%`;
  };

  return (
    <div
      ref={posterRef}
      id="chromadiaries-poster"
      className={`bg-white text-[#23272a] relative select-none box-border ${className}`}
      style={{
        width: '2480px',
        height: '3508px',
        minWidth: '2480px',
        minHeight: '3508px',
        maxWidth: '2480px',
        maxHeight: '3508px',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {/* BACKGROUND WATERMARK (Tilted authentic ChromaDiaries nib watermark) */}
      <div
        className="absolute pointer-events-none select-none z-0"
        style={{
          left: '380px',
          top: '1150px',
          width: '1450px',
          height: '1450px',
          opacity: 0.038,
          transform: 'rotate(12deg)',
          backgroundImage: 'url(/pen_nib_icon.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      />

      {/* 1. TOP HEADER SECTION */}
      {/* 1a. Left Grey Block */}
      <div
        className="absolute top-[85px] left-0 h-[235px] w-[326px] bg-[#eaeded] z-10"
        style={{ width: '326px', height: '235px' }}
        aria-hidden="true"
      />

      {/* 1b. ChromaDiaries Logo Container (Explicit dimensions & object-contain) */}
      <div
        className="absolute top-[102px] left-[410px] z-10 flex items-center justify-center"
        style={{
          width: '760px',
          height: '200px',
        }}
      >
        <img
          src="/logo_master.png"
          alt="ChromaDiaries Web Magazine"
          className="w-full h-full object-contain block"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* 1c. Right Grey Block with Tagline */}
      <div
        className="absolute top-[85px] left-[1168px] right-0 h-[235px] bg-[#eaeded] flex items-center pl-[105px] pr-[60px] z-10"
        style={{ height: '235px' }}
      >
        <span className="font-poppins font-normal text-[37.5px] text-[#2d3035] tracking-tight">
          An English Web Magazine for Creative Minds Under 18
        </span>
      </div>

      {/* 2. REFERENCE & DATE ROW */}
      <div className="absolute top-[545px] left-[245px] right-[245px] flex justify-between items-center z-10">
        <div className="font-poppins italic text-[42px] text-[#2d3035]">
          Ref:
        </div>
        <div className="font-poppins text-[42px] text-[#2d3035]">
          <span className="italic">Date: </span>
          <span className="font-bold italic">{data.date || '05/04/2026'}</span>
        </div>
      </div>

      {/* 3. HEADING: AUTHOR SELECTION LETTER (Outfit Bold) */}
      <div className="absolute top-[785px] left-0 right-0 flex flex-col items-center z-10">
        <h1 className="font-outfit font-bold text-[72px] tracking-[0.05em] text-[#23272a] uppercase m-0 leading-none">
          AUTHOR SELECTION LETTER
        </h1>
        <div className="w-[1235px] h-[5px] bg-[#23272a] mt-[12px]" />
      </div>

      {/* 4. SALUTATION (Writer's Name) */}
      <div className="absolute top-[1075px] left-[245px] right-[245px] z-10">
        <div className="font-poppins font-semibold text-[46px] text-[#23272a]">
          Dear {data.writerName || 'Author'},
        </div>
      </div>

      {/* 5. GREETINGS & PARAGRAPH 1 (Story/Writing Title) */}
      <div className="absolute top-[1210px] left-[245px] right-[245px] z-10">
        <div className="font-poppins font-bold text-[43px] text-[#23272a] mb-[18px]">
          Greetings from ChromaDiaries!
        </div>
        <p className="font-poppins font-normal text-[41px] leading-[1.58] text-[#2d3035] m-0 max-w-[1990px]">
          We are happy to inform you that your writing, “
          <span className="font-bold text-[#23272a]">
            {data.writingTitle || 'Your Writing'}
          </span>
          ”, has been selected for publication on our official website. Congratulations on your achievement!
        </p>
      </div>

      {/* 6. WRITING ASSESSMENT BADGE */}
      <div
        className="absolute top-[1530px] left-[245px] z-10 bg-[#2e3035] text-white font-poppins font-medium text-[40px] px-[36px] py-[15px]"
        style={{ width: 'auto' }}
      >
        Writing Assessment
      </div>

      {/* 7. SCORE TABLE BOX (Left Column) */}
      <div
        className="absolute z-10 border-[2.5px] border-[#2e3035] bg-transparent flex flex-col justify-between"
        style={{
          top: '1720px',
          left: '245px',
          width: '1120px',
          height: '475px',
          padding: '42px 48px',
          boxSizing: 'border-box',
        }}
      >
        <div className="flex justify-between items-center font-poppins text-[41px] text-[#2d3035] leading-none">
          <span>Content &amp; Idea</span>
          <span className="font-medium">: {formatScore(data.contentScore)}</span>
        </div>
        <div className="flex justify-between items-center font-poppins text-[41px] text-[#2d3035] leading-none">
          <span>Expression</span>
          <span className="font-medium">: {formatScore(data.expressionScore)}</span>
        </div>
        <div className="flex justify-between items-center font-poppins text-[41px] text-[#2d3035] leading-none">
          <span>Language</span>
          <span className="font-medium">: {formatScore(data.languageScore)}</span>
        </div>
        <div className="flex justify-between items-center font-poppins text-[41px] text-[#2d3035] leading-none">
          <span>Structure &amp; Presentation</span>
          <span className="font-medium">: {formatScore(data.structureScore)}</span>
        </div>
        <div className="flex justify-between items-center font-poppins text-[41px] text-[#2d3035] leading-none">
          <span>Overall Editorial Assessment</span>
          <span className="font-medium">: {formatScore(data.overallScore)}</span>
        </div>
      </div>

      {/* 8. EDITOR REVIEW BOX (Right Column) */}
      <div
        className="absolute z-10 bg-[#eaeded] flex flex-col justify-start"
        style={{
          top: '1780px',
          left: '1500px',
          width: '708px',
          minHeight: '400px',
          padding: '48px 44px',
          boxSizing: 'border-box',
        }}
      >
        <div className="font-poppins font-bold text-[33px] text-[#23272a] mb-[16px] leading-none">
          Editor Review:
        </div>
        <div className="font-poppins font-normal text-[43px] leading-[1.36] text-[#23272a] whitespace-pre-wrap">
          {data.editorReview || 'No review provided.'}
        </div>
      </div>

      {/* 9. CONCLUDING PARAGRAPH */}
      <div className="absolute top-[2280px] left-[245px] right-[245px] z-10">
        <p className="font-poppins font-normal text-[41px] leading-[1.58] text-[#2d3035] m-0 max-w-[1990px]">
          These scores show the strengths and areas you can improve in your writing. Keep writing, keep learning, and keep sharing your ideas with us. We look forward to reading more of your writings!
        </p>
      </div>

      {/* 10. SIGNATURE SECTION (Full official signature block as provided by user) */}
      <div
        className="absolute flex flex-col items-center z-10 select-none pointer-events-none"
        style={{
          top: '2580px',
          left: '1635px',
          width: '490px',
        }}
      >
        <img
          src="/signature_hd_full.png"
          alt="Naseef Ugrapuram - General Manager Signature"
          className="w-full h-auto object-contain block"
          style={{
            width: '490px',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* 11. BOTTOM FOOTER SECTION (Full, uncut contact info & dark footer bar) */}
      <div className="absolute bottom-0 left-0 w-[2480px] h-[528px] z-10 pointer-events-none select-none">
        <img
          src="/footer_complete.png"
          alt="ChromaDiaries Footer"
          className="w-[2480px] h-[528px] object-fill block"
        />
      </div>
    </div>
  );
};
