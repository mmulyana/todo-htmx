const express = require('express')
const db = require('./utils/db')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(8000, () =>
  console.log('server is running in http://localhost:8000')
)
