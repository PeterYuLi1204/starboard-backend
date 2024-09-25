import "dotenv/config";
import express from "express";
import tasks from "./routes/tasks.js";

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/tasks', tasks);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
app.listen(port, () => {
    console.log(`Starboard app listening on port ${port}`);
});