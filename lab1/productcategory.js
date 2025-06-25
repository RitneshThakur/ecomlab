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

  addItemToCategory(categoryName, itemType, value) {
    if (this.categories[categoryName]) {
      this.categories[categoryName].push({ type: itemType, value });
      console.log(`Item added to ${categoryName}: ${itemType} - ${value}`);
      this.updateUi();
    } else {
      alert("Category not found.");
    }
  }

  updateUi() {
    const olElement = document.getElementById("category-list");
    const categorySelect = document.getElementById("category-select");
    const categoryNameList = Object.keys(this.categories);

    // Update category list with delete buttons and items
    olElement.innerHTML = categoryNameList
      .map((category) => {
        const items = this.categories[category]
          .map(item => `<li> - ${item.type}: ${item.value}</li>`)
          .join("");
        return `
          <li>
            <strong>${category}</strong>
            <button id="delete-${category}">Delete</button>
            <ul>${items}</ul>
          </li>
        `;
      })
      .join("");

    // Update dropdown
    categorySelect.innerHTML = categoryNameList
      .map(cat => `<option value="${cat}">${cat}</option>`)
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

// Event listener to add category
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

// Event listener for item form submission
const itemForm = document.getElementById("item-form");

itemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const selectedCategory = document.getElementById("category-select").value;
  const selectedItemType = document.getElementById("item-select").value;
  const itemValue = document.getElementById("user-input").value.trim();

  if (itemValue === "") {
    alert("Please enter a value for the item.");
    return;
  }

  store.addItemToCategory(selectedCategory, selectedItemType, itemValue);
  itemForm.reset();
});
