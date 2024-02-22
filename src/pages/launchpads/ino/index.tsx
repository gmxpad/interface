import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Button, Image, Link } from "@nextui-org/react";
import {
  NextButton,
  PrevButton,
} from "@/scripts/EmblaCarouselArrowsDotsButtons";

import { getStaticProps } from "@/framework/rest/inoLaunchpads.ssr";
import { InferGetStaticPropsType } from "next";
import { NextPageWithLayout } from "@/types";
import classNames from "classnames";
import { formatEther, hexToString, parseEther } from "viem";
import {
  formatTimestampGMT,
  getImageChainImage,
  numberWithCommas,
} from "@/scripts/scripts";

export { getStaticProps };

interface Socials {
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  youtube: string;
  medium: string;
  whitepaper: string;
}

interface Details {
  slug: string;
  projectName: string;
  tokenName: string;
  tokenSymbol: string;
  developer: string;
  status: string;
  description: string;
  announcement: string;
  listing: string;
  backgroundImage: string;

  profileImage: string;
  posterImage: string;

  socials: Socials;
  genres: string[];
}

interface LaunchpadsInterface {
  isExist: boolean;
  isUpcoming: boolean;
  isRefundable: boolean;
  isRefund: boolean;
  isSale: boolean;
  isStakerRequired: boolean;

  isDistribution: boolean;
  isSaleNative: boolean;

  details: Details;
  itemType: number;
  eventType: number;
  eventRound: number;
  currency: number;
  projectID: number;
  userCount: number;
  tokenPrice: number;
  collectedValue: number;
  tokensToBeSold: number;
  soldTokens: number;
  salesPerUser: number;
  poolScore: number;
  minDepositAmount: number;
  maxDepositAmount: number;
  registerStart: number;
  registerEnd: number;
  guaranteedDepositStart: number;
  guaranteedDepositEnd: number;
  fcfsDepositStart: number;
  fcfsDepositEnd: number;
  claimStart: number;
  chainIDs: number[];

  tokenAddress: any;
  usedTokenAddress: any;
  vestingContract: any;
  users: any[];
}
const Launchpads: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ launchpads }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTime: number = Math.floor(Date.now() / 1000);

  const SLIDES = [
    {
      image: "/comingsoon.webp",
      profile: "",
      status: "Coming Soon",
      launchStatus: "INO",
      chainImage: "/chains/skale.svg",
      name: "Coming Soon",
      eventName: "Event Date",
      eventValue: "TBA",
      tokenAllo: "TBA",
      tokenPrice: "TBA",
      slug: "/",
    },
  ];

  const nextGroup = () => {
    if (currentIndex < launchpads.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const prevGroup = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(launchpads.length - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % launchpads.length;
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, launchpads.length]);

  return (
    <>
      <div className="flex flex-col gap-12 pb-24">
        <div className="relative h-full w-full">
          <div
            style={{
              display: "flex",
              transition: "transform 1s",
              transform: `translateX(-${currentIndex * 100}%)`,
            }}>
            {launchpads.map((item: any, index: number) => (
              <div
                key={"ihome_" + index.toString()}
                className="relative z-0 text-white sm:h-[250px] md:h-[500px]"
                style={{
                  flex: "0 0 100%",
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}>
                <Image
                  draggable={false}
                  radius="none"
                  src={item[7][9]}
                  className="w-screen brightness-50 "
                  alt={`Slide ${index + 1}`}
                />
                <div className="absolute sm:bottom-[25%] gap-3 md:bottom-[20%] lg:bottom-[10%] flex flex-col sm:left-[5%] md:left-[5%] lg:left-[10%] z-10">
                  <div
                    className={classNames(
                      "bg-white px-12 text-black flex items-center justify-center sm:px-5 py-1 font-Orbitron text-center max-w-[20%] rounded-md",
                      item[7][13][0] === ""
                        ? "sm:hidden md:hidden"
                        : "sm:hidden md:flex"
                    )}>
                    {item[7][13][0]}
                  </div>
                  <p className=" text-2xl font-Orbitron font-semibold">
                    {item[7][1]}
                  </p>
                  <p className=" sm:hidden md:flex md:w-[50%] xl:w-[40%]">
                    {item[7][6]}
                  </p>
                  <Button
                    as={Link}
                    href={`/launchpads/ino/${item[8][0]}`}
                    radius="sm"
                    size="sm"
                    className="bg-[#a664fe] sm:max-w-[25%] md:py-6 md:max-w-[25%] font-Orbitron text-white sm:text-sm md:text-lg px-16">
                    Explore
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute sm:bottom-[25%] md:bottom-[20%] lg:bottom-[10%] flex gap-2 text-white items-center sm:right-[5%] md:right-[5%] lg:right-[10%] z-10">
            <PrevButton
              onClick={() => prevGroup()}
              className="hover:bg-[#a664fe] hover:border-[#a664fe] rounded-full
              sm:w-9 sm:h-9 md:w-16 md:h-16 
          border border-gray-500 sm:p-2 md:p-4 transition-all duration-300 flex items-center justify-center"></PrevButton>
            <NextButton
              onClick={() => nextGroup()}
              className="hover:bg-[#a664fe] sm:p-2 md:p-4 hover:border-[#a664fe] sm:w-9 sm:h-9 md:w-16 md:h-16 border border-gray-500 rounded-full transition-all duration-300 flex items-center justify-center"></NextButton>
            <div className="text-xl">
              {currentIndex + 1} / {launchpads.length}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12 px-[10%] mt-5">
          <div className="md:text-4xl sm:text-2xl text-white font-semibold">
            <p>UPCOMING PROJECTS</p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 text-white">
            <div className="bg-dark-gray rounded-lg flex flex-col overflow-hidden hover:opacity-75 duration-400 hover:ease-in-out">
              <Image isBlurred radius="none" src={SLIDES[0].image} />
              <div className="flex justify-between items-center relative px-5 pt-14">
                <div className="absolute -top-9 left-5">
                  <Image width={70} radius="sm" src={SLIDES[0].profile} />
                </div>
                <div className="w-full flex gap-4">
                  <div className="bg-[#271e39] text-[#a664fe] font-Orbitron text-sm rounded-lg px-3 flex items-center">
                    {SLIDES[0].launchStatus}
                  </div>
                  <div className="bg-[#212e1c] text-green-550 flex font-Orbitron items-center text-sm rounded-lg px-3 py-1">
                    {SLIDES[0].status}
                  </div>
                </div>
                <div className="w-1/3 flex justify-end">
                  <AvatarGroup>
                    <Avatar
                      size="sm"
                      key={
                        SLIDES[0].chainImage.toString() +
                        SLIDES[0].eventName.toString()
                      }
                      src={SLIDES[0].chainImage}
                    />
                  </AvatarGroup>
                </div>
              </div>
              <div className="px-5 flex flex-col gap-1 pb-5 pt-2">
                <p className=" font-Orbitron font-bold text-2xl pb-2">
                  {SLIDES[0].name}
                </p>
                <div className="flex justify-between font-normal text-sm w-full items-center">
                  <p className="text-[#9d9d9d] ">Event Date</p>
                  <p className="font-semibold ">TBA</p>
                </div>
                <div className="flex justify-between font-normal text-sm w-full items-center">
                  <p className="text-[#9d9d9d] ">Total Sales</p>
                  <p className="font-semibold ">TBA</p>
                </div>
                <div className="flex justify-between font-normal text-sm w-full items-center">
                  <p className="text-[#9d9d9d] ">Token Price</p>
                  <p className="font-semibold">TBA</p>
                </div>
              </div>
            </div>
            {launchpads.map((item: any, index: number) => (
              <a
                href={`/launchpads/ino/${item[7][0]}`}
                key={"upcoming_projects_" + index.toString()}
                className="bg-dark-gray rounded-lg flex flex-col overflow-hidden hover:opacity-75 duration-400 hover:ease-in-out">
                <Image isBlurred radius="none" src={item[7][9]} />
                <div className="flex justify-between items-center relative px-5 pt-14">
                  <div className="absolute -top-9 left-5">
                    <Image width={70} radius="sm" src={item[7][10]} />
                  </div>
                  <div className="w-full flex gap-4">
                    <div className="bg-[#271e39] text-[#a664fe] font-Orbitron text-sm rounded-lg px-3 flex items-center">
                      {item[9] === 0 ? "IGO" : item[10] === 1 ? "INO" : "IDO"}
                    </div>
                    <div className="bg-[#212e1c] text-green-550 flex font-Orbitron items-center text-sm rounded-lg px-3 py-1">
                      {currentTime > item[28] && currentTime < item[29]
                        ? "Live"
                        : currentTime < item[28]
                        ? "Upcoming"
                        : currentTime > item[28]
                        ? "End"
                        : ""}
                    </div>
                  </div>
                  <div className="w-1/3 flex justify-end">
                    <AvatarGroup>
                      {item[30].map((item: any, index: number) => (
                        <Avatar
                          size="sm"
                          key={item.toString() + index.toString()}
                          src={getImageChainImage(item)}
                        />
                      ))}
                    </AvatarGroup>
                  </div>
                </div>
                <div className="px-5 flex flex-col gap-1 pb-5 pt-2">
                  <p className=" font-Orbitron font-bold text-2xl pb-2">
                    {item[7][1]}
                  </p>
                  <div className="flex justify-between font-normal text-sm w-full items-center">
                    <p className="text-[#9d9d9d] ">Event Date</p>
                    <p className="font-semibold ">
                      {formatTimestampGMT(item[22])}
                    </p>
                  </div>
                  <div className="flex justify-between font-normal text-sm w-full items-center">
                    <p className="text-[#9d9d9d] ">Total Sales</p>
                    <p className="font-semibold ">
                      {numberWithCommas(item[16])}
                    </p>
                  </div>
                  <div className="flex justify-between font-normal text-sm w-full items-center">
                    <p className="text-[#9d9d9d] ">Token Price</p>
                    <p className="font-semibold">
                      {item[14] === 0
                        ? "Free"
                        : `${Number(formatEther(item[14])).toFixed(1)} $GMXP`}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Launchpads;
