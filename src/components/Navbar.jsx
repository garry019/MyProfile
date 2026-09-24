import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const enlaces = [
    { id: 'inicio', label: 'GABRIEL CALDERON' },
    { id: 'tecnologias', label: 'TECNOLOGIAS' },
    { id: 'workflow', label: 'WORKFLOW' },
    { id: 'portafolio', label: 'PORTAFOLIO' },
    { id: 'contacto', label: 'CONTACTO' },
];

const vidrio = {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(8px)',
};

export function Navbar() {
    const [activo, setActivo] = useState(enlaces[0].id);
    const [abierto, setAbierto] = useState(false);

    useEffect(() => {
        const actualizar = () => {
            const referencia = window.innerHeight * 0.4;
            let actual = enlaces[0].id;
            for (const { id } of enlaces) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= referencia) actual = id;
            }

            const alFinal =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            if (alFinal) actual = enlaces[enlaces.length - 1].id;

            setActivo(actual);
        };

        actualizar();
        window.addEventListener('scroll', actualizar, { passive: true });
        window.addEventListener('resize', actualizar);
        return () => {
            window.removeEventListener('scroll', actualizar);
            window.removeEventListener('resize', actualizar);
        };
    }, []);

    const visible = activo !== enlaces[0].id;

    // Cerrar el panel con Escape
    useEffect(() => {
        if (!abierto) return;
        const onKey = (e) => e.key === 'Escape' && setAbierto(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [abierto]);

    // Cerrar el panel si el menú se oculta (al volver al hero)
    useEffect(() => {
        if (!visible) setAbierto(false);
    }, [visible]);

    const irA = (e, id) => {
        e.preventDefault();
        setAbierto(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const estadoVisible = {
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        pointerEvents: visible ? 'auto' : 'none',
    };

    const actual = enlaces.find((e) => e.id === activo);

    return (
        <>
            {/* ESCRITORIO / TABLET: tu píldora original */}
            <nav
                aria-label="Navegación principal"
                aria-hidden={!visible}
                className="position-fixed top-0 start-50 mt-3 d-none d-md-flex gap-1 p-1 rounded-pill border shadow"
                style={{
                    zIndex: 1030,
                    maxWidth: 'calc(100vw - 1rem)',
                    ...vidrio,
                    opacity: visible ? 1 : 0,
                    visibility: visible ? 'visible' : 'hidden',
                    pointerEvents: visible ? 'auto' : 'none',
                    transform: `translateX(-50%) translateY(${visible ? '0' : '-1rem'})`,
                    transition: `opacity 0.25s ease, transform 0.25s ease, visibility 0s linear ${visible ? '0s' : '0.25s'}`,
                }}
            >
                {enlaces.map(({ id, label }) => {
                    const esActivo = activo === id;
                    return (
                        <a
                            key={id}
                            href={`#${id}`}
                            onClick={(e) => irA(e, id)}
                            aria-current={esActivo ? 'true' : undefined}
                            tabIndex={visible ? 0 : -1}
                            className={`btn btn-sm rounded-pill px-2 px-sm-3 py-2 text-decoration-none ${
                                esActivo ? 'btn-dark' : 'btn-link link-secondary'
                            }`}
                        >
                            {id === 'inicio' ? <strong className="text-dark">{label}</strong> : label}
                        </a>
                    );
                })}
            </nav>

            {/* MÓVIL: barra compacta + panel desplegable */}
            <div className="d-md-none">
                {/* Fondo para cerrar al tocar fuera */}
                {abierto && (
                    <div
                        onClick={() => setAbierto(false)}
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{ zIndex: 1029, backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
                    />
                )}

                <nav
                    aria-label="Navegación principal"
                    aria-hidden={!visible}
                    className="position-fixed top-0 start-0 end-0"
                    style={{
                        zIndex: 1030,
                        margin: '0.5rem',
                        marginTop: 'calc(0.5rem + env(safe-area-inset-top, 0px))',
                        transition: 'opacity 0.25s ease, visibility 0s linear',
                        ...estadoVisible,
                    }}
                >
                    <div
                        className="d-flex align-items-center justify-content-between ps-3 pe-1 py-1 border shadow"
                        style={{ ...vidrio, borderRadius: abierto ? '1.5rem 1.5rem 0 0' : '2rem' }}
                    >
                        <span className="fw-bold small text-dark text-truncate">
                            {actual.label}
                        </span>
                        <button
                            type="button"
                            className="btn btn-dark rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ width: 44, height: 44 }}
                            onClick={() => setAbierto((v) => !v)}
                            aria-expanded={abierto}
                            aria-controls="menu-movil"
                            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
                            tabIndex={visible ? 0 : -1}
                        >
                            {abierto ? <FaTimes size={18} /> : <FaBars size={18} />}
                        </button>
                    </div>

                    {abierto && (
                        <ul
                            id="menu-movil"
                            className="list-unstyled m-0 p-2 border border-top-0 shadow"
                            style={{ ...vidrio, borderRadius: '0 0 1.5rem 1.5rem' }}
                        >
                            {enlaces.map(({ id, label }) => {
                                const esActivo = activo === id;
                                return (
                                    <li key={id}>
                                        <a
                                            href={`#${id}`}
                                            onClick={(e) => irA(e, id)}
                                            aria-current={esActivo ? 'true' : undefined}
                                            className={`d-flex align-items-center px-3 rounded-4 text-decoration-none fw-semibold ${
                                                esActivo ? 'bg-dark text-white' : 'text-secondary'
                                            }`}
                                            style={{ minHeight: 48 }}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </nav>
            </div>
        </>
    );
}