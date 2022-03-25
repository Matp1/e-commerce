const link = (product) => `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
const fetchProducts = async (product) => {
  // seu código aqui
  try {
    const url = link(product);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
