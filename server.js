const express = require('express');
const Client = require('pg');
const superagent = require('superagent');
const app = express();

// const cors = require('cors');
// app.use(cors());

app.use(express.static('./public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

//ROUTES
app.get('/hello', proofOfLife);
app.get('/', loadSearch);
app.post('/searches', createSearch);

//CONSTRUCTOR FUNCTIONS
function Book(book){
  this.title = book.title || 'Title does not exist';
  this.author = book.authors || 'Author does not exist';
  this.ISBN = book.ISBN || 'ISBN does not exist';
  this.image_url = book.imageLinks.smallThumbnail || 'Image does not exist';
  this.description = book.description || 'Description does not exist';
  //this.bookshelf_name = book.body.volumeInfo.bookshelf_name || 'Shelf name does not exist';
}


//HANDLER FUNCTIONS
function proofOfLife (request, response) {
  response.render('pages/index');
  // app.use(express.static('./public'));
}

function loadSearch(request, response) {
  response.render('pages/index');
}

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  console.log('request.body', request.body);

  if(request.body.search[1] === 'title') {url += `+intitle:${request.body.search[0]}`;}
  if(request.body.search[1] === 'author') {url += `+inauthor:${request.body.search[0]}`;}
  console.log(url);

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', { searchesResults: results}))
    .catch(err => response.render('pages/error', {errorMessage : err}))
}

//new Book(bookResult.volumeInfo)
// app.use('*', (request,response) => res.render('error'));
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
