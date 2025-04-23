import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/product.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function load() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let productDetails;
  order.products.forEach((details) => {
    if(details.productId === product.id)
    {
      productDetails = details;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  const trackingHTML = `
    <a href="orders.html"  class="link-primary view-all-link">
      View all orders
    </a>

    <div class="delivery-details">
      Arriving on ${
        dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
      }
    </div> 

    <div class="product-name">
      ${product.name}
    </div>

    <div class="product-quantity">
      Quantity: ${productDetails.quantity}
    </div>

    <img src="${product.image}" class="product-image">

    <div class="progress-label-container">
      <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
        Preparing
      </div>
      <div class="progress-label current-status ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
        Shipped
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? 'current-status' : ''
      }">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

load();

