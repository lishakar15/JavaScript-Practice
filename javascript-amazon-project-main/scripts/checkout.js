import { products  } from "../data/products.js";
import {convertCents} from "./currencyConverter.js"

let carts = JSON.parse(localStorage.getItem('cartsList'));

if(!carts)
{
    carts = [
        {
            productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity : 2
        },
        {
            productId : "54e0eccd-8f36-462b-b68a-8182611d9add",
            quantity : 1
        }
    ];
}


let orderSummaryHTML="";
let totalItemsCount =0;
carts.forEach((cart)=>
{

    const productId = cart.productId;
    let productName;
    let productImage;
    let productPrice;
    products.forEach((product)=>{
        if(cart.productId === product.id)
        {
            productName = product.name;
            productImage = product.image;
            productPrice = convertCents(product.priceCents);

        }
    });

orderSummaryHTML+= `
          <div class="cart-item-container js-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${productImage}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${productName}
                </div>
                <div class="product-price">
                  ${productPrice}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-${productId}">${cart.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id=${productId}>
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                   name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;
totalItemsCount+=cart.quantity;
}
);

const summaryElement = document.querySelector(".js-order-summary");
summaryElement.innerHTML=orderSummaryHTML;
const checkoutItemsCountElement = document.querySelector('.js-checkout-total-items');
checkoutItemsCountElement.innerHTML = `${totalItemsCount} items`;

const deleteElements = document.querySelectorAll(".js-delete");
deleteElements.forEach((deleteElement)=>
{
    deleteElement.addEventListener('click',()=>{
        const deleteProductId = deleteElement.dataset.productId;
        deleteProductFromCart(deleteProductId);
    });
});
const doUpdateOperation = function()
{
  const updateLinkElements = document.querySelectorAll('.js-update-link');
updateLinkElements.forEach((updateLinkElement)=>{
  const productId = updateLinkElement.dataset.productId;
  updateLinkElement.addEventListener('click',()=>{
    let updateHTML =`<input style ="width:40px;" name="newQuantity" id ="newQuantity" class="new-quantity">
    <button style="background-color:green;color:white;" class="save-quantity-btn">Save</button>`
    let newSpan = document.createElement("span");
    newSpan.classList.add("js-update-text");
    newSpan.innerHTML=updateHTML;
    updateLinkElement.parentNode.replaceChild(newSpan,updateLinkElement);
    const saveButtonElement = document.querySelector('.save-quantity-btn');
      saveButtonElement.addEventListener('click',()=>saveQuantity(productId));
  });

});
}
doUpdateOperation();

function deleteProductFromCart(productId)
{
    const deleteElement = document.querySelector(".js-item-container-"+productId);

    //Remove item from carts
    let newCarts = [];
    carts.forEach((cart)=>{
        if(productId !== cart.productId)
        {
            newCarts.push(cart);
        }
    });
    carts =[];
    carts = newCarts;
    //Store the current cart details in local storage
    localStorage.setItem('cartsList',JSON.stringify(carts));
    //Remove the deleted item's div
    deleteElement.remove();
    updateTotalItems();
}
const saveQuantity = function (productId)
{
  const newQuantity = document.querySelector('.new-quantity').value;
  document.querySelector(`.js-quantity-${productId}`).innerHTML=newQuantity;
  let updateTexElement = document.querySelector('.js-update-text');
  let originalElement = document.createElement("span");
  originalElement.classList.add("update-quantity-link", "link-primary", "js-update-link");
  originalElement.dataset.productId=productId;
  originalElement.innerHTML="Update";
updateTexElement.parentNode.replaceChild(originalElement,updateTexElement);
doUpdateOperation();
carts.forEach((cart)=>{
  if(cart.productId === productId)
  {
    cart.quantity=Number(newQuantity);
  }
  localStorage.setItem("cartsList",JSON.stringify(carts));
  updateTotalItems();
});
}
const updateTotalItems = function()
{
  let totalItemsCount = 0;
  carts.forEach((cart)=>{
    totalItemsCount+=cart.quantity;
  });
  const checkoutItemsCountElement = document.querySelector('.js-checkout-total-items');
checkoutItemsCountElement.innerHTML = `${totalItemsCount} items`;
};