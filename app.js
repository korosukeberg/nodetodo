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
    id: req.body.id,
    title: req.body.title,
    isCompleted: false
  });
  newToDo.save().then(() => {
    console.log('Saved successfully')
  });
});

app.delete('/todo/:id', (req, res) => {
  Todo.delete(req.params.id).then(() => {
    console.log(`Deleted ${req.params.id} successfully`)
  });
});

app.delete('/todo', (req, res) => {
  console.log()
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})
