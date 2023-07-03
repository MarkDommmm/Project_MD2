import React, { useState } from 'react'
import Cart from '../CompChild/Cart'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
function NavPage() {
    const [active, setActive] = useState(false)
    const click = () => {
        swal("😭 tính năng đang phát triển😭 ", "", "info");

    }
    return (
        <div className="nav_main">
            <ul className={active ? "nav_main_left active" : "nav_main_left"}>
                <li>
                    <Link to={"/"} className="gold" >
                        <i className="fa-solid fa-house-chimney" /> HH WATCHES
                    </Link>
                </li>
                <li>
                    <Link onClick={click}>
                        RICHARD MILLE <i className="fa-solid fa-chevron-down" />
                    </Link>
                    <ul className="dropdown">
                        <li>
                            <a href="#">RM 67-01 Winding Extra Flat</a>
                        </li>
                        <li>
                            <a href="#">RM 67-02 Sprint</a>
                        </li>
                        <li>
                            <a href="#">RM 53-01</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to={"/allproduct"} href="">
                        PRODUCT <i className="fa-solid fa-chevron-down" />
                    </Link>
                    <ul className="dropdown">
                        <li>
                            <a href="#FM">
                                <img
                                    className="ux-menu-icon"
                                    src="/img/logo/bccdf8ba9cfc3c9cb0c5938415b1b223.png"
                                    alt=""
                                />
                            </a>
                        </li>
                        <li>
                            <a href="#patek">
                                <img
                                    className="ux-menu-icon"
                                    src="/img/logo/Patek-Philippe-Logo-1920s.png"
                                    alt=""
                                />
                            </a>
                        </li>
                        <li>
                            <a href="#rolex">
                                <img
                                    className="ux-menu-icon"
                                    src="/img/logo/28223-7-rolex-logo-image.png"
                                    alt=""
                                />
                            </a>
                        </li>
                        <li>
                            <a href="#hublot">
                                <img
                                    className="ux-menu-icon"
                                    src="/img/logo/585e9efacb11b227491c3501.png"
                                    alt=""
                                />
                            </a>
                        </li>

                    </ul>
                </li>
            </ul>
            <div
                className="toggleMenu"
                onClick={() => setActive(!active)} >
                <i className="fa-solid fa-bars gold" />
            </div>
            <Link to='/' className="nav_main_img">
                <img
                    className="nav_main_logo"
                    src="/img/logo/H-removebg-preview (1).png"
                    alt="" />
            </Link>
            <ul id="ul_dropdown">
                <div className="none">
                    <li onClick={click}>
                        <a className="maintenance" href="#">
                            PHỤ KIỆN
                        </a>
                    </li>
                    <li>
                        <a className="maintenance" href="#reviewVideo">
                            REVIEW
                        </a>
                    </li>
                    <li>
                        <a className="maintenance" href="#news">
                            TIN TỨC
                        </a>
                    </li>
                    <li>
                        <a className="maintenance" href="#contact">
                            CONTACT
                        </a>
                    </li>
                    <li></li>
                </div>
                {/* Phần giỏ hàng */}
                <Cart />
            </ul>
        </div>
    )
}

export default NavPage