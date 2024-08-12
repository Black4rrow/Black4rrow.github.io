const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
  const user = event.queryStringParameters.user;  // Récupération du nom d'utilisateur à partir des paramètres de la requête

  // Construction d'un chemin relatif basé sur __dirname (répertoire actuel)
  let filePath = path.join(__dirname, `../files/to_${user}.json`);

  try {
    const data = fs.readFileSync(filePath, 'utf8');

    return {
      statusCode: 200,
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Failed to read file: ${error.message}` }),
    };
  }
};
