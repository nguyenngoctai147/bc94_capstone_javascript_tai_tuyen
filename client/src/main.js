import Product from "./model/product.js";
import Services from "./services/api.js";
import ProductManage from "./model/productManage.js";

const services = new Services();
const productManage = new ProductManage();

function getId(id) {
  return document.getElementById(id);
}

function showListProduct() {
  const promise = services.getAllProduct();
  promise
    .then(function (result) {
      getId("nnt__loader").style.display = "none";
      const data = result.data;
      renderUI(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
showListProduct();

function renderUI(data) {
  let content = "";

  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    content += `
        <div
              class="grid-item w-full overflow-hidden bg-white rounded-2xl shadow-2xl shadow-gray-200 hover:shadow-gray-300 transition duration-400 ease-in-out"
            >
              <a href="#" class="block aspect-square overflow-hidden p-6">
                <img
                  src="${product.img}"
                  class="object-cover transition duration-700 ease-in-out hover:scale-105"
                />
              </a>
              <div class="function__product-item px-8">
                <ul class="flex justify-center gap-3">
                  <li>
                    <button
                      onclick="handleAddCart('${product.id}');"
                      class="cart__item w-16 h-16 text-center block leading-[4.2rem] rounded-full bg-[#ddd]"
                      ><i class="fa-solid fa-cart-arrow-down"></i
                    ></button>
                  </li>
                  <li>
                    <a
                      class="cart__item w-16 h-16 text-center block leading-[4.2rem] rounded-full bg-[#ddd]"
                      ><i class="fa-solid fa-heart"></i
                    ></a>
                  </li>
                  <li>
                    <button
                      onclick="handleQuickView('${product.id}');"
                      class="cart__item w-16 h-16 text-center block leading-[4.2rem] rounded-full bg-[#ddd]"
                      data-modal-target="quickview-modal"
                      data-modal-toggle="quickview-modal"
                      ><i class="fa-solid fa-eye"></i
                    ></button>
                  </li>
                </ul>
              </div>
              <div class="product__content-item px-8 py-8 text-center">
                <h5
                  class="sub__title-product text-gray-600 font-medium uppercase mb-2"
                >
                  ${product.type}
                </h5>
                <a href="#" class="title__product"
                  ><h4 class="text-3xl font-black mb-4">${product.name}</h4></a
                >
                <p class="description__item mb-4 text-gray-500">
                  ${product.desc}
                </p>
                <div class="price__item text-2xl text-gray-600 font-bold">
                  $${product.price}
                </div>
              </div>
            </div>
    `;
  }

  document.getElementById("product__append").innerHTML = content;
}

function renderUICart(data = []) {
  let content = ``;

  if (data.length === 0) {
    getId("product__cartBottom").style.display = "none";
    content = `Chưa có sản phẩm nào trong giỏ hàng`;
  }

  for (let i = 0; i < data.length; i++) {
    getId("product__cartBottom").style.display = "block";
    const itemCart = data[i];
    content += `
              <div
                  class="item-product relative flex flex-col items-center bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs md:flex-row md:max-w-xl md:flex-row md:max-w-xl"
                >
                  <a href="#"
                    ><img
                      class="object-cover w-full rounded-base h-48 md:h-auto md:w-48 mb-4 md:mb-0"
                      src="${itemCart.img}"
                      alt=""
                  /></a>

                  <div class="flex flex-col justify-between md:p-4 leading-normal">
                    <h5 class="mb-2 text-body tracking-tight text-heading">
                      ${itemCart.name}
                    </h5>
                    <p class="price font-bold text-[#0052a3] text-xl mb-6 text-body">
                      $${itemCart.price}
                    </p>
                    <div class="flex flex-col gap-2">
                      <form class="max-w-xs mx-auto mb-2">
                        <div
                          class="relative flex items-center max-w-[9rem] shadow-xs rounded-base"
                        >
                          <button
                            onclick="handleDescCountItem('${itemCart.id}');"
                            type="button"
                            id="decrement-button"
                            class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-s-base text-sm px-3 focus:outline-none h-10"
                          >
                            <svg
                              class="w-4 h-4 text-heading"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 12h14"
                              />
                            </svg>
                          </button>
                          <input
                            type="number"
                            id="quantity-${itemCart.id}"
                            class="border-x-0 h-10 placeholder:text-heading text-center w-full bg-neutral-secondary-medium border-default-medium py-2.5 placeholder:text-body"
                            placeholder="0"
                            value="${itemCart.countItem}"
                            required
                          />
                          <button
                          onclick="handleIncrCountItem('${itemCart.id}');"
                            type="button"
                            id="increment-button"
                            class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-e-base text-sm px-3 focus:outline-none h-10"
                          >
                            <svg
                              class="w-4 h-4 text-heading"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 12h14m-7 7V5"
                              />
                            </svg>
                          </button>
                        </div>
                      </form>
                      <div class="font-bold text-body">Sub total: $${itemCart.totalItem}</div>
                    </div>
                  </div>
                  <button
                    onclick="handleDeleteItemCart('${itemCart.id}');"
                    type="button"
                    class="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none"
                    aria-label="Remove"
                  >
                    <span class="sr-only">Remove</span>
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                  </button>
                </div>
    `;
  }

  getId("product__cartContent").innerHTML = content;
}

function renderTotalPriceItem() {
  const totalPriceItem = productManage.calcTotalCart();
  const txt__totalPriceItem = getId("txt__totalPriceItem");
  txt__totalPriceItem.innerText = `$${totalPriceItem}`;
}

function handleQuickView(id) {
  const promise = services.getProductbyId(id);
  promise
    .then(function (result) {
      const data = result.data;
      getId("modal_name").innerText = data.name;
      getId("modal_type").innerText = data.type;
      getId("thumnail_1").src = data.img;
      getId("thumnail_2").src = data.img;
      getId("modal_price").innerText = `$${data.price}`;
      getId("modal_screen").innerText = data.screen;
      getId("modal_backCamera").innerText = data.backCamera;
      getId("modal_frontCamera").innerText = data.frontCamera;
      getId("modal_desc").innerText = data.desc;

      getId("btn__addToCartModal").innerHTML = `
        <a
                    onclick="handleAddCart('${data.id}');"
                    title=""
                    class="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                    role="button"
                  >
                    <svg
                      class="w-5 h-5 -ms-2 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                      />
                    </svg>
                    Add to cart
                  </a>
      `;
    })
    .catch(function (error) {
      console.log(error);
    });
}
window.handleQuickView = handleQuickView;

const selectedTypeProduct = getId("filter_product");
selectedTypeProduct.addEventListener("change", function () {
  const selectedType = this.options[this.selectedIndex].value;
  const promise = services.getAllProduct();
  promise
    .then(function (result) {
      const data = result.data;
      const filterType = productManage.filterProduct(selectedType, data);
      renderUI(filterType);
    })
    .catch(function (error) {
      console.log(error);
    });
});

function handleAddCart(id) {
  getId("product__cartBottom").style.display = "block";
  const promise = services.getProductbyId(id);
  promise
    .then(function (result) {
      const data = result.data;
      const product = new Product(
        data.id,
        data.name,
        data.price,
        data.screen,
        data.backCamera,
        data.frontCamera,
        data.img,
        data.desc,
        data.type,
      );
      product.countProductAdd();
      product.calcTotalItemCart();

      productManage.addItemToCart(product);
      renderUICart(productManage.arrCart);
      renderCountItemCart();
      renderTotalPriceItem();

      setLocalStorage();
      alert(`Đã thêm MaSP: ${id} vào giỏ hàng!`);
    })
    .catch(function (error) {
      console.log(error);
    });
}
window.handleAddCart = handleAddCart;

function handleDeleteItemCart(id) {
  productManage.deleteItemCart(id);
  const listUICart = productManage.arrCart;
  renderUICart(listUICart);
  renderCountItemCart();
  renderTotalPriceItem();

  setLocalStorage();
  alert(`Đã xóa MaSP: ${id}!`);
}
window.handleDeleteItemCart = handleDeleteItemCart;

function renderCountItemCart() {
  const countItem = productManage.countItemCart();
  getId("count_itemCart").innerHTML = countItem;
  getId("count_itemCartPhone").innerHTML = countItem;
}

function handleDescCountItem(id) {
  const getValue = getId(`quantity-${id}`).value;
  let value = Number(getValue) - 1;
  const listDescreaseCart = productManage.descreaseItemCart(id, value);
  renderUICart(listDescreaseCart);
  renderCountItemCart();
  renderTotalPriceItem();
  setLocalStorage();
}
window.handleDescCountItem = handleDescCountItem;

function handleIncrCountItem(id) {
  const getValue = getId(`quantity-${id}`).value;
  let value = Number(getValue) + 1;
  const listIncreaseCart = productManage.increaseItemCart(id, value);
  renderUICart(listIncreaseCart);
  renderCountItemCart();
  renderTotalPriceItem();
  setLocalStorage();
}
window.handleIncrCountItem = handleIncrCountItem;

const btn__clearCart = getId("btn__clearCart");
btn__clearCart.onclick = function () {
  productManage.clearItemAllCart();
  renderUICart(productManage.arrCart);
  renderCountItemCart();
  renderTotalPriceItem();
  setLocalStorage();
};

function setLocalStorage() {
  const data = JSON.stringify(productManage.arrCart);
  localStorage.setItem("LIST_CART", data);
}

function getLocalStorage() {
  const dataString = localStorage.getItem("LIST_CART");
  const data = JSON.parse(dataString);
  if (dataString) {
    productManage.arrCart = data.map((item) => {
      const product = new Product(
        item.id,
        item.name,
        item.price,
        item.screen,
        item.backCamera,
        item.frontCamera,
        item.img,
        item.desc,
        item.type,
      );
      product.countItem = item.countItem;
      product.totalItem = item.totalItem;
      return product;
    });
    renderUICart(productManage.arrCart);
    renderCountItemCart();
    renderTotalPriceItem();
  }
}

getLocalStorage();
