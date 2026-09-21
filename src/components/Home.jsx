import 'bootstrap/dist/css/bootstrap.min.css'

const perfil = {
    nombre: 'Tu Nombre',
    cargo: 'Desarrollador Full Stack',
    resumen:
        'Dedicado al desarrollo web, sistemas de información y desarrollo de videojuegos. Poseo un profundo conocimiento de las tecnologías front-end y back-end, y me mantengo actualizado con las últimas tendencias de la industria para ofrecer soluciones de vanguardia.',
    experiencia: '+12',
};

const tecnologias = [
    {
        titulo: 'Lenguajes y bases de datos',
        items: ['PHP', 'JavaScript', 'Python', 'SQL', 'NoSQL'],
    },
    {
        titulo: 'Frameworks',
        items: ['Laravel', 'Angular', 'React', 'Node.js', 'Three.js', 'Django'],
    },
    {
        titulo: 'Control de versiones',
        items: ['Git', 'GitHub'],
    },
    {
        titulo: 'Videojuegos',
        items: ['Unreal Engine', 'Unity'],
    },
];

const habilidades = [
    {
        titulo: 'Trabajo en equipo',
        texto: 'Comunicación asertiva y colaboración para alcanzar objetivos comunes.',
    },
    {
        titulo: 'Pensamiento crítico',
        texto: 'Análisis riguroso de cada problema antes de proponer una solución.',
    },
    {
        titulo: 'Autogestión',
        texto: 'Organización y disciplina para cumplir plazos con autonomía.',
    },
    {
        titulo: 'Decisiones responsables',
        texto: 'Criterio para elegir la mejor alternativa y responder por los resultados.',
    },
];

function Home() {
    return (
        <div className="bg-white text-dark">
            {/* Hero */}
            <header className="border-bottom">
                <div className="container py-5">
                    <div className="row py-lg-5">
                        <div className="col-lg-8">
                            <p className="text-secondary fs-5 mb-2">{perfil.cargo}</p>
                            <h1 className="display-3 fw-bold mb-4">{perfil.nombre}</h1>
                            <p className="lead text-secondary mb-4">{perfil.resumen}</p>
                            <div className="d-flex flex-wrap gap-2">
                                <a href="#tecnologias" className="btn btn-dark px-4">
                                    Ver tecnologías
                                </a>
                                <a href="#contacto" className="btn btn-outline-dark px-4">
                                    Contacto
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex align-items-center mt-5 mt-lg-0">
                            <div className="border-start border-3 border-dark ps-4">
                                <div className="display-2 fw-bold lh-1">{perfil.experiencia}</div>
                                <div className="text-secondary">años de experiencia en desarrollo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tecnologías */}
            <section id="tecnologias" className="py-5">
                <div className="container py-lg-4">
                    <h2 className="fw-bold mb-4">Tecnologías</h2>
                    <div className="row g-4">
                        {tecnologias.map((grupo) => (
                            <div className="col-md-6" key={grupo.titulo}>
                                <div className="border rounded-2 p-4 h-100">
                                    <h3 className="h5 mb-3">{grupo.titulo}</h3>
                                    <div className="d-flex flex-wrap gap-2">
                                        {grupo.items.map((item) => (
                                            <span
                                                key={item}
                                                className="badge bg-light text-dark border fw-normal fs-6 px-3 py-2"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Habilidades blandas */}
            <section className="py-5 bg-light border-top border-bottom">
                <div className="container py-lg-4">
                    <h2 className="fw-bold mb-4">Forma de trabajar</h2>
                    <div className="row g-4">
                        {habilidades.map((h) => (
                            <div className="col-sm-6 col-lg-3" key={h.titulo}>
                                <h3 className="h6 fw-bold">{h.titulo}</h3>
                                <p className="text-secondary mb-0">{h.texto}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contacto */}
            <section id="contacto" className="py-5">
                <div className="container py-lg-4">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-3">Trabajemos juntos</h2>
                            <p className="text-secondary mb-4">
                                Si tienes un proyecto web, un sistema de información o un videojuego en mente,
                                escríbeme.
                            </p>
                            <a href="mailto:correo@ejemplo.com" className="btn btn-dark px-4">
                                Enviar un correo
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;