
let dropdown_search = document.getElementById("dropdown-search");
let dropdown_items = document.querySelectorAll(".dropdown-ops");
let searchInput = document.getElementById("search");

let searchType = "title"; 


dropdown_items.forEach(item => {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        dropdown_search.innerHTML = this.textContent; 

        if (this.textContent.toLowerCase().includes("category")) {
            searchType = "category";
        } else {
            searchType = "title";
        }
    });
});


searchInput.addEventListener("input", function () {
    let query = this.value.toLowerCase();
    
    let filteredProducts = products.filter((product) => {
        
        if (!product[searchType]) return false;
        
        return product[searchType].toLowerCase().includes(query);
    });

    drawProducts(filteredProducts); 
});





////////////////////
let user_info=document.getElementById("user-info")
let user=document.querySelector("#user")
let loglinks=document.querySelector(".loglinks")
let getitem=localStorage.getItem("firstname")

if(getitem){
    user_info.classList.remove("d-none");
    user_info.style.display="block";
    loglinks.remove();
    user.innerHTML="Hello,"+ getitem;
}

/////////////////////

let outbtn = document.getElementById("outbtn")
outbtn.addEventListener("click",()=>{
    localStorage.clear();
    setTimeout(()=> {
        window.location="login.html";
    },1500)
})


/////////////////////////////////////////



let allproducts=document.querySelector(".allproducts")


let cart=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): [];
let fav_items= localStorage.getItem("fav-items")? JSON.parse(localStorage.getItem("fav-items")):[]
let carts_products_div=document.querySelector(".carts-products div")
let badge=document.querySelector(".badgee")

let products=[
    {
        id:1,
        title:"Apple AirPods Pro",
        price:249,
        category:"Audio",
        imgURL:"images-proj-4/195950543698-frontimage.webp",
    },
    {
        id:2,
        title:"Apple iPhone 17 Pro max",
        price:999,
        category:"Smartphones",
        imgURL:"images-proj-4/Apple-iPhone-17-Pro-4x3-166_4x3.jpg",
    },
    {
        id:3,
        title:"Apple Watch Series9",
        price:399,
        category:"Watches",
        imgURL:"images-proj-4/Apple-Watch-Series-11-42mm-Silver-Aluminum-Case-Purple-Fog-Sport-Band-frontimage.webp",
    },
    {
        id:4,
        title:"Apple iPhone 15",
        price:899,
        category:"Smartphones",
        imgURL:"images-proj-4/61DjMd76QnL._AC_UF894,1000_QL80_.jpg",
    },
    {
        id:5,
        title:"Apple iPad 11 pro",
        price:799,
        category:"Smartphones",
        imgURL:"images-proj-4/250x270_3.avif",
        
    },
    {
        id:6,
        title:"Apple MacBook Air (M2, 13-inch)",
        price:1099,
        category:"Laptops",
        imgURL:"images-proj-4/2025_Q4_Dec_Mobile_BAU_W53_PLP_Left_Tile_MacBook_Air_v17777.jpg",
    },
     {
        id:7,
        title:"Apple Watch Series 9",
        price:399,
        category:"Watches",
        imgURL:"images-proj-4/Apple-Watch-Series-3-3.jpg",
    },
    
    {
        id:8,
        title:"Apple AirPods (3rd Generation)",
       price:289,
        category:"Audio",
        imgURL:"images-proj-4/images.jpg",
    },
    {
        id:9,
        title:"Apple MacBook Air (M3, 13-inch)",
       price:999,
        category:"Laptops",
        imgURL:"images-proj-4/57_3b7e9b1b-04d9-4a2d-884a-c32c7gg35e753b.jpg",
    }
]



function saveCart(){
    localStorage.setItem("cart",JSON.stringify(cart))

}



function drawProducts(itemtoshow=products){
    let y = itemtoshow.map( item => {

        let inCart = cart.find( i => i.id===item.id)
        let infav = fav_items.includes(item.id)
        return`
       <div class="col-sm-1 col-md-6 col-lg-4">
            <div class="product-item rounded text-center shadow bg-light ">
                <img class="img-fluid mb-2 rounded" src="${item.imgURL}" alt="" />
                <div class="product-item-content my-2 fs-6">
                    <h5>${item.title}</h5>
                    <p class="fw-semibold" >Price: $${item.price}</p>
                    <p class="sp">Category: ${item.category}</p>
                </div>
                <div class="product-item-action d-flex justify-content-center align-items-center">
                    <i class="${infav ? "fas text-danger" : "far"} fa-heart mx-3 fs-5 " fav="${item.id}"></i>
                    <button class="btn ${inCart ? "btn-danger" : "btn-dark"} add-to-cart px-3" onclick="toggleCart(${item.id})">
                        ${inCart ? "Remove from Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>`;
    }).join("");

    allproducts.innerHTML=y;
        
}



function renderSavedCard(){
    carts_products_div.innerHTML = "";

    cart.forEach(item => {
        let product=products.find(i => i.id=== item.id)
        carts_products_div.innerHTML += `
    <div class="add-to-cart-div" id="cart-item-${item.id}">
    <span><strong>${product.title}</strong></span>
    <span id="price-${item.id}">Price: $${item.price*item.qty }</span>
    
    <div class="buttons">
        <button onclick="increase(${item.id})" class="btn btn-outline-secondary btn-sm">+</button> 
        <span id="qty-${item.id}">${item.qty}</span>
        <button  onclick="decrease(${item.id})" class="btn btn-outline-danger btn-sm">-</button>
    </div>
   </div> `
    })
    updateBadge();
}



drawProducts()
renderSavedCard()
updateBadge()
 


function toggleCart(id){
    if(getitem){
        let existing = cart.find(item => item.id === id);

        if(existing){ 
        cart = cart.filter(item => item.id !== id);

        let cartDiv = document.getElementById(`cart-item-${id}`);
        if(cartDiv) cartDiv.remove();

        saveCart();
       } else {
        addToCart(id);  
    }

    updateBadge();   
    drawProducts();

    }else{
        alert("Please LogIn first !!!")
        setTimeout(()=> {
        window.location="login.html";
        },500) 
   }
}

////////////////////////////////////////////////




 
function addToCart(id){
    badge.style.display="block"
    let existing = cart.find( item => id=== item.id )
    if(existing){
        existing.qty+=1;
        let qtyspan =document.getElementById(`qty-${id}`)
        qtyspan.innerHTML=existing.qty
    }else{
        let choosenproduct=products.find((item)=> id===item.id)
        cart.push({id:id ,qty:1 , price:parseInt(choosenproduct.price ) })
        carts_products_div.innerHTML += `
    <div class="add-to-cart-div" id="cart-item-${id}">
    <span><strong>${choosenproduct.title}</strong></span>
    <span id="price-${choosenproduct.id}">Price: $${parseInt(choosenproduct.price ) }</span>
    
    <div class="buttons">
        <button onclick="increase(${choosenproduct.id})" class="btn btn-outline-secondary btn-sm">+</button> 
        <span id="qty-${choosenproduct.id}">1</span>
        <button  onclick="decrease(${choosenproduct.id})" class="btn btn-outline-danger btn-sm">-</button>
    </div>
   </div> 
   `
    }
updateBadge()
saveCart()
}

////////////////////////////////////////

function increase(id){
    let item=cart.find( i => id===i.id)
    item.qty++;
    document.getElementById(`price-${id}`).innerHTML= "Price: $" + item.qty*item.price;
    document.getElementById(`qty-${id}`).innerHTML=item.qty
    updateBadge()
    saveCart()
}

function decrease(id){
    let item=cart.find(i=> i.id===id)
    
    if(item.qty >1){
        item.qty--;
        document.getElementById(`qty-${id}`).innerHTML=item.qty
        document.getElementById(`price-${id}`).innerHTML= "Price: $" + item.qty*item.price;
    
    }else{
        cart=cart.filter(i => i.id!==id)
        let cartDiv = document.getElementById(`cart-item-${id}`);
        if(cartDiv) cartDiv.remove();
        drawProducts()
    }
    updateBadge()
    saveCart()
}

function updateBadge(){
    let total = 0;

    cart.forEach(item => {
        total += item.qty;
    });

    badge.innerHTML = total;

    if(total > 0){
        badge.style.display = "block";
    } else {
        badge.style.display = "none";
    }
}


 



///////////////////////////////////////////////


let carts_products=document.querySelector(".carts-products")
let shopping_cart_i=document.querySelector(".fa-shopping-cart")

shopping_cart_i.addEventListener("click",openCart)
function openCart(){
    if(carts_products_div.innerHTML !=""){
        if(carts_products.style.display==="none"){
            carts_products.style.display="block"
        }else{
            carts_products.style.display="none"
        }
    }
}


//////////////////////////////////////////



function saveFavs(id){
    if(fav_items.includes(id)){
        fav_items=fav_items.filter(i => id !== id)
    }else{
        fav_items.push(id)
    }
    localStorage.setItem("fav-items",JSON.stringify(fav_items))

}


document.addEventListener("click", function (e) {
    if(e.target.classList.contains("fa-heart")){
        if(getitem){
            e.target.classList.toggle("text-danger");
            e.target.classList.toggle("fas");
            e.target.classList.toggle("far");

            let id = parseInt(e.target.getAttribute("fav"))
            saveFavs(id);
        
        } 
        else{
        alert("Please LogIn first!!! ")
        setTimeout(()=> {
        window.location="login.html";
    },500)
    }
    }
})









