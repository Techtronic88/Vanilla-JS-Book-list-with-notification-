class Book {
    constructor (title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// UI CLASS:  We will handle UI tasks with this section 
class UI {
    static displayBooks () {
        const storedBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '3434434'
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '45545'
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '45545'
            }

        ];
        const books = storedBooks;
        books.forEach((book) =>  UI.addBookToList(book));
}
    // Now we grab HTML section to display the book list we submit - create HTML - append / render it to the DOM 
    static addBookToList(book) {
        const list = document.querySelector('#book-list'); // This section displays the book's list we submitted.
        const row = document.createElement('tr');
              row.innerHTML = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.isbn}</td>
              `;  
    list.appendChild(row);    

    }
}
// 

// EVENT: Display list of BOOKS to the DOM... 
document.addEventListener('DOMContentLoaded', UI.displayBooks);