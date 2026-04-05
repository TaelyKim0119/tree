export default function AnalysisSection({ content }) {
  if (!content) return <p className="text-white/30 text-sm">분석 내용을 불러오는 중...</p>;
  return (
    <div className="space-y-1">
      {content.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-3" />;
        if (line.startsWith('###')) return <h3 key={i} className="text-lg font-bold text-white/85 mt-8 mb-4">{line.replace(/^#+\s*/, '')}</h3>;
        if (line.startsWith('##')) return <h2 key={i} className="text-xl font-bold text-amber-400/80 mt-10 mb-4">{line.replace(/^#+\s*/, '')}</h2>;
        if (line.startsWith('#')) return <h1 key={i} className="text-2xl font-bold text-amber-400 mt-10 mb-4">{line.replace(/^#+\s*/, '')}</h1>;
        if (line.startsWith('- ') || line.startsWith('* ')) return <p key={i} className="text-sm text-white/50 leading-[1.9] ml-4 flex gap-2"><span className="text-amber-400/40 mt-0.5 shrink-0">◆</span><span>{line.replace(/^[-*]\s*/, '')}</span></p>;
        if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="text-sm text-amber-300/70 font-semibold mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
        return <p key={i} className="text-sm text-white/50 leading-[1.9]">{line}</p>;
      })}
    </div>
  );
}
