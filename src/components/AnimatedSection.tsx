import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade" | "slide" | "scale" | "rotate";
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  animation = "fade",
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const animations: Record<string, gsap.TweenVars> = {
      fade: {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      },
      slide: {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      },
      scale: {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.2)",
      },
      rotate: {
        opacity: 0,
        rotation: -5,
        duration: 0.8,
        ease: "power3.out",
      },
    };

    gsap.from(sectionRef.current, {
      ...animations[animation],
      delay,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, [delay, animation]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
