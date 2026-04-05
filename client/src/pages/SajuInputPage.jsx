import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ohengImage, bgImages } from '../utils/imageMap';
import { SIJI_OPTIONS, CHEONGAN_OHENG } from '../utils/constants';
import { calculateManseryeok } from '../utils/manseryeok';
import { getOhengDistribution, analyzeSipsin, getSingang, getYongsin } from '../utils/oheng';
import { calculateDaeun, getSeunRange } from '../utils/daeun';

export default function SajuInputPage() {
  const navigate = useNavigate();
  const [gender, setGender] = useState('남');
  const [calendarType, setCalendarType] = useState('양력');
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);
  const [loading, setLoading] = useState(false);

  const years = Array.from({ length: 101 }, (_, i) => 1940 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const manseryeok = calculateManseryeok(year, month, day, hour);
      const ohengDist = getOhengDistribution(manseryeok);
      const sipsin = analyzeSipsin(manseryeok);
      const singang = getSingang(manseryeok, ohengDist);
      const ilganOheng = CHEONGAN_OHENG[manseryeok.day.cheongan];
      const yongsin = getYongsin(singang, ilganOheng);
      const daeun = calculateDaeun(gender, manseryeok.year, manseryeok.month, year);
      const seun = getSeunRange(new Date().getFullYear());

      const manseryeokData = {
        성별: gender, 달력: calendarType,
        양력생일: `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`,
        출생시간: `${hour}시`,
        년주: manseryeok.year, 월주: manseryeok.month,
        일주: manseryeok.day, 시주: manseryeok.time,
        오행분포: ohengDist, 십신: sipsin,
        신강신약: singang, 용신: yongsin,
        대운: daeun, 세운: seun,
      };

      const res = await fetch('/api/saju', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manseryeokData),
      });
      if (!res.ok) throw new Error('API 오류');
      const { analysis } = await res.json();
      navigate('/saju/result', { state: { manseryeok: manseryeokData, analysis } });
    } catch (e) {
      console.error(e);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-6" />
          <p className="text-amber-400/60 text-sm tracking-widest">사주 풀이 생성 중...</p>
          <p className="text-white/20 text-xs mt-2">AI가 분석하고 있습니다. 잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-[420px] w-full rounded-[2rem] overflow-hidden relative">
        <img src={bgImages.input} className="absolute inset-0 w-full h-full object-cover opacity-15" style={{ filter: 'blur(2px)' }} alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="relative z-10 p-8">
          <Link to="/" className="text-amber-400/30 text-sm mb-8 block hover:text-amber-400/60 transition">‹ 뒤로</Link>
          <div className="flex gap-1.5 rounded-xl overflow-hidden mb-10 h-16 opacity-70">
            {['목','화','토','금','수'].map(oh => (
              <div key={oh} className="flex-1 overflow-hidden">
                <img src={ohengImage[oh]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={oh} />
              </div>
            ))}
          </div>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white/90 mb-2">사주 정보 입력</h2>
            <p className="text-xs text-white/25 tracking-wider">당신의 오행을 찾아드립니다</p>
          </div>
          <div className="mb-6">
            <label className="text-[11px] tracking-[0.2em] text-amber-400/50 block mb-3">성별</label>
            <div className="grid grid-cols-2 gap-2">
              {['남','여'].map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-3 text-center rounded-xl text-sm cursor-pointer transition ${gender === g ? 'bg-amber-400/90 text-black font-semibold shadow-lg shadow-amber-400/10' : 'bg-white/[0.03] text-white/40 border border-white/5 hover:border-white/10'}`}>{g}성</button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-[11px] tracking-[0.2em] text-amber-400/50 block mb-3">달력</label>
            <div className="grid grid-cols-2 gap-2">
              {['양력','음력'].map(t => (
                <button key={t} onClick={() => setCalendarType(t)} className={`py-3 text-center rounded-xl text-sm cursor-pointer transition ${calendarType === t ? 'bg-amber-400/90 text-black font-semibold shadow-lg shadow-amber-400/10' : 'bg-white/[0.03] text-white/40 border border-white/5 hover:border-white/10'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-[11px] tracking-[0.2em] text-amber-400/50 block mb-3">생년월일</label>
            <div className="grid grid-cols-3 gap-2">
              <div className="relative">
                <input type="number" min="1940" max="2040" value={year} onChange={e => setYear(Number(e.target.value))}
                  className="w-full py-3 px-3 bg-[#1a1610] border border-amber-400/15 rounded-xl text-white text-sm text-center focus:outline-none focus:border-amber-400/40 transition" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400/30 text-xs pointer-events-none">년</span>
              </div>
              <div className="relative">
                <input type="number" min="1" max="12" value={month} onChange={e => setMonth(Math.min(12, Math.max(1, Number(e.target.value))))}
                  className="w-full py-3 px-3 bg-[#1a1610] border border-amber-400/15 rounded-xl text-white text-sm text-center focus:outline-none focus:border-amber-400/40 transition" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400/30 text-xs pointer-events-none">월</span>
              </div>
              <div className="relative">
                <input type="number" min="1" max="31" value={day} onChange={e => setDay(Math.min(31, Math.max(1, Number(e.target.value))))}
                  className="w-full py-3 px-3 bg-[#1a1610] border border-amber-400/15 rounded-xl text-white text-sm text-center focus:outline-none focus:border-amber-400/40 transition" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400/30 text-xs pointer-events-none">일</span>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <label className="text-[11px] tracking-[0.2em] text-amber-400/50 block mb-3">태어난 시간</label>
            <div className="grid grid-cols-4 gap-2">
              {SIJI_OPTIONS.map(s => (
                <button key={s.value} onClick={() => setHour(s.value)}
                  className={`py-2.5 px-1 rounded-xl text-xs text-center transition ${
                    hour === s.value
                      ? 'bg-amber-400/90 text-black font-semibold shadow-lg shadow-amber-400/10'
                      : 'bg-[#1a1610] text-white/50 border border-amber-400/10 hover:border-amber-400/30'
                  }`}>
                  {s.label.split(' ')[0]}
                </button>
              ))}
            </div>
            <p className="text-amber-400/25 text-[10px] mt-2 text-center">
              {SIJI_OPTIONS.find(s => s.value === hour)?.label}
            </p>
          </div>
          <button onClick={handleSubmit} className="shimmer w-full py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black rounded-2xl font-bold text-base tracking-[0.15em] shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-shadow">
            사주 풀이 시작
          </button>
        </div>
      </div>
    </div>
  );
}
