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
    <div style={{ backgroundColor: "#47753e" }}>
      <HeaderCarousel />
      <Carousel
        pause="hover"
        touch="true"
        className="vh-100 mx-auto"
        style={{ marginTop: "-187px", maxWidth: "1200px" }}
      >
        <Carousel.Item className="p-4 mt-4">
          <Row style={{ marginTop: "90px" }}>
            <Col
              xs="12"
              sm="12"
              md="6"
              lg="6"
              className="d-flex justify-content-center"
            >
              <Image
                fluid
                src="https://www.flaticon.com/svg/static/icons/svg/2910/2910922.svg"
              />
            </Col>
            <Col
              xs="12"
              sm="12"
              md="5"
              lg="5"
              className="align-self-center d-flex flex-column"
            >
              <h3
                style={{
                  fontSize: "clamp(50px, 5vw, 80px)",
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
                <Button
                  type="submit"
                  variant="contained"
                  className="position-fixed "
                >
                  <h2 className="d-flex my-auto">
                    <b>Get started</b>
                  </h2>
                </Button>
              </a>
              {/* </Carousel.Caption> */}
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item className="p-4">
          <Row style={{ marginTop: "90px" }}>
            <Col
              xs="12"
              sm="12"
              md="6"
              lg="6"
              className="d-flex justify-content-center"
            >
              <Image
                fluid
                src="https://www.flaticon.com/svg/static/icons/svg/3004/3004164.svg"
              />
            </Col>
            <Col
              xs="12"
              sm="12"
              md="5"
              lg="5"
              className="align-self-center d-flex flex-column justify-content-center"
            >
              <h3
                style={{
                  fontSize: "clamp(50px, 5vw, 80px)",
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
                <Button
                  type="submit"
                  variant="contained"
                  className="position-fixed "
                >
                  <h2 className="d-flex my-auto">
                    <b>Get started</b>
                  </h2>
                </Button>
              </a>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item className="p-4">
          <Row style={{ marginTop: "90px" }}>
            <Col
              xs="12"
              sm="12"
              md="6"
              lg="6"
              className="d-flex justify-content-center"
            >
              <Image
                fluid
                src="https://www.flaticon.com/svg/static/icons/svg/2942/2942269.svg"
              />
            </Col>
            <Col
              xs="12"
              sm="12"
              md="5"
              lg="5"
              className="align-self-center d-flex flex-column justify-content-center"
            >
              <h3
                style={{
                  fontSize: "clamp(50px, 5vw, 80px)",
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
                <Button
                  type="submit"
                  variant="contained"
                  className="position-fixed "
                >
                  <h2 className="d-flex my-auto">
                    <b>Get started</b>
                  </h2>
                </Button>
              </a>
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
