class EcommerceStore{
    constructor(){
        this.products = []
        this.carts = []
    }

    addProduct(){
        let product1 = {
            id : Math.floor(Math.random()*1000000),
            name : "Apple",
            price : 100,
            stock : 10,
            unit : "kg"
        }
        let product2 = {
            id : Math.floor(Math.random()*1000000),
            name : "Mango",
            price : 300,
            stock : 40,
            unit : "kg"
        }
        this.products.push(product1, product2)
        console.log("products: ", this.products)
        this.updateProductsUI()
    }

    updateProductsUI(){
        let productsUIEle = document.getElementById("products")
        productsUIEle.innerHTML = this.products.map(
            (product, index)=>{
                return `<li key="${product.id}">
                    <h3>${product.name}</h3>
                    <b>${product.price} | ${product.unit}</b>
                    <i>Stock: ${product.stock}</i><br>
                    <input type="number" placeholder="Enter Quantity" id="quantity-${product.id}">
                    <button key="${product.id}" onclick="store.addToCart('${product.id}')">Add To Cart</button>
                </li>`
            }
        ).join(" ")
        let grandTotalEle = document.getElementById("cart-total")
        grandTotalEle.innerHTML = `Grand Total: ₹${this.getGrandTotal()}`
        console.log("products UI updated")
        this.displaycart()
    }

    addToCart(productId){
        console.log("productId: ", productId)
        // finding matching product with productId
        let matchedProduct = this.products.find(
            (p)=>{
                return p.id == productId
            }
        )
        // finding quantity input element
        let quantityIntpuEle = document.getElementById("quantity-"+matchedProduct.id)
        // validation of empty quanity
        if(quantityIntpuEle.value === ""){
            alert("Please enter quantity")
            return;
        }
        // converting string quanity to integer
        let quantity = parseInt(quantityIntpuEle.value)
        // checking avability of stock
        if(quantity > matchedProduct.stock){
            alert("Stock is not available")
            return;
        }
        // finding existing product cart
        let matchingCart = this.carts.find(
            (cart)=>cart.productName == matchedProduct.name
        )
        // if matching cart exist then update the cart details
        if(matchingCart){
            let totalQuantity = matchingCart.quantity + quantity
            if(totalQuantity > matchedProduct.stock){
                alert("not enough stock")
                return
            }
            matchingCart.quantity = totalQuantity
            let newUpdatedCarts = this.carts.map(
                (cart, index)=>{
                    if(cart.id == matchingCart.id){
                        return matchingCart
                    }
                    return cart
                }
            )
            this.carts = newUpdatedCarts
            console.log("cart updated : ", this.carts)
            this.displaycart();
            return;
        }
        let cartDetails = {
            id : Math.floor(Math.random()*1000000),
            productId : matchedProduct.id,
            quantity : quantity,
            productName : matchedProduct.name,
            price : matchedProduct.price,
            unit : matchedProduct.unit
        }
        this.carts.push(cartDetails)
        console.log("cart added : ", this.carts)
        this.displaycart();
    }
    displaycart() {
        let cartUIEle = document.getElementById("carts");
        let cartTotalEle = document.getElementById("cart-total");
        if (this.carts.length === 0) {
            cartUIEle.innerHTML = `<li style="list-style:none; color:#888; text-align:center;">Your cart is empty.</li>`;
            cartTotalEle.innerText = "Grand total: 0";
            return;
        }

        // Calculate total cart price
        let total = this.carts.reduce((sum, cart) => sum + cart.price * cart.quantity, 0);

        cartUIEle.innerHTML = this.carts.map((cart) => `
            <li style="
                list-style: none;
                background: #fff;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.07);
                margin: 10px 0;
                padding: 18px 22px;
                display: flex;
                align-items: center;
                gap: 18px;
            ">
                <div style="
                    width: 48px; height: 48px;
                    background: #f5f5f5;
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 2em; color: #bbb;
                ">
                    🛒
                </div>
                <div style="flex:1;">
                    <div style="font-size: 1.2em; font-weight: 600; color: #222;">${cart.productName}</div>
                    <div style="color: #555; margin: 4px 0 2px 0;">
                        <span style="font-weight:500;">₹${cart.price}</span> 
                        <span style="font-size:0.95em; color:#888;">/ ${cart.unit}</span>
                    </div>
                    <div style="color: #00796b; font-size: 1em; margin-top: 2px;">
                        Quantity: <b>${cart.quantity}</b>
                    </div>
                    <div style="color: #d32f2f; font-size: 1em; margin-top: 2px;">
                        Total: <b>₹${cart.price * cart.quantity}</b>
                    </div>
                </div>
            </li>
        `).join("");

        // Update the fixed grand total
        cartTotalEle.innerText = `Grand total: ₹${total}`;
    }
    getGrandTotal(){
        let Grandtotal= this.carts.reduce((total, cart) => total + (cart.price * cart.quantity), 0)
        return Grandtotal;
    }
}

let store = new EcommerceStore()
store.addProduct()