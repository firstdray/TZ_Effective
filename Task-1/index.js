import express from 'express';
import productRouter from './routes/products.routes.js';
import ActionRouter from "./routes/action.routes.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api', productRouter);
app.use('/api', ActionRouter);

app.listen(port, () => console.log(`Listening on port: ${port}`));