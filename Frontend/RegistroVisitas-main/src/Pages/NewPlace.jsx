import { useContext, useState } from "react"
import { constants } from "../helpers/constants";
import { useNavigate } from "react-router-dom";
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import NewLocation from "./NewLocation";

const NewPlace = () => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState('');
    const [ location, setLocation ] = useState({
        latitude: 0,
        longitude: 0
    });
    const { refreshToken } = useContext(AuthContext);
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const [newPlace, setNewPlace] = useState({
        placeName: '',
        description: '',
        rating: 0,
        latitude: '',
        longitude: '',
    });

    const navigate = useNavigate();

    const { API_URL } = constants();

    const handleRating = (currentRating) => {
        setRating(currentRating);
        setNewPlace({ ...newPlace, rating: currentRating });
        // console.log(currentRating);

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            if (newPlace.latitude === '' || newPlace.longitude === '')
                return alert('Por favor, selecciona una ubicacion en el mapa');

            const response = await fetch(`${ API_URL }/api/place`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlace)
            });

            if (!response.ok) {
                throw new Error('Error al añadir la visita');
            }

            alert((await response.json()).message);

            setNewPlace(newPlace);
            navigate('/visitas');

        } catch (error) {
            console.log(error);
        }
    }

    const onLocationChange = (location) => {
        // console.log(location);
        setLocation(location);
        setNewPlace({ ...newPlace, latitude: location.latitude.toString(), longitude: location.longitude.toString() });
        // console.log(newPlace);
    }

    return (
        <div className="flex bg-yellow-700">

            <div className="flex flex-col justify-center items-center p-3 w-full h-full md:h-screen overflow-y-scroll">

                <div className="container flex flex-col justify-center items-center shadow-2xl bg-yellow-600 rounded-xl p-4">

                    <h1 className="text-3xl text-white font-bold mb-6">Registra tu Visita</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-blue-ligth rounded-md w-7/12 p-6">
                        <div className="flex flex-col mb-4">
                            <label className="text-white font-semibold mb-2">
                                Nombre del lugar
                            </label>
                            <input
                                className="border-2 w-full p-2 placeholder-gray-600 rounded-md"
                                type="text"
                                placeholder="Nombre del lugar"
                                value={newPlace.placeName}
                                onChange={(e) => setNewPlace({ ...newPlace, placeName: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col mb-4">
                            <label className="text-white font-semibold mb-2">Descripcion</label>
                            <input
                                className="border-2 w-full p-2 placeholder-gray-600 rounded-md"
                                type="text"
                                placeholder="Descripcion del lugar"
                                value={newPlace.description}
                                onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })}
                            />
                        </div>

                        <div className="flex">
                            <label className="text-white font-semibold mr-2 mb-2">
                                Calificacion
                            </label>
                            {[...Array(5)].map((_, i) => {
                                const currentRating = i + 1;
                                return (
                                    <label key={i}>

                                        <input
                                            type="radio"
                                            name="rating"
                                            style={{ display: 'none' }}
                                            value={currentRating}
                                            onClick={ () => handleRating(currentRating) }
                                        />
                                        {currentRating <= (hover || rating) ? (
                                            <MdOutlineStar
                                                className="cursor-pointer text-2xl text-white ml-1 mr-1"
                                                onMouseEnter={ () => setHover(currentRating) }
                                                onMouseLeave={ () => setHover(0) }
                                            />
                                        ) : (
                                            <MdOutlineStarBorder
                                                className="cursor-pointer text-2xl text-white ml-1 mr-1"
                                                onMouseEnter={ () => setHover(currentRating) }
                                                onMouseLeave={ () => setHover(0) }
                                            />
                                        )}
                                    </label>
                                );
                            })}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label className="text-white font-semibold mb-2">
                                Ingresa las coordenadas
                            </label>
                            <div>
                                <input
                                    className="border-2 w-full p-2 placeholder-gray-600 rounded-md"
                                    type="text"
                                    placeholder="Latitud"
                                    value={newPlace.latitude}
                                    onChange={(e) => setNewPlace({ ...newPlace, latitude: e.target.value })}
                                    disabled
                                />
                                <input
                                    className="border-2 w-full p-2 mt-6 placeholder-gray-600 rounded-md"
                                    type="text"
                                    placeholder="Longitud"
                                    value={newPlace.longitude}
                                    onChange={(e) => setNewPlace({ ...newPlace, longitude: e.target.value })}
                                    disabled
                                />
                            </div>
                        </div>

                        {/* div de 600px */}
                        <div className="flex justify-center content-center">
                            <div className="w-96 h-96 ">
                                <NewLocation onAddLocation={ onLocationChange } />
                            </div>
                        </div>


                        <div className="text-white mt-3 flex items-center justify-center">
                            <button type="submit" className="bg-yellow-700 rounded-md p-2">
                                Registrar Visita
                            </button>

                            <span
                                className="bg-yellow-700 rounded-md p-2 ml-7 cursor-pointer"
                                onClick={() => navigate("/home")}
                            >
                                Cancelar
                            </span>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default NewPlace