import { FiEyeOff } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { CiLock } from "react-icons/ci";
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { constants } from "../helpers/constants";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = async (e) => {

    setShowPassword(!showPassword);
  };

  const { login } = useContext(AuthContext);

  const { API_URL } = constants();

  const navigate = useNavigate();

  const [register, setRegister] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(register)
      });

      if (!response.ok) {
        throw new Error('Error al refistrarse')
      }

      const result = await response.json();

      login(result.data);

      navigate('/home')

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="flex justify-center items-center antialiased bg-yellow-600 h-screen">

      <div className="flex flex-col justify-center items-center px-16 shadow-2xl bg-yellow-700 antialiased rounded-md p-8">
        {/* TITULO */}
        <h1 className="font-bold text-2xl text-gray-200">Regístrate</h1>

        <div className="mt-4">
          <form onSubmit={handleSubmit}>

            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-600 outline-none px-8 py-2 rounded-lg"
                placeholder="Username"
                value={register.userName}
                onChange={(e) => setRegister({ ...register, userName: e.target.value })}
              />
              <FaRegUser className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>


            <div className="relative mt-7">
              <input
                type="text"
                className="w-full border border-gray-600 outline-none px-8 py-2 rounded-lg"
                placeholder="Correo Electrónico"
                value={register.email}
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
              />
              <MdOutlineEmail className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            <div className="relative mt-7">
              <CiLock className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-600 outline-none px-8 py-2 rounded-lg"
                placeholder="Contraseña"
                value={register.password}
                onChange={(e) => setRegister({ ...register, password: e.target.value })}
              />
              {showPassword ? (
                <LuEye
                  onClick={handleShowPassword}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                />
              ) : (
                <FiEyeOff
                  onClick={handleShowPassword}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-gray-200 text-yellow-700 font-semibold rounded-xl w-full uppercase mt-5 p-2 
                 hover:text-gray-600 cursor-pointer"
            >
              Registrarme
            </button>

          </form>
        </div>

      </div>
    </div>

  )
}

export default Register