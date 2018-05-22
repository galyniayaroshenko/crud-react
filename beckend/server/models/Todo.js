import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  id        : { type: Number },
  title     : { type: String, required: true },
  completed     : { type: Boolean }
});

const Todo = mongoose.model('Todo', TodoSchema);
