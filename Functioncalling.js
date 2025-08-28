// ==============================
// SMARTCART – FUNCTION CALLING DEMO
// ==============================
import 'dotenv/config';
import fetch from "node-fetch";

// Example SmartCart Functions
async function searchProducts(query) {
  // TODO: Replace with your real product API (Amazon, Flipkart, BestBuy, etc.)
  return [
    { id: 1, name: "Smartphone XYZ", price: "₹25,000" },
    { id: 2, name: "Smartphone ABC", price: "₹30,000" }
  ];
}

async function comparePrices(productName) {
  // Dummy comparison data
  return {
    product: productName,
    flipkart: "₹24,999",
    amazon: "₹25,499",
    croma: "₹25,200"
  };
}

function getCartSummary(cart) {
  if (!cart.length) return "Your cart is empty.";
  return `You have ${cart.length} items in your cart. Total: ₹${cart.reduce((sum, p) => sum + p.price, 0)}`;
}

// In-memory cart
let cart = [];

// Load API Config
function loadApiConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY environment variable not set.");

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const apiUrl = `https://api.openai.com/v1/chat/completions`;
  return { apiUrl, apiKey, model };
}

// Function calling handler (parses model reply)
async function handleFunctionCall(response) {
  response = response.toLowerCase();

  if (response.includes("search_products")) {
    const match = response.match(/search_products\((.*)\)/);
    if (match) {
      const query = match[1].replace(/['"]/g, "");
      return await searchProducts(query);
    }
  } else if (response.includes("compare_prices")) {
    const match = response.match(/compare_prices\((.*)\)/);
    if (match) {
      const productName = match[1].replace(/['"]/g, "");
      return await comparePrices(productName);
    }
  } else if (response.includes("add_to_cart")) {
    const match = response.match(/add_to_cart\((.*)\)/);
    if (match) {
      const productName = match[1].replace(/['"]/g, "");
      const item = { name: productName, price: 5000 }; // dummy price
      cart.push(item);
      return `${productName} added to your cart.`;
    }
  } else if (response.includes("cart_summary")) {
    return getCartSummary(cart);
  }

  return null;
}

// Chat loop
async function chat() {
  const { apiUrl, apiKey, model } = loadApiConfig();

  console.log("\n============================");
  console.log(" Welcome to SmartCart (Function Calling Demo)");
  console.log("============================\n");
  console.log("Try:\n  search_products('smartphone')\n  compare_prices('iPhone 14')\n  add_to_cart('iPhone 14')\n  cart_summary\nType 'exit' to quit.\n");

  process.stdin.setEncoding("utf-8");
  process.stdin.on("data", async (userInput) => {
    userInput = userInput.trim();
    if (userInput.toLowerCase() === "exit" || userInput.toLowerCase() === "quit") {
      console.log("Goodbye! SmartCart session ended.");
      process.exit();
    }

    const payload = {
      model: model,
      messages: [
        { role: "system", content: "You are SmartCart, an AI shopping assistant. You can call functions like search_products, compare_prices, add_to_cart, and cart_summary." },
        { role: "user", content: userInput }
      ]
    };

    try {
      const resp = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        console.error(`Error: ${resp.status} - ${resp.statusText}`);
        const errData = await resp.text();
        console.error("Details:", errData);
        return;
      }

      const data = await resp.json();
      const reply = data.choices[0].message.content;
      console.log(`SmartCart: ${reply}`);

      // Handle function calling
      const result = await handleFunctionCall(reply);
      if (result) {
        console.log(`[Function result]:`, result, "\n");
      }

    } catch (err) {
      console.error("Error communicating with SmartCart:", err);
    }
  });
}

chat();
