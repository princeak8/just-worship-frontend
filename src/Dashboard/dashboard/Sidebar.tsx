import { BoxIcon, ChartBarIcon, ChevronDown, ChevronLeft, Dot, HomeIcon, Power, SettingsIcon } from 'lucide-react'
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
          icon: <Dot size={30}/>
        },
        {
          name: 'About',
          path: '/dashboard/cms/about',
          icon: <Dot size={30}/>
        },
        {
          name: 'Team',
          path: '/dashboard/cms/team',
          icon: <Dot size={30}/>
        },
        {
          name: 'Store',
          path: '/dashboard/cms/store',
          icon: <Dot size={30}/>
        },
        {
          name: 'Events',
          path: '/dashboard/cms/events',
          icon: <Dot size={30}/>
        },
        {
          name: 'Contact',
          path: '/dashboard/cms/contact',
          icon: <Dot size={30}/>
        },
        {
          name: 'Giving',
          path: '/dashboard/cms/giving',
          icon: <Dot size={30}/>
        },
        {
          name: 'Gallery',
          path: '/dashboard/cms/gallery',
          icon: <Dot size={30}/>
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
    if(root.pathname.includes('cms')){
      setIsSubOpen(true)
    }
  },[])

  const logout = () => {
    Cookies.remove('token')
    return window.location.replace('/login')
  }

  return (
    <div>
      <div className="left-0 top-0 h-screen w-full bg-purple-500 text-white">
        <div className="flex flex-col space-y-2">
        <div className="inset-0 flex w-full justify-center bg-gradient-to-t from-purple-500 to-purple-900 p-4 px-2">

            <img src={Logo} alt='Logo' className='w-20' />
          </div>
          <nav className={`custom-scrollbar flex flex-col overflow-y-auto h-[88svh] justify-between `}>
            <div>
            {paths?.map((path: any, index: number) => (
              <section className={`grid `}>
              <Link to={path.path} key={index} className={`m-2 mx-2 p-4 px-2 hover:bg-purple-100 hover:text-purple-500 rounded-lg flex items-center gap-4 text-sm ${root.pathname === path.path && 'bg-[#FFD700] bg-opacity-50'}`}>
                <div onClick={() => { path?.sub && 
                  // setIsSubOpen(!isSubOpen) }} 
                  setIsSubOpen(true) }} 
                  className='flex gap-4'>{path.icon}<p>{path.name}</p></div>
                {path?.sub && ( isSubOpen ? <ChevronDown
                 onClick={() => { path?.sub && 
                  // setIsSubOpen(!isSubOpen) 
                  setIsSubOpen(true)
                }}/>
                  : <ChevronLeft onClick={() => { path?.sub && setIsSubOpen(!isSubOpen) }}/>)}
              </Link>
                {path?.sub && 
                <section className={`-mt-2 ${isSubOpen && 'bg-gradient-to-b from-purple-500 via-purple-700 to-purple-500 p-4 px-2'}`}>
                {path?.sub && isSubOpen && path?.sub.map((sub: any, index: number) => (
                  <Link to={sub.path} key={index} className={`p-2 hover:bg-purple-600 hover:text-[#FFD700] hover:font-bold rounded-lg flex items-center gap-4 p-4 text-sm ${root.pathname === sub.path && 'bg-purple-400 font-bold '}`} >
                    {sub.icon}<p>{sub.name}</p>
                  </Link>
                ))}
                </section>
                }
              </section>
            ))}
            </div>
            <div className={`m-2 mx-2 p-4 px-2 items-center gap-4 text-sm border-t`}>
              <p onClick={logout} className={`m-2 mx-2 p-4 px-2 hover:bg-purple-100 rounded-lg hover:text-purple-500 flex items-center gap-4 text-sm cursor-pointer`}>
              <Power /> Logout
              </p>
              </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
