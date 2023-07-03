import React, { useEffect, useState } from 'react';
import HeadingPage from '../layout/HeadingPage';
import NavPage from '../layout/NavPage';
import FooterPage from '../layout/FooterPage';
import axios from 'axios';
import { order } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'


function InfoClient() {
    const [infoUser, setInfoUser] = useState({
        username: '',
        address: '',
        phone: '',
        email: '',
        note: '',
        bank: '',
    });
    const [cartAPI, setCartAPI] = useState([]);
    const [loginUser, setLoginUser] = useState([]);
    const [check, setCheck] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const checkCart = useSelector((state => state.checkCart))


    const totalPrice = cartAPI.reduce(
        (total, product) =>
            total +
            parseInt(product.price.replaceAll('.', '')) * product.cartQuantity,
        0
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            [name]: value,
        }));
    };

    // Hàm đặt hàng==============================================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            let timerInterval
            Swal.fire({
                title: '💖Thanks For All💖',
                html: 'I will close in <b></b> milliseconds.',
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    dispatch(
                        order({
                            ...infoUser,
                            transport: 'Đang xử lý!',
                            order: cartAPI,
                            async: !checkCart,
                        })
                    );
                    navigate("/");
                }
            })
            const postsIdsArray = cartAPI.map((pd) => pd.id);
            postsIdsArray.forEach(async (id) => {
                await axios.delete(`http://localhost:7777/cartAPI/${id}`);
            });
        }
    };



    const validateForm = () => {
        let isValid = true;

        if (!infoUser.username || infoUser.username.trim() === '') {
            isValid = false;
            swal('Error', 'Please enter your name', 'error');
        }

        if (!infoUser.address || infoUser.address.trim() === '') {
            isValid = false;
            swal('Error', 'Please enter your address', 'error');
        }

        if (!infoUser.phone || infoUser.phone.trim() === '' && infoUser.phone.length > 10) {
            isValid = false;
            swal('Error', 'Please enter your phone number', 'error');
        }

        if (!infoUser.email || infoUser.email.trim() === '') {
            isValid = false;
            swal('Error', 'Please enter your email', 'error');
        } else if (
            !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(infoUser.email.trim())
        ) {
            isValid = false;
            swal('Error', 'Please enter a valid email address', 'error');
        }

        if (!infoUser.bank || infoUser.bank.trim() === '') {
            isValid = false;
            swal('Error', 'Please select a payment method', 'error');
        }

        return isValid;
    };

    const loadCart = async () => {
        try {
            const cartRes = await axios.get('http://localhost:7777/cartAPI');
            setCartAPI(cartRes.data);

            const loginRes = await axios.get('http://localhost:7777/loginUser');
            setLoginUser(loginRes.data);
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };

    useEffect(() => {
        loadCart();
    }, [check]);

    return (
        <div id="container">
            <div className="text_heading">
                <h3>Thanh Toán</h3>
                <p>
                    Bạn có mã ưu đãi?{" "}
                    <a href="">
                        <i>Ấn vào đây để nhập mã</i>
                    </a>
                </p>
            </div>
            <div className="content_infoClient">
                <form id="form">
                    <div>
                        <h5>THÔNG TIN THANH TOÁN</h5>
                        <label htmlFor="username">Họ và tên *</label>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            id="username_input"
                            name="username"
                            placeholder="Nhập đầy đủ họ tên của bạn"
                        />
                        <br />
                        <br />
                        <label htmlFor="address">Địa chỉ *</label>
                        <input
                            onChange={handleInputChange}

                            type="text"
                            name="address"
                            id="address"
                            placeholder="Ví dụ: số xx ngõ xx Thiên Hiền, Nam Từ Liêm, Hà Nội"
                        />
                        <br />
                        <br />
                        <label htmlFor="phone">Số điện thoại*</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder='0944448286'
                            onChange={handleInputChange}
                        />
                        <br />
                        <br />
                        <label htmlFor="email">Địa chỉ email*</label>
                        <input
                            onChange={handleInputChange}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="phanhoanghieu1999@gmail.com"
                        />
                        <h5>THÔNG TIN BỔ SUNG</h5>
                        <p>Ghi chú đơn hàng (tuỳ chọn)</p>
                        <textarea
                            onChange={handleInputChange}
                            name="note"
                            id="note"
                            cols={5}
                            rows={5}
                            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                            defaultValue={""}
                        />
                    </div>
                    <div>
                        <h5>ĐƠN HÀNG CỦA BẠN</h5>
                        <table className="table-infoClient">
                            <thead>
                                <tr>
                                    <th>SẢN PHẨM</th>
                                    <th className='tamtinh'>TẠM TÍNH</th>
                                </tr>
                            </thead>
                            <tbody id="tbody-infoClient">
                                {cartAPI.map((e, i) => (
                                    <tr key={i}>
                                        <td className="text_table_infoClient">Đồng hồ {e.nameproduct}
                                            <span className="gold"> X </span> {e.cartQuantity}</td>
                                        <td className="gold">{e.price}<span className="white">đ</span></td>
                                    </tr>
                                ))}
                            </tbody>
                            {/* <tfoot>
                                <tr>
                                    <td>
                                        <b>Tổng</b>
                                    </td>
                                    <td id="total_price" className="gold">
                                        {totalPrice.toLocaleString("vi-VN", {
                                            useGrouping: true,
                                        })}
                                        <i className="white">đ</i>
                                    </td>
                                </tr>
                            </tfoot> */}
                        </table>
                        <div className='total_price_infoClient'>
                            <h5>Tổng :</h5>
                            <p id="total_price" className="gold">
                                {totalPrice.toLocaleString("vi-VN", {
                                    useGrouping: true,
                                })}
                                <i className="white">đ</i>
                            </p>
                        </div>
                        <label htmlFor="bank">
                            <input
                                onChange={handleInputChange}
                                type="radio"
                                name="bank"
                                id="bank"
                                className="bank"
                                defaultValue="Chuyển khoản ngân hàng."
                                required=""
                            />
                            Chuyển khoản ngân hàng.
                        </label>
                        <br />
                        <br />
                        <label htmlFor="bank">
                            <input
                                onChange={handleInputChange}

                                type="radio"
                                name="bank"
                                id="bank"
                                className="bank"
                                defaultValue="Trả tiền mặt khi nhận hàng."
                                required=""
                            />
                            Trả tiền mặt khi nhận hàng.
                        </label>
                        <br />
                        <button className="btn_order" onClick={handleSubmit}>ĐẶT HÀNG</button>
                        <p>
                            Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải
                            nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được mô tả
                            trong <i className="gold">chính sách riêng tư</i> của chúng tôi.
                        </p>
                    </div>
                </form>
            </div>

        </div>

    )
}

export default InfoClient