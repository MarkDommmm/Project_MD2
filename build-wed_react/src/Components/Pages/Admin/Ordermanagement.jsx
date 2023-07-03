import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './layoutAdmin/Navbar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from "react-bootstrap/Pagination";

function Ordermanagement() {
    let totalCarQuantity = 0;
    const [infoProduct, setInfoProduct] = useState('')
    const [transport, setTranPort] = useState('')
    const [products, setProducts] = useState([])
    const [searchInput, setSearchInput] = useState("");
    const [sortType, setSortType] = useState("asc");
    const [checkTransport, setCheckTranPort] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleChangeInput = (e) => {
        setSearchInput(e.target.value);
    };
    const handleShow = (e) => {
        setInfoProduct(e)
        setShow(true)

    };
    // Phần phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    // =========================================================================================================

    const handleChangeTransport = (e) => {
        setCheckTranPort(!checkTransport)
    }
    const handleSubmitTransport = async (e, id) => {
        if (transport === "Đã giao thành công!!!!") {
            await Promise.all(
                e.order.map(async (item) => {
                    await axios.patch(`http://localhost:7777/product/${item.id}`, {
                        quantity: item.quantity - item.cartQuantity
                    })
                })
            )
                .then((responses) => {
                    console.log(responses);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        await axios.patch(`http://localhost:7777/order/${id}`, {
            "transport": transport
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setCheckTranPort(false)
    }
    const [Order, setOrder] = useState([])



    const loadOrders = async () => {
        let url = `http://localhost:7777/order`

        // =========================================LOGIC SEARCH=======================================================  
        if (searchInput) {
            url += `?q=${searchInput}`;
        } else {
            if (sortType === "asc") {
                url += `?_sort=username&_order=asc`;
            } else {
                url += `?_sort=username&_order=desc`;
            }
        }
        const countResponse = await axios.get(
            `${url}&_page=1&_limit=1&_count=true`
        );

        const totalCount = countResponse.headers["x-total-count"];
        const totalPages = Math.ceil(totalCount / perPage);

        // Update the state with the retrieved data and totalPages
        const result = await axios.get(
            `${url}&_page=${currentPage}&_limit=${perPage}`
        );
        setOrder(result.data);
        setTotalPages(totalPages);
        await axios.get('http://localhost:7777/product')
            .then((res) => setProducts(res.data))
    }
    // =================================Phần Phân trang========================================================================
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => setCurrentPage(i)}
            >
                {i}
            </Pagination.Item>
        );
    }
    const handleSort = () => {
        setSortType(sortType === "asc" ? "desc" : "asc");
    };
    useEffect(() => {
        loadOrders()
    }, [checkTransport, searchInput, sortType, currentPage, perPage])

    return (
        <div id='Ordermanagent'>
            <Navbar />
            <div id="container-table" className="container-fluid al">
                <h1 className="text_center_center fontText">Quản lý Đơn Hàng</h1>
                <br />
                <p className="white">
                    <b>TÌM KIẾM Đơn hàng:</b>
                </p>
                <br />
                <br />
                <input
                    value={searchInput}
                    onChange={handleChangeInput}
                    type="text"
                    id="myInput"
                    placeholder="Nhập tên đơn hàng cần tìm..."
                />
                <i className="fa fa-search search-order" aria-hidden="true" />
            </div>
            <div className="test">
                <table className="table table-bordered" id="myTable">
                    <thead>
                        <tr className="test_tr">
                            <th>ID # đơn hàng</th>
                            <th>Thông tin ship hàng</th>

                            <th>Thông tin sản phẩm</th>
                            <th>Trạng thái đơn hàng</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        {Order.map((e, i) => (
                            <tr tr key={i} >
                                <td class="text_center">{e.id}</td>
                                <td class="text_center">
                                    Tên Khách Hàng:  <br />
                                    {e.username} <br />
                                    Email: <br />
                                    {e.email}  <br />
                                    Số điện thoại:  <br />
                                    {e.phone} <br />
                                    Địa chỉ: <br />
                                    {e.address} <br />
                                    Phương Thức Thanh toán:  <br />
                                    {e.bank}
                                </td>
                                <td class="text_center">
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
                                    </nav>

                                </td>
                                <td class="text_center">
                                    {checkTransport ? (
                                        <>
                                            <select onChange={(e) => setTranPort(e.target.value)}>
                                                <option value="">Chọn đi</option>
                                                <option value="Đang xử lý!!!">Đang xử lý!!!</option>
                                                <option value="Đang giao hàng!!!!">Đang giao hàng!!!!</option>
                                                <option value="Đã giao thành công!!!!">Đã giao thành công!!!!</option>
                                            </select>
                                            <i
                                                onClick={() => handleSubmitTransport(e, e.id)}
                                                class="fa-solid fa-spell-check"></i>
                                        </>
                                    ) : (
                                        <>
                                            <span>{e.transport}</span>
                                            <i
                                                onClick={() => handleChangeTransport(e.transport)}
                                                class="fa-solid fa-pen-to-square"></i>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
                <Pagination>
                    <Pagination.Prev
                        disabled={currentPage === 1}

                        onClick={() => setCurrentPage(currentPage - 1)} />
                    {paginationItems}
                    <Pagination.Next
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)} />
                </Pagination>
            </div >

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
                            {Order.map((e) => {
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

export default Ordermanagement