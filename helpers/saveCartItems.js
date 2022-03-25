const saveCartItems = (elem) => {
  // seu código aqui
  localStorage.setItem('cartItems', elem);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
