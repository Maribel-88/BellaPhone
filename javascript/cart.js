let ShoppingCart = document.getElementById("product-details");
let EmptyLabel = document.getElementById("shoppingEmpty");
let EmptyCart = document.getElementById("shoppingTableCart");
let subTotal = document.getElementById("subTotalrow");
let subTotal1 = document.getElementById("amountTotal");
let discount = document.getElementById("discount-row");
let discountPrice = document.getElementById("discount15");
let shippingCost = document.getElementById("shippingFee");
let postage = document.getElementById("postage-row");
let orderTotal = document.getElementById("totalPrice");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y) => x + y, 0);
    
  };
  
  calculation();
  
   let generateCartItems = () => {
    if(basket.length !==0){
       return (productDetails.innerHTML = basket.map((x) => 
       {
        let { id, item } = x;
        let search = shopItemsData.find((y)=>y.id === id) || [];
        let {img,desc, price}= search;
        return`  
                      
                          <div class="col-6 mb-5 "  >
                               <h6>${desc}</h6>
                               <div><img  src=${img} alt="" id="imgCart"/></div>
                          </div>
                          <div class="col-2">
                                <div>${price}.00</div>
                          </div>
                          <div class="col-2 container-fluid">
                              <div class="btn-group btn-group-sm col-2" role="group" aria-label="Basic example">
                                    <button onclick="decrement(${id})" type="button" class="btn btn-light bi bi-dash-lg"></button>
                                    <button id=${id} type="button" class="btn btn-light quantity">${item}</button>
                                    <button onclick="increment(${id})" type="button" class="btn btn-light bi bi-plus-lg"></button>
                              </div>
                              <div><button onclick="removeItem(${id})">Delete</button></div>

                          </div> 
                          <hr>
        `;
       })
       .join(""));
    }
    else{
      EmptyCart.innerHTML = ``;
      EmptyLabel.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
         <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }
   };

   generateCartItems();

   let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if(search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    }
    else {
      search.item += 1;
    }
     
    generateCartItems();
    update(selectedItem.id);
    
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) return;
    else if(search.item === 0) return; 
    else {
      search.item -= 1;
    }

    
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  };

  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
  };

  let removeItem =(id)=>{
    let selectedItem=id;
    // console.log(selectedItem.id);
    basket = basket.filter((x)=>x.id !== selectedItem.id)
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));

}

let clearCart = ()=>{
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};


let TotalAmount = () => {
    if(basket.length !==0)
    { 
        
        let amount = basket.map((x) =>{
        let { item, id} = x;
        let search = shopItemsData.find((y)=> y.id === id) || [];
        return item * search.price;
    }).reduce((x,y)=>x+y, 0);
    // console.log(amount);
    subTotal.innerHTML = `
               
                      <div class="col-md-6" id="subTotalrow1">Subtotal</div>
                      <div class="col-md-4" id="amountTotal">£ ${amount}.00</div>
                 
    `;
    discount.innerHTML =`
                      <div class="col-md-6">Discount</div>
                      <div class="col-md-4" id="discount15">- £ 15.00</div>

    `;
    postage.innerHTML = `
                      <div class="col-md-8">Postage & Packing:</div>
                      <div class="col-md-4" id="shippingFee"> £ 5.00</div>
    `;

    subTotal = amount - 10 ;
    orderTotal.innerHTML = `
    <div class="col-md-4" id="totalPrice">£${subTotal}.00</div>
    `
    } else return;
};

TotalAmount();


