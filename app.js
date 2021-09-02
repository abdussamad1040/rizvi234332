// global variables 
const bookNumber = document.getElementById("book-number");
const bookContainer = document.getElementById("book-container");
const error = document.getElementById("error");
const spinner = document.getElementById("spinner");
spinner.style.display = 'none';

// event handler on search button 
document.getElementById("search-button").addEventListener('click', () => {
    const inputField = document.getElementById("input-field");
    const inputFieldText = inputField.value;

    // clearing the existing results 
    bookNumber.textContent = '';
    bookContainer.textContent = '';

    // clearing the input field
    inputField.value = '';

    // error handling if search input is empty
    if (inputFieldText === '') {
        error.innerText = 'Search field can not be empty';
        return;
    }
    else {
        error.textContent = '';
    }

    // spinner on
    spinner.style.display = 'block';

    // set the url
    const url = `https://openlibrary.org/search.json?q=${inputFieldText}`;

    // fetching part
    fetch(url)
        .then(res => res.json())
        .then(data => showBookDetails(data.docs.slice(0, 30), data.numFound));
})

const showBookDetails = (books, numberOfBooks) => {
    // error handling if search something that is not in the server
    if (numberOfBooks === 0) {
        error.innerText = 'No Result Found';
        spinner.style.display = 'none';
        return;
    }
    else {
        error.textContent = '';
    }

    // spinner off 
    spinner.style.display = 'none';

    // showing the number of books found after searching
    bookNumber.innerHTML = `<h1 class="fw-light">Total Books Found: ${numberOfBooks}</h1>`;

    // display all the results 
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div style="background-color:#f2f0e7;" class="card h-100 shadow">

            <img style="height:300px;" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top">

            <div class="card-body">
                <h3> ${book.title}</h3>
                <p class="fw-bold">By  ${book.author_name ? book.author_name.slice(0, 1) : 'Opps!!! Not Found'}</p>
                <p>First published in ${book.first_publish_year ? book.first_publish_year : 'Opps!!! Year Not Found'}</p>
                <p>Publisher: ${book.publisher ? book.publisher.slice(0, 1) : 'Opps!!! Publisher Not Found'}</p>
            </div>
        </div>
        `;
        bookContainer.appendChild(div);
    })
}