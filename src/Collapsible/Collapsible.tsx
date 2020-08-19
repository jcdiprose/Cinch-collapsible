import React, {
  FunctionComponent,
  useState,
  ReactNode,
  ReactElement,
  useEffect,
} from "react";
import uniqid from "uniqid";

import "./Collapsible.scss";

interface CollapsibleInterface {
  accordian?: boolean;
  timeout?: number;
  ease?: "ease" | "inOut" | "in" | "out" | number[];
  delay?: number;
  onChange?: (panel: string[]) => void;
  className?: string;
}

const allArePanel = (children: any) => {
  if (Array.isArray(children)) {
    return children.every((child) => child.type.name === "Panel");
  }
  return children.type.name === "Panel";
};

const easeArrayFormat = (array: number[]) => {
  return (
    array.every((item: number) => item <= 1 && item > 0) && array.length === 4
  );
};

const Collapsible: FunctionComponent<CollapsibleInterface> = ({
  accordian,
  timeout = 350,
  ease = "ease",
  delay = 0,
  children,
  onChange,
  className,
}) => {
  const [activePanel, setActivePanel] = useState(null);
  const [activePanelIds, updateActivePanelIds] = useState<string[]>([]);
  const [childIds] = useState<string[]>(
    Array.isArray(children) ? children.map(() => uniqid("panel-")) : [""]
  );

  // if (!allArePanel(children)) {
  //   throw new Error("Collapsible can only accept <Panel> components");
  // }

  if (Array.isArray(ease) && !easeArrayFormat(ease)) {
    throw new Error(
      "Ease array should be four values between 0 & 1 https://cubic-bezier.com/"
    );
  }

  useEffect(() => onChange && onChange(activePanelIds), [activePanelIds]);

  const setActivePanelIds = (id: string) => {
    /* @ts-ignore */
    const shouldRemove = activePanelIds.includes(id);

    if (shouldRemove) {
      updateActivePanelIds(
        /* @ts-ignore */
        activePanelIds.filter((curId: string) => curId !== id)
      );
    } else {
      /* @ts-ignore */
      updateActivePanelIds(activePanelIds.concat([id]));
    }
  };

  if (Array.isArray(children) && children[0])
    if (children && Array.isArray(children)) {
      return (
        <div className={`cinch-collapsible ${className ? className : ""}`}>
          {children.map((child, i) => {
            if (accordian && React.isValidElement(child)) {
              return (
                <React.Fragment key={childIds[i]}>
                  {React.cloneElement(child, {
                    activePanel,
                    setActivePanel,
                    setActivePanelIds,
                    timeout,
                    ease,
                    delay,
                    panelId: childIds[i],
                  })}
                </React.Fragment>
              );
            }
            if (React.isValidElement(child)) {
              return (
                <React.Fragment key={childIds[i]}>
                  {React.cloneElement(child, {
                    timeout,
                    ease,
                    delay,
                    setActivePanelIds,
                  })}
                </React.Fragment>
              );
            }
          })}
        </div>
      );
    }
  return <div className="cinch cinch-collapsible">{children}</div>;
};

export default Collapsible;
