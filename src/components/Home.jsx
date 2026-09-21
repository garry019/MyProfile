import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar } from './Navbar';
import { div } from 'three/tsl';

const perfil = {
    nombre: 'Gabriel Calderón',
    cargo: 'Desarrollador Full Stack',
    experiencia: '+20',
};

const tecnologias = [
    {
        titulo: 'Lenguajes',
        items: ['HTML', 'PHP', 'Python', 'JavaScript'],
    },
    {
        titulo: 'Frameworks',
        items: ['Laravel', 'Angular', 'React', 'Node.js', 'Three.js', 'Django'],
    },
    {
        titulo: 'Bases de datos',
        items: ['SQL', 'NoSQL'],
    },
    {
        titulo: 'Control de versiones',
        items: ['Git', 'GitHub'],
    },
    {
        titulo: 'Videojuegos',
        items: ['HTML', 'Javascript', 'Blender', 'Unreal Engine', 'Unity', 'Realidad Virtual', 'Realidad Aumentada'],
    },
    {
        titulo: 'IA',
        items: ['Integraciones', 'Evaluar y Probar', 'Desarrollo asistido'],
    },
];

const habilidades = [
    {
        titulo: 'Diseño y Marca',
        texto: '...',
        items: ['Identidad Visual & Logotipos', 'UI/UX & Sistemas de Diseño', 'Prototipado Interactivo']
    },
    {
        titulo: 'Desarrollo Web y Móvil',
        texto: '...',
        items: ['Aplicaciones Web & SaaS', 'Interfaces & Mobile First', 'APIs & Bases de Datos']
    },
    {
        titulo: 'Automatización e Integracion IA',
        texto: '...',
        items: ['Agentes & Asistentes IA', 'Automatización de Procesos', 'Pipelines & APIs de IA']
    },
    {
        titulo: 'Despliegue y Mantenimiento',
        texto: '...',
        items: ['Mantenimiento & Optimización', 'Hosting, Dominio & Cloud', 'Monitoreo & Soporte Continuo']
    },
];

export function Home() {
    return (
        <div className="bg-white text-dark">
            <Navbar />

            {/* Hero */}
            <header id="inicio" className="border-bottom d-flex align-items-center bg-light" style={{ minHeight: "100vh" }}>
                <div className="container py-5">
                    <div className="row py-lg-5">
                        <div className="col-lg-8">
                            <p className="text-secondary fs-5 mb-2">{perfil.cargo}</p>
                            <h1 className="display-3 fw-bold mb-4">{perfil.nombre}</h1>
                            <p className="lead text-secondary mb-4">Dedicado al <strong>desarrollo web</strong>, sistemas de información y desarrollo de <strong>videojuegos</strong>. <br /> Tecnologías <strong>front-end</strong> y <strong>back-end</strong>. <br />Tendencias más recientes de la industria para ofrecer soluciones de vanguardia.</p>
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
                                <div className="text-secondary">Años de experiencia en desarrollo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tecnologías */}
            <section id="tecnologias" className="d-flex align-items-center py-5" style={{ minHeight: "100vh" }}>
                <div className="container py-lg-4">
                    <h2 className="fw-bold">Tecnologías</h2>
                    <p className="text-secondary">Herramientas modernas para construir rápido, seguro y fácil de mantener.</p>
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
            <section id="workflow" className="d-flex align-items-center py-5 bg-light border-top border-bottom" style={{ minHeight: "100vh" }}>
                <div className="container py-lg-4">
                    <h2 className="fw-bold">Workflow</h2>
                    <p className="text-secondary mb-4">Digitalización de procesos, ventas online, automatización de tareas.</p>
                    <div className="row g-4">
                        {habilidades.map((h) => (
                            <div className="col-sm-6 col-lg-3" key={h.titulo}>
                                <h3 className="h6 fw-bold">{h.titulo}</h3>
                                {/* <p className="text-secondary mb-0">{h.texto}</p> */}
                                <ul className="list-group">
                                    {h.items.map((item) => (
                                        <li key={item} className="list-group-item">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contacto */}
            <section id="contacto" className="d-flex align-items-center py-5" style={{ minHeight: "100vh" }}>
                <div className="container py-lg-4">
                    <div className="row">
                        <div className="col-lg-8 mb-5">
                            <h2 className="fw-bold mb-3">¿Tenés una idea en mente?</h2>
                            <a href="mailto:garry019@gmail.com" className="btn btn-dark px-4 fs-1">LET'S BUILD</a>
                        </div>
                        <div className="col-lg-8 mt-5">
                            <h5 className="fw-bold mb-3" style={{lineHeight:0.5}}>Gabriel Calderón</h5>
                            <p className="text-secondary" style={{lineHeight:0}}>Full Stack Developer & UX/UI · Bogotá, Colombia.</p>
                            <a className="btn btn-sm btn-outline-dark me-1" target="_blank" href="https://github.com/garry019">GitHub</a>
                            <a className="btn btn-sm btn-outline-dark me-1" target="_blank" href="https://www.linkedin.com/in/gary-full-stack-web-developer/">LinkedIn</a>
                            <a className="btn btn-sm btn-outline-dark me-1" target="_blank" href="https://wa.me/5713026684002">WhatsApp</a>
                            <a className="btn btn-sm btn-outline-dark me-1" href="mailto:garry019@gmail.com">Enviar un correo</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}