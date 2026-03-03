
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

/////////////////////////////////
function saveCart(){
    localStorage.setItem("cart",JSON.stringify(cart))

}
let cart=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): [];
let allcartproducts=document.querySelector(".allcartproducts")

 

if(cart.length > 0){
    drawCartProducts(cart);
    calTotal();
}

function drawCartProducts(productss){
    let y = productss.map((item)=>{
        let product = products.find(p => p.id === item.id)
        return `<div class="col-lg-5 mb-3">
        <div class="cart-item  shadow-sm rounded p-3 d-flex align-items-center" id="cart-item${item.id}">

          <div class="cart-img me-4">
            <img src="${product.imgURL}" alt="" class="img-fluid rounded" />
          </div>

          <div class="cart-details flex-grow-1">
            <h5 class="fw-bold mb-1">${product.title}</h5>
            <p class="text-muted mb-1">Category: ${product.category}</p>
            <p class="fw-bold text-success mb-3" id="price-${product.id}">Price: $${product.price * item.qty}</p>

            <div class="d-flex justify-content-between align-items-center">
              <div class="quantity-box d-flex align-items-center">
                <button onclick="decrease(${product.id})" class="btn btn-outline-secondary btn-sm">-</button>
                <span class="mx-3 fw-bold" id="qty-${product.id}">${item.qty}</span>
                <button onclick="increase(${product.id})" class="btn btn-outline-secondary btn-sm">+</button>
              </div>
              <button class="btn btn-outline-danger btn-sm" onclick="handleRemove(${product.id})">Remove</button>
            </div>
          </div>

        </div>
      </div>`;
    }).join("");
    allcartproducts.innerHTML = y;
}
updateBadge()
function calTotal(){
    let total = 0;
    cart.forEach(item => {
        let product=products.find(i => i.id === item.id)
        total += product.price * item.qty;
    });
    document.querySelector("#total-price").innerHTML = "Total Price: $" + total;
}

 function handleRemove(id){
    removeFromCart(id);         
    drawCartProducts(cart);    
    calTotal();                
    updateBadge();             
}


/////////////////////////////////

let fav_items= localStorage.getItem("fav-items")? JSON.parse(localStorage.getItem("fav-items")):[]
let allfavproducts=document.querySelector(".allfavproducts")

if(fav_items.length > 0){
    drawfav_items();
}


function saveFavs(id){

    if(!fav_items.includes(id)){
        fav_items.push(id)
        localStorage.setItem("fav-items", JSON.stringify(fav_items))
    }

    drawfav_items() 
}

function drawfav_items(){

    allfavproducts.innerHTML = ""

    let y = fav_items.map( item => {
         let product = products.find(p => p.id === item)
         if(!product) return "";
        return` <div class="col-md-3 col-sm-4">
            <div class="fav-item rounded-1 text-center shadow bg-light mx-1" id="${item}">
              <img
                class="img-fluid mb-2 rounded-1"
                src="${product.imgURL}"
                alt=""
              />

              <div
                class="fav-item-content my-2 fs-6 justify-content-center align-items-center"
              >
                <p class="fw-bold"> ${product.title}</p>
                <p class="sp">Category : ${product.category}</p>
                <i class="fas fa-heart mx-3 fs-5 mb-3 text-danger" onclick="removefromfav(${item})"></i>
              </div>
            </div>
          </div>
`
    } ).join("")
    allfavproducts.innerHTML=y;
}

drawfav_items();

 
function removefromfav(id){
     
    fav_items = fav_items.filter(i => i !== id)
    localStorage.setItem("fav-items", JSON.stringify(fav_items))
    drawfav_items()
}