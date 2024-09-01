import request from 'supertest';
import app from '../src/app';

describe('User API Endpoints', () => {
  test('it should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Furkan Meydan' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Furkan Meydan');
  });
});