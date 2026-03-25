import { askAssistant } from './src/lib/genkit-actions';

async function test() {
    console.log("Testing AI Assistant...");
    try {
        const result = await askAssistant("Halo, siapa nama desa ini?");
        console.log("Result:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("Fatal Error:", e);
    }
}

test();
