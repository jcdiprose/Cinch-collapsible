export interface CollapsibleProps {
  accordian?: boolean;
  timeout?: number;
  ease?: "ease" | "inOut" | "in" | "out" | number[];
  delay?: number;
}

export default function Collapsible(props: CollapsibleProps): JSX.Element;
