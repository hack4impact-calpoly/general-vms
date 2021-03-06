import app from '../src/server';
import supertest from 'supertest';

it('GET /test', async () => {
  const message = 'Hi there!';

  await supertest(app).get('/test/')
    .expect(200)
    .then((response) => {
      expect(response.text).toBe(message);
    });
});
