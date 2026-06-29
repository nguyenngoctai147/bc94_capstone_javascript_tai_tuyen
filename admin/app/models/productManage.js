class ProductManage {
  constructor() {
    this.arrData = [];
  }

  filterNameProduct(input, data) {
    const searchText = input?.trim().toLowerCase();
    if (!searchText) {
      return data;
    }
    const arrFilter = [];
    for (let i = 0; i < data.length; i++) {
      const product = data[i];
      const productName = product.name?.toLowerCase();
      if (productName && productName.includes(searchText)) {
        arrFilter.push(product);
      }
    }
    return arrFilter;
  }

  sortItem(value, data) {
    if (value === 0) {
      return data;
    }

    const sortedData = data.slice();

    for (let i = 0; i < sortedData.length - 1; i++) {
      for (let j = i + 1; j < sortedData.length; j++) {
        if (value === 1 && sortedData[i].price > sortedData[j].price) {
          const temp = sortedData[i];
          sortedData[i] = sortedData[j];
          sortedData[j] = temp;
        } else if (value === 2 && sortedData[i].price < sortedData[j].price) {
          const temp = sortedData[i];
          sortedData[i] = sortedData[j];
          sortedData[j] = temp;
        }
      }
    }

    return sortedData;
  }
}

export default ProductManage;
