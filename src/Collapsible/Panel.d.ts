export interface PanelProps {
  header: string | JSX.Element;
  timeout?: number;
  ease?: "ease" | "inOut" | "in" | "out" | number[];
  delay?: number;
  activePanel?: string;
  setActivePanel?: (panelId: string) => void;
  panelId?: string;
  noPadding?: boolean;
}

export default function Panel(props: PanelProps): JSX.Element;
