import { LogoIcon, MoonIcon } from '../assets/icons'
import avatar from "../assets/images/avatar.png";


const SideHeader = () => {
  return (
    <header className="bg-[#373B53] hidden lg:flex flex-col justify-between items-center h-screen w-17 rounded-tr-2xl rounded-br-2xl fixed left-0 top-0 z-50">
        <div className="bg-primary h-17 w-17 rounded-tr-2xl rounded-br-2xl items-center justify-center flex">
          <LogoIcon />
        </div>

        <div className=" flex flex-col items-center">
          <div className="py-5 px-4 ">
            <MoonIcon />
          </div>

          {/* <span className=" w-0.5 h-17 bg-[#494E6E]" /> */}

          <div className="px-4 py-5">
            <img className="h-8 w-8 rounded-3xl" src={avatar} alt="" />
          </div>
        </div>
      </header>
  )
}

export default SideHeader