import { SenderProfileProvider } from './hooks/useSenderProfile'
import { useHashRoute } from './hooks/useHashRoute'
import { NavBar } from './components/NavBar'
import { FloatingMenu } from './components/FloatingMenu'
import { Home } from './pages/Home'
import { CeremonyPage } from './pages/CeremonyPage'

function App() {
  const route = useHashRoute()

  return (
    <SenderProfileProvider>
      <NavBar current={route} />
      {route === 'ceremony' ? <CeremonyPage /> : <Home />}
      <FloatingMenu />
    </SenderProfileProvider>
  )
}

export default App
