import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Navbar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loginUser, setLoginUser] = useState('');
    const navigate = useNavigate()
    const loadUser = async () => {
        await axios.get('http://localhost:7777/loginUser').then(res => setLoginUser(res.data));
    };

    const handleSignOut = async () => {
        if (loginUser) {
            await axios.delete(`http://localhost:7777/loginUser/${loginUser[0].id}`);
            localStorage.setItem("admin", JSON.stringify(false))
            navigate('/')
        }
    };

    console.log(loginUser);
    useEffect(() => {
        loadUser();
    }, []);
    return (

        <div id='navbar'>
            <Button onClick={handleShow} style={{ backgroundColor: '#000', margin: "20px" }}>
                <i className="fa-solid fa-bars"></i>
            </Button>
            <a style={{ margin: "20px", color: '#f9af4b ' }} onClick={handleSignOut}>Đăng xuất <i className="fa-solid fa-arrow-right-from-bracket"></i></a>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><img src="/img/logo/H-removebg-preview (1).png" style={{ width: "100px" }} /></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className='navbar_admin'>
                        <li className="active">
                            <Link to={'/admin'}>Quản lý sản phẩm</Link>
                        </li>
                        <li>
                            <Link to={'/order'}>Quản lý đơn hàng</Link>
                        </li>
                        <li>
                            <Link to={'/usermanagement'}>Quản lý Users</Link>
                        </li>
                        <li>
                            <Link to={'/report'}>BÁO CÁO</Link>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>

        </div >
    );
}

export default Navbar;
