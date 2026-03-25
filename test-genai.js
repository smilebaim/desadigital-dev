const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    console.log("Testing Gemini 1.5 Flash connectivity...");
    const result = await model.generateContent("Say hello!");
    const response = await result.response;
    console.log("Success! Response:", response.text());
  } catch (error) {
    console.error("Connectivity Test Failed:");
    console.error(error);
  }
}

test();
