export const rickSuccessQuotes = [
  "Olha só, temos um gênio interdimensional aqui! 🧠🛸",
  "Parabéns, terráqueo. Você não é TÃO inútil quanto parece",
  "Cérebros funcionando, finalmente! Bem-vindo ao caos...",
  "Isso aí! Agora vai ali e pega uma cerveja pra mim...",
  "Você passou. Milagre estatístico 🧪",
];

export const rickFailQuotes = [
  "Errado. De novo. Típico...",
  "Ugh... essa foi tão ruim que até o Jerry saberia.",
  "Errar isso? Você tem cérebro de Meeseeks?",
  "Desgraçado! Você é o motivo de eu beber.",
  "Isso foi patético. Vai assistir uns episódios antes de voltar.",
];

export function getRandomQuote(isCorrect) {
  const quotes = isCorrect ? rickSuccessQuotes : rickFailQuotes;
  return quotes[Math.floor(Math.random() * quotes.length)];
}
