const container = document.querySelector(".container");
const buttons = document.querySelectorAll("button");
const text = document.querySelector(".text");

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choice = ["Pedra", "Papel", "Tesoura"];
  let randomChoice =
    choice[Math.ceil(Math.floor(Math.random() * choice.length))];
  text.textContent += ` a máquina escolheu ${randomChoice}`;
  container.appendChild(text);
  return randomChoice;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {

    function getHumanChoice() {
      if (button.id === "rock") {
        text.textContent = "Você escolheu Pedra e ";
        container.appendChild(text);
        return button.id;
      } else if (button.id === "paper") {
        text.textContent = "Você escolheu Papel e ";
        container.appendChild(text);
        return button.id;
      } else {
        text.textContent = "Você escolheu Tesoura e ";
        container.appendChild(text);
        return button.id;
      }
    }

    function playRound(humanChoice, computerChoice) {
      if (
        computerChoice.toLowerCase() === "pedra" &&
        humanChoice.toLowerCase() === "paper"
      ) {
        text.innerHTML += `<br>Você ganhou! Papel ganha de Pedra`;
        humanScore++;
      } else if (
        computerChoice.toLowerCase() === "pedra" &&
        humanChoice.toLowerCase() === "scissors"
      ) {
        text.innerHTML += `<br>Você perdeu! Pedra ganha de Tesoura`;
        computerScore++;
      } else if (
        computerChoice.toLowerCase() === "papel" &&
        humanChoice.toLowerCase() === "scissors"
      ) {
        text.innerHTML += `<br>Você ganhou! Tesoura ganha de Papel`;
        humanScore++;
      } else if (
        computerChoice.toLowerCase() === "papel" &&
        humanChoice.toLowerCase() === "rock"
      ) {
        text.innerHTML += `<br>Você perdeu! Papel ganha de Pedra`;
        computerScore++;
      } else if (
        computerChoice.toLowerCase() === "tesoura" &&
        humanChoice.toLowerCase() === "rock"
      ) {
        text.innerHTML += `<br>Você ganhou! Pedra ganha de Tesoura`;
        humanScore++;
      } else if (
        computerChoice.toLowerCase() === "tesoura" &&
        humanChoice.toLowerCase() === "paper"
      ) {
        text.innerHTML += `<br>Você perdeu! Tesoura ganha de Papel`;
        computerScore++;
      } else {
        text.innerHTML += `<br>Ninguém ganhou!`;
      }

      text.innerHTML += `<br>O placar está: ${humanScore} para você e ${computerScore} para a máquina!`;

      if (humanScore === 5) {
        text.innerHTML += `<br>Você fez 5 pontos primeiro, você ganhou!`;
        humanScore = 0;
        computerScore = 0;
      } else if (computerScore === 5) {
        text.innerHTML += `<br>A máquina fez 5 pontos primeiro, você perdeu!`;
        computerScore = 0;
        humanScore = 0;
      }
    }

    let humanChoice = getHumanChoice();
    let computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
  });
});
