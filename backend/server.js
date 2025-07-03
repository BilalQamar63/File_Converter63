const express = require('express');
const converterRoutes = require('./routes/converterRoutes');
const cors = require('cors');
const app = express();
require('dotenv').config();



app.use(cors({
    origin: process.env.CORS_URL,
    methods: ['GET', 'POST','DELETE'],
    credentials: true
}));

app.use(express.json());

app.use('/api/convert', converterRoutes);

const PORT_URL_FROM_ENV = process.env.PORT;
app.listen(PORT_URL_FROM_ENV, () => {
    console.log(`Server running on port ${PORT_URL_FROM_ENV}`);
});
