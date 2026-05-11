"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <div>
      <div className="relative rounded-xl overflow-hidden mb-3">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {images.map((src, i) => (
              <CarouselItem key={i}>
                <div className="relative aspect-[16/10]">
                  <Image
                    src={src}
                    alt={`${productName} — фото ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 bg-paper/80 hover:bg-paper border-border-soft" />
          <CarouselNext className="right-3 top-1/2 -translate-y-1/2 bg-paper/80 hover:bg-paper border-border-soft" />
        </Carousel>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
              current === i
                ? "border-accent opacity-100"
                : "border-transparent opacity-60 hover:opacity-90"
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
