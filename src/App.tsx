import { Map } from './components/Map'
import { config } from './config'

export default function App() {
  return (
    <div>
      <h1></h1>
      <Map apiUrl={config.VITE_API_URL} />
    </div>
  )
}
