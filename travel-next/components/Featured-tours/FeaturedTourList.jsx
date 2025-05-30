import React from "react";
import TourCard from "../../shared/TourCard";
// import tourData from '../../assets/data/tours'
import { Col, Row } from "reactstrap";
import useFetch from "./../../hooks/useFetch";
import { BASE_URL } from "./../../utils/config";

const FeaturedTourList = () => {
  const {
    data: featuredTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/search/getFeaturedTour`);
  // console.log(featuredTours)

  return (
    <>
    {/* <Row> */}
      {loading && <h4>Loading.....</h4>}
      {error && <h4>{error}</h4>}
      {!loading && 
        !error && 
        featuredTours?.map((tour) => (
          <Col lg="3" md="6" sm="6" className="mb-4" key={tour_id}>
            <TourCard tour={tour} />
          </Col>
        ))}
        {/* </Row> */}
    </>
  )
}

export default FeaturedTourList
