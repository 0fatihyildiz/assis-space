import { useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

function hasParentAttr(child: any, attribute: string): boolean {
  if (
    child.hasAttribute(attribute) ||
    child.classList.contains("placement-top-start")
  )
    return true;
  try {
    //Throws TypeError if child doesn't have parent any more
    return child.parentNode && hasParentAttr(child.parentNode, attribute);
  } catch (TypeError) {
    return false;
  }
}

export function useClickOutside<T extends HTMLElement = any>(
  handler: () => void,
  events?: string[] | null,
  nodes?: HTMLElement[]
) {
  const ref = useRef<T>();

  useEffect(() => {
    const listener = (event: any) => {
      const shouldIgnore = hasParentAttr(
        event?.target,
        "data-ignore-outside-clicks"
      );

      if (Array.isArray(nodes)) {
        const shouldTrigger = nodes.every(
          (node) => !!node && !node.contains(event.target)
        );
        shouldTrigger && !shouldIgnore && handler();
      } else if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !shouldIgnore
      ) {
        handler();
      }
    };

    (events || DEFAULT_EVENTS).forEach((fn) =>
      document.addEventListener(fn, listener)
    );

    return () => {
      (events || DEFAULT_EVENTS).forEach((fn) =>
        document.removeEventListener(fn, listener)
      );
    };
  }, [ref, handler, nodes, events]);

  return ref;
}
