const express = require('express');
const app = express();
const dynamoose = require('dynamoose');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const Todo = dynamoose.model('ToDo', {
  id: Number,
  title: String,
  isCompleted: Boolean
});

app.get('/', (req, res) => {
  res.send("Hello Kotaro from express");
});

app.get('/todo/:id', (req, res) => {
  Todo.get(req.params.id).then(response => {
    res.send('Got: ' + response.title)
  })
});

app.get('/todo', (req, res) => {
  Todo.scan().exec((err, response) => {
    res.send(response)
  });
});

app.post('/todo', (req, res) => {
  const newToDo = new Todo({
    id: 3,
    title: req.body.title,
    isCompleted: false
  });
  newToDo.save();
});

app.delete('/todo/:id', (req, res) => {
  Todo.delete(req.params.id);
});

app.delete('/todo', (req, res) => {

});

app.listen(port, () => {
  console.log("Hi Kotaro, listening on " + port);
})
