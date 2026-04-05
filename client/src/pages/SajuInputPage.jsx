import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ohengImage, bgImages } from '../utils/imageMap';
import penBook from '../assets/images/aaron-burden-CKlHKtCJZKk-unsplash.jpg';
import { SIJI_OPTIONS, CHEONGAN_OHENG } from '../utils/constants';
import { calculateManseryeok } from '../utils/manseryeok';
import { getOhengDistribution, analyzeSipsin, getSingang, getYongsin } from '../utils/oheng';
import { calculateDaeun, getSeunRange } from '../utils/daeun';

export default function SajuInputPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('남');
  const [calendarType, setCalendarType] = useState('양력');
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);
  const [loading, setLoading] = useState(false);

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
        이름: name || '미입력', 성별: gender, 달력: calendarType,
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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <img src={penBook} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-8">
          <div className="w-16 h-16 mx-auto mb-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white text-lg font-bold tracking-wide mb-2">운명을 풀어보는 중...</p>
          <p className="text-white/40 text-sm font-light">사주팔자를 분석하고 있습니다</p>
          <div className="flex justify-center gap-2 mt-8">
            {['목','화','토','금','수'].map((oh,i) => (
              <div key={oh} className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/15 animate-pulse" style={{animationDelay:`${i*0.3}s`}}>
                <img src={ohengImage[oh]} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const inputClass = "w-full py-3 px-4 bg-white/[0.06] border border-white/10 rounded-xl text-white text-sm text-center focus:outline-none focus:border-white/30 transition";
  const labelClass = "text-xs tracking-wide text-white/40 block mb-3 font-medium";
  const toggleActive = "bg-white text-black font-semibold shadow-lg";
  const toggleInactive = "bg-white/[0.04] text-white/40 border border-white/8 hover:border-white/15";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="max-w-[500px] md:max-w-[640px] lg:max-w-[720px] w-full">
        <Link to="/" className="text-white/30 text-sm mb-8 block hover:text-white/60 transition font-light">← 뒤로</Link>

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">사주 정보 입력</h2>
          <p className="text-sm text-white/35 font-light">당신의 오행을 찾아드립니다</p>
        </div>

        <div className="space-y-6">
          {/* 이름 */}
          <div>
            <label className={labelClass}>이름</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="이름을 입력하세요"
              className="w-full py-3 px-4 bg-white/[0.06] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/30 transition placeholder-white/20" />
          </div>

          {/* 성별 */}
          <div>
            <label className={labelClass}>성별</label>
            <div className="grid grid-cols-2 gap-3">
              {['남','여'].map(g => (
                <button key={g} onClick={() => setGender(g)}
                  className={`py-3 text-center rounded-xl text-sm cursor-pointer transition-all ${gender === g ? toggleActive : toggleInactive}`}>{g}성</button>
              ))}
            </div>
          </div>

          {/* 달력 */}
          <div>
            <label className={labelClass}>달력</label>
            <div className="grid grid-cols-2 gap-3">
              {['양력','음력'].map(t => (
                <button key={t} onClick={() => setCalendarType(t)}
                  className={`py-3 text-center rounded-xl text-sm cursor-pointer transition-all ${calendarType === t ? toggleActive : toggleInactive}`}>{t}</button>
              ))}
            </div>
          </div>

          {/* 생년월일 */}
          <div>
            <label className={labelClass}>생년월일</label>
            <div className="grid grid-cols-3 gap-3">
              <div className="relative">
                <input type="number" min="1940" max="2040" value={year} onChange={e => setYear(Number(e.target.value))} className={inputClass} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 text-xs pointer-events-none">년</span>
              </div>
              <div className="relative">
                <input type="number" min="1" max="12" value={month} onChange={e => setMonth(Math.min(12, Math.max(1, Number(e.target.value))))} className={inputClass} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 text-xs pointer-events-none">월</span>
              </div>
              <div className="relative">
                <input type="number" min="1" max="31" value={day} onChange={e => setDay(Math.min(31, Math.max(1, Number(e.target.value))))} className={inputClass} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 text-xs pointer-events-none">일</span>
              </div>
            </div>
          </div>

          {/* 시간 */}
          <div>
            <label className={labelClass}>태어난 시간</label>
            <div className="grid grid-cols-4 gap-2">
              {SIJI_OPTIONS.map(s => {
                const timeRange = s.label.match(/\((.+)\)/)?.[1] || '';
                return (
                  <button key={s.value} onClick={() => setHour(s.value)}
                    className={`py-2.5 px-1 rounded-xl text-center transition-all ${
                      hour === s.value ? toggleActive : toggleInactive
                    }`}>
                    <div className="text-sm">{s.label.split(' ')[0]}</div>
                    <div className={`text-[10px] mt-0.5 ${hour === s.value ? 'text-black/50' : 'text-white/20'}`}>{timeRange}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 제출 */}
          <button onClick={handleSubmit}
            className="w-full py-4 mt-4 bg-white text-black rounded-2xl font-bold text-base tracking-wide hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            사주 풀이 시작
          </button>
        </div>
      </div>
    </div>
  );
}
