class EcommerceStore {
  constructor() {
    this.products = [];
    this.carts = [];
  }

  addProduct() {
    let product1 = {
      id: new Date().toLocaleString(),
      name: "Apple",
      price: 100,
      stock: 10,
      unit: "kg",
    };
    let product2 = {
      id: new Date().toLocaleString(),
      name: "Mango",
      price: 100,
      stock: 10,
      unit: "kg",
    };
    this.products.push(product1, product2);
    console.log("products:", this.products);
    this.updateProductUi();
  }

  updateProductUi() {
    const productUIEle = document.getElementById("products");

    if (!productUIEle) {
      console.warn("Element with id 'products' not found.");
      return;
    }

    productUIEle.innerHTML = this.products
      .map((product, index) => {
        return `<li key="${index}">${product.name} - $${product.price} per ${product.unit}
                <input type ="number" placeholder="Enter Quantity" id="quantity-${product.id}">
                <button onclick="store.addToCart('${product.id}')">Add to cart </button>
            </li>`;
      })
      .join("");
  }
  addToCart(productId) {
    // finding matching product with mtachin id
    let matchedProduct = this.products.find((p) => {
      return p.id == productId;
    });

    let quantityInpEle = document.getElementById(
      "quantity-" + matchedProduct.id
    );
    //validation
    if (quantityInpEle.value === "") {
      alert("Please Enter Quantity");
      return;
    }
    let quantity = parseInt(quantityInpEle.value);
    if (quantity > matchedProduct.stock) {
      alert("stock is not available");
      return;
    }
    let matchingCarts = this.carts.find(
      (cart) => cart.productname == matchedProduct.name
    );
    if (matchingCarts) {
      let totalQuantity = matchingCarts.quantity + quantity;
      if (totalQuantity > matchedProduct.stock) {
        alert("Not enough stock");
        return;
      }
      matchingCarts.quantity=totalQuantity
      let newUpdatedCarts=this.carts.map(
        (cart,index)=>{
            
        }
      )
    }
    let cardDetails = {
      id: Date.now.toLocaleString(),
      productId: matchedProduct.id,
      quantity: quantity,
      productname: matchedProduct.name,
      price: matchedProduct.price,
      unit: matchedProduct.unit,
    };
    this.carts.push(cardDetails);
    console.log("card added :", this.carts);
  }
}

let store = new EcommerceStore();
store.addProduct();
