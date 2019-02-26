const express = require('express');
const Client = require('pg');
const app = express();

// const cors = require('cors');
// app.use(cors());

app.use(express.static('./public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));


app.get('/hello', proofOfLife);

function proofOfLife (request, response) {
    response.render('pages/index');
    // app.use(express.static('./public'));
}

// app.use('*', (request,response) => res.render('error'));
app.listen(PORT, () => console.log(`listening on port ${PORT}`));