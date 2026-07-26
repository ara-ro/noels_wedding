import { SenderProfileProvider } from './hooks/useSenderProfile'
import { useHashRoute } from './hooks/useHashRoute'
import { NavBar } from './components/NavBar'
import { Home } from './pages/Home'
import { CeremonyPage } from './pages/CeremonyPage'

function App() {
  const route = useHashRoute()

  return (
    <SenderProfileProvider>
      <NavBar current={route} />
      {route === 'ceremony' ? <CeremonyPage /> : <Home />}
    </SenderProfileProvider>
  )
}

export default App
