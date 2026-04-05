import { Link } from 'react-router-dom';
import { ohengImage } from '../utils/imageMap';
import galaxy from '../assets/images/andy-holmes-rCbdp8VCYhQ-unsplash.jpg';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      <img src={galaxy} className="absolute inset-0 w-full h-full object-cover" alt="" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center px-6 max-w-[800px]">
        {/* 오행 */}
        <div className="flex justify-center gap-3 md:gap-4 mb-14">
          {['목','화','토','금','수'].map((oh, i) => (
            <div key={oh} className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-1 ring-white/20 shadow-lg animate-pulse" style={{ animationDelay: `${i * 0.4}s`, animationDuration: '3s' }}>
              <img src={ohengImage[oh]} className="w-full h-full object-cover" alt={oh} />
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
          className="inline-block px-14 md:px-20 py-4 md:py-5 bg-white text-black rounded-full font-bold text-sm md:text-base tracking-[0.1em] hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
          내 사주 보기
        </Link>
        <p className="text-white/30 text-xs md:text-sm mt-6 font-light">생년월일시로 종합 사주팔자 분석</p>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-white/15 text-[10px] tracking-[0.5em] font-light">木 · 火 · 土 · 金 · 水</p>
      </div>
    </div>
  );
}
