import { ohengImage } from '../utils/imageMap';

const COLORS = { '목': 'from-green-600 to-emerald-400', '화': 'from-red-700 to-orange-400', '토': 'from-yellow-700 to-amber-400', '금': 'from-gray-500 to-gray-300', '수': 'from-blue-700 to-cyan-400' };
const TEXT = { '목': 'text-green-400', '화': 'text-red-400', '토': 'text-yellow-400', '금': 'text-gray-300', '수': 'text-blue-400' };
const HANJA = { '목': '木', '화': '火', '토': '土', '금': '金', '수': '水' };

export default function OhengChart({ distribution }) {
  return (
    <div className="space-y-4">
      {Object.entries(distribution).map(([oh, { count, percent }]) => (
        <div key={oh} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden ring-1 ring-white/10 shrink-0 shadow-lg">
            <img src={ohengImage[oh]} className="w-full h-full object-cover" alt={oh} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-2">
              <span className={`${TEXT[oh]} font-semibold tracking-wider`}>{HANJA[oh]}</span>
              <span className={`${TEXT[oh]} opacity-50`}>{count}개 · {percent}%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${COLORS[oh]} rounded-full`} style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
