
import { Store } from "@/types/store";

export const stores: Store[] = [
  {
    id: "1",
    name: "Harmony Ceramics",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=2070&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576020799627-aeac74d58064?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525974160448-038dacadcc71?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Ceramics & Pottery",
    url: "#",
    creator: {
      name: "Emma Chen",
      title: "Ceramic Artist",
      quote: "Carte makes it so easy to showcase my handcrafted pieces beautifully. Sales increased 45% in the first month!",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format"
    },
    rating: 4.9,
    featured: true
  },
  {
    id: "2",
    name: "Woodland Wonders",
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?q=80&w=2070&auto=format&fit=crop",
    category: "Handcrafted Wood Art",
    url: "#",
    creator: {
      name: "Marcus Taylor",
      title: "Woodworking Artist",
      quote: "The customizable storefront perfectly captures the essence of my brand. My customers love the shopping experience.",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format"
    },
    rating: 4.8
  },
  {
    id: "3",
    name: "Whisper & Lace",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop",
    category: "Sustainable Fashion",
    url: "#",
    creator: {
      name: "Sofia Martinez",
      title: "Ethical Fashion Designer",
      quote: "Zero transaction fees meant I could lower my prices while maintaining quality. My customer base has tripled!",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format"
    },
    rating: 4.7
  },
  {
    id: "4",
    name: "Botanical Bliss",
    image: "https://images.unsplash.com/photo-1509223197845-458d87318791?q=80&w=2069&auto=format&fit=crop",
    category: "Artisanal Candles & Soaps",
    url: "#",
    creator: {
      name: "Olivia Johnson",
      title: "Botanical Artist",
      quote: "The analytics tools help me understand what's selling best. I've been able to focus my production more effectively.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format"
    },
    rating: 4.9
  },
  {
    id: "5",
    name: "Pixel Perfect",
    image: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?q=80&w=2127&auto=format&fit=crop",
    category: "Digital Art Prints",
    url: "#",
    creator: {
      name: "Jason Kim",
      title: "Digital Artist",
      quote: "Managing digital product delivery used to be a nightmare. Carte has simplified everything about my business.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format"
    },
    rating: 4.8
  }
];
