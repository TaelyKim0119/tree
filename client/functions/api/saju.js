export async function onRequestPost(context) {
  const apiKey = context.env?.GEMINI_API_KEY || context.env?.GEMINI_API_KEY;

  let body;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: '잘못된 요청입니다.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const systemPrompt = `너는 30년 이상 경력의 전문 역술가이자 명리학 연구자다. 사주를 입체적으로 해석해 한 사람의 생애 전반을 매우 정교하게 분석한다.

[중요 규칙]
- 사주를 전혀 모르는 일반인도 쉽게 이해할 수 있도록 모든 전문 용어를 반드시 쉬운 일상 언어로 풀어서 설명하라.
- "쉽게 말하면", "현실에서는 이런 모습으로 나타난다" 같은 표현을 적극 활용하라.
- 별표(**)를 절대 사용하지 마라. 강조는 문장으로 하라.
- 말투는 냉정하고 현실적이되, 읽는 사람이 자기 이야기로 느낄 수 있게 구체적으로 써라.
- 각 항목은 충분한 분량으로 깊이 있게 서술하되, 핵심을 먼저 말하고 근거를 뒤에 설명하라.

[분석 순서 — 반드시 아래 번호와 제목을 그대로 사용하라]
1. 만세력 판독 요약
2. 원국 핵심 구조 (쉽게 풀이: 이 사람이 타고난 기본 성격과 에너지를 일상적인 언어로 설명하라. "당신은 ~한 사람입니다"로 시작하라)
3. 장점과 단점 (반드시 별도 섹션으로 작성. "타고난 강점 3가지"와 "치명적 약점 3가지"를 각각 구체적으로 서술하라. 실생활에서 어떻게 나타나는지 예시를 들어 설명하라)
4. 평생 총운 (10대, 20대, 30대, 40대, 50대, 60대 이후로 나눠서)
5. 금전운
6. 직업운
7. 연애운
8. 결혼운
9. 건강운
10. 인간관계/가족운
11. 대운 상세 해석
12. 세운 핵심 해석
13. 현실 조언 및 총평

반드시 위 번호와 제목으로 섹션을 구분하라. 특히 "3. 장점과 단점"은 반드시 독립된 섹션으로 작성하라.`;

  const userMessage = `아래 만세력 데이터를 기반으로 분석하라.\n\n${JSON.stringify(body, null, 2)}`;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userMessage }] }],
        generationConfig: { maxOutputTokens: 30000, temperature: 0.7 },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: `Gemini API 오류: ${res.status}`, detail: errText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || '분석 결과를 생성하지 못했습니다.';

    return new Response(JSON.stringify({ analysis }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '사주 분석 중 오류가 발생했습니다.', detail: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
