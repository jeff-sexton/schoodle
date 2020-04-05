// generate url

const generateRandomUrl = () => {
  const possibleCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  //uuid or guid -- research

  let stringLength = 10;
  let newString = '';
  for (let i = 0; i < stringLength; i++) {
    newString += possibleCharacters[ Math.floor(Math.random() * possibleCharacters.length) ];

  }

  return newString;

};

module.exports.generateRandomUrl = generateRandomUrl;


