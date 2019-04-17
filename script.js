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
                isbn: '4554576'
            },
        

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
              <td><a href ="#" class="btn btn-danger btn-sm delete">X</a></td>
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
// EVENT: ADD A BOOK
document.querySelector('#book-form').addEventListener('submit', (e) => {

    // Fist we need to prevent actualy submit
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

    // Show success message
    UI.showAlert('Book Added', 'success')

    // Once submited we want all existing texts in the input field to dissepear
    UI.clearField();
  }
});

// EVENT: We would like to remove a book if we don't want it anymore
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    UI.showAlert('Book Removed', 'success');

})

// EVENT: Display list of BOOKS to the DOM... 
document.addEventListener('DOMContentLoaded', UI.displayBooks);
