import {buildApp} from '../src/app';
import request from 'supertest';

describe('app', () => {
  function app() {
    return buildApp();
  }

  it('serves an index page', async () => {
    await request(app().get('/'))
      .expect(200);
  })
});