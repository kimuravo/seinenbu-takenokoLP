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
    ease: "power3.out",
    duration: 1.05,
  });

  const heroTl = gsap.timeline();

  heroTl
    .from(".hero__image", {
      scale: 1.22,
      rotate: 1.5,
      filter: "brightness(0.72) saturate(0.7)",
      duration: 2.1,
      ease: "expo.out",
    })
    .from(".hero__area", { autoAlpha: 0, y: 28, duration: 0.7 }, "-=1.35")
    .from(".hero h1", { autoAlpha: 0, y: 76, skewY: 4, duration: 1.25, ease: "back.out(1.4)" }, "-=0.45")
    .from(".hero__lead", { autoAlpha: 0, y: 34, duration: 0.8 }, "-=0.55")
    .from(".hero__notice", { autoAlpha: 0, scaleX: 0.72, transformOrigin: "left center", duration: 0.65 }, "-=0.35")
    .from(".hero__actions .button", {
      autoAlpha: 0,
      y: 36,
      scale: 0.78,
      stagger: 0.12,
      ease: "back.out(2.1)",
    }, "-=0.25")
    .from(".brand-panel", {
      autoAlpha: 0,
      x: 80,
      rotate: 7,
      scale: 0.76,
      duration: 1.05,
      ease: "elastic.out(1, 0.65)",
    }, "-=1.1");

  gsap.to(".hero__image", {
    yPercent: 10,
    scale: 1.08,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(".brand-panel", {
    y: 120,
    rotate: -3,
    autoAlpha: 0.55,
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
      y: 86,
      scale: 0.97,
      duration: 1.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.from(".intro__text > *", {
    autoAlpha: 0,
    x: -56,
    stagger: 0.11,
    duration: 0.9,
    scrollTrigger: {
      trigger: ".intro",
      start: "top 70%",
    },
  });

  gsap.from(".intro__photo", {
    autoAlpha: 0,
    x: 120,
    rotate: 8,
    scale: 0.72,
    duration: 1.35,
    ease: "elastic.out(1, 0.7)",
    scrollTrigger: {
      trigger: ".intro",
      start: "top 68%",
    },
  });

  gsap.from(".feature-rings div", {
    autoAlpha: 0,
    y: 45,
    rotate: -18,
    scale: 0.2,
    stagger: 0.14,
    duration: 1,
    ease: "back.out(2.8)",
    scrollTrigger: {
      trigger: ".feature-rings",
      start: "top 82%",
    },
  });

  gsap.from(".story-card", {
    autoAlpha: 0,
    y: 110,
    rotateX: 24,
    rotateZ: -2,
    scale: 0.84,
    stagger: 0.16,
    duration: 1.08,
    ease: "back.out(1.65)",
    scrollTrigger: {
      trigger: ".cards",
      start: "top 74%",
    },
  });

  gsap.utils.toArray(".story-card img").forEach((image) => {
    gsap.to(image, {
      scale: 1.12,
      yPercent: -7,
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
    x: -80,
    stagger: 0.12,
    duration: 0.95,
    scrollTrigger: {
      trigger: ".season",
      start: "top 68%",
    },
  });

  gsap.to(".season__image", {
    scale: 1.18,
    xPercent: -5,
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
    y: 42,
    stagger: 0.08,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".buy",
      start: "top 74%",
    },
  });

  gsap.from(".buy__photo", {
    autoAlpha: 0,
    scale: 0.78,
    rotate: -5,
    duration: 1.15,
    ease: "elastic.out(1, 0.75)",
    scrollTrigger: {
      trigger: ".buy",
      start: "top 70%",
    },
  });

  gsap.to(".access__map span", {
    rotate: 10,
    scale: 1.12,
    yoyo: true,
    repeat: -1,
    duration: 2.8,
    ease: "sine.inOut",
  });

  gsap.from(".footer__image", {
    xPercent: -34,
    scale: 1.25,
    autoAlpha: 0,
    duration: 1.1,
    scrollTrigger: {
      trigger: ".footer",
      start: "top 86%",
    },
  });

  gsap.from(".footer__content > *", {
    autoAlpha: 0,
    x: 64,
    stagger: 0.12,
    duration: 0.9,
    scrollTrigger: {
      trigger: ".footer",
      start: "top 82%",
    },
  });

  gsap.to(".button--primary", {
    scale: 1.045,
    boxShadow: "0 18px 34px rgba(55, 91, 41, 0.28)",
    yoyo: true,
    repeat: -1,
    duration: 1.25,
    ease: "sine.inOut",
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}
