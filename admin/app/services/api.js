class Service {
  getListProductAPI() {
    const url = "https://6a183c631878294b597ca1eb.mockapi.io/api/Product";

    const promise = axios({
      url: url,
      method: "GET",
    });
    return promise;
  }

  delProduct(id) {
    const url = `https://6a183c631878294b597ca1eb.mockapi.io/api/Product/${id}`;
    const promise = axios({
        url: url,
        method: "DELETE"
    });
    return promise;
  }

  addProduct(product) {
    const url = `https://6a183c631878294b597ca1eb.mockapi.io/api/Product`;
    const promise = axios({
        url: url,
        method: "POST",
        data: product
    });
    return promise;
  }

  getProductById(id) {
    const url = `https://6a183c631878294b597ca1eb.mockapi.io/api/Product/${id}`;
    const promise = axios({
        url: url,
        method: "GET"
    });
    return promise;
  }

  editItemProduct(product) {
    const url = `https://6a183c631878294b597ca1eb.mockapi.io/api/Product/${product.id}`;
    const promise = axios({
        url: url,
        method: "PUT",
        data: product
    });
    return promise;
  }
}

export default Service;
