const links = (numero) => `https://api.mercadolibre.com/items/${numero}`;
const fetchItem = async (numero) => {
  // seu código aqui
try {
    const url = links(numero);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
  };
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
