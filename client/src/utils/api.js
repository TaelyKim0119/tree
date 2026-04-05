export async function fetchSajuAnalysis({ gender, calendarType, year, month, day, hour }) {
  const res = await fetch('/api/saju', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gender, calendarType, year, month, day, hour }),
  });
  if (!res.ok) throw new Error('서버 오류');
  return res.json();
}

export async function fetchGunghapAnalysis(person1, person2) {
  const res = await fetch('/api/gunghap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ person1, person2 }),
  });
  if (!res.ok) throw new Error('서버 오류');
  return res.json();
}
