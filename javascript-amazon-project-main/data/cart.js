import {products} from "../data/products.js";
export const carts = [];



export const addToCart = function(productId)
{
  let productName;
        products.forEach((product)=>{
          if(product.id === productId)
          {
            productName = product.name;
          }
        });
        const selectQuantityElement = document.querySelector(`.js-quantity-selector-${productId}`); 
        const selectedQuantity = Number(selectQuantityElement.value);
        console.log("selectedQuantity = "+selectedQuantity);
        //Check if the same product is already exists
        let productMatchFound = false;
        carts.forEach((cart)=>{
            if(cart.productId === productId)
            {
                productMatchFound =true;
                cart.quantity+=selectedQuantity;
                showAddedMessage(productId);
            }
        });
        if(!productMatchFound)
        {
            carts.push({
                "productId":productId,
                "productName":productName,
                "quantity":selectedQuantity
            });
            showAddedMessage(productId); 
        }
        localStorage.setItem('cartsList',JSON.stringify(carts));
}

const showAddedMessage = function (productId)
{
  const messageElement = document.querySelector('.js-added-message-'+productId);
  console.log("messageElement "+messageElement);
  messageElement.style.opacity= "1";

  setTimeout(()=>
  {
    messageElement.style.opacity= "0";
  },1000);
}
