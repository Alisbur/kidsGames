import { Route, Routes } from "react-router-dom";

import styles from "./App.module.scss";
import { PageErrorBoundary } from "./components/ErrorBoundary/PageErrorBoundary";
import { ModalRoot } from "./components/Modals/ui/modal-root";
import { BallsPage } from "./pages/Balls-page/Balls-page";
import { ClockPage } from "./pages/Clock-page/Clock-page";
import { CountPage } from "./pages/Count-page/Count-page";
import { LettersLearningPage } from "./pages/Letters-learning-page/Letters-learning-page";
import { LettersArrangePage } from "./pages/LettersArrange-page/LettersArrange-page";
import { MenuPage } from "./pages/Menu-page/Menu-page";
import { MulTablePage } from "./pages/Mul-table-page/Mul-table-page";
import { NumsArrangePage } from "./pages/NumsArrangePage/NumsArrangePage";
import { PjatnashkaPicPage } from "./pages/Pjatnashka-pic-page/Pjatnashka-pic-page";
import { ShortStoriesPage } from "./pages/ShortStories-page/ShortStories-page";
import { TasksPage } from "./pages/Tasks-page/Tasks-page";
import { TranslationArrangePage } from "./pages/TranslationArrangePage/TranslationArrangePage";
import { WordPartsEngPage } from "./pages/WordPartsEng-page/word-parts-eng-page";
import { WordPartsRusPage } from "./pages/WordPartsRus-page/word-parts-rus-page";
import { XOPage } from "./pages/XO-page/XO-page";
import { useFontsReady } from "./shared/hooks/use-fonts-ready";
import { AppLoader } from "./shared/ui/app-loader/app-loader";
import { OrientationBlocker } from "./shared/ui/orientation-blocker/orientation-blocker";

function App() {
  const fontsReady = useFontsReady();

  if (!fontsReady) return <AppLoader title={"Загрузка"} />;

  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route
          path="/xo"
          element={
            <PageErrorBoundary>
              <XOPage />
            </PageErrorBoundary>
          }
        />
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
        <Route
          path="/eng-words-arrange"
          element={
            <PageErrorBoundary>
              <TranslationArrangePage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/letters-arrange"
          element={
            <PageErrorBoundary>
              <LettersArrangePage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/nums-arrange"
          element={
            <PageErrorBoundary>
              <NumsArrangePage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/eng-alphabet"
          element={
            <PageErrorBoundary>
              <LettersLearningPage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/word-parts-rus"
          element={
            <PageErrorBoundary>
              <WordPartsRusPage />
            </PageErrorBoundary>
          }
        />
        <Route
          path="/word-parts-eng"
          element={
            <PageErrorBoundary>
              <WordPartsEngPage />
            </PageErrorBoundary>
          }
        />
      </Routes>
      <ModalRoot />
      <OrientationBlocker />
    </div>
  );
}

export default App;
