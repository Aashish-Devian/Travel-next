"use client";
import Image from "next/image";

import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useRouter } from "next/navigation"; 

export default function SearchBar () {
  const DestinationRef = useRef("");
  const ActivityRef = useRef(0);
  const DurationRef = useRef(0);
  const router = useRouter();

  const searchHandler = async () => {
    const Destination = DestinationRef.current.value;
    const Activity = ActivityRef.current.value;
    const Duration = DurationRef.current.value;

    if (Destination === "" || Activity === "" || Duration === "") {
      return alert("All fields are required!");
    }

    const res = await fetch(
      `${BASE_URL}/tours/search/getTourBySearch?city=${Destination}&distance=${Activity}&maxGroupSize=${Duration}`
    );

    if (!res.ok) alert("Something went wrong");

    const result = await res.json();

    router(
      `/tours/search?city=${Destination}&distance=${Activity}&maxGroupSize=${Duration}`,
      { state: result.data }
    );
  };

  return <Col lg='12'>
    <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
            <FormGroup className="d-flex gap-3 form__group form__group-fast">
                <span> 
                <Image src="/assets/icons/map.svg" alt="" width={30} height={30}  />
                </span>
                <div>
                    <h6>Destination</h6>
                    <input type="text" placeholder='Where are you going?' ref={DestinationRef} />
                </div>
            </FormGroup>
            <FormGroup className="d-flex gap-3 form__group form__group-fast">
                <span> 
                <Image src="/assets/icons/mental-health.svg" alt="" width={30} height={30} />

                </span>
                <div>
                    <h6>Activity</h6>
                    <input type="text" placeholder='What you want to do?' ref={ActivityRef} />
                </div>
            </FormGroup>
            <FormGroup className="d-flex gap-3 form__group form__group-last">
                <span> 
                <Image src="/assets/icons/pinTimeLine.svg" alt="" width={30} height={30} />
                </span>
                <div>
                    <h6>Duration</h6>
                    <input type="text" placeholder='Days you spend!' ref={DurationRef} />
                </div>
            </FormGroup>

            <span className="search__icon" type='submit' onClick={searchHandler}>
            <Image src="/assets/icons/search.svg" alt="" width={40} height={40} />
            </span>
        </Form>
    </div>
  </Col>
}

// export default SearchBar