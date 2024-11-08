const express = require('express');
const { PORT} = require('./src/config/index');


const app = express();

app.get('/', (req,res) => {
    res.json({
        status: 'OK',
    });
});


app.listen(PORT,() => {
    console.log(`Listening on port: ${PORT}`);
    
})
