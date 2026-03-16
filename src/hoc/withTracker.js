import React, { useRef } from "react";
import { useTracker } from "../context/TrackerContext";

function shallowEqual(objA, objB) {
  if (objA === objB) return true;
  if (!objA || !objB) return false;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (let key of keysA) {
    if (objA[key] !== objB[key]) return false;
  }
  return true;
}

export function withTracker(WrappedComponent, componentName) {
  const displayName =
    componentName ||
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    "Unknown";

  function TrackedComponent(props) {
    const { trackRender } = useTracker();
    const prevPropsRef = useRef(null);
    const isFirstRender = useRef(true);
    const renderStartRef = useRef(performance.now());

    renderStartRef.current = performance.now();

    let renderReason = "Initial render";
    if (!isFirstRender.current) {
      if (
        prevPropsRef.current !== null &&
        !shallowEqual(prevPropsRef.current, props)
      ) {
        renderReason = "Props changed";
      } else {
        renderReason = "Parent re-rendered";
      }
    }

    React.useEffect(() => {
      const renderTime = performance.now() - renderStartRef.current;
      trackRender(displayName, renderTime, renderReason);
      prevPropsRef.current = props;
      isFirstRender.current = false;
    });

    return React.createElement(WrappedComponent, props);
  }

  TrackedComponent.displayName = `Tracked(${displayName})`;
  return TrackedComponent;
}

export function useRenderTracker(componentName) {
  const { trackRender } = useTracker();
  const prevPropsRef = useRef(null);
  const isFirstRender = useRef(true);

  return { trackRender, isFirstRender, prevPropsRef };
}
