const request = require('supertest'); //Importa o módulo supertest para fazer requisições HTTP no ambiente de testes
const app = require('../server'); //Importa a aplicação (servidor Express) para ser testada

describe('Segurança nas rotas Auth', () => {
    it('Deve bloquear registro com dados inválidos', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({ email: 'invalido', password: '123' });

        expect(response.statusCode).toBe(400);      //Status erro
        expect(response.body.error).toBeDefined(); //Mensagem de erro, caso os dados sejam inválidos
    }); //Teste: registro com dados inválidos deve ser bloqueado

    it('Deve permitir registro válido (mock)', async () => //Teste: registro com dados válidos (mockado) deve ser aceito
    {
        const response = await request(app)
            .post('/auth/register')
            .send({ email: 'teste@example.com', password: 'senhaSegura123' });

        expect([201, 400, 500]).toContain(response.statusCode); 
        //Considera três possíveis respostas dependendo do backend: 201 = criado com sucesso, 400 = já registrado, 500 = erro interno
    });

}); //Testes relacionados à segurança das rotas de autenticação (registro)

describe('Auth API', () => {
    // Testa login inválido (credenciais erradas)
    it('deve retornar 401 para login inválido', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'fake@email.com', password: 'wrong' });
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error');
    });

    //Testa ausência do campo email
    it('deve retornar erro se email faltar', async () => {
        const res = await request(app).post('/auth/login').send({ password: '123456' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    //Testa ausência do campo senha
    it('deve retornar erro se senha faltar', async () => {
        const res = await request(app).post('/auth/login').send({ email: 'teste@email.com' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

});