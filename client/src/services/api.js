class Services {
  getProductbyId(id) {
    const url = `https://6a183c631878294b597ca1eb.mockapi.io/api/products-capstone-js/${id}`;
    const promise = axios({
      url: url,
      method: "GET",
    });
    return promise;
  }
  getAllProduct() {
    const url = `https://6a183c631878294b597ca1eb.mockapi.io/api/products-capstone-js`;
    const promise = axios({
      url: url,
      method: "GET",
    });
    return promise;
  }
}

export default Services;
