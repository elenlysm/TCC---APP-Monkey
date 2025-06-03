#!/usr/bin/env node
// Script para resetar o projeto movendo ou deletando pastas antigas e criando um novo app básico.

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = process.cwd();
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];
const exampleDir = "app-example";
const newAppDir = "app";

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

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

// Cria interface para interação no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função que verifica se uma pasta existe
function dirExists(dirPath) {
  return fs.existsSync(dirPath);
}

// Move uma pasta para a pasta de backup
async function moveDir(src, dest) {
  await fs.promises.mkdir(path.dirname(dest), { recursive: true });
  await fs.promises.rename(src, dest);
  console.log(`➡️ Moved ${src} to ${dest}`);
}

// Deleta uma pasta recursivamente
async function deleteDir(dirPath) {
  await fs.promises.rm(dirPath, { recursive: true, force: true });
  console.log(`❌ Deleted ${dirPath}`);
}

// Cria a nova pasta app e os arquivos básicos
async function createNewApp() {
  const newAppPath = path.join(root, newAppDir);
  if (dirExists(newAppPath)) {
    console.log("⚠️ New /app directory already exists. Overwriting...");
    await deleteDir(newAppPath);
  }

  await fs.promises.mkdir(newAppPath, { recursive: true });
  await fs.promises.writeFile(path.join(newAppPath, "index.tsx"), indexContent);
  console.log("📄 Created app/index.tsx");
  await fs.promises.writeFile(path.join(newAppPath, "_layout.tsx"), layoutContent);
  console.log("📄 Created app/_layout.tsx");
}

// Função principal que executa o reset
async function resetProject(moveInsteadOfDelete) {
  try {
    if (moveInsteadOfDelete) {
      const exampleDirPath = path.join(root, exampleDir);
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 Created /${exampleDir} directory`);
    }

    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      if (dirExists(oldDirPath)) {
        if (moveInsteadOfDelete) {
          const newDirPath = path.join(root, exampleDir, dir);
          await moveDir(oldDirPath, newDirPath);
        } else {
          await deleteDir(oldDirPath);
        }
      } else {
        console.log(`ℹ️ Directory /${dir} does not exist, skipping.`);
      }
    }

    await createNewApp();

    console.log("\n✅ Project reset complete. Next steps:");
    console.log("1. Run `npx expo start` to start the development server.");
    console.log("2. Edit app/index.tsx to customize your main screen.");
    if (moveInsteadOfDelete) {
      console.log(`3. Delete the /${exampleDir} directory when you're done referencing it.`);
    }
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
}

// Pergunta ao usuário qual ação tomar
rl.question(
  "Do you want to move existing files to /app-example instead of deleting them? (Y/n): ",
  (answer) => {
    const moveInsteadOfDelete = answer.trim().toLowerCase() === "" || answer.trim().toLowerCase().startsWith("y");
    resetProject(moveInsteadOfDelete).finally(() => rl.close());
  }
);
// Fecha a interface de leitura quando o script termina
rl.on("close", () => {
  console.log("\nGoodbye!");
  process.exit(0);
});
// Este script é usado para resetar o projeto, movendo ou deletando pastas antigas
// e criando uma nova estrutura básica de app com arquivos iniciais.
// Ele pergunta ao usuário se deseja mover os arquivos antigos para uma pasta de exemplo
// ou deletá-los, e executa a ação escolhida.
// O script cria a nova pasta `app` com os arquivos `index.tsx` e `_layout.tsx`
// contendo conteúdo básico para iniciar o desenvolvimento.
// Ele também exibe instruções para o usuário sobre os próximos passos após o reset.
// O script utiliza o módulo `fs` para manipulação de arquivos e diretórios,
// `path` para manipulação de caminhos, e `readline` para interação no terminal.
// Certifique-se de executar este script na raiz do projeto para que ele funcione corretamente.
// Para executar este script, use o comando: `node scripts/reset-project.js`
// Certifique-se de que o Node.js esteja instalado e configurado corretamente no seu ambiente.