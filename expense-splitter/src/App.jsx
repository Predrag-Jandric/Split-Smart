import { BrowserRouter, Route, Routes } from "react-router-dom";
// components
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Friends from "./pages/Friends";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="groups" element={<Groups />} />
          <Route path="groups/:groupId" element={<Groups/>} />
          <Route path="friends" element={<Friends />} />
          <Route path="friends/:friendName" element={<Friends />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
