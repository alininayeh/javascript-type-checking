class MyApp {
  productDropdown = document.querySelector('#product');
  priceButton = document.querySelector('#getPrice');
  price = document.querySelector('#price');
  totalPrice = document.querySelector('#totalPrice');

  constructor() {
    this.getProducts();
    this.addEvents();
  }

  getProducts() {
    fetch('products.json')
      .then(response => response.json())
      .then((data) => {
        this.populateDropdown(data);
      })
  }

  addEvents() {
    this.priceButton.addEventListener('click', () => {
      const price = this.getPrice();
      this.price.innerHTML = price.price;
      this.totalPrice.innerHTML = price.totalPrice;
    });
  }

  populateDropdown(data) {
    this.productDropdown.innerHTML =  data.reduce((html, item) => {
      return html + `<option value="${item.price}" data-has-vat-free-promo="${item.hasVatFreePromo || ''}">${item.name}</option>`;
    }, '');
  }

  getDropdownValue() {
    const selectedOption = document.querySelector('option:checked');

    return {
      price: parseInt(selectedOption.getAttribute('value')),
      hasVatFreePromo: !!selectedOption.dataset.hasVatFreePromo
    }
  }

  getPrice() {
    const VAT = 0.2;
    const dropdownValue = this.getDropdownValue();
    const price = dropdownValue.price;
    const totalPrice = dropdownValue.hasVatFreePromo ? price : price + price * VAT;
    return {price, totalPrice};
  }
}

const PriceCalculator = new MyApp();
