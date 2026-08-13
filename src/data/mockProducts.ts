import type { Product } from "../types";

const img = (seed: string) => `https://picsum.photos/seed/${seed}/480/360`;

export const mockProducts: Product[] = [
  { id: "p1", title: "1964 Morgan Silver Dollar", image: img("coin1"), category: "Coins", condition: "Near Mint", price: 145, sellerName: "R. Alderidge", location: "Portland, OR", description: "Well-preserved Morgan dollar with strong luster and minimal wear on the eagle's breast feathers.", createdAt: "2026-08-01" },
  { id: "p2", title: "Charizard Base Set Holo #4", image: img("card1"), category: "Trading Cards", condition: "Good", price: 890, sellerName: "T. Nakamura", location: "San Jose, CA", description: "Iconic first-edition shadowless Charizard. Light edge whitening, centered print.", createdAt: "2026-08-05" },
  { id: "p3", title: "Amazing Spider-Man #300", image: img("comic1"), category: "Comics", condition: "Fair", price: 210, sellerName: "M. Osei", location: "Atlanta, GA", description: "First full appearance of Venom. Spine stress lines, otherwise solid.", createdAt: "2026-07-20" },
  { id: "p4", title: "Penny Black Stamp 1840", image: null, category: "Stamps", condition: "Poor", price: 60, sellerName: "H. Delacroix", location: "New Orleans, LA", description: "Genuine Penny Black with heavy postmark, corner crease.", createdAt: "2026-07-15" },
  { id: "p5", title: "Miles Davis - Kind of Blue LP", image: img("vinyl1"), category: "Vinyl Records", condition: "Mint", price: 75, sellerName: "J. Whitfield", location: "Chicago, IL", description: "Original 1959 Columbia pressing, sleeve and vinyl both pristine.", createdAt: "2026-08-08" },
  { id: "p6", title: "Vintage Tin Wind-Up Robot", image: img("toy1"), category: "Vintage Toys", condition: "Good", price: 130, sellerName: "S. Park", location: "Seattle, WA", description: "1960s Japanese tin robot, working key mechanism, minor paint loss.", createdAt: "2026-08-02" },
  { id: "p7", title: "Omega Seamaster 1968", image: img("watch1"), category: "Watches", condition: "Near Mint", price: 2400, sellerName: "L. Bianchi", location: "Miami, FL", description: "Automatic movement recently serviced, original crown and crystal.", createdAt: "2026-07-28" },
  { id: "p8", title: "Hokusai Great Wave Reprint", image: img("art1"), category: "Art & Prints", condition: "Mint", price: 95, sellerName: "A. Kimura", location: "Los Angeles, CA", description: "Museum-quality woodblock reprint on archival paper, unframed.", createdAt: "2026-08-10" },
  { id: "p9", title: "1943 Steel Wheat Penny", image: img("coin2"), category: "Coins", condition: "Fair", price: 18, sellerName: "R. Alderidge", location: "Portland, OR", description: "WWII steel cent, moderate surface oxidation.", createdAt: "2026-06-30" },
  { id: "p10", title: "Michael Jordan Rookie Card", image: img("card2"), category: "Trading Cards", condition: "Poor", price: 620, sellerName: "D. Okafor", location: "Chicago, IL", description: "1986 Fleer rookie, soft corners, still a strong display piece.", createdAt: "2026-07-11" },
  { id: "p11", title: "Batman #1 Facsimile Edition", image: img("comic2"), category: "Comics", condition: "Mint", price: 40, sellerName: "M. Osei", location: "Atlanta, GA", description: "High-quality facsimile reprint, great starter piece.", createdAt: "2026-08-09" },
  { id: "p12", title: "Blue Mauritius Replica Stamp", image: img("stamp2"), category: "Stamps", condition: "Good", price: 25, sellerName: "H. Delacroix", location: "New Orleans, LA", description: "Collector's replica of one of philately's most famous stamps.", createdAt: "2026-07-02" },
  { id: "p13", title: "Fleetwood Mac - Rumours LP", image: img("vinyl2"), category: "Vinyl Records", condition: "Good", price: 45, sellerName: "J. Whitfield", location: "Chicago, IL", description: "1977 pressing, light surface noise, sleeve has ring wear.", createdAt: "2026-07-25" },
  { id: "p14", title: "G.I. Joe Action Figure 1982", image: img("toy2"), category: "Vintage Toys", condition: "Near Mint", price: 55, sellerName: "S. Park", location: "Seattle, WA", description: "Complete with original accessories, box not included.", createdAt: "2026-08-04" },
  { id: "p15", title: "Rolex Datejust 1972", image: null, category: "Watches", condition: "Good", price: 5200, sellerName: "L. Bianchi", location: "Miami, FL", description: "Classic two-tone Datejust, service history available.", createdAt: "2026-07-18" },
  { id: "p16", title: "Van Gogh Starry Night Print", image: img("art2"), category: "Art & Prints", condition: "Mint", price: 60, sellerName: "A. Kimura", location: "Los Angeles, CA", description: "Giclée print on canvas, vivid color reproduction.", createdAt: "2026-08-11" },
  { id: "p17", title: "1921 Peace Silver Dollar", image: img("coin3"), category: "Coins", condition: "Mint", price: 310, sellerName: "R. Alderidge", location: "Portland, OR", description: "Key first-year issue with exceptional strike and luster.", createdAt: "2026-08-06" },
  { id: "p18", title: "Pikachu Illustrator Reprint", image: img("card3"), category: "Trading Cards", condition: "Near Mint", price: 150, sellerName: "T. Nakamura", location: "San Jose, CA", description: "High-fidelity reprint of the famed promo card.", createdAt: "2026-08-03" },
];

export const categories: Product["category"][] = [
  "Coins",
  "Trading Cards",
  "Comics",
  "Stamps",
  "Vinyl Records",
  "Vintage Toys",
  "Watches",
  "Art & Prints",
];

export const conditions: Product["condition"][] = [
  "Mint",
  "Near Mint",
  "Good",
  "Fair",
  "Poor",
];
