export function toWords(text: string): string | null {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 3);
  return words.length >= 2 ? words.join("-") : null;
}

export function prefixFor(repositoryRoot: string): string {
  const name = repositoryRoot.split("/").filter(Boolean).pop() ?? "";
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-`;
}

export function firstFreeSlug(slug: string, taken: Set<string>): string {
  if (!taken.has(slug)) return slug;
  let suffix = 2;
  while (taken.has(`${slug}-${suffix}`)) suffix += 1;
  return `${slug}-${suffix}`;
}

// Flowly and other plugins create worktrees with only a title, so the title is the fallback.
export function namingText(request: {
  title?: string;
  firstAgentContext?: { prompt?: string };
  agent?: { initialPrompt?: string };
}): string | undefined {
  return request.firstAgentContext?.prompt || request.agent?.initialPrompt || request.title?.trim() || undefined;
}
