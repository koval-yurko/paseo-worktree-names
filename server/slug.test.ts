import assert from "node:assert/strict";
import { test } from "node:test";
import { firstFreeSlug, namingText, prefixFor, toWords } from "./slug.ts";

test("model output is cleaned into at most three kebab-case words", () => {
  assert.equal(toWords("Credit-Guard-Timeout."), "credit-guard-timeout");
  assert.equal(toWords(" `citation highlight panel fix` "), "citation-highlight-panel");
  assert.equal(toWords("timeout"), null);
  assert.equal(toWords(""), null);
});

test("prefix comes from the repository folder name", () => {
  assert.equal(prefixFor("/Users/koval/dev/IPD/ipd-nearform"), "ipd-nearform-");
  assert.equal(prefixFor("/work/My_Repo/"), "my-repo-");
});

test("a taken slug gets the next free number", () => {
  assert.equal(firstFreeSlug("a-b", new Set()), "a-b");
  assert.equal(firstFreeSlug("a-b", new Set(["a-b", "a-b-2"])), "a-b-3");
});

test("the prompt names the worktree, the title is the fallback", () => {
  assert.equal(namingText({ title: "Card title", firstAgentContext: { prompt: "Fix the login" } }), "Fix the login");
  assert.equal(namingText({ title: "Card title", agent: { initialPrompt: "Add search" } }), "Add search");
  assert.equal(namingText({ title: "  Worktree naming " }), "Worktree naming");
  assert.equal(namingText({ title: "  " }), undefined);
  assert.equal(namingText({}), undefined);
});
