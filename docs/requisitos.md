# Requisitos do Projeto - Monkey

## Resumo do Projeto
Aplicativo mobile desenvolvido com React Native e Expo Router, com diferencial na funcionalidade de coabitação e integração com OpenFinance.

## Funcionalidades Essenciais
- **Autenticação:** Login e cadastro via Firebase Authentication.
- **Navegação:** React Navigation e Expo Router, com Stack Navigator e rotas organizadas.
- **Dashboard:** Visualização de gráficos (react-native-chart-kit), estrutura pronta para integração com OpenFinance.

## Diferenciais do Aplicativo
- **Coabitação:** (detalhar como será a divisão de despesas, permissões, etc)
- **Integração com OpenFinance:** Conexão com dados financeiros reais.

## Dependências Principais
- Firebase (`firebase`)
- Expo Router (`expo-router`)
- React Navigation (`@react-navigation/*`)
- React Native Chart Kit (`react-native-chart-kit`)
- React Native Webview (`react-native-webview`)

## Configurações Importantes

### .env
Variáveis de ambiente para Firebase:
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

### babel.config.js
- Plugin `module:react-native-dotenv` configurado para ler `.env`.
- Alias `@` configurado para facilitar importações a partir da pasta `/app`.

## Estrutura de Pastas
- `/app` — Telas e componentes principais.
- `/scripts` — Scripts auxiliares (ex.: reset-project.js).
- `/design` — Recursos visuais.
- `/backend` — Lógica de backend.
- `/firebase` — Configurações de integração com Firebase.

## Pontos de Atenção
- `allowUndefined` no dotenv configurado como `true`: cuidado para não omitir informações críticas.
- `.env` e `google-services.json` já ignorados no `.gitignore`.
- Uso de TypeScript com `strict` ativado — atenção com tipagens!

## Prioridades até o prazo
- Autenticação funcionando.
- Navegação completa entre telas.
- Estrutura da dashboard criada.
- Coabitação e OpenFinance: preparar estrutura inicial.