import 'reflect-metadata';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 4000;
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
AppDataSource.initialize()
	.then(() => {
		console.log('DB initialized');
	})
	.catch((error) => console.log(error));
app.get('/', async (req: Request, res: Response) => {
	res.send('Hello, world!');
});
import additionRoute from './routes/addition.route';
app.use('/api', additionRoute);
