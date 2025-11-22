"use client";

import Image from "next/image";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";

type ShowcaseCarouselProps = {
    images: string | string[];
}

export function ShowcaseCarousel({images}: ShowcaseCarouselProps) {
    const imageList = Array.isArray(images) ? images : [images];
    const [current, setCurrent] = useState(0);

    const prevImage = () => setCurrent((current - 1 + images.length) % images.length);
    const nextImage = () => setCurrent((current + 1) % images.length);

    useEffect(() => {
    if (imageList.length > 1) {
        const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % imageList.length);
        }, 4000);

        return () => clearInterval(interval);
    }
    }, [imageList]); 

  return (
    <div className="w-full bg-gray-100 relative h-205 md:h-170 z-0">
        {imageList.map((img, index) => (
          <Image
            key={img}
            src={img}
            fill
            alt="Showcase Carousel"
            className={`brightness-75 object-cover top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          />
        ))}

        {imageList.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10">
                <Button className="absolute left-4 rounded-full" variant="outline"size="icon" onClick={prevImage}>
                    <ArrowLeft />
                </Button>

                <Button className="absolute right-4 rounded-full" variant="outline" size="icon"onClick={nextImage}>
                    <ArrowRight />
                </Button>
            </div>
        )}
      </div>
  );
}