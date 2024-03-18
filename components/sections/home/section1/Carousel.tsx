"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./carousel.css";
import { carouselImages } from "@/constants/carousel";
//instead of importing, fetch images from database and label as ImageA, ImageB, ImageC...that BJB has uploaded through admin page. How would we make the carousel work for an unfixed number of images?

//May need to revisit the scaling of the pics... not all the same dimensions...
export default function CarouselComponent() {
  return (
    <div className="carousel-wrapper">
      <Carousel infiniteLoop interval={5000} useKeyboardArrows autoPlay>
        {carouselImages.map((_image, i) => (
          <div key={`${i}-carousel-image`}>
            <img src={_image.src} alt="carousel" className="carousel-images" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
