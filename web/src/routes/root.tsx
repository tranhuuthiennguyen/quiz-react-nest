import { Link, Outlet } from 'react-router-dom'

export const Root = () => {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <nav className='fixed top-0  bg-primary flex justify-center h-14 w-screen shadow-lg'>
          <ul className='flex flex-wrap justify-between w-32 m-auto'>
            <li>
              <Link to={'home'}>Home</Link>
            </li>
            <li>
              <Link to={'quiz'}>Quiz</Link>
            </li>
          </ul>
        </nav>
        <div className='bg-[#d1d1d1] min-h-screen pt-14'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
