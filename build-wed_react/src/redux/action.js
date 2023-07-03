export const addCart = (product) => {
  return {
    type: "ADD_Cart",
    payload: product,
  };
};

export const deleteCart = (id) => {
  return {
    type: "DELETE_Cart",
    payload: id,
  };
};

export const order = (product) => {
  
  return {
    type: "ORDER_Cart",
    payload: product,
  };
};
export const saveProduct = (product) => {

  return {
    type: "SAVE_Cart",
    payload: product,
  };
};
export const adminSelectProduct = (product) => {
  return {
    type: "ADMIN/Select/Product",
    payload: product,
  };
};
export const adminUpdateProduct = (product) => {
  return {
    type: "ADMIN/Update/Product",
    payload: product,
  };
};
export const adminSelectUser = (User) => {
  return {
    type: "ADMIN/Select/User",
    payload: User,
  };
};
export const adminUpdateUser = (User) => {
  return {
    type: "ADMIN/Update/User",
    payload: User,
  };
};
export const adminAddUser = (User) => {
  return {
    type: "ADMIN/Add/User",
    payload: User,
  };
};
