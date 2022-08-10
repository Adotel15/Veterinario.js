
import { useState, useEffect } from 'react';
import Error from "./Error"

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

    // Creamos los estados de este Componente
    // Básicamente todas las variables del formulario

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    // Creo que useEffect se ejecuta cuando paciente se modifica
    // Si el objeto paciente tiene algo, se ejecuta, se llena el formulario con los datos del paciente en el objeto
    useEffect(() => {
        if ( Object.keys(paciente).length > 0)
        {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);

        } 
    }, [paciente])


    // Funcion que sirve para que cada vez que se cree un paciente se genere un id random para diferenciarlos
    // Ya que pueden tener el mismo nombre... Así se distingue
    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    
    // Una función para que solo se ejecute el formulario cuando se clike en Submit

    const handleSubmit = (e) => {

        e.preventDefault(); // Se espera a que se clicke submit para enviar al formulario

        // Validación del Formulario

        // Creo una array que solo estará en memoria mientras dure la ejecución de la función
        // Que copia los valores del state
        // Array.includes es una función que devuelve true, si alguno de los valores == al elemento pasado por parámetro
        if([nombre, propietario, email, fecha, sintomas].includes(''))
        {
            // Ponemos error true, y el return es como un break de la función, entonces error quedará como true, y se ejectuara error
            setError(true);
            return;
        }
        
        // Volvemos a poner el error a false si ha pasado el filtro del if
        setError(false);

        // Objeto de Paciente, como que tiene el mismo nombre que las variables del destructing del if, automaticamente
        // nombre == nombre, y los demas tambien
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas,
        }

        // Si el paciente tiene un id, significa que ya existe
        if(paciente.id) {
            // Estamos editando
            // Añadimos al objeto el id original del paciente
            objetoPaciente.id = paciente.id;

            // Recorremos el array de pacientes, y cuando encontramos el mismo id, substituimos el objeto que estaba ya, por el que
            // acabamos de crear
            const pacientesActualizados = pacientes.map( pacienteState => 
                pacienteState.id === paciente.id ? objetoPaciente : pacienteState
            )

            // Guardamos el nuevo array
            setPacientes(pacientesActualizados)
            // Resetemos el objeto de paciente a vacio
            setPaciente({})

        } else {
            // Buevo registro
            // Le creamos un ID, y lo añadimos el paciente entero a la array
            objetoPaciente.id = generarId();
            // Con una copia del anterior array, añadiendo el nuevo objeto detrás
            setPacientes([...pacientes, objetoPaciente]);

        }

        // Reiniciamos el formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }


    return(

        <div className="md:w-1/2 lg:w-2/5 mb-12">

            {/* 
                - La parte de arriba es lo que ocupará en Componente en la página :
                    md:w-1/2 => ¿
                    lg:w-2/5 => Que ocupe 2/5 de la página en horizontal
                    mb-12 => 12 Píxeles de margin botton
            */}

            {/*
                - El título del componente, en este caso (Seguimiento Pacientes)
                    font-black => Tipo de letra
                    text-3xl => Tamaño del texto
                    text-center => Que se ponga en medio del componente
            
            */}
            <h2 className="font-black text-white text-3xl text-center">
                Seguimiento Pacientes
            </h2>

            {/*
                - Debajo del título un párrafo(Añade Pacientes y Administralos)
                    text-xl => Tamaño texto
                    mt-5 => Margin Top 5 píxeles

                - (Adminístralos en azul) Se crea un Span
                    text-indigo-600 => Color de la letra
            
            */}

            <p className="text-xl text-white mt-5 text-center mb-10">
                Añade Pacientes y {' '}
                <span className="text-blue-400 font-bold">Adminístralos</span>
            </p>


            {/* -------- FORMULARIO ---------

                bg-white => Fondo del espacio que ocupa este formulario
                shadow-xl => La sombra que saca el formulario
                rounded-l => Que los bordes estén redondeados
                py => Los píxeles de margen DENTRO del formulario, osea de la letra a los márgenes en el eje y
                px => Lo mismo de arriba en el eje x

                Se llama a una función para prevent Default, osea que se espere a que hagamos la cosas y llamemos a las funciones necesarias
                antes del clickar submit y pasar a la siguiente página   
            
            */}

            <form 
                onSubmit = { handleSubmit }
                className="bg-white shadow-xl rounded-lg py-10 px-5"
            >
                { // Si al  ejecutar la funcion de handleSubmit el error da true, se ejecuta el componente Error, y se le pasa el mensaje de que todos los
                  // campos son obligatorios 
                    error &&  
                        <Error>
                            <p>
                                Todos los componentes son obligatorios
                            </p>
                        </Error>}

                <div className="mb-5">

                    {/* Label es para la palabra encima del input */}
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold"> 
                    {/*htmlFor => Es para que cuando clickes en label te lleve al input, tiene que tener el mismo que nombre que el id del input*/}
                        Nombre Mascota
                    </label>

                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 roundend-md"
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value) }
                    />
                </div>

                <div className="mb-5">

                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold"> 
                        Nombre Propietario
                    </label>

                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 roundend-md"
                        value={propietario}
                        onChange={ (e) => setPropietario(e.target.value) }
                    />
                </div> 

                <div className="mb-5">

                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold"> 
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 roundend-md"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                    />
                </div>   

                <div className="mb-5">

                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold"> 
                        Fecha de Alta
                    </label>

                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 roundend-md"
                        value={fecha}
                        onChange={ (e) => setFecha(e.target.value) }
                    />
                </div>

                <div className="mb-5">

                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold"> 
                        Síntomas
                    </label>

                    {/* Aquí al ser un texto, en vez de un input es un textArea */}
                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 roundend-md"
                        placeholder="Describe los Síntomas"
                        value={sintomas}
                        onChange={ (e) => setSintomas(e.target.value) }
                    />
                </div>

                {/*
                    - Creamos el botón para hacer submit de todo el formulario
                        w-full => Coge todo el espacio del contendor 
                        hover: => Cambia el color del botón cuando el ratón está encima
                        cursor-pointer => cuando el ratón está encima se convierte en una mano
                        transition-all => Hace una transition más suave
                */}

                <input 
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-blod 
                    hover:bg-indigo-800 cursor-pointer transition-all"
                    value= {paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
                    />

            </form>
        </div>
    )
}

export default Formulario;