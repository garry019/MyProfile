const pasos = [
    {
        id: 'diseno',
        icono: 'bi-palette',
        titulo: 'Diseño y Marca',
        texto: 'Definimos la identidad visual y la experiencia de usuario antes de escribir una línea de código.',
        items: ['Identidad Visual & Logotipos', 'UI/UX & Sistemas de Diseño', 'Prototipado Interactivo']
    },
    {
        id: 'desarrollo',
        icono: 'bi-code-slash',
        titulo: 'Desarrollo Web y Móvil',
        texto: 'Construimos la aplicación con enfoque mobile first, del frontend a las APIs y la base de datos.',
        items: ['Aplicaciones Web & SaaS', 'Interfaces & Mobile First', 'APIs & Bases de Datos']
    },
    {
        id: 'automatizacion',
        icono: 'bi-cpu',
        titulo: 'Automatización e Integración IA',
        texto: 'Integramos agentes de IA y automatizamos procesos para que el sistema trabaje por ti.',
        items: ['Agentes & Asistentes IA', 'Automatización de Procesos', 'Pipelines & APIs de IA']
    },
    {
        id: 'despliegue',
        icono: 'bi-cloud-check',
        titulo: 'Despliegue y Mantenimiento',
        texto: 'Llevamos todo a producción y lo mantenemos optimizado, monitoreado y con soporte continuo.',
        items: ['Hosting, Dominio & Cloud', 'Monitoreo & Soporte Continuo', 'Mantenimiento & Optimización']
    },
];

export function Workflow() {
    return (
        <div className="container py-lg-5">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            <h2 className="fw-bold">Workflow</h2>
            <p className="text-secondary mb-5">Digitalización de procesos, ventas online, automatización de tareas.</p>

            <div className="timeline position-relative">
                {pasos.map((paso, i) => (
                    <div className="timeline-item position-relative d-flex gap-3 gap-md-4 pb-5" key={paso.id}>

                        {/* Icono + línea */}
                        <div className="timeline-marker d-flex flex-column align-items-center">
                            <div className="timeline-icon rounded-circle d-flex align-items-center justify-content-center bg-secondary text-white flex-shrink-0">
                                <i className={`bi ${paso.icono}`}></i>
                            </div>
                            {i < pasos.length - 1 && <div className="timeline-line flex-grow-1 mt-3"></div>}
                        </div>

                        {/* Contenido */}
                        <div className="timeline-content flex-grow-1 pt-1">
                            <span className="badge bg-secondary-subtle text-dark mb-2">Paso {i + 1}</span>
                            <h3 className="h5 fw-bold">{paso.titulo}</h3>
                            <p className="text-secondary">{paso.texto}</p>
                            <ul className="list-group list-group-flush">
                                {paso.items.map((item) => (
                                    <li key={item} className="list-group-item bg-transparent px-0">
                                        <i className="bi bi-check2-circle text-success me-2"></i>{item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}