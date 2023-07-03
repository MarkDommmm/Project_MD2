import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct } from '../../redux/action';

function Patek() {
    const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    const checkCart = useSelector((state) => state.checkCart)
    const handleNavLink = (e) => {
        window.scrollTo(0, 0)
        dispatch((saveProduct(!checkCart)))
        
    };

    const loadProduct = async () => {
        await axios.get('http://localhost:7777/product')
            .then(res => setProduct(res.data))
    }

    useEffect(() => {
        loadProduct()
    }, [])

    return (
        <div>
            <div id="container rolex">
                <div className="content" id="content_hublot">
                    {product.map((e, i) => (
                        e.model === 'Franck Muller' ?
                            <div
                                className="product"
                                key={i}
                                onClick={handleNavLink}
                            >
                                <Link to={`/productpage?data=${encodeURIComponent(`http://localhost:7777/product/${e.id}`)}`} >
                                    <img src={e.img} alt="Đồng hồ 1" />
                                    <div className="info_product">
                                        <a>Đồng Hồ {e.nameproduct}</a>
                                        <p>
                                            Giá: <span>{e.price}</span> ₫
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            : <></>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Patek;
