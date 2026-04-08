import { Route, Routes } from "react-router-dom";

import styles from "./App.module.scss";
import { Header } from "./components/Header/Header";
import { ModalRoot } from "./components/Modals/ui/modal-root";
import { BallsPage } from "./pages/Balls-page/Balls-page";
import { CountPage } from "./pages/Count-page/Count-page";
import { MenuPage } from "./pages/Menu-page/Menu-page";
import { PjatnashkaPage } from "./pages/Pjatnashka-page/Pjatnashke-page";
import { WordsPage } from "./pages/Words-page/Words-page";
import { XOPage } from "./pages/XO-page/XO-page";

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
        <Route path="/balls" element={<BallsPage />} />
      </Routes>
      <ModalRoot />
    </div>
  );
}

export default App;
