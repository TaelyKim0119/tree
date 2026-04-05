import { Link } from 'react-router-dom';
import { ohengImage } from '../utils/imageMap';
import galaxy from '../assets/images/andy-holmes-rCbdp8VCYhQ-unsplash.jpg';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* 풀스크린 우주 배경 */}
      <img src={galaxy} className="absolute inset-0 w-full h-full object-cover" alt="" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="relative z-10 text-center px-6 max-w-[800px]">
        {/* 오행 아이콘 */}
        <div className="flex justify-center gap-3 md:gap-4 mb-12">
          {['목','화','토','금','수'].map((oh, i) => (
            <div key={oh} className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-1 ring-white/20 shadow-lg animate-pulse" style={{ animationDelay: `${i * 0.4}s`, animationDuration: '3s' }}>
              <img src={ohengImage[oh]} className="w-full h-full object-cover" alt={oh} />
            </div>
          ))}
        </div>

        {/* 타이틀 */}
        <p className="text-[11px] md:text-xs tracking-[0.8em] text-white/40 mb-4">四 柱 命 理</p>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-5 tracking-wider gold-text">사주명리</h1>
        <p className="text-base md:text-lg text-white/35 mb-20 tracking-widest">오행의 기운으로 읽는 당신의 운명</p>

        {/* CTA 버튼 */}
        <Link to="/saju"
          className="inline-block px-12 md:px-16 py-4 md:py-5 bg-gradient-to-r from-amber-500/90 via-amber-400/90 to-yellow-500/90 text-black rounded-full font-bold text-base md:text-lg tracking-[0.15em] shadow-[0_0_40px_rgba(196,168,98,0.3)] hover:shadow-[0_0_60px_rgba(196,168,98,0.5)] hover:scale-105 transition-all duration-500">
          내 사주 보기
        </Link>
        <p className="text-white/20 text-xs mt-5 tracking-wider">생년월일시로 종합 사주팔자 분석</p>
      </div>

      {/* 하단 장식 */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-white/10 text-[10px] tracking-[0.5em]">木 · 火 · 土 · 金 · 水</p>
      </div>
    </div>
  );
}
