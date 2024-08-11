const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
  const { user } = event.queryStringParameters;

  let filePath = '';
  if (user === 'margot') {
    filePath = path.join(__dirname, '../../files/to_margot.json');
  } else if (user === 'nathan') {
    filePath = path.join(__dirname, '../../files/to_nathan.json');
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `User not found: ${user}` }),
    };
  }

  const data = fs.readFileSync(filePath, 'utf8');

  return {
    statusCode: 200,
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
