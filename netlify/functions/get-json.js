const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
  const pathParts = event.path.split('/'); 
  const user = pathParts[1]; 

  // Construire le chemin absolu au fichier JSON
  let filePath = path.resolve(__dirname, `../files/to_${user}.json`);

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
