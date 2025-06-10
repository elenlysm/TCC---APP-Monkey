// tests/auth.test.js
const request = require('supertest');
const app = require('../app'); // seu arquivo principal do Express

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

    // Exemplo de teste para login válido (ajuste conforme seu ambiente)
    // it('deve fazer login com sucesso', async () => {
    //     const res = await request(app)
    //         .post('/auth/login')
    //         .send({ email: 'usuario@valido.com', password: 'senhaValida' });
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body).toHaveProperty('token');
    // });
});