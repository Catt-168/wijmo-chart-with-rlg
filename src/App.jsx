import { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

import Pie from "./components/Pie";

let flag = false;
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const origianlLayouts = JSON.parse(localStorage.getItem("layouts")) || "{}";
const originalItem = [
  { i: "1", x: 0, y: 0, w: 5, h: 3 },
  { i: "2", x: 5, y: 0, w: 4, h: 3 },
  { i: "3", x: 9, y: 0, w: 3, h: 3 },
];
const jsonItems = JSON.parse(localStorage.getItem("items"));
const originalItems = !flag
  ? jsonItems
    ? jsonItems
    : originalItem
  : originalItem;
function App() {
  const [layouts, setLayouts] = useState(origianlLayouts);
  const [isEditable, setIsEditable] = useState(false);
  const [items, setItems] = useState(originalItems);
  function handleEditable() {
    setIsEditable((prev) => !prev);
  }
  function handleSave() {
    alert("Layouts & Items saved in LocalStorage");
    localStorage.setItem("layouts", JSON.stringify(layouts));
    localStorage.setItem("items", JSON.stringify(items));
  }
  function handleLayoutChange(layout, layouts) {
    setLayouts(layouts);
  }
  function handleReset() {
    localStorage.clear();
    console.log(localStorage.getItem("items"));
    console.log(localStorage.getItem("layouts"));
    setTimeout(() => {
      setLayouts([]);
      setItems(originalItem);
    }, 50);
  }
  function handleRemove(i) {
    flag = true;
    setItems((items) => items.filter((item) => item.i !== i));
  }

  return (
    <div>
      <button
        onClick={handleEditable}
        className="btn btn-primary btn-sm"
        style={{ margin: 10 }}
      >
        Editable
      </button>
      <button
        onClick={handleSave}
        className="btn btn-success btn-sm"
        style={{ margin: 10 }}
      >
        Save
      </button>
      <button
        onClick={handleReset}
        className="btn btn-warning btn-sm"
        style={{ margin: 10 }}
      >
        Reset
      </button>

      <ResponsiveReactGridLayout
        className="layout"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={150}
        layouts={layouts}
        isResizable={isEditable}
        isDraggable={isEditable}
        style={{
          border: "1px dashed black",
        }}
        onLayoutChange={handleLayoutChange}
      >
        {items.map(({ i, x, y, w, h }) => (
          <div
            key={i}
            data-grid={{ x, y, w, h }}
            style={{ border: "1px solid black" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{i}</span>
              {isEditable && (
                <span
                  style={{
                    marginRight: 10,
                    fontSize: 30,
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemove(i)}
                >
                  x
                </span>
              )}
            </div>
            <Pie />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default App;
