class Validation {
  checkEmptyField(valueInput, eID, message) {
    if (valueInput === "") {
      document.getElementById(eID).innerText = message;
      document.getElementById(eID).style.display = "block";
      return false;
    }
    document.getElementById(eID).innerText = "";
    document.getElementById(eID).style.display = "none";
    return true;
  }

  checkIsExist(value, eID, message, arr) {
    let isExist = false;
    for (let i = 0; i < arr.length; i++) {
      const product = arr[i];
      if (product.id === value) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      document.getElementById(eID).innerText = message;
      document.getElementById(eID).style.display = "block";
      return false;
    }
    document.getElementById(eID).innerText = "";
    document.getElementById(eID).style.display = "none";
    return true;
  }
}

export default Validation;
