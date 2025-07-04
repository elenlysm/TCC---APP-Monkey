# App Gestão Financeira - Open Finance

Aplicativo de gestão financeira pessoal com integração à API Open Finance Brasil. Permite importação automática de transações bancárias, organização das finanças pessoais e divisão inteligente de despesas entre usuários, com foco em privacidade e segurança.

## Índice
(#app-gestão-financeira---open-finance)
- [App Gestão Financeira - Open Finance](#app-gestão-financeira---open-finance)
  - [Índice](#índice)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Funcionalidades Principais](#funcionalidades-principais)
  - [Links Importantes](#links-importantes)
  - [Como rodar o projeto](#como-rodar-o-projeto)
    - [Pré-requisitos](#pré-requisitos)
    - [Instalação](#instalação)
  - [Estrutura do projeto](#estrutura-do-projeto)
    - [Contato](#contato)

## Tecnologias Utilizadas
- React Native + Expo (Frontend)
- Node.js + Express.js (Backend)
- Firebase (Autenticação, banco de dados, notificações)
- API Open Finance Brasil (Integração bancária)

## Funcionalidades Principais
- Importação automática de transações via API Open Finance
- Dashboard financeiro com resumo de receitas, despesas e saldo
- Divisão automática de despesas compartilhadas entre usuários
- Criação e acompanhamento de orçamentos por categoria
- Relatórios e gráficos para análise dos hábitos financeiros
- Autenticação tradicional e via Open Finance

## Links Importantes
- [Trello](https://trello.com/invite/b/680d16ea71b8f025636a0452/ATTI1a024ade9969a79415167b8a2adc20240AC89C3E/tcc-backlog-app-de-gestao-financeira)
- [Figma (Protótipo)](https://www.figma.com/design/sYb7WYtJdEMKhdbpxYY7GH/Tela-de-Boas-vindas?m=auto&t=gjKBBIwoPVctMUSE-1)
- [TCC escrito (Word)](https://1drv.ms/w/c/0794fe52de44b057/EUJM_2yH-wVEh-amRTqKhBABiWWrKTOojQnTS-75VhIeBQ?e=f7wvr1)

## Como rodar o projeto

### Pré-requisitos
- Node.js (18.x ou superior)
- npm ou yarn
- Expo CLI (opcional, para rodar o frontend)

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/seuusuario/seurepo.git

# 2. Instalar dependências do frontend
cd app
npm install

# 3. Instalar dependências do backend
cd ../backend
npm install
```

4. Configurar variáveis de ambiente (criar arquivo .env na raiz do frontend e backend conforme documentação)
```bash
#5. Rodar o backend

cd backend
npm start

#6. Rodar o frontend

cd ../app
npm start
```
## Estrutura do projeto

/app      -> Código do frontend React Native + Expo
/backend  -> API Node.js + Express.js
/firebase -> Configurações Firebase (separado)
/design   -> Arquivos de design (Figma, protótipos)
/scripts  -> Scripts auxiliares (ex: reset-project.js)

### Contato

Para dúvidas ou sugestões, entre em contato com o responsável pelo projeto.

@biamelhado 
beatriz.melhado@gmail.com

@elenlysm 
elenfreire63@gmail.com