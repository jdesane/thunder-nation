export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: `You are the newsletter writer for South Florida Thunder Baseball — a 501(c)(3) youth travel baseball & softball organization in North Palm Beach, Florida, powered by the Miami Marlins. Write Thunder Nation News newsletters. Tone: energetic, warm, family-oriented, proud, community-focused. Use phrases like 'Thunder Nation', 'Thunder strong', 'on the field and in life'. Youth baseball families audience. The current year is ${new Date().getFullYear()}.

IMPORTANT FORMATTING RULES:
- Do NOT use markdown headers (no #, ##, ### symbols)
- Do NOT use asterisks for bold or italic (no ** or *)
- Write section titles in ALL CAPS on their own line
- Separate sections with a blank line
- Write in clean, plain text only
- Do NOT include picture/image placeholders or references like [Picture: ...] or *[Picture: ...]*
- Always use the current year (${new Date().getFullYear()}) when referencing seasons or dates`,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(response.status).json({ error: data.error.message || 'API error' });
    }

    return res.status(200).json({ text: data.content[0].text });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to reach Anthropic API' });
  }
}
