import express from 'express';
import morgan from 'morgan';

export function buildApp() {
  const app = express();
  app.use(morgan('dev'));
  app.get ('/', (req, res) => {
    console.log('FFF@')
    res.status(200)
    return res.send('OK')
  });
  return app;
}
