"use client"

import React, { useState, useContext } from 'react'
import { useRouter } from "next/navigation";
import Image from "next/image"; // ✅ Optimize images
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import Link from "next/link"; 

// import { Link, useNavigate } from 'react-router-dom'
import "../login/login.css"


import { AuthContext } from "@/context/AuthContext";
import { BASE_URL } from "@/utils/config";

// import registerImg from '../assets/images/register.png'
// import userIcon from "../assets/images/user.png"
// import { AuthContext } from "../context/AuthContext";
// import { BASE_URL } from "../utils/config";

const Register = () => {

  const [credentials, setCredentials] = useState({
    userName: undefined,
    email:undefined,
    password:undefined
});

const { dispatch } = useContext(AuthContext);
const router = useRouter();

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// };

const handleChange = (e) => {
  setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
};

// const handleClick = async (e: React.FormEvent) => {
//   e.preventDefault();

const handleClick = async (e) => {
  e.preventDefault();

  try {
    // const res = await fetch(`${BASE_URL}/auth/register`, {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const result = await res.json();
    if (!res.ok) {
      alert(result.message);
      return;
    }

    // dispatch({ type: "REGISTER_SUCCESS" });
    //   router.push("/login"); // ✅ Navigate in Next.js
    // } catch (err) {
    //   alert(err.message);
    // }

    router.push("/login"); // ✅ Redirect to login after success
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <section>
       <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <Image src="/assets/images/register.png" alt="Register" width={400} height={400} />
              </div>

              <div className="login__form">
                <div className="user">
                  <Image src="/assets/images/user.png" alt="User" width={50} height={50} />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="text" placeholder='name' required id='name' onChange={handleChange} />
                  </FormGroup>

                  <FormGroup>
                    <input type="email" placeholder='Email' required id='email' onChange={handleChange} />
                  </FormGroup>

                  <FormGroup>
                    <input type="password" placeholder='Password' required id='password' onChange={handleChange} />
                  </FormGroup>

                    <Button className="btn secondary__btn auth__btn" type="submit">Create Account</Button>
                  
                </Form>
                <p>Already have an account? <Link href='/login'>Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container> 
    </section>
  );
};

export default Register