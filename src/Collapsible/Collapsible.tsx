import React, {
  FunctionComponent,
  useState,
  ReactNode,
  ReactElement,
} from "react";
import uniqid from "uniqid";

import "./Collapsible.scss";

interface ContainerInterface {
  accordian?: boolean;
  timeout?: number;
  ease?: "ease" | "inOut" | "in" | "out" | number[];
  delay?: number;
}

interface PanelExtendedProps {
  timeout?: number;
  ease?: "ease" | "inOut" | "in" | "out" | number[];
  delay?: number;
  activePanel?: string;
  setActivePanel?: (panelId: string) => void;
  panelId?: string;
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

const Container: FunctionComponent<ContainerInterface> = ({
  accordian,
  timeout = 350,
  ease = "ease",
  delay = 0,
  children,
}) => {
  const [activePanel, setActivePanel] = useState(null);
  const [childIds] = useState<string[]>(
    Array.isArray(children) ? children.map(() => uniqid("panel-")) : [""]
  );

  if (!allArePanel(children)) {
    throw new Error("Collapsible can only accept <Panel> components");
  }

  if (Array.isArray(ease) && !easeArrayFormat(ease)) {
    throw new Error(
      "Ease array should be four values between 0 & 1 https://cubic-bezier.com/"
    );
  }

  if (Array.isArray(children) && children[0])
    if (children && Array.isArray(children)) {
      return (
        <div className="cinch-collapsible">
          {children.map((child, i) => {
            if (accordian && React.isValidElement(child)) {
              return (
                <React.Fragment key={childIds[i]}>
                  {React.cloneElement(child, {
                    activePanel,
                    setActivePanel,
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

export default Container;
