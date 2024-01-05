import express from 'express'

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(8000, () =>
  console.log(`server is running in http://localhost:8000`)
)
