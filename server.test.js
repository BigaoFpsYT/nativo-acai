const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizeProviderConfig } = require('./server.js');

test('uses OpenAI-compatible defaults for the default provider', () => {
  const cfg = normalizeProviderConfig({
    AI_PROVIDER: 'openai',
    AI_BASE_URL: 'https://api.openai.com/v1',
    AI_MODEL: 'gpt-4o-mini',
    AI_API_KEY: 'secret'
  });

  assert.equal(cfg.provider, 'openai');
  assert.equal(cfg.baseUrl, 'https://api.openai.com/v1');
  assert.equal(cfg.model, 'gpt-4o-mini');
  assert.equal(cfg.headers.Authorization, 'Bearer secret');
});

test('keeps custom providers openai-compatible when base URL is provided', () => {
  const cfg = normalizeProviderConfig({
    AI_PROVIDER: 'custom',
    AI_BASE_URL: 'https://my-proxy.example/v1',
    AI_MODEL: 'custom-model',
    AI_API_KEY: 'custom-secret'
  });

  assert.equal(cfg.provider, 'custom');
  assert.equal(cfg.baseUrl, 'https://my-proxy.example/v1');
  assert.equal(cfg.model, 'custom-model');
  assert.equal(cfg.headers.Authorization, 'Bearer custom-secret');
});
