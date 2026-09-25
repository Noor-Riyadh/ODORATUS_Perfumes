export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "shipping-delivery",
    question: "How long does shipping and delivery take?",
    answer:
      "Orders are usually prepared within 1–2 business days. Delivery typically takes 2–5 business days after dispatch, depending on your location. We will share tracking details as soon as your order leaves our atelier.",
  },
  {
    id: "whatsapp-order",
    question: "How can I place an order through WhatsApp?",
    answer:
      "Send us a message on WhatsApp with the fragrance name, size, quantity, and delivery details you would like. Our team will confirm availability, the final total, and the best payment and delivery option for your order.",
  },
  {
    id: "returns-exchanges",
    question: "What is your return or exchange policy?",
    answer:
      "Because fragrance is a personal product, we can accept returns or exchanges on unopened, unused bottles within 14 days of delivery. Please contact our team before sending anything back so we can guide you through the process.",
  },
  {
    id: "choose-fragrance",
    question: "How do I choose the right fragrance?",
    answer:
      "Start with the scent family and notes that appeal to you, then consider when you want to wear it. If you are unsure, message us for an olfactory consultation and we can recommend a fragrance based on your preferences and occasion.",
  },
  {
    id: "gift-wrapping",
    question: "Do you offer gift wrapping?",
    answer:
      "Yes. Complimentary signature gift wrapping is available on orders above $150. Each wrapped bottle is presented in our linen paper box with a custom wax seal, ready to give.",
  },
  {
    id: "authenticity",
    question: "How do I know your fragrances are authentic?",
    answer:
      "Every Odoratus fragrance is sourced, blended, and bottled through our atelier process. Products purchased through our website or official WhatsApp ordering channel are genuine and supplied directly by Odoratus.",
  },
  {
    id: "payment-methods",
    question: "Which payment methods do you accept?",
    answer:
      "We accept major cards including Visa, Mastercard, and American Express through our secured checkout. For WhatsApp orders, our team will confirm the available payment options before completing your order.",
  },
  {
    id: "fragrance-longevity",
    question: "How long does a fragrance last on the skin?",
    answer:
      "Longevity depends on the fragrance, your skin, the weather, and where it is applied. Most compositions last between 6 and 10 hours, while a soft trace may remain on clothing even longer.",
  },
  {
    id: "samples",
    question: "Can I sample a fragrance before buying a full bottle?",
    answer:
      "Our team can help you choose a discovery option when one is available. You can also contact us through WhatsApp for guidance on notes, intensity, and the closest match to a fragrance you already enjoy.",
  },
];
