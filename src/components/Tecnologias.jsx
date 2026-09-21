import {
    SiHtml5,
    SiPhp,
    SiPython,
    SiJavascript,
    SiLaravel,
    SiAngular,
    SiReact,
    SiNodedotjs,
    SiThreedotjs,
    SiDjango,
    SiGit,
    SiGithub,
    SiBlender,
    SiUnrealengine,
    SiUnity,
} from 'react-icons/si';

import {
    FiDatabase,
    FiBox,
    FiGlobe,
    FiCpu,
    FiCheckCircle,
    FiCode,
} from 'react-icons/fi';

const tecnologias = [
    {
        titulo: 'Lenguajes',
        items: [
            { nombre: 'HTML', icono: SiHtml5 },
            { nombre: 'PHP', icono: SiPhp },
            { nombre: 'Python', icono: SiPython },
            { nombre: 'JavaScript', icono: SiJavascript },
        ]
    },
    {
        titulo: 'Frameworks',
        items: [
            { nombre: 'Laravel', icono: SiLaravel },
            { nombre: 'Angular', icono: SiAngular },
            { nombre: 'React', icono: SiReact },
            { nombre: 'Node.js', icono: SiNodedotjs },
            { nombre: 'Three.js', icono: SiThreedotjs },
            { nombre: 'Django', icono: SiDjango },
        ],
    },
    {
        titulo: 'Bases de datos',
        items: [
            { nombre: 'SQL', icono: FiDatabase },
            { nombre: 'NoSQL', icono: FiDatabase },
        ],
    },
    {
        titulo: 'Control de versiones',
        items: [
            { nombre: 'Git', icono: SiGit },
            { nombre: 'GitHub', icono: SiGithub },
        ],
    },
    {
        titulo: 'Videojuegos',
        items: [
            { nombre: 'HTML', icono: SiHtml5 },
            { nombre: 'Javascript', icono: SiJavascript },
            { nombre: 'Blender', icono: SiBlender },
            { nombre: 'Unreal Engine', icono: SiUnrealengine },
            { nombre: 'Unity', icono: SiUnity },
            { nombre: 'Realidad Virtual', icono: FiBox },
            { nombre: 'Realidad Aumentada', icono: FiGlobe },
        ],
    },
    {
        titulo: 'IA',
        items: [
            { nombre: 'Integraciones', icono: FiCpu },
            { nombre: 'Evaluar y Probar', icono: FiCheckCircle },
            { nombre: 'Desarrollo asistido', icono: FiCode },
        ],
    },
];

export function Tecnologias() {

    return (
        <div className="container py-lg-4">
            <h2 className="fw-bold">Tecnologías</h2>
            <p className="text-secondary">Herramientas modernas para construir rápido, seguro y fácil de mantener.</p>
            <div className="row g-4">
                {tecnologias.map((grupo) => (
                    <div className="col-md-6" key={grupo.titulo}>
                        <div className="border rounded-2 p-4 h-100">
                            <h3 className="h5 mb-3">{grupo.titulo}</h3>
                            <div className="d-flex flex-wrap gap-2">
                                {grupo.items.map((item) => {
                                    const Icono = item.icono;

                                    return (
                                        <span
                                            key={item.nombre}
                                            className="badge bg-light text-dark border fw-normal fs-6 px-3 py-2"
                                        >
                                            <Icono className="me-2" />
                                            {item.nombre}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
