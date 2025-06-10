// tests/auth.test.js
const request = require('supertest');
const app = require('../app'); // seu arquivo principal do Express

describe('Auth API', () => {
    it('deve retornar 401 para login inválido', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'fake@email.com', password: 'wrong' });
        expect(res.statusCode).toBe(401);
    });

    it('deve retornar erro se email faltar', async () => {
        const res = await request(app).post('/auth/login').send({ password: '123456' });
        expect(res.statusCode).toBe(400);
    });
});