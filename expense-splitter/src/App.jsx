import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Groups from "./pages/Groups";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="groups" element={<Groups />} />
        <Route path="groups/:groupId" element={<Groups />} />
      </Route>
    </Routes>
  );
}