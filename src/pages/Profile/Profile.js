//profile
import React,{useState,useEffect} from 'react'
import Card from "react-bootstrap/Card"
import Row from 'react-bootstrap/esm/Row'
import { useParams } from 'react-router-dom'
import Spiner from "../../components/Spiner/Spiner"
import {singleUsergetfunc} from "../../services/Apis"
import { BASE_URL } from '../../services/helper'
import moment from "moment"
import "./profile.css"

const Profile = () => {

  const [userprofile,setUserProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);

  const {id} = useParams();

  const userProfileGet = async()=>{
    const response = await singleUsergetfunc(id);
    
    if(response.status === 200){
      setUserProfile(response.data)
    }else{
      console.log("error");
    }
  }


  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [id])
  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
          <Card className='card-profile'>
            <Card.Body>
             
              <div className='text-center'>
                <h4>Name: <span>{userprofile.fname }</span></h4>
                <h4>Project Name: <span>{userprofile.lname}</span></h4>
                <h4>Email: <span>{userprofile.email}</span> </h4>
                <h5>Phone Number:<span>{userprofile.mobile}</span> </h5>
                <h4>Post:<span>{userprofile.gender}</span> </h4>
                <h4>Location:<span>{userprofile.location}</span> </h4>
                <h4>Status: <span>{userprofile.status}</span> </h4>
                <h5>Date Created:<span>{moment(userprofile.datecreated).format("DD-MM-YYYY")}</span> </h5>
                <h5>Date Updated:<span>{userprofile.dateUpdated}</span> </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      }

    </>
  )
}

export default Profile