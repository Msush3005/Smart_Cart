import 'dotenv/config';
import fetch from "node-fetch";

// =====================
// SMARTCART – ZERO-SHOT PROMPTING DEMO
// =====================

function loadApiConfig() {
  const apiKey = process.env.OPENAI_API_KEY;  // ✅ use OpenAI
  if (!apiKey) throw new Error("OPENAI_API_KEY not set in .env file");

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini"; // ✅ OpenAI model
  

  return { apiKey, model };
}

async function chat() {
  const { apiKey, model } = loadApiConfig();

  console.log("\n============================");
  console.log("  Welcome to SmartCart (Zero-Shot)");
  console.log("============================\n");
  console.log("This shopping assistant uses ZERO-SHOT prompting (no examples, just instructions).\nType 'exit' to quit.\n");

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

      // ✅ Only instruction, no examples
      const messages = [
        {
          role: "system",
          content: "You are SmartCart, an AI shopping assistant. Recommend products clearly, with name, price in INR, rating, and a short note."
        },
        {
          role: "user",
          content: userInput
        }
      ];

      try {
        const resp = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
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
