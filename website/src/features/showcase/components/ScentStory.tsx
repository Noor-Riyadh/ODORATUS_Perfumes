"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLayoutEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScentStage = {
  productImage: string;
  headlineKey: "headline1" | "headline2" | "headline3" | "headline4";
  subtextKey: "subtext1" | "subtext2" | "subtext3" | "subtext4";
  // Desktop-only (xl:) positioning classes, written out in full so
  // Tailwind's static scanner can see and generate them — never build
  // "xl:" + className via string concatenation, it won't be detected.
  // Kept at xl: (1280px) rather than md:/lg: because the side-by-side
  // overlay needs real room beside the bottle image; below 1280px
  // (tablet and small-laptop widths, ~768-1024px) there isn't enough
  // horizontal space for the corner-positioned text to clear the image
  // without overlapping it, so those widths keep the mobile-stacked
  // layout instead.
  desktopPosition: string;
  altKey: "alt1" | "alt2" | "alt3" | "alt4";
  action?: boolean;
};

// Shared mobile position for every stage: a clear band below the
// (shrunk, top-aligned) image, since below xl the bottle spans the
// full viewport width and any per-stage corner position would overlap it.
const MOBILE_TEXT_POSITION = "items-end justify-center text-center pb-10";

// The last stage's desktop position, mirrored for Arabic (RTL): swaps
// justify-end/pl-28 for justify-start/pr-28. Written literally (not via
// .replace on the LTR string) for the same static-scanning reason above.
// items-center centers this container on the same point as the image's
// container, but bottle-spray-close-removebg-preview.png has ~30% empty
// space above the nozzle and no empty space below (content runs flush to
// the bottom edge), so the bottle's VISIBLE center sits ~12vh below the
// box's geometric center at this stage's xl:h-[82vh] image height
// (measured directly from the PNG's alpha channel: content spans
// y=172-577 of 578px, vs the canvas's geometric center at y=289).
// translate-y-[12vh] corrects for that so the text aligns with where the
// bottle actually appears, not just the container midpoint. Applied here
// (the non-animated wrapper), not on the inner text ref div, since GSAP
// sets that div's own transform/y on every scroll tick and would silently
// override a translate class placed there.
const LAST_STAGE_DESKTOP_POSITION_RTL =
  "xl:items-center xl:justify-start xl:pr-28 xl:translate-y-[12vh]";

const stages: ScentStage[] = [
  {
    productImage:
      "/images/products/showcase/bottle-still-removebg-preview.png",
    headlineKey: "headline1",
    subtextKey: "subtext1",
    desktopPosition: "xl:items-start xl:justify-center xl:pt-20 xl:text-center",
    altKey: "alt1",
  },
  {
    productImage:
      "/images/products/showcase/bottle-motion-removebg-preview.png",
    headlineKey: "headline2",
    subtextKey: "subtext2",
    desktopPosition: "xl:items-end xl:justify-end xl:pb-28 xl:pl-28",
    altKey: "alt2",
  },
  {
    productImage:
      "/images/products/showcase/bottle-spray-wide-removebg-preview.png",
    headlineKey: "headline3",
    subtextKey: "subtext3",
    desktopPosition: "xl:items-start xl:justify-start xl:pt-28 xl:pl-28",
    altKey: "alt3",
  },
  {
    productImage:
      "/images/products/showcase/bottle-spray-close-removebg-preview.png",
    headlineKey: "headline4",
    subtextKey: "subtext4",
    // items-center matches the image container's own centering, plus a
    // measured +12vh correction — see LAST_STAGE_DESKTOP_POSITION_RTL above
    // for why: this stage's bottle image has empty space at the top and
    // none at the bottom, so its visible center sits below the box's
    // geometric center.
    desktopPosition: "xl:items-center xl:justify-end xl:pl-28 xl:translate-y-[12vh]",
    altKey: "alt4",
    action: true,
  },
];

export function ScentStory() {
  const t = useTranslations("scentStory");
  const locale = useLocale();
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
        {stages.map((stage, index) => {
          const isLastStage = index === stages.length - 1;
          const rtlText = locale === "ar" && isLastStage;
          const desktopPositionClasses = rtlText
            ? LAST_STAGE_DESKTOP_POSITION_RTL
            : stage.desktopPosition;
          const textPosition = `${MOBILE_TEXT_POSITION} ${desktopPositionClasses}`;
          const textDir = rtlText ? "rtl" : "ltr";
          const textAlign = rtlText
            ? "text-center xl:text-right"
            : "text-center xl:text-left";
          const directionClass = rtlText ? "[direction:rtl]" : "[direction:ltr]";

          return (
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
            <div className="absolute inset-0 z-20 flex items-start justify-center pt-10 xl:items-center xl:pt-0">
              <div
                ref={(element) => {
                  visualRefs.current[index] = element;
                }}
                className="relative h-[46vh] w-full max-w-4xl origin-center xl:h-[82vh]"
              >
                <Image
                  ref={(element) => {
                    imageRefs.current[index] = element;
                  }}
                  src={stage.productImage}
                  alt={t(stage.altKey)}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1280px) 56rem, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
            <div
              className={`absolute inset-0 z-30 flex ${textPosition} p-6 xl:p-16`}
            >
              <div
                ref={(element) => {
                  textRefs.current[index] = element;
                }}
                dir={textDir}
                className={`pointer-events-none max-w-[26rem] xl:max-w-[34rem] ${textAlign} bg-[radial-gradient(ellipse_at_center,rgba(250,248,245,0.94)_0%,rgba(250,248,245,0.68)_48%,rgba(250,248,245,0)_78%)] px-6 py-6 xl:px-12 xl:py-10 ${directionClass}`}
              >
                <h1
                  dir={textDir}
                  className={`${textAlign} font-[family-name:var(--font-instrument-serif)] text-[clamp(3rem,10vw,10rem)] leading-[0.86] tracking-[-0.03em] text-[#1a1a1a] ${directionClass}`}
                >
                  {t(stage.headlineKey)}
                </h1>
                <p
                  dir={textDir}
                  className={`mt-4 max-w-[28rem] ${textAlign} font-[family-name:var(--font-manrope)] text-[calc(16px*var(--fs-scale))] leading-[1.5] font-normal text-[#605a54] xl:mt-6 xl:text-[calc(18px*var(--fs-scale))] ${directionClass}`}
                >
                  {t(stage.subtextKey)}
                </p>
                {stage.action ? (
                  <Link
                    href="/products"
                    className="pointer-events-auto mt-6 inline-flex bg-[#1a1a1a] px-6 py-3 font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.12em] text-[#faf8f5] uppercase transition-colors hover:bg-[#c5a880] xl:mt-8 xl:px-7 xl:py-4"
                  >
                    {t("shopButton")}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
}
