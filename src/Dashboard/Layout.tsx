import { Outlet } from 'react-router-dom';
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';

const Layout = () => {
    return (
        <section className="flex min-h-screen bg-gray-100 w-full fixed">
            <div className='w-2/12 h-screen border-r'>
                <Sidebar />
            </div>
            <div className=" p-6 w-full">
            <Header />  
            <div className='content w-full  h-screen overflow-y-scroll pb-28'>
                <Outlet />
            </div>         
            </div>
        </section>
      );
}

export default Layout
