function myEval(str) {
    // Déclarer un tableau de opérateurs arithmétiques
    const operators = ['+', '-', '*', '/'];
  
    // Parcourir le tableau d'opérateurs et remplacer chaque opérateur par son équivalent en JavaScript
    for (const operator of operators) {
      str = str.replace(operator, ` ${operator} `);
    }
  
    // Créer une fonction qui renvoie le résultat de l'expression passée en argument
    return new Function(`return ${str}`)();
  }
  
  // Exemple d'utilisation
  const expression = process.argv.slice(2).toString();
  const result = myEval(expression);
  console.log(result); // => 42
