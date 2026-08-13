import type { CommunityPost } from "../types";

const img = (seed: string) => `https://picsum.photos/seed/${seed}/480/360`;
const avatar = (seed: string) => `https://picsum.photos/seed/${seed}/80/80`;

export const mockPosts: CommunityPost[] = [
  { id: "c1", userName: "Nora Fenwick", userAvatar: avatar("u1"), image: img("post1"), caption: "Finally found the missing piece for my Morgan dollar run — 1893-S in decent shape!", category: "Coins", likeCount: 42, commentCount: 6, createdAt: "2026-08-11" },
  { id: "c2", userName: "Deepak Malhotra", userAvatar: avatar("u2"), image: img("post2"), caption: "Pulled this from a childhood box today. Didn't expect it to still be in one piece.", category: "Trading Cards", likeCount: 128, commentCount: 24, createdAt: "2026-08-10" },
  { id: "c3", userName: "Elena Marchetti", userAvatar: avatar("u3"), image: null, caption: "Restoring the spine on a 1978 issue tonight. Slow, careful work but worth it.", category: "Comics", likeCount: 19, commentCount: 3, createdAt: "2026-08-09" },
  { id: "c4", userName: "Owen Blackwood", userAvatar: avatar("u4"), image: img("post4"), caption: "Cataloged my stamp album by region this weekend. Small satisfaction, big payoff.", category: "Stamps", likeCount: 8, commentCount: 1, createdAt: "2026-08-08" },
  { id: "c5", userName: "Priya Choudhary", userAvatar: avatar("u5"), image: img("post5"), caption: "First pressing, still sealed. Debating whether to open it or keep it mint.", category: "Vinyl Records", likeCount: 76, commentCount: 15, createdAt: "2026-08-07" },
  { id: "c6", userName: "Marcus Ibe", userAvatar: avatar("u6"), image: img("post6"), caption: "Repainted the joints on this old tin robot. He walks again.", category: "Vintage Toys", likeCount: 55, commentCount: 9, createdAt: "2026-08-06" },
  { id: "c7", userName: "Sofia Lindqvist", userAvatar: avatar("u7"), image: img("post7"), caption: "Sent this in for a service and it came back running within two seconds a day.", category: "Watches", likeCount: 61, commentCount: 11, createdAt: "2026-08-05" },
  { id: "c8", userName: "Tobias Reyes", userAvatar: avatar("u8"), image: img("post8"), caption: "Framed my first serious print purchase. It changes the whole room.", category: "Art & Prints", likeCount: 33, commentCount: 4, createdAt: "2026-08-04" },
  { id: "c9", userName: "Nora Fenwick", userAvatar: avatar("u1"), image: img("post9"), caption: "Comparing toning patterns on these two Peace dollars — thoughts on authenticity?", category: "Coins", likeCount: 27, commentCount: 18, createdAt: "2026-08-03" },
  { id: "c10", userName: "Deepak Malhotra", userAvatar: avatar("u10"), image: img("post10"), caption: "Grading day. Sent off six cards, nervous about the corners on this one.", category: "Trading Cards", likeCount: 94, commentCount: 20, createdAt: "2026-08-02" },
  { id: "c11", userName: "Elena Marchetti", userAvatar: avatar("u3"), image: img("post11"), caption: "Found a full run at an estate sale for less than one issue usually costs.", category: "Comics", likeCount: 71, commentCount: 12, createdAt: "2026-08-01" },
  { id: "c12", userName: "Priya Choudhary", userAvatar: avatar("u5"), image: img("post12"), caption: "New shelf, finally organized by year instead of by genre.", category: "Vinyl Records", likeCount: 40, commentCount: 5, createdAt: "2026-07-30" },
];
