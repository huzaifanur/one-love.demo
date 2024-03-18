import Section from "@/components/shared/Section";
import Image from "next/image";
import React from "react";
import mrBosley from "@/assets/images/mrBosley.jpeg";

const Section4 = () => {
  return (
    <Section widthHandlerDivClasses="flex max-w-[800px]">
      <div className="flex flex-col">
        <h2 className="text-bluetext font-bold text-5xl mb-2">How We Began</h2>
        <p className="text-2xl font-medium ml-10 max-w-[550px]">
          With a community or structure of regularly scheduled activities,
          weekly direct support of people with special needs can be more
          manageable for caregivers and clients. Direct support workers
          developed One Love Club as a better way to create a community of
          belonging and inspiring relationships through weekly activities. An
          easily accessible weekly calendar of events fulfills everyone&apos;s
          needs for inclusion, fun and play, and connection.
        </p>
        <button className="p-2 mt-8 self-end bg-yellow-500 text-xl font-semibold rounded-lg">
          View all events
        </button>
      </div>
      <div className="m-auto">
        <Image
          className="rounded-full"
          src={mrBosley}
          alt="owner"
          width={300}
          height={300}
        />
        <p className="font-bold text-lg text-center mt-8">
          Ben Bosley, <br />
          OLC Founder
        </p>
      </div>
    </Section>
  );
};

export default Section4;
