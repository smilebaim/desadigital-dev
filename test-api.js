const https = require('https');
const fs = require('fs');

try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const match = env.match(/GOOGLE_GENAI_API_KEY=(.*)/);
    if (!match) throw new Error("API Key logic failed");
    const apiKey = match[1].trim();

    const data = JSON.stringify({
      contents: [{ parts: [{ text: "Hello" }] }]
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    console.log("Testing API Key...");
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (d) => body += d);
      res.on('end', () => {
        console.log(`HTTP Status: ${res.statusCode}`);
        console.log(`Response Body: ${body}`);
      });
    });

    req.on('error', (e) => console.error("Request Error:", e));
    req.write(data);
    req.end();
} catch (e) {
    console.error("Script Error:", e.message);
}
