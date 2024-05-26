import { useNavigate } from 'react-router-dom';

type navItem ={
    id: number;
    text: string;
    to: string;
  }

  type Props ={
    navItems: navItem[];
  }

const Navbar = ({navItems}:Props) => {

    const navigate = useNavigate();
  // Array containing navigation items
  return (
    <div className='flex justify-between items-center h-20 w-auto border-b border-teal-400/50 mx-4 px-4 my-2  text-white'>
      {/* Logo */}
      <h1 className='w-full text-3xl font-bold text-teal-400'>Rentify</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <button
          onClick={()=>navigate(item.to)}
            key={item.id}
            className='p-4 hover:text-teal-400 rounded-xl m-2 cursor-pointer duration-300'
          >
            {item.text}
          </button>
        ))}
        <button
          onClick={()=>{
          localStorage.removeItem("token")
          navigate("/Signin")
          }}
            className='p-4 hover:text-teal-400 rounded-xl m-2 cursor-pointer duration-300'
          >Logout
          </button>
      </ul>
    </div>
  );
};

export default Navbar;