'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const DARK_PURPLE = new THREE.Color('#1a0533')
const PURPLE = new THREE.Color('#7C3AED')
const CYAN = new THREE.Color('#06B6D4')
const WHITE = new THREE.Color('#E0F2FE')

type ParticleData = {
  theta: number
  phi: number
  radius: number
  speed: number
  wobbleSpeed: number
  wobbleAmount: number
}

// ── Simplex Noise GLSL ──────────────────────────────────────────
const NOISE_GLSL = `
  vec3 mod289_3(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289_4(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute4(vec4 x) { return mod289_4(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt4(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289_3(i);
    vec4 p = permute4(
      permute4(permute4(i.z + vec4(0.0,i1.z,i2.z,1.0))
             + i.y + vec4(0.0,i1.y,i2.y,1.0))
             + i.x + vec4(0.0,i1.x,i2.x,1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x  = x_ *ns.x + ns.yyyy;
    vec4 y  = y_ *ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt4(vec4(
      dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(
      dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(
      dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`

export default function HeroSphere() {
  const mountRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Scene ────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = isMobile ? 6.2 : 5.4

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    rendererRef.current = renderer
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // ── Esfera principal com Noise Orgânico ──────────────────────
    const sphereGeo = new THREE.SphereGeometry(
      isMobile ? 1.55 : 1.9, 160, 160
    )
    const sphereMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:       { value: 0 },
        uDarkPurple: { value: DARK_PURPLE.clone() },
        uPurple:     { value: PURPLE.clone() },
        uCyan:       { value: CYAN.clone() },
      },
      vertexShader: `
        ${NOISE_GLSL}

        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying float vNoise;

        void main() {
          vNormal = normalize(normalMatrix * normal);

          // Distorção orgânica no vértice
          float n1 = snoise(position * 1.2 + uTime * 0.18);
          float n2 = snoise(position * 2.8 - uTime * 0.12);
          float n3 = snoise(position * 5.0 + uTime * 0.25);
          float displacement = n1 * 0.10 + n2 * 0.045 + n3 * 0.018;
          vNoise = displacement;

          vec3 displaced = position + normal * displacement;
          vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
          vWorldPos = worldPos.xyz;

          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        precision highp float;
        ${NOISE_GLSL}

        uniform float uTime;
        uniform vec3 uDarkPurple;
        uniform vec3 uPurple;
        uniform vec3 uCyan;

        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying float vNoise;

        void main() {
          vec3 normal  = normalize(vNormal);
          vec3 viewDir = normalize(cameraPosition - vWorldPos);

          // Gradiente base animado
          float t = smoothstep(-1.0, 1.0,
            normal.y * 0.7 + normal.x * 0.1
            + sin(uTime * 0.4 + vWorldPos.y * 1.6) * 0.12
            + vNoise * 2.5
          );
          vec3 base = mix(uDarkPurple, mix(uPurple, uCyan, t), t);

          // Fresnel ciano nas bordas
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.8);

          // Shimmer dinâmico
          float shimmer = snoise(vWorldPos * 3.5 + uTime * 0.6) * 0.5 + 0.5;
          vec3 shimmerColor = mix(uPurple, uCyan, shimmer) * 0.22;

          // Reflexo especular suave
          vec3 halfVec = normalize(vec3(0.8, 1.2, 1.0) + viewDir);
          float spec = pow(max(dot(normal, halfVec), 0.0), 32.0) * 0.35;

          vec3 color = base
            + shimmerColor
            + fresnel * vec3(0.3, 0.75, 1.0) * 1.4
            + vec3(spec);

          float alpha = 0.93 + fresnel * 0.07;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    group.add(sphere)

    // ── Halo exterior ────────────────────────────────────────────
    const haloGeo = new THREE.SphereGeometry(isMobile ? 2.1 : 2.45, 96, 96)
    const haloMat = new THREE.ShaderMaterial({
      uniforms: {
        uPurple: { value: PURPLE.clone() },
        uCyan:   { value: CYAN.clone() },
        uTime:   { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform vec3 uPurple;
        uniform vec3 uCyan;
        uniform float uTime;
        varying vec3 vNormal;
        void main() {
          float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0,0.0,1.0)), 0.0), 2.6);
          float pulse   = 0.9 + 0.1 * sin(uTime * 1.2);
          vec3 color    = mix(uPurple, uCyan, 0.45);
          gl_FragColor  = vec4(color, fresnel * 0.28 * pulse);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      side: THREE.BackSide,
    })
    const halo = new THREE.Mesh(haloGeo, haloMat)
    group.add(halo)

    // ── Wireframe sutil ──────────────────────────────────────────
    const wireMat = new THREE.MeshBasicMaterial({
      color: CYAN,
      wireframe: true,
      transparent: true,
      opacity: 0.035,
    })
    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(isMobile ? 1.57 : 1.93, 28, 28),
      wireMat
    )
    group.add(wire)

    // ── Anéis orbitais ────────────────────────────────────────────
    const ringData = [
      { radius: isMobile ? 2.3 : 2.7, color: CYAN,   tiltX: 0.4,  tiltY: 0.1,  speed:  0.14 },
      { radius: isMobile ? 2.7 : 3.1, color: PURPLE, tiltX: 1.1,  tiltY: 0.3, speed: -0.09 },
      { radius: isMobile ? 3.1 : 3.6, color: CYAN,   tiltX: 0.65, tiltY: 0.8,  speed:  0.07 },
    ]
    const rings = ringData.map(({ radius, color, tiltX, tiltY }) => {
      const geo = new THREE.TorusGeometry(radius, 0.007, 2, 220)
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.22,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = tiltX
      mesh.rotation.y = tiltY
      group.add(mesh)
      return mesh
    })

    // ── Partículas ────────────────────────────────────────────────
    const particleCount = isMobile ? 200 : 900
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors    = new Float32Array(particleCount * 3)
    const particleSizes     = new Float32Array(particleCount)
    const particleAlphas    = new Float32Array(particleCount)
    const particleData: ParticleData[] = []

    const layerRadii  = isMobile ? [2.05, 2.45, 2.85] : [2.2, 2.6, 3.0, 3.45]
    const layerSpeeds = isMobile ? [0.22, 0.16, 0.12] : [0.24, 0.18, 0.14, 0.1]

    for (let i = 0; i < particleCount; i++) {
      const layer  = i % layerRadii.length
      const radius = layerRadii[layer] + (Math.random() - 0.5) * 0.2
      const theta  = Math.random() * Math.PI * 2
      const phi    = Math.acos(THREE.MathUtils.randFloatSpread(2))
      const color  = (Math.random() > 0.5 ? PURPLE : CYAN)
        .clone().lerp(WHITE, Math.random() * 0.3)

      particleData.push({
        theta,
        phi,
        radius,
        speed: layerSpeeds[layer] * (0.7 + Math.random() * 0.9),
        wobbleSpeed:  0.7 + Math.random() * 0.9,
        wobbleAmount: 0.03 + Math.random() * 0.08,
      })

      const ix = i * 3
      particleColors[ix]     = color.r
      particleColors[ix + 1] = color.g
      particleColors[ix + 2] = color.b
      particleSizes[i]  = (isMobile ? 0.018 : 0.013) + Math.random() * 0.022
      particleAlphas[i] = 0.4 + Math.random() * 0.5
    }

    const partGeo = new THREE.BufferGeometry()
    partGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    partGeo.setAttribute('aColor',   new THREE.BufferAttribute(particleColors, 3))
    partGeo.setAttribute('aSize',    new THREE.BufferAttribute(particleSizes, 1))
    partGeo.setAttribute('aAlpha',   new THREE.BufferAttribute(particleAlphas, 1))

    const partMat = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aAlpha;
        attribute vec3  aColor;
        uniform float   uPixelRatio;
        varying vec3    vColor;
        varying float   vAlpha;

        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (260.0 / max(1.0, -mvPos.z)) * uPixelRatio;
          gl_Position  = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec3  vColor;
        varying float vAlpha;

        void main() {
          vec2  uv   = gl_PointCoord - 0.5;
          float dist = length(uv);
          if (dist > 0.5) discard;
          float alpha = pow(smoothstep(0.5, 0.0, dist), 1.6) * vAlpha;
          gl_FragColor = vec4(vColor + 0.08, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })
    const particles = new THREE.Points(partGeo, partMat)
    group.add(particles)

    // ── Conexões ──────────────────────────────────────────────────
    const connectionLimit = isMobile ? 80 : 180
    const connectionPairs: Array<[number, number]> = []
    for (let i = 0; i < connectionLimit; i++) {
      const start = i * Math.floor(particleCount / connectionLimit)
      connectionPairs.push([
        start % particleCount,
        (start + 7 + (i % 11)) % particleCount,
      ])
    }

    const connPositions = new Float32Array(connectionPairs.length * 2 * 3)
    const connGeo = new THREE.BufferGeometry()
    connGeo.setAttribute('position', new THREE.BufferAttribute(connPositions, 3))
    const connMat = new THREE.LineBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const connections = new THREE.LineSegments(connGeo, connMat)
    group.add(connections)

    // ── Luzes ─────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    const keyLight = new THREE.PointLight('#7C3AED', 9, 24)
    keyLight.position.set(4.5, 3.5, 5)
    scene.add(keyLight)
    const fillLight = new THREE.PointLight('#06B6D4', 5, 24)
    fillLight.position.set(-5, -1.5, -4.5)
    scene.add(fillLight)
    const rimLight = new THREE.PointLight('#A855F7', 3, 18)
    rimLight.position.set(0, 5, 1)
    scene.add(rimLight)

    // ── Mouse parallax ────────────────────────────────────────────
    const mouse = mouseRef.current
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ────────────────────────────────────────────────────
    const updateSize = () => {
      const w = Math.max(1, mount.clientWidth)
      const h = Math.max(1, mount.clientHeight)
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      partMat.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }
    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(mount)
    resizeObserverRef.current = ro

    // ── Animation loop ────────────────────────────────────────────
    let prev = performance.now() / 1000
    let elapsed = 0

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const now   = performance.now() / 1000
      const delta = now - prev
      prev        = now
      elapsed    += delta

      // Mouse lerp suave
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      // Rotação principal
      group.rotation.y += delta * 0.10 + mouse.x * 0.003
      group.rotation.x  = Math.sin(elapsed * 0.07) * 0.06 + mouse.y * 0.015

      // Respiração
      const breath = 1 + Math.sin(elapsed * 0.85) * 0.012
      sphere.scale.setScalar(breath)
      halo.scale.setScalar(1 + Math.sin(elapsed * 0.85) * 0.02)

      // Anéis
      rings.forEach((ring, i) => {
        ring.rotation.z += delta * ringData[i].speed
      })

      // Wireframe
      wire.rotation.y = -elapsed * 0.05
      wire.rotation.x = elapsed * 0.03

      // Uniforms
      sphereMat.uniforms.uTime.value = elapsed
      haloMat.uniforms.uTime.value   = elapsed

      // Partículas
      const posAttr = partGeo.getAttribute('position') as THREE.BufferAttribute
      for (let i = 0; i < particleData.length; i++) {
        const d  = particleData[i]
        const ix = i * 3
        const theta  = d.theta + elapsed * d.speed
        const phi    = d.phi + Math.sin(elapsed * 0.22 + i * 0.03) * 0.03
        const radius = d.radius + Math.sin(elapsed * d.wobbleSpeed + i * 0.15) * d.wobbleAmount

        posAttr.array[ix]     = radius * Math.sin(phi) * Math.cos(theta)
        posAttr.array[ix + 1] = radius * Math.cos(phi)
        posAttr.array[ix + 2] = radius * Math.sin(phi) * Math.sin(theta)
      }
      posAttr.needsUpdate = true

      // Conexões
      const connAttr = connGeo.getAttribute('position') as THREE.BufferAttribute
      for (let i = 0; i < connectionPairs.length; i++) {
        const [a, b] = connectionPairs[i]
        const wo = i * 6
        connAttr.array[wo]     = posAttr.array[a * 3]
        connAttr.array[wo + 1] = posAttr.array[a * 3 + 1]
        connAttr.array[wo + 2] = posAttr.array[a * 3 + 2]
        connAttr.array[wo + 3] = posAttr.array[b * 3]
        connAttr.array[wo + 4] = posAttr.array[b * 3 + 1]
        connAttr.array[wo + 5] = posAttr.array[b * 3 + 2]
      }
      connAttr.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // ── Cleanup ───────────────────────────────────────────────────
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      ro.disconnect()
      renderer.dispose()
      ;[sphereGeo, haloGeo, partGeo, connGeo].forEach(g => g.dispose())
      ;[sphereMat, haloMat, wireMat, partMat, connMat].forEach(m => m.dispose())
      ringData.forEach((_, i) => rings[i].geometry.dispose())
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      rendererRef.current = null
      animationIdRef.current = null
    }
  }, [isMobile])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
