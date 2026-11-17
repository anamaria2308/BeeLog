import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import StupiPage from "./pages/StupiPage.jsx";
import StupDetaliuPage from "./pages/StupDetaliuPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RaportPage from "./pages/RaportPage.jsx";

// Harta rutelor. Layout inconjoara fiecare pagina.
// Ruta de detaliu foloseste resursa din tw.json: /stupi/:id
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<StupiPage />} />
        <Route path="/stupi/:id" element={<StupDetaliuPage />} />
        <Route path="/raport" element={<RaportPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
