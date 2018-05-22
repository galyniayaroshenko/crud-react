import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { serverPort } from './etc/config.json';

import * as db from './utils/DataBaseUtils';

const app = express();

db.setUpConnection();

app.use( bodyParser.json() );

app.use(cors({ origin: '*' }));

app.get('/todo', (req, res) => {
  db.listTodos().then(data => res.send(data));
});

app.post('/todo', (req, res) => {
  db.createTodo(req.body).then(data => res.send(data));
});

app.post('/todo/:id', (req, res) => {
  db.updateTodo(req.body, (result) => {
    res.send(result);
  });
});

app.delete('/todo/:id', (req, res) => {
  db.deleteTodo(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, () => {
  console.log(`Server is up and running on port ${serverPort}`);
});
