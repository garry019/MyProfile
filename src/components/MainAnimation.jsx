import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const fontFace = new FontFace(
  'Space Grotesk',
  "url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk:vf@5.3.0/latin-wght-normal.woff2') format('woff2-variations')",
  { weight: '300 700' } // variable font: soporta rango de peso 300–700
)
await fontFace.load()
document.fonts.add(fontFace)
await document.fonts.load("700 420px 'Space Grotesk'")

/** Hero scene: a warm moving spotlight reveals the golden title. */
export function MainAnimation() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#ffffff')
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0, 12)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    mount.appendChild(renderer.domElement)

    // Render crisp typography to a canvas, then let the fragment shader light it in WebGL.
    const textCanvas = document.createElement('canvas')
    // High-density source avoids soft edges on high-DPI displays.
    textCanvas.width = 4096
    textCanvas.height = 1024
    const context = textCanvas.getContext('2d')
    context.clearRect(0, 0, textCanvas.width, textCanvas.height)
    context.fillStyle = '#fff'
    context.font = "700 420px 'Space Grotesk', Arial, sans-serif"
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText('GABRIEL DEV', textCanvas.width / 2, textCanvas.height / 2 + 16)
    const textTexture = new THREE.CanvasTexture(textCanvas)
    textTexture.colorSpace = THREE.SRGBColorSpace
    textTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { map: { value: textTexture }, lightX: { value: -0.2 } },
      vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform sampler2D map; uniform float lightX; varying vec2 vUv; void main() { float alpha = texture2D(map, vUv).r; float beam = exp(-pow((vUv.x - lightX) * 8.0, 2.0)); vec3 gold = vec3(0.58, 0.36, 0.035); vec3 glow = vec3(1.0, 0.87, 0.48); gl_FragColor = vec4(mix(gold, glow, beam), alpha); }',
    })
    const titleGroup = new THREE.Group()
    const titleGeometry = new THREE.PlaneGeometry(10.2, 2.55)
    const shadowMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { map: { value: textTexture } },
      vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform sampler2D map; varying vec2 vUv; void main() { float alpha = texture2D(map, vUv).r; gl_FragColor = vec4(0.34, 0.21, 0.04, alpha * 0.075); }',
    })
    // The shadow sits behind the lettering and subtly moves away from the light source.
    const shadow = new THREE.Mesh(titleGeometry, shadowMaterial)
    shadow.position.set(0.05, -0.08, -0.24)
    shadow.scale.set(1.012, 1.025, 1)
    titleGroup.add(shadow)
    // Subtle stacked silhouettes make the illuminated face read as extruded text.
    const depthMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { map: { value: textTexture } },
      vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform sampler2D map; varying vec2 vUv; void main() { float alpha = texture2D(map, vUv).r; gl_FragColor = vec4(0.30, 0.16, 0.012, alpha * 0.78); }',
    })
    for (let layer = 7; layer > 0; layer -= 1) {
      const depth = new THREE.Mesh(titleGeometry, depthMaterial)
      depth.position.set(-layer * 0.012, -layer * 0.009, -layer * 0.026)
      titleGroup.add(depth)
    }
    const title = new THREE.Mesh(titleGeometry, material)
    titleGroup.add(title)
    scene.add(titleGroup)

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect()
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    resize()
    const clock = new THREE.Clock()
    let frameId
    const animate = () => {
      const elapsed = clock.getElapsedTime()
      const lightProgress = (Math.sin(elapsed * 0.72) + 1) / 2
      material.uniforms.lightX.value = lightProgress
      shadow.position.x = THREE.MathUtils.lerp(0.1, -0.1, lightProgress)
      shadow.position.y = -0.08 + Math.sin(elapsed * 0.72) * 0.014
      titleGroup.rotation.y = Math.sin(elapsed * 0.34) * 0.105
      titleGroup.rotation.x = Math.sin(elapsed * 0.42) * 0.028
      titleGroup.position.y = Math.sin(elapsed * 0.5) * 0.055
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      titleGeometry.dispose()
      material.dispose()
      depthMaterial.dispose()
      shadowMaterial.dispose()
      textTexture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  return <main className="hero" aria-label="Gabriel Dev"><div className="hero__scene" ref={mountRef} /><p className="hero__caption">Creative developer</p></main>
}
