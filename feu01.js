// Créez un programme qui affiche un rectangle dans le terminal.
function drawRectangle(width, height) {
  // On vérifie que les arguments sont bien des nombres entiers positifs
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    console.error("Les arguments doivent être des nombres entiers positifs");
    return;
  }

  // Si width et height valent 1, on affiche simplement un o
  if (width == 1 && height == 1) {
    console.log("o");
    return;
  }

  // On affiche le rectangle
  for (let i = 0; i < height; i++) {
    if (i == 0 || i == height - 1) {
      console.log("o" + "-".repeat(width - 2) + "o");
    } else {
      console.log("|" + " ".repeat(width - 2) + "|");
    }
  }
}

// On appelle la fonction avec les arguments de la ligne de commande
drawRectangle(process.argv[2], process.argv[3]);



