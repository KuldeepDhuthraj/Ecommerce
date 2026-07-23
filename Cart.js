function removeCartProduct(productName) {
  var carts = JSON.parse(localStorage.getItem("carts") || "[]");

  var updatedCarts = carts.filter(function (cart) {
    return cart.name !== productName;
  });

  localStorage.setItem("carts", JSON.stringify(updatedCarts));
  getCartProducts();
}

function getCartProducts() {
  var carts = JSON.parse(localStorage.getItem("carts") || "[]");
  var tbody = document.querySelector("tbody");

  tbody.innerHTML = "";

  if (carts.length === 0) {
    var emptyRow = document.createElement("tr");
    var emptyCell = document.createElement("td");
    emptyCell.colSpan = 5;
    emptyCell.textContent = "Your cart is empty.";
    emptyRow.appendChild(emptyCell);
    tbody.appendChild(emptyRow);
    return;
  }

  carts.forEach(function (cart) {
    var tr = document.createElement("tr");

    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    var img = document.createElement("img");
    img.width = "50";
    img.height = "50";
    img.src = cart.image;

    var button = document.createElement("button");
    button.textContent = "remove";
    button.type = "button";
    button.onclick = function () {
      removeCartProduct(cart.name);
    };

    td1.appendChild(img);
    td2.textContent = cart.name;
    td3.textContent = cart.price;
    td4.textContent = 1;
    td5.appendChild(button);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbody.appendChild(tr);
  });
}