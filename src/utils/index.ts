const { faker } = require('@faker-js/faker');

export async function generateReadablePassword(length = 10): Promise<string> {
  if (length < 6) {
    throw new Error('Password length must be at least 6 for a secure and readable format.');
  }

  // Generate a random word and capitalize the first letter
  let randomWord = faker.word.noun();
  randomWord = randomWord.charAt(0).toUpperCase() + randomWord.slice(1);

  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  const numbers = '0123456789';

  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  const randomNumbers = Array.from({ length: length - randomWord.length - 1 })
    .map(() => numbers[Math.floor(Math.random() * numbers.length)])
    .join('');

  // Combine the components: Word + Symbol + Numbers
  const password = `${randomWord}${randomSymbol}${randomNumbers}`;

  console.log(password);

  return password;
}
