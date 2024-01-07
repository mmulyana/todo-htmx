const express = require('express')
const db = require('./utils/db')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (__, res) => {
  try {
    const todos = await db.todo.findMany()
    res.render('main.ejs', { todos })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
app.get('/todo', async (__, res) => {
  try {
    const todos = await db.todo.findMany()
    res.render('index.ejs', { todos })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

app.get('/todo/new', (req, res) => {
  res.render('todos')
})

app.post('/todo', async (req, res) => {
  try {
    const date = new Date()
    req.body.isDone = false
    req.body.time = date

    await db.todo.create({
      data: req.body,
    })
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

app.put('/todo/:id', async (req, res) => {
  try {
    const todo = await db.todo.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
    })
    await db.todo.update({
      data: {
        isDone: !todo.isDone,
      },
      where: {
        id: parseInt(req.params.id),
      },
    })
    const todos = await db.todo.findMany()
    res.render('index', { todos })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

app.delete('/todo/:id', async (req, res) => {
  try {
    await db.todo.delete({
      where: { id: parseInt(req.params.id) },
    })
    const todos = await db.todo.findMany()
    res.render('index', { todos })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

app.listen(8000, () =>
  console.log('server is running in http://localhost:8000')
)
