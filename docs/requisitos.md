    Requisitos do Projeto - Monkey

    Resumo do Projeto
Aplicativo mobile desenvolvido com React Native e Expo Router, que tem como diferencial a funcionalidade de coabitação e a integração com OpenFinance.

     Funcionalidades Essenciais
    Autenticação
 Integração com Firebase Authentication.
 Funcionalidade de Login.
 Funcionalidade de Cadastro.

     Navegação
 Sistema de navegação entre telas utilizando React Navigation e Expo Router.
 Configuração de pilha de navegação (Stack Navigator).
 Rotas de autenticação e dashboard organizadas.

     Dashboard
 Tela de Dashboard implementada (mesmo sem dados reais inicialmente).
 Estrutura básica pronta para receber integração com OpenFinance.
 Visualização de gráficos (utilizando react-native-chart-kit).

     Diferenciais do Aplicativo
 Funcionalidade de Coabitação — destaque do app, ainda a ser detalhada.
 Integração com OpenFinance — permitirá conexão com dados financeiros reais.

     Dependências principais
 Firebase (firebase)
 Expo Router (expo-router)
 React Navigation (@react-navigation/*)
 React Native Chart Kit (react-native-chart-kit)
 React Native Webview (react-native-webview)

     Configurações Importantes
 .env
     Variáveis de ambiente para Firebase:
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID

     babel.config.js
 Plugin module:react-native-dotenv configurado para ler .env.

Alias @ configurado para facilitar importações a partir da pasta /app.

     Estrutura de Pastas
 /app — Telas e componentes principais.
 /scripts — Scripts auxiliares, ex.: reset-project.js.
 /design — Recursos visuais.
 /backend — (futuro) Lógica de backend.
 /firebase — Configurações de integração com Firebase.

     Pontos de Atenção
allowUndefined no dotenv configurado como true: aceitará variáveis não definidas, cuidado para não omitir informações críticas.

.env e google-services.json já ignorados no .gitignore.

Uso de TypeScript com strict ativado — atenção com tipagens!

     Prioridades até o prazo
     Autenticação funcionando.y
     Navegação completa entre telas.
     Estrutura da dashboard criada.
     Coabitação e OpenFinance: preparar estrutura inicial.