const app = require('./server');
//Importa a aplicação Express (ou similar) exportada do arquivo 'server.js'

const PORT = process.env.PORT || 'http://localhost:8081'; //Define a porta que o servidor vai usar para escutar as requisições

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`)); //Inicia o servidor escutando na porta definida e exibe mensagem no console quando estiver rodando
