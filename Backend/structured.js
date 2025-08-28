// ==============================
// SMARTCART – STRUCTURED OUTPUT DEMO
// ==============================
import 'dotenv/config';
import fetch from "node-fetch";

// ==============================
// Load API Configuration
// ==============================
function loadApiConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const apiUrl = `https://api.openai.com/v1/chat/completions`;

  return { apiUrl, apiKey, model };
}

// ==============================
// Example SmartCart Backend Functions
// ==============================
function comparePrices(product1, product2) {
  return `Comparing ${product1} vs ${product2}: ${product1} is cheaper.`;
}

function fetchReviews(productName) {
  return `Fetched reviews for ${productName}: 4.5⭐ average rating.`;
}

function addToCart(productId) {
  return `Product ${productId} added to your cart successfully.`;
}

// ==============================
// Function Calling Handler
// ==============================
function handleFunctionCall(reply) {
  reply = reply.toLowerCase();

  if (reply.includes("compareprices")) {
    const match = reply.match(/compareprices\(([^,]+),\s*([^)]+)\)/i);
    if (match) return comparePrices(match[1].trim(), match[2].trim());
  } else if (reply.includes("fetchreviews")) {
    const match = reply.match(/fetchreviews\(([^)]+)\)/i);
    if (match) return fetchReviews(match[1].trim());
  } else if (reply.includes("addtocart")) {
    const match = reply.match(/addtocart\(([^)]+)\)/i);
    if (match) return addToCart(match[1].trim());
  }
  return null;
}

// ==============================
// SmartCart Structured Output
// ==============================
function formatStructuredOutput(products) {
  return {
    results: products.map(p => ({
      name: p.name,
      price: p.price,
      rating: p.rating,
      buy_link: p.buy_link
    }))
  };
}

// ==============================
// Dynamic / Multi-Shot Examples
// ==============================
const dynamicExamples = [
  // One-Shot Example
  {
    role: "user",
    content: "Find me a Bluetooth speaker under ₹2000."
  },
  {
    role: "assistant",
    content: JSON.stringify(formatStructuredOutput([
      { name: "JBL GO 3", price: "₹1,999", rating: 4.4, buy_link: "https://amazon.in/dp/JBLGO3" }
    ]))
  }
];

// ==============================
// Chat Loop
// ==============================
async function chat() {
  const { apiUrl, apiKey, model } = loadApiConfig();

  console.log("\n============================");
  console.log(" Welcome to SmartCart Structured Output Demo");
  console.log("============================\n");
  console.log("Type your query (e.g., 'Find me a gaming mouse under ₹2000') or 'exit' to quit.\n");

  process.stdin.setEncoding("utf-8");
  process.stdin.on("data", async (userInput) => {
    userInput = userInput.trim();
    if (["exit", "quit"].includes(userInput.toLowerCase())) {
      console.log("Goodbye! Happy shopping!");
      process.exit();
    }

    const messages = [
      { role: "system", content: "You are SmartCart, a friendly AI shopping assistant for electronics and gadgets. Answer concisely and provide JSON-formatted product suggestions." },
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
        body: JSON.stringify({ model, messages })
      });

      if (!resp.ok) {
        console.error(`Error: ${resp.status} - ${resp.statusText}`);
        return;
      }

      const data = await resp.json();
      const reply = data.choices[0].message.content;

      // Display AI Reply
      console.log("\nSmartCart Reply:\n", reply);

      // Handle any function calls
      const funcResult = handleFunctionCall(reply);
      if (funcResult) console.log("\n[Function Output]:", funcResult);

      // Attempt to parse JSON structured output
      try {
        const structured = JSON.parse(reply);
        console.log("\nStructured Output:", JSON.stringify(structured, null, 2));
      } catch {
        console.log("\nNo valid JSON structured output detected.");
      }

    } catch (err) {
      console.error("Error communicating with SmartCart:", err);
    }
  });
}

chat();
