import "dotenv/config";
import express from "express";
import cors from "cors";
import tasks from "./routes/tasks.js";

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: [
        'http://localhost:4015', 
        'http://localhost:5173', 
        'https://starboard-app.netlify.app'
    ]
}));

app.use(express.json());

app.use('/tasks', tasks);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});
  
app.listen(port, () => {
    console.log(`Starboard app listening on port ${port}`);
});