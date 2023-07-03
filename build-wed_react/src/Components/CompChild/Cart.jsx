import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart } from '../../redux/action';
import { Link } from 'react-router-dom'

function Cart() {
    const [active, setActive] = useState(false)
    const [cartApi, setCartApi] = useState([])
    const checkCart = useSelector((state) => state.checkCart)
    const chec = useSelector((state) => console.log(state))
    const dispatch = useDispatch()
    const loadCart = async () => {
        await axios.get("http://localhost:7777/cartAPI")
            .then((res) =>  setCartApi(res.data));
    };
 

    useEffect(() => {
        loadCart();
    }, [checkCart]);
console.log(checkCart);
    const totalPrice = cartApi.reduce((total, product) =>
        total + parseInt(product.price.replaceAll(".", "")) * product.cartQuantity, 0);
    const totalAmount = cartApi.reduce((total, amount) => total + amount.cartQuantity, 0)
    
    const handleRemoveProduct = async (productId) => {
        try {
            await Promise.all(
                cartApi.map(async (product) => {
                    if (product.id === productId) {
                        const newCart = { ...product, cartQuantity: product.cartQuantity - 1 };
                        console.log('update');
                        await axios.put(`http://localhost:7777/cartAPI/${productId}`, newCart);
                        if (product.cartQuantity === 1) {
                            await axios.delete(`http://localhost:7777/cartAPI/${productId}`);
                            console.log('del');
                        }
                    }
                })
            );
            await loadCart();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="cart-wrapper">
            <div
                className="toggleMenu"
                onClick={() => setActive(!active)} >
                <i className="fa-solid fa-cart-shopping" />
            </div>
            <a id="none_number_cart">
                <i className="fa-solid fa-cart-shopping amount_cart" />
                {totalAmount === 0 ? <></> : <span id='amount_carts'>{totalAmount}</span>}
            </a>
            <div id="container_cart" className={active ? "active" : ""}>
                <div id="carts">
                    <div id="cart">
                        {cartApi.length === 0 ? <p id="alert_cart">"Chưa có sản phẩm nào trong giỏ hàng"</p> : <></>}
                        {cartApi.map((e, i) => (
                            <div id="cart_child" key={i}>
                                <div>
                                    <img src={e.img}
                                        alt="" />
                                </div>
                                <div class="text_cart">
                                    <p id="name_cart">{e.nameproduct}</p>
                                    <span id="amount_cart">{e.cartQuantity} x <b id="price_cart" className="gold">{e.price} </b>₫</span>
                                </div>

                                <div>
                                    <i className="fa-regular fa-circle-xmark"
                                        onClick={() =>
                                            handleRemoveProduct(e.id)
                                            //  dispatch(deleteCart(e.id))
                                        }
                                    ></i>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="total_price_cart">
                        <p>Tổng tiền:</p>
                        <span>
                            <b className="gold" id="total_price_carts">
                                {totalPrice.toLocaleString("vi-VN", {
                                    useGrouping: true,
                                })}
                            </b>
                            <span>₫</span>
                        </span>
                    </div>
                    <div id="btn_cart">
                        <button>
                            <Link to='/confirm'>Xem giỏ hàng</Link>
                        </button>
                        <button>
                            <Link to="/infoclient">Thanh toán</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cart