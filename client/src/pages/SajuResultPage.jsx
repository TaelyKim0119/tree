import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SajuChart from '../components/SajuChart';
import OhengChart from '../components/OhengChart';
import { bgImages, ohengImage, cardImages } from '../utils/imageMap';
import penBook from '../assets/images/aaron-burden-CKlHKtCJZKk-unsplash.jpg';

const CARD_CONFIG = [
  { key: '만세력', title: '만세력 판독', subtitle: 'Birth Chart', markers: ['1. 만세력 판독 요약', '1.', '만세력 판독'] },
  { key: '원국', title: '원국 핵심', subtitle: 'Core Structure', markers: ['2. 원국 핵심 구조', '2.', '원국 핵심'] },
  { key: '나이별', title: '나이별 운세', subtitle: 'Life Timeline', markers: ['3. 평생 총운', '3.', '평생 총운'] },
  { key: '금전', title: '금전운', subtitle: 'Wealth', markers: ['4. 금전운', '4.', '금전운'] },
  { key: '직업', title: '직업운', subtitle: 'Career', markers: ['5. 직업운', '5.', '직업운'] },
  { key: '연애', title: '연애운', subtitle: 'Love', markers: ['6. 연애운', '6.', '연애운'] },
  { key: '결혼', title: '결혼운', subtitle: 'Marriage', markers: ['7. 결혼운', '7.', '결혼운'] },
];

function parseAnalysisSections(text) {
  if (!text) return {};
  const sections = {};
  const lines = text.split('\n');
  let currentKey = null;

  for (const line of lines) {
    const cleanLine = line.replace(/[#*]/g, '').trim();
    for (const card of CARD_CONFIG) {
      if (card.markers.some(m => cleanLine.startsWith(m))) {
        currentKey = card.key;
        sections[currentKey] = '';
        break;
      }
    }
    if (currentKey && sections[currentKey] !== undefined) {
      sections[currentKey] += line + '\n';
    }
  }

  if (Object.keys(sections).length === 0) {
    sections['만세력'] = text;
  }
  return sections;
}

function cleanText(text) {
  if (!text) return '';
  return text.replace(/\*\*/g, '').replace(/^#+\s*/gm, '').replace(/^[-*]\s*/gm, '• ').trim();
}

function CardModal({ card, content, onClose }) {
  const img = cardImages[card.key];
  const cleaned = cleanText(content);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* 배경 어둡게 */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* 모달 카드 */}
      <div
        className="relative w-full max-w-[500px] lg:max-w-[600px] max-h-[85vh] rounded-2xl overflow-hidden border-2 border-amber-400/30 shadow-[0_0_60px_rgba(196,168,98,0.15)] animate-[scaleIn_0.3s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        {/* 이미지 헤더 */}
        <div className="relative h-48 md:h-56 shrink-0">
          <img src={img} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0e0c08]" />

          {/* 프레임 */}
          <div className="absolute inset-3 border border-amber-400/20 rounded-xl" />

          {/* 닫기 버튼 */}
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition text-sm">✕</button>

          {/* 타이틀 */}
          <div className="absolute bottom-5 left-6 right-6">
            <p className="text-[10px] tracking-[0.4em] text-amber-300/50 mb-1">{card.subtitle}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{card.title}</h2>
          </div>
        </div>

        {/* 내용 스크롤 */}
        <div className="bg-[#0e0c08] overflow-y-auto" style={{ maxHeight: 'calc(85vh - 14rem)' }}>
          <div className="p-6 md:p-8">
            {cleaned ? (
              <div className="space-y-3">
                {cleaned.split('\n').filter(l => l.trim()).map((line, i) => {
                  if (line.startsWith('• ')) {
                    return (
                      <div key={i} className="flex gap-3 text-[15px] text-white/60 leading-[1.8]">
                        <span className="text-amber-400/40 shrink-0 mt-1">◆</span>
                        <span>{line.slice(2)}</span>
                      </div>
                    );
                  }
                  return <p key={i} className="text-[15px] text-white/60 leading-[1.8]">{line}</p>;
                })}
              </div>
            ) : (
              <p className="text-sm text-white/25">해당 분석 내용이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TarotCard({ card, onClick }) {
  const img = cardImages[card.key];

  return (
    <div className="cursor-pointer group" onClick={onClick}>
      <div className="w-full rounded-2xl overflow-hidden border-2 border-amber-400/20 shadow-2xl hover:shadow-[0_0_40px_rgba(196,168,98,0.1)] transition-all duration-500 hover:-translate-y-2" style={{ aspectRatio: '2/3' }}>
        <div className="relative w-full h-full">
          <img src={img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

          {/* 타로카드 프레임 */}
          <div className="absolute inset-3 md:inset-4 border border-amber-400/30 rounded-xl" />
          <div className="absolute inset-5 md:inset-6 border border-amber-400/15 rounded-lg" />

          {/* 상단 */}
          <div className="absolute top-4 md:top-6 inset-x-0 text-center">
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] text-amber-200/40">{card.subtitle}</p>
          </div>

          {/* 중앙 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 backdrop-blur-sm border border-amber-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <span className="text-amber-200/80 text-2xl md:text-3xl font-bold">{card.title.charAt(0)}</span>
            </div>
          </div>

          {/* 하단 */}
          <div className="absolute bottom-4 md:bottom-6 inset-x-0 text-center">
            <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">{card.title}</h3>
            <p className="text-[10px] text-amber-200/40 mt-1 tracking-wider">TAP TO REVEAL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionBox({ manseryeok }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState(false);

  const handleAsk = async () => {
    if (!question.trim() || asked) return;
    setLoading(true);
    try {
      const res = await fetch('/api/saju', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...manseryeok,
          추가질문: question,
          요청: '위 사주 데이터를 가진 사람에 대해 다음 질문에 답하라: ' + question + '. 300자 이내로 핵심만 답하라.',
        }),
      });
      const data = await res.json();
      setAnswer(data.analysis || '답변을 생성하지 못했습니다.');
      setAsked(true);
    } catch {
      setAnswer('답변 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 relative">
      <img src={penBook} className="absolute inset-0 w-full h-full object-cover opacity-25" alt="" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-lg">✍</div>
          <div>
            <h3 className="text-lg font-bold text-white/90">궁금한 것이 있나요?</h3>
            <p className="text-xs text-white/30">사주에 대해 한 가지 질문을 할 수 있습니다</p>
          </div>
        </div>
        <div className="flex gap-2">
          <input type="text" value={question} onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
            placeholder="예: 올해 이직하면 어떨까요?"
            disabled={asked}
            className="flex-1 py-3 px-4 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-amber-400/40 disabled:opacity-40" />
          <button onClick={handleAsk} disabled={loading || asked || !question.trim()}
            className="px-6 py-3 bg-amber-400/90 text-black rounded-xl font-semibold text-sm hover:bg-amber-400 transition disabled:opacity-30 shrink-0">
            {loading ? '...' : asked ? '완료' : '질문'}
          </button>
        </div>
        {answer && (
          <div className="mt-5 p-4 bg-white/[0.03] rounded-xl border border-amber-400/10">
            <p className="text-sm text-white/60 leading-relaxed">{cleanText(answer)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SajuResultPage() {
  const location = useLocation();
  const data = location.state;
  const [openCard, setOpenCard] = useState(null);

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
  const sections = parseAnalysisSections(analysis);
  const yongsinText = { '목': '木 — 나무의 기운', '화': '火 — 불의 기운', '토': '土 — 흙의 기운', '금': '金 — 쇠의 기운', '수': '水 — 물의 기운' };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-[680px] lg:max-w-[960px] mx-auto space-y-10">

        {/* 사주팔자 히어로 */}
        <div className="rounded-[2rem] overflow-hidden border border-white/5 bg-[#0c0a06]">
          <div className="relative overflow-hidden">
            <img src={bgImages.main} className="absolute inset-0 w-full h-full object-cover opacity-35" style={{ filter: 'blur(2px)' }} alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0c0a06]" />
            <div className="relative z-10 pt-10 pb-8 px-8">
              <Link to="/saju" className="text-amber-400/30 text-sm mb-6 block hover:text-amber-400/60 transition">‹ 다시 입력</Link>
              <p className="text-center text-[10px] tracking-[0.6em] text-amber-300/30 mb-8">사주팔자 · 四柱八字</p>
              <SajuChart manseryeok={manseryeok} />
              <div className="flex justify-center gap-2 flex-wrap mt-6">
                <span className="px-4 py-1.5 glass rounded-full text-amber-300/60 text-[11px] border border-white/5">{manseryeok.신강신약}</span>
                <span className="px-4 py-1.5 glass rounded-full text-blue-300/60 text-[11px] border border-blue-400/10">용신 {yongsinText[manseryeok.용신]}</span>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <OhengChart distribution={manseryeok.오행분포} />
          </div>
        </div>

        {/* 타로카드 그리드 */}
        <div>
          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[0.5em] text-amber-400/30 mb-2">FORTUNE CARDS</p>
            <h2 className="text-xl md:text-2xl font-bold text-white/80">당신의 운명 카드</h2>
            <p className="text-xs text-white/25 mt-2">카드를 터치하면 운명이 드러납니다</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {CARD_CONFIG.map((card) => (
              <TarotCard key={card.key} card={card} onClick={() => setOpenCard(card)} />
            ))}
          </div>
        </div>

        {/* 질문 박스 */}
        <QuestionBox manseryeok={manseryeok} />

        <div className="text-center pb-8">
          <Link to="/saju" className="text-amber-400/40 text-sm hover:text-amber-400/70 transition">← 다른 사주 보기</Link>
        </div>
      </div>

      {/* 카드 모달 */}
      {openCard && (
        <CardModal card={openCard} content={sections[openCard.key]} onClose={() => setOpenCard(null)} />
      )}

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
