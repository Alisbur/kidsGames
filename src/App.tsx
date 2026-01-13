import styles from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import { MenuPage } from "./pages/Menu-page/Menu-page";
import { WordsPage } from "./pages/Words-page/Words-page";
import { Header } from "./components/Header/Header";
import { XOPage } from "./pages/XO-page/XO-page";
import { PjatnashkaPage } from "./pages/Pjatnashka-page/Pjatnashke-page";
import { CountPage } from "./pages/Count-page/Count-page";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/words" element={<WordsPage />} />
        <Route path="/xo" element={<XOPage />} />
        <Route path="/pjatnashka" element={<PjatnashkaPage />} />
        <Route path="/count" element={<CountPage />} />
      </Routes>
    </div>
  );
}

export default App;
