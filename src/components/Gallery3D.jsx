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

export function Gallery3D() {
    const contenedorRef = useRef(null);
    const [activo, setActivo] = useState(null);

    useEffect(() => {
        const contenedor = contenedorRef.current;
        if (!contenedor) return;

        // ─── Escena básica ───
        const escena = new THREE.Scene();
        const camara = new THREE.PerspectiveCamera(50, contenedor.clientWidth / contenedor.clientHeight, 0.1, 100);
        camara.position.set(0, 0, 10);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(contenedor.clientWidth, contenedor.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        contenedor.appendChild(renderer.domElement);

        // ─── Planos con texturas ───
        const loader = new THREE.TextureLoader();
        const grupo = new THREE.Group();
        escena.add(grupo);

        const SEPARACION = 16.5;
        const planos = [];

        proyectos.forEach((proyecto, i) => {
            const textura = loader.load(proyecto.imagen);
            textura.colorSpace = THREE.SRGBColorSpace;

            const geometria = new THREE.PlaneGeometry(14, 7.5);
            const material = new THREE.MeshBasicMaterial({ map: textura });
            const plano = new THREE.Mesh(geometria, material);

            plano.position.x = i * SEPARACION;
            plano.userData = { index: i, ...proyecto };
            planos.push(plano);
            grupo.add(plano);
        });

        // ─── Interacción: arrastre + inercia ───
        let objetivoX = 0;
        let actualX = 0;
        let arrastrando = false;
        let inicioX = 0;
        let inicioObjetivo = 0;
        let velocidad = 0;

        const onPointerDown = (e) => {
            arrastrando = true;
            inicioX = e.clientX ?? e.touches?.[0]?.clientX;
            inicioObjetivo = objetivoX;
            contenedor.style.cursor = 'grabbing';
        };

        const onPointerMove = (e) => {
            if (!arrastrando) return;
            const x = e.clientX ?? e.touches?.[0]?.clientX;
            const delta = (x - inicioX) * 0.0015;
            objetivoX = inicioObjetivo - delta;
            velocidad = -delta;
        };

        const onPointerUp = () => {
            arrastrando = false;
            contenedor.style.cursor = 'grab';
        };

        contenedor.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        // ─── Rueda del mouse ───
        const onWheel = (e) => {
            objetivoX += e.deltaY * 0.005;
        };
        contenedor.addEventListener('wheel', onWheel, { passive: true });

        // ─── Clic en proyecto ───
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let fueArrastre = false;

        const onClick = (e) => {
            if (fueArrastre) return; // ignorar clic después de arrastrar
            const rect = contenedor.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camara);
            const intersects = raycaster.intersectObjects(planos);
            if (intersects.length > 0) {
                const proyecto = intersects[0].object.userData;
                setActivo(proyecto);
                //window.open(proyecto.url, '_blank');
            }
        };
        contenedor.addEventListener('click', onClick);

        // ─── Parallax con mouse ───
        let mouseY = 0;
        const onMouseMoveGlobal = (e) => {
            mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
        };
        window.addEventListener('mousemove', onMouseMoveGlobal);

        // ─── Resize ───
        const onResize = () => {
            camara.aspect = contenedor.clientWidth / contenedor.clientHeight;
            camara.updateProjectionMatrix();
            renderer.setSize(contenedor.clientWidth, contenedor.clientHeight);
        };
        window.addEventListener('resize', onResize);

        // ─── Loop de animación ───
        const TOTAL_ANCHO = proyectos.length * SEPARACION;
        let anteriorX = 0;

        const animar = () => {
            requestAnimationFrame(animar);

            // Inercia al soltar
            if (!arrastrando) {
                objetivoX += velocidad;
                velocidad *= 0.94; // fricción
            }

            // Loop infinito
            /* if (objetivoX < -SEPARACION) objetivoX += TOTAL_ANCHO - SEPARACION;
            if (objetivoX > TOTAL_ANCHO - SEPARACION * 2) objetivoX -= TOTAL_ANCHO - SEPARACION; */

            // Suavizado
            actualX += (objetivoX - actualX) * 0.08;
            fueArrastre = Math.abs(actualX - anteriorX) > 0.01;
            anteriorX = actualX;

            grupo.position.x = -actualX;

            // Efecto: plano más cercano al centro se endereza y agranda
            planos.forEach((plano) => {
                const distanciaCentro = Math.abs(plano.position.x + grupo.position.x);
                const cercania = Math.max(0, 1 - distanciaCentro / 5);
                plano.rotation.y = (plano.position.x + grupo.position.x) * -0.08;
                plano.scale.setScalar(1 + cercania * 0.12);
                plano.position.y = Math.sin(plano.position.x * 0.5) * 0.3 + mouseY;
            });

            camara.lookAt(0, 0, 0);
            renderer.render(escena, camara);
        };
        animar();

        // ─── Limpieza ───
        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('mousemove', onMouseMoveGlobal);
            window.removeEventListener('resize', onResize);
            contenedor.removeEventListener('pointerdown', onPointerDown);
            contenedor.removeEventListener('wheel', onWheel);
            contenedor.removeEventListener('click', onClick);
            renderer.dispose();
            planos.forEach(p => {
                p.geometry.dispose();
                p.material.map?.dispose();
                p.material.dispose();
            });
            contenedor.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={contenedorRef}
            className="gallery-3d"
            style={{
                width: '100%',
                height: '60vh',
                minHeight: '380px',
                cursor: 'grab',
                touchAction: 'pan-y', // permite scroll vertical en móvil
            }}
        />
    );
}