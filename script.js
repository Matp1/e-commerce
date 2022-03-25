function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  const items = localStorage.getItem('cartItems');
  if (items) {
    const newItems = items.replace(event.target.outerHTML, '');
  localStorage.setItem('cartItems', newItems);
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
const adicionaItem = async (event) => {
  const id = getSkuFromProductItem(event.target.parentNode);
  const obj = await fetchItem(id);
  const item = createCartItemElement({ sku: [obj.id], name: [obj.title], salePrice: [obj.price] });
  if (item) {
    const element = document.getElementsByClassName('cart__items')[0];
  element.appendChild(item);

  saveCartItems(element.innerHTML);
  }
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.onclick = adicionaItem;
  section.appendChild(button);
  return section;
}
const cleanCart = () => {
  const cartList = document.querySelector('.cart__items');
  cartList.innerHTML = '';
  localStorage.removeItem('cartItems');
};
const chamaFetchProducts = async () => {
   /* const produtos = await fetchProducts('computador');  */
   const obj = await fetchProducts('computador');
  const item = obj.results.map((elem) => (
    {
      sku: elem.id,
      name: elem.title,
      image: elem.thumbnail,
    }
  ));

  item.forEach((elem) => {
    const element = document.getElementsByClassName('items')[0];
    element.appendChild(createProductItemElement(elem));
  });
};

window.onload = () => { 
chamaFetchProducts();
const element = document.getElementsByClassName('cart__items')[0];
element.innerHTML = getSavedCartItems();

const items = document.querySelectorAll('.cart__items');
for (let x = 0; x < items.length; x += 1) {
  items[x].onclick = cartItemClickListener;
}
const emptyCart = document.querySelector('.empty-cart');
emptyCart.onclick = cleanCart;
};
