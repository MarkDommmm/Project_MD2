import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import swal1 from 'sweetalert';
import { json, useNavigate } from 'react-router-dom';



function Modal({ modal, setModal, setCheckprop, checkProp }) {
    const navigate = useNavigate()
    const [overlay, setOverlay] = useState(false);
    const [userApi, setUserApi] = useState([]);
    const [signUp, setSignUp] = useState({});
    const [loginUser, setLoginUser] = useState([]);

    const [check, setCheck] = useState(false);

    const handleInputChange = (e) => {
        setSignUp({
            ...signUp,
            [e.target.name]: e.target.value,
            VIP: 1,
        });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();

        const checkUsername = userApi.some((user) => user.username === signUp.username);
        const checkEmail = userApi.some((user) => user.email === signUp.email);
        if (checkUsername) {
            if (signUp.username === 'admin') {
                swal1('Username "admin" is not allowed!', '', 'error');
                return;
            }
            swal1('Username already exists!', '', 'error');
            return;
        }
        if (checkEmail) {
            swal1('Email already exists!', '', 'error');
            return;
        }
        if (!signUp.username || signUp.username.trim() === '') {
            swal1('Invalid Username!', '', 'error');
            return;
        }
        if (!validateEmail(signUp.email.trim())) {
            swal1('Invalid email!', '', 'error');
            return;
        }
        if (!signUp.password || signUp.password.length < 8) {
            swal1('Password must be at least 8 characters long', '', 'error');
            return;
        }

        await axios.post('http://localhost:7777/users', signUp);
        setCheck(!check)
        setOverlay(!overlay);
        swal1('Congratulations on your successful registration', '', 'success');
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        let isAdmin = signUp.username === 'admin' && signUp.password === 'admin';
        for (const user of userApi) {
            if (isAdmin) {
                await axios.post('http://localhost:7777/loginUser', user);
                localStorage.setItem("admin", JSON.stringify(true))
                navigate("/admin");
                return;
            }
            if (user.username === signUp.username && user.password === signUp.password) {
                localStorage.setItem("admin", JSON.stringify(false))
                await axios.post('http://localhost:7777/loginUser', user);
                setCheckprop(!checkProp);
                setModal(false);
                Swal.fire({
                    title: 'CHÀO MỪNG BẠN 🤑ĐẾN VỚI🤑 HIẾU ĐỒNG HỒ',
                    width: 700,
                    padding: '3em',
                    color: '#000',
                    background: '#fff url("https://cdn.pixabay.com/animation/2022/11/24/06/06/06-06-54-39_512.gif") center repeat',
                    backdrop: `
                        rgba(0, 0, 123, 0.4)
                        url("https://media3.giphy.com/media/uuyfPr2v6aUaPzckUv/giphy.gif?cid=6c09b952x86xypmiogovwr2ys3wb5mtsgecgensmakx7sc9r&ep=v1_stickers_related&rid=giphy.gif&ct=s")
                        top left
                        repeat
                    `,
                });
                return;
            }
        }

        swal1('Please re-enter your Account and Password', '', 'error');
    };




    const loadUsers = async () => {
        await axios.get('http://localhost:7777/users')
            .then((res) => setUserApi(res.data))

        await axios.get('http://localhost:7777/loginUser')
            .then((res) => setLoginUser(res))
    };

    useEffect(() => {
        loadUsers();

    }, [check]);

    return (


        (<div id={modal ? 'myModal' : ''} className="modal">
            <div className='ModalHome'>
                <span className="close" onClick={() => setModal(false)}>
                    ×
                </span>
                <div
                    className={overlay ? "container_modal right-panel-active" : "container_modal"}
                    id="container_modal">
                    <div className="form-container sign-up-container">
                        <form className="form_modal" >
                            <h2>Create Account</h2>
                            <div className="social-container">
                                <a className="social">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a className="social">
                                    <i className="fab fa-google-plus-g" />
                                </a>
                                <a className="social">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </div>
                            <b>or use your email for registration</b>
                            <input
                                name='username'
                                onChange={handleInputChange}
                                id="username_signup"
                                type="text"
                                placeholder="Username"
                            />
                            <input
                                name='email'
                                onChange={handleInputChange}

                                id="email_signup"
                                type="email"
                                placeholder="Email"
                            />
                            <input
                                name='password'
                                onChange={handleInputChange}

                                id="password_signup"
                                type="password"
                                placeholder="Password"
                            />
                            <button
                                onClick={handleAddUser}
                                className="btn_modal">Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form className="form_modal" id="signin-form">
                            <h2>Sign in</h2>
                            <div className="social-container">
                                <a className="social">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a className="social">
                                    <i className="fab fa-google-plus-g" />
                                </a>
                                <a className="social">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </div>
                            <b>or use your account</b>
                            <input
                                onChange={handleInputChange}
                                name='username'
                                id="username"
                                type="text"
                                placeholder="Username: "
                            />
                            <input
                                onChange={handleInputChange}
                                name='password'

                                id="password-field"
                                type="password"
                                placeholder="Password: "
                            />
                            <a href="#">Forgot your password?</a>
                            <button
                                onClick={handleSignIn}
                                className="btn_modal">Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>
                                    To keep connected with us please login with your
                                    personal info
                                </p>
                                <button
                                    onClick={() => setOverlay(!overlay)}
                                    className="ghost btn_modal" id="signIn">
                                    Sign In
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>
                                    Enter your personal details and start journey with us
                                </p>
                                <button
                                    onClick={() => setOverlay(!overlay)}
                                    className="ghost btn_modal" id="signUp">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)


    )
}

export default Modal