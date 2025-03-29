let myLibrary = [];

const form = document.querySelector(".form");

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === "true" ? true : read === "false" ? false : read;
  }
  status() {
    this.read = !this.read;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadFromLocalStorage() {
  const storedLibrary = localStorage.getItem("myLibrary");
  if (storedLibrary) {
    const parsedLibrary = JSON.parse(storedLibrary);

    myLibrary = parsedLibrary.map(
      (book) => new Book(book.title, book.author, book.pages, book.read)
    );
  }
}

loadFromLocalStorage();
console.log(myLibrary)

class Library {
  constructor() {
  }

  editBook(index, updatedBook) {
    myLibrary[index] = {
      ...myLibrary[index],
      ...updatedBook,
    };
    saveToLocalStorage();
  }
}

const library = new Library();


function openDialog(){
  document.querySelector("#openAddDialog").showModal();
}

function closeDialog(){
  document.querySelector("#openAddDialog").close();
  form.reset();
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  saveToLocalStorage();
}

function displayBook() {
  const container = document.querySelector(".container");
  container.textContent = "";

  myLibrary.map((book, index) => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    const editBook = document.createElement("div");
    editBook.classList.add("edit-book");
    const img = document.createElement("img");
    img.classList.add("edit-img");
    img.setAttribute("src", "./images/edit.png");
    img.dataset.id = book.id;
    img.addEventListener("click", () => openEditDialog(index));
    editBook.appendChild(img);
    card.appendChild(editBook);

    const title = document.createElement("span");
    title.classList.add("title");
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement("p");
    author.classList.add("author");
    author.innerHTML = `<strong>Autor:</strong> ${book.author}`;
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.classList.add("pages");
    pages.innerHTML = `<strong>Número de páginas:</strong> ${book.pages}`;
    card.appendChild(pages);

    const read = document.createElement("p");
    read.classList.add("read");
    const color = book.read ? "#166534" : "#a16207"
    read.innerHTML = `<strong>Situação:</strong> <span style="color: ${color}; font-weight: bold;">${book.read ? "Lido" : "Não lido"}</span>`;
    card.appendChild(read);

    const actions = document.createElement("div");
    actions.classList.add("actions-buttons");

    const btnStatus = document.createElement("button");
    btnStatus.classList.add("btn-read");
    btnStatus.textContent = "Mudar situação";
    btnStatus.onclick = () => {
      book.status();
      const color = book.read ? "#166534" : "#a16207"
      read.innerHTML = `<strong>Situação:</strong> <span style="color: ${color}; font-weight: bold;">${book.read ? "Lido" : "Não lido"}</span>`;
      saveToLocalStorage();
    };

    const btnDel = document.createElement("button");
    btnDel.classList.add("btn-del");
    btnDel.textContent = "Excluir livro";
    btnDel.dataset.id = book.id;
    btnDel.addEventListener("click", () => {
      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBook();
        saveToLocalStorage();
      }
    });

    actions.appendChild(btnStatus);
    actions.appendChild(btnDel);
    card.appendChild(actions);

    return card; 
  }).forEach((card) => container.appendChild(card));
}

displayBook();

function openEditDialog(index){

  const book = myLibrary[index]
  document.querySelector("#editTitle").value = book.title;
  document.querySelector("#editAuthor").value = book.author;
  document.querySelector("#editPages").value = book.pages;
  
  const readRadio = document.querySelector('input[name="editStatus"][value=true]');
  const unreadRadio = document.querySelector('input[name="editStatus"][value=false]');
  if(book.read){
    readRadio.checked = true;
  } else {
    unreadRadio.checked = true;
  }

  window.editIndex = index;
  document.querySelector("#editBookDialog").showModal();
}

function closeEditDialog(){
  document.querySelector("#editBookDialog").close();
}

form.addEventListener("submit", function (event) {
  const title = document.querySelector(".title");
  const author = document.querySelector(".author");
  const pages = document.querySelector(".pages");
  const read = document.querySelector('input[name="status"]:checked').value;

  event.preventDefault();
  document.querySelector("#openAddDialog").close();

  addBookToLibrary(title.value, author.value, pages.value, read);

  form.reset();
  displayBook();
});



function saveEdit(){
  if(window.editIndex !== undefined){
    const title = document.querySelector("#editTitle").value.trim();
    const author = document.querySelector("#editAuthor").value.trim();
    const pages = document.querySelector("#editPages").value.trim();
    const read = document.querySelector('input[name="editStatus"]:checked').value === "true";

    let isValid = true;
    if(!title){
      isValid = false;
    } else if (!author){
      isValid = false;
    } else if (!pages){
      isValid = false;
    }

    if(isValid){
      const updatedBook = {
        title,
        author,
        pages,
        read
      };
      library.editBook(window.editIndex, updatedBook);
      closeEditDialog();
    } 
  }
  console.log(myLibrary)
  displayBook();
}
