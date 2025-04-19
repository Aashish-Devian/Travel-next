"use client";

import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import CommonSection from "../../shared/CommonSection";
import Newsletter from "../../shared/Newsletter";
import SearchBar from "../../shared/SearchBar";
import TourCard from "../../shared/TourCard";
import "../../styles/tour.css";
import { BASE_URL } from "../../utils/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: tours = [], loading, error } = useFetch(`${BASE_URL}/trips`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://localhost:5000`);
        if (!res.ok) throw new Error("Failed to fetch tour");
        const data = await res.json();
        console.log(data, "nabin");
      } catch (err) {
      } finally {
      }
    };

    fetchTour();
  }, []);

  // useEffect(() => {
  //   const pages = Math.ceil(tourCount / 8);
  //   setPageCount(pages);
  //   window.scrollTo(0, 0);
  // }, [page, tourCount, tours]);

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">LOADING..........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour.trip_id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
