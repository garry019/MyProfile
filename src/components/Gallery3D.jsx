import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import img1 from '../assets/img/evakey.jpg';
import img2 from '../assets/img/martina-vimat.jpg';

const proyectos = [
    { titulo: 'EvaKey', imagen: img1, url: 'https://evakey.co/' },
    { titulo: 'Martina - Proyectos de Energía Solar', imagen: img2, url: '#' },
    { titulo: 'CRM Full Stack Development', imagen: 'https://garry019.github.io/profile/static/media/crm-developer.9a749d061fc3f68d3c93.jpg', url: '#' },
    { titulo: 'Young Accesorios', imagen: 'https://garry019.github.io/profile/static/media/young-accesorios.535e781fa8eb632ee08d.jpg', url: '#' },
    { titulo: 'EcoPower', imagen: 'https://garry019.github.io/profile/static/media/eco-power.f8bec0a6ecd40a14ba6e.jpg', url: '#' },
    { titulo: 'Femsa VR', imagen: 'https://garry019.github.io/profile/static/media/mundo-femsa.3fb37419545f00a81e02.jpg', url: '#' },
    { titulo: 'Pacman 3D', imagen: 'https://garry019.github.io/profile/static/media/3D-pacman.bc4c11691bfa868b12ed.jpg', url: '#' },
];

const SEPARACION = 16.5;

export function Gallery3D() {
    const contenedorRef = useRef(null);

    // Referencia para poder modificar la posición de Three.js
    // desde las flechas sin recrear la escena.
    const objetivoXRef = useRef(0);
    const velocidadRef = useRef(0);

    const [activo, setActivo] = useState(null);
    const [indiceActual, setIndiceActual] = useState(0);

    const irAlAnterior = () => {
        setIndiceActual((indice) => {
            if (indice <= 0) {
                return 0;
            }

            const nuevoIndice = indice - 1;

            objetivoXRef.current = nuevoIndice * SEPARACION;
            velocidadRef.current = 0;

            return nuevoIndice;
        });
    };

    const irAlSiguiente = () => {
        setIndiceActual((indice) => {
            if (indice >= proyectos.length - 1) {
                return proyectos.length - 1;
            }

            const nuevoIndice = indice + 1;

            objetivoXRef.current = nuevoIndice * SEPARACION;
            velocidadRef.current = 0;

            return nuevoIndice;
        });
    };

    useEffect(() => {
        const contenedor = contenedorRef.current;

        if (!contenedor) return;

        // ─── Escena básica ───
        const escena = new THREE.Scene();

        const camara = new THREE.PerspectiveCamera(
            50,
            contenedor.clientWidth / contenedor.clientHeight,
            0.1,
            100
        );

        camara.position.set(0, 0, 10);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        renderer.setSize(
            contenedor.clientWidth,
            contenedor.clientHeight
        );

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        contenedor.appendChild(renderer.domElement);

        // ─── Planos con texturas ───
        const loader = new THREE.TextureLoader();
        const grupo = new THREE.Group();

        escena.add(grupo);

        const planos = [];

        proyectos.forEach((proyecto, i) => {
            const textura = loader.load(proyecto.imagen);

            textura.colorSpace = THREE.SRGBColorSpace;

            const geometria = new THREE.PlaneGeometry(14, 7.5);

            const material = new THREE.MeshBasicMaterial({
                map: textura,
            });

            const plano = new THREE.Mesh(
                geometria,
                material
            );

            plano.position.x = i * SEPARACION;

            plano.userData = {
                index: i,
                ...proyecto,
            };

            planos.push(plano);
            grupo.add(plano);
        });

        // ─── Interacción: arrastre + inercia ───
        let actualX = 0;
        let arrastrando = false;
        let inicioX = 0;
        let inicioObjetivo = 0;

        const onPointerDown = (e) => {
            arrastrando = true;

            inicioX =
                e.clientX ??
                e.touches?.[0]?.clientX;

            inicioObjetivo = objetivoXRef.current;

            contenedor.style.cursor = 'grabbing';
        };

        const onPointerMove = (e) => {
            if (!arrastrando) return;

            const x =
                e.clientX ??
                e.touches?.[0]?.clientX;

            const delta =
                (x - inicioX) * 0.0015;

            let nuevoObjetivo =
                inicioObjetivo - delta;

            // ─── Límites de navegación ───
            nuevoObjetivo = Math.max(
                0,
                Math.min(
                    nuevoObjetivo,
                    (proyectos.length - 1) * SEPARACION
                )
            );

            objetivoXRef.current = nuevoObjetivo;
            velocidadRef.current = -delta;
        };

        const onPointerUp = () => {
            arrastrando = false;
            contenedor.style.cursor = 'grab';

            // Al terminar el arrastre, ajustamos al proyecto
            // más cercano para evitar quedar entre elementos.
            const indice = Math.round(
                objetivoXRef.current / SEPARACION
            );

            const indiceLimitado = Math.max(
                0,
                Math.min(
                    indice,
                    proyectos.length - 1
                )
            );

            objetivoXRef.current =
                indiceLimitado * SEPARACION;

            velocidadRef.current = 0;

            setIndiceActual(indiceLimitado);
        };

        contenedor.addEventListener(
            'pointerdown',
            onPointerDown
        );

        window.addEventListener(
            'pointermove',
            onPointerMove
        );

        window.addEventListener(
            'pointerup',
            onPointerUp
        );

        // ─── Rueda del mouse ───
        const onWheel = (e) => {
            let nuevoObjetivo =
                objetivoXRef.current +
                e.deltaY * 0.005;

            // ─── Límites ───
            nuevoObjetivo = Math.max(
                0,
                Math.min(
                    nuevoObjetivo,
                    (proyectos.length - 1) * SEPARACION
                )
            );

            objetivoXRef.current = nuevoObjetivo;
            velocidadRef.current = 0;

            // Actualizar índice según posición
            const indice = Math.round(
                nuevoObjetivo / SEPARACION
            );

            setIndiceActual(
                Math.max(
                    0,
                    Math.min(
                        indice,
                        proyectos.length - 1
                    )
                )
            );
        };

        contenedor.addEventListener(
            'wheel',
            onWheel,
            { passive: true }
        );

        // ─── Clic en proyecto ───
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        let fueArrastre = false;
        let anteriorX = 0;

        const onClick = (e) => {
            if (fueArrastre) return;

            const rect =
                contenedor.getBoundingClientRect();

            mouse.x =
                ((e.clientX - rect.left) /
                    rect.width) *
                2 -
                1;

            mouse.y =
                -(
                    ((e.clientY - rect.top) /
                        rect.height) *
                    2 -
                    1
                );

            raycaster.setFromCamera(
                mouse,
                camara
            );

            const intersects =
                raycaster.intersectObjects(planos);

            if (intersects.length > 0) {
                const proyecto =
                    intersects[0].object.userData;

                setActivo(proyecto);

                // window.open(proyecto.url, '_blank');
            }
        };

        contenedor.addEventListener(
            'click',
            onClick
        );

        // ─── Parallax con mouse ───
        let mouseY = 0;

        const onMouseMoveGlobal = (e) => {
            mouseY =
                (e.clientY / window.innerHeight - 0.5) *
                0.4;
        };

        window.addEventListener(
            'mousemove',
            onMouseMoveGlobal
        );

        // ─── Resize ───
        const onResize = () => {
            camara.aspect =
                contenedor.clientWidth /
                contenedor.clientHeight;

            camara.updateProjectionMatrix();

            renderer.setSize(
                contenedor.clientWidth,
                contenedor.clientHeight
            );
        };

        window.addEventListener(
            'resize',
            onResize
        );

        // ─── Loop de animación ───
        let animationFrame;

        const animar = () => {
            animationFrame =
                requestAnimationFrame(animar);

            // Inercia al soltar
            if (!arrastrando) {
                objetivoXRef.current +=
                    velocidadRef.current;

                velocidadRef.current *= 0.94;

                // ─── Límites de seguridad ───
                objetivoXRef.current = Math.max(
                    0,
                    Math.min(
                        objetivoXRef.current,
                        (proyectos.length - 1) *
                        SEPARACION
                    )
                );
            }

            // Suavizado
            actualX +=
                (objetivoXRef.current - actualX) *
                0.08;

            fueArrastre =
                Math.abs(actualX - anteriorX) >
                0.01;

            anteriorX = actualX;

            grupo.position.x = -actualX;

            // Efecto: plano más cercano al centro
            // se endereza y agranda
            planos.forEach((plano) => {
                const distanciaCentro =
                    Math.abs(
                        plano.position.x +
                        grupo.position.x
                    );

                const cercania = Math.max(
                    0,
                    1 - distanciaCentro / 5
                );

                plano.rotation.y =
                    (plano.position.x +
                        grupo.position.x) *
                    -0.08;

                plano.scale.setScalar(
                    1 + cercania * 0.12
                );

                plano.position.y =
                    Math.sin(
                        plano.position.x * 0.5
                    ) *
                    0.3 +
                    mouseY;
            });

            camara.lookAt(0, 0, 0);

            renderer.render(
                escena,
                camara
            );
        };

        animar();

        // ─── Limpieza ───
        return () => {
            cancelAnimationFrame(
                animationFrame
            );

            window.removeEventListener(
                'pointermove',
                onPointerMove
            );

            window.removeEventListener(
                'pointerup',
                onPointerUp
            );

            window.removeEventListener(
                'mousemove',
                onMouseMoveGlobal
            );

            window.removeEventListener(
                'resize',
                onResize
            );

            contenedor.removeEventListener(
                'pointerdown',
                onPointerDown
            );

            contenedor.removeEventListener(
                'wheel',
                onWheel
            );

            contenedor.removeEventListener(
                'click',
                onClick
            );

            renderer.dispose();

            planos.forEach((p) => {
                p.geometry.dispose();
                p.material.map?.dispose();
                p.material.dispose();
            });

            if (
                contenedor.contains(
                    renderer.domElement
                )
            ) {
                contenedor.removeChild(
                    renderer.domElement
                );
            }
        };
    }, []);

    return (
        <div
            className="gallery-3d-wrapper"
            style={{
                position: 'relative',
                width: '100%',
                height: '60vh',
                minHeight: '380px',
            }}
        >
            <div
                ref={contenedorRef}
                className="gallery-3d"
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'grab',
                    touchAction: 'pan-y',
                }}
            />

            <button
                type="button"
                className="gallery-arrow gallery-arrow-left"
                onClick={irAlAnterior}
                disabled={indiceActual === 0}
                aria-label="Proyecto anterior"
            >
                ‹
            </button>

            <button
                type="button"
                className="gallery-arrow gallery-arrow-right"
                onClick={irAlSiguiente}
                disabled={indiceActual === proyectos.length - 1}
                aria-label="Proyecto siguiente"
            >
                ›
            </button>
        </div>
    );
}