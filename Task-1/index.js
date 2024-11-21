const express = require('express');
const productRouter = require('./routes/products.routes');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api', productRouter);

app.listen(port, () => console.log(`Listening on port: ${port}`));