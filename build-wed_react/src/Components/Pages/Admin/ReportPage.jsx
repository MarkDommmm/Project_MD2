import React, { useEffect, useState } from 'react'
import Navbar from './layoutAdmin/Navbar'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ReportPage() {
    const [order, setOrder] = useState([])
    const [infoProduct, setInfoProduct] = useState('')
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setInfoProduct(e)
        setShow(true)

    };
    const LoadData = async () => {
        await axios.get("http://localhost:7777/order")
            .then((state) => setOrder(state.data))
        await axios.get("http://localhost:7777/product")
            .then((state) => setProducts(state.data))
    }
    useEffect(() => {
        LoadData()
    }, [])
    console.log(order);
    return (
        <div id='report'>
            <Navbar />
            <h1 className="text_center_center fontText">Báo cáo</h1>

            <div id="container_row">
                <div className="row">
                    <div className="col-md-6 col-lg-3">
                        <div>
                            <i className="fa-solid fa-users" />
                            <div className="info">
                                <h4>Tổng Nhân viên</h4>
                                <p>
                                    <b>
                                        <span id="number_nv">1</span> nhân viên
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div>
                            <i className="fa-solid fa-tags" />
                            <div className="info">
                                <h4>Tổng sản phẩm</h4>
                                <p>
                                    <b>
                                        <span id="number_allproduct">{products.length}</span> sản phẩm
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div>
                            <i className="fa-solid fa-bag-shopping" />
                            <div className="info">
                                <h4>Tổng đơn hàng</h4>
                                <p>
                                    <b>
                                        <span id="number_ship">{order.length}</span> đơn hàng
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div>
                            <i className="fa-solid fa-triangle-exclamation" />
                            <div className="info">
                                <h4>Bị cấm</h4>
                                <p>
                                    <b>
                                        <span id="number_block">1</span> nhân viên
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-lg-3">
                        <div>
                            <i className="fa-solid fa-money-bill-trend-up" />
                            <div className="info">
                                <h4>Tổng thu nhập</h4>
                                <p>
                                    <b>
                                        <span id="number_totalpay">1</span> đ
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div>
                            <i className="fa-solid fa-user-plus" />
                            <div className="info">
                                <h4>Nhân viên mới</h4>
                                <p>
                                    <b>
                                        <span id="number_newnv">1</span> nhân viên
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div>
                            <i className="fa-solid fa-square-xmark" />
                            <div className="info">
                                <h4>Hết hàng</h4>
                                <p>
                                    <b>
                                        <span id="number_soldout">1</span> sản phẩm
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div>
                            <i className="fa-solid fa-heart-crack" />
                            <div className="info">
                                <h4>Đơn hàng hủy</h4>
                                <p>
                                    <b>
                                        <span id="number_cancel">1</span> đơn hàng
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div>
                            <h3 className="tile-title">SẢN PHẨM BÁN CHẠY</h3>
                        </div>
                        <div className="tile-body">
                            <table className="table table-hover table-bordered" id="sampleTable">
                                <thead>
                                    <tr>
                                        <th>Hình ảnh sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá tiền</th>
                                        <th>Model</th>
                                    </tr>
                                </thead>
                                <tbody id="trend_product">
                                    <tr>
                                        <td>
                                            <img src="/img/Rolex/rolex-128345-rbr-300x300.png" alt="" />
                                        </td>
                                        <td>rolex-128345-rbr</td>
                                        <td>1.388.000.000</td>
                                        <td>Rolex</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div>
                            <h3 className="tile-title">TỔNG ĐƠN HÀNG</h3>
                        </div>
                        <div className="tile-body">
                            <table className="table table-hover table-bordered" id="sampleTable">
                                <thead>
                                    <tr>
                                        <th className='IDOder '>ID đơn hàng</th>
                                        <th>Khách hàng</th>
                                        <th className='orderr'>Đơn hàng</th>
                                        <th>Số lượng</th>
                                        <th className='totalprice'>Tổng tiền:</th>
                                    </tr>
                                </thead>
                                <tbody id="total_order">
                                    {order.map((e) => {
                                        const totalCarQuantity = e.order.reduce((total, r) =>
                                            total + r.cartQuantity, 0);
                                        const totalPrice = e.order.reduce((total, r) =>
                                            total + parseInt(r.price.replaceAll(".", "")) * r.cartQuantity, 0);

                                        // ======================================================
                                        return <tr>
                                            <td className='text_center'>{e.id}</td>
                                            <td className='text_center'> {e.username}</td>
                                            <td className='text_center'>
                                                <nav onClick={() => handleShow(e)}>
                                                    <ul>
                                                        <li className='btnOrder'>
                                                            <a> Thông tin chi tiết sản phẩm</a>
                                                            <span />
                                                            <span />
                                                            <span />
                                                            <span />
                                                        </li>
                                                    </ul>
                                                </nav></td>
                                            <td className='text_center'> {totalCarQuantity} sản phẩm</td>
                                            <td className='text_center'>{totalPrice.toLocaleString("vi-VN", { useGrouping: true }) } đ</td>
                                        </tr>
                                    })}
                                </tbody>
                                <tfoot id="footer_order">
                                    <tr>
                                        <td colspan="4">Tổng cộng:</td>
                                        <td>{order.reduce((total, e) => total + e.order.reduce((subtotal, r) =>
                                            subtotal + parseInt(r.price.replaceAll(".", "")) * r.cartQuantity, 0), 0).toLocaleString("vi-VN", { useGrouping: true })} đ</td>

                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div>
                            <h3 className="tile-title">SẢN PHẨM ĐÃ HẾT</h3>
                        </div>
                        <div className="tile-body">
                            <table className="table table-hover table-bordered" id="sampleTable">
                                <thead>
                                    <tr>
                                        <th>ảnh sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Tình trạng</th>
                                        <th>Giá tiền</th>
                                        <th>Model</th>
                                    </tr>
                                </thead>
                                <tbody id="sold_out">
                                    <tr>
                                        <td>
                                            <img
                                                src="/img/Hublot/hublot-classic-fusion-chronograph-titanium-blue-45mm-300x300.png"
                                                alt=""
                                            />
                                        </td>
                                        <td>hublot-classic-fusion-chronograph-titanium-blue-45mm</td>
                                        <td>0</td>
                                        <td>
                                            <span className="badge bg-danger">Hết hàng</span>
                                        </td>
                                        <td>215.000.000 đ</td>
                                        <td>Hublot</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL CHI TIẾT PRODUCT */}
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin chi tiết sản phẩm!</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <table>
                        <thead>
                            <tr>
                                <th>Mã sản phẩm</th>
                                <th>Thông tin sản phẩm</th>
                                <th>Hình ảnh sản phẩm</th>
                                <th>Giá sản phẩm</th>
                                <th>Số lượng</th>
                            </tr>
                        </thead>
                        <tbody className="tbodyOrder">
                            {order.map((e) => {
                                if (infoProduct.username === e.username) {
                                    // ==================================Hàm Tính tổng số lượng và Giá =====================================================
                                    const totalCarQuantity = e.order.reduce((total, r) =>
                                        total + r.cartQuantity, 0);
                                    const totalPrice = e.order.reduce((total, r) =>
                                        total + parseInt(r.price.replaceAll(".", "")) * r.cartQuantity, 0);
                                    // =======================================================================================
                                    return e.order.map((r, j) => (

                                        <tr key={j} className="trOrder">
                                            {console.log(r)}
                                            <td className="text_center">{r.code}</td>
                                            <td className="text_center">{r.nameproduct}</td>
                                            <td className="text_center">
                                                <img src={r.img} alt="product-image" />
                                            </td>
                                            <td className="text_center gold">
                                                {r.price}
                                                <span className='white'>đ</span>
                                            </td>
                                            <td className="text_center">{r.cartQuantity}</td>
                                            {j === 0 && (
                                                <td className="text_center" rowSpan={e.order.length}>
                                                    Tổng: {totalCarQuantity} x

                                                    <span className='gold'>
                                                        {totalPrice.toLocaleString("vi-VN", {
                                                            useGrouping: true,
                                                        })}
                                                        <span className='white'>đ</span>
                                                    </span>

                                                </td>
                                            )}
                                        </tr>
                                    ));
                                } else {
                                    return null;
                                }
                            })}

                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    )
}

export default ReportPage