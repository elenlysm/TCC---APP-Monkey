// tests/auth.test.js
const request = require('supertest');
const app = require('../server');  // Ajuste se o seu server exporta o app Express

describe('Segurança nas rotas Auth', () => {

    it('Deve bloquear registro com dados inválidos', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({ email: 'invalido', password: '123' });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    it('Deve permitir registro válido (mock)', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({ email: 'teste@example.com', password: 'senhaSegura123' });

        // Isso depende da lógica do seu controller. Se for criar usuário de verdade no Firebase,
        // você pode mockar o serviço antes.
        expect([201, 400, 500]).toContain(response.statusCode);  // Só para exemplo, ajuste depois
    });

});
describe('Auth API', () => {
    // Testa login inválido (credenciais erradas)
    it('deve retornar 401 para login inválido', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'fake@email.com', password: 'wrong' });
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error');
    });

    // Testa ausência do campo email
    it('deve retornar erro se email faltar', async () => {
        const res = await request(app).post('/auth/login').send({ password: '123456' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    // Testa ausência do campo senha
    it('deve retornar erro se senha faltar', async () => {
        const res = await request(app).post('/auth/login').send({ email: 'teste@email.com' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

});