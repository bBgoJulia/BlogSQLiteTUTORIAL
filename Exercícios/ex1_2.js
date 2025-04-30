// Para usar o prompt no nodejs é preciso instalar essa lib
let prompt = require("prompt-sync");
prompt = prompt();
// Solicita ao usuário a temperatura em graus Celsius e armazena o valor na variável 'celsius'
// O valor retornado pelo prompt será uma string, então precisamos convertê-lo para número posteriormente.
let celsius = prompt("Qual a temperatura em graus celsius? ");

// Função para converter a temperatura de Celsius para Fahrenheit
function celsiusParaFahrenheit(celsius) {
  // Calcula a temperatura em Fahrenheit usando a fórmula: (Celsius * 9 / 5) + 32
  const Fah = (celsius * 9) / 5 + 32;

  // Exibe no console o valor da temperatura em Fahrenheit
  console.log("A temperatura em graus Fahrenheit é:", Fah);
}

// Chama a função 'celsiusParaFahrenheit' passando a variável 'celsius' como argumento
celsiusParaFahrenheit(celsius);
