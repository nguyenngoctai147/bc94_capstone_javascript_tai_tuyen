// function getListProduct() {
//   const url = "https://6a183c631878294b597ca1eb.mockapi.io/api/Product";

//   document.getElementById("nnt__loader").style.display = "block";
//   const promise = axios({
//     url: url,
//     method: "GET",
//   });

//   promise
//     .then(function (result) {
//       document.getElementById("nnt__loader").style.display = "none";
//       const data = result.data;
//       console.log(data);
//       renderUI(data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// function renderUI(data) {
//   let content = "";

//   for (let i = 0; i < data.length; i++) {
//     const product = data[i];
//     content += `
//     `;
//   }

//   document.getElementById("product__content").innerHTML = content;
// }

// getListProduct();
