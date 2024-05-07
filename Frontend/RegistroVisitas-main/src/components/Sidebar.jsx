import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import { FiMap } from "react-icons/fi";

import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";


const NavItem = ({ icon, title, onClick, open }) => (
    <li
        className="text-white text-sm flex items-center gap-x-4 cursor-pointer 
        p-2 hover:bg-yellow-600 rounded-md mt-2"
        onClick={onClick}
    >
        <span className="block float-left text-2xl">{icon}</span>
        <span className={`block duration-100 ${open ? "visible" : "scale-0"}`}>
            <span className="text-lg">{title}</span>
        </span>
    </li>
);

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const { logout }= useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate("/");
    }
    
    return (
        <div className="flex">
            <div
                className={`bg-yellow-700 h-screen p-5  pt-8 ${open ? "w-56" : "w-20"
                    } duration-300 relative`}
            >
                <GoArrowLeft
                    className={`bg-white text-blue-ligth text-2xl rounded-full absolute -right-3 
                    top-9 border border-blue-ligth cursor-pointer ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />

                <div className="inline-flex">
                    <h1
                        className={`text-white origin-left font-bold text-2xl p-1 mr-2 ${!open && "scale-0"
                            }`}
                    >
                        Visit's Records
                    </h1>
                </div>

                <ul className="pt-2">
                    <NavItem
                        icon={<IoHomeOutline />}
                        onClick={() => navigate("/home")}
                        open={open}
                        title={"Home"}
                    />
                </ul>

                <ul className="pt-2">
                    <NavItem
                        icon={<MdOutlinePlace />}
                        onClick={() => navigate("/visitas")}
                        open={open}
                        title={"Mis visitas"}
                    />
                </ul>

                <ul className="pt-2">
                    <NavItem
                        icon={<FiMap />}
                        onClick={() => navigate("/mapa")}
                        open={open}
                        title={"Mapa"}
                    />
                </ul>

                <ul className="  absolute bottom-2 ">
                    <NavItem
                        icon={<CiLogout />}
                        onClick={ handleLogout }
                        open={open}
                        title={"Cerrar Sesion"}
                    />
                </ul>

            </div>
        </div>
    )
}

export default Sidebar