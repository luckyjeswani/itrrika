import QawhwaElixirImg from "@assets/1782585341570_1782589991487.png";
import WildEssenceImg from "@assets/1782585649181_1782589991488.png";
import ZenithBlueImg from "@assets/1782585913806_1782589991489.png";
import RoyalBlueImg from "@assets/1782585919968_1782589991489.png";
import UltraPulseImg from "@assets/1782585976567_1782589991490.png";
import BlossomMuseImg from "@assets/1782586049341_1782589991490.png";
import PinkNectarImg from "@assets/1782586364069_1782589991491.png";
import TobaccoElixirImg from "@assets/1782586440373_1782589991491.png";
import RedVelvetImg from "@assets/1782586588717_1782589991492.png";

export interface Perfume {
  id: string;
  name: string;
  image: string;
  category: string;
  size: string;
  price: string;
  description: string;
  inspiration: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
}

export const perfumes: Perfume[] = [
  {
    id: "qawhwa-elixir",
    name: "Qawhwa Elixir",
    image: QawhwaElixirImg,
    category: "Parfum · Unisex",
    size: "15ml",
    price: "₹299",
    inspiration: "Inspired by Khamrah Qahwa",
    description: "A rich, intoxicating journey into the heart of an Arabian coffee house. Qawhwa Elixir opens with the dark warmth of roasted coffee entwined with aromatic cardamom, deepening into a luxurious core of oud and amber before settling into a velvet base of sandalwood and musk. Opulent, warm, and utterly unforgettable.",
    topNotes: ["Roasted Coffee", "Cardamom", "Saffron"],
    middleNotes: ["Oud", "Amber", "Rose"],
    baseNotes: ["Sandalwood", "Vanilla", "White Musk"]
  },
  {
    id: "zenith-blue",
    name: "Zenith Blue",
    image: ZenithBlueImg,
    category: "Parfum · Unisex",
    size: "15ml",
    price: "₹299",
    inspiration: "Inspired by YSL Y",
    description: "Zenith Blue is the scent of ambition — a crisp, electrifying burst of bergamot and ginger that clears the mind and awakens the senses. A fresh aromatic heart of sage and geranium evolves into a powerful woody drydown of amberwood and cedar. Sophisticated, dynamic, and made for those who rise above.",
    topNotes: ["Bergamot", "Ginger", "Apple"],
    middleNotes: ["Sage", "Geranium", "Juniper Berry"],
    baseNotes: ["Amberwood", "Cedar", "Vetiver"]
  },
  {
    id: "tobacco-elixir",
    name: "Tobacco Elixir",
    image: TobaccoElixirImg,
    category: "Parfum · Unisex",
    size: "15ml",
    price: "₹299",
    inspiration: "Inspired by Tom Ford Tobacco Vanille",
    description: "A decadent embrace of golden tobacco leaf and warm vanilla that wraps around you like candlelight in a private library. Tobacco Elixir is sensual, rich, and endlessly complex — spiced cocoa and tonka bean melt into a base of dried fruits and amber, leaving an indelible trail of sophistication and mystery.",
    topNotes: ["Tobacco Leaf", "Spices", "Black Pepper"],
    middleNotes: ["Vanilla", "Tonka Bean", "Cocoa"],
    baseNotes: ["Dried Fruits", "Amber", "Woody Notes"]
  },
  {
    id: "ultra-pulse",
    name: "Ultra Pulse",
    image: UltraPulseImg,
    category: "Parfum · Unisex",
    size: "15ml",
    price: "₹299",
    inspiration: "Inspired by JPG Ultra Male",
    description: "Ultra Pulse pulses with the energy of a night without boundaries. A seductive opening of ripe fig and fresh lavender courses into a warm, spiced heart of cinnamon and pear. The base is pure magnetism — vanilla and amber anchored by cedarwood — a fragrance that draws the world toward you.",
    topNotes: ["Fig", "Bergamot", "Lavender"],
    middleNotes: ["Cinnamon", "Pear", "Cumin"],
    baseNotes: ["Vanilla", "Amber", "Cedarwood"]
  },
  {
    id: "red-velvet",
    name: "Red Velvet",
    image: RedVelvetImg,
    category: "Parfum · Unisex",
    size: "15ml",
    price: "₹299",
    inspiration: "An original ITRRIKA creation",
    description: "Red Velvet is born from the imagination of ITRRIKA — a scent that belongs to no one else. A daring opening of saffron and deep rose surrenders to a smouldering heart of oud and velvet musk. The base is pure warmth: amber, sandalwood, and vanilla weaving together into something rare, personal, and entirely your own.",
    topNotes: ["Saffron", "Rose", "Blackcurrant"],
    middleNotes: ["Oud", "Velvet Musk", "Iris"],
    baseNotes: ["Amber", "Sandalwood", "Vanilla"]
  },
  {
    id: "wild-essence",
    name: "Wild Essence",
    image: WildEssenceImg,
    category: "Parfum · Unisex",
    size: "15ml",
    price: "₹299",
    inspiration: "Inspired by Dior Sauvage",
    description: "Wild Essence is raw nature, distilled. A striking eruption of Calabrian bergamot and cracked pepper opens onto wide-open spaces — untamed, windswept, and alive. Lavender and geranium give way to the extraordinary power of ambroxan, creating a trail that lingers like the horizon at dusk. Bold, free, and unmistakably present.",
    topNotes: ["Bergamot", "Pink Pepper", "Nutmeg"],
    middleNotes: ["Lavender", "Geranium", "Elemi"],
    baseNotes: ["Ambroxan", "Vetiver", "Patchouli"]
  },
  {
    id: "royal-blue",
    name: "Royal Blue",
    image: RoyalBlueImg,
    category: "Parfum · Unisex",
    size: "15ml",
    price: "₹299",
    inspiration: "Inspired by Bleu de Chanel",
    description: "Royal Blue commands the room the moment you enter. A luminous citrus opening of grapefruit and lemon gives way to a clean, refined heart of ginger and jasmine. Incense, labdanum, and cedar form a majestic base that is equal parts timeless elegance and quiet authority. This is confidence, made tangible.",
    topNotes: ["Grapefruit", "Lemon", "Mint"],
    middleNotes: ["Ginger", "Jasmine", "Iso E Super"],
    baseNotes: ["Incense", "Cedar", "Labdanum", "Sandalwood"]
  },
  {
    id: "pink-nectar",
    name: "Pink Nectar",
    image: PinkNectarImg,
    category: "Parfum · Unisex",
    size: "15ml",
    price: "₹299",
    inspiration: "Inspired by Gucci Flora",
    description: "Pink Nectar is a garden at the moment of full bloom — luminous, tender, and alive with colour. Mandarin and pink pepper sparkle at the opening before yielding to a heart of rose, peony, and delicate osmanthus. A warm base of sandalwood and white musk makes this one of those rare florals that lingers on the skin like a memory.",
    topNotes: ["Mandarin Orange", "Pink Pepper", "Peach"],
    middleNotes: ["Rose", "Peony", "Osmanthus"],
    baseNotes: ["Sandalwood", "White Musk", "Patchouli"]
  },
  {
    id: "blossom-muse",
    name: "Blossom Muse",
    image: BlossomMuseImg,
    category: "Parfum · Unisex",
    size: "15ml",
    price: "₹299",
    inspiration: "Inspired by Victoria's Secret Bombshell",
    description: "Blossom Muse is the scent of joy, poured into a bottle. Bursting with passion fruit, grapefruit, and wild strawberry, it is vivid and effervescent from the first breath. A heart of peony, vanilla orchid, and magnolia blooms with a feminine radiance that softens into white woods and musk — leaving a trail that is bright, sensual, and impossible to ignore.",
    topNotes: ["Passion Fruit", "Grapefruit", "Strawberry"],
    middleNotes: ["Peony", "Vanilla Orchid", "Magnolia"],
    baseNotes: ["White Musk", "White Woods", "Sandalwood"]
  }
];

export const getPerfume = (id: string): Perfume | undefined => {
  return perfumes.find(p => p.id === id);
};

export function getRecommendations(id: string, count = 3): Perfume[] {
  const current = getPerfume(id);
  if (!current) return [];

  const currentNotes = [
    ...current.topNotes,
    ...current.middleNotes,
    ...current.baseNotes,
  ].map(n => n.toLowerCase());

  return perfumes
    .filter(p => p.id !== id)
    .map(p => {
      const pNotes = [...p.topNotes, ...p.middleNotes, ...p.baseNotes].map(n =>
        n.toLowerCase(),
      );
      const overlap = pNotes.filter(n =>
        currentNotes.some(cn => cn.includes(n) || n.includes(cn)),
      ).length;
      return { p, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, count)
    .map(r => r.p);
}
