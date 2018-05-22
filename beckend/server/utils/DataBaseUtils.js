import mongoose from 'mongoose';
import '../models/Todo';

import config from '../etc/config.json';

const Todo = mongoose.model('Todo');

export function listTodos(id) {
  return Todo.find();
}

export function createTodo(data) {
  const todo = new Todo({
    title: data.title,
    completed: false
  });

  return todo.save();
}

export function updateTodo(body, cb) {
  let returnObj;

  Todo.findByIdAndUpdate(body._id, {$set: body}, err => {
    if (err) {
      returnObj = { data: null, status: {success: null, error: err.massage} };
      cb(returnObj);
    } else {
      Todo.findOne({_id: body._id}, {}, function (err, data) {
        if (err) {
          return cb({ success: null, error: err.message });
        } else {
          return cb({ data: body, status: {success: 'playlist was updates', error: null} });
        }
      });
    }
  });
}

export function deleteTodo(id) {
  return Todo.findById(id).remove();
}

export function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}
