import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCart } from '../../redux/action';


function Confirm03() {
    const [cartAPI, setCartApi] = useState([])
    const dispatch = useDispatch()
    const checkCart = useSelector((state) => state.checkCart)

    const totalPrice = cartAPI.reduce((total, product) =>
        total + parseInt(product.price.replaceAll(".", "")) * product.cartQuantity, 0
    );
    const handleRemoveProduct = async (productId) => {
        try {
            await Promise.all(
                cartAPI.map(async (product) => {
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
    const loadCart = async () => {
        await axios.get('http://localhost:7777/cartAPI')
            .then((res) => setCartApi(res.data))
    }
    useEffect(() => {
        loadCart()
    }, [checkCart])
    return (
        <div id="container">

            <h3 className="cart_heading white_text">GIỎ HÀNG</h3>
            <div className="content">
                {/* <div class="alert"><i class="fa-solid fa-check"></i> “Đồng hồ Hublot Spirit Of Big Bang Titanium Diamonds */}
                {/* Automatic 39mm” đã được thêm vào giỏ hàng.</div> */}
                <div className="list_cart">
                    <div>
                        <table>
                            <tbody>
                                <tr className='white_text gold'>
                                    <th colSpan={2}>SẢN PHẨM</th>
                                    <th>SỐ LƯỢNG</th>
                                    <th>GIÁ</th>
                                </tr>
                            </tbody>
                            <tbody id="tbody">
                                {cartAPI.map((e, i) => (
                                    <tr className="product_list gold" key={i}>
                                        <td>
                                            <i
                                                onClick={() =>
                                                    handleRemoveProduct(e.id)
                                                    //  dispatch(deleteCart(e.id))
                                                }
                                                className="fa-regular fa-circle-xmark white"></i>
                                            <img
                                                src={e.img}
                                                alt="" />
                                        </td>
                                        <td className="name_procduct gold">
                                            Đồng hồ  {e.nameproduct}
                                        </td>

                                        <td>{e.cartQuantity}</td>
                                        <td className="gold">{e.price} <span className="white">₫</span></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <nav className='buymore '>
                            <ul>
                                <li>
                                    <i className="fa-solid fa-arrow-left-long" />
                                    <a href="/ALL_Product/index.html">Tiếp tục xem sản phẩm</a>
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                </li>
                            </ul>
                        </nav>

                    </div>
                    <div className="pay">
                        <h4 className='white_text'>CỘNG GIỎ HÀNG</h4>
                        <hr />
                        <div className="moeny">
                            <div className="left white_text">Tổng:</div>{" "}
                            <span className="right gold" id="total_price">
                                {totalPrice.toLocaleString("vi-VN", {
                                    useGrouping: true,
                                })}
                                <span className="white">₫</span>
                            </span>
                        </div>
                        <hr />
                        <button id="clickpay">
                            <Link to={"/infoclient"}>Tiến hành thanh toán</Link>
                        </button>
                        <br />
                        <p className="coupon white_text">
                            <i className="fa-solid fa-ticket" />
                            Coupon
                        </p>
                        <hr />
                        <input type="text" id="input_coupon" placeholder="Nhập Coupon" />
                        <button className="comfirm_coupon">Áp dụng</button>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Confirm03