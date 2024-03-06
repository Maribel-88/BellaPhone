
let shop = document.getElementById('shop');

let basket = [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let { id,name,price,desc,img,pge } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
                    <div class="col-md-6 col-lg-3 col-sm-12 item" >
                        <div class="card bg-light mb-5" style="height:650px" id=product-id-${id};>
                                <div class="card-body text-start">
                                    <p class="card-text">Apple</p>
                                    <h3 class="card-title mb-3" id="phoneName">${name}</h3>
                                    <a href="${pge}"><img class="img-fluid"src=${img}  alt="" id="imagePhone"><br><br></a>
                                    <p class="card-text text-center"> ${desc}</p>
                                    
                                </div>
                                <div class="price-quantity">
                                        <div id="price"><h2>£${price}</h2></div>
                                        <div class="btn-group btn-group-sm " role="group" aria-label="Basic example">
                                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                            <div id=${id}  class="btn btn-light quantity">0</div>
                                            <i onclick="increment(${id})" class=" bi bi-plus-lg"></i>
                                        </div>
                                </div>  
                        </div>
                    </div>
                 
      `;
    }) 
    .join(""));
};

generateShop();
console.log(shop);

 
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

 
  
  //console.log(basket);
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

  
  
  //console.log(basket);
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation =()=>{
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = (basket.map((x)=>x.item).reduce((x,y) => x + y, 0));
  
};

calculation();


