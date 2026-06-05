import { Route, Routes } from "react-router-dom";

import styles from "./App.module.scss";
import { PageErrorBoundary } from "./components/ErrorBoundary/PageErrorBoundary";
import { Header } from "./components/Header/Header";
import { ModalRoot } from "./components/Modals/ui/modal-root";
import { BallsPage } from "./pages/Balls-page/Balls-page";
import { ClockPage } from "./pages/Clock-page/Clock-page";
import { CountPage } from "./pages/Count-page/Count-page";
import { MenuPage } from "./pages/Menu-page/Menu-page";
import { MulTablePage } from "./pages/Mul-table-page/Mul-table-page";
// import { PjatnashkaPage } from "./pages/Pjatnashka-page/Pjatnashke-page";
import { PjatnashkaPicPage } from "./pages/Pjatnashka-pic-page/Pjatnashka-pic-page";
import { ShortStoriesPage } from "./pages/ShortStories-page/ShortStories-page";
import { TasksPage } from "./pages/Tasks-page/Tasks-page";
import { WordsPage } from "./pages/Words-page/Words-page";
import { XOPage } from "./pages/XO-page/XO-page";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route
          path="/words"
          element={
            <PageErrorBoundary>
              <WordsPage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/xo"
          element={
            <PageErrorBoundary>
              <XOPage />
            </PageErrorBoundary>
          }
        />
        {/* <Route
          path="/pjatnashka"
          element={
            <PageErrorBoundary>
              <PjatnashkaPage />
            </PageErrorBoundary>
          }
        /> */}
        <Route
          path="/pjatnashka-pic"
          element={
            <PageErrorBoundary>
              <PjatnashkaPicPage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/count"
          element={
            <PageErrorBoundary>
              <CountPage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/mul-table"
          element={
            <PageErrorBoundary>
              <MulTablePage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/balls"
          element={
            <PageErrorBoundary>
              <BallsPage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/stories"
          element={
            <PageErrorBoundary>
              <ShortStoriesPage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/clock"
          element={
            <PageErrorBoundary>
              <ClockPage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/tasks"
          element={
            <PageErrorBoundary>
              <TasksPage />
            </PageErrorBoundary>
          }
        />
      </Routes>
      <ModalRoot />
    </div>
  );
}

export default App;
