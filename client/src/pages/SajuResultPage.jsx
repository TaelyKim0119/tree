import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SajuChart from '../components/SajuChart';
import OhengChart from '../components/OhengChart';
import TabNavigation from '../components/TabNavigation';
import AnalysisSection from '../components/AnalysisSection';
import { bgImages, ohengImage } from '../utils/imageMap';

export default function SajuResultPage() {
  const location = useLocation();
  const data = location.state;
  const [activeTab, setActiveTab] = useState('원국분석');

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">결과 데이터가 없습니다.</p>
          <Link to="/saju" className="text-amber-400/60 hover:text-amber-400 transition">다시 입력하기</Link>
        </div>
      </div>
    );
  }

  const { manseryeok, analysis } = data;
  const yongsinText = { '목': '木 — 나무의 기운이 필요합니다', '화': '火 — 불의 기운이 필요합니다', '토': '土 — 흙의 기운이 필요합니다', '금': '金 — 쇠의 기운이 필요합니다', '수': '水 — 물의 기운이 필요합니다' };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-[680px] mx-auto">
        <div className="rounded-[2rem] overflow-hidden border border-white/5 bg-[#0c0a06]">
          <div className="relative overflow-hidden">
            <img src={bgImages.main} className="absolute inset-0 w-full h-full object-cover opacity-20" style={{ filter: 'blur(3px)' }} alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0c0a06]" />
            <div className="relative z-10 pt-10 pb-8 px-8">
              <Link to="/saju" className="text-amber-400/30 text-sm mb-6 block hover:text-amber-400/60 transition">‹ 다시 입력</Link>
              <p className="text-center text-[10px] tracking-[0.6em] text-amber-300/30 mb-8">사주팔자 · 四柱八字</p>
              <SajuChart manseryeok={manseryeok} />
              <div className="flex justify-center gap-2 flex-wrap mt-6">
                <span className="px-4 py-1.5 glass rounded-full text-amber-300/60 text-[11px] border border-white/5">{manseryeok.신강신약}</span>
                <span className="px-4 py-1.5 glass rounded-full text-blue-300/60 text-[11px] border border-blue-400/10">용신 {manseryeok.용신}</span>
              </div>
            </div>
          </div>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="p-6 sm:p-8">
            {activeTab === '원국분석' && (
              <div className="space-y-8">
                <OhengChart distribution={manseryeok.오행분포} />
                <div className="rounded-2xl overflow-hidden ring-1 ring-white/5">
                  <div className="relative h-36">
                    <img src={ohengImage[manseryeok.용신]} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                    <div className="absolute inset-0 flex items-center px-8">
                      <div>
                        <p className="text-[10px] tracking-[0.3em] text-blue-300/50 mb-1">용신 · 用神</p>
                        <h3 className="text-xl font-bold text-white">{yongsinText[manseryeok.용신]}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6">
              <AnalysisSection content={analysis} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
