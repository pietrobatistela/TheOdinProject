const changeSize = document.getElementById("change");

changeSize.addEventListener("click", () => {
  const newSize = prompt("Insira um novo valor de até 100:");
  if (newSize >= 2 && newSize <= 100){
    createGrid(newSize)
  } else {
    alert('O valor não pode ser maior que 100 e nem menor que 2!!')
  }
});

function createGrid(size) {
  const container = document.querySelector("div");
  const reset = document.getElementById("reset");

  container.innerHTML = '';
  for (i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    container.appendChild(square);

    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = "black";
    })

    reset.addEventListener('click', () => {
      square.style.backgroundColor = "white";
    })

  }

  const squareSize = `calc(100% / ${size})`;
  document.querySelectorAll(".square").forEach((square) => {
    square.style.flex = `0 0 ${squareSize}`;
    square.style.height = squareSize;
  });
  
}

createGrid(16);
