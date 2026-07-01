import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { perfumes, type Perfume } from "@/lib/data";
import { useWishlist } from "@/context/wishlist-context";

type Tag =
  | "powerful" | "warm" | "romantic" | "fresh" | "mysterious"
  | "office" | "date" | "outdoor" | "special" | "casual"
  | "coffee-spice-oud" | "fresh-citrus-woods" | "floral-sweet" | "warm-amber"
  | "whisper" | "presence" | "bold-trail";

interface Option {
  label: string;
  sub: string;
  icon: string;
  tags: Tag[];
}

interface Question {
  id: string;
  heading: string;
  sub: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: "mood",
    heading: "What is your energy right now?",
    sub: "Choose the mood that resonates most deeply.",
    options: [
      { label: "Powerful & Commanding", sub: "You enter a room and own it", icon: "◈", tags: ["powerful"] },
      { label: "Warm & Romantic", sub: "Soft edges, deep feeling", icon: "◇", tags: ["warm", "romantic"] },
      { label: "Fresh & Energetic", sub: "Alive, unrestrained, moving", icon: "◎", tags: ["fresh"] },
      { label: "Mysterious & Sensual", sub: "Shadows and silk", icon: "◉", tags: ["mysterious", "romantic"] },
    ],
  },
  {
    id: "occasion",
    heading: "Where will you wear this most?",
    sub: "The right scent for the right moment.",
    options: [
      { label: "Office & Everyday", sub: "Clean, professional, poised", icon: "◫", tags: ["office"] },
      { label: "Date Night", sub: "Intimate, unforgettable", icon: "◈", tags: ["date", "romantic"] },
      { label: "Outdoor & Adventure", sub: "Open air, raw nature", icon: "◎", tags: ["outdoor"] },
      { label: "Special Occasions", sub: "Grand moments, lasting impressions", icon: "◇", tags: ["special"] },
    ],
  },
  {
    id: "notes",
    heading: "Which scents call to you?",
    sub: "Trust your instinct — there is no wrong answer.",
    options: [
      { label: "Coffee, Spice & Oud", sub: "Rich, dark, Arabian luxury", icon: "◉", tags: ["coffee-spice-oud"] },
      { label: "Fresh Citrus & Woods", sub: "Crisp, clean, masculine edge", icon: "◎", tags: ["fresh-citrus-woods"] },
      { label: "Floral & Sweet", sub: "Petals, fruit, tender warmth", icon: "◇", tags: ["floral-sweet"] },
      { label: "Amber, Tobacco & Vanilla", sub: "Velvet warmth, golden depth", icon: "◈", tags: ["warm-amber", "coffee-spice-oud"] },
    ],
  },
  {
    id: "strength",
    heading: "How far should your scent reach?",
    sub: "Your sillage — the trail you leave behind.",
    options: [
      { label: "Whisper", sub: "Intimate, discovered only up close", icon: "◎", tags: ["whisper"] },
      { label: "Presence", sub: "Noticed by those who draw near", icon: "◇", tags: ["presence"] },
      { label: "Statement", sub: "A trail that lingers long after you leave", icon: "◉", tags: ["bold-trail"] },
    ],
  },
];

const PERFUME_TAGS: Record<string, Tag[]> = {
  "qawhwa-elixir":   ["powerful", "warm", "romantic", "date", "special", "coffee-spice-oud", "warm-amber", "bold-trail"],
  "zenith-blue":     ["powerful", "fresh", "office", "outdoor", "special", "fresh-citrus-woods", "presence"],
  "tobacco-elixir":  ["warm", "mysterious", "romantic", "date", "special", "coffee-spice-oud", "warm-amber", "bold-trail"],
  "ultra-pulse":     ["powerful", "warm", "romantic", "date", "casual", "floral-sweet", "warm-amber", "bold-trail"],
  "red-velvet":      ["mysterious", "romantic", "date", "special", "coffee-spice-oud", "bold-trail"],
  "wild-essence":    ["powerful", "fresh", "outdoor", "casual", "fresh-citrus-woods", "presence", "bold-trail"],
  "royal-blue":      ["powerful", "fresh", "office", "special", "fresh-citrus-woods", "presence"],
  "pink-nectar":     ["fresh", "romantic", "casual", "date", "floral-sweet", "whisper", "presence"],
  "blossom-muse":    ["fresh", "romantic", "casual", "special", "floral-sweet", "whisper"],
};

function score(perfume: Perfume, chosen: Tag[]): number {
  const tags = PERFUME_TAGS[perfume.id] ?? [];
  return chosen.filter(t => tags.includes(t)).length;
}

function getResults(chosen: Tag[]): Perfume[] {
  return [...perfumes]
    .map(p => ({ p, s: score(p, chosen) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 2)
    .map(r => r.p);
}

type Screen = "intro" | "quiz" | "result";

export default function Quiz() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState<Tag[]>([]);
  const [selected, setSelected] = useState<Tag[] | null>(null);
  const [results, setResults] = useState<Perfume[]>([]);
  const { toggle, has } = useWishlist();

  const question = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  function handleSelect(tags: Tag[]) {
    setSelected(tags);
  }

  function handleNext() {
    if (!selected) return;
    const newChosen = [...chosen, ...selected];
    setSelected(null);

    if (step < QUESTIONS.length - 1) {
      setChosen(newChosen);
      setStep(s => s + 1);
    } else {
      setResults(getResults(newChosen));
      setScreen("result");
    }
  }

  function restart() {
    setScreen("intro");
    setStep(0);
    setChosen([]);
    setSelected(null);
    setResults([]);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnimatePresence mode="wait">

        {/* ── INTRO ─────────────────────────────────────────────────── */}
        {screen === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center"
          >
            <p className="text-primary text-xs uppercase tracking-[0.4em] mb-6">ITRRIKA Fragrance House</p>
            <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6 leading-tight">
              Find Your<br />Signature Scent
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-12 font-light leading-relaxed">
              Answer four questions and we will reveal the fragrance born exactly for you — your mood, your moment, your soul.
            </p>

            <div className="flex gap-6 mb-16 text-center">
              {["Mood", "Occasion", "Notes", "Sillage"].map((step, i) => (
                <div key={step} className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border border-primary/30 flex items-center justify-center text-primary text-xs">
                    {i + 1}
                  </div>
                  <span className="text-muted-foreground text-[10px] uppercase tracking-widest">{step}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen("quiz")}
              className="px-12 py-4 bg-primary text-primary-foreground uppercase tracking-[0.2em] text-sm hover:bg-primary/90 transition-colors duration-300"
            >
              Begin the Journey
            </button>
          </motion.div>
        )}

        {/* ── QUIZ ──────────────────────────────────────────────────── */}
        {screen === "quiz" && (
          <motion.div
            key={`quiz-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center justify-center px-6 py-24"
          >
            {/* Progress bar */}
            <div className="w-full max-w-2xl mb-12">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                <span>Question {step + 1} of {QUESTIONS.length}</span>
                <span>{question.id}</span>
              </div>
              <div className="h-px bg-primary/10 relative">
                <motion.div
                  className="absolute top-0 left-0 h-px bg-primary"
                  initial={{ width: `${progress}%` }}
                  animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="w-full max-w-2xl text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-3">
                {question.heading}
              </h2>
              <p className="text-muted-foreground font-light">{question.sub}</p>
            </div>

            {/* Options */}
            <div className={`w-full max-w-2xl grid gap-4 mb-12 ${question.options.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
              {question.options.map(opt => {
                const isSelected = selected?.join() === opt.tags.join();
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.tags)}
                    className={`group p-6 border text-left transition-all duration-300 ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-primary/20 hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <span className={`text-2xl block mb-3 transition-colors ${isSelected ? "text-primary" : "text-primary/40 group-hover:text-primary/70"}`}>
                      {opt.icon}
                    </span>
                    <p className={`font-serif text-lg mb-1 transition-colors ${isSelected ? "text-foreground" : "text-foreground/70"}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{opt.sub}</p>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-6">
              {step > 0 && (
                <button
                  onClick={() => { setStep(s => s - 1); setSelected(null); }}
                  className="text-muted-foreground text-sm uppercase tracking-widest hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`px-10 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                  selected
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-primary/20 text-primary/30 cursor-not-allowed"
                }`}
              >
                {step < QUESTIONS.length - 1 ? "Continue →" : "Reveal My Scent →"}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── RESULT ────────────────────────────────────────────────── */}
        {screen === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-center px-6 py-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-primary text-xs uppercase tracking-[0.4em] mb-4">Your Scent Profile</p>
              <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-4">
                {results.length === 1 ? "Your Perfect Match" : "Your Top Matches"}
              </h2>
              <p className="text-muted-foreground font-light max-w-md mx-auto">
                Crafted from your answers, these fragrances resonate most deeply with who you are.
              </p>
            </motion.div>

            <div className={`w-full max-w-4xl grid gap-8 mb-16 ${results.length === 1 ? "grid-cols-1 max-w-sm" : "grid-cols-1 sm:grid-cols-2"}`}>
              {results.map((perfume, i) => {
                const wished = has(perfume.id);
                return (
                  <motion.div
                    key={perfume.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                    className="border border-primary/20 bg-background flex flex-col"
                  >
                    {i === 0 && (
                      <div className="bg-primary/10 border-b border-primary/20 px-5 py-2 flex items-center gap-2">
                        <span className="text-primary text-xs">✦</span>
                        <span className="text-primary text-xs uppercase tracking-widest">Best Match</span>
                      </div>
                    )}

                    <Link href={`/perfume/${perfume.id}`}>
                      <div className="relative overflow-hidden cursor-pointer group">
                        <div className="absolute inset-0 bg-gradient-to-br from-background/30 to-transparent z-10" />
                        <img
                          src={perfume.image}
                          alt={perfume.name}
                          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </Link>

                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-primary text-[10px] uppercase tracking-widest mb-1">{perfume.category}</p>
                      <Link href={`/perfume/${perfume.id}`}>
                        <h3 className="font-serif text-3xl text-foreground mb-1 hover:text-primary transition-colors cursor-pointer">
                          {perfume.name}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-xs italic mb-4">{perfume.inspiration}</p>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                        {perfume.description}
                      </p>

                      {/* Notes */}
                      <div className="border border-primary/10 divide-y divide-primary/10 mb-6 text-xs">
                        <div className="flex gap-4 px-4 py-2.5">
                          <span className="text-primary uppercase tracking-wider w-12 shrink-0">Top</span>
                          <span className="text-foreground/70">{perfume.topNotes.join(" · ")}</span>
                        </div>
                        <div className="flex gap-4 px-4 py-2.5">
                          <span className="text-primary uppercase tracking-wider w-12 shrink-0">Heart</span>
                          <span className="text-foreground/70">{perfume.middleNotes.join(" · ")}</span>
                        </div>
                        <div className="flex gap-4 px-4 py-2.5">
                          <span className="text-primary uppercase tracking-wider w-12 shrink-0">Base</span>
                          <span className="text-foreground/70">{perfume.baseNotes.join(" · ")}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        <button
                          onClick={() => toggle(perfume)}
                          className={`flex-1 py-3 text-xs uppercase tracking-widest border transition-all duration-300 ${
                            wished
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-primary/30 text-muted-foreground hover:border-primary hover:text-primary"
                          }`}
                        >
                          {wished ? "✦ In Wishlist" : "+ Add to Wishlist"}
                        </button>
                        <Link href={`/perfume/${perfume.id}`}>
                          <button className="px-5 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors">
                            View →
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={restart}
                className="text-muted-foreground text-xs uppercase tracking-widest hover:text-foreground transition-colors"
              >
                ↩ Retake Quiz
              </button>
              <Link href="/collection">
                <button className="text-primary text-xs uppercase tracking-widest hover:text-primary/80 transition-colors border-b border-primary/30">
                  Browse Full Collection →
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
