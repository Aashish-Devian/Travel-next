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

// "use client";
// import { BASE_URL } from "@/utils/config";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Container, Spinner, Alert } from "reactstrap";

// const TourDetail = () => {
//   const { id } = useParams(); // Get the tour ID from the URL
//   console.log(id);

//   const [tour, setTour] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTour = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/trips/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch tour");
//         const data = await res.json();
//         setTour(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchTour();
//     }
//   }, [id]);

//   return (
//     <Container className="mt-5">
//       <h1>Tour Details</h1>
//       {loading && <Spinner color="primary">Loading...</Spinner>}
//       {error && <Alert color="danger">{error}</Alert>}
//       {tour && (
//         <div>
//           <h2>{tour.name}</h2>
//           <p><strong>Location:</strong> {tour.location}</p>
//           <p><strong>Description:</strong> {tour.description}</p>
//           <p><strong>Price:</strong> ${tour.price}</p>
//           {/* Add more fields as necessary */}
//         </div>
//       )}
//     </Container>
//   );
// };

// export default TourDetail;

"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import "@/styles/tour-details.css";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import calculateAvgRating from "@/utils/avgRating";
import Booking from "@/components/Booking/Booking";
import Newsletter from "@/shared/Newsletter";
import useFetch from "@/hooks/useFetch";
import { AuthContext } from "@/context/AuthContext";
import { BASE_URL } from "@/utils/config";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const TourDetails = () => {
  const router = useRouter();
  const { id } = useParams(); // Get tour ID from Next.js router query

  const reviewMsgRef = useRef(null);
  const [tourRating, setTourRating] = useState(null);
  // const { user } = useContext(AuthContext);
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/trips/${id}`);

  // State management for itinerary expansion
  const [expandedDays, setExpandedDays] = useState([]);
  const [allDaysExpanded, setAllDaysExpanded] = useState(false);
  const [floatingNav, setFloatingNav] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef(null);

  // Destructure tour data
  const {
    photo = "",
    title = "",
    desc = "",
    price = "",
    reviews = [],
    city = "",
    address = "",
    distance = "",
    maxGroupSize = "",
    overview = [],
    include = [],
    itinerary = [],
    equipment = [],
    tripMap = "",
    video = "",
    faqs = [],
  } = tour || {};

  const { totalRating, avgRating } = calculateAvgRating([]); //!reviews
  const options = { day: "numeric", month: "long", year: "numeric" };

  // Handle review submission
  const submitHandler = async (e) => {
    e.preventDefault();
    // @ts-ignore
    const reviewText = reviewMsgRef.current.value;
    const user = "";
    try {
      if (!user) {
        alert("Please sign in");
        return;
      }

      const reviewObj = {
        username: "",
        reviewText,
        rating: tourRating,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/review/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(reviewObj),
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  // Scroll to top when tour data loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  // Toggle individual day expansion
  const toggleDay = (index) => {
    setExpandedDays((prev) => (prev.includes(index) ? [] : [index]));
  };

  // Toggle all days expansion
  const toggleAllDays = () => {
    setAllDaysExpanded(!allDaysExpanded);
    if (allDaysExpanded) {
      setExpandedDays([]);
    } else {
      const indexes = itinerary?.map((_, i) => i) || [];
      setExpandedDays(indexes);
    }
  };

  // Handle floating navigation and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "overview",
        "include",
        "itinerary",
        "equipment",
        "tripMap",
        "video",
        "faqs",
        "review",
      ];
      const overviewSection = document.getElementById("overview");
      const reviewSection = document.getElementById("review");

      // Floating nav logic
      if (overviewSection && reviewSection) {
        const overviewTop = overviewSection.getBoundingClientRect().top;
        const reviewTop = reviewSection.getBoundingClientRect().top;
        setFloatingNav(overviewTop <= 80 && reviewTop >= 80);
      }

      // Active section tracking
      const scrollPosition = window.scrollY + 100;
      const buffer = 45;
      const currentSection = sections.find((section, i) => {
        const element = document.getElementById(section);
        const nextElement = sections[i + 1]
          ? document.getElementById(sections[i + 1])
          : null;

        return (
          element &&
          scrollPosition + buffer >= element.offsetTop &&
          (!nextElement || scrollPosition + buffer < nextElement.offsetTop)
        );
      });

      setActiveSection(currentSection || "");
    };

    const handleResize = () => {
      if (navRef.current) {
        navRef.current.style.width = `${navRef.current.parentElement.offsetWidth}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section>
      <Container>
        {loading && <h4 className="text-center pt-5">LOADING.........</h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {!loading && !error && (
          <Row>
            <Col lg="8">
              <div className="tour__content">
                {/* Floating Navigation */}
                <div
                  id="tour-details-nav"
                  className={`${floatingNav ? "floating-nav" : "hidden-nav"}`}
                  ref={navRef}
                >
                  <Nav className="nav-tabs">
                    {/* Navigation items with active state */}
                    {[
                      "overview",
                      "include",
                      "itinerary",
                      "equipment",
                      "tripMap",
                      "video",
                      "faqs",
                      "review",
                    ].map((section, i) => (
                      <NavItem key={i} className="nav-item">
                        <NavLink
                          href={`#${section}`}
                          className={activeSection === section ? "active" : ""}
                        >
                          <i
                            className={`ri-${
                              section === "overview"
                                ? "eye-line"
                                : section === "include"
                                ? "secure-payment-line"
                                : section === "itinerary"
                                ? "bar-chart-horizontal-line"
                                : section === "equipment"
                                ? "hammer-line"
                                : section === "tripMap"
                                ? "map-2-line"
                                : section === "video"
                                ? "youtube-line"
                                : section === "faqs"
                                ? "question-line"
                                : "star-half-line"
                            }`}
                          />
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>
                </div>
                {/* Rest of the component content remains mostly unchanged except for the following adjustments */}
                {/* ... (Same structure as original with minor adjustments) ... */}
                <Image src={photo} alt="" />
                <div className="tour__info">
                  <h2>{title ?? ""}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>{" "}
                      {avgRating} ({reviews?.length})
                    </span>
                    <span>
                      <i className="ri-map-pin-user-fill"></i> {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-line"></i> {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i> ${price} /
                      per person
                    </span>
                    <span>
                      <i className="ri-map-pin-time-line"></i> {distance} k/m
                    </span>
                    <span>
                      <i className="ri-group-line"></i> {maxGroupSize} people
                    </span>
                  </div>

                  <h5>Description</h5>
                  <p dangerouslySetInnerHTML={{ __html: desc }}></p>

                  <div className="tour__extra-info">
                    <h5 id="overview" className="scroll-offset">
                      Overview
                    </h5>
                    <ul>
                      {overview?.map((point, index) => (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={{ __html: point }}
                        ></li>
                      ))}
                    </ul>

                    <h5 id="include" className="scroll-offset">
                      What's Included
                    </h5>
                    <ul>
                      {include?.map((include, index) => (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={{ __html: include }}
                        ></li>
                      ))}
                    </ul>

                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 id="itinerary" className="scroll-offset">
                          Itinerary
                        </h5>
                        <div>
                          <Button
                            className="itinerary-toggle-button btn primary__btn text-white"
                            onClick={toggleAllDays}
                          >
                            {allDaysExpanded ? "Close All" : "Open All"}
                          </Button>
                        </div>
                      </div>
                      <div className="itinerary-content">
                        {itinerary?.map((item, index) => (
                          <div key={index} className="itinerary-item">
                            <header
                              onClick={() => toggleDay(index)}
                              dangerouslySetInnerHTML={{ __html: item.day }}
                            />
                            {expandedDays.includes(index) && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
                                }}
                              ></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <h5 id="equipment" className="scroll-offset">
                      Equipment
                    </h5>
                    <ul>
                      {equipment?.map((equipment, index) => (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={{ __html: equipment }}
                        ></li>
                      ))}
                    </ul>

                    <h5 id="tripMap" className="scroll-offset">
                      Trip Map
                    </h5>
                    <a href={tripMap} target="_blank" rel="noopener noreferrer">
                      View Map
                    </a>

                    <h5 id="video" className="scroll-offset">
                      Video
                    </h5>
                    <iframe
                      width="560"
                      height="315"
                      src={video}
                      allowFullScreen
                    ></iframe>

                    <div className="d-flex justify-content-between align-items-center">
                      <h5 id="faqs" className="scroll-offset">
                        FAQs
                      </h5>
                      <div>
                        <Button
                          className="itinerary-toggle-button btn primary__btn text-white"
                          onClick={toggleAllDays}
                        >
                          {allDaysExpanded ? "Close All" : "Open All"}
                        </Button>
                      </div>
                    </div>
                    <div className="itinerary-content">
                      {faqs?.map((item, index) => (
                        <div key={index} className="itinerary-item">
                          <header onClick={() => toggleDay(index)}>
                            {item.question}
                          </header>
                          {expandedDays.includes(index) && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.answer,
                              }}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="tour__reviews mt-4">
                  <h4 id="review" className="scroll-offset">
                    Reviews ({reviews?.length} reviews)
                  </h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => setTourRating(star)}>
                          {star} <i className="ri-star-s-fill"></i>
                        </span>
                      ))}
                    </div>
                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="Share your thoughts"
                        required
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <div className="review__item" key={review._id}>
                        <Image src="/assets/images/avatar.jpg" alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating} <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        )}
      </Container>
      <Newsletter />
    </section>
  );
};

export default TourDetails;
