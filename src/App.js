
import { Routes, Route } from "react-router-dom";

import Home4 from "./pages/Home4";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home4/>}/>
    </Routes>
  );
}

export default App;
