export type GalleryPhoto = {
  src: string
  alt: string
  caption: string
  /** CSS object-position for the crop, e.g. "50% 20%". */
  position: string
  /** Also show this photo in the hero's photo card. */
  showInHero: boolean
}

/** Every photo on the site's gallery page. The ones marked showInHero also rotate in the hero card. */
export const galleryContent = {
  kicker: "PHOTO GALLERY",
  title: "Moments behind the work.",
  description: "Building systems, engineering hardware at university, and creating tools for businesses.",
  viewAllLabel: "View all photos",
  backLabel: "Back to home",
  emptyLabel: "Photos are on their way.",
  photos: [
    { src: "/images/me2.jpeg", alt: "Ebube Udorie — gym portrait", caption: "Discipline in every rep, precision in every line.", position: "50% 30%", showInHero: true },
    { src: "/images/me3.jpeg", alt: "Ebube Udorie in traditional attire, smiling", caption: "Rooted, smiling, building.", position: "50% 30%", showInHero: true },
    { src: "/images/gallery/ebube-pool-skyline.jpeg", alt: "Ebube Udorie at rooftop infinity pool, city skyline behind", caption: "Clear skies, clearer goals.", position: "50% 40%", showInHero: true },
    { src: "/images/gallery/ebube-studio-chair.jpeg", alt: "Ebube Udorie in all-black studio editorial shoot", caption: "Calm. Focused. Ready.", position: "50% 30%", showInHero: true },
    { src: "/images/gallery/ebube-denim-style.jpeg", alt: "Ebube Udorie in denim jacket and star-print jeans", caption: "The engineer off duty.", position: "50% 50%", showInHero: true },
    { src: "/images/gallery/ebube-phone-quote.jpeg", alt: "Ebube Udorie holding phone with 'Life is crazy but always be grateful'", caption: "Life is crazy. Always be grateful.", position: "50% 30%", showInHero: false },
    { src: "/images/gallery/ebube-football-pitch.jpeg", alt: "Ebube Udorie on football pitch in Arsenal jersey", caption: "A Gunner at heart.", position: "50% 40%", showInHero: false },
    { src: "/images/gallery/ebube-football-team.jpeg", alt: "Ebube's football team on the grass pitch", caption: "Teamwork on and off the field.", position: "50% 50%", showInHero: false },
    { src: "/images/gallery/ebube-laptop-book.jpeg", alt: "Laptop open with VS Code and HTML CSS JS book on desk", caption: "Where it all started.", position: "50% 50%", showInHero: false },
    { src: "/images/gallery/ebube-book-keyboard.jpeg", alt: "HTML CSS JS book on RGB gaming keyboard", caption: "Learning never stops.", position: "50% 40%", showInHero: false },
    { src: "/images/gallery/uniuyo-campus.jpg", alt: "University of Uyo campus building", caption: "Computer Engineering, Uniuyo.", position: "50% 40%", showInHero: false },
  ] as GalleryPhoto[],
}
