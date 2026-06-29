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

  checkCharacterField(value, eID, message) {
    const letter =
      /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĂĐĨŨƠƯàáâãèéêìíòóôõùúýăđĩũơưẠ-ỹ\s]+$/u;
    if (letter.test(value)) {
      document.getElementById(eID).innerHTML = "";
      document.getElementById(eID).style.display = "none";
      return true;
    }
    document.getElementById(eID).innerHTML = message;
    document.getElementById(eID).style.display = "block";
    return false;
  }

  checkPrice(value, eID, message) {
    if (value > 0) {
      document.getElementById(eID).innerHTML = "";
      document.getElementById(eID).style.display = "none";
      return true;
    }
    document.getElementById(eID).innerHTML = message;
    document.getElementById(eID).style.display = "block";
    return false;
  }

  checkSelectOption(selectElement, eID, message) {
    const selectedValue =
      typeof selectElement === "string" ? selectElement : selectElement?.value;

    if (selectedValue && selectedValue !== "") {
      document.getElementById(eID).innerHTML = "";
      document.getElementById(eID).style.display = "none";
      return true;
    }

    document.getElementById(eID).innerHTML = message;
    document.getElementById(eID).style.display = "block";
    return false;
  }
}

export default Validation;
