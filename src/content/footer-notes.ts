/** "The back page" of the footer: quotes, a short letter and a quick profile. Editable in admin as "Footer notes". */
export const footerNotes = {
  kicker: "THE BACK PAGE",
  title: ["Before you go,", "a few notes."],
  open: "Read the notes", close: "Close the notes",
  intro: "The things that don’t fit in a case study: the words I keep nearby, what I’m up to right now, and a little about the person behind the work.",
  quotes: {
    label: "WORDS I KEEP NEARBY", next: "Next quote", previous: "Previous quote", counter: "of",
    items: [
      { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear", source: "Atomic Habits" },
      { text: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear", source: "Atomic Habits" },
      { text: "To produce at your peak level you need to work for extended periods with full concentration on a single task free from distraction.", author: "Cal Newport", source: "Deep Work" },
      { text: "Make it work, make it right, make it fast.", author: "Kent Beck", source: "" },
      { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler", source: "Refactoring" },
      { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson", source: "Structure and Interpretation of Computer Programs" },
      { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra", source: "" },
      { text: "Premature optimization is the root of all evil.", author: "Donald Knuth", source: "" },
      { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds", source: "" },
      { text: "Real artists ship.", author: "Steve Jobs", source: "" },
    ],
  },
  letter: {
    label: "A NOTE FROM ME", greeting: "Hey, you read all the way down.",
    body: [
      "Thank you. Most people skim a portfolio, so if you’re here, you probably care about how things get built, and so do I.",
      "I started coding because I loved making things work from the ground up. I build with dedication for the businesses and users they serve: business operators tracking daily inventory, customers checking out smoothly, and founders scaling their platforms.",
      "If you’re looking to bring an idea to life or need a dependable engineer on your team, I’d love to hear from you.",
    ],
    signoff: "Talk soon,", name: "Ebube",
  },
  card: {
    label: "THE QUICK PROFILE", serial: "No. 001",
    rows: [
      { label: "Name", value: "Ebube Udorie (Technikraft)" },
      { label: "Based in", value: "Uyo, Akwa Ibom State, Nigeria" },
      { label: "Builds", value: "Web apps, custom dashboards, SaaS & APIs" },
      { label: "Thinks in", value: "TypeScript, React, PHP & SQL" },
      { label: "Studies at", value: "University of Uyo (Computer Engineering)" },
      { label: "Experience", value: "Intern at Springlight Technology" },
      { label: "Ask me about", value: "Custom dashboards, inventory systems, clean codebases" },
    ],
    stamp: "OPEN TO WORK", stampBusy: "BOOKED UP",
  },
  clock: {
    label: "LOCAL TIME (WAT)",
    timeZone: "Africa/Lagos",
    moods: [
      { from: 0, to: 6, text: "Asleep, or heads-down on code" },
      { from: 6, to: 9, text: "Morning routine & checking updates" },
      { from: 9, to: 18, text: "At the desk, building and shipping" },
      { from: 18, to: 24, text: "Reading, experimenting or winding down" },
    ],
  },
  now: {
    label: "RIGHT NOW",
    items: [
      { label: "Building", text: "Custom business management platforms & dashboards", tone: "yellow" },
      { label: "Exploring", text: "Advanced Next.js patterns & distributed APIs", tone: "rose" },
      { label: "Studying", text: "Computer Engineering at University of Uyo", tone: "cream" },
      { label: "Available for", text: "Full-time remote engineering roles & freelance", tone: "sunshine" },
    ],
  },
} as const
