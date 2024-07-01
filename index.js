const category = [
  {
    id: 1,
    name: "sag",
    sub: [
      { id: 6, name: "asdasdg", sub: [] },
      { id: 7, name: "dladladla", sub: [] },
    ],
  },
  { id: 2, name: "xar", sub: [] },
  {
    id: 3,
    name: "gov",
    sub: [
      { id: 8, name: "ssadag", sub: [] },
      { id: 9, name: "sagsadas", sub: [] },
    ],
  },
  {
    id: 4,
    name: "grg",
    sub: [
      { id: 10, name: "saasdg", sub: [{ id: 11, name: "saasdg", sub: [] }] },
    ],
  },
];

function flattenCategories(categories, parentId = null) {
  let result = [];

  categories.forEach((category) => {
    let newCategory = { ...category, parentId: parentId };
    delete newCategory.sub;
    result.push(newCategory);

    if (category.sub && category.sub.length > 0) {
      result = result.concat(flattenCategories(category.sub, category.id));
    }
  });

  return result;
}

const id = 2;

const flattenedCategories = flattenCategories(category);


console.log();