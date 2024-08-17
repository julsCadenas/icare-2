import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import Login from './pages/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Login/>
    </main>
  )
}

export default App
