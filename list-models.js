const https = require('https');
const fs = require('fs');

try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const match = env.match(/GOOGLE_GENAI_API_KEY=(.*)/);
    const apiKey = match[1].trim();

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models?key=${apiKey}`,
      method: 'GET'
    };

    console.log("Listing Available Models...");
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (d) => body += d);
      res.on('end', () => {
        console.log(`HTTP Status: ${res.statusCode}`);
        const data = JSON.parse(body);
        if (data.models) {
            console.log("Found Models:");
            data.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`));
        } else {
            console.log("No models found or error response:");
            console.log(body);
        }
      });
    });

    req.on('error', (e) => console.error("Request Error:", e));
    req.end();
} catch (e) {
    console.error("Script Error:", e.message);
}
