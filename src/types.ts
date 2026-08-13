export type Category =
  | "Coins"
  | "Trading Cards"
  | "Comics"
  | "Stamps"
  | "Vinyl Records"
  | "Vintage Toys"
  | "Watches"
  | "Art & Prints";

export type Condition = "Mint" | "Near Mint" | "Good" | "Fair" | "Poor";

export type CollectionKey = "owned" | "wishlist" | "selling";

export interface Product {
  id: string;
  title: string;
  image: string | null;
  category: Category;
  condition: Condition;
  price: number;
  sellerName: string;
  location: string;
  description: string;
  createdAt: string; // ISO date
}

export interface CommunityPost {
  id: string;
  userName: string;
  userAvatar: string | null;
  image: string | null;
  caption: string;
  category: Category;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export interface CollectionItem {
  id: string; // unique id for this collection entry
  productId: string;
  title: string;
  image: string | null;
  category: Category;
  estimatedValue: number;
  dateAdded: string; // ISO date
}

export type SortOption = "price-asc" | "price-desc" | "newest";

export interface ToastMessage {
  id: string;
  tone: "success" | "info" | "error";
  text: string;
}
