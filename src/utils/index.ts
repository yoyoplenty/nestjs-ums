// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

export async function generateReadablePassword(length = 12): Promise<string> {
  if (length < 12) {
    throw new Error('Password length must be at least 12 to accommodate the required format.');
  }

  let randomWord = faker.word.noun();
  randomWord = randomWord.charAt(0).toUpperCase() + randomWord.slice(1);

  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  const numbers = '0123456789';

  const randomSymbols = Array.from({ length: 2 })
    .map(() => symbols[Math.floor(Math.random() * symbols.length)])
    .join('');

  const randomNumbers = Array.from({ length: 3 })
    .map(() => numbers[Math.floor(Math.random() * numbers.length)])
    .join('');

  const password = `${randomWord}${randomSymbols}${randomNumbers}`;

  return password;
}
