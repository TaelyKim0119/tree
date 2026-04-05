import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SajuChart from '../components/SajuChart';
import OhengChart from '../components/OhengChart';
import { bgImages, ohengImage } from '../utils/imageMap';
import penBook from '../assets/images/aaron-burden-CKlHKtCJZKk-unsplash.jpg';

const CARD_CONFIG = [
  { key: '만세력', title: '만세력 판독', icon: '☰', color: 'from-amber-900/40 to-amber-950/60', markers: ['1. 만세력 판독 요약', '1.', '만세력 판독'] },
  { key: '원국', title: '원국 핵심', icon: '☯', color: 'from-purple-900/40 to-purple-950/60', markers: ['2. 원국 핵심 구조', '2.', '원국 핵심'] },
  { key: '나이별', title: '나이별 운세', icon: '⏳', color: 'from-cyan-900/40 to-cyan-950/60', markers: ['3. 평생 총운', '3.', '평생 총운'] },
  { key: '금전', title: '금전운', icon: '💰', color: 'from-yellow-900/40 to-yellow-950/60', markers: ['4. 금전운', '4.', '금전운'] },
  { key: '직업', title: '직업운', icon: '💼', color: 'from-blue-900/40 to-blue-950/60', markers: ['5. 직업운', '5.', '직업운'] },
  { key: '연애', title: '연애운', icon: '💕', color: 'from-pink-900/40 to-pink-950/60', markers: ['6. 연애운', '6.', '연애운'] },
  { key: '결혼', title: '결혼운', icon: '💍', color: 'from-rose-900/40 to-rose-950/60', markers: ['7. 결혼운', '7.', '결혼운'] },
];

function parseAnalysisSections(text) {
  if (!text) return {};
  const sections = {};
  const lines = text.split('\n');
  let currentKey = null;

  for (const line of lines) {
    const lowerLine = line.replace(/[#*]/g, '').trim();
    for (const card of CARD_CONFIG) {
      if (card.markers.some(m => lowerLine.startsWith(m))) {
        currentKey = card.key;
        sections[currentKey] = '';
        break;
      }
    }
    if (currentKey && sections[currentKey] !== undefined) {
      sections[currentKey] += line + '\n';
    }
  }

  // 파싱 실패 시 전체 텍스트를 만세력에 넣기
  if (Object.keys(sections).length === 0) {
    sections['만세력'] = text;
  }

  return sections;
}

function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '')
    .replace(/^#+\s*/gm, '')
    .replace(/^[-*]\s*/gm, '• ')
    .trim();
}

function FlipCard({ card, content, index }) {
  const [flipped, setFlipped] = useState(false);
  const cleaned = cleanText(content);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: flipped ? 'auto' : '200px',
          height: flipped ? 'auto' : '200px',
        }}
      >
        {/* 앞면 */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} border border-white/10 flex flex-col items-center justify-center gap-4 p-6`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-4xl md:text-5xl">{card.icon}</div>
          <h3 className="text-lg md:text-xl font-bold text-white/90">{card.title}</h3>
          <p className="text-xs text-white/30">카드를 클릭하여 내용을 확인하세요</p>
        </div>

        {/* 뒷면 */}
        <div
          className={`rounded-2xl bg-gradient-to-br ${card.color} border border-white/10 p-6 md:p-8`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            minHeight: '200px',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">{card.icon}</span>
            <h3 className="text-lg font-bold text-white/90">{card.title}</h3>
          </div>
          {cleaned ? (
            <div className="space-y-2">
              {cleaned.split('\n').filter(l => l.trim()).map((line, i) => {
                if (line.startsWith('• ')) {
                  return (
                    <div key={i} className="flex gap-2 text-sm text-white/60 leading-relaxed">
                      <span className="text-amber-400/50 shrink-0 mt-0.5">◆</span>
                      <span>{line.slice(2)}</span>
                    </div>
                  );
                }
                return <p key={i} className="text-sm text-white/60 leading-relaxed">{line}</p>;
              })}
            </div>
          ) : (
            <p className="text-sm text-white/30">해당 분석 내용이 없습니다.</p>
          )}
          <p className="text-xs text-white/20 mt-4 text-center">카드를 클릭하여 닫기</p>
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
      <img src={penBook} className="absolute inset-0 w-full h-full object-cover opacity-10" alt="" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">✍️</span>
          <h3 className="text-lg font-bold text-white/90">궁금한 것이 있나요?</h3>
        </div>
        <p className="text-sm text-white/40 mb-4">사주에 대해 한 가지 질문을 할 수 있습니다.</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
            placeholder="예: 올해 이직하면 어떨까요?"
            disabled={asked}
            className="flex-1 py-3 px-4 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-amber-400/40 disabled:opacity-40"
          />
          <button
            onClick={handleAsk}
            disabled={loading || asked || !question.trim()}
            className="px-6 py-3 bg-amber-400/90 text-black rounded-xl font-semibold text-sm hover:bg-amber-400 transition disabled:opacity-30 shrink-0"
          >
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
      <div className="max-w-[680px] lg:max-w-[900px] mx-auto space-y-8">

        {/* 사주팔자 히어로 */}
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
                <span className="px-4 py-1.5 glass rounded-full text-blue-300/60 text-[11px] border border-blue-400/10">용신 {yongsinText[manseryeok.용신]}</span>
              </div>
            </div>
          </div>

          {/* 오행 분포 */}
          <div className="p-6 md:p-8">
            <OhengChart distribution={manseryeok.오행분포} />
          </div>
        </div>

        {/* 카드 그리드 */}
        <div>
          <p className="text-center text-xs text-white/30 mb-6 tracking-wider">카드를 클릭하면 상세 분석이 나타납니다</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CARD_CONFIG.map((card, i) => (
              <FlipCard key={card.key} card={card} content={sections[card.key]} index={i} />
            ))}
          </div>
        </div>

        {/* 질문 박스 */}
        <QuestionBox manseryeok={manseryeok} />

        {/* 다시 보기 */}
        <div className="text-center pb-8">
          <Link to="/saju" className="text-amber-400/40 text-sm hover:text-amber-400/70 transition">← 다른 사주 보기</Link>
        </div>
      </div>
    </div>
  );
}
