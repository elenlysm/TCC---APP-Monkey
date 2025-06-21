const admin = require('firebase-admin');
//Importa o SDK Admin do Firebase para uso no servidor

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
}); //Inicializa o app Firebase Admin com as credenciais padrão da aplicação

const db = admin.firestore(); //Cria uma instância do Firestore para manipulação do banco de dados NoSQL do Firebase
module.exports = admin; //Exporta o objeto admin para ser usado em outros módulos da aplicação

