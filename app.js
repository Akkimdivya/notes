const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const cors =require('cors');

const dbPath = path.join(__dirname, 'notes.db')

const app = express()
app.use(cors())
app.use(express.json())


let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initializeDBAndServer()

app.get('/notes/', async (request, response) => {
    const getNotesQuery = `
      SELECT
        *
      FROM
        list;`
    const notesArray = await db.all(getNotesQuery)
    response.send(notesArray)
  })