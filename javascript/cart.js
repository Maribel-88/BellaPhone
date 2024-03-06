let ShoppingCart = document.getElementById("product-details");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y) => x + y, 0);
    
  };
  
  calculation();
  
   let generateCartItems = () => {
    if(basket.length !==0){
       return (ShoppingCart.innerHTML = basket.map((x) => 
       {
        let { id, item } = x;
        let search = shopItemsData.find((y)=>y.id === id) || [];
        let {img, name, price}= search;
        return`  

                <div class="row" id="product-details">
                    <div class="col-md-6"><img class="img-fluid" width="120" height="150" src=${img} alt="" /></div>
                    <div class="col-md-4">£ ${price}</div>
                    <div class="col-md-2">
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                        <button onclick="decrement(${id})" type="button" class="btn btn-light bi bi-dash-lg"></button>
                        <button id=${id} type="button" class="btn btn-light quantity">${item}</button>
                        <button onclick="increment(${id})" type="button" class="btn btn-light bi bi-plus-lg"></button>
                         </div>
                    </div> 
                </div>
          
               
                  
         

          
        `;
       })
       .join(""));
    }
    else{
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="welcome.html">
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
    label.innerHTML = `
    <h2>Grand Total : £ ${amount}</h2>
    <button onclick="checkout()" class="checkout"><a href="checkout.html">Checkout</a></button>
    <button onclick="clearCart()"class="removeAll">Clear Cart</button>
    `;
   
    } else return;
};

TotalAmount();