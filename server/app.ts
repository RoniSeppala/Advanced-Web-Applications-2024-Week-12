import express, {Express} from 'express';
import mongoose, {Connection} from 'mongoose';
import morgan from 'morgan';

const app: Express = express();
const port: number = 3000;

const mongoDB: string = 'mongodb://localhost:27017/testdb';

mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(morgan('dev'));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

