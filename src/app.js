import express from 'express';

export function buildApp() {
  const app = express();
  app.get ('/', (req, res, next) => {
    res.status(200);
  });
  return app;
}