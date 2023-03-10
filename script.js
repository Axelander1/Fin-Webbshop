

// Script har bearbetats, men hämtades ursprungligen från:
// https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp 
//Dessa två funktioner öppnar respektive stänger sidebar:en.

function openNav() {
    document.getElementById("mySidebar").style.width = "220px";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }

// Delvis hämtad från 
// https://stackoverflow.com/questions/52049021/if-statement-to-check-css-property-not-working
// Bestämmer ifall sidebar:en ska öppnas eller stängas, och gör detta genom att kolla ifall den är stor eller liten.

function deciderFunction() {
    var sidebar = document.getElementById("mySidebar");

    // Get the computed style, that is the combination of styles 
    // resulting from your CSS classlist, etc
    var computedStyle = window.getComputedStyle(sidebar, null); 

    // Get visibility value from computed styles
    var widthValue = computedStyle.getPropertyValue("width")

    if (widthValue == "220px" ) {
        closeNav()
    } 
    else {
        openNav()
    }

}

// Kod för kundvagn, ursprungligen hämtad från: "JavaScript Shopping Cart Tutorial Part 1/5 -> Part 5/5" av Telmo Sampaio på YouTube.

//allting suger, inget funkar. javaScript är ett demoniskt programmeringsspråk
//(ok nvm)

let carts = document.querySelectorAll(".add-to-cart");

var products = []


let productsOnPage = document.querySelectorAll(".product-card")
let productTitles = document.querySelectorAll(".product-title")
let productSrc = document.querySelectorAll(".product-image")
let productPrice = document.querySelectorAll(".product-price-text")
let productAlt = document.querySelectorAll(".product-image")

for( let i=0; i < productsOnPage.length; i++) {   
    let productIntPrice = productPrice[i].innerText
    productIntPrice = productIntPrice.replace("kr","")
    productIntPrice = parseInt(productIntPrice)
   
    products.push(
        {
            name:productTitles[i].innerText, tag:productAlt[i].alt, src:productSrc[i].src, price:productIntPrice, inCart:0
        }
    )
}

console.log(products)

/*let products = [
    {
        name: 'Dator',
        tag: "dator",
        src: "images/Screen1.webp",
        price: 2999,
        inCart: 0
    },

    {
        name: 'Grej',
        tag: "grej",
        src: "images/Screen1.webp",
        price: 3999,
        inCart: 0
    },

    {
        name: 'Penis',
        tag: "penis",
        src: "images/Screen1.webp",
        price: 2999,
        inCart: 0
    },

    {
        name: 'fuck you',
        tag: "fuck",
        src: "images/Screen1.webp",
        price: 2999,
        inCart: 0
    },

    {
        name: 'AAAA',
        tag: "aaaa",
        src: "images/Screen1.webp",
        price: 2999,
        inCart: 0
    },

    {
        name: 'Projektor',
        tag: "projektor",
        src: "images/Screen1.webp",
        price: 2999,
        inCart: 0
    }
]*/



for( let i=0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
        console.log("JavaScript är ett demoniskt språk");   
        cartNumbers(products[i]);
        totalCost(products[i])
        displayCart();
    }) 
    console.log(carts[i])
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers")

    if( productNumbers ) {
        document.querySelector("#cart-item-number").innerHTML = productNumbers
    }
}

function cartNumbers(product) {
    console.log("the product clicked was", product)
    let productNumbers = localStorage.getItem("cartNumbers")
    productNumbers = parseInt(productNumbers);

    if ( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector("#cart-item-number").innerHTML = productNumbers + 1;
        console.log(".cart-item-number")
    }
    else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector("#cart-item-number").innerHTML = 1;
    }

    setItems(product)

}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log("My cartItems are:", cartItems)

    if(cartItems != null) {
        if(cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }  
        cartItems[product.name].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        } 
    }

    console.log("inside of SetItems function")
    console.log("my product is", product)
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price)
    }else {
        localStorage.setItem("totalCost", product.price)
    }


}

function clearCart () {

    let cartProductColumn = document.querySelector("#cart-page-product-column")
    let sum = document.querySelector("#sum")
    let itemsInCart = document.querySelector("#cart-item-number")
    cartProductColumn.innerHTML = "";
    sum.innerText = "Total Summa:";
    itemsInCart.innerText = "";

    localStorage.clear()
    onLoadCartNumbers()
    displayCart()

}

function displayCart() {

    let cartItems = localStorage.getItem("productsInCart");
    console.log(cartItems)
    cartItems = JSON.parse(cartItems);
    console.log(cartItems)
    let productContainer = document.querySelector("#cart-page-container")
    let cartProductColumn = document.querySelector("#cart-page-product-column")
    
    let sum = document.querySelector("#sum")
    let totalCost = localStorage.getItem("totalCost")
    totalCost = JSON.parse(totalCost)
    
    if( cartItems && productContainer) {
        console.log("Adding items from cart to HTML")
        cartProductColumn.innerHTML = "";
        sum.innerText = "";
        
        Object.values(cartItems).map(item => {
            cartProductColumn.innerHTML += `
            <div class = "cart-page-product-row">
            <img class = "cart-page-image" src = ${item.src} alt = "${item.tag}">
            <div class="cart-page-text">
                <h3>${item.name}</h3>
                <h5> ${item.price}kr</h5>
            </div>
            <div class="cart-page-quantity">
                <p class= "quantity">Antal: ${item.inCart}</p>
                <button class = "remove-btn">Ta bort från kundvagnen</button>
    
            </div>
        </div>
            `
        })
        sum.innerText = `Total summa: ${totalCost}kr` 
        onLoadCartNumbers();
        
    }
    removeButton();
}

window.addEventListener("storage", () => {
    console.log("Tjena Daniil");
    displayCart();
  });

// Denna kod hanterar att ta bort objekt från kundvagnen.

function removeButton() {
    let remove = document.querySelectorAll(".remove-btn");
    console.log(remove)
    console.log(remove.length);
    
    for (let i = 0; i < remove.length; i++) {
        remove[i].addEventListener("click", () => {
            console.log("varför funkar du inte????")
            removeItemFromCart(i)
        })}


}

function removeItemFromCart (i) {
    console.log("Removing item form local storage")
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"))
    let totalCost = localStorage.getItem("totalCost")
    let cartNumbers = localStorage.getItem("cartNumbers")
    costProduct = productsInCart[Object.keys(productsInCart)[i]]  
    totalCost = totalCost - (costProduct.price * costProduct.inCart)
    cartNumbers = cartNumbers - costProduct.inCart
    delete productsInCart[Object.keys(productsInCart)[i]]    

    localStorage.setItem("cartNumbers", cartNumbers)
    localStorage.setItem("totalCost", totalCost)
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart))
    
    displayCart();
}



function completePurchase() {
    let cartProductColumn = document.querySelector("#cart-page-product-column")
    let sum = document.querySelector("#sum")
    let itemsInCart = document.querySelector("#cart-item-number")
    cartProductColumn.innerHTML = "";
    sum.innerText = "Total Summa:";
    itemsInCart.innerText = "0";
    
    console.log("hej hej tjena tjena")
    alert("Tack för ditt köp!");
    localStorage.clear();

    window.location.href = "index.html";
}



onLoadCartNumbers();
displayCart();




console.log("Finished loading")