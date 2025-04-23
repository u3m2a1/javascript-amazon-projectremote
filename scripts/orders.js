import { getProduct, loadProductsFetch } from "../data/product.js";
import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import formatCurrency from "./utils/money.js";
import { addToCart, calculateCartQuantity, cart } from "../data/cart.js";

const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

async function loadPage() {
  await loadProductsFetch();

  let ordersHTML = '';

  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left">
            <div class="order-date">
              <div class="order-header-label">
                Order Placed:
              </div>
              <div>${orderTimeString}</div>
            </div>

            <div class="order-total">
              <div class="order-header-label">
                Total:
              </div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right">
            <div class="order-header-label">
              Order Id:
            </div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsHTML(order)}
        </div>    
      </div>
    `;
  });

  function productsHTML(order) {
    let productsHTML = '';

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);

      productsHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>

          <div class="product-arrival">
            Arriving on: ${
              dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
            }
          </div>

          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>

          <button class="buy-again-button button-primary js-buy-again-button"
            data-product-id="${product.id}">
            <img src="images/icons/buy-again.png" class="buy-again-icon">
            <span class="buy-again-text">
              Buy it again
            </span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return productsHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again-button').forEach((button) =>{
    button.addEventListener('click', () => {
      addToCart(button.dataset.productId);

      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    })
  });

}

loadPage();