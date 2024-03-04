//table
import React from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Paginations from '../pagination/Paginations';
import { BASE_URL } from '../../services/helper';
import { NavLink } from 'react-router-dom';
import { statuschangefunc } from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import "./table.css"

const Tables = ({ userdata, deleteUser, userGet, handlePrevious, handleNext, page, pageCount, setPage }) => {

  const handleChange = async (id, status) => {
    const response = await statuschangefunc(id, status);

    if (response.status === 200) {
      userGet();
      toast.success("Status Updated")
    } else {
      toast.error("error ")
    }
  }

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Post</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Project Name</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1 + (page - 1)*4}</td> 
                            <td>{element.fname }</td>
                            <td>{element.gender }</td> 
                            <td>{element.email}</td>
                            <td>{element.mobile}</td>
                            <td>{ element.lname}</td>
                            <td className='d-flex align-items-center'>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                <Badge bg={element.status == "Call" ? "primary" : "danger"}>
                                    {element.status} <i class="fa-solid fa-angle-down"></i>
                                  </Badge>      
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "call")}>Call</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Recall")}>Recall</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Apply")}>Apply</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Reapply")}>Reapply</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Redo")}>Redo</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Whatsapp")}>Whatsapp</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Email")}>Email</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Document Print")}>Document Print</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Document Sent")}>Document Sent</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Document Post")}>Document Post</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Noc")}>Noc</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Ground Survey")}>Ground Survey</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Meeting")}>Meeting</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Sanction")}>Sanction</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Started")}>Started</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Completed")}>Completed</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Holding")}>Holding</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Cancelled")}>Cancelled</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                               <td>{element.location}</td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >
                                    <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none">
                                      <i class="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                      <i class="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <div onClick={() => deleteUser(element._id)}>
                                      <i class="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    }) : <div className='no_data text-center'>NO Data Found</div>
                  }


                </tbody>
              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  )
}

export default Tables