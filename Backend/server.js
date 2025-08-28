const express = require('express');
const axios = require('axios');
const Ajv = require('ajv').default;

const app = express();
app.use(express.json());

const resultsSchema = {
  type: "object",
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          price_in_inr: { type: "number" },
          price_display: { type: "string" },
          rating: { type: "number" },
          buy_link: { type: "string", format: "uri" },
          features: { type: "array", items: { type: "string" } }
        },
        required: ["id","name","price_in_inr","price_display","rating","buy_link"]
      }
    },
    meta: {
      type: "object",
      properties: {
        query: { type: "string" },
        count: { type: "integer" }
      },
      required: ["query","count"]
    }
  },
  required: ["results","meta"]
};

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(resultsSchema);

app.post('/smartcart/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "query required" });

    const messages = [
      { role: "system", content: "You are a helpful shopping assistant that MUST return only JSON conforming to the provided schema." },
      { role: "user", content: `Find top 3 headphones for: "${query}". Output must conform exactly to the JSON schema.`}
    ];

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const apiResp = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-5-thinking-mini",
      messages,
      temperature: 0.0,
      max_tokens: 800
    }, {
      headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
    });

    const assistantText = apiResp.data.choices[0].message.content.trim();

    let parsed;
    try {
      parsed = JSON.parse(assistantText);
    } catch (err) {
      return res.status(502).json({ error: "LLM did not return valid JSON", raw: assistantText });
    }

    const valid = validate(parsed);
    if (!valid) {
      return res.status(422).json({ error: "Validation failed", details: validate.errors, parsed });
    }

    return res.json(parsed);

  } catch (err) {
    console.error(err?.response?.data || err.message);
    return res.status(500).json({ error: "internal_error", details: err?.message });
  }
});

app.listen(3000, () => console.log("Server listening on http://localhost:3000"));
