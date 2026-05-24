const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-gtm-event]").forEach((element) => {
  element.addEventListener("click", () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: element.dataset.gtmEvent,
      event_category: "lp_cta",
      event_label: element.dataset.gtmLabel || "",
      link_url: element.href || "",
      link_text: element.textContent.trim(),
    });
  });
});

if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
  document.body.classList.add("is-animating");
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: "power2.out",
    duration: 1.2,
  });

  const heroTl = gsap.timeline();

  heroTl
    .from(".hero__image", {
      scale: 1.08,
      filter: "brightness(0.82) saturate(0.86)",
      duration: 2.4,
      ease: "power2.out",
    })
    .from(".hero__area", { autoAlpha: 0, y: 18, duration: 0.9 }, "-=1.55")
    .from(".hero h1", { autoAlpha: 0, y: 34, filter: "blur(8px)", duration: 1.35 }, "-=0.5")
    .from(".hero__lead", { autoAlpha: 0, y: 24, duration: 1 }, "-=0.65")
    .from(".hero__notice", { autoAlpha: 0, y: 16, duration: 0.85 }, "-=0.45")
    .from(".hero__actions .button", {
      autoAlpha: 0,
      y: 18,
      stagger: 0.14,
      duration: 0.85,
    }, "-=0.25")
    .from(".brand-panel", {
      autoAlpha: 0,
      x: 32,
      filter: "blur(6px)",
      duration: 1.25,
    }, "-=1.1");

  gsap.to(".hero__image", {
    yPercent: 6,
    scale: 1.04,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(".brand-panel", {
    y: 70,
    autoAlpha: 0.72,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
    },
  });

  gsap.utils.toArray(".section, .season, .footer").forEach((section) => {
    gsap.from(section, {
      autoAlpha: 0,
      y: 42,
      duration: 1.15,
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.from(".intro__text > *", {
    autoAlpha: 0,
    y: 24,
    stagger: 0.1,
    duration: 0.95,
    scrollTrigger: {
      trigger: ".intro",
      start: "top 70%",
    },
  });

  gsap.from(".intro__photo", {
    autoAlpha: 0,
    y: 36,
    scale: 0.96,
    duration: 1.25,
    scrollTrigger: {
      trigger: ".intro",
      start: "top 68%",
    },
  });

  gsap.from(".feature-rings div", {
    autoAlpha: 0,
    y: 22,
    scale: 0.92,
    stagger: 0.12,
    duration: 0.9,
    scrollTrigger: {
      trigger: ".feature-rings",
      start: "top 82%",
    },
  });

  gsap.from(".story-card", {
    autoAlpha: 0,
    y: 46,
    stagger: 0.16,
    duration: 1,
    scrollTrigger: {
      trigger: ".cards",
      start: "top 74%",
    },
  });

  gsap.utils.toArray(".story-card img").forEach((image) => {
    gsap.to(image, {
      scale: 1.12,
      yPercent: -4,
      ease: "none",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1,
      },
    });
  });

  gsap.from(".season__copy > *", {
    autoAlpha: 0,
    y: 26,
    stagger: 0.12,
    duration: 0.95,
    scrollTrigger: {
      trigger: ".season",
      start: "top 68%",
    },
  });

  gsap.to(".season__image", {
    scale: 1.08,
    xPercent: -2,
    ease: "none",
    scrollTrigger: {
      trigger: ".season",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.from(".buy__text > *, .access > *", {
    autoAlpha: 0,
    y: 24,
    stagger: 0.08,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".buy",
      start: "top 74%",
    },
  });

  gsap.from(".buy__photo", {
    autoAlpha: 0,
    y: 34,
    scale: 0.96,
    duration: 1.1,
    scrollTrigger: {
      trigger: ".buy",
      start: "top 70%",
    },
  });

  gsap.to(".access__map span", {
    rotate: 2,
    scale: 1.035,
    yoyo: true,
    repeat: -1,
    duration: 5.5,
    ease: "sine.inOut",
  });

  gsap.from(".footer__image", {
    xPercent: -8,
    scale: 1.06,
    autoAlpha: 0,
    duration: 1.25,
    scrollTrigger: {
      trigger: ".footer",
      start: "top 86%",
    },
  });

  gsap.from(".footer__content > *", {
    autoAlpha: 0,
    y: 24,
    stagger: 0.12,
    duration: 0.9,
    scrollTrigger: {
      trigger: ".footer",
      start: "top 82%",
    },
  });

  gsap.utils.toArray(".button--primary").forEach((button) => {
    gsap.to(button, {
      boxShadow: "0 14px 26px rgba(55, 91, 41, 0.18)",
      yoyo: true,
      repeat: -1,
      duration: 4.2,
      ease: "sine.inOut",
    });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}
