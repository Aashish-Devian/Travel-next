
import React from 'react'
import { Card, CardBody } from 'reactstrap'
// import {Link} from 'next/link' //change for backend
import Link from "next/link";
import Image from "next/image";

import calculateAvgRating from '../utils/avgRating'

import "./tour-card.css"

const TourCard = ({tour}) => {
    const {_id, title, City, photo, price, featured, reviews } = tour

    const {totalRating, avgRating} = calculateAvgRating(reviews) 

  return (
    <div className="tour__card">
        <Card>
            <div className="tour__img">
                <Image src={photo} alt="tour-img" 
                width={300} 
                height={200}
                style={{ objectFit: "cover", borderRadius: "10px" }}
                />
                {featured && <span>Featured</span>}
            </div>

            <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
                <span className="tour__location d-flex align-items-center gap-1">
                    <i class="ri-map-pin-line"></i> {City}
                </span>
                <span className="tour__rating d-flex align-items-center gap-1">
                    <i class="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? ("Not rated") :
                        (<span>({reviews.length})</span>)
                    }
                </span>
            </div>

            <h5 className="tour__title">
                <Link href={`/tours/${_id}`} > {title} </Link>
            </h5>

            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                <h5>
                    ${price} <span>/per person</span>
                </h5>

                <button className="btn booking__btn">
                    <Link href={`/tours/${_id}`} >Let's Travel</Link>
                </button>
            </div>
        </CardBody>

        </Card>

    </div>
  )
}

export default TourCard