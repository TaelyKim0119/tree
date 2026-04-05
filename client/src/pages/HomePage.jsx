import { Link } from 'react-router-dom';
import { ohengImage, bgImages, cheonganImage } from '../utils/imageMap';
import galaxy from '../assets/images/andy-holmes-rCbdp8VCYhQ-unsplash.jpg';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="max-w-[500px] md:max-w-[700px] lg:max-w-[900px] w-full rounded-[2rem] overflow-hidden relative" style={{ minHeight: '600px' }}>
        <img src={galaxy} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 flex flex-col items-center pt-20 pb-16 px-8 md:px-16 lg:pt-28 lg:pb-24">
          <div className="flex gap-4 mb-14">
            {['목','화','토','금','수'].map(oh => (
              <div key={oh} className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-1 ring-white/10 shadow-lg">
                <img src={ohengImage[oh]} className="w-full h-full object-cover" alt={oh} />
              </div>
            ))}
          </div>
          <p className="text-[10px] md:text-xs tracking-[0.7em] text-amber-200/30 mb-5">四 柱 命 理</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-widest gold-text">사주명리</h1>
          <p className="text-sm md:text-base lg:text-lg text-white/25 mb-16 tracking-wider">오행의 기운으로 읽는 당신의 운명</p>

          <Link to="/saju" className="hover-lift block rounded-2xl overflow-hidden relative group w-full max-w-[600px]">
            <img src={bgImages.treeLone} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110" alt="" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="glass relative z-10 p-6 md:p-8 flex items-center gap-5 md:gap-6 border border-white/5 rounded-2xl">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden ring-1 ring-amber-400/20 shrink-0 shadow-xl">
                <img src={cheonganImage['甲']} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white/90 mb-1">내 사주 보기</h3>
                <p className="text-xs md:text-sm text-white/30">생년월일시 · 종합 사주팔자 분석</p>
              </div>
              <div className="ml-auto text-amber-400/20 text-3xl font-light group-hover:text-amber-400/50 transition-colors">›</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
