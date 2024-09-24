import express from "express";
import tasks from "./routes/tasks.js"

const app = express();
const router = express.Router();
const port = 3000;

app.use('/tasks', tasks);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});