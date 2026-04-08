"use client";

/**
 * CommentThread - YouTube-style comment with replies
 *
 * Displays: avatar, author name, relative date, text, like button, replies (1 level).
 * Team badge for WeJustice team members.
 * Part of the component library (features/actions/).
 */

import { useState } from "react";

interface Reply {
  id: string;
  author: string;
  avatarColor: string;
  date: string;
  text: string;
  likes: number;
  isTeam: boolean;
}

interface CommentProps {
  id: string;
  author: string;
  avatarColor: string;
  date: string;
  text: string;
  likes: number;
  isTeam: boolean;
  replies: Reply[];
}

function relativeDate(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMin / 60);
  const diffD = Math.floor(diffH / 24);

  if (diffMin < 60) return `il y a ${diffMin} min`;
  if (diffH < 24) return `il y a ${diffH}h`;
  if (diffD < 7) return `il y a ${diffD}j`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function SingleComment({ author, avatarColor, date, text, likes: initialLikes, isTeam, isReply = false }: CommentProps & { isReply?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => liked ? c - 1 : c + 1);
  };

  return (
    <div className={`flex gap-3 ${isReply ? "ml-11 mt-3" : ""}`}>
      {/* Avatar */}
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: avatarColor }}
      >
        {author.charAt(0)}
      </div>

      <div className="flex-1 min-w-0">
        {/* Author + date + team badge */}
        <div className="mb-1 flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">{author}</span>
          {isTeam && (
            <span className="rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">
              EQUIPE
            </span>
          )}
          <span className="text-xs text-gray-400 dark:text-gray-500">{relativeDate(date)}</span>
        </div>

        {/* Text */}
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">{text}</p>

        {/* Like button */}
        <button
          onClick={toggleLike}
          className={`inline-flex items-center gap-1 text-xs transition-colors ${
            liked
              ? "text-brand"
              : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          }`}
        >
          <svg className="h-3.5 w-3.5" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likeCount > 0 && likeCount}
        </button>
      </div>
    </div>
  );
}

export function CommentThread(props: CommentProps) {
  const [showReplies, setShowReplies] = useState(props.replies.length <= 2);

  return (
    <div className="py-4">
      <SingleComment {...props} isReply={false} />

      {/* Replies */}
      {props.replies.length > 0 && (
        <>
          {!showReplies ? (
            <button
              onClick={() => setShowReplies(true)}
              className="ml-11 mt-2 text-xs font-medium text-brand hover:opacity-80"
            >
              Voir {props.replies.length} reponse{props.replies.length > 1 ? "s" : ""}
            </button>
          ) : (
            props.replies.map((reply) => (
              <SingleComment
                key={reply.id}
                {...reply}
                replies={[]}
                isReply={true}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}
