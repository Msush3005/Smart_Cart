
 **SmartCart – Conversational E-Commerce Agent**

SmartCart is an intelligent, chat-based shopping assistant designed to help users discover, compare, and purchase electronics and gadgets** effortlessly. Powered by AI and real-time data retrieval, SmartCart simplifies online shopping by allowing users to interact naturally through conversation.



**How It Helps**

Users can chat with SmartCart just like they would with a human assistant. By analyzing user input, preferences, and product needs, it quickly finds the most relevant product matches from leading online platforms.

**Example Conversation:**

User: “Show me the best noise-canceling headphones under ₹5000.”
SmartCart: (Fetches results based on budget, feature, and reviews)

---

 **Core AI Concepts Integrated**

**1. System Prompt**

Defines the assistant’s personality and behavior:

*“You are a helpful shopping assistant for electronics and gadgets.”*

This ensures the assistant responds as a knowledgeable, friendly shopping expert.

---

 **2. User Prompt**

Users interact with SmartCart using natural language, such as:

“Find me a gaming mouse under ₹2000 with RGB lights.”

SmartCart extracts key preferences like **category**, **price**, **brand**, or **use case**.

---

 **3. Tuning Parameters**

The assistant tailors its product search based on dynamic filters like:

* **Budget** (e.g., under ₹5000)
* **Brand Preference** (e.g., Sony, boAt)
* **Use Case** (e.g., gaming, work, travel)
* **Rating threshold** (e.g., 4+ stars)
* **Stock/Delivery status**

These parameters ensure personalized and relevant suggestions.

---

 **4. Structured Output**

SmartCart returns results in a clean JSON format, allowing for easy frontend integration and display:

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

Behind the scenes, SmartCart intelligently invokes backend functions based on intent:

| Intent              | Function                            |
| ------------------- | ----------------------------------- |
| Compare two items   | `comparePrices(product1, product2)` |
| View user feedback  | `fetchReviews(productName)`         |
| Buy or save an item | `addToCart(productId)`              |

This enables seamless, interactive actions during the conversation.

---
**6. RAG (Retrieval-Augmented Generation)**
ShopAI enhances its responses using real-time data from multiple sources:
 Flipkart API
 Amazon Product Advertising API
Price comparison platforms (like Smartprix, PriceDekho)
This ensures that product listings, prices, and ratings are always up to date.


**Key Benefits**
 **Conversational Shopping**: No need to browse endlessly—just ask!
 **AI Personalization**: Tailors results based on your needs
 **Fast Comparisons**: Instantly compare models, specs, and reviews
 **One-Click Actions**: Add to cart, view deals, or buy instantly
 **Real-Time Data**: Ensures suggestions are accurate and relevant



