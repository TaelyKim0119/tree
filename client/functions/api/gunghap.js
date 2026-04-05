export async function onRequestPost(context) {
  const apiKey = 'AIzaSyCIWV2yyqitbINp1MV3FChuEsJsR1xnLGY';

  let body;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: '잘못된 요청입니다.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const systemPrompt = `너는 30년 이상 경력의 전문 역술가이자 명리학 연구자다. 두 사람의 사주를 비교 분석하여 궁합을 매우 정밀하게 분석한다. 냉정하고 현실적으로, 듣기 좋은 말보다 정확한 말을 우선하라. 사주를 모르는 사람도 이해할 수 있게 쉽게 설명하되 분석의 깊이는 최고 수준으로 유지하라. 답변은 최대한 길고 자세하게 작성하라.`;

  const userMessage = `아래 두 사람의 만세력 데이터를 기반으로 궁합을 분석하라.\n\n${JSON.stringify(body, null, 2)}`;

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
    const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || '궁합 분석 결과를 생성하지 못했습니다.';

    return new Response(JSON.stringify({ analysis }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '궁합 분석 중 오류가 발생했습니다.', detail: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
