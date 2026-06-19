import { useState } from "react";

function Panel({ title, isOpen, onOpen }) {
  return (
    <div>
      <button onClick={onOpen}>{title}</button>
      {isOpen && <p>{title} Content</p>}
    </div>
  );
}

export default function App() {
  const [activePanel, setActivePanel] = useState("A");

  return (
    <>
      <Panel
        title="Panel A"
        isOpen={activePanel === "A"}
        onOpen={() => setActivePanel("A")}
      />
      <Panel
        title="Panel B"
        isOpen={activePanel === "B"}
        onOpen={() => setActivePanel("B")}
      />
    </>
  );
}