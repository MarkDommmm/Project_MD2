import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { adminAddUser, adminSelectUser, adminUpdateUser } from '../../../redux/action';
import Pagination from "react-bootstrap/Pagination";
import Swal from 'sweetalert2';
import swal1 from 'sweetalert';
import Navbar from './layoutAdmin/Navbar';

function UserManagement() {
  const [users, setUsers] = useState([])
  const [selectUser, setSelectUser] = useState({})
  const [editUser, setEditUser] = useState([])
  const dispatch = useDispatch()
  const userUpdate = useSelector((state) => state.updateUser)
  const [check, setCheck] = useState(true)
  // =======================================Search==========================================================
  const [searchInput, setSearchInput] = useState("");
  const [sortType, setSortType] = useState("asc");
  // Phần phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  // =======================================MODAL==========================================================
  const handleInputChange = (e) => {
    setSelectUser({ ...selectUser, [e.target.name]: e.target.value })
  }

  const [show, setShow] = useState(false);
  const handleSaveUser = async () => {
    dispatch(adminUpdateUser(selectUser))
    setShow(false)

  };
  const handleCloseModal = () => {
    if (userUpdate) {
      setSelectUser({})
      setCheck(true)
    }
    setShow(false)
  }
  const handleShow = async (e) => {



    setCheck(false)
    dispatch(adminSelectUser(e))
    setShow(true)
  };
  // console.log(selectUser);
  // ===================================DELETE USERS==============================================================
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:7777/users/${id}`)
    setCheck(!check)

  }
  const handleAddUser = () => {
    if (!selectUser.username || selectUser.username.trim() === '') {
      swal1('Error', 'Please enter a username', 'error');
      return;
    }
    if (!selectUser.email || selectUser.email.trim() === '') {
      swal1('Error', 'Please enter an email', 'error');
      return;
    }
    if (!selectUser.password || selectUser.password.trim() === '') {
      swal1('Error', 'Please enter a password', 'error');
      return;
    }
    if (!selectUser.VIP || selectUser.VIP.trim() === '') {
      swal1('Error', 'Please enter a VIP status', 'error');
      return;
    }

    // Dispatch the action to add the user
    dispatch(adminAddUser(selectUser));
    Swal.fire({
      icon: 'success',
      title: 'Congratulations on your successful registration',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    // Close the modal
    setShow(false);
  };



  // ===================================LOAD USERS==============================================================
  const loadUsers = async () => {
    let url = `http://localhost:7777/users`
    if (searchInput) {
      url += `?q=${searchInput}`
    } else {
      if (sortType === "asc") {
        url += `?_sort=username&_order=asc`
      } else {
        url += `?_sort=username&_order=desc`
      }
    }
    const countResponse = await axios.get(
      `${url}&_page=1&_limit=1&_count=true`
    )
    const totalCount = countResponse.headers["x-total-count"]
    const totalPages = Math.ceil(totalCount / perPage)
    const result = await axios.get(
      `${url}&_page=${currentPage}&_limit=${perPage}`

    )
    setUsers(result.data);
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

  // =================================================================================================

  useEffect(() => {
    loadUsers()
    if (userUpdate) {
      setSelectUser(userUpdate)
    } else {
      setSelectUser({
        VIP: "",
        username: "",
        email: "",
        password: "",
        id: "",
      })
    }
  }, [check, userUpdate, searchInput, sortType, currentPage, perPage])
  // =================================================================================================
  return (
    <div id='UserMana'>
      <Navbar />
      <div id="container-table" className="container-fluid al">
        <h1 className="text_center_center fontText">Quản lý Users</h1>
        <br />
        <p className="white">
          <b>TÌM KIẾM Users:</b>
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
        <i className="fa fa-search search-user" />
        <b className="white">CHỨC NĂNG CHÍNH:</b>
        <br />
        <button className="nv btn add-new" onClick={() => setShow(!show)}>
          <i className="fa-solid fa-user-plus" />
        </button>
        <button
          className="nv"
          type="button"
        >
          <i className="fa-solid fa-filter" />
        </button>
        <button className="nv cog">
          <i className="fa-solid fa-screwdriver-wrench" />
        </button>
        <table className="table table-bordered" id="myTable">
          <thead>
            <tr className="ex">
              <th>ID #</th>
              <th>UsersName<i className="fa-solid fa-sort" onClick={handleSort}></i></th>
              <th>Password</th>
              <th>Email:</th>
              <th>VIP</th>
              <th>Tính Năng</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {users.map((e, i) => (
              <tr key={i}>
                <td className="text_center">{e.id}</td>
                <td className="text_center">{e.username}</td>
                <td className="text_center">{e.password}</td>
                <td className="text_center">{e.email}</td>
                <td className="text_center" id="VIP"> {e.VIP} <i className="edit fa fa-pencil"></i></td>
                <td className="text_center">
                <i className="fa-solid fa-lock " style={{color:'red'}}></i>
                </td>
                {/* {e.username === 'admin' ?
                  :
                  <td>

                    <i className="edit fa fa-pencil" onClick={() => handleShow(e)}></i>
                    <i
                      onClick={() => handleDelete(e.id)}
                      className="fa-solid fa-trash-can delete"></i>
                  </td>
                } */}
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


      <Modal show={show} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Name:</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                value={selectUser.username}
                name="username"
                type="text"
                placeholder="Enter user name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email User:</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                value={selectUser.email}
                name="email"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password User:</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                value={selectUser.password}
                name="password"
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>VIP:</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                value={selectUser.VIP}
                name="VIP"
                type="text"
                placeholder="Enter VIP status"
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>

          {check === true ?
            <Button variant="primary" onClick={handleAddUser}>
              Add User
            </Button>
            :
            <Button variant="primary" onClick={handleSaveUser}>
              Update User
            </Button>
          }

        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default UserManagement