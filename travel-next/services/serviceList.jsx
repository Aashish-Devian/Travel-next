
import React from 'react'
import ServiceCard from "./serviceCard"
import { Row, Col } from 'reactstrap'

import Image from "next/image";
// import weatherImg from "../assets/images/weather.png"
// import guideImg from "../assets/images/guide.png"
// import customizationImg from "../assets/images/customization.png"

const servicesData = [
    {
        imgUrl: "/assets/images/weather.png",
        title:"calculate weather",
        desc: "Lorem ufhdsg fgsjgf jhhgbjhgfshgf jhbgfsdhgib sdhj fj.",
    },
    {
        imgUrl: "/assets/images/guide.png",
        title:"Best tour guide.r",
        desc: "Lorem ufhdsg fgsjgf jhhgbjhgfshgf jhbgfsdhgib sdhj fj.",
    },
    {
        imgUrl: "/assets/images/customization.png",
        title:"customization",
        desc: "Lorem ufhdsg fgsjgf jhhgbjhgfshgf jhbgfsdhgib sdhj fj.",
    },
]

const serviceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  )
}

export default serviceList