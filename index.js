function getCategories() {
  const root = { id: 'root', parent: null, children: [] };
  const books = { id: 'books', parent: root, children: [] };
  const movies = { id: 'movies', parent: root, children: [] };
  const fantasy = { id: 'fantasy', parent: books, children: [] };
  const tolkien = { id: 'tolkien', parent: fantasy, children: [] };

  root.children = [movies, books];
  books.children = [fantasy];
  fantasy.children = [tolkien];

  return root;
}

function getProductsAssignements() {
  return {
    B001: ['movies', 'fantasy'],
    D8: ['tolkien', 'fantasy'],
    RX20: [],
    test: ['movies', 'tolkien', 'fantasy', 'root'],
  };
}

/* Complete the function below.
 * productid is a string, function must return an array of paths, or an  array with ‘EMPTY’ if no paths is found for the current product.
 * A path is a semi-colon separated list of category ids, from root to target category, which allows to reach a product.
 */

/* compares the given id with the "actual" id tree, and search for another children each time
 the values are not the same */
function orderCategorie(id, categorie) {
  if (categorie.id == id) {
    return categorie;
  }
  for (let i = 0; categorie.children.length; i++) {
    const path = orderCategorie(id, categorie.children[i]);
    if (path) {
      return path;
    }
  }
  return null;
}

/* For each return from orderCategorie the result is concatenated in the string
 until the function check that the element has no parents */
function concatenatingPath(categorie) {
  if (categorie.parent) {
    return `${concatenatingPath(categorie.parent)};${categorie.id}`;
  }
  return categorie.id;
}

// testing in relation to the other paths which is the longest
function longestPath(breadcrumbs, product) {
  if (breadcrumbs.length >= 2) {
    const arraytocheck = [];

    for (let z = 0; z < breadcrumbs.length; z++) {
      const arraySplit = breadcrumbs[z].split(';');
      arraytocheck.push(arraySplit);
    }

    for (let y = breadcrumbs.length - 1; y >= 0; y--) {
      let remove = false;

      for (let x = breadcrumbs.length - 1; x >= 0; x--) {
        if (x != y) {
          const arrayB = `;${arraytocheck[x].join(';')};`;

          const searchCategorie = `;${product[y]};`;

          if (arrayB.match(searchCategorie)) {
            remove = true;
          }
        }
        if (remove) {
          breadcrumbs.splice(y);
          remove = false;
        }
      }
    }
  }
  return breadcrumbs;
}

function getPaths(id) {
  const categories = getCategories();
  const productAssignments = getProductsAssignements();
  const product = productAssignments[id];

  // checking if the ID informed exists, and ending with the function returning empty
  if (!product) {
    return ['EMPTY'];
  }
  const breadcrumbs = longestPath(product.map((e) => concatenatingPath(orderCategorie(e, categories))), product);
  if (breadcrumbs.length < 1) {
    return ['EMPTY'];
  }
  return breadcrumbs;
}

// INPUT TO TEST THE FUNCTION

console.log(getPaths('B001'));

console.log(getPaths('D8'));

console.log(getPaths('RX20'));

console.log(getPaths('test'));

console.log(getPaths('no-exist'));

console.log(getPaths(''));
