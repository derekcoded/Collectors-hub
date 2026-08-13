import { Link, useNavigate, useParams } from "react-router-dom";
import { mockPosts } from "../data/mockPosts";
import { useAsyncData } from "../hooks/useAsyncData";
import Badge from "../components/Badge";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useApp } from "../context/AppContext";

const mockComments = [
  "Beautiful piece — how did you track it down?",
  "The condition on this is unreal for its age.",
  "Adding this to my own want-list now.",
];

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { likedPostIds, savedPostIds, toggleLike, toggleSave } = useApp();

  const { data: post, loading, error, reload } = useAsyncData(() => mockPosts.find((p) => p.id === id) ?? null, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl animate-pulse px-4 py-10 sm:px-6">
        <div className="mb-4 aspect-[4/3] w-full bg-ink-800/10" />
        <div className="h-4 w-2/3 bg-ink-800/15" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <ErrorState message={error} onRetry={reload} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <EmptyState
          title="Post not found."
          message="This post may have been removed or the link is out of date."
          action={{ label: "Back to Community Feed", onClick: () => navigate("/community") }}
        />
      </div>
    );
  }

  const liked = likedPostIds.has(post.id);
  const saved = savedPostIds.has(post.id);
  const displayLikes = post.likeCount + (liked ? 1 : 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link to="/community" className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-ink-600 hover:text-brass-600">
        ← Back to Community Feed
      </Link>

      <div className="specimen-tag bg-paper-100 p-4">
        <div className="mb-3 flex items-center gap-2">
          {post.userAvatar ? (
            <img src={post.userAvatar} alt="" className="h-9 w-9 rounded-full object-cover" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-800/15 font-mono text-xs text-ink-600">
              {post.userName.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <div className="text-sm font-medium text-ink-900">{post.userName}</div>
            <div className="text-[11px] text-ink-500">{post.createdAt}</div>
          </div>
          <Badge tone="ink">{post.category}</Badge>
        </div>

        <div className="mb-3 aspect-[4/3] w-full overflow-hidden bg-ink-800/10">
          {post.image ? (
            <img src={post.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-ink-400">
              No image on file
            </div>
          )}
        </div>

        <p className="mb-4 text-sm leading-relaxed text-ink-800">{post.caption}</p>

        <div className="flex items-center justify-between border-t border-ink-700/20 pt-3 text-sm">
          <button
            onClick={() => toggleLike(post.id)}
            aria-pressed={liked}
            className={`flex items-center gap-1 font-mono transition ${liked ? "text-rust-600" : "text-ink-600 hover:text-rust-500"}`}
          >
            {liked ? "♥" : "♡"} {displayLikes} likes
          </button>
          <span className="font-mono text-ink-600">💬 {post.commentCount} comments</span>
          <button
            onClick={() => toggleSave(post.id)}
            aria-pressed={saved}
            className={`font-mono transition ${saved ? "text-brass-600" : "text-ink-600 hover:text-brass-500"}`}
          >
            {saved ? "★ Saved" : "☆ Save"}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 font-display text-lg font-medium text-ink-900">Comments</h2>
        <div className="flex flex-col gap-3">
          {mockComments.map((c, i) => (
            <div key={i} className="rounded-sm border border-ink-700/20 bg-paper-100/60 p-3 text-sm text-ink-700">
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
