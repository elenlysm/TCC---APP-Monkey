#!/usr/bin/env node
// Permite executar este arquivo diretamente pelo terminal: `node reset-project.js`

/**
 * Script para resetar o projeto para um estado "em branco".
 * Ele move ou deleta as pastas: /app, /components, /hooks, /scripts, /constants.
 * Após isso, cria uma nova pasta /app com os arquivos básicos: index.tsx e _layout.tsx.
 * Você pode apagar este script depois de usá-lo.
 */

// Módulo para operações com o sistema de arquivos
const fs = require("fs");
// Módulo para manipular caminhos de arquivos
const path = require("path");
// Módulo para ler entrada do usuário no terminal
const readline = require("readline");

// Diretório raiz onde o script está rodando
const root = process.cwd();
// Pastas que serão movidas ou deletadas
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];
// Pasta onde as antigas pastas podem ser movidas
const exampleDir = "app-example";
// Nova pasta base que será criada
const newAppDir = "app";
// Caminho completo para app-example
const exampleDirPath = path.join(root, exampleDir);

// Conteúdo básico para o novo app/index.tsx
const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

// Conteúdo básico para o novo app/_layout.tsx
const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

// Interface para interagir com o usuário via terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função principal que move ou deleta as pastas antigas
const moveDirectories = async (moveInsteadOfDelete) => {
  try {
    if (moveInsteadOfDelete) {
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

// Para cada pasta antiga
    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      if (fs.existsSync(oldDirPath)) {
        if (moveInsteadOfDelete) {
          const newDirPath = path.join(exampleDirPath, dir);
          await fs.promises.rename(oldDirPath, newDirPath);
          console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
        } else {
          await fs.promises.rm(oldDirPath, { recursive: true, force: true });
          console.log(`❌ /${dir} deleted.`);
        }
      } else {
        console.log(`ℹ️ /${dir} does not exist, skipping.`);
      }
    }

// Cria nova pasta /app
    const newAppDirPath = path.join(root, newAppDir);
    if (fs.existsSync(newAppDirPath)) {
      console.log("⚠️ New /app directory already exists. Overwriting...");
      await fs.promises.rm(newAppDirPath, { recursive: true, force: true });
    }

// Cria novo app/index.tsx
    const indexPath = path.join(newAppDirPath, "index.tsx");
    await fs.promises.writeFile(indexPath, indexContent);
    console.log("📄 app/index.tsx created.");

// Cria novo app/_layout.tsx
    const layoutPath = path.join(newAppDirPath, "_layout.tsx");
    await fs.promises.writeFile(layoutPath, layoutContent);
    console.log("📄 app/_layout.tsx created.");

    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    console.log("📁 New /app directory created.");

    await fs.promises.writeFile(path.join(newAppDirPath, "index.tsx"), indexContent);
    console.log("📄 app/index.tsx created.");

    await fs.promises.writeFile(path.join(newAppDirPath, "_layout.tsx"), layoutContent);
    console.log("📄 app/_layout.tsx created.");


// Mensagem final com instruções
    console.log("\n✅ Project reset complete. Next steps:");
    console.log(`1. Run \`npx expo start\` to start the development server.`);
    console.log(`2. Edit app/index.tsx to customize your main screen.`);
    if (moveInsteadOfDelete) {
      console.log(`3. Delete the /${exampleDir} directory when you're done referencing it.`);
    }
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

// Pergunta ao usuário o que fazer: mover ou deletar as pastas antigas
rl.question(
  "Do you want to move existing files to /app-example instead of deleting them? (Y/n): ",
  (answer) => {
    const normalizedInput = answer.trim().toLowerCase();
    const moveInsteadOfDelete = normalizedInput === "" || normalizedInput.startsWith("y");

    moveDirectories(moveInsteadOfDelete).finally(() => rl.close());
  }
);

