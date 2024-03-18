import React from "react";
import dynamic from 'next/dynamic'
 
const Section1 = dynamic(() => import('@/components/sections/events/section1'), {
  ssr: false,
})
const Section2 = dynamic(() => import('@/components/sections/events/section2'), {
  ssr: false,
})
const Section3 = dynamic(() => import('@/components/sections/events/section3'), {
  ssr: false,
})



const Events = () => {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
    </>
  );
};

export default Events;
