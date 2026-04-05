import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { bgImages } from '../utils/imageMap';
import { SIJI_OPTIONS, CHEONGAN_OHENG } from '../utils/constants';
import { calculateManseryeok } from '../utils/manseryeok';
import { getOhengDistribution, getSingang, getYongsin } from '../utils/oheng';

function PersonForm({ label, person, onChange }) {
  const years = Array.from({ length: 101 }, (_, i) => 1940 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const update = (key, val) => onChange({ ...person, [key]: val });
  return (
    <div>
      <h3 className="text-amber-400/60 text-sm font-semibold mb-4">{label}</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {['남','여'].map(g => (
            <button key={g} onClick={() => update('gender', g)} className={`py-2.5 text-center rounded-xl text-sm transition ${person.gender === g ? 'bg-amber-400/90 text-black font-semibold' : 'bg-white/[0.03] text-white/40 border border-white/5'}`}>{g}성</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="relative">
            <input type="number" min="1940" max="2040" value={person.year} onChange={e => update('year', Number(e.target.value))}
              className="w-full py-2.5 px-2 bg-[#1a1610] border border-amber-400/15 rounded-xl text-white text-sm text-center focus:outline-none focus:border-amber-400/40" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400/30 text-[10px] pointer-events-none">년</span>
          </div>
          <div className="relative">
            <input type="number" min="1" max="12" value={person.month} onChange={e => update('month', Math.min(12, Math.max(1, Number(e.target.value))))}
              className="w-full py-2.5 px-2 bg-[#1a1610] border border-amber-400/15 rounded-xl text-white text-sm text-center focus:outline-none focus:border-amber-400/40" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400/30 text-[10px] pointer-events-none">월</span>
          </div>
          <div className="relative">
            <input type="number" min="1" max="31" value={person.day} onChange={e => update('day', Math.min(31, Math.max(1, Number(e.target.value))))}
              className="w-full py-2.5 px-2 bg-[#1a1610] border border-amber-400/15 rounded-xl text-white text-sm text-center focus:outline-none focus:border-amber-400/40" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400/30 text-[10px] pointer-events-none">일</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {SIJI_OPTIONS.map(s => (
            <button key={s.value} onClick={() => update('hour', s.value)}
              className={`py-2 px-1 rounded-lg text-[10px] text-center transition ${
                person.hour === s.value
                  ? 'bg-amber-400/90 text-black font-semibold'
                  : 'bg-[#1a1610] text-white/50 border border-amber-400/10'
              }`}>{s.label.split(' ')[0]}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GunghapInputPage() {
  const navigate = useNavigate();
  const [person1, setPerson1] = useState({ gender: '남', year: 1990, month: 1, day: 1, hour: 12 });
  const [person2, setPerson2] = useState({ gender: '여', year: 1992, month: 1, day: 1, hour: 12 });
  const [loading, setLoading] = useState(false);

  function analyzePerson(p) {
    const m = calculateManseryeok(p.year, p.month, p.day, p.hour);
    const oh = getOhengDistribution(m);
    const sg = getSingang(m, oh);
    const yg = getYongsin(sg, CHEONGAN_OHENG[m.day.cheongan]);
    return { 성별: p.gender, 양력생일: `${p.year}-${p.month}-${p.day}`, 년주: m.year, 월주: m.month, 일주: m.day, 시주: m.time, 오행분포: oh, 신강신약: sg, 용신: yg };
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const p1 = analyzePerson(person1);
      const p2 = analyzePerson(person2);
      const res = await fetch('/api/gunghap', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ person1: p1, person2: p2 }) });
      if (!res.ok) throw new Error('API 오류');
      const { analysis } = await res.json();
      navigate('/gunghap/result', { state: { person1: p1, person2: p2, analysis } });
    } catch { alert('오류가 발생했습니다.'); }
    finally { setLoading(false); }
  };

  if (loading) {
    return (<div className="min-h-screen flex items-center justify-center"><div className="text-center"><div className="w-16 h-16 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-6" /><p className="text-amber-400/60 text-sm tracking-widest">궁합 분석 중...</p></div></div>);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-[480px] w-full rounded-[2rem] overflow-hidden relative">
        <img src={bgImages.lake} className="absolute inset-0 w-full h-full object-cover opacity-10" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="relative z-10 p-8">
          <Link to="/" className="text-amber-400/30 text-sm mb-8 block hover:text-amber-400/60 transition">‹ 뒤로</Link>
          <div className="text-center mb-8"><h2 className="text-2xl font-bold text-white/90 mb-2">궁합 분석</h2><p className="text-xs text-white/25">두 사람의 사주를 입력하세요</p></div>
          <div className="space-y-8">
            <PersonForm label="첫 번째 사람" person={person1} onChange={setPerson1} />
            <div className="text-center text-amber-400/20 text-2xl">♥</div>
            <PersonForm label="두 번째 사람" person={person2} onChange={setPerson2} />
          </div>
          <button onClick={handleSubmit} className="shimmer w-full py-4 mt-8 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black rounded-2xl font-bold text-base tracking-[0.15em] shadow-2xl shadow-amber-500/20">궁합 보기</button>
        </div>
      </div>
    </div>
  );
}
