"use client";

/**
 * TabCommunaute - YouTube-style community discussion
 *
 * Sections: Stats bar → Composer → Sort → Comment thread → Load more
 * Part of the component library (features/actions/).
 */

import { useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { useAuthSafe } from "@/lib/mock-auth";
import { CommentThread } from "./CommentThread";
import commentsData from "@/mocks/comments.json";

type SortMode = "recent" | "popular";

interface TabCommunauteProps {
  actionId: string;
  signaturesThisWeek: number;
  totalSignatures: number;
}

export function TabCommunaute({ actionId, signaturesThisWeek: _signaturesThisWeek, totalSignatures: _totalSignatures }: TabCommunauteProps) {
  const { user, isAuthenticated } = useAuthSafe();
  const [sort, setSort] = useState<SortMode>("recent");
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState<typeof comments>([]);

  const comments = (commentsData as Record<string, typeof commentsData["dejavu-transparence-vaccins"]>)[actionId] || [];
  const allComments = [...localComments, ...comments];

  const sorted = sort === "popular"
    ? [...allComments].sort((a, b) => b.likes - a.likes)
    : allComments;

  const totalMessages = allComments.length + allComments.reduce((sum, c) => sum + c.replies.length, 0);
  const uniqueAuthors = new Set(allComments.map((c) => c.author)).size;

  const handlePost = () => {
    if (!newComment.trim() || !user) return;
    const comment = {
      id: `c-local-${Date.now()}`,
      author: `${user.firstName} ${user.lastName}`,
      avatarColor: user.avatarColor || "#3B82F6",
      date: new Date().toISOString(),
      text: newComment.trim(),
      likes: 0,
      isTeam: user.role === "admin",
      replies: [],
    };
    setLocalComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  return (
    <div>
      {/* ─── Stats bar — messages et participants uniquement ─── */}
      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-medium text-gray-900 dark:text-white">{totalMessages} messages</span>
        <span>{uniqueAuthors} participants</span>
      </div>

      {/* ─── Composer ─── */}
      {isAuthenticated && user ? (
        <div className="mb-8 flex gap-3">
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: user.avatarColor || "#3B82F6" }}
          >
            {user.firstName.charAt(0)}
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Partagez votre avis, votre experience..."
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            <div className="mt-2 flex justify-end">
              <CTAButton onClick={handlePost} disabled={!newComment.trim()} size="sm">
                Publier
              </CTAButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-lg bg-gray-50 p-5 text-center dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="font-medium text-brand underline">Connectez-vous</a> pour participer à la discussion
          </p>
        </div>
      )}

      {/* ─── Sort ─── */}
      <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-3 dark:border-white/[0.08]">
        <span className="text-xs text-gray-500 dark:text-gray-400">Trier par :</span>
        <button
          onClick={() => setSort("recent")}
          className={`text-xs font-medium ${sort === "recent" ? "text-gray-900 dark:text-white" : "text-gray-400 hover:text-gray-600 dark:text-gray-500"}`}
        >
          Plus recents
        </button>
        <button
          onClick={() => setSort("popular")}
          className={`text-xs font-medium ${sort === "popular" ? "text-gray-900 dark:text-white" : "text-gray-400 hover:text-gray-600 dark:text-gray-500"}`}
        >
          Plus populaires
        </button>
      </div>

      {/* ─── Comment thread ─── */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {sorted.map((comment) => (
          <CommentThread key={comment.id} {...comment} />
        ))}
      </div>

      {/* ─── Load more (mock) ─── */}
      {allComments.length >= 8 && (
        <div className="mt-6 text-center">
          <button className="text-sm font-medium text-brand hover:opacity-80">
            Voir plus de messages
          </button>
        </div>
      )}
    </div>
  );
}
