// "use client";
// import { useParams } from "next/navigation";
// import { Container } from "reactstrap";

// const TourDetail = () => {
//   const { id } = useParams(); // Get the tour ID from the URL

  
//   return (
//     <Container>
//       <h1>Tour Details</h1>
//       <p>Tour ID: {id}</p>
//     </Container>
//   );
// };

// export default TourDetail;


"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "reactstrap";

const TourDetail = () => {
  const { id } = useParams(); // Get the tour ID from the URL
  console.log(id);
  
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://192.168.16.176:5000/api/v1/tours/${id}`);
        if (!res.ok) throw new Error("Failed to fetch tour");
        const data = await res.json();
        setTour(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTour();
    }
  }, [id]);

  return (
    <Container className="mt-5">
      <h1>Tour Details</h1>
      {loading && <Spinner color="primary">Loading...</Spinner>}
      {error && <Alert color="danger">{error}</Alert>}
      {tour && (
        <div>
          <h2>{tour.name}</h2>
          <p><strong>Location:</strong> {tour.location}</p>
          <p><strong>Description:</strong> {tour.description}</p>
          <p><strong>Price:</strong> ${tour.price}</p>
          {/* Add more fields as necessary */}
        </div>
      )}
    </Container>
  );
};

export default TourDetail;
