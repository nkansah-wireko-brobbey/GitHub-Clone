import { Link } from 'react-router-dom'
import { IoHomeSharp } from 'react-icons/io5'
import { FaHeart } from 'react-icons/fa'
import { MdEditDocument, MdOutlineExplore } from 'react-icons/md'
import { PiSignInBold } from 'react-icons/pi';
import { Logout } from '../components/Logout'

export const Sidebar = () => {
  const authUser = false;

  return (
    <aside className="flex flex-col items-center min-w-12 sm:w-16 sticky top-0 left-0 h-screen py-8 overflow-y-auto border-r border-gray-800 w-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 text-white">
        <nav className="h-full flex flex-col gap-3">
          <Link to="/" className='flex justify-center'>
            <img className='h-8' src="/github.svg" alt="Github Logo" />
          </Link>
          <Link 
          to={'/'}
          className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'
          >
            <IoHomeSharp size={24} />
          </Link>
          {authUser && (
            <Link 
            to={'/likes'}
            className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'
            >
              <FaHeart size={24} />
            </Link>
          )}

            {
              authUser
              &&
              (
                <Link 
                to={'/explore'}
                className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'
                >
                 <MdOutlineExplore size={28} />
                </Link>
              )
            }

            {
              !authUser
              &&
              (
                <Link 
                to={'/login'}
                className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'
                >
                 <PiSignInBold size={25} />
                </Link>
              )
            }
            {
              !authUser
              &&
              (
                <Link 
                to={'/signup'}
                className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'
                >
                 <MdEditDocument size={25} />
                </Link>
              )
            }
            {
              !authUser
              &&
              (
               <div className='flex flex-col gap-2 mt-auto'>
                <Logout/>
               </div>
              )
            }

        </nav>
    </aside>
  )
}
