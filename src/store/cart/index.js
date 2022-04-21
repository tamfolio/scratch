import Cookies from 'js-cookie'

export const parseJson = (data) => {
  let value = [];
  try {
    if (data) {
      value = JSON.parse(data);
    }
  } catch (error) {
    value = [];
  }
  return value;
}

export const getCart = () => {
  return parseJson(Cookies.get('betascratch_cart'));
};

export const emptyCart = () => {
  Cookies.set('betascratch_cart', JSON.stringify([]))
}

export const editCart = (ref, value) => {
  let cart = parseJson(Cookies.get('betascratch_cart'));
  for (let index = 0; index < cart.length; index++) {
    if (cart[index].ref == ref) {
      cart[index] = value;
      break;
    }
  }
  Cookies.set('betascratch_cart', JSON.stringify(cart))
}

export const addToCart = (data) => {
  let cart = parseJson(Cookies.get('betascratch_cart'));
  data.ref = (cart.length + 1);
  cart.push(data);
  Cookies.set('betascratch_cart', JSON.stringify(cart))
};


export const delFromCart = (ref) => {
  let cart = parseJson(Cookies.get("betascratch_cart"));
  let newCart = [...cart.filter(d => d.ref !== ref)];
  for (let index = 0; index < newCart.length; index++) {
    newCart[index]['ref'] = (index + 1);
  }
  Cookies.set('betascratch_cart', JSON.stringify(newCart))
};

export const getProperty = (cart, id, property) => {
  return cart.filter((d) => d.id == id).map(d => d[property]);
}

export const gp = (products, id) => {
  return products.filter(d => d.id == id)[0];
}


export const totalPrice = (fetch, store) => {
  return store.length ? store.map((d) => {
    return gp(fetch, d.id)?.price * d.quantity;
  })
    .reduce((p, n) => p + n) : "0"
}

export const cartQuantity = (cart, id) => {
  return cart.filter((d) => d.id == id)
    .map((d) => d.id)
    .reduce((a, b) => a + b);
}