import { useLocation, Link } from 'react-router-dom';
import AnalysisSection from '../components/AnalysisSection';

export default function GunghapResultPage() {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (<div className="min-h-screen flex items-center justify-center"><div className="text-center"><p className="text-white/40 mb-4">결과 데이터가 없습니다.</p><Link to="/gunghap" className="text-amber-400/60 hover:text-amber-400">다시 입력하기</Link></div></div>);
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-[680px] mx-auto">
        <div className="rounded-[2rem] overflow-hidden border border-white/5 bg-[#0c0a06] p-8">
          <Link to="/gunghap" className="text-amber-400/30 text-sm mb-6 block hover:text-amber-400/60 transition">‹ 다시 입력</Link>
          <h2 className="text-2xl font-bold text-center gold-text mb-8">궁합 분석 결과</h2>
          <AnalysisSection content={data.analysis} />
        </div>
      </div>
    </div>
  );
}
