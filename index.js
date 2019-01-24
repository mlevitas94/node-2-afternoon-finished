const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config()
const cr = require('./controller')

const app = express();
app.use( bodyParser.json() );

massive(process.env.CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance)
}).catch(err => console.log(err));

app.post('/api/products', cr.create)
app.get('/api/products', cr.getAll)
app.get('/api/products/:id', cr.getOne)
app.put('/api/products/:id', cr.update)
app.delete('/api/products/:id', cr.delete)

const port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`Now traveling to ${port}.`); } );