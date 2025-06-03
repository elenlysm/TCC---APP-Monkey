# reset-project.js

## Descrição

Script para resetar o projeto Expo/React Native para um estado básico “em branco”.  
Ele move ou deleta as pastas antigas (`/app`, `/components`, `/hooks`, `/constants`, `/scripts`) e cria uma nova pasta `/app` com arquivos iniciais (`index.tsx` e `_layout.tsx`).

Esse script é útil para começar um projeto novo mantendo um backup dos arquivos antigos, caso você opte por mover ao invés de deletar.

---

## Funcionalidades

- Move as pastas antigas para uma pasta de backup (`/app-example`) ou deleta elas completamente.
- Cria uma nova estrutura básica na pasta `/app` para iniciar o desenvolvimento.
- Interativo: pergunta ao usuário se deseja mover ou deletar as pastas antigas.
- Compatível com projetos Expo + TypeScript + Expo Router.

---

## Como usar

1. Garanta que o Node.js está instalado na sua máquina.
2. Coloque o arquivo `reset-project.js` na raiz do seu projeto.
3. No terminal, dê permissão de execução (opcional):

```bash
chmod +x reset-project.js
