import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const SampleLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  )
}

export default SampleLayout
