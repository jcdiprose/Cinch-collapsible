import React from "react";
import ReactDom from "react-dom";

import { Panel, Collapsible } from "./Collapsible";

import { Done } from "./Done";

import "./base.scss";

const JsxHeader = () => (
  <div className="jsx-header-example">
    JSX Element Header <Done />
  </div>
);

const panelData = [
  {
    header: "String HEADER",
    id: "1",
    body: "String panel Body",
  },
  {
    header: "String HEADER",
    id: "2",
    body: "String panel Body",
  },
  {
    header: "String HEADER",
    id: "3",
    body: "String panel Body",
  },
];

const CollapsibleDemo = () => {
  const [openPanels, setOpenPanels] = React.useState<string[]>([]);
  return (
    <>
      <h1>With Accordian</h1>
      <Collapsible
        timeout={250}
        ease="ease"
        accordian
        onChange={(id) => setOpenPanels(id)}
        className="Custom-Collapse"
      >
        {panelData.map((panel) => (
          <Panel
            header={`${panel.header} ${
              openPanels.includes(panel.id) ? "OPEN" : ""
            }`}
            id={panel.id}
            key={panel.id}
            className="Custom-Collapse"
          >
            {panel.body}
          </Panel>
        ))}
      </Collapsible>
      <h1>Without Accordian</h1>
      <Collapsible timeout={250} ease="ease" onChange={(id) => console.log(id)}>
        <Panel header={JsxHeader()} id={"1"}>
          string panel body
        </Panel>
        <Panel header="String Header - Panel Two" id={"2"}>
          string panel body
        </Panel>
        <Panel header={<h1>Component Header - Panel Three</h1>} id={"3"}>
          <>
            <h1>Panel Body Component</h1>
            <p>Lorem ipsum Delerium</p>
          </>
        </Panel>
      </Collapsible>
    </>
  );
};

ReactDom.render(<CollapsibleDemo />, document.getElementById("collapse"));
