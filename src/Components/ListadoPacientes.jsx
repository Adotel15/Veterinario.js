
import { useEffect } from "react";
import Paciente from "./Paciente";


function ListadoPacientes({pacientes, setPaciente, eliminarPaciente}) {

    // .map itera un array y devuelve uno nuevo
    useEffect( () => {
        if (pacientes.length > 0) console.log("Nuevo paciente");
    }, [pacientes])


    return(
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">

            {pacientes && pacientes.length ? 
            (
                <>
                    <h2 className="font-black text-white text-3xl text-center">
                    Listado de Pacientes</h2>

                    <p className="text-xl text-white mt-5 mb-7 text-center">
                        Administra tus {" "}
                        <span className="text-blue-400 font-bold">Pacientes y Citas</span>
                    </p>
                        {pacientes.map( e => (
                                <Paciente
                                    key = {e.id} 
                                    pacientes = {e}
                                    setPaciente = {setPaciente} 
                                    eliminarPaciente = {eliminarPaciente}
                                />
                            )  
                        )}
                </>
                
            ) 
            : 
            (
                <>
                    <h2 className="font-black text-white text-3xl text-center">
                        No hay pacientes</h2>

                    <p className="text-xl text-white mt-5 mb-7 text-center">
                        Comienza agregando pacientes {" "}
                        <span className="text-blue-400 font-bold">y aparecerán en este lugar</span>
                    </p>
                </>

            )}

        </div>
    )
}

export default ListadoPacientes;