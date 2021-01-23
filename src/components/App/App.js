import { createContext, useState } from "react";
import "./App.css";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import CSV from "../CSV/CSV";
const CSVContext = createContext("");
function App() {
  const [files, setFiles] = useState();
  return (
    <CSVContext.Provider value={files}>
      <div className="App">
        <h1>Technical Test</h1>
        <DragAndDrop updateFiles={setFiles} />
        {files && <CSV context={CSVContext} />}
      </div>
    </CSVContext.Provider>
  );
}

export default App;
