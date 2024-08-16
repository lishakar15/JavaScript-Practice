import {carts,addToCart} from "../data/cart.js";
import {products,loadProducts} from "../data/products.js";
import { convertCents } from "./Money.js";

export const renderProductsGrid = function ()
{
  let productsHtml ='';

  products.forEach((product)=>{
    const productPrice = convertCents(product.priceCents);
  const html = `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
              $${productPrice}
            </div>
  
            <div class="product-quantity-container ">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart js-added-message-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button js-add-to-cart-btn button-primary"
            data-product-id="${product.id}">
              
            Add to Cart
            </button>
          </div>`;
          productsHtml+=html;
  });
  
  const updateQuantityInCart = function ()
  {
    let totalQuantity = 0;
          carts.forEach((cart)=>{
            totalQuantity+=cart.quantity;
          });   
          const quantityElement = document.querySelector(".js-cart-quantity");
          quantityElement.innerHTML= totalQuantity;
  }
  
  const productElement = document.querySelector('.js-products-grid')
  productElement.innerHTML=productsHtml;
  
  const addToCartElements = document.querySelectorAll(".js-add-to-cart-btn");
  addToCartElements.forEach((btnElement)=>{
      btnElement.addEventListener('click',()=>
      {
          const productId =  btnElement.dataset.productId;
          addToCart(productId);
          updateQuantityInCart();
      })
  });
}

loadProducts(renderProductsGrid);