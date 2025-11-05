import { Suspense } from 'react'
import './App.css'
import { AppProviders } from './providers'
import Loader from './components/ui/Loader'
import { RouterConfig } from './routes/RouterConfig'

function App() {

  return (
    <AppProviders>
      <Suspense fallback={<Loader />}>
        <RouterConfig />
      </Suspense>
    </AppProviders>
  )
}

export default App
