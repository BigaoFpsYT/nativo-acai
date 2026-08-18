# Nativo Açaí

Loja demonstrativa em `index.html` com carrinho, checkout, painel administrativo e assistente Nati.

## Rodar com backend

1. Instale o Node.js 18 ou mais recente.
2. Execute `npm install`.
3. Copie `.env.example` para `.env`.
4. Defina o provedor na variável `AI_PROVIDER` (`openai` ou `custom`).
5. Preencha `AI_API_KEY`, `AI_BASE_URL` e `AI_MODEL` no `.env` apenas se quiser usar um provedor de IA.
6. Execute `npm start` e abra `http://localhost:3000`.

Sem chave de IA, o endpoint continua funcionando com respostas locais. Com chave, o backend chama uma API compatível com OpenAI. A chave nunca vai para o navegador.

## Provedores suportados

- `openai`: padrão; usa `https://api.openai.com/v1` com cabeçalho `Authorization: Bearer <token>`.
- `custom`: permite apontar qualquer provedor compatível com OpenAI por meio de `AI_BASE_URL` e `AI_MODEL`.

## Frontend sem backend

O `index.html` continua abrindo diretamente e mantém o assistente local. O fallback permite publicar a vitrine estática enquanto o backend é hospedado separadamente.

## Próximas integrações de produção

- banco de dados para produtos, clientes e pedidos;
- autenticação real e autorização no servidor;
- gateway de pagamento;
- cálculo de frete e webhook de status;
- validação de entrada e limites de uso da IA.
