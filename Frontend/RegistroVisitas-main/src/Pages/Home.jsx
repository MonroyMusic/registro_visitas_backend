import { useNavigate } from "react-router-dom"
import { Title } from "../components/Title"

export const Home = () => {

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/nuevaVisita');
  }

  return (
    <div className="items-center p-4 text-white">
      <Title>
        Registra tu Visita
      </Title>

      <p className="text-center mt-10 text-white bg-yellow-700 rounded-s-full p-6 font-light shadow-2xl">
        Visit's Records es una aplicación móvil diseñada para ayudarte a registrar y gestionar tus visitas de manera eficiente.
        Ya sea que estés haciendo turismo, realizando inspecciones de campo o simplemente siguiendo una ruta, Visit's Records te 
        permite registrar cada visita con precisión y facilidad. 
        
        Puedes registrar fácilmente cada visita que realices. Simplemente toca el botón de "Registrar Visita", ingresa tus datos de visita 
        y la aplicación guardará automáticamente la ubicación y la hora de tu visita.
        Guarda las coordenadas de tu visita. Esto garantiza una precisión en la ubicación registrada.   
        Mantén un registro organizado de todas tus visitas anteriores. Puedes acceder fácilmente a un historial completo que incluye 
        detalles como la fecha, hora y ubicación de cada visita.
        Mapa Integrado: Visualiza tus visitas en un mapa interactivo dentro de la aplicación. Esto te permite tener una perspectiva visual de tus actividades y te ayuda a planificar futuras rutas.
        Exportación de Datos: Exporta tu historial de visitas en formatos compatibles con hojas de cálculo para su análisis adicional o para compartirlo con otros.
        Personalización: Personaliza la experiencia según tus necesidades. Puedes añadir notas, etiquetas o categorías a cada visita para un mejor seguimiento y organización.
      </p>

      <button
      className="bg-yellow-700 ml-96 mt-6 p-4 px-28 rounded-full"
      onClick={handleSubmit}
      >
        Registrar una visita
      </button>
    </div>
  )
}

