class Book {
    constructor (title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI CLASS:  CRATE / RENDER UI TO THE DOM
class UI {
    static displayBooks () {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
  }

    // Now we grab HTML section to display the book list we submit - create HTML - append / render it to the DOM 
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
    
        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    
        list.appendChild(row);
      }
    
    // NOTE: we target the parentElement of parentElement so the entire row can be removed
    // Otherwise only remove button will be removed when we click on it.
    static deleteBook(el) {
        if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
        }
      }

     // WE want FANCY POP UP to appear when input fields are empty which makes the app much more aesthetic pleasant. 
     // We will build the pop up from scratch and insert it into the UI..
     static showAlert(message, className) {
     const list = document.querySelector('.container');
     const div = document.createElement('div');
           div.className = `alert alert-${className}`;
           div.appendChild(document.createTextNode(message));
     const form = document.querySelector('#book-form');
           list.insertBefore(div, form);
     

    // Make the POP UP disappear after 4 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 2000);

}


    // This class is utilized later on for us to clear out the input fields
    static clearField() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// STORE CLASS: STORE / INSERT DATA IN LOCALSTORAGE
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) { // If no books  -> empty  array of book [] create
        books = [];
        } else { // If there is something in local Storage we will get the data
          books = JSON.parse(localStorage.getItem('books')); // So  JS understand the JS format of objects / array
        }
        return books // whatever data is in books
    }

    // Adding book to localStorage
    // When this method called. Data must be convert to JSON
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
      }
    
    //Remove a book by it's ISBN
    static removeBook(isbn) {
        const books = Store.getBooks()
              books.forEach((book, index) => {
              if(books.isbn === isbn)  {
                  books.splice(index, 1);
              }  
        }); 
     localStorage.setItem('books', JSON.stringify(books));    
    }
}


// PROGRAM WHAT HAPPENS DEPENDS ON ACTION OF USERS
// USER ACTION: When users fill out input
document.querySelector('#book-form').addEventListener('submit', (e) => {
e.preventDefault();

    // Now we will grab the form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // We need to validate the input field make sure they are not empty
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger')
    } else {

    // Instatatiate book Class
    const book = new Book(title, author, isbn);
    // Now books get added each time we click the submit button by accessing UI.addBookToList();
    UI.addBookToList(book);

    // Add book to localStorage
    Store.addBook(book);
    // Show success message
    UI.showAlert('Book Added', 'success')
    // Once submited we want all existing texts in the input field to dissepear
    UI.clearField();
  }
});

// USER ACTION:  click a remove button
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);
    UI.showAlert('Book Removed', 'success');
    Store.removeBook();
});

// EVENT: Display list of BOOKS to the DOM... 
document.addEventListener('DOMContentLoaded', UI.displayBooks);
