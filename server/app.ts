import express, {Express} from 'express';
import mongoose, {Connection} from 'mongoose';
import morgan from 'morgan';
import apiRouter from './src/routes/api';
import cors, {CorsOptions} from 'cors';
import path from 'path';

const app: Express = express();
const port: number = 1234;

const mongoDB: string = 'mongodb://localhost:27017/testdb';

mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'development') {
    const corsOptions: CorsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions));
} else if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve("../..","client","build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve("../..","client","build","index.html"));
    });
}


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

