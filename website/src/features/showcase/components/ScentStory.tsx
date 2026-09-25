"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScentStage = {
  productImage: string;
  headline: string;
  subtext: string;
  textPosition: string;
  alt: string;
  action?: boolean;
};

const stages: ScentStage[] = [
  {
    productImage:
      "/images/products/showcase/bottle-still-removebg-preview.png",
    headline: "ODORATUS",
    subtext: "A signature scent, quietly bold.",
    textPosition: "items-start justify-center pt-20 text-center",
    alt: "Odoratus fragrance bottle",
  },
  {
    productImage:
      "/images/products/showcase/bottle-motion-removebg-preview.png",
    headline: "Unveiled.",
    subtext:
      "Composed with patience, precision, and an instinct for the exceptional.",
    textPosition: "items-end justify-end pb-28 pl-28",
    alt: "Odoratus fragrance bottle in motion",
  },
  {
    productImage:
      "/images/products/showcase/bottle-spray-wide-removebg-preview.png",
    headline: "One spray.",
    subtext:
      "It opens in light, then settles into warmth, depth, and quiet intrigue.",
    textPosition: "items-start justify-start pt-28 pl-28",
    alt: "Odoratus fragrance being sprayed",
  },
  {
    productImage:
      "/images/products/showcase/bottle-spray-close-removebg-preview.png",
    headline: "Lingers.",
    subtext:
      "A final note that stays close. Discover the signature scent.",
    textPosition: "items-end justify-end pb-28 pl-28",
    alt: "Close view of Odoratus fragrance spray",
    action: true,
  },
];

export function ScentStory() {
  const storyRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const stageElements = stageRefs.current.filter(
        (stage): stage is HTMLDivElement => stage !== null,
      );
      const visualElements = visualRefs.current.filter(
        (visual): visual is HTMLDivElement => visual !== null,
      );
      const imageElements = imageRefs.current.filter(
        (image): image is HTMLImageElement => image !== null,
      );
      const textElements = textRefs.current.filter(
        (text): text is HTMLDivElement => text !== null,
      );

      gsap.set(stageElements, { autoAlpha: 0 });
      gsap.set(textElements, { autoAlpha: 0, y: 28 });
      gsap.set(stageElements[0], { autoAlpha: 1 });
      gsap.set(visualElements[0], {
        rotation: 0,
        scale: 0.85,
        y: 0,
      });
      gsap.set(textElements[0], { autoAlpha: 0, y: 28 });

      gsap.fromTo(
        visualElements[0],
        {
          autoAlpha: 0,
          x: -150,
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
        },
      );

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4,
          pin: ".scent-story-stage",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const stageDuration = 2;
      const crossfadeDuration = 0.9;

      stageElements.forEach((stage, index) => {
        const stageStart = index * (stageDuration - crossfadeDuration);
        const visual = visualElements[index];
        const productImage = imageElements[index];
        const text = textElements[index];

        timeline.to(
          productImage,
          {
            scale: 1.06,
            xPercent: index % 2 === 0 ? 1.5 : -1.5,
            yPercent: index === 0 ? 1.5 : -1.5,
            duration: stageDuration,
          },
          stageStart,
        );

        if (index === 0) {
          timeline.to(
            visual,
            {
              scale: 1,
              y: 0,
              duration: stageDuration * 0.6,
            },
            stageStart,
          );
        } else {
          gsap.set(visual, {
            rotation: index % 2 === 0 ? -1.5 : 1.5,
            scale: 0.96,
          });
          timeline.to(
            visual,
            {
              rotation: 0,
              scale: 1,
              duration: stageDuration * 0.6,
            },
            stageStart,
          );
        }

        timeline.to(
          text,
          {
            autoAlpha: 1,
            y: 0,
            duration: stageDuration * 0.4,
          },
          stageStart + stageDuration * 0.6,
        );

        if (index > 0) {
          const previousStageStart =
            (index - 1) * (stageDuration - crossfadeDuration);
          timeline.to(
            stageElements[index - 1],
            {
              autoAlpha: 0,
              duration: crossfadeDuration,
            },
            stageStart,
          );
          timeline.to(
            stage,
            {
              autoAlpha: 1,
              duration: crossfadeDuration,
            },
            stageStart,
          );
          timeline.to(
            textElements[index - 1],
            {
              autoAlpha: 0,
              y: -20,
              duration: crossfadeDuration,
            },
            stageStart + stageDuration * 0.6 + stageDuration * 0.4,
          );
          timeline.set(
            stageElements[index - 1],
            { autoAlpha: 0 },
            previousStageStart + stageDuration,
          );
        }
      });
    }, storyRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={storyRef}
      className="relative h-[600vh] min-h-screen w-full overflow-x-hidden bg-[#faf8f5] text-[#1a1a1a]"
      aria-label="The Odoratus scent story"
    >
      <div className="scent-story-stage relative min-h-screen h-screen w-full overflow-hidden bg-[#faf8f5]">
        {stages.map((stage, index) => (
          <div
            key={stage.headline}
            ref={(element) => {
              stageRefs.current[index] = element;
            }}
            className="absolute inset-0 h-full w-full"
          >
            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(180deg, #faf8f5 0%, #f4f0eb 50%, #ebe6de 100%)",
              }}
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div
                ref={(element) => {
                  visualRefs.current[index] = element;
                }}
                className="relative h-[82vh] w-full max-w-4xl origin-center"
              >
                <Image
                  ref={(element) => {
                    imageRefs.current[index] = element;
                  }}
                  src={stage.productImage}
                  alt={stage.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 56rem, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
            <div
              className={`absolute inset-0 z-30 flex ${stage.textPosition} p-16`}
            >
              <div
                ref={(element) => {
                  textRefs.current[index] = element;
                }}
                dir="ltr"
                className="pointer-events-none max-w-[34rem] bg-[radial-gradient(ellipse_at_center,rgba(250,248,245,0.94)_0%,rgba(250,248,245,0.68)_48%,rgba(250,248,245,0)_78%)] px-12 py-10 [direction:ltr]"
              >
                <h1
                  dir="ltr"
                  className="text-left font-[family-name:var(--font-instrument-serif)] text-[clamp(5rem,10vw,10rem)] leading-[0.86] tracking-[-0.03em] text-[#1a1a1a] [direction:ltr]"
                >
                  {stage.headline}
                </h1>
                <p
                  dir="ltr"
                  className="mt-6 max-w-[28rem] text-left font-[family-name:var(--font-manrope)] text-[18px] leading-[1.5] font-normal text-[#605a54] [direction:ltr]"
                >
                  {stage.subtext}
                </p>
                {stage.action ? (
                  <Link
                    href="/products"
                    className="pointer-events-auto mt-8 inline-flex bg-[#1a1a1a] px-7 py-4 font-[family-name:var(--font-manrope)] text-[12px] font-bold tracking-[0.12em] text-[#faf8f5] uppercase transition-colors hover:bg-[#c5a880]"
                  >
                    Shop Odoratus
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
