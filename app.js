/*
const express = require('express')
const app=express();

app.listen(process.env.PORT || 3000,()=>{
    console.log(`listening ${process.env.PORT||3000}`);
});

app.get('/',async(req,res)=>{
    res.send("<h1>hey divi</h1>")
})
*/

const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "notes.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log(`Server Running at http://localhost:${process.env.PORT||3000}/`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/notes/", async (request, response) => {
    const getNotesQuery = `
      SELECT
        *
      FROM
        list
      ORDER BY
        no;`;
    const notesArray = await db.all(getNotesQuery);
    response.send(notesArray);
  });