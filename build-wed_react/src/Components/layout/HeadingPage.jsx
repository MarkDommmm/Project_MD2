import React, { useEffect, useState } from 'react'
import Modal from '../CompChild/Modal'
import axios from 'axios'

function HeadingPage() {
    const [modal, setModal] = useState(false)
    const [loginUser, setLoginUser] = useState('')
    const [check, setCheck] = useState(false);

    const loadUser = async () => {
        await axios.get("http://localhost:7777/loginUser")
            .then(res => setLoginUser(res.data))
    }
    const handleSignOut = async () => {
        await axios.delete(`http://localhost:7777/loginUser/${loginUser[0].id}`)
        setCheck(!check)
    }
    useEffect(() => {

        loadUser()

    }, [check])
    return (
        <div className="heading">
            <section className="navbar ">
                <div className="container-fluid">
                    <div className="margin-left">
                        <a className="navbar-brand">HH WATCH 69</a>
                        <span> TIME WITH PERFECTION</span>
                    </div>
                    <div className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search..."
                            aria-label="Search" />
                        <span className="phonenumber">
                            <i className="fa-solid fa-phone-volume" />
                            0944448286
                        </span>
                        <div id="login_mobile">
                            <a onClick={() => setModal(!modal)}>
                                <i className="fa-solid fa-user-group" />
                            </a>
                        </div>
                        <div id="nav-login">
                            <a onClick={() => setModal(!modal)}>
                                <i className="fa-solid fa-user-group" />
                                {loginUser.length === 0 ? 'Login/Signup' : (loginUser[0].username)}

                            </a>
                            {/* MODALLLLLLL */}
                            {loginUser.length === 0 ?
                                <Modal modal={modal} setModal={setModal} setCheckprop={setCheck} checkProp={check} />
                                :
                                <ul className="dropdown">
                                    <li><a >Profile</a></li>
                                    <li><a onClick={handleSignOut}>Đăng xuất</a></li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HeadingPage