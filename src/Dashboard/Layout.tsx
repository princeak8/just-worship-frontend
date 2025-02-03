import { Outlet } from 'react-router-dom';
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';

const Layout = () => {
    return (
        <section className="min-h-screen bg-gray-100 w-full fixed">
            <Sidebar />
            <div className="ml-20 p-6">
            <Header />  
            <div className='content w-full h-screen overflow-y-scroll pb-28'>
                <Outlet />
            </div>         
            </div>
        </section>
      );
}

export default Layout
