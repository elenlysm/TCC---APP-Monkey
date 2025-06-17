const app = require('./server');
const PORT = process.env.PORT || 'http://localhost:8081';

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
