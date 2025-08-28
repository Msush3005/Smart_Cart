
## 📘 SmartCart – Conversational E-Commerce Agent

SmartCart is an **intelligent, chat-based shopping assistant** designed to help users discover, compare, and purchase electronics and gadgets effortlessly.
Powered by AI and real-time data retrieval, SmartCart simplifies online shopping by allowing users to interact naturally through conversation.

---

### 🚀 How It Helps

Users can chat with SmartCart just like with a human assistant.
By analyzing **user input, preferences, and product needs**, it quickly finds the most relevant product matches from top online platforms.

**Example Conversation**:

```
User: “Show me the best noise-canceling headphones under ₹5000.”
SmartCart: (Fetches results based on budget, features, and reviews)
```

---

### 🧠 Core AI Concepts Integrated

**1. System Prompt**
Defines SmartCart’s personality and behavior:
*"You are a helpful shopping assistant for electronics and gadgets."*

---

**2. User Prompt**
Users interact naturally:
*“Find me a gaming mouse under ₹2000 with RGB lights.”*
SmartCart extracts key preferences like **category**, **price**, **brand**, and **use case**.

---

**3. Tuning Parameters**
Dynamic filters refine results:

* **Budget** (e.g., under ₹5000)
* **Brand** (e.g., Sony, boAt)
* **Use Case** (e.g., gaming, travel)
* **Rating threshold** (e.g., 4+ stars)
* **Stock/Delivery status**

---

**4. Structured Output**
SmartCart responds in clean JSON for frontend integration:

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

---

**5. Function Calling**
SmartCart maps **user intent → backend actions**:

| Intent            | Function                            |
| ----------------- | ----------------------------------- |
| Compare two items | `comparePrices(product1, product2)` |
| View reviews      | `fetchReviews(productName)`         |
| Buy/save an item  | `addToCart(productId)`              |

---

**6. RAG (Retrieval-Augmented Generation)**
SmartCart enhances results using **real-time data** from:

* Flipkart API
* Amazon Product Advertising API
* Price comparison sites (Smartprix, PriceDekho)

This ensures **prices, ratings, and availability** are always fresh.

---

### 🌟 Key Benefits

✅ **Conversational Shopping** – no need to browse endlessly
✅ **AI Personalization** – tailored results
✅ **Fast Comparisons** – specs, prices, reviews in seconds
✅ **One-Click Actions** – add to cart, view deals, buy instantly
✅ **Real-Time Data** – ensures accurate, relevant suggestions

---


