import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import "../index.css";



const Carouselapp = () => (
  <div>
<Carousel pause='hover' touch='true' class="container-fluid">
<Carousel.Item>
  <img src="https://www.flaticon.com/svg/static/icons/svg/2910/2910922.svg"></img>
    <Carousel.Caption>
      <h3 style={{
        fontSize: "100px"
      }}>Simply Budget</h3>
      <p>An easy to use budget app.</p>
    </Carousel.Caption>
    <button class="btn-success" >Sign Up Today</button>
  </Carousel.Item>

  <Carousel.Item>
    <img style={{
      justifyContent: "center"
    }} src="https://www.flaticon.com/svg/static/icons/svg/3004/3004164.svg"></img>
    <Carousel.Caption>
    <h3 style={{
        fontSize: "100px"
      }}>Save money</h3>
      <p>Get ahead, live better.</p>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
  <img src="https://www.flaticon.com/svg/static/icons/svg/2942/2942269.svg"></img>
    <Carousel.Caption>
    <h3 style={{
        fontSize: "100px"
      }}>Plan and save</h3>
      <p>Track your purchases, set goals, manage your spending.</p>
    </Carousel.Caption>
  </Carousel.Item>

 

</Carousel>
</div>
)

export default Carouselapp;