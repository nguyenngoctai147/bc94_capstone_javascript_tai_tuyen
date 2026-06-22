import Service from "./../services/api.js";
import Product from "./../models/product.js";

const service = new Service();

function getID(id) {
  return document.getElementById(id);
}

function getListProduct() {
  const promise = service.getListProductAPI();
  promise
    .then(function (result) {
      const data = result.data;
      console.log(data);
      renderUI(data);
    })
    .catch(function (error) {
      console.log("error server: ", error);
    });
}

function renderUI(list) {
  let content = "";

  for (let i = 0; i < list.length; i++) {
    const product = list[i];
    content += `
            <tr>
                <td>${i + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><img src="./../../assets/img/${product.image}" /></td>
                <td>${product.description}</td>
                <td>
                    <button class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="handleEdit(${product.id});">Edit</button>
                    <button class="btn btn-danger" onclick="handleDelete(${product.id});">Delete</button>
                </td>
            </tr>
        `;
  }

  document.getElementById("tblDanhSachSP").innerHTML = content;
}

getListProduct();

function handleDelete(id) {
  const promise = service.delProduct(id);
  promise
    .then(function (result) {
      const data = result.data;
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}
window.handleDelete = handleDelete;

// Tạo các thuộc tính trong Modal thêm sản phẩm
getID("btnThemSP").onclick = function () {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";

  const btnAdd = `<button class="btn btn-primary" onclick="handleAddProduct();">Add product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};

// Tạo phần thêm sản phẩm
function handleAddProduct() {
  const name = getID("TenSP").value;
  const price = getID("GiaSP").value * 1;
  const image = getID("HinhSP").value;
  const description = getID("MoTa").value;

  const product = new Product("", name, price, image, description);

  const promise = service.addProduct(product);

  promise
    .then(function (result) {
      const data = result.data;
      console.log(data);
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
window.handleAddProduct = handleAddProduct;

// Tạo các thuộc tính trong Modal Sửa sản phẩm
function handleEdit(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";

  const btnEdit = `<button class="btn btn-warning" onclick="handleEditItem(${id});">Edit product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnEdit;

  const promise = service.getProductById(id);
    promise
    .then(function (result) {
      const data = result.data;
      console.log(data);

      getID("TenSP").value = data.name;
      getID("GiaSP").value = data.price;
      getID("HinhSP").value = data.image;
      getID("MoTa").value = data.description;

    })
    .catch(function (error) {
      console.log(error);
    });
}
window.handleEdit = handleEdit;

// Xử lý cập nhập sản phẩm
function handleEditItem(id) {
  const name = getID("TenSP").value;
  const price = getID("GiaSP").value * 1;
  const image = getID("HinhSP").value;
  const description = getID("MoTa").value;

  const product = new Product(id, name, price, image, description);

  const promise = service.editItemProduct(product);
    promise
    .then(function (result) {
      const data = result.data;
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
window.handleEditItem = handleEditItem;