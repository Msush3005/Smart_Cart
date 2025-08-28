import 'dotenv/config';
import fetch from "node-fetch";

// =====================
// SMARTCART – ONE-SHOT PROMPTING DEMO
// =====================

function loadApiConfig() {
  const apiKey = process.env.OPENAI_API_KEY;   // ✅ changed
  if (!apiKey) throw new Error("OPENAI_API_KEY not set in .env file"); // ✅ changed

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini"; // ✅ updated to OpenAI default
  const apiUrl = `https://api.openai.com/v1/chat/completions`; // ✅ OpenAI endpoint

  return { apiUrl, apiKey, model };
}

// One-shot example: user asks for headphones, SmartCart replies with structured shopping suggestions
const oneShotExample = [
  {
    role: "user",
    content: "Can you recommend me some good noise-cancelling headphones under ₹5000?"
  },
  {
    role: "assistant",
    content: `Here are two great options under ₹5000:
1. **boAt Nirvanaa 751 ANC** – ₹4,999 – Rating: 4.4 ⭐ – [Amazon Link](https://www.amazon.in/dp/B09XYZ123)  
2. **Noise Cancelling Headphones 700** – ₹4,790 – Rating: 4.5 ⭐ – [Flipkart Link](https://www.flipkart.com/item456)

Both have strong noise cancellation. The boAt has longer battery life, while the Noise model has slightly better comfort.`
  }
];

async function chat() {
  const { apiUrl, apiKey, model } = loadApiConfig();

  console.log("\n============================");
  console.log("  Welcome to SmartCart (One-Shot)");
  console.log("============================\n");
  console.log("This shopping assistant uses one-shot prompting to recommend products.\nType 'exit' to quit.\n");

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

      const messages = [...oneShotExample, { role: "user", content: userInput }];

      try {
        const resp = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`   // ✅ OpenAI requires Bearer token
          },
          body: JSON.stringify({
            model,
            messages
          })
        });

        if (!resp.ok) {
          console.error(`Error: ${resp.status} - ${resp.statusText}`);
          console.error(await resp.text());
          askUser();
          return;
        }

        const data = await resp.json();
        const reply = data.choices?.[0]?.message?.content || "No response";
        console.log("\nSmartCart:", reply, "\n");

      } catch (err) {
        console.error("Error communicating with OpenAI:", err);
      }

      askUser();
    });
  }

  askUser();
}

chat();
