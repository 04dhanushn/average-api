
const request = require('supertest');
const { createApp } = require('../src/app');

describe('POST /average', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test('returns the first number as the average', async () => {
    const response = await request(app)
      .post('/average')
      .send({ number: 10 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      average: 10,
      count: 1
    });
  });

  test('calculates the running average', async () => {
    await request(app).post('/average').send({ number: 10 });
    await request(app).post('/average').send({ number: 20 });

    const response = await request(app)
      .post('/average')
      .send({ number: 30 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      average: 20,
      count: 3
    });
  });

  test('handles negative numbers and zero', async () => {
    await request(app).post('/average').send({ number: -10 });

    const response = await request(app)
      .post('/average')
      .send({ number: 0 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      average: -5,
      count: 2
    });
  });

  test('rejects a missing number', async () => {
    const response = await request(app)
      .post('/average')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('rejects a string instead of a number', async () => {
    const response = await request(app)
      .post('/average')
      .send({ number: '10' });

    expect(response.status).toBe(400);
  });

  test('does not include invalid input in the average', async () => {
    await request(app).post('/average').send({ number: 10 });

    const invalidResponse = await request(app)
      .post('/average')
      .send({ number: null });

    expect(invalidResponse.status).toBe(400);

    const response = await request(app)
      .post('/average')
      .send({ number: 20 });

    expect(response.body).toEqual({
      average: 15,
      count: 2
    });
  });
});

