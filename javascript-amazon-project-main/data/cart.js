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
}