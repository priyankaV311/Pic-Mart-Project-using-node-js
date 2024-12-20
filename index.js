const express = require('express');
const { PORT} = require('./src/config');
const mainRouter = require('./src/Router/index');
const dbconnect = require('./src/config/dbconnect');
const morgan = require('morgan');
const { success } = require('./src/utils/responseWrapper');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(morgan('common'));

app.get('/', (req,res) => {
    // res.json({
    //     status: 'OK',
    // });
    return res.send(success(200,{
        status: 'OK',
    }))
});

app.use('/', mainRouter);


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    
});

dbconnect();
