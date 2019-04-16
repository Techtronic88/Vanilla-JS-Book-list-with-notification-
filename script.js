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
                title: 'Book Three',
                author: 'Peter Todd',
                isbn: '66765'
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
              <td><a href ="#" class="btn btn-danger btn-smdelete">X</a></td>
              `;  
    list.appendChild(row);    
        
    }
    // This class is utilized later on for us to clear out the input fields
    static clearField() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')){
            console.log('Test');
            el.parentElement.parentElement.remove();
        }    
    }
}
// EVENT: ADD A BOOK

document.querySelector('#book-form').addEventListener('submit', (e) => {

    // Fist we need to prevent actualy submit
    e.preventDefault();

    // Now we will grab the form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Instatatiate book Class
    const book = new Book(title, author, isbn);
    
    // Now books get added each time we click the submit button by accessing UI.addBookToList();
    UI.addBookToList(book);

    // Once submited we want all existing texts in the input field to dissepear
    UI.clearField();

    // EVENT: We would like to remove a book if we don't want it anymore
    // 
    document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)
    })
});

// EVENT: Display list of BOOKS to the DOM... 
document.addEventListener('DOMContentLoaded', UI.displayBooks);