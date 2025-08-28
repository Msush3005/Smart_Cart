import 'dotenv/config';
import fetch from "node-fetch";

// =====================
// SMARTCART – ONE-SHOT PROMPTING DEMO
// =====================

function loadApiConfig() {
  const apiKey = process.env.GENAI_API_KEY;
  if (!apiKey) throw new Error("GENAI_API_KEY not set in .env file");

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const apiVersion = process.env.GEMINI_API_VERSION || "v1beta";
  const apiUrl = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent`;

  return { apiUrl, apiKey };
}

// One-shot example: user asks for headphones, SmartCart replies with structured shopping suggestions
const oneShotExample = [
  {
    role: "user",
    parts: [{ text: "Can you recommend me some good noise-cancelling headphones under ₹5000?" }]
  },
  {
    role: "model",
    parts: [{
      text: `Here are two great options under ₹5000:
1. **boAt Nirvanaa 751 ANC** – ₹4,999 – Rating: 4.4 ⭐ – [Amazon Link](https://www.amazon.in/dp/B09XYZ123)  
2. **Noise Cancelling Headphones 700** – ₹4,790 – Rating: 4.5 ⭐ – [Flipkart Link](https://www.flipkart.com/item456)

Both have strong noise cancellation. The boAt has longer battery life, while the Noise model has slightly better comfort.`
    }]
  }
];

async function chat() {
  const { apiUrl, apiKey } = loadApiConfig();

  console.log("\n============================");
  console.log("  Welcome to SmartCart (One-Shot)");
  console.log("============================\n");
  console.log("This shopping assistant uses one-shot prompting to recommend products.\nType 'exit' to quit.\n");

  // Simple CLI loop
  const readline = await import("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askUser() {
    rl.question("User: ", async (userInput) => {
      if (["exit", "quit"].includes(userInput.toLowerCase())) {
        console.log("Goodbye! Happy shopping! 🛒");
        rl.close();
        return;
      }

      // Build contents with the one-shot example + user input
      const contents = [...oneShotExample, {
        role: "user",
        parts: [{ text: userInput }]
      }];

      const payload = { contents };

      try {
        const resp = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey
          },
          body: JSON.stringify(payload)
        });

        if (!resp.ok) {
          console.error(`Error: ${resp.status} - ${resp.statusText}`);
          console.error(await resp.text());
          askUser();
          return;
        }

        const data = await resp.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        console.log("\nSmartCart:", reply, "\n");

      } catch (err) {
        console.error("Error communicating with Gemini:", err);
      }

      askUser(); // loop again
    });
  }

  askUser();
}

chat();
