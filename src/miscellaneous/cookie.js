import Cookies from 'js-cookie'
import parseJson from "../helper/parseJson";

export const getCart = () => {
  return Cookies.get('tc_cart');
};


const fillCart = (cart) => {
  Cookies.set('tc_cart', JSON.stringify(cart))
};

export const emptyCart = () => {
  Cookies.set('tc_cart', JSON.stringify([]))
}

export const editCart = (ref, value) => {
  let cart = parseJson(Cookies.get('tc_cart'));
  for (let index = 0; index < cart.length; index++) {
    if (cart[index].ref == ref) {
      cart[index] = value;
      break;
    }
  }
  Cookies.set('tc_cart', JSON.stringify(cart))
}

export const addCart = (data) => {
  let cart = parseJson(Cookies.get('tc_cart'));
  data.ref = (cart.length + 1);
  cart.push(data);
  Cookies.set('tc_cart', JSON.stringify(cart))
};

export const delCart = (ref) => {
  let cart = parseJson(window.localStorage.getItem("tc_cart"));
  let newCart = [...cart.filter(d => d.ref !== ref)];
  for (let index = 0; index < newCart.length; index++) {
    newCart[index]['ref'] = (index + 1);
  }
  Cookies.set('tc_cart', JSON.stringify(newCart))
};