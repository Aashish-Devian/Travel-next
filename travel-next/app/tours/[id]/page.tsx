"use client";
import { useParams } from "next/navigation";
import { Container } from "reactstrap";

const TourDetail = () => {
  const { id } = useParams(); // Get the tour ID from the URL

  return (
    <Container>
      <h1>Tour Details</h1>
      <p>Tour ID: {id}</p>
    </Container>
  );
};

export default TourDetail;
