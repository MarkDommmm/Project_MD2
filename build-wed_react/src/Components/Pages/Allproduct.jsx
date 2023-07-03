import React from 'react'
import FM from "../layout/FM"
import Patek from '../layout/Patek';
function Allproduct() {
    return (
        <div>
            <div className="product_more_head">
                <img src="/img/logo/chan-logo.png" alt="" />
                <h3>XEM THÊM CÁC SẢN PHẨM KHÁC</h3>
            </div>
            <div className="product_more" id="product_more">
                <FM />
                <Patek />
            </div></div>
    )
}

export default Allproduct