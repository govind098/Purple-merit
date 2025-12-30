const request = require('supertest');
const app = require('../server');

describe('POST /api/auth/signup', () => {
    it('should register a new user', async () => {
        const unique = Date.now();
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                fullName: 'Integration Test',
                email: `itest${unique}@example.com`,
                password: 'Password1',
                confirmPassword: 'Password1'
            })
            .set('Accept', 'application/json');

        // Log response for debugging
        console.log('RESPONSE STATUS', res.status);
        console.log('RESPONSE BODY', JSON.stringify(res.body, null, 2));

        expect(res.status).not.toBe(500);
    }, 20000);
});
