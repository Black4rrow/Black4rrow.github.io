const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { user } = event.queryStringParameters;
  const { content } = JSON.parse(event.body);

  let filePath = '';
  if (user === 'margot') {
    filePath = path.join(__dirname, '../../files/to_margot.json');
  } else if (user === 'nathan') {
    filePath = path.join(__dirname, '../../files/to_nathan.json');
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'User not found' }),
    };
  }

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'File updated successfully' }),
  };
};
