import React, { useEffect, useState } from 'react'
import "./styleAdmin.css"
import axios from 'axios'
import Navbar from './layoutAdmin/Navbar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL, listAll, } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { adminSelectProduct, adminUpdateProduct } from '../../../redux/action';
import Pagination from "react-bootstrap/Pagination";
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2/dist/sweetalert2.js'


// =======================================================================================================
function ProductAdmin() {
    const dispatch = useDispatch()
    const [inputAddProduct, setInputAddProduct] = useState({
        code: "",
        nameproduct: "",
        img: "",
        img1: "",
        img2: "",
        price: "",
        title: "",
        title1: "",
        title2: "",
        quantity: "",
        model: "",
        id: "",
    })

    const [products, setProducts] = useState([])
    const updateProduct = useSelector((state) => state.updateProduct)
    const [searchInput, setSearchInput] = useState("");
    const [sortType, setSortType] = useState("asc");
    const [check, setCheck] = useState(true);

    // Phần phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    // =========================================================================================================
   
    const handleChangeInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (updateProduct.length === 0) {
            setInputAddProduct((prevInfoUser) => ({
                ...prevInfoUser,
                [name]: value,

            }));
        } else {

            setInputAddProduct((prevInfoUser) => ({
                ...prevInfoUser,
                [name]: value,
            }));

        }
    };



    // ================================================================
    // State upload ảnh lên
    const [imageUpload1, setImageUpload1] = useState({ });

    // ================================================================

    // State lấy url ảnh về
    const [imageUrls, setImageUrls] = useState([]);
    // Tạo storage lưu trữ từ dịch vụ của firebase
    const imagesListRef = ref(storage, "images/");

    useEffect(() => {
        listAll(imagesListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);
    // ================================================================================================  
    const [show, setShow] = useState(false);
    const handleClose = async () => {
        // ===========================ADD PRODUCT =====================================================================
        if (!imageUpload1) {
            console.error("Image is not selected");
            return;
        }

        if (imageUpload1 == null) {
            console.error("Image is null");
            return;
        }

        const imageRef = ref(storage, `images/${imageUpload1.name}`);
        let timerInterval;
        Swal.fire({
            title: 'Đang thêm sản phẩm Xin vui lòng đợi 1 tí',
            html: 'I will close in <b></b> milliseconds.',
            timer: 10000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector('b');
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft();
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then(async (result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer');
                try {
                    setShow(false);
                    const snapshot = await uploadBytes(imageRef, imageUpload1);
                    const url = await getDownloadURL(snapshot.ref);
                    setUploadedImageUrl(url);

                    const uploadTasks = [uploadBytes(imageRef, imageUpload1)];

                    await Promise.all(uploadTasks).then(async (snapshots) => {
                        const downloadURLPromises = snapshots.map((snapshot) =>
                            getDownloadURL(snapshot.ref)
                        );

                        const urls = await Promise.all(downloadURLPromises);

                        if (urls.length === 0) {
                            console.error("Failed to upload image");
                            return;
                        }

                        setImageUrls((prev) => [...prev, ...urls]);
                        setInputAddProduct((prevInfoUser) => ({
                            ...prevInfoUser,
                            img: urls[0], // Assign the uploaded image URL to the img property
                        }));

                        // Add product API request
                        try {
                            setShow(false);
                            const response = await axios.post("http://localhost:7777/product", {
                                ...inputAddProduct,
                                img: urls[0], // Use the uploaded image URL
                            });
                            console.log("kkkkkk", response);
                        } catch (error) {
                            console.error("Failed to add product:", error);
                        }

                        Swal.close(); // Close the modal
                    });
                } catch (error) {
                    console.error("Failed to upload image:", error);
                }
            }
        });
    };



    // ===========================DELETE PRODUCT =====================================================================  
    const HandleDeleteProduct = async (id) => {
        await axios.delete(`http://localhost:7777/product/${id}`)
        setCheck(!check)
    }
    // ===========================UPDATE PRODUCT =====================================================================  
    const handleSelectProduct = async (e) => {
        dispatch(adminSelectProduct(e))
        setShow(true)
        setCheck(!check)

    }
    const handleUpdateProduct = () => {
        dispatch(adminUpdateProduct(inputAddProduct))
        setCheck(!check)
        setShow(false)

    }

    // ================================================================================================  
    const handleShow = () => setShow(true);




    const loadProducts = async () => {
        let url = `http://localhost:7777/product`

        // =========================================LOGIC SEARCH=======================================================  
        if (searchInput) {
            url += `?q=${searchInput}`;
        } else {
            if (sortType === "asc") {
                url += `?_sort=quantity&_order=asc`;
            } else {
                url += `?_sort=quantity&_order=desc`;
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
        setProducts(result.data);
        setTotalPages(totalPages);
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
    // =========================================================================================================
    useEffect(() => {
        listAll(imagesListRef)
            .then((res) => {
                const urls = [];
                res.items.forEach((item) => {
                    urls.push(getDownloadURL(item));
                });
                return Promise.all(urls);
            })
            .then((urls) => {
                setImageUrls(urls);
                setUploadedImageUrl(urls[0]); // Cập nhật uploadedImageUrl với đường dẫn ảnh đầu tiên
            })
            .catch((error) => console.error("Failed to load images:", error));


    }, []);
    useEffect(() => {
        loadProducts()
        if (updateProduct) {
            setInputAddProduct(updateProduct)
        } else {
            setInputAddProduct({
                code: "",
                nameproduct: "",
                img: "",
                img1: "",
                img2: "",
                price: "",
                title: "",
                title1: "",
                title2: "",
                quantity: "",
                model: "",
                id: "",
            })
        }
    }, [check, searchInput, sortType, currentPage, perPage, uploadedImageUrl]);

    return (
        <div id='productAdmin'>
            <Navbar />

            <Modal show={show} className='modal_admin'>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="">Mã sản phẩm:</label>
                    <input
                        value={inputAddProduct.code}
                        type="text"
                        name='code'
                        onChange={handleInputChange} />
                    <label htmlFor="">Tên sản phẩm:</label>
                    <input
                        value={inputAddProduct.nameproduct}
                        type="text"
                        name='nameproduct'
                        onChange={handleInputChange} />
                    <label htmlFor="">Hình ảnh sản phẩm:</label>
                    <input
                        name='img'
                        type="file"
                        onChange={(e) => {
                            setImageUpload1(e.target.files[0]);
                        }}
                    />
                    <label htmlFor="">Giá sản phẩm:</label>
                    <input
                        value={inputAddProduct.price}
                        type="text"
                        name='price'
                        onChange={handleInputChange} />
                    <label htmlFor="">Model:</label>
                    <select name="model"
                        value={inputAddProduct.model}
                        onChange={handleInputChange}
                    >
                        <option >Chọn Model:</option>
                        <option value="Franck Muller">Franck Muller</option>
                        <option value="Patek Philippe">Patek Philippe</option>
                        <option value="Rolex">Rolex</option>
                    </select>

                    <label htmlFor="">Số lượng :</label>
                    <input
                        value={inputAddProduct.quantity}
                        type="text"
                        name='quantity'
                        onChange={handleInputChange} />
                    <label htmlFor="">Title:</label>
                    <textarea
                        value={inputAddProduct.title}
                        name='title'
                        onChange={handleInputChange}
                    />
                    <label htmlFor="">Title1:</label>
                    <textarea
                        value={inputAddProduct.title1}
                        name='title1'
                        onChange={handleInputChange}
                    />
                    <label htmlFor="">Title2:</label>
                    <textarea
                        value={inputAddProduct.title2}
                        name='title2'
                        onChange={handleInputChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    {check == true ?
                        <Button variant="primary" onClick={handleClose}>
                            Add Product
                        </Button>
                        :
                        <Button variant="primary" onClick={handleUpdateProduct}>
                            Update
                        </Button>
                    }
                </Modal.Footer>

            </Modal>
            {/* <Navbar /> */}
            <div id="container-table" className="container-fluid al">
                <h1 className="text_center_center fontText">Quản lý sản phẩm</h1>
                <br />
                <p className="white">
                    <b>TÌM KIẾM SẢN PHẨM:</b>
                </p>
                <br />
                <br />
                <input
                    value={searchInput}
                    onChange={handleChangeInput}
                    type="text"
                    id="myInput"
                    placeholder="Nhập tên sản phẩm cần tìm..."
                />
                <i className="fa fa-search" aria-hidden="true" />
                <b className="white">CHỨC NĂNG CHÍNH:</b>
                <br />
                <Button className="nv btn add-new" onClick={handleShow}>
                    <i className="fa-solid fa-user-plus" />
                </Button>

                <button
                    className="nv"
                    type="button" >
                    <i className="fa-solid fa-filter" />
                </button>
                <button className="nv cog">
                    <i className="fa-solid fa-screwdriver-wrench" />
                </button>
                <table className="table table-bordered" id="myTable">
                    <thead>
                        <tr className="ex">
                            <th>Mã sản phẩm #</th>
                            <th>Tên sản phẩm</th>
                            <th>Hình ảnh sản phẩm</th>
                            <th className='price'>Giá tiền</th>
                            <th>Số lượng <i className="fa-solid fa-sort" onClick={handleSort}></i></th>
                            <th className='model'>Model</th>
                            <th>Tính Năng</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        {products.map((product, i) => (
                            <tr key={i}>
                                <td className="text_center">{product.code}</td>
                                <td className="text_center">{product.nameproduct}</td>
                                <td id="img_table">
                                    <img width="100px" src={product.img} alt="Error" />
                                </td>
                                <td className="text_center">{product.price} <span className='gold'>đ</span></td>
                                <td className="text_center">{product.quantity}</td>
                                <td className="text_center">{product.model}</td>
                                <td>
                                    <i className="fa-solid fa-pencil edit"
                                        onClick={() => handleSelectProduct(product)}
                                    ></i>
                                    <i className="fa-solid fa-trash-can delete"
                                        onClick={() => HandleDeleteProduct(product.id)}></i>
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
            </div>
        </div>
    )
}

export default ProductAdmin