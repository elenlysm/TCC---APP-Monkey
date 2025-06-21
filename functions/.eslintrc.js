module.exports = {
  //Define os ambientes globais: ES6 e Node.js
  env: {
    es6: true,
    node: true,
  },
  //Define a versão do ECMAScript suportada
  parserOptions: {
    ecmaVersion: 2021, // Permite recursos modernos do JS
  },
  //Extende configurações recomendadas do ESLint e do Google
  extends: [
    "eslint:recommended",
    "google",
  ],
  //Regras customizadas do projeto
  rules: {
    //Impede o uso dos globais 'name' e 'length'
    "no-restricted-globals": ["error", "name", "length"],
    //Prefere funções arrow ao invés de function expressions
    "prefer-arrow-callback": "error",
    //Exige uso de aspas duplas, mas permite template literals e escape
    "quotes": ["error", "double", { "allowTemplateLiterals": true, "avoidEscape": true }],
    //Permite console.log em dev, mas avisa em produção
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    //Gera erro se uma função async não usar await
    "require-await": "error"
  },
  //Overrides para arquivos de teste
  overrides: [
    {
      files: ["**/*.spec.*"], //Aplica para arquivos de teste
      env: {
        mocha: true, //Ativa variáveis globais do Mocha
      },
      rules: {}, //Pode adicionar regras específicas para testes aqui
    },
  ],
};
