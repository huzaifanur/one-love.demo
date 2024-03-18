import Section from "@/components/shared/Section";
import React from "react";
import Card from "./Card";

const Section3 = async () => {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/event/view/upcoming`
  );
  const upcomingEvents = await response?.json();
  console.log("upcomingEvents", upcomingEvents);
  return (
    <Section>
      <h2 className="text-bluetext text-center font-semibold text-3xl mb-3">
        Upcoming events
      </h2>
      <div className="flex justify-center flex-wrap">
        {upcomingEvents["upcomingEvents"]
          ?.slice(0, 4)
          ?.map((item: any, key: number) => (
            <Card
              key={key}
              item={item}
              title={item.title}
              description={item.description}
              dispDate={item.dispDate}
              host={item.host}
              dispTime={item.dispTime}
              location={item.location}
            />
          ))}
      </div>
    </Section>
  );
};

export default Section3;
