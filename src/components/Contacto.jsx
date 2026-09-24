import { useState } from "react";
import emailjs from "@emailjs/browser";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export function Contacto() {
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        mensaje: "",
        acepta: false,
        website: "", // honeypot anti-spam
    });
    const [estado, setEstado] = useState("idle"); // idle | enviando | ok | error

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Si el honeypot tiene valor, es un bot: fingimos éxito y no enviamos
        if (form.website) return setEstado("ok");
        if (!form.acepta) return;

        setEstado("enviando");
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.nombre,
                    reply_to: form.correo,
                    message: form.mensaje,
                },
                { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
            );
            setEstado("ok");
            setForm({ nombre: "", correo: "", mensaje: "", acepta: false, website: "" });
        } catch (error) {
            console.error(error);
            setEstado("error");
        }
    };

    return (
        <div className="container py-lg-4">
            <div className="row">
                <div className="col-lg-12 mb-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-6 text-center">
                            {estado === "ok" && (
                                <div className="alert alert-success mt-3 mb-0" role="alert">
                                    ¡Mensaje enviado! Te responderé pronto.
                                </div>
                            )}
                            {estado === "error" && (
                                <div className="alert alert-danger mt-3 mb-0" role="alert">
                                    No se pudo enviar. Intenta de nuevo o escríbeme a garry019@gmail.com.
                                </div>
                            )}
                            <h1 className="fw-bold mb-3">¿Tenés una idea en mente?</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        className="form-control"
                                        value={form.nombre}
                                        onChange={handleChange}
                                        required
                                        maxLength={80}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label">Correo</label>
                                    <input
                                        id="correo"
                                        name="correo"
                                        type="email"
                                        className="form-control"
                                        value={form.correo}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        rows={5}
                                        className="form-control"
                                        value={form.mensaje}
                                        onChange={handleChange}
                                        required
                                        maxLength={2000}
                                    />
                                </div>

                                {/* Honeypot: oculto para humanos */}
                                <input
                                    type="text"
                                    name="website"
                                    value={form.website}
                                    onChange={handleChange}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    style={{ position: "absolute", left: "-9999px" }}
                                    aria-hidden="true"
                                />

                                <div className="form-check mb-3">
                                    <input
                                        id="acepta"
                                        name="acepta"
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={form.acepta}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="acepta" className="form-check-label small float-start">
                                        Acepto la{" "}
                                        <a href="/politica-de-datos" target="_blank" rel="noopener noreferrer">
                                            política de tratamiento de datos personales
                                        </a>.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-dark px-4"
                                    disabled={estado === "enviando" || !form.acepta}
                                >
                                    {estado === "enviando" ? "Enviando..." : "LET'S BUILD"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12 text-center" style={{ marginTop: 50 }}>
                    <h5 className="fw-bold mb-3" style={{ lineHeight: 0.5 }}>Gabriel Calderón</h5>
                    <p className="text-secondary mb-4" style={{ lineHeight: 0 }}>Full Stack Developer & UX/UI · Bogotá, Colombia.</p>
                    <a className="btn btn-sm btn-outline-dark me-1" target="_blank" rel="noopener noreferrer" href="https://github.com/garry019"><SiGithub size={25} /></a>
                    <a className="btn btn-sm btn-outline-dark me-1" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/gary-full-stack-web-developer/"><FaLinkedinIn size={25} /></a>
                    <a className="btn btn-sm btn-outline-dark me-1" target="_blank" rel="noopener noreferrer" href="https://wa.me/573026684002"><FaWhatsapp size={25} /></a>
                    <a className="btn btn-sm btn-outline-dark me-1" href="mailto:garry019@gmail.com"><FaEnvelope size={25} /></a>
                </div>
            </div>
        </div>
    );
}