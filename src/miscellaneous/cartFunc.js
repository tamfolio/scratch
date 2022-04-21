export const cartQuantity = (cart, id) => {
  return cart.filter((d) => d.id == id)
    .map((d) => d.id)
    .reduce((a, b) => a + b);
}

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

export const getUUID = () => {
  let d = (performance && performance.now && (performance.now() * 1000)) || 0;
  return 'xx-xx-4x-yx-x'.replace(/[xy]/g, c => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    }
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
}






// const addToCart = () => {
//   let json = {
//     id: product.id,
//     quantity,
//     colors: color.join(","),
//     sizes: size.join(","),
//     others: other.join(","),
//   };
//   addCart(json);
//   toast.success("Product added to cart", { autoClose: 2000 });
//   setTimeout(() => setCart(parseJson(getCart()).length), 600);
// };


// const handleQuantity = (ref, button, quantity, stock) => {
//   let newQty = quantity;
//   if (button == "minus" && quantity > 1) {
//     newQty--;
//   } else if (
//     button == "plus" &&
//     (stock == "infinite" || stock * 1 > quantity * 1)
//   ) {
//     newQty++;
//   }
//   if (newQty != quantity) {
//     let store = cartStore;
//     store = store.filter((d) => d.ref == ref)[0];
//     store.quantity = newQty;
//     editCart(ref, store);
//     setTimeout(() => {
//       let ct = parseJson(getCart());
//       setCartStore(ct);
//       setPrice(totalPrice(cartItems, ct));
//     }, 400);
//   }
// };


// const handleDelete = (ref) => {
//   delCart(ref);
//   setTimeout(() => {
//     let ct = parseJson(getCart());
//     let ctl = ct.length;
//     setCartStore(ct);
//     setCart(ctl);
//     setItems(ctl);
//     setPrice(totalPrice(cartItems, ct));
//   }, 600);
// };


// let idToGet = [...new Set(carts.map((d) => d.id))].join(",");
//       .get("https://api.tradersconnect.com.ng/tradersconnect/cart/" + idToGet)


//         setCartItems(response.data.cart);
//         setPrice(totalPrice(response.data.cart, carts));