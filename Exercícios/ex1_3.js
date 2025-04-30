// Para usar o prompt no nodejs é preciso instalar essa lib
let prompt = require("prompt-sync");
prompt = prompt();
// Solicita ao usuário o valor inicial (principal) que deseja aplicar juros e armazena em 'principal'
// O valor retornado por prompt será uma string, então devemos convertê-lo para número após a entrada.
let principal = prompt(
  "Escreva o valor que deseja que os juros sejam aplicados:"
);

// Solicita ao usuário a taxa de juros diária em formato decimal e armazena em 'taxa'
// O valor retornado por prompt será uma string, então precisamos convertê-lo para número.
let taxa = prompt("Escreva a taxa de juros diária em decimal:");

// Solicita ao usuário a quantidade de dias em que o dinheiro ficará aplicado e armazena em 'tempo'
// O valor retornado por prompt será uma string, então precisamos convertê-lo para número.
let tempo = prompt(
  "Escreva a quantidade de dias que o dinheiro ficará aplicado:"
);

// Função para calcular o valor dos juros simples
function calcularJuros(principal, taxa, tempo) {
  // Calcula os juros simples usando a fórmula: Juros = principal * taxa * tempo
  const juros = principal * taxa * tempo;

  // Exibe no console o valor calculado dos juros
  console.log("O valor final dos juros será:", juros);
}

// Chama a função 'calcularJuros' passando as variáveis 'principal', 'taxa' e 'tempo' como argumentos
calcularJuros(principal, taxa, tempo);
