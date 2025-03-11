"use client";

import React from 'react'
import './home.css'

import { Container, Row, Col } from 'reactstrap'
import Image from "next/image";
// import { video } from "next/video";
// import heroImg from '../assets/images/hero-img01.jpg'
// import heroImg02 from '../assets/images/hero-img02.jpg'
// import heroVideo from '../assets/images/hero-video.mp4'
// import worldImg from '../assets/images/world.png'
// import experienceImg from '../assets/images/experience.png' 
import Subtitle from '../../shared/Subtitle'

import SearchBar from '../../shared/SearchBar'
import ServiceList from '../../services/serviceList'
import FeaturedTourList from '../../components/Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../../components/Image-gallery/MasonryImagesGallery'
import Testimonials from '../../components/Testimonial/Testimonials'
import Newsletter from '../../shared/Newsletter'

export default function Home() {
  return (
    <>
      {/* ============hero section start======== */}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
          <div className="hero__content">
            <div className="hero__subtitle d-flex align-items-center">
              <Subtitle subtitle={'knows before you go'} />
              <Image src="/assets/images/world.png" alt="image world" width={100} height={350} />              
            </div>
            <h1>
              travelling opens the door to creating{" "}
              <span className="hightlight">Memories</span>
            </h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing 
              elit. Dolores ipsam obcaecati veniam quod, consectetur 
              error recusandae esse natus, explicabo enim cupiditate 
              assumenda dicta culpa numquam corporis ex dolorem repellat 
              temporibus?
              </p>
          </div>
        </Col>

          <Col lg='2'>
            <div className="hero__img-box">
                <Image src="/assets/images/hero-img01.jpg" alt="" width={100} height={350} />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box hero__video-box mt-4">
              <video src="/videos/hero-video.mp4" alt="video" width={100} height={350} autoPlay loop muted playsInline />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__Image-box mt-5">
              <Image src="/assets/images/hero-img02.jpg" alt="" width={100} height={350} />
            </div>
          </Col>
          <SearchBar />

      </Row>
    </Container>
  </section>
  {/* ============hero section end======== */}
  <section>
    <Container>
      <Row>
        <Col lg='3'>
        <Subtitle subtitle={'What we serve'} />
        <h2 className="services__title">We offer our best services</h2>
        </Col>
        <ServiceList />
      </Row>
    </Container>
  </section>

  {/* ===============featured tour selection start ================ */}
  <section>
    <Container>
    <Row>
      <Col lg='12' className="mb-5">
        <Subtitle subtitle={'Explore'} />
        <h2 className="featured__tour-title">Our Feature Tours</h2>

      </Col>
      <FeaturedTourList />
      {/* <div className="read-more-button-container">
          <a href="/tours" className="read-more-button">Read More</a>
        </div> */}
    </Row>
    </Container>
  </section>
  {/* ===============featured tour selection end ================ */}

  {/* ===============experience selection start ================ */}

  <section>
    <Container>
      <Row>
        <Col lg='6'>
        <div className="experience__content">
          <Subtitle subtitle={"Experience"} />
          <h2>
            with our all experience <br /> we will serve you
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque nesciunt maiores pariatur at consequuntur assumenda, vel nulla obcaecati amet iusto possimus rem dolor eaque quos consectetur expedita esse iste sapiente?
            <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

        </div>
        <div className="counter__wrapper d-flex align-items-center gap-5">
          <div className="counter__box">
            <span>12k+</span>
            <h6>Successful Trip</h6>
          </div>

          <div className="counter__box">
            <span>2k+</span>
            <h6>Regular clients</h6>
          </div>

          <div className="counter__box">
            <span>15</span>
            <h6>Years experience</h6>
          </div>
        </div>
        </Col>
        <Col lg='6'>
        <div className="experience__img">
          <img src="/assets/images/experience.png" alt="" width={100} height={350} />
        </div>
        </Col>
      </Row>
    </Container>
  </section>

  {/* ===============experience selection end ================ */}

  {/* ===============Gallery selection start ================ */}
  <section>
    <Container>
      <Row>
        <Col lg='12'>
        <Subtitle subtitle={"Gallery"} />
        <h2 className="galley__title">
          visit our customrs tour gallery
        </h2>
        </Col>
        <Col lg='12'>
         <MasonryImagesGallery />
        </Col>
      </Row>
    </Container>
  </section>
  {/* ===============Gallery selection end ================ */}

  {/* ===============testimonial selection start ================ */}
  <section>
    <Container>
      <Row>
        <Col lg='12'>
          <Subtitle subtitle={'Fans Love'} />
          <h2 className="testimonial__title">What our fans say about us</h2>
        </Col>
        <Col lg='12'>
          <Testimonials />
        </Col>
      </Row>
    </Container>
  </section>
  {/* ===============testimonial selection end ================ */}

  <Newsletter />

    </>
  );
}
