DROP TABLE books;

CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    ISBN VARCHAR(255),
    image_url VARCHAR(255),
    description VARCHAR(10000),
    bookshelf VARCHAR(255)
);