'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const PURPLE = new THREE.Color('#7C3AED')
const CYAN = new THREE.Color('#06B6D4')

export default function ZifferaOrb() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches)
    }

    updateIsMobile()
    mediaQuery.addEventListener('change', updateIsMobile)

    return () => {
      mediaQuery.removeEventListener('change', updateIsMobile)
    }
  }, [])

  useEffect(() => {
    if (isMobile) return

    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 5.4

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const coreGeometry = new THREE.SphereGeometry(1.9, 160, 160)
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPurple: { value: PURPLE.clone() },
        uCyan: { value: CYAN.clone() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform float uTime;
        uniform vec3 uPurple;
        uniform vec3 uCyan;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vec3 n = normalize(vNormal);
          float gradient = smoothstep(-0.8, 0.9, n.y * 0.65 + n.x * 0.2 + sin(uTime * 0.6 + vPosition.y * 2.2) * 0.08);
          vec3 base = mix(uPurple, uCyan, gradient);

          float fresnel = pow(1.0 - max(dot(n, vec3(0.0, 0.0, 1.0)), 0.0), 2.2);
          float shimmer = 0.08 + 0.06 * sin(uTime * 1.3 + vPosition.x * 6.0 + vPosition.y * 4.0);
          vec3 color = base + fresnel * vec3(0.55, 0.7, 1.0) + shimmer;

          float alpha = 0.98;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    group.add(core)

    const glowGeometry = new THREE.SphereGeometry(2.35, 96, 96)
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPurple: { value: PURPLE.clone() },
        uCyan: { value: CYAN.clone() },
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
        varying vec3 vNormal;

        void main() {
          float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.8);
          vec3 color = mix(uPurple, uCyan, 0.35) * 0.8;
          gl_FragColor = vec4(color, fresnel * 0.22);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    })
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    group.add(glow)

    const particleCount = 220
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)
    const particlePhases = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const index = i * 3
      const radius = 2.6 + Math.random() * 1.7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      particlePositions[index] = radius * Math.sin(phi) * Math.cos(theta)
      particlePositions[index + 1] = radius * Math.sin(phi) * Math.sin(theta)
      particlePositions[index + 2] = radius * Math.cos(phi)

      const tint = Math.random() > 0.5 ? PURPLE : CYAN
      const mixAmount = Math.random()
      const color = tint.clone().lerp(new THREE.Color('#E0F2FE'), mixAmount * 0.35)

      particleColors[index] = color.r
      particleColors[index + 1] = color.g
      particleColors[index + 2] = color.b
      particlePhases[i] = Math.random() * Math.PI * 2
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    group.add(particles)

    const starCount = 70
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const index = i * 3
      const radius = 4.2 + Math.random() * 2.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      starPositions[index] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[index + 1] = radius * Math.sin(phi) * Math.sin(theta)
      starPositions[index + 2] = radius * Math.cos(phi)

      const starColor = Math.random() > 0.6 ? CYAN : PURPLE
      starColors[index] = starColor.r
      starColors[index + 1] = starColor.g
      starColors[index + 2] = starColor.b
    }

    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

    const starMaterial = new THREE.PointsMaterial({
      size: 0.025,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    group.add(stars)

    const ambient = new THREE.AmbientLight(0xffffff, 0.35)
    scene.add(ambient)

    const keyLight = new THREE.PointLight('#7C3AED', 8, 25)
    keyLight.position.set(4.5, 3, 5)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight('#06B6D4', 4.5, 25)
    fillLight.position.set(-5, -1.5, -4.5)
    scene.add(fillLight)

    const rimLight = new THREE.PointLight('#E879F9', 2.5, 20)
    rimLight.position.set(0, 5, 1)
    scene.add(rimLight)

    const updateSize = () => {
      const width = Math.max(1, mount.clientWidth || 600)
      const height = Math.max(1, mount.clientHeight || width)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    let rafId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = window.requestAnimationFrame(animate)

      const t = clock.getElapsedTime()

      group.rotation.y = t * 0.22
      group.rotation.x = Math.sin(t * 0.25) * 0.08

      core.rotation.y = t * 0.12
      glow.rotation.y = -t * 0.08

      particles.rotation.y = t * 0.05
      particles.rotation.x = Math.sin(t * 0.16) * 0.04

      stars.rotation.y = -t * 0.02
      stars.rotation.x = Math.cos(t * 0.12) * 0.03

      const positions = particleGeometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < particleCount; i++) {
        const index = i * 3
        const phase = particlePhases[i]
        const wave = Math.sin(t * 0.7 + phase) * 0.045

        const x = particlePositions[index]
        const y = particlePositions[index + 1]
        const z = particlePositions[index + 2]

        const length = Math.sqrt(x * x + y * y + z * z) || 1
        positions.array[index] = x + (x / length) * wave
        positions.array[index + 1] = y + (y / length) * wave
        positions.array[index + 2] = z + (z / length) * wave
      }
      positions.needsUpdate = true

      coreMaterial.uniforms.uTime.value = t

      const pulse = 1 + Math.sin(t * 0.8) * 0.025
      group.scale.setScalar(pulse)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      window.cancelAnimationFrame(rafId)

      renderer.dispose()
      coreGeometry.dispose()
      coreMaterial.dispose()
      glowGeometry.dispose()
      glowMaterial.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      starGeometry.dispose()
      starMaterial.dispose()

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [isMobile])

  if (isMobile) {
    return null
  }

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        width: 'clamp(420px, 42vw, 600px)',
        height: 'clamp(420px, 42vw, 600px)',
        position: 'absolute',
        right: '-100px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 40px rgba(124, 58, 237, 0.22))',
      }}
    />
  )
}
