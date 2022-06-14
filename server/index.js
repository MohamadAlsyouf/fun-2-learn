require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const app = express();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.get('/api/letters', async (req, res) => {
  const sql = `
    select *
      from "letters"
     order by "letterId"
  `;
  try {
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.get('/api/words', async (req, res) => {
  const sql = `
    select *
      from "words"
    order by "letterId"
  `;
  try {
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occured'
    });
  }
});

app.get('/api/colors', async (req, res) => {
  const sql = `
    select *
      from "colors"
    order by "colorId"
  `;
  try {
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occured'
    });
  }
});

app.get('/api/numbers', async (req, res) => {
  const sql = `
    select *
      from "numbers"
    order by "numberId"
  `;
  try {
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occured'
    });
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
