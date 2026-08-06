"use client";
import { useEffect } from "react";

const MAX_INSERT_ATTEMPTS = 20;

type RemoveChildFn = (child: Node) => Node;
type InsertBeforeFn = (newChild: Node, referenceNode: Node | null) => Node;

interface PatchableNode {
  parentNode: Node | null;
  previousSibling: Node | null;
  firstChild: Node | null;
}

export default function TranslateNavGuard() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window as unknown as { __gtranslatePatchInstalled?: boolean };
    if (w.__gtranslatePatchInstalled) return;
    w.__gtranslatePatchInstalled = true;

    const nodeProto = Node.prototype as unknown as {
      removeChild: RemoveChildFn;
      insertBefore: InsertBeforeFn;
    };

    const originalRemoveChild = nodeProto.removeChild;
    nodeProto.removeChild = function removeChild(this: Node, child: Node) {
      if (child.parentNode !== this) return child;
      return originalRemoveChild.call(this, child);
    };

    const originalInsertBefore = nodeProto.insertBefore;
    nodeProto.insertBefore = function insertBefore(
      this: Node,
      newChild: Node,
      referenceNode: Node | null,
    ) {
      let tempReference: Node | null = referenceNode;
      let attempts = 0;
      const host = this as unknown as PatchableNode;
      while (
        tempReference &&
        tempReference.parentNode !== this &&
        attempts < MAX_INSERT_ATTEMPTS
      ) {
        tempReference = tempReference.previousSibling;
        attempts++;
      }
      const ref = tempReference ?? host.firstChild;
      return originalInsertBefore.call(this, newChild, ref);
    };
  }, []);

  return null;
}