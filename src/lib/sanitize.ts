/**
 * sanitizeHtml — Central HTML sanitizer for all user/API content.
 *
 * Uses DOMPurify with a strict allowlist of tags.
 * MUST be used on any HTML rendered via dangerouslySetInnerHTML.
 *
 * Usage:
 *   import { sanitizeHtml } from "@/lib/sanitize";
 *   <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
 */

import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "b", "i", "em", "strong", "sup", "sub", "br", "p",
  "ul", "ol", "li", "a", "span", "h1", "h2", "h3", "h4", "h5", "h6",
  "blockquote", "code", "pre", "hr", "img",
];

const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "class", "id"];

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });
}
