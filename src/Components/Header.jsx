

// Para poder cargar los props se pasan por parámetro, se puede hacer destructring
// Este componente es solo para el título
function Header(){
    return (
        <>
            <h1 className="font-black text-white text-5xl text-center md:w-2/3 mx-auto">
                {/*font = Tipo de letra, text-5xl => text = texto, 5xl = tamaño*/}

                Seguimiento Pacientes {' '}

                <span className="text-blue-400">Veterinaria</span>
                {/*indigo-600 = Texto en color indigo*/}
            </h1>
        </>
    )
}

export default Header;