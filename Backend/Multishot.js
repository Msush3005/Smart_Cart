import 'dotenv/config';
import fetch from "node-fetch";

// =====================
// SMARTCART – MULTI-SHOT PROMPTING DEMO
// =====================

function loadApiConfig() {
  const apiKey = process.env.OPENAI_API_KEY; // ✅ Changed here
  if (!apiKey) throw new Error("OPENAI_API_KEY not set in .env file");

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const apiVersion = process.env.GEMINI_API_VERSION || "v1beta";
  

  return { apiUrl, apiKey };
}

// Multi-shot examples: multiple shopping Q&A pairs to guide SmartCart
const multiShotExamples = [
  // Example 1
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

The boAt has longer battery life, while the Noise model has slightly better comfort.`
    }]
  },

  // Example 2
  {
    role: "user",
    parts: [{ text: "Find me a gaming mouse under ₹2000 with RGB lights." }]
  },
  {
    role: "model",
    parts: [{
      text: `Sure! Here are some budget gaming mice with RGB under ₹2000:
1. **Logitech G102 Lightsync** – ₹1,899 – Rating: 4.4 ⭐ – [Amazon](https://www.amazon.in/dp/LOG102)  
2. **Redgear A-15 Wired RGB Mouse** – ₹699 – Rating: 4.2 ⭐ – [Flipkart](https://www.flipkart.com/item123)

The Logitech is more durable, while the Redgear is the most affordable option.`
    }]
  },

  // Example 3
  {
    role: "user",
    parts: [{ text: "Suggest a power bank around ₹1500 with fast charging." }]
  },
  {
    role: "model",
    parts: [{
      text: `Here are two great power banks near ₹1500:
1. **Mi Power Bank 3i 10000mAh** – ₹1,499 – Rating: 4.3 ⭐ – [Amazon](https://www.amazon.in/dp/MI3I)  
2. **Realme Power Bank 10000mAh 18W** – ₹1,399 – Rating: 4.2 ⭐ – [Flipkart](https://www.flipkart.com/item987)

Both support fast charging. The Mi model has triple output ports, while the Realme is more compact.`
    }]
  }
];

async function chat() {
  const { apiUrl, apiKey } = loadApiConfig();

  console.log("\n============================");
  console.log("  Welcome to SmartCart (Multi-Shot)");
  console.log("============================\n");
  console.log("This shopping assistant uses MULTI-SHOT prompting (several examples) to guide answers.\nType 'exit' to quit.\n");

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

      // Build request with multi-shot examples + user input
      const contents = [...multiShotExamples, {
        role: "user",
        parts: [{ text: userInput }]
      }];

      const payload = { contents };

      try {
        const resp = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey // ✅ Changed here
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

      askUser(); // keep chatting
    });
  }

  askUser();
}

chat();
