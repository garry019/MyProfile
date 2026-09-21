import { useEffect, useState } from 'react';

const enlaces = [
    { id: 'inicio', label: 'INICIO' },
    { id: 'tecnologias', label: 'TECNOLOGIAS' },
    { id: 'workflow', label: 'WORKFLOW' },
    { id: 'portafolio', label: 'PORTAFOLIO' },
    { id: 'contacto', label: 'CONTACTO' },
];

export function Navbar() {
    const [activo, setActivo] = useState(enlaces[0].id);

    useEffect(() => {
        const actualizar = () => {
            // La sección activa es la última cuyo borde superior ya pasó el 40% de la pantalla
            const referencia = window.innerHeight * 0.4;
            let actual = enlaces[0].id;
            for (const { id } of enlaces) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= referencia) actual = id;
            }

            // Al llegar al final de la página, se marca la última sección
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

    // El menú solo se muestra a partir de la segunda sección
    const visible = activo !== enlaces[0].id;

    const irA = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            aria-label="Navegación principal"
            aria-hidden={!visible}
            className="position-fixed top-0 start-50 mt-3 d-flex gap-1 p-1 rounded-pill border shadow"
            style={{
                zIndex: 1030,
                maxWidth: 'calc(100vw - 1rem)',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                opacity: visible ? 1 : 0,
                visibility: visible ? 'visible' : 'hidden',
                pointerEvents: visible ? 'auto' : 'none',
                transform: `translateX(-50%) translateY(${visible ? '0' : '-1rem'})`,
                transition: `opacity 0.25s ease, transform 0.25s ease, visibility 0s linear ${visible ? '0s' : '0.25s'
                    }`,
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
                        className={`btn btn-sm rounded-pill px-2 px-sm-3 py-2 text-decoration-none ${esActivo ? 'btn-dark' : 'btn-link link-secondary'
                            }`}
                    >
                        {label}
                    </a>
                );
            })}
        </nav>
    );
}
