// ==============================
// SMARTCART – CHAT DEMO
// ==============================
import 'dotenv/config';
import fetch from "node-fetch";

// Load API configuration
function loadApiConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY environment variable not set.");

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  
  return {  apiKey, model };
}

// Example SmartCart functions (optional, can expand later)
async function searchProducts(query) {
  // Placeholder for product search
  return [
    { name: "boAt Nirvanaa 751 ANC", price: "₹4999", rating: 4.4, buy_link: "https://www.amazon.in/dp/B09XYZ123" },
    { name: "Noise Cancelling Headphones 700", price: "₹4790", rating: 4.5, buy_link: "https://www.flipkart.com/item456" }
  ];
}

// Chat loop
async function chat() {
  const {  apiKey, model } = loadApiConfig();

  console.log("\n============================");
  console.log(" Welcome to SmartCart Chat Demo");
  console.log("============================\n");
  console.log("Type your message or 'exit' to quit.\n");

  process.stdin.setEncoding("utf-8");
  process.stdin.on("data", async (userInput) => {
    userInput = userInput.trim();
    if (userInput.toLowerCase() === "exit" || userInput.toLowerCase() === "quit") {
      console.log("Goodbye! Happy shopping!");
      process.exit();
    }

    // Build payload
    const payload = {
      model: model,
      messages: [
        {
          role: "system",
          content: "You are SmartCart, a friendly AI shopping assistant for electronics and gadgets. Answer concisely and provide product recommendations when appropriate."
        },
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
      console.log("SmartCart:", reply);

      // Optional: if reply contains a function call, you can parse & run here
      // e.g., searchProducts("headphones") → console.log(result)

    } catch (err) {
      console.error("Error communicating with SmartCart:", err);
    }
  });
}

chat();
