import express from "express";
import connectTodb from "./databse.js";
import userRoutes from './routes/userRoutes.js';
import postController from './routes/postRoutes.js';

const app = express();
connectTodb();

const port = 3000;
const host = '192.168.18.8';
app.use(express.json())
app.use('/api/users', userRoutes);
app.use('/api/post',postController)

app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});

app.get('/', (req, res) => {
    res.send("kusoo dhawoow maqaayadeena hel cuno macan");
});
