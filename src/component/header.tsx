import { LogoIcon, MoonIcon } from '../assets/icons'
import avatar from "../assets/images/avatar.png";


const Header = () => {
  return (
    <header className="bg-[#373B53] flex lg:hidden flex-row justify-between items-center h-17 fixed top-0 left-0 w-full z-50 ">
        <div className="bg-primary h-full w-17 rounded-tr-2xl rounded-br-2xl items-center justify-center flex">
          <LogoIcon />
        </div>

        <div className=" flex flex-row items-center">
          <div className="py-5 px-6 ">
            <MoonIcon />
          </div>

          <span className=" w-0.5 h-17 bg-[#494E6E]" />

          <div className="px-6 py-5">
            <img className="h-8 w-8 rounded-3xl" src={avatar} alt="" />
          </div>
        </div>
      </header>
  )
}

export default Header