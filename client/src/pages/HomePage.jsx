import { Link } from 'react-router-dom';
import { ohengImage } from '../utils/imageMap';
import galaxy from '../assets/images/andy-holmes-rCbdp8VCYhQ-unsplash.jpg';

const GLOW_COLORS = [
  'shadow-[0_0_15px_rgba(74,222,128,0.4),0_0_30px_rgba(74,222,128,0.2)]',
  'shadow-[0_0_15px_rgba(248,113,113,0.4),0_0_30px_rgba(248,113,113,0.2)]',
  'shadow-[0_0_15px_rgba(250,204,21,0.4),0_0_30px_rgba(250,204,21,0.2)]',
  'shadow-[0_0_15px_rgba(203,213,225,0.4),0_0_30px_rgba(203,213,225,0.2)]',
  'shadow-[0_0_15px_rgba(96,165,250,0.4),0_0_30px_rgba(96,165,250,0.2)]',
];

const RING_COLORS = [
  'ring-green-400/40',
  'ring-red-400/40',
  'ring-yellow-400/40',
  'ring-slate-300/40',
  'ring-blue-400/40',
];

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      <img src={galaxy} className="absolute inset-0 w-full h-full object-cover" alt="" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center px-6 max-w-[800px]">
        <div className="flex justify-center gap-4 md:gap-6 mb-14">
          {['목','화','토','금','수'].map((oh, i) => (
            <div key={oh} className="relative" style={{ animation: `starGlow 3s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ${RING_COLORS[i]} ${GLOW_COLORS[i]}`}>
                <img src={ohengImage[oh]} className="w-full h-full object-cover" alt={oh} />
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs md:text-sm tracking-[0.5em] text-white/50 mb-6 font-light">四柱命理</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-white tracking-tight leading-tight">
          사주명리
        </h1>
        <p className="text-base md:text-lg text-white/50 mb-20 font-light tracking-wide">
          오행의 기운으로 읽는 당신의 운명
        </p>

        <Link to="/saju"
          className="inline-block px-16 md:px-24 py-5 md:py-6 bg-white text-black rounded-full font-bold text-lg md:text-xl tracking-[0.1em] hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
          내 사주 보기
        </Link>
        <p className="text-white/30 text-xs md:text-sm mt-6 font-light">생년월일시로 종합 사주팔자 분석</p>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-white/15 text-[10px] tracking-[0.5em] font-light">木 · 火 · 土 · 金 · 水</p>
      </div>

      <style>{`
        @keyframes starGlow {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.15); filter: brightness(1.4); }
        }
      `}</style>
    </div>
  );
}
