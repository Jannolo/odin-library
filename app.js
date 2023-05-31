function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype = function info() { };

let myLib = [new Book('Harry', 'J.K. Rowling', 250, 'read'), new Book ('Test', 'test', 2)];
console.log(myLib);

function addToLib(book) {
    myLib.push(book);
}

function displayBook(book) {
    let titleDiv = document.createElement("div");
    titleDiv.classList.add('book-title');
    titleDiv.textContent = "Title: " + book.title;
    
    let authorDiv = document.createElement("div");
    authorDiv.classList.add('book-author');
    authorDiv.textContent = "Author: " + book.author;

    let pagesDiv = document.createElement("div");
    pagesDiv.classList.add('book-pages')
    pagesDiv.textContent = "Pages: " + book.pages

    let readDiv = document.createElement("div");
    readDiv.classList.add('book-read');
    if(book.read == 'read') {
        readDiv.textContent = "Read!";
    } else {
        readDiv.textContent = "Not Read!";
    }
    
    let readButton = document.createElement('button');
    readButton.classList.add('read-button');
    readButton.textContent= 'Read?';
    readButton.setAttribute('data-title', book.title);
    readButton.addEventListener('click', () => {
        let book = myLib.find(book => book.title == readButton.getAttribute('data-title'));
            book.read = 'read';
            loopBooks(myLib);
        
    })


    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    let removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('data-title', book.title);
    removeButton.addEventListener('click', () => {
        //console.log('Test');
        //console.log(myLib.find(book => book.title == button.getAttribute('data-title')));
        myLib.pop(myLib.find(book => book.title == removeButton.getAttribute('data-title')));
        loopBooks(myLib);
    });

    let cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.appendChild(authorDiv);
    cardBody.appendChild(pagesDiv);
    cardBody.appendChild(readDiv);
    cardBody.appendChild(removeButton);
    
    if(!book.read) {cardBody.appendChild(readButton);}

    cardHeader.appendChild(titleDiv);

    console.log(myLib.find(books => books.title == book.title));
    let cardWrapper = document.querySelector(".card-wrapper");
    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(cardBody);

    cardWrapper.appendChild(cardDiv);
}


function loopBooks() {
    let cardWrapper = document.querySelector(".card-wrapper");
    while (cardWrapper.firstChild) {
        cardWrapper.removeChild(cardWrapper.firstChild);
    }

    
    myLib.forEach(book => {
        displayBook(book);
    });

}

function formValidation () {
    if (document.querySelector('#title').value == '' || document.querySelector('#author').value == '' || document.querySelector('#pages').value == '') {
        return 0;
    } else {
        return 1;
    }
    
}

let addButton = document.querySelector('.add-button');
addButton.addEventListener('click', () => {
    let bookForm = document.querySelector('.book-form');
    bookForm.classList.remove('hidden');
})

let submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', () => {
    event.preventDefault();
    let bookForm = document.querySelector('.book-form');
    console.log(formValidation())
    if (formValidation() == 0) {
        bookForm.classList.add('hidden');
        bookForm.reset();
        return;
    }
    let bookToAdd = new Book(document.querySelector('#title').value, document.querySelector('#author').value, document.querySelector('#pages').value,
        document.querySelector('#read').checked?"read":"");
    bookForm.reset(); 
    addToLib(bookToAdd);
    loopBooks();

    
    bookForm.classList.add('hidden');
})

let cancelButton = document.querySelector('.cancel-button');
cancelButton.addEventListener('click', () => {
    let bookForm = document.querySelector('.book-form');
    bookForm.classList.add('hidden');
})





loopBooks(myLib);