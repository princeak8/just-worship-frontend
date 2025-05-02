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
  const root = useLocation();
  const [isSubOpen, setIsSubOpen] = useState(true)

  useEffect(() => {
    if (root.pathname.includes('cms')) {
      setIsSubOpen(true)
    }
  }, [])

  const logout = () => {
    Cookies.remove('token')
    return window.location.replace('/login')
  }

  return (
    <div>
      <div className="left-0 top-0 h-screen w-full text-black ">
        <div className="flex flex-col space-y-2">
          <div className="inset-0 flex justify-center border-b border-b-black py-4 px-2 bg-black">

            <img src={Logo} alt='Logo' className='w-20' />
          </div>
          <nav className={`custom-scrollbar flex flex-col overflow-y-auto h-[82svh] justify-between `}>
            <div>
              {paths?.map((path: any, index: number) => (
                <section className={`grid `}>
                  <Link to={path.path} key={index} className={`m-2 mx-2 p-4 px-2 hover:bg-yellow-50 hover:text-[#BA833C] rounded-lg flex items-center gap-4 text-sm ${root.pathname === path.path && 'bg-[#FFD700] bg-opacity-50'}`}>
                    <div onClick={() => {
                      path?.sub &&
                      // setIsSubOpen(!isSubOpen) }} 
                      setIsSubOpen(true)
                    }}
                      className='flex gap-4'>{path.icon}<p>{path.name}</p></div>
                    {path?.sub && (isSubOpen ? <ChevronDown
                      onClick={() => {
                        path?.sub &&
                        // setIsSubOpen(!isSubOpen) 
                        setIsSubOpen(true)
                      }} />
                      : <ChevronLeft onClick={() => { path?.sub && setIsSubOpen(!isSubOpen) }} />)}
                  </Link>
                  {path?.sub &&
                    <section className={`-mt-2 ${isSubOpen && 'p-4 px-2'}`}>
                      {path?.sub && isSubOpen && path?.sub.map((sub: any, index: number) => (
                        <Link to={sub.path} key={index} className={`p-2 hover:bg-yellow-50 hover:text-[#BA833C] hover:font-bold rounded-lg flex items-center gap-4 p-4 text-sm ${root.pathname === sub.path && 'bg-[#FFD700] bg-opacity-50 font-bold '}`} >
                          {sub.icon}<p>{sub.name}</p>
                        </Link>
                      ))}
                    </section>
                  }
                </section>
              ))}
            </div>
          </nav>
          <div className={`  px-2 items-center gap-4 text-sm bg-black text-white`}>
            <p onClick={logout} className={`my-2 p-4 px-2 hover:bg-gray-900 rounded-lg hover:text-red-500 flex items-center gap-4 text-sm cursor-pointer`}>
              <Power /> Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
