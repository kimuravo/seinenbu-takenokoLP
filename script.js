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

const chatbot = document.querySelector(".chatbot");
const chatbotLauncher = document.querySelector(".chatbot__launcher");
const chatbotPanel = document.querySelector(".chatbot__panel");
const chatbotClose = document.querySelector(".chatbot__close");
const chatbotMessages = document.querySelector(".chatbot__messages");
const chatbotForm = document.querySelector(".chatbot__form");
const chatbotInput = chatbotForm?.querySelector("input");

const chatbotAnswers = [
  {
    keys: ["食べ", "レシピ", "おすすめ", "料理"],
    answer: "おすすめは、しっかり冷やした「冷やしたけのこ」です。木の芽味噌、塩、オリーブオイルで、香りと甘みをそのまま楽しめます。",
  },
  {
    keys: ["買", "販売", "場所", "どこ", "アクセス"],
    answer: "道の駅や山城地域の直売所で販売しています。時期や在庫は変わるため、SNSでの確認がおすすめです。",
  },
  {
    keys: ["保存", "日持ち", "保管"],
    answer: "下ゆでした後、水に浸して冷蔵保存してください。水は毎日替え、できれば2〜3日以内に食べるのがおすすめです。",
  },
  {
    keys: ["えぐみ", "下処理", "あく", "アク"],
    answer: "えぐみを抑えるには、鮮度が大切です。購入後は早めに下ゆでし、冷ましてから水に浸して保存してください。",
  },
];

function pushChatbotEvent(event, label = "") {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    event_category: "lp_chatbot",
    event_label: label,
  });
}

function addChatMessage(text, type) {
  if (!chatbotMessages) return;
  const message = document.createElement("div");
  message.className = `chatbot__message chatbot__message--${type}`;
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getChatbotAnswer(text) {
  const matched = chatbotAnswers.find((item) => item.keys.some((key) => text.includes(key)));
  if (matched) return matched.answer;
  return "ありがとうございます。たけのこの食べ方・販売場所・保存方法について案内できます。詳しい在庫や販売日はSNSでの確認がおすすめです。";
}

function openChatbot() {
  if (!chatbot || !chatbotPanel || !chatbotLauncher) return;
  chatbot.classList.add("is-open");
  chatbotPanel.hidden = false;
  chatbotLauncher.setAttribute("aria-expanded", "true");
  chatbotInput?.focus();
  pushChatbotEvent("open_chatbot", "launcher");
}

function closeChatbot() {
  if (!chatbot || !chatbotPanel || !chatbotLauncher) return;
  chatbot.classList.remove("is-open");
  chatbotPanel.hidden = true;
  chatbotLauncher.setAttribute("aria-expanded", "false");
}

chatbotLauncher?.addEventListener("click", openChatbot);
chatbotClose?.addEventListener("click", closeChatbot);

document.querySelectorAll("[data-chat-question]").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.chatQuestion || "";
    addChatMessage(question, "user");
    addChatMessage(getChatbotAnswer(question), "bot");
    pushChatbotEvent("chatbot_quick_question", question);
  });
});

chatbotForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = chatbotInput?.value.trim() || "";
  if (!text) return;
  addChatMessage(text, "user");
  chatbotInput.value = "";
  addChatMessage(getChatbotAnswer(text), "bot");
  pushChatbotEvent("chatbot_submit_question", text.slice(0, 60));
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
