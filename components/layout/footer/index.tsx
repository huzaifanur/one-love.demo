import Section from "@/components/shared/Section";
import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo-nobackground-200.png";
import Link from "next/link";
import paypalImage from "@/assets/images/Paypal_logo.png";
const Footer = () => {
  return (
    <Section
      sectionClasses="bg-bluetext"
      widthHandlerDivClasses="px-10 relative"
    >
      <div className="flex">
        <div>
          <Image src={logo} alt={"logo"} width={140} height={140} />
          <h6 className="text-xl font-semibold text-navyblue my-3">
            We&apos;d love to hear from you!
          </h6>
          <div className="mt-4 text-navyblue">
            <p>OneLoveClubVT@gmail.com</p>
            <p>(802) 881-7909</p>
            <p>Location: Burlington, VT</p>
          </div>
        </div>
        <div className="ml-10">
          <h6 className="text-3xl text-navyblue font-semibold">
            Sign up for Our Newsletter!
          </h6>
          <div className="flex my-8">
            <input
              className="p-2 text-lg rounded-l-md w-full focus-visible:ring-0  focus-visible:border-none focus:ring-0"
              placeholder="Add your email here"
            />
            <button className="p-2 text-lg font-medium bg-yellow-500 rounded-r-md">
              submit
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-9">
        <p className="text-center text-lg font-medium text-navyblue">
          Please Support Us!
        </p>
        <div className="flex gap-5">
          <div className="ring-2 ring-navyblue rounded-full w-fit bg-lightblue p-3">
            <Link
              href={
                "https://www.paypal.com/donate/?hosted_button_id=FGDZ4BFBP5PRU"
              }
            >
              <Image src={paypalImage} alt="paypal" width={50} height={50} />
            </Link>
          </div>
          <div className="ring-2 flex ring-navyblue rounded-full size-[73px] bg-lightblue p-3">
            <Link
              className="text-[48px] font-semibold text-navyblue mx-auto -mt-[7px]"
              href={"https://www.facebook.com/1lovecollective/"}
            >
              f
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
