import { FiEyeOff } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { constants } from "../helpers/constants";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = async (e) => {

    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const [loginForm, setLogin] = useState({
    userName: '',
    password: ''
  });


  const { API_URL } = constants();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
      });
      
      
      if (!response.ok) {
        throw new Error('Error en el inicio de sesion')
      }
      const result = await response.json();
      login(result.data);
      console.log(result);
      navigate('/home');

    } catch (error) {
      console.log(error)
    }

  }

  return (

    <div className="flex justify-center items-center antialiased bg-yellow-600 h-screen">
      <div className="flex flex-col justify-center items-center bg-yellow-700 antialiased  rounded-md p-8">
        {/* TITULO */}
        <h1 className="font-bold text-2xl text-gray-200">Inicio de Sesión</h1>

        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-600 outline-none px-8 py-1 rounded-lg"
                placeholder="Username"
                value={loginForm.userName}
                onChange={(e) => setLogin({ ...loginForm, userName: e.target.value })}
              />
              <FaRegUser className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            <div className="relative mt-7">
              <CiLock className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-600 outline-none px-8 py-1 rounded-lg"
                placeholder="Contraseña"
                value={loginForm.password}
                onChange={(e) => setLogin({ ...loginForm, password: e.target.value })}
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
              onClick={() => navigate("/registro")}
              className="flex justify-center items-center shadow-2xl rounded-lg text-white 
            text-sm mt-1 px-24 p-1 hover:font-bold hover:underline">
              Registrarme
            </button>

            <button
              type="submit"
              className="bg-gray-200 text-yellow-700 font-bold rounded-xl w-full uppercase mt-5 p-1 
                 hover:text-gray-600 cursor-pointer"
            >
              Iniciar Sesión
            </button>

          </form>
        </div>

      </div>
    </div>

  )
}

export default Login;
