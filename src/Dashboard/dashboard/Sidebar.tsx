import { BoxIcon, ChevronDown, ChevronLeft, Dot, HomeIcon, Power, SettingsIcon } from 'lucide-react'
import Logo from '@/public/logo.png'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export const paths = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <HomeIcon />
  },
  // {
  //   name: 'Report and Analysis',
  //   path: '/dashboard/report',
  //   icon: <ChartBarIcon />
  // },
  {
    name: 'Content Management',
    path: '#',
    icon: <BoxIcon />,
    sub: [
      {
        name: 'Home',
        path: '/dashboard/cms/home',
        icon: <Dot size={30} />
      },
      {
        name: 'About',
        path: '/dashboard/cms/about',
        icon: <Dot size={30} />
      },
      {
        name: 'Team',
        path: '/dashboard/cms/team',
        icon: <Dot size={30} />
      },
      {
        name: 'Store',
        path: '/dashboard/cms/store',
        icon: <Dot size={30} />
      },
      {
        name: 'Events',
        path: '/dashboard/cms/events',
        icon: <Dot size={30} />
      },
      {
        name: 'Contact',
        path: '/dashboard/cms/contact',
        icon: <Dot size={30} />
      },
      {
        name: 'Giving',
        path: '/dashboard/cms/giving',
        icon: <Dot size={30} />
      },
      {
        name: 'Gallery',
        path: '/dashboard/cms/gallery',
        icon: <Dot size={30} />
      },
      {
        name: 'Live',
        path: '/dashboard/cms/live',
        icon: <Dot size={30} />
      },
      {
        name: 'Messages',
        path: '/dashboard/cms/messages',
        icon: <Dot size={30} />
      },
    ]
  },
  {
    name: 'Settings',
    path: '/dashboard/setting',
    icon: <SettingsIcon />
  },
]

const Sidebar = () => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>('Content Management')

  useEffect(() => {
    if (location.pathname.includes('cms')) {
      setOpenSubmenu('Content Management')
    }
  }, [location.pathname])


  const logout = () => {
    Cookies.remove('token')
    return window.location.replace('/login')
  }

  return (
    <div className="h-screen bg-gray-900 text-gray-300 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <img  loading="lazy" src={Logo} alt='Logo' className='w-32' />
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {paths.map((item) => (
          <div key={item.name} className="mb-2">
            <Link
              to={item.path}
              // onClick={() => item.sub && setOpenSubmenu(
              //   openSubmenu === item.name ? null : item.name
              // )}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors
                ${location.pathname === item.path ? 'bg-amber-600 text-white' : ''}
                ${!item.sub ? 'hover:bg-gray-800' : ''}`
              }
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              {item.sub && (
                openSubmenu === item.name ? (
                  <ChevronDown className="w-4 h-4 transform transition-transform" />
                ) : (
                  <ChevronLeft className="w-4 h-4 transform transition-transform" />
                )
              )}
            </Link>

            {item.sub && openSubmenu === item.name && (
              <div className="ml-8 mt-1 space-y-2">
                {item.sub.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`flex items-center gap-2 p-2 text-sm rounded-lg transition-colors
                      ${location.pathname === subItem.path 
                        ? 'text-amber-400 font-medium' 
                        : 'hover:bg-gray-800 text-gray-400'}`
                    }
                  >
                    <Dot size={20} className="text-current" />
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 p-3 text-sm font-medium
            text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Power className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar

