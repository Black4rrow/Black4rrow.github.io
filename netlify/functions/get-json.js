const fs = require('fs');
const path = require('path'); // Importation correcte du module path

exports.handler = async function(event) {
  // Récupérer le chemin complet de l'URL
  const pathParts = event.path.split('/'); 
  const user = pathParts[1]; // "margot" ou "nathan" doit être dans le 2ème segment de l'URL

  let filePath = '';
  if (user === 'margot') {
    filePath = __dirname + '/../../files/to_margot.json'; // Création manuelle du chemin
  } else if (user === 'nathan') {
    filePath = __dirname + '/../../files/to_nathan.json';
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `User not found: ${user}` }),
    };
  }

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
