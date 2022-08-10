

const Paciente = ({pacientes, setPaciente, eliminarPaciente}) => {

    const handleEliminar = () => {
        const respuesta = confirm('Deseas eliminar paciente?');

        if (respuesta) eliminarPaciente(pacientes.id)
    }


    return (
        <div className="my-10 mx-8 bg-white shadow-xl px-5 py-10 rounded-xl">
                <p className="font-bold mb-3 text-gray-700 uppercase"> Nombre: {' '}
                    <span className="font-normal normal-case">{pacientes.nombre}</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase"> Propietario: {' '}
                    <span className="font-normal normal-case">{pacientes.propietario}</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase"> Email: {' '}
                    <span className="font-normal normal-case">{pacientes.email}</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase"> Fecha Alta: {' '}
                    <span className="font-normal normal-case">{pacientes.fecha}</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase"> Sintomas: {' '}
                    <span className="font-normal normal-case">{pacientes.sintomas}</span>
                </p>

                <div className="flex justify-between mt-10">
                    <button
                        type="button"  
                        className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white font-bold uppercase rounded-md"
                        onClick={() => setPaciente(pacientes)
                        // Hay que hacer un arrow function para que no se ejecute la funcion directamente y se espere al click
                        }                   
                    >Editar</button>

                    <button
                        type="button"
                        className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-md"
                        onClick={handleEliminar}
                    >Eliminar</button>
                </div>
        </div>
  )
}

export default Paciente
