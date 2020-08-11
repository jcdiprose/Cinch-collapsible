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

const CollapsibleDemo = () => (
  <>
    <Collapsible timeout={250} ease="ease" accordian>
      <Panel header="String Header - Panel One">
        String header, string panel body
      </Panel>
      <Panel header="String Header - Panel Two">
        String header, string panel body
      </Panel>
      <Panel header="String Header - Panel Three">
        String header, string panel body
      </Panel>
      <Panel header={<JsxHeader />} noPadding>
        <h1>Jsx body</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          egestas mattis finibus. Suspendisse tincidunt eros feugiat enim
          pulvinar, quis finibus nunc rutrum. Suspendisse erat urna, bibendum
          nec eros ut, cursus imperdiet ipsum.
        </p>
        <p>
          Nunc volutpat arcu sed nibh egestas, nec fringilla turpis venenatis.
          Nulla ut mauris cursus, pharetra neque nec, dignissim nisl. Cras
          sollicitudin lacus urna, at eleifend augue accumsan id. Fusce eu justo
          finibus ipsum euismod fringilla a in enim. Curabitur varius libero sit
          amet ex lacinia sollicitudin. Donec eleifend nisi et lorem
          consectetur, ac sodales leo aliquam.
        </p>
      </Panel>
    </Collapsible>
    <h1>No Accordian</h1>
    <Collapsible timeout={250} ease="ease">
      <Panel header="String Header - Panel One">
        String header, string panel body
      </Panel>
      <Panel header="String Header - Panel Two">
        String header, string panel body
      </Panel>
      <Panel header="String Header - Panel Three">
        String header, string panel body
      </Panel>
    </Collapsible>
  </>
);

ReactDom.render(<CollapsibleDemo />, document.getElementById("collapse"));
