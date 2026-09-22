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
            { nombre: 'HTML', icono: SiHtml5, color: '#E34F26' },
            { nombre: 'PHP', icono: SiPhp, color: '#777BB4' },
            { nombre: 'Python', icono: SiPython, color: '#3776AB' },
            { nombre: 'JavaScript', icono: SiJavascript, color: '#F7DF1E' },
        ]
    },
    {
        titulo: 'Frameworks',
        items: [
            { nombre: 'Laravel', icono: SiLaravel, color: '#FF2D20' },
            { nombre: 'Angular', icono: SiAngular, color: '#DD0031' },
            { nombre: 'React', icono: SiReact, color: '#61DAFB' },
            { nombre: 'Node.js', icono: SiNodedotjs, color: '#5FA04E' },
            { nombre: 'Three.js', icono: SiThreedotjs, color: '#000000' },
            { nombre: 'Django', icono: SiDjango, color: '#092E20' },
        ],
    },
    {
        titulo: 'Bases de datos',
        items: [
            { nombre: 'SQL', icono: FiDatabase, color: '#4479A1' },
            { nombre: 'NoSQL', icono: FiDatabase, color: '#47A248' },
        ],
    },
    {
        titulo: 'Control de versiones',
        items: [
            { nombre: 'Git', icono: SiGit, color: '#F05032' },
            { nombre: 'GitHub', icono: SiGithub, color: '#181717' },
        ],
    },
    {
        titulo: 'Videojuegos',
        items: [
            { nombre: 'HTML', icono: SiHtml5, color: '#E34F26' },
            { nombre: 'Javascript', icono: SiJavascript, color: '#F7DF1E' },
            { nombre: 'Blender', icono: SiBlender, color: '#E87D0D' },
            { nombre: 'Unreal Engine', icono: SiUnrealengine, color: '#0E1128' },
            { nombre: 'Unity', icono: SiUnity, color: '#000000' },
            { nombre: 'Realidad Virtual(VR)', icono: FiBox, color: '#7C4DFF' },
            { nombre: 'Realidad Aumentada(AR)', icono: FiGlobe, color: '#00BFA5' },
        ],
    },
    {
        titulo: 'IA',
        items: [
            { nombre: 'Integraciones', icono: FiCpu, color: '#412991' },
            { nombre: 'Evaluar y Probar', icono: FiCheckCircle, color: '#0E9F6E' },
            { nombre: 'Desarrollo asistido', icono: FiCode, color: '#D97706' },
            { nombre: 'SDD(Spec-Driven Development)', icono: FiCode, color: '#D97706' },
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
                                            <Icono className="me-2" style={{ color: item.color }} />
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
