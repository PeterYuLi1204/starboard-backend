import "dotenv/config";
import express from "express";
import cors from "cors";
import tasks from "./routes/tasks.js";

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

// allows all origins (DISABLE LATER)
app.use(cors());

app.use(express.json());

app.use('/tasks', tasks);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});
  
app.listen(port, () => {
    console.log(`Starboard app listening on port ${port}`);
});