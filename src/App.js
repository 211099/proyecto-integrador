
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Home3 from "./pages/Home3";
import Home4 from "./pages/Home4";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home4/>}/>
    </Routes>
  );
}

export default App;
