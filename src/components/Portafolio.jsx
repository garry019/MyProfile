import { Gallery3D } from './Gallery3D';

export function Portafolio() {

    return (
        <div className="container py-lg-4">
            <h2 className="fw-bold">Portafolio</h2>
            <p className="text-secondary mb-3">Arrastra para explorar mis proyectos →</p>
            <Gallery3D />
        </div>
    );
}
