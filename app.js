const express = require('express');
const app = express();
const cors = require('cors')
const dynamoose = require('dynamoose');
const uuid = require('uuid');
const port = 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const Todo = dynamoose.model('ToDo', {
  id: String,
  title: String,
  isCompleted: Boolean
});

app.get('/', (req, res) => {
  res.send("This is the root path");
});

app.get('/todo/:id', (req, res) => {
  Todo.get(req.params.id).then(response => {
    res.send(`Got: ${response.title}`)
  })
});

app.get('/todo', (req, res) => {
  Todo.scan().exec((err, response) => {
    res.send(response)
  });
});

app.post('/todo', (req, res) => {
  const newToDo = new Todo({
    id: uuid(),
    title: req.body.title,
    isCompleted: false
  });
  newToDo.save().then(response => {
    res.send(response)
    console.log('Saved successfully')
  });
});

app.put('/todo/:id', (req, res) => {
  const toUpdate = {
    id: req.params.id,
    title: req.body.title,
    isCompleted: req.body.isCompleted
  }
  Todo.update(toUpdate, () => {
    res.sendStatus(200);
    console.log('Update successful');
  })
});

app.delete('/todo/:id', (req, res) => {
  Todo.delete(req.params.id).then(() => {
    res.sendStatus(200);
    console.log(`Deleted ${req.params.id} successfully`)
  });
});

app.delete('/todo/delete/completed', (req, res) => {
  Todo.scan('isCompleted').eq(true).exec((err, completedToDos) => {
    Todo.batchDelete(completedToDos, () => {
      res.sendStatus(200);
      console.log('Batch deleted successfully');
    })
  })
});

app.delete('/todo', (req, res) => {
  Todo.scan().exec((err, response) => {
    Todo.batchDelete(response).then(() => {
      res.sendStatus(200);
      console.log('Deleted all');
    })
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})
