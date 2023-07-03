import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addCart } from '../../redux/action'
import swal from 'sweetalert';
import { useLocation } from 'react-router-dom';
import FM from "../layout/FM"
import Patek from '../layout/Patek';
function ProductPage() {
    const [NavLink, setNavLink] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const data = searchParams.get('data');
    const [cartAPI, setCartAPI] = useState([])
    const checkCart = useSelector((state) => state.checkCart)

    const dispatch = useDispatch()
    // const cart = useSelector((state) => state.cartItems)
    const [check, setCheck] = useState(true)
    const [loginUser, setLoginUser] = useState([])

    const productID = useSelector((state) => state.navLink)

    const loadProductNav = async () => {
        // const result = await axios.get(`http://localhost:7777/navlink/1`)
        // setNavLink([result.data])
        const result = await axios.get(data)
        setNavLink([result.data])
        const loginUser = await axios.get('http://localhost:7777/loginUser')
            .then((res) => setLoginUser(res.data))
        await axios.get("http://localhost:7777/cartAPI")
            .then((state) => setCartAPI(state.data))

    }
    // ===============================================================================================================
    // ===============================================================================================================
    // ===============================================================================================================
    const handleAddCart = (e) => {
        if (loginUser.length === 0) {
            swal("Vui lòng đăng nhập!!!", "", "error");
        } else {

            if (cartAPI && cartAPI.length > 0) {
                const itemIndex = cartAPI.findIndex((item) => item.id === e.id);
                if (itemIndex !== -1) {
                    swal({
                        title: "",
                        text: "💖Ôi bạn lụm thêm cái nữa hả giàu Ghê💖",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((willBuy) => {
                        if (willBuy) {
                            swal("💖Bồ đã có thêm 1 em đồng hồ trong giỏ hàng!", {
                                icon: "success",
                            });
                            const updatedCartItems = [...cartAPI];
                            const updatedCartItem = {
                                ...updatedCartItems[itemIndex],
                                cartQuantity: updatedCartItems[itemIndex].cartQuantity + 1,
                            };
                            updatedCartItems[itemIndex] = updatedCartItem;

                            const cartItemToUpdate = {
                                id: updatedCartItem.id,
                                cartQuantity: updatedCartItem.cartQuantity,
                            };

                            axios
                                .patch(
                                    `http://localhost:7777/cartAPI/${updatedCartItem.id}`,
                                    cartItemToUpdate
                                )
                                .then((response) => {
                                    console.log("Updated cartAPI successfully");
                                    setCartAPI(updatedCartItems); // Update the cartAPI state
                                    dispatch(addCart(!checkCart));
                                })
                                .catch((error) => {
                                    console.error("Error updating cartAPI:", error);
                                });
                        } else {
                            swal("Chúc bạn mua sắm vui vẻ nhé!!!");
                        }
                    });
                } else {
                    swal("💖Bồ đã có 1 em đồng hồ trong giỏ hàng rồi!!!", "", "success");
                    axios
                        .post("http://localhost:7777/cartAPI", { ...e, cartQuantity: 1 })
                        .then((response) => {
                            setCheck(!check);
                            dispatch(addCart(!checkCart));
                            console.log("Added to cartAPI successfully");
                        })
                        .catch((error) => {
                            console.error("Error adding to cartAPI:", error);
                        });
                }
            } else {
                swal("💖Bồ đã có 1 em đồng hồ trong giỏ hàng rồi!!!", "", "success");
                axios
                    .post("http://localhost:7777/cartAPI", { ...e, cartQuantity: 1 })
                    .then((response) => {
                        setCheck(!check);
                        dispatch(addCart(!checkCart));
                        console.log("Added to cartAPI successfully");
                    })
                    .catch((error) => {
                        console.error("Error adding to cartAPI:", error);
                    });
            }
        }

    };

    // ===============================================================================================================



    useEffect(() => {
        loadProductNav()
    }, [check, checkCart])
console.log(checkCart);
    return (        
        <div id="container">
            <nav className="nav_product2" id="nav">
                <p>
                    <a href="/Home _1/index.html">Trang chủ</a>
                    <span className="separator"> — </span>
                    <a href="/ALL_Product/index.html">Đồng hồ</a>
                    <span className="separator"> — </span>
                    {NavLink.map((e, i) => (
                        <a id="nav_model" href="/ALL_Product/index.html" key={i}>
                            {e.model}
                        </a>
                    ))}
                </p>
            </nav>
            {NavLink.map((e, i) => (
                <div key={i}>
                    <div className="content_product2" id="content">
                        <div>
                            <img src={e.img} alt="" />
                        </div>
                        <div className="content_text" id="content_text">
                            <h4>
                                Đồng hồ {e.nameproduct}
                            </h4>
                            <p>
                                Mã SP: <b>{e.code}</b> Giá:
                                <span>
                                    {e.price}
                                </span>{" "}
                                <sup>₫</sup>
                            </p>
                            <p>TÌNH TRẠNG: FULLSET MỚI 100%</p>
                            <p>Cam kết tất cả sản phẩm bán ra là Chính Hãng 100%</p>
                            <p>Bảo hành từ 2 đến 5 năm theo đúng tiêu chuẩn của hãng</p>
                            <p>Tặng gói Spa miễn phí 2 năm trị giá 3.000.000 đồng</p>
                            <p>Giao hàng toàn quốc,hỗ trợ 24/7 về chất lượng sản phẩm</p>
                            <p>
                                Giá trên website chỉ mang tính tham khảo,có thể thay đổi theo thời điểm để
                                có giá tốt nhất quý khách vui lòng LH qua Hotline 0944448286
                            </p>

                            <button id="btn_buy" className="buy_btn" onClick={() => handleAddCart(e)}>
                                <a className="buy_btn">Đặt mua sản phẩm</a>
                            </button>

                        </div>
                        <div className="sub_nav1">
                            <div className="sub_nav">
                                <p>MUA HÀNG TẠI HÀ NỘI</p>
                                <p>
                                    <i className="fa-solid fa-house gold" />
                                    Số 125 Ô Chợ Dừa - Quận.Đống Đa - Tp.Hà Nội
                                </p>
                                <p>
                                    <i className="fa-solid fa-phone gold" />
                                    Hotline: 0944448286
                                </p>
                            </div>
                            <div className="sub_nav">
                                <p>
                                    <i className="fa-solid fa-book-tanakh gold" />
                                    Bảo hành : Chính hãng toàn quốc
                                </p>
                                <p>
                                    <i className="fa-brands fa-space-awesome gold" />
                                    Miễn phí vận chuyển toàn quốc, giao nhanh trong nội thành Hà Nội &amp;
                                    Tp.HCM
                                </p>
                            </div>
                            <div className="sub_nav">
                                <p>
                                    <i className="fa-solid fa-heart gold" />1 đổi 1 trong 10 ngày nếu có lỗi
                                    nhà sản xuất
                                </p>
                            </div>
                        </div>


                    </div>
                    <div className="review_product" id="review_product">
                        <div>
                            <p>{e.title}</p>
                            <img id="img_content" src={e.img1} alt="" />
                            <p>{e.title1}</p>
                            <img src={e.img2} />
                            <h3>Bên trong {e.nameproduct}
                            </h3>
                            <p>{e.title2}</p>
                        </div>
                        <div>
                            <h3>THÔNG SỐ KỸ THUẬT</h3>
                            <p>Dòng sản phẩm: Big Bang</p>
                            <p>Thấm nước: Chống thấm nước - Khả năng chống thấm nước lên đến mức 50m hoặc 5 ATM</p>
                            <p>Kích thước mặt: 39mm</p>
                            <p>Vành đồng hồ: Vành đồng hồ - Đính kim cương thiên nhiên</p>
                            <p>Năng lượng: Năng lượng - Máy cơ, tự lên dây</p>
                            <p>Chất liệu vỏ: Chất liệu vỏ- thép không gỉ,đính kim cương thiên nhiên</p>
                            <p>Dây đeo: Dây đeo - Dây đeo cao su tổng hợp màu đen</p>
                            <p>Khóa: Khóa - khóa clasp bằng thép không gỉ</p>
                            <p>Mặt kính: Mặt kính - Sapphire với khả năng chống phản chiếu, chống trầy xước</p>
                            <p>Sản xuất: tạiThụy Sĩ</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="product_more_head">
                <img src="/img/logo/chan-logo.png" alt="" />
                <h3>XEM THÊM CÁC SẢN PHẨM KHÁC</h3>
            </div>
            <div className="product_more" id="product_more">
                <FM />
                <Patek />
            </div>

        </div>

    )
}

export default ProductPage