import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Col, Image, Row } from "react-bootstrap";
import "../index.css";
import { Button } from "@material-ui/core";
import Logo from "../images/simply-logo-white.png";
import Header from "./Header";
import HeaderCarousel from "./HeaderCarousel";

export default function CarouselApp() {
  return (
    <div
      style={{ backgroundColor: "#47753e" }}
      className="d-flex flex-column vh-100"
    >
      <HeaderCarousel />
      <Carousel
        pause="hover"
        touch="true"
        className="mx-auto h-100"
        style={{
          maxWidth: "1200px",
        }}
      >
        <Carousel.Item className="p-4">
          <Row>
            <Col
              xs="12"
              sm="6"
              md="6"
              lg="6"
              className="d-flex justify-content-center"
            >
              <Image
                style={{ width: "50vw", height: "40vh" }}
                src="https://www.flaticon.com/svg/static/icons/svg/2910/2910922.svg"
              />
            </Col>
            <Col
              xs="12"
              sm="5"
              md="5"
              lg="5"
              className="align-self-center d-flex flex-column"
            >
              <h3
                style={{
                  fontSize: "clamp(30px, 5vh, 80px)",
                  textAlign: "left",
                }}
                className="d-flex align-self-center text-white"
              >
                Get on track.
              </h3>
              <h4 className="text-center text-white">
                Make your budget and stick to it
              </h4>
              <a
                href="/login"
                className="d-flex justify-content-center position-sticky m-4"
              >
                <Button type="submit" variant="contained">
                  <h3
                    className="d-flex my-auto"
                    style={{ fontSize: "clamp(10px, 5vh, 30px)" }}
                  >
                    <b>Get started</b>
                  </h3>
                </Button>
              </a>
              {/* </Carousel.Caption> */}
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item className="p-4">
          <Row>
            <Col
              xs="12"
              sm="6"
              md="6"
              lg="6"
              className="d-flex justify-content-center"
            >
              <Image
                style={{ width: "50vw", height: "40vh" }}
                src="https://www.flaticon.com/svg/static/icons/svg/3004/3004164.svg"
              />
            </Col>
            <Col
              xs="12"
              sm="5"
              md="5"
              lg="5"
              className="align-self-center d-flex flex-column justify-content-center"
            >
              <h3
                style={{
                  fontSize: "clamp(30px, 5vh, 80px)",
                  textAlign: "left",
                }}
                className="d-flex align-self-center text-white"
              >
                Save money.
              </h3>
              <h4 className="d-flex align-self-center text-white">
                Get ahead, live better
              </h4>
              <a
                href="/login"
                className="d-flex justify-content-center position-sticky m-4"
              >
                <Button type="submit" variant="contained">
                  <h3
                    className="d-flex my-auto"
                    style={{ fontSize: "clamp(10px, 5vh, 30px)" }}
                  >
                    <b>Get started</b>
                  </h3>
                </Button>
              </a>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item className="p-4">
          <Row>
            <Col
              xs="12"
              sm="6"
              md="6"
              lg="6"
              className="d-flex justify-content-center"
            >
              <Image
                style={{ width: "50vw", height: "40vh" }}
                src="https://www.flaticon.com/svg/static/icons/svg/2942/2942269.svg"
              />
            </Col>
            <Col
              xs="12"
              sm="5"
              md="5"
              lg="5"
              className="align-self-center d-flex flex-column justify-content-center"
            >
              <h3
                style={{
                  fontSize: "clamp(30px, 5vh, 80px)",
                  textAlign: "left",
                }}
                className="d-flex align-self-center text-white"
              >
                Plan ahead.
              </h3>

              <h4 className="d-flex align-self-center text-white text-center">
                Set goals and manage your spending
              </h4>
              <a
                href="/login"
                className="d-flex justify-content-center position-sticky m-4"
              >
                <Button type="submit" variant="contained">
                  <h3
                    className="d-flex my-auto"
                    style={{ fontSize: "clamp (10px, 5vh, 30px)" }}
                  >
                    <b>Get started</b>
                  </h3>
                </Button>
              </a>
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
