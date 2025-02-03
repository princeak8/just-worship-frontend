import { BoxIcon, ChartBarIcon, HomeIcon, SettingsIcon } from 'lucide-react'
import Logo from '@/public/logo.png'

const Sidebar = () => {
  return (
    <div>
      <div className="fixed left-0 top-0 h-full w-20 bg-purple-500 text-white p-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="rounded-full" >
            <img src={Logo} alt='Logo' className='w-20' />
          </div>
          <nav className="flex flex-col items-center space-y-6">
            <button className="p-2 hover:bg-cyan-600 rounded-lg">
              <HomeIcon />
            </button>
            <button className="p-2 hover:bg-cyan-600 rounded-lg">
              <ChartBarIcon />
            </button>
            <button className="p-2 hover:bg-cyan-600 rounded-lg">
              <BoxIcon />
            </button>
            <button className="p-2 hover:bg-cyan-600 rounded-lg">
              <SettingsIcon />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
