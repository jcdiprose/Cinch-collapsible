import React, { useState, useEffect, FunctionComponent } from "react";

export interface PanelProps {
  header: string | JSX.Element;
  id: string;
  timeout?: number;
  ease?: "ease" | "inOut" | "in" | "out" | number[];
  delay?: number;
  activePanel?: string;
  setActivePanel?: (panelId: string) => void;
  setActivePanelIds?: (panelIds: string) => void;
  panelId?: string;
  noPadding?: boolean;
  onChange?: (panel: string | number) => void;
  className?: string;
}

const Panel: FunctionComponent<PanelProps> = ({
  header,
  timeout,
  ease,
  delay,
  children,
  activePanel,
  setActivePanel,
  setActivePanelIds,
  panelId,
  noPadding,
  id,
  onChange,
  className,
}) => {
  const [showPanel, setShowPanel] = useState(false);
  const [animPanel, toggleAnimOpen] = useState(false);
  const [panelRef, setPanelRef] = useState<HTMLDivElement | null>(null);

  const touchDevice =
    navigator.maxTouchPoints || "ontouchstart" in document.documentElement;

  const triggerOnClick = () => {
    if (!touchDevice) triggerPanel();
  };

  const triggerPanel = () => {
    if (showPanel) {
      toggleAnimOpen(false);
      setTimeout(() => setShowPanel(false), timeout);
    } else {
      if (setActivePanel && panelId) {
        setActivePanel(panelId);
      }
      setShowPanel(true);
    }
    setActivePanelIds && setActivePanelIds(id);
  };

  useEffect(() => {
    if (panelId !== activePanel) {
      toggleAnimOpen(false);
      setTimeout(() => setShowPanel(false), timeout);
      if (showPanel && setActivePanelIds) setActivePanelIds(id);
    }
  }, [activePanel]);

  useEffect(() => {
    if (panelRef) toggleAnimOpen(true);
  }, [panelRef]);

  const cssEasing = () => {
    if (ease === "ease") {
      return "ease";
    } else if (ease === "inOut") {
      return "ease-in-out";
    } else if (ease === "in") {
      return "ease-in";
    } else if (ease === "out") {
      return "ease-out";
    } else if (Array.isArray(ease)) {
      return `cubic-bezier(${ease[0]}, ${ease[1]}, ${ease[2]}, ${ease[3]})`;
    }
  };

  let transition = `height ${timeout}ms ${cssEasing()} ${delay ? delay : ""}`;
  let styles = {};

  const height = panelRef ? `${panelRef.scrollHeight}px` : "0px";

  animPanel ? (styles = { transition, height }) : (styles = { transition });

  interface StylesInterface {
    padding?: string;
  }

  const headerStyles: StylesInterface = {};

  noPadding ? (headerStyles.padding = "0") : null;

  return (
    <>
      <div
        className={`cinch-collapsible__header ${className ? className : ""}`}
        onClick={triggerOnClick}
        onTouchEnd={triggerPanel}
        style={headerStyles}
      >
        {header}
      </div>
      {showPanel && (
        <div
          className={`cinch-collapsible__panel ${className ? className : ""}`}
          ref={(ref) => setPanelRef(ref)}
          style={styles}
        >
          <div className="cinch-collapsible__panel-content">{children}</div>
        </div>
      )}
    </>
  );
};

export default Panel;
