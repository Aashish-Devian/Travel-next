
import React from 'react'
import './newsletter.css'

import { Container, Row, Col } from 'reactstrap'
import Image from "next/image";
// import maleTourist from '../assets/images/male-tourist.png'

const Newsletter = () => {
  return <section className='newsletter'>
    <Container>
        <Row>
            <Col lg='6'>
                <div className="newsletter__content">
                    <h2>Subscribe now to get useful travelling information.</h2>

                    <div className="newsletter__input">
                        <input type="email" placeholder='Enter your email' />
                        <button className="btn newsletter_btn">Subscribe</button>
                    </div>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, commodi. Molestiae!</p>
                </div>
            </Col>
            <Col lg='6'>
                <div className="newsletter__img">
                    <Image src="/assets/images/male-tourist.png" alt="" width={100} height={100}/>
                </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default Newsletter