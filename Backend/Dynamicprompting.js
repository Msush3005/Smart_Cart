import 'dotenv/config';
import fetch from "node-fetch";
import readline from "readline";

// =====================
// SMARTCART – DYNAMIC PROMPTING DEMO
// =====================
// In dynamic prompting, the user can add or remove example Q&A pairs during the session 
// to influence the model's behavior on the fly.

function loadApiConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not set in .env file");

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  
  return { apiUrl, apiKey, model };
}

// Helper: print examples
function printExamples(examples) {
  if (examples.length === 0) {
    console.log("No dynamic examples set.");
    return;
  }
  console.log("\nCurrent dynamic examples:");
  for (let i = 0; i < examples.length; i += 2) {
    const user = examples[i].content;
    const model = examples[i + 1].content;
    console.log(` ${i / 2 + 1}. User: ${user}\n    SmartCart: ${model}`);
  }
}

async function chat() {
  const { apiUrl, apiKey, model } = loadApiConfig();

  let dynamicExamples = [];

  console.log("\n============================");
  console.log(" Welcome to SmartCart (Dynamic Prompting)");
  console.log("============================\n");
  console.log("You can add or remove example Q&A pairs to guide SmartCart’s style during this session!");
  console.log("Commands:");
  console.log("  /add     - Add a new example Q&A pair");
  console.log("  /list    - List current examples");
  console.log("  /clear   - Remove all examples");
  console.log("  /exit    - Quit\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askUser() {
    rl.question("User: ", async (userInput) => {
      if (["/exit", "exit", "quit"].includes(userInput.toLowerCase())) {
        console.log("Goodbye! 🛒 Come back to shop anytime!");
        rl.close();
        return;
      } else if (userInput.toLowerCase() === "/add") {
        rl.question(" Example User: ", (exUser) => {
          rl.question(" Example SmartCart Response: ", (exModel) => {
            dynamicExamples.push({ role: "user", content: exUser });
            dynamicExamples.push({ role: "assistant", content: exModel });
            console.log("Example added!\n");
            askUser();
          });
        });
      } else if (userInput.toLowerCase() === "/list") {
        printExamples(dynamicExamples);
        askUser();
      } else if (userInput.toLowerCase() === "/clear") {
        dynamicExamples = [];
        console.log("All examples cleared!\n");
        askUser();
      } else {
        // Build messages: system + dynamic examples + user input
        const messages = [
          {
            role: "system",
            content:
              "You are SmartCart, an AI shopping assistant. Recommend products with Name, Price in INR, Rating, and a short note. Be clear and concise."
          },
          ...dynamicExamples,
          { role: "user", content: userInput }
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
      }
    });
  }

  askUser();
}

chat();
