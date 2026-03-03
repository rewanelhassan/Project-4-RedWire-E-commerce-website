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


let badge=document.querySelector(".badgee")
let carts_products_div=document.querySelector(".carts-products div")

function saveCart(){
    localStorage.setItem("cart",JSON.stringify(cart))

}
 

function increase(id){
    let item=cart.find( i => id===i.id)
    item.qty++;
    document.getElementById(`price-${id}`).innerHTML= "Price: $" + item.qty*item.price;
    document.getElementById(`qty-${id}`).innerHTML=item.qty
    updateBadge()
    saveCart()
    calTotal()
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
        handleRemove(id)
    }
    updateBadge()
    saveCart()
    calTotal()
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

let allproducts=document.querySelector(".allproducts")
function drawProducts(item){
    let y = products.map( item => {

        let inCart = cart.find( i => i.id===item.id)
        let infav = fav_items.includes(item.id)
        return`
       <div class="col-md-4 col-sm-6">
            <div class="product-item rounded text-center shadow p-3">
                <img class="img-fluid mb-2 rounded" src="${item.imgURL}" alt="" />
                <div class="product-item-content my-2 fs-6">
                    <h5>${item.title}</h5>
                    <p>Price: ${item.price}</p>
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

function removeFromCart(id){
    cart = cart.filter(item => item.id !== id);
    saveCart();
}




 