function createCard(product, result) {
  const { name, price, description, image } = product;

  const div = document.createElement("div");
  div.style.width = "330px";
  if (result) {
    div.style.boxShadow = "0 0 10px red";
  } else {
    div.style.boxShadow = "0 0 10px green";
  }

  div.style.textAlign = "Center";
  div.style.padding = "10px 20px";

  const img = document.createElement("img");
  img.src = image;

  img.style.width = "100%";
  img.style.height = "200px";

  const h3 = document.createElement("h3");
  h3.textContent = name;
  if (result) {
    h3.style.color = "red";
  } else {
    h3.style.color = "green";
  }
  h3.style.margin = "20px 0px";

  const pricePara = document.createElement("p");
  pricePara.textContent = "$" + price;

  const descriptionPara = document.createElement("p");
  descriptionPara.textContent = description.slice(0, 100);
  descriptionPara.style.margin = "20px 0px";
  descriptionPara.style.fontStyle = "italic";

  const button = document.createElement("button");
  if (result) {
    button.textContent = "Remove From Cart";
    button.style.backgroundColor = "red";
  } else {
    button.textContent = "Add to Cart";
  }

  button.id = "addToCart";
  button.onclick = function () {
    if (button.textContent === "Add to Cart") {
      div.style.boxShadow = "0 0 10px red";
      h3.style.color = "red";
      button.textContent = "Remove From Cart";
      button.style.backgroundColor = "red";

      var carts = localStorage.getItem("carts");
      carts = JSON.parse(carts);

      carts.push(product);

      localStorage.setItem("carts", JSON.stringify(carts));
    } else {
      div.style.boxShadow = "0 0 10px green";
      h3.style.color = "green";
      button.textContent = "Add to Cart";
      button.style.backgroundColor = "green";

      var carts = localStorage.getItem("carts");
      carts = JSON.parse(carts);

      var filteredProducts = carts.filter((cartProduct) => {
        return cartProduct.name !== name;
      });

      localStorage.setItem("carts", JSON.stringify(filteredProducts));
    }
  };

  div.appendChild(img);
  div.appendChild(h3);
  div.appendChild(pricePara);
  div.appendChild(descriptionPara);
  div.appendChild(button);

  const productsSection = document.getElementById("products");
  productsSection.appendChild(div);
}

function createMultiCards() {
  var products = localStorage.getItem("products");
  products = JSON.parse(products);

  var carts = localStorage.getItem("carts");
  carts = JSON.parse(carts);

  products.forEach((product) => {
    var result = carts.find((cart) => {
      return cart.name === product.name;
    });

    createCard(product, result);
  });
}

function filterProductsBasedOnCategory(categoryName) {
  var filteredProducts;

  //Step1
  var products = JSON.parse(localStorage.getItem("products"));

  //step2
  var productsSection = document.getElementById("products");

  products.forEach(() => {
    if (productsSection.firstElementChild) {
      productsSection.firstElementChild.remove();
    }
  });

  //Step3

  if (categoryName !== "all") {
    filteredProducts = products.filter((product) => {
      return product.category === categoryName;
    });
  } else {
    filteredProducts = products;
  }
  //step4

  var carts = localStorage.getItem("carts");
  carts = JSON.parse(carts);

  filteredProducts.forEach((product) => {
    var result = carts.find((cart) => {
      return cart.name === product.name;
    });

    createCard(product, result);
  });
}