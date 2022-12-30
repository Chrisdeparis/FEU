function myEval(expression) {
    // Déclarer un tableau de opérateurs arithmétiques
    const operators = ['+', '-', '*', '/'];
  
    // Parcourir le tableau d'opérateurs et remplacer chaque opérateur par son équivalent en JavaScript
    for (const operator of operators) {
      expression = expression.replace(operator, ` ${operator} `);
    }
  
    // Créer une fonction qui renvoie le résultat de l'expression passée en argument
    return new Function(`return ${expression}`)();
  }
  
  // Exemple d'utilisation
  const expression = process.argv.slice(2).toString();
  const result = myEval(expression);
  console.log(result); // => 42
