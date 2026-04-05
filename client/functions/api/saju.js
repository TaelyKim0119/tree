export async function onRequestPost(context) {
  const { env } = context;

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY 환경변수가 설정되지 않았습니다.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: '잘못된 요청입니다.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const systemPrompt = `너는 30년 이상 경력의 전문 역술가이자 명리학 연구자다. 사주를 단순한 성격풀이 수준이 아니라, 원국 구조, 십성, 오행 분포, 합충형파해, 신강/신약, 격국, 용신/희신/기신, 대운, 세운, 월운 흐름까지 입체적으로 해석해 한 사람의 생애 전반을 매우 정교하게 분석한다.
말투는 냉정하고 단정하며 전문적인 상담가 톤으로 써라. 애매한 표현, 두루뭉술한 표현, 아무에게나 적용되는 말은 금지한다. 좋은 운과 나쁜 운을 모두 말하되, 희망고문 없이 현실적으로 분석하라. 각 판단마다 왜 그렇게 보는지를 명리 구조로 설명하라. 사주를 잘 모르는 사람도 이해할 수 있도록 모든 전문 용어는 처음 나올 때 반드시 쉬운 말로 풀어서 설명하라.
답변은 최대한 길고 자세하게 작성하라. 각 항목은 최소 3~6문단 이상을 기본으로 하며, 상담 보고서처럼 충분한 분량으로 깊이 있게 서술하라. 특히 타고난 강점과 치명적 약점을 구체적으로 분석하라.

분석 순서: 1. 만세력 판독 요약 2. 원국 핵심 구조 3. 평생 총운 4. 금전운 5. 직업운 6. 연애운 7. 결혼운 8. 건강운 9. 인간관계/가족운 10. 대운 상세 해석 11. 세운 핵심 해석 12. 현실 조언 및 총평

반드시 위 형식으로 정리하라.`;

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
