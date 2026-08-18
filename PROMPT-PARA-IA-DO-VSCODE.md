# O que pedir pra IA do VS Code

Abra a pasta com o `index.html` no VS Code, abra o chat da IA (Copilot ou similar) e cole isto:

---

Tenho uma loja em `index.html` (HTML + CSS + JS) e um backend Node em `server.js`. O frontend possui fallback local, e o backend expõe `/api/ai/chat` para a assistente Nati sem expor a chave da IA.

Quero me ajudar a evoluir e publicar o projeto com segurança.

Me ajude a:
1. Inicializar um repositório git nesta pasta
2. Criar o repositório no GitHub (ou me diga o comando/passo pra eu criar)
3. Fazer commit e push dos arquivos do projeto
4. Explicar que GitHub Pages publica somente o frontend estático; orientar a hospedar `server.js` em um serviço Node separado
5. Configurar as variáveis `AI_API_KEY`, `AI_BASE_URL` e `AI_MODEL` no servidor, sem colocar segredo no frontend
6. Me dar a URL final do frontend e a URL do backend

Antes de publicar, rode `npm install` e `npm start` para testar `http://localhost:3000` e `http://localhost:3000/api/health`.

---

## Se a IA pedir pra você rodar comandos no terminal

Ela pode sugerir algo como:

```bash
git init
git add index.html
git commit -m "Primeira versão do site"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

Antes disso, você precisa:
1. Ter o **Git** instalado no PC (se não tiver, baixe em git-scm.com — a IA pode confirmar se já está instalado)
2. Ter uma conta gratuita no **github.com**
3. Criar um repositório novo vazio lá no site do GitHub (botão verde "New repository"), e copiar o link dele (termina em `.git`) pra usar no comando `git remote add origin ...`

## Depois do push

No GitHub, vá em: **Settings** (do repositório) → **Pages** → em "Source" escolha a branch `main` e a pasta `/ (root)` → Save.

Em alguns minutos, o site fica disponível em:
`https://BigaoFpsYT.github.io/NOME-DO-REPOSITORIO/`

Para o teste local do login Google, use `http://localhost:3000`. Depois de publicar, adicione também `https://BigaoFpsYT.github.io` nas origens JavaScript autorizadas do cliente OAuth.

## Sobre o login com Google

Depois que tiver essa URL do GitHub Pages, volta aqui comigo que eu te ajudo a configurar o Client ID do Google com ela (é o único passo que falta pra ativar o "Continuar com Google").
