"use client";

import React from 'react'
import Slider from 'react-slick'
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// import ava01 from '../../assets/images/ava-1.jpg'
// import ava02 from '../../assets/images/ava-2.jpg'
// import ava03 from '../../assets/images/ava-3.jpg'


const Testimonials = () => {

    const settings = {
        dots: true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide: true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]
    }

  return <Slider {...settings}>
    <div className="testimonial py-4 px-3">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe distinctio enim aliquid accusantium sit provident? Nam voluptate suscipit eius, odit fugiat inventore. Nisi iste consectetur consequuntur porro reprehenderit omnis hic?
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <Image src="/assets/images/ava-1.jpg" className='rounded-2' alt="" width={25} height={25} />
            <div>
                <h6 className="mb-0 mt-3">Aashish Don</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>

    <div className="testimonial py-4 px-3">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe distinctio enim aliquid accusantium sit provident? Nam voluptate suscipit eius, odit fugiat inventore. Nisi iste consectetur consequuntur porro reprehenderit omnis hic?
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <Image src="/assets/images/ava-2.jpg" className='rounded-2' alt="" width={25} height={25} />
            <div>
                <h6 className="mb-0 mt-3">Aashish Don</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>

    <div className="testimonial py-4 px-3">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe distinctio enim aliquid accusantium sit provident? Nam voluptate suscipit eius, odit fugiat inventore. Nisi iste consectetur consequuntur porro reprehenderit omnis hic?
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <Image src="/assets/images/ava-3.jpg" className='rounded-2' alt="" width={25} height={25} />
            <div>
                <h6 className="mb-0 mt-3">Aashish Don</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>

    <div className="testimonial py-4 px-3">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe distinctio enim aliquid accusantium sit provident? Nam voluptate suscipit eius, odit fugiat inventore. Nisi iste consectetur consequuntur porro reprehenderit omnis hic?
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
        <Image src="/assets/images/ava-1.jpg" className='rounded-2' alt="" width={25} height={25} />
        <div>
                <h6 className="mb-0 mt-3">Aashish Don</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>

    <div className="testimonial py-4 px-3">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe distinctio enim aliquid accusantium sit provident? Nam voluptate suscipit eius, odit fugiat inventore. Nisi iste consectetur consequuntur porro reprehenderit omnis hic?
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
        <Image src="/assets/images/ava-2.jpg" className=' rounded-2' alt="" width={25} height={25} />
        <div>
                <h6 className="mb-0 mt-3">Aashish Don</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>

    <div className="testimonial py-4 px-3">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe distinctio enim aliquid accusantium sit provident? Nam voluptate suscipit eius, odit fugiat inventore. Nisi iste consectetur consequuntur porro reprehenderit omnis hic?
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
        <Image src="/assets/images/ava-3.jpg" className=' rounded-2' alt="" width={25} height={25} />
        <div>
                <h6 className="mb-0 mt-3">Aashish Don</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
  </Slider>
}

export default Testimonials