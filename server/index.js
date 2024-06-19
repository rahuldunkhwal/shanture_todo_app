const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

// fetch task
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todo");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// create a task
app.post("/todos", async (req, res) => {
  const { description } = req.body;
  try {
    // console.log(req.body);
    const result = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// delete a task
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.send("Task deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
