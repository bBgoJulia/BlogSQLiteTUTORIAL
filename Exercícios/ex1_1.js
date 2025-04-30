// Para usar o prompt no nodejs é preciso instalar essa lib
let prompt = require("prompt-sync");
prompt = prompt();
// Solicita ao usuário o preço do produto e converte o valor para número com ponto flutuante
let preco = parseFloat(prompt("Qual o preço do produto? "));
// Solicita ao usuário o valor do desconto e converte o valor para número com ponto flutuante
let desconto = parseFloat(prompt("Qual o valor do desconto? "));

// Função para calcular o valor do produto com o desconto aplicado
function calcularDesconto(preco, desconto) {
  // Calcula o valor final do produto subtraindo o valor do desconto
  const resultado = preco - (preco * desconto) / 100;

  // Exibe o valor final com 2 casas decimais formatadas
  console.log(`O valor final do produto é R$${resultado.toFixed(2)}`);
}

// Chama a função passando os valores de 'preco' e 'desconto' fornecidos pelo usuário
calcularDesconto(preco, desconto);
