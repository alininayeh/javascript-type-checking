const VAT = 0.2;

function getPriceWithVat(price) {
  return price + price * VAT;
}

document.getElementById('getPrice').onclick = () => {
  const val = parseInt(document.getElementById('price').value);
  alert('The price with VAT added is ' + getPriceWithVat(val));
}