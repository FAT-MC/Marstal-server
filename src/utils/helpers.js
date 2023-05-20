const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const generateRandomName = () => {
  return uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
}

module.exports = {
  generateRandomName
}