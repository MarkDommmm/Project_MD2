import axios from "axios";
import swal from "sweetalert";

const initialState = {
  cartItems: [],
  checkCart: false,
  navLink: "",
  order: [],
  updateProduct: [],
  updateUser: [],
};

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_Cart":
      return {
        ...state,
        checkCart: action.payload,
      };
    case "ADD_Cart":
      return {
        ...state,
        checkCart: action.payload,
      };
    //
    // case "DELETE_Cart":
    //   const handleRemoveProduct = async (productId) => {
    //     try {
    //       await Promise.all(
    //         state.cartItems.map(async (product) => {
    //           if (product.id === productId) {
    //             const newCart = {
    //               ...product,
    //               carQuantity: product.carQuantity - 1,
    //             };
    //             console.log("update");
    //             await axios.put(
    //               `http://localhost:7777/cartAPI/${productId}`,
    //               newCart
    //             );
    //             if (product.carQuantity === 1) {
    //               await axios.delete(
    //                 `http://localhost:7777/cartAPI/${productId}`
    //               );
    //               console.log("del");
    //             }
    //           }
    //         })
    //       );

    //       // Sau khi xóa và cập nhật xong, gọi lại API để lấy danh sách sản phẩm mới
    //       // await loadCart();
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    //   // Gọi hàm handleRemoveProduct với action.payload.productId để xử lý xóa sản phẩm
    //   handleRemoveProduct(action.payload);

    //   return {
    //     ...state,
    //     checkCart: !state.checkCart,
    //   };
    case "ORDER_Cart":
      axios.post("http://localhost:7777/order", action.payload);
      return {
        ...state,
        order: action.payload,
        checkCart: action.payload.async,
      };
    case "ADMIN/Select/Product":
      return {
        ...state,
        updateProduct: action.payload,
      };
    case "ADMIN/Update/Product":
      axios.put(
        `http://localhost:7777/product/${action.payload.id}`,
        action.payload
      );
      return {
        ...state,
        updateProduct: [],
      };
    case "ADMIN/Add/User":
      axios.post(`http://localhost:7777/users`, action.payload);
      return {
        ...state,
      };
    case "ADMIN/Select/User":
      return {
        ...state,
        updateUser: action.payload,
      };
    case "ADMIN/Update/User":
      axios.put(
        `http://localhost:7777/users/${action.payload.id}`,
        action.payload
      );
      return {
        ...state,
        updateUser: [],
      };
    default:
      return state;
  }
};
export default Cart;
