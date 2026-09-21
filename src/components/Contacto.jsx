export function Contacto() {

    return (
        <div className="container py-lg-4">
            <div className="row">
                <div className="col-lg-8 mb-5">
                    <h2 className="fw-bold mb-3">¿Tenés una idea en mente?</h2>
                    <a href="mailto:garry019@gmail.com" className="btn btn-dark px-4 fs-1">LET'S BUILD</a>
                </div>
                <div className="col-lg-12 text-center" style={{marginTop: 200}}>
                    <h5 className="fw-bold mb-3" style={{ lineHeight: 0.5 }}>Gabriel Calderón</h5>
                    <p className="text-secondary mb-4" style={{ lineHeight: 0 }}>Full Stack Developer & UX/UI · Bogotá, Colombia.</p>
                    <a className="btn btn-sm btn-outline-dark me-1" target="_blank" href="https://github.com/garry019">GitHub</a>
                    <a className="btn btn-sm btn-outline-dark me-1" target="_blank" href="https://www.linkedin.com/in/gary-full-stack-web-developer/">LinkedIn</a>
                    <a className="btn btn-sm btn-outline-dark me-1" target="_blank" href="https://wa.me/5713026684002">WhatsApp</a>
                    <a className="btn btn-sm btn-outline-dark me-1" href="mailto:garry019@gmail.com">Enviar un correo</a>
                </div>
            </div>
        </div>
    );
}
