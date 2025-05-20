"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.png"
          fill
          alt="Dashboard Preview"
          // className="object-cover brightness-[0.9]"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto text-center relative z-10 px-4">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 text-white">
          Manage Your Finances <br /> with AI
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="#">
            <Button size="lg" variant="outline" className="px-8 bg-transparent text-white border-white hover:bg-white hover:text-black">
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
