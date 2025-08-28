
# 📘 SmartCart – Conversational E-Commerce Agent

![SmartCart Logo](https://img.shields.io/badge/SmartCart-AI%20Shopping%20Assistant-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Node.js](https://img.shields.io/badge/Backend-Node.js-orange)
![React](https://img.shields.io/badge/Frontend-React-blue)

SmartCart is an **intelligent, chat-based shopping assistant** designed to help users **discover, compare, and purchase electronics and gadgets effortlessly**.  
Powered by **AI + real-time data retrieval**, SmartCart provides instant, relevant, and personalized product recommendations.

---

## 🚀 How SmartCart Helps

SmartCart interacts like a human assistant:

- Understands **user preferences**: budget, brand, rating, use-case  
- Fetches **real-time product listings** from multiple platforms  
- Provides **structured JSON outputs** for easy frontend rendering  
- Supports **function calling**: compare prices, add to cart, fetch reviews  

**Example Conversation**:

```

User: "Show me the best noise-canceling headphones under ₹5000."
SmartCart: (Fetches results from Amazon, Flipkart & Smartprix, ranks by rating)

````

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (chat interface, mobile responsive) |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| AI | OpenAI GPT-4.1-mini (Zero-Shot, One-Shot, Multi-Shot prompting) |
| RAG Layer | Amazon API, Flipkart API, Smartprix |

---

## 🔄 Architecture Flow

```mermaid
graph TD
A[User Query] --> B[SmartCart AI]
B --> C[Intent Extraction]
C --> D[Function Calling / API Fetch]
D --> E[Structured JSON Output]
E --> F[Frontend Chat UI]
````

---

## 🧠 Core AI Concepts

### 1️⃣ System Prompt

Defines SmartCart’s personality:
*"You are a helpful shopping assistant for electronics and gadgets. Provide concise, actionable, and friendly responses."*

### 2️⃣ User Prompt

Users interact naturally:
*"Find me a gaming mouse under ₹2000 with RGB lights."*
SmartCart extracts **category, price, brand, use-case, ratings, stock**.

### 3️⃣ Prompting Approaches

| Type       | Description                                      | Example                                                                       |
| ---------- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| Zero-Shot  | No prior examples; pure AI inference             | "Find me a Bluetooth speaker under ₹2000."                                    |
| One-Shot   | One example provided before user query           | "Example: Find a laptop under ₹40,000 → User: Find a smartwatch under ₹5000." |
| Multi-Shot | Multiple examples before query → higher accuracy | Several sample Q\&A pairs guiding AI                                          |

### 4️⃣ Tuning Parameters

* **Budget** (₹5000, ₹10000, etc.)
* **Brand** (Sony, boAt, Logitech)
* **Use Case** (gaming, travel, work)
* **Rating Threshold** (4+ stars)
* **Stock / Delivery status**

### 5️⃣ Structured Output (JSON)

```json
{
  "results": [
    {
      "name": "boAt Nirvanaa 751 ANC",
      "price": "₹4999",
      "rating": 4.4,
      "buy_link": "https://www.amazon.in/dp/B09XYZ123"
    },
    {
      "name": "Noise Cancelling Headphones 700",
      "price": "₹4790",
      "rating": 4.5,
      "buy_link": "https://www.flipkart.com/item456"
    }
  ]
}
```

### 6️⃣ Function Calling

| Intent           | Function                            |
| ---------------- | ----------------------------------- |
| Compare products | `comparePrices(product1, product2)` |
| View reviews     | `fetchReviews(productName)`         |
| Buy / Save       | `addToCart(productId)`              |

### 7️⃣ RAG (Retrieval-Augmented Generation)

SmartCart pulls **live data** from:

* Flipkart API
* Amazon Product Advertising API
* Price comparison sites: Smartprix, PriceDekho

Ensures **real-time prices, ratings, and stock availability**.

---

## 💬 Demo

**User Query:**

```
Find me a wireless gaming keyboard under ₹3000
```

**SmartCart Response:**

```json
{
  "results": [
    {
      "name": "Redragon K530 Draconic",
      "price": "₹2899",
      "rating": 4.3,
      "buy_link": "https://www.amazon.in/dp/ABC123"
    }
  ]
}
```

---

## 🌟 Key Benefits

* ✅ **Conversational Shopping** – skip endless browsing
* ✅ **AI Personalization** – recommendations tailored to you
* ✅ **Fast Comparisons** – prices, specs, reviews instantly
* ✅ **One-Click Actions** – add to cart, view deals, buy
* ✅ **Real-Time Data** – always accurate and relevant

---

## 🚀 Future Scope

* 🎙️ Voice-enabled assistant
* 🌍 Multi-language support
* 🤖 Personalized recommendations via user history
* 📱 Mobile app integration
* 📊 Analytics dashboard: track popular products and trends

---

## 🙌 Contributions Welcome!

Contribute by submitting pull requests or reporting issues. Let’s make SmartCart smarter together!

---

