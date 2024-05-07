import { useContext, useEffect, useState } from "react";
import Card from "../components/Card"
import { Title } from "../components/Title"
import { AuthContext } from "../context/AuthContext";
import { constants } from "../helpers/constants";

const Visits = () => {

  const [ places, setPlaces ] = useState([])
  const { refreshToken } = useContext(AuthContext);
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const { API_URL } = constants();

  const allPlaces = async () => {

    try {

      const response = await fetch(`${ API_URL }/api/place`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
          throw new Error('Error al cargar las visitas...');
      }

      const res = await response.json();

      setPlaces(res.data);

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  useEffect(() => {

    // setPlaces(getPlaces)
    // refreshToken();
    allPlaces();

  }, []);

  return (
    <div>
        <Title>
            Mis Visitas
        </Title>

        <div className="flex flex-col gap-2 md:h-lvh overflow-y-scroll">
          {
            places.map((place) => <Card key={ place.id } { ...place }/>)
          }
        </div>
    </div>
  )
}

export default Visits
