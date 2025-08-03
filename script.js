document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  // Функция добавления товара
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.closest(".product");
      const id = product.dataset.id;
      const name = product.dataset.name;
      const price = parseFloat(product.dataset.price);

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ id, name, price, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`Додано "${name}" у кошик!`);
    });
  });

  // Функция отображения кошика
  const cartItemsContainer = document.querySelector("#cart-items");
  const totalContainer = document.querySelector("#total");

  if (cartItemsContainer && totalContainer) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;
    cartItemsContainer.innerHTML = ""; // Очищаем перед отрисовкой

    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} – ${item.quantity} x ${item.price} грн`;
      cartItemsContainer.appendChild(li);
      total += item.quantity * item.price;
    });

    totalContainer.textContent = `Загальна сума: ${total} грн`;

    const checkoutButton = document.getElementById("checkout");
    if (checkoutButton) {
      checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
          alert("Ваш кошик порожній 😢");
          return;
        }
        alert("Замовлення оформлено! Дякуємо! ❤️");
        localStorage.removeItem("cart");
        location.reload();
      });
    }
  }
});
