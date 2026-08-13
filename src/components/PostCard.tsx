import { Link } from "react-router-dom";
import type { CommunityPost } from "../types";
import Badge from "./Badge";
import { useApp } from "../context/AppContext";

export default function PostCard({ post }: { post: CommunityPost }) {
  const { likedPostIds, savedPostIds, toggleLike, toggleSave } = useApp();
  const liked = likedPostIds.has(post.id);
  const saved = savedPostIds.has(post.id);
  const displayLikes = post.likeCount + (liked ? 1 : 0);

  return (
    <article className="specimen-tag flex flex-col bg-paper-100">
      <div className="flex items-center gap-2 p-3 pb-0">
        {post.userAvatar ? (
          <img src={post.userAvatar} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-800/15 font-mono text-xs text-ink-600">
            {post.userName.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <div className="text-sm font-medium text-ink-900">{post.userName}</div>
          <div className="text-[11px] text-ink-500">{post.createdAt}</div>
        </div>
        <Badge tone="ink">{post.category}</Badge>
      </div>

      <Link to={`/community/${post.id}`} className="block px-3 py-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-800/10">
          {post.image ? (
            <img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-ink-400">
              No image on file
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3 pt-0">
        <p className="text-sm text-ink-800">{post.caption}</p>
        <div className="mt-1 flex items-center justify-between text-xs text-ink-600">
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleLike(post.id)}
              aria-pressed={liked}
              className={`flex items-center gap-1 font-mono transition ${liked ? "text-rust-600" : "text-ink-600 hover:text-rust-500"}`}
            >
              {liked ? "♥" : "♡"} {displayLikes}
            </button>
            <Link to={`/community/${post.id}`} className="flex items-center gap-1 font-mono hover:text-brass-600">
              💬 {post.commentCount}
            </Link>
          </div>
          <button
            onClick={() => toggleSave(post.id)}
            aria-pressed={saved}
            className={`font-mono transition ${saved ? "text-brass-600" : "text-ink-600 hover:text-brass-500"}`}
          >
            {saved ? "★ Saved" : "☆ Save"}
          </button>
        </div>
      </div>
    </article>
  );
}
