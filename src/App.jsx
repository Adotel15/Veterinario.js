
import { useState, useEffect } from 'react';
import Header from "./Components/Header";
import Formulario from "./Components/Formulario";
import ListadoPacientes from "./Components/ListadoPacientes";

function App() {
  // Todo lo que está antes del return es código JavaScript y es donde programar las funciones
  // Lo que haya despues del return es lo que se visualiza

  // Este es el array donde se guardan todos los pacientes, se guarda en el state del Componente App
  // Lo que se pone dentro del useState es el contenido con el que se inicializa la variable pacientes
  // En este caso se mira si en el local storage hay contenido con el nombre 'pacientes' a través de getItem
  // Y se transforma a un array en javascript a través de JSON.parse, si no hay nada se inicia pacientes con un
  // Array vacío
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('Pacientes')) ?? []);

  // Este state es solamente para que cuando se tenga que editar un paciente, este se guarde temporalmente en esta variable
  const [paciente, setPaciente] = useState({});

  // Cuando no le pasamos ninguna dependencia se ejecuta una vez cuando el componente está listo, osea cuando se inicializa, luego no se vuelve a ejecutar
  // Los useEffects se ejectuan en orden

  // Este useEffect está pendiente de los cambios que recibe el array de pacientes, y cuando cambia algo, guarda de nuevo el array
  // pacientes en el local storage, en formato JSON, que solo acepta strings, con la funcion JSON.stringify
  useEffect( () => {
    localStorage.setItem('Pacientes', JSON.stringify(pacientes));
  }, [pacientes])

  // Esta es una función que dado un id de una mascota lo busca con .filter y lo elimina
  // Creamos una copia del array, donde le devolemos los valores.id que no sean iguales al id
  // Luego hacemos setPacientes del array actualizado
  const eliminarPaciente = (id) => {
    // Hacemos un filtro, solo devolvemos el iterador que es el paciente, cuando su id es diferente al id de entrada, si es igual no ejecutamos nada, y dejamos vacio
    const pacientesActualizados = pacientes.filter( iterador => iterador.id !== id)
    setPacientes(pacientesActualizados)
  }

  // Return es lo que se va a mostar en pantalla en este componente llamado App
  // Tiene que estar todo en un nivel en este caso un div, no puede devolver 2 divs
  // Truqito => es en vez de poner div, pones <> </>
  // Lo que esta entre parentesís se ejecuta como JavaSCript
  // Se ejecuta todo menos los if's
  return (
    <div className="container mx-auto mt-20"> {/*mx = Margin eje X, mt = Margin Top 20 píxeles*/}
    {/* Los props, que son el state que se pasa entre componentes*/}
      <Header />
      <div className="mt-12 md:flex mx-10"> {/*mt = Margin Top 12 píxeles, Flex es para que no se solape*/}
        <Formulario
          pacientes = {pacientes}
          setPacientes = {setPacientes}
          paciente = {paciente}
          setPaciente = {setPaciente}
        />
        <ListadoPacientes 
          pacientes = {pacientes}
          setPaciente = {setPaciente}
          eliminarPaciente = {eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
