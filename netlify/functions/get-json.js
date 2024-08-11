exports.handler = async function(event) {
  // Récupérer le chemin complet de l'URL
  const path = event.path;
  
  // Extraire le nom d'utilisateur à partir du chemin
  const user = path.split('/')[1]; // "margot" est ici la deuxième partie du chemin

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
