import store from "./index";
import ProductsService from "../services/ProductsService";

export const getProducts = async () => {
  store.dispatch({
    type: "GET_PRODUCTS_LOADING"
  });

  try {
    const { data } = await ProductsService.getProducts();
    store.dispatch({
      type: "GET_PRODUCTS_SUCCESS",
      payload: data
    });
  } catch {
    store.dispatch({
      type: "GET_PRODUCTS_FAILED"
    });
  }
};

// export const findOneProduct = aysnc (productId) => {
//   store.dispatch({
//     type: "GET_LAUNCH_LOADING"
//   });

//   try {
//     const { data } = await ProductsService.getProducts(productId);
//     store.dispatch({
//       type: "GET_ONE_PRODUCT_SUCCESS",
//       payload: data
//     });
//   } catch {
//     store.dispatch({
//       type: "GET_ONE_PRODUCT_FAILED"
//     });
//   }
// };

export const getShips = () => {
  store.dispatch({
    type: "GET_SHIPS_LOADING"
  });
  shipsAxios
    .get("/")
    .then(({ data }) => {
      store.dispatch({
        type: "GET_SHIPS_LOADING"
      });
      store.dispatch({
        type: "GET_SHIPS_SUCCESS",
        payload: data
      });
    })
    .catch(err => {
      store.dispatch({
        type: "GET_SHIPS_LOADING"
      });
      store.dispatch({
        type: "GET_SHIPS_FAILED"
      });
    });
};
