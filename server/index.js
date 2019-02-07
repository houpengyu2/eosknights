const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const rankRoutes = require('./routes/rankings');
const priceRoutes = require('./routes/price');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// routes 
app.use('/api/rankings', rankRoutes);
app.use('/api/price', priceRoutes);

app.use(function(req, res, next){
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server started on port ${PORT}`);
});