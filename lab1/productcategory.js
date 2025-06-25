class EcommerceStore {
  constructor() {
    this.categories = {};
  }

  createCategory(categoryName) {
    if (!this.categories[categoryName]) {
      this.categories[categoryName] = [];
      console.log("Category created:", categoryName);
    } else {
      console.log("Category already exists:", categoryName);
    }
    this.updateUi();
  }

  deleteCategory(categoryName) {
    if (this.categories[categoryName]) {
      delete this.categories[categoryName];
      console.log("Category deleted:", categoryName);
      this.updateUi();
    } else {
      console.log("Category not found:", categoryName);
    }
  }

  updateUi() {
    const olElement = document.getElementById("category-list");
    const categoryNameList = Object.keys(this.categories);

    olElement.innerHTML = categoryNameList
      .map(
        (category) => `
          <li>
            ${category}
            <button id="delete-${category}">Delete</button>
          </li>
        `
      )
      .join("");

    this.registerEventListenersForDeleteCategory();
  }

  registerEventListenersForDeleteCategory() {
    Object.keys(this.categories).forEach((category) => {
      const deleteButton = document.getElementById(`delete-${category}`);
      if (deleteButton) {
        deleteButton.addEventListener("click", () => {
          this.deleteCategory(category);
        });
      }
    });
  }
}

// Initialize the store
const store = new EcommerceStore();

// Example usage
store.createCategory("Electronics");
store.createCategory("Clothing");

// Event listener for adding categories
const categoryInput = document.getElementById("category-input");
const categoryAddButton = document.getElementById("add-category");

categoryAddButton.addEventListener("click", () => {
  const category = categoryInput.value.trim();
  if (category === "") {
    alert("Please enter a category name");
  } else {
    store.createCategory(category);
    categoryInput.value = "";
  }
});
