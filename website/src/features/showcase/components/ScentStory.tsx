"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScentStage = {
  productImage: string;
  headlineKey: "headline1" | "headline2" | "headline3" | "headline4";
  subtextKey: "subtext1" | "subtext2" | "subtext3" | "subtext4";
  textPosition: string;
  altKey: "alt1" | "alt2" | "alt3" | "alt4";
  action?: boolean;
};

const stages: ScentStage[] = [
  {
    productImage:
      "/images/products/showcase/bottle-still-removebg-preview.png",
    headlineKey: "headline1",
    subtextKey: "subtext1",
    textPosition: "items-start justify-center pt-20 text-center",
    altKey: "alt1",
  },
  {
    productImage:
      "/images/products/showcase/bottle-motion-removebg-preview.png",
    headlineKey: "headline2",
    subtextKey: "subtext2",
    textPosition: "items-end justify-end pb-28 pl-28",
    altKey: "alt2",
  },
  {
    productImage:
      "/images/products/showcase/bottle-spray-wide-removebg-preview.png",
    headlineKey: "headline3",
    subtextKey: "subtext3",
    textPosition: "items-start justify-start pt-28 pl-28",
    altKey: "alt3",
  },
  {
    productImage:
      "/images/products/showcase/bottle-spray-close-removebg-preview.png",
    headlineKey: "headline4",
    subtextKey: "subtext4",
    textPosition: "items-end justify-end pb-28 pl-28",
    altKey: "alt4",
    action: true,
  },
];

export function ScentStory() {
  const t = useTranslations("scentStory");
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
      className="relative h-[600vh] min-h-screen w-full overflow-x-clip bg-[#faf8f5] text-[#1a1a1a]"
      aria-label={t("ariaLabel")}
    >
      <div className="scent-story-stage relative min-h-screen h-screen w-full overflow-hidden bg-[#faf8f5]">
        {stages.map((stage, index) => (
          <div
            key={stage.headlineKey}
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
                  alt={t(stage.altKey)}
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
                  {t(stage.headlineKey)}
                </h1>
                <p
                  dir="ltr"
                  className="mt-6 max-w-[28rem] text-left font-[family-name:var(--font-manrope)] text-[calc(18px*var(--fs-scale))] leading-[1.5] font-normal text-[#605a54] [direction:ltr]"
                >
                  {t(stage.subtextKey)}
                </p>
                {stage.action ? (
                  <Link
                    href="/products"
                    className="pointer-events-auto mt-8 inline-flex bg-[#1a1a1a] px-7 py-4 font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.12em] text-[#faf8f5] uppercase transition-colors hover:bg-[#c5a880]"
                  >
                    {t("shopButton")}
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
