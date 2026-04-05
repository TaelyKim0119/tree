import { Link } from 'react-router-dom';
import { ohengImage, bgImages, cheonganImage } from '../utils/imageMap';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-[420px] md:max-w-[560px] lg:max-w-[700px] w-full rounded-[2rem] overflow-hidden relative" style={{ minHeight: '680px' }}>
        <img src={bgImages.main} className="absolute inset-0 w-full h-full object-cover opacity-40" style={{ filter: 'blur(1px)' }} alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 flex flex-col items-center pt-24 pb-16 px-8 md:px-16 lg:pt-32 lg:pb-20">
          <div className="flex gap-3 mb-14">
            {['목','화','토','금','수'].map(oh => (
              <div key={oh} className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-white/10 shadow-lg">
                <img src={ohengImage[oh]} className="w-full h-full object-cover" alt={oh} />
              </div>
            ))}
          </div>
          <p className="text-[10px] md:text-xs tracking-[0.7em] text-amber-200/30 mb-5">四 柱 命 理</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-3 tracking-widest gold-text">사주명리</h1>
          <p className="text-sm md:text-base text-white/25 mb-20 tracking-wider">오행의 기운으로 읽는 당신의 운명</p>
          <div className="w-full space-y-4">
            <Link to="/saju" className="hover-lift block rounded-2xl overflow-hidden relative group">
              <img src={bgImages.treeLone} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="glass relative z-10 p-6 flex items-center gap-5 border border-white/5 rounded-2xl">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden ring-1 ring-amber-400/20 shrink-0 shadow-xl">
                  <img src={cheonganImage['甲']} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white/90 mb-0.5">내 사주 보기</h3>
                  <p className="text-xs text-white/30">생년월일시 · 종합 사주팔자 분석</p>
                </div>
                <div className="ml-auto text-amber-400/20 text-3xl font-light group-hover:text-amber-400/50 transition-colors">›</div>
              </div>
            </Link>
            <Link to="/gunghap" className="hover-lift block rounded-2xl overflow-hidden relative group">
              <img src={bgImages.lake} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-all duration-700 group-hover:scale-110" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="glass relative z-10 p-6 flex items-center gap-5 border border-white/5 rounded-2xl">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden ring-1 ring-amber-400/20 shrink-0 shadow-xl">
                  <img src={bgImages.stonesColor} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white/90 mb-0.5">궁합 보기</h3>
                  <p className="text-xs text-white/30">두 사람의 사주 궁합 분석</p>
                </div>
                <div className="ml-auto text-amber-400/20 text-3xl font-light group-hover:text-amber-400/50 transition-colors">›</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
