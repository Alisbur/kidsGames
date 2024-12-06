import styles from './App.module.css'
import { Routes, Route } from 'react-router-dom'
import { MenuPage } from './pages/Menu-page/Menu-page'
import { WordsPage } from './pages/Words-page/Words-page'
import { Header } from './components/Header/Header'

function App() {
  return (
  <div className={styles.App}>
    <Header />
    <Routes>
      <Route path='/' element={<MenuPage/>}/>
      <Route path='/words' element={<WordsPage />}/>
    </Routes>
  </div>
  )
}

export default App
