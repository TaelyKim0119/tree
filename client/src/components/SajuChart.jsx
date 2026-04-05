import { cheonganImage, jijiImage } from '../utils/imageMap';
import { CHEONGAN_OHENG, CHEONGAN_EUMYANG } from '../utils/constants';

const OHENG_KR = { '목': '나무', '화': '불', '토': '흙', '금': '쇠', '수': '물' };

const PILLAR_DESC = {
  '시주': '말년·자녀운',
  '일주': '나 자신',
  '월주': '청년·사회운',
  '년주': '초년·조상운',
};

const PILLAR_DETAIL = {
  '년주': {
    title: '년주(年柱)',
    hanja: '年柱',
    age: '1~20세 초년운',
    meaning: '조상과 부모의 기운을 나타냅니다. 태어난 환경, 가문의 기운, 어린 시절의 운을 보여줍니다.',
    represents: '조상, 부모, 유년기',
  },
  '월주': {
    title: '월주(月柱)',
    hanja: '月柱',
    age: '20~40세 청년운',
    meaning: '부모·형제의 영향과 사회활동 능력을 나타냅니다. 직업운과 사회적 성취를 주로 봅니다.',
    represents: '부모, 형제, 사회운',
  },
  '일주': {
    title: '일주(日柱)',
    hanja: '日柱',
    age: '40~60세 중년운',
    meaning: '사주의 핵심! 나 자신과 배우자를 나타냅니다. 천간은 나, 지지는 배우자의 기운입니다.',
    represents: '나 자신, 배우자',
  },
  '시주': {
    title: '시주(時柱)',
    hanja: '時柱',
    age: '60세 이후 말년운',
    meaning: '자녀운과 말년의 결실을 나타냅니다. 인생 후반부의 성과와 노후를 보여줍니다.',
    represents: '자녀, 말년, 결실',
  },
};

const CHEONGAN_DETAIL = {
  '甲': { name: '갑목', nick: '양나무', symbol: '큰 나무·소나무', desc: '곧고 강한 큰 나무. 리더십이 있고 정의롭지만 고집이 셀 수 있습니다.' },
  '乙': { name: '을목', nick: '음나무', symbol: '풀·덩굴·화초', desc: '유연하고 부드러운 풀과 꽃. 적응력이 뛰어나고 섬세하지만 의지력이 약할 수 있습니다.' },
  '丙': { name: '병화', nick: '양불', symbol: '태양·큰 불', desc: '뜨겁고 밝은 태양. 열정적이고 화려하며 표현력이 강합니다.' },
  '丁': { name: '정화', nick: '음불', symbol: '촛불·달빛', desc: '은은한 촛불과 달빛. 따뜻하고 지적이며 섬세한 감성을 지닙니다.' },
  '戊': { name: '무토', nick: '양흙', symbol: '산·큰 대지', desc: '거대한 산과 대지. 듬직하고 신뢰감이 있으며 포용력이 큽니다.' },
  '己': { name: '기토', nick: '음흙', symbol: '밭·정원', desc: '비옥한 밭과 정원 흙. 자양분을 주는 성격으로 세심하고 실속이 있습니다.' },
  '庚': { name: '경금', nick: '양쇠', symbol: '바위·칼·쇳덩이', desc: '단단한 바위와 칼. 결단력 있고 강인하지만 날카로울 수 있습니다.' },
  '辛': { name: '신금', nick: '음쇠', symbol: '보석·바늘', desc: '정교한 보석과 바늘. 예리하고 완벽주의적이며 미적 감각이 뛰어납니다.' },
  '壬': { name: '임수', nick: '양물', symbol: '바다·큰 강', desc: '넓은 바다와 큰 강. 포용력이 있고 지혜롭지만 변덕이 있을 수 있습니다.' },
  '癸': { name: '계수', nick: '음물', symbol: '이슬·빗물', desc: '이슬과 빗물. 맑고 섬세하며 감수성이 풍부합니다.' },
};

export default function SajuChart({ manseryeok }) {
  const pillars = [
    { label: '시주', key: '시주', highlight: false },
    { label: '일주', key: '일주', highlight: true },
    { label: '월주', key: '월주', highlight: false },
    { label: '년주', key: '년주', highlight: false },
  ];
  return (
    <div>
      <div className="flex justify-center gap-3 sm:gap-4 md:gap-5">
        {pillars.map(({ label, key, highlight }) => {
          const data = manseryeok[key];
          const oheng = CHEONGAN_OHENG[data.cheongan];
          const eumyang = CHEONGAN_EUMYANG[data.cheongan];
          return (
            <div key={key} className="text-center space-y-2">
              <p className={`text-[10px] md:text-[11px] tracking-widest ${highlight ? 'text-white/60 font-semibold' : 'text-white/20'}`}>{label}{highlight && ' ★'}</p>
              <div className={`w-[70px] h-[88px] md:w-[90px] md:h-[110px] lg:w-[100px] lg:h-[120px] rounded-2xl overflow-hidden relative shadow-xl ${highlight ? 'ring-2 ring-white/30' : 'ring-1 ring-white/5'}`}>
                <img src={cheonganImage[data.cheongan]} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                {highlight && <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white/80 flex items-center justify-center text-[7px] text-black font-bold">日</div>}
                <div className="absolute bottom-2 inset-x-0 text-center"><div className="text-xl font-bold drop-shadow-2xl text-white">{data.cheongan}</div></div>
              </div>
              <div className={`w-[70px] h-[88px] md:w-[90px] md:h-[110px] lg:w-[100px] lg:h-[120px] rounded-2xl overflow-hidden relative shadow-xl ${highlight ? 'ring-2 ring-white/20' : 'ring-1 ring-white/5'}`}>
                <img src={jijiImage[data.jiji]} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-2 inset-x-0 text-center"><div className="text-xl font-bold drop-shadow-2xl text-white">{data.jiji}</div></div>
              </div>
              <p className="text-[9px] md:text-[10px] text-white/25">{eumyang}{OHENG_KR[oheng]}</p>
              <p className="text-[8px] md:text-[9px] text-white/30">{PILLAR_DESC[label]}</p>
            </div>
          );
        })}
      </div>

      {/* 사주 기둥별 상세 설명 */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {pillars.map(({ label, key }) => {
          const data = manseryeok[key];
          const oheng = CHEONGAN_OHENG[data.cheongan];
          const detail = PILLAR_DETAIL[label];
          const cheonganInfo = CHEONGAN_DETAIL[data.cheongan];
          return (
            <div key={key} className="glass rounded-xl p-3 border border-white/5">
              <p className="text-white/60 text-[10px] tracking-wider mb-1">{detail.hanja} {label}</p>
              <p className="text-white/70 text-xs font-semibold">{data.cheongan}{data.jiji}</p>
              <p className="text-white/40 text-[10px] mt-1">{detail.age}</p>
              <p className="text-white/30 text-[10px] mt-0.5">{detail.represents}</p>
            </div>
          );
        })}
      </div>

      {/* 천간 의미 해설 — 내 일간(일주 천간) 중심 */}
      <div className="mt-6 glass rounded-xl p-4 md:p-5 border border-white/5">
        <p className="text-[10px] tracking-[0.3em] text-white/30 mb-3">천간(天干) 해설</p>
        <div className="space-y-3">
          {pillars.map(({ label, key, highlight }) => {
            const data = manseryeok[key];
            const info = CHEONGAN_DETAIL[data.cheongan];
            const eumyang = CHEONGAN_EUMYANG[data.cheongan];
            const oheng = CHEONGAN_OHENG[data.cheongan];
            return (
              <div key={key} className={`rounded-lg p-3 ${highlight ? 'bg-white/[0.06] border border-white/10' : 'bg-white/[0.02]'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white/70 text-sm font-bold">{data.cheongan}</span>
                  <span className="text-white/50 text-[11px]">{info.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/[0.08] text-white/40">{info.nick}</span>
                  {highlight && <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-yellow-300/60">내 일간</span>}
                </div>
                <p className="text-white/30 text-[10px] mb-1">{eumyang === '양' ? '양(陽)' : '음(陰)'} · {OHENG_KR[oheng]}({oheng}) · {info.symbol}</p>
                <p className="text-white/45 text-[11px] leading-relaxed">{info.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 사주 구조 설명 */}
      <div className="mt-4 glass rounded-xl p-4 md:p-5 border border-white/5">
        <p className="text-[10px] tracking-[0.3em] text-white/30 mb-3">사주(四柱) 읽는 법</p>
        <div className="space-y-2">
          {pillars.map(({ label }) => {
            const detail = PILLAR_DETAIL[label];
            return (
              <div key={label} className="flex gap-3 items-start">
                <span className="text-white/50 text-[11px] font-semibold shrink-0 w-12">{detail.hanja}</span>
                <p className="text-white/40 text-[11px] leading-relaxed">{detail.meaning}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
