import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/styles.css'
import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Tecnologias } from './Tecnologias';
import { Workflow } from './Workflow';
import { Portafolio } from './Portafolio';
import { Contacto } from './Contacto';
import { div } from 'three/tsl';

function useContador(fin, duracion = 1500) {
    const [valor, setValor] = useState(0);

    useEffect(() => {
        const inicio = performance.now();
        let frame;

        const animar = (ahora) => {
            const progreso = Math.min((ahora - inicio) / duracion, 1);
            const suavizado = 1 - (1 - progreso) ** 2; // easeOutQuad
            setValor(Math.round(fin * suavizado));
            if (progreso < 1) frame = requestAnimationFrame(animar);
        };

        frame = requestAnimationFrame(animar);
        return () => cancelAnimationFrame(frame);
    }, [fin, duracion]);

    return valor;
}

const perfil = {
    nombre: 'Gabriel Calderón',
    cargo: 'Desarrollador Full Stack',
    experiencia: 20,
};

export function Home() {
    const anios = useContador(perfil.experiencia, 5000);

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
                            <p className="lead text-secondary mb-4">Dedicado al <strong>desarrollo web</strong>, sistemas de información y desarrollo de <strong>videojuegos</strong>. <br /> Tecnologías <strong>front-end</strong> y <strong>back-end</strong>. <br />Tendencias más recientes de la industria y soluciones de vanguardia.</p>
                            <div className="d-flex flex-wrap gap-2">
                                <a href="#tecnologias" className="btn btn-dark px-4">
                                    Tecnologías
                                </a>
                                <a href="#contacto" className="btn btn-outline-dark px-4">
                                    Contacto
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex align-items-center mt-5 mt-lg-0">
                            <div className="border-start border-3 border-dark ps-4">
                                <div className="display-2 fw-bold lh-1">
                                    +{anios}<span className="text-secondary"></span>
                                </div>
                                <div className="text-secondary">Años de experiencia</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tecnologías */}
            <section id="tecnologias" className="d-flex align-items-center py-5" style={{ minHeight: "100vh" }}>
                <Tecnologias />
            </section>

            {/* Workflow */}
            <section id="workflow" className="d-flex align-items-center py-5 bg-light border-top border-bottom" style={{ minHeight: "100vh" }}>
                <Workflow />
            </section>

            {/* Portafolio */}
            <section id="portafolio" className="d-flex align-items-center py-5" style={{ minHeight: "100vh" }}>
                <Portafolio />
            </section>

            {/* Contacto */}
            <section id="contacto" className="d-flex align-items-center bg-light py-5" style={{ minHeight: "100vh" }}>
                <Contacto />
            </section>
        </div>
    );
}