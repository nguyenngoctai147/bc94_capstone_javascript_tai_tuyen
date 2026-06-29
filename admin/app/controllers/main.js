import Service from "./../services/api.js";
import Product from "./../models/product.js";
import ProductManage from "./../models/productManage.js";
import Validation from "../models/validation.js";

const service = new Service();
const productManage = new ProductManage();
const arrData = productManage.arrData;
const validation = new Validation();

function getID(id) {
  return document.getElementById(id);
}

function getInputProduct(isInput) {
  const txt_id = getID("txt_id").value;
  const txt_name = getID("txt_name").value;
  const txt_price = getID("txt_price").value * 1;
  const txt_screen = getID("txt_screen").value;
  const txt_backCamera = getID("txt_backCamera").value;
  const txt_frontCamera = getID("txt_frontCamera").value;
  const txt_img = getID("txt_img").value;
  const txt_desc = getID("txt_desc").value;
  const sel_type = getID("sel_type").value;

  let isValid = true;

  if (isInput) {
    isValid &=
      validation.checkEmptyField(
        txt_name,
        "txt_infoName",
        "Tên sản phẩm không được bỏ trống",
      ) &&
      validation.checkCharacterField(
        txt_name,
        "txt_infoName",
        "Tên sản phẩm phải là ký tự chữ cái",
      );

    isValid &=
      validation.checkEmptyField(
        txt_price,
        "txt_infoPrice",
        "Giá tiền không được bỏ trống",
      ) &&
      validation.checkPrice(
        txt_price,
        "txt_infoPrice",
        "Giá tiền không được nhỏ hơn 0",
      );

    isValid = validation.checkEmptyField(
      txt_screen,
      "txt_infoScreen",
      "Vui lòng nhập thông tin màn hình",
    );

    isValid = validation.checkEmptyField(
      txt_backCamera,
      "txt_infoBackCamera",
      "Vui lòng nhập thông tin Camera sau",
    );

    isValid = validation.checkEmptyField(
      txt_frontCamera,
      "txt_infoFrontCamera",
      "Vui lòng nhập thông tin Camera trước",
    );

    isValid = validation.checkEmptyField(
      txt_img,
      "txt_infoIMG",
      "Vui lòng nhập đường dẫn hình ảnh",
    );

    isValid = validation.checkSelectOption(
      getID("sel_type"),
      "txt_infoType",
      "Vui lòng chọn hãng máy",
    );

    isValid = validation.checkEmptyField(
      txt_desc,
      "txt_infoDesc",
      "Vui lòng nhập mô tả sản phẩm",
    );
  }

  if (!isValid) return;

  const product = new Product(
    txt_id,
    txt_name,
    txt_price,
    txt_screen,
    txt_backCamera,
    txt_frontCamera,
    txt_img,
    txt_desc,
    sel_type,
  );

  return product;
}

function renderListProduct() {
  const promise = service.getListProductAPI();
  promise
    .then(function (result) {
      const data = result.data;
      arrData.splice(0, arrData.length, ...data);
      renderUI(data);
    })
    .catch(function (error) {
      console.log("error server: ", error);
    });
}
renderListProduct();
// setInterval(renderListProduct, 3000);

function renderUI(data) {
  let content = "";

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    content += `
        <tr>
          <td class="text-center">${i + 1}</td>
          <td><img src="${item.img}" width="70px" height="70px" alt="${item.desc}" /></td>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.type}</td>
          <td>$${item.price}</td>
          <td>${item.screen}</td>
          <td>${item.desc}</td>
          <td class="text-center">
            <button onclick="handleModalEdit('${item.id}')" class="btn btn-warning" data-toggle="modal" data-target="#myModal">Sửa</button>
            <button onclick="handleDelete('${item.id}')" class="btn btn-danger">Xóa</button>
          </td>
        </tr>
    `;
  }
  document.getElementById("tblDanhSachSP").innerHTML = content;
}

function resetInput() {
  getID("txt_id").value = "";
  getID("txt_name").value = "";
  getID("txt_price").value = "";
  getID("txt_screen").value = "";
  getID("txt_backCamera").value = "";
  getID("txt_frontCamera").value = "";
  getID("txt_img").value = "";
  getID("txt_desc").value = "";
  getID("sel_type").value = "";
}

function disableAlert() {
  getID("txt_infoName").style.display = "none";
  getID("txt_infoPrice").style.display = "none";
  getID("txt_infoScreen").style.display = "none";
  getID("txt_infoBackCamera").style.display = "none";
  getID("txt_infoFrontCamera").style.display = "none";
  getID("txt_infoIMG").style.display = "none";
  getID("txt_infoType").style.display = "none";
  getID("txt_infoDesc").style.display = "none";
}

// Tạo các thuộc tính trong Modal thêm sản phẩm
getID("btnThemSP").onclick = function () {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm sản phẩm - Vineta";
  const btnAdd = `<button class="btn btn-primary" onclick="handleAdd();">OK</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
  getID("img_thumbnail").style.display = "none";
  resetInput();
  disableAlert();
};

// Tạo phần thêm sản phẩm
function handleAdd() {
  const product = getInputProduct(true);
  if (!product) return;
  const promise = service.addProduct(product);
  promise
    .then(function (result) {
      const data = result.data;
      renderListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
window.handleAdd = handleAdd;

// Tạo phần xóa sản phẩm
function handleDelete(id) {
  const promise = service.delProduct(id);
  promise
    .then(function (result) {
      const data = result.data;
      renderListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}
window.handleDelete = handleDelete;

// Tạo các thuộc tính trong Modal Sửa sản phẩm
function handleModalEdit(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Sửa sản phẩm - Vineta";
  getID("img_thumbnail").style.display = "inline-block";
  const btnEdit = `<button class="btn btn-warning" onclick="handleEdit();">Cập nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnEdit;
  disableAlert();

  const promise = service.getProductById(id);
  promise
    .then(function (result) {
      const data = result.data;
      getID("txt_id").value = data.id;
      getID("txt_name").value = data.name;
      getID("txt_price").value = data.price;
      getID("txt_screen").value = data.screen;
      getID("txt_backCamera").value = data.backCamera;
      getID("txt_frontCamera").value = data.frontCamera;
      getID("txt_img").value = data.img;
      getID("img_thumbnail").innerHTML =
        `<img width="70px" height="70px" src="${data.img}" />`;
      getID("txt_desc").value = data.desc;
      getID("sel_type").value = data.type;
    })
    .catch(function (error) {
      console.log(error);
    });
}
window.handleModalEdit = handleModalEdit;

// Xử lý cập nhập sản phẩm
function handleEdit() {
  const product = getInputProduct(true);
  if (!product) return;
  const promise = service.editProduct(product);
  promise
    .then(function (result) {
      const data = result.data;
      renderListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
window.handleEdit = handleEdit;

const btn_search = getID("btn_search");
btn_search.onclick = function () {
  const txt_search = getID("txt_search").value;
  const arrFilter = productManage.filterNameProduct(txt_search, arrData);
  renderUI(arrFilter);
};

const sel_sort = getID("sel_sort");
sel_sort.addEventListener("change", function () {
  const selectedItem = parseInt(this.options[this.selectedIndex].value, 10);
  const arrSort = productManage.sortItem(selectedItem, arrData);
  renderUI(arrSort);
});
