const path = require("path");
const http = require("http");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const port = Number(process.env.PORT || 3000);
const aiBaseUrl = String(process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
const aiModel = process.env.AI_MODEL || "gpt-4o-mini";
const maxBodySize = 32 * 1024;

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", chunk => {
      body += chunk;
      if (Buffer.byteLength(body) > maxBodySize) {
        reject(new Error("Payload too large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch (_) { reject(new Error("Invalid JSON")); }
    });
    request.on("error", reject);
  });
}

function localReply(message) {
  const text = String(message || "").toLowerCase();
  if (text.includes("entrega") || text.includes("prazo")) return "A previsão demonstrativa é de 30 a 50 minutos.";
  if (text.includes("sem açúcar") || text.includes("sem acucar") || text.includes("zero")) return "Temos o Açaí Zero no cardápio. Confira os ingredientes antes de pedir se você tiver alguma restrição.";
  if (text.includes("cupom") || text.includes("desconto")) return "Use o cupom PRIMEIRO5 para R$ 5 de desconto no primeiro pedido.";
  return "Posso ajudar com cardápio, personalização, entrega, pagamento, cupom e status do pedido.";
}

async function askAi(payload) {
  if (!process.env.AI_API_KEY) return localReply(payload.message);
  const response = await fetch(`${aiBaseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.AI_API_KEY}` },
    body: JSON.stringify({
      model: aiModel,
      temperature: 0.3,
      max_tokens: 180,
      messages: [
        { role: "system", content: "Você é a Nati, assistente de uma loja brasileira de açaí. Responda em português do Brasil, de forma curta e útil. Não invente preços, prazos ou ingredientes." },
        { role: "user", content: String(payload.message || "").slice(0, 1000) }
      ]
    })
  });
  if (!response.ok) throw new Error(`AI provider returned ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || localReply(payload.message);
}

const server = http.createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/api/health") return sendJson(response, 200, { ok: true, aiConfigured: Boolean(process.env.AI_API_KEY) });
  if (request.method === "POST" && request.url === "/api/ai/chat") {
    try {
      const payload = await readJson(request);
      const reply = await askAi(payload);
      return sendJson(response, 200, { reply });
    } catch (error) {
      console.error(error.message);
      return sendJson(response, 502, { error: "O assistente está temporariamente indisponível." });
    }
  }
  if (request.method === "GET") {
    const requestedPath = request.url === "/" ? "/index.html" : request.url;
    const filePath = path.join(__dirname, requestedPath.split("?")[0]);
    if (filePath === path.join(__dirname, "index.html") && fs.existsSync(filePath)) {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return fs.createReadStream(filePath).pipe(response);
    }
  }
  sendJson(response, 404, { error: "Not found" });
});

server.listen(port, () => console.log(`Nativo Açaí em http://localhost:${port}`));
