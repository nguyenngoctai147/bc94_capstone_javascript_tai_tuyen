class ProductManage {
  constructor() {
    this.arrCart = [];
  }

  findIndexProduct(id) {
    let index = -1;
    for (let i = 0; i < this.arrCart.length; i++) {
      const product = this.arrCart[i];
      if (product.id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  addItemToCart(item) {
    const index = this.findIndexProduct(item.id);
    if (index === -1) {
      this.arrCart.push(item);
    } else {
      if (typeof this.arrCart[index].countItem === "number") {
        this.arrCart[index].countItem += 1;
      } else {
        this.arrCart[index].countItem = 2;
      }
      this.arrCart[index].calcTotalItemCart();
    }
    return this.arrCart;
  }

  deleteItemCart(id) {
    const index = this.findIndexProduct(id);
    if (index !== -1) {
      this.arrCart.splice(index, 1);
      return;
    }
  }

  countItemCart() {
    let count = 0;
    for (let i = 0; i < this.arrCart.length; i++) {
      count++;
    }
    return count;
  }

  filterProduct(selectedType, data) {
    let arrFilter = [];

    if (selectedType === "all") {
      return data;
    }

    for (let i = 0; i < data.length; i++) {
      const product = data[i];
      if (product.type == selectedType) {
        arrFilter.push(product);
      }
    }
    return arrFilter;
  }

  descreaseItemCart(id, value) {
    const index = this.findIndexProduct(id);
    if (index !== -1) {
      if (value >= 1) {
        this.arrCart[index].countItem = value;
        this.arrCart[index].calcTotalItemCart();
      } else {
        this.deleteItemCart(id);
        alert(`Đã xóa MaSP: ${id}!`);
      }
    }
    return this.arrCart;
  }

  increaseItemCart(id, value) {
    const index = this.findIndexProduct(id);
    if (index !== -1) {
      this.arrCart[index].countItem = value;
      this.arrCart[index].calcTotalItemCart();
    }
    return this.arrCart;
  }

  calcTotalCart() {
    let total = 0;

    for (let i = 0; i < this.arrCart.length; i++) {
      total += this.arrCart[i].price * this.arrCart[i].countItem;
    }

    return total;
  }

  clearItemAllCart() {
    this.arrCart.length = 0;
    return this.arrCart;
  }
}

export default ProductManage;
