'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ZifferaOrb() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = 900, H = 700
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── SPHERE ──────────────────────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(1.6, 128, 128)
    const sphereMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0d0628'),
      roughness: 0.1,
      metalness: 0.9,
      emissive: new THREE.Color('#3b0fa0'),
      emissiveIntensity: 0.5,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    sphere.renderOrder = -1
    scene.add(sphere)

    const wireMat = new THREE.MeshBasicMaterial({ color: '#6d28d9', wireframe: true, opacity: 0.13, transparent: true })
    const wire = new THREE.Mesh(new THREE.SphereGeometry(1.62, 32, 32), wireMat)
    wire.renderOrder = -1
    scene.add(wire)

    // Orbit rings
    const makeRing = (r: number, color: string, opacity: number, rx: number, ry: number) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.008, 16, 120),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
      )
      m.rotation.x = rx
      m.rotation.y = ry
      scene.add(m)
      return m
    }
    const ring1 = makeRing(2.8, '#7c3aed', 0.5, Math.PI * 0.15, 0)
    const ring2 = makeRing(3.1, '#2563eb', 0.25, Math.PI * 0.4, Math.PI * 0.1)

    // Particles
    const pCount = 100
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      const r = 2.2 + Math.random() * 1.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pPos[i * 3 + 2] = r * Math.cos(phi)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: '#a78bfa', size: 0.035, transparent: true, opacity: 0.7 })))

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    const l1 = new THREE.PointLight('#a855f7', 8, 25)
    l1.position.set(5, 5, 5)
    scene.add(l1)
    const l2 = new THREE.PointLight('#2563eb', 4, 25)
    l2.position.set(-5, -3, -5)
    scene.add(l2)

    // ── CANVAS CARD TEXTURES ─────────────────────────────────
    const makeCardTexture = (title: string, type: string, color: string) => {
      const canvas = document.createElement('canvas')
      canvas.width = 640
      canvas.height = 400
      const ctx = canvas.getContext('2d')!

      const grad = ctx.createLinearGradient(0, 0, 640, 400)
      grad.addColorStop(0, '#1a1040')
      grad.addColorStop(1, '#0d0628')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 640, 400)

      // Top accent bar
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 640, 4)

      // Browser chrome dots
      ctx.fillStyle = '#ef4444'
      ctx.beginPath(); ctx.arc(24, 28, 6, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#f59e0b'
      ctx.beginPath(); ctx.arc(44, 28, 6, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#22c55e'
      ctx.beginPath(); ctx.arc(64, 28, 6, 0, Math.PI * 2); ctx.fill()

      // URL bar
      ctx.fillStyle = 'rgba(255,255,255,0.08)'
      ctx.beginPath()
      ctx.roundRect(90, 18, 360, 20, 4)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.font = '13px monospace'
      ctx.fillText('ziffera.ie/' + title.toLowerCase().replace(' ', '-'), 98, 32)

      // Content area background
      ctx.fillStyle = 'rgba(255,255,255,0.04)'
      ctx.fillRect(20, 55, 600, 265)

      // Title
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 28px sans-serif'
      ctx.fillText(title, 32, 105)

      // Subtitle
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.font = '16px sans-serif'
      ctx.fillText(type, 32, 132)

      // Fake content bars
      ;[160, 185, 210, 235, 260].forEach((y, i) => {
        ctx.fillStyle = 'rgba(255,255,255,0.15)'
        ctx.fillRect(32, y, i % 2 === 0 ? 380 : 260, 10)
      })

      // CTA button
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.roundRect(32, 300, 140, 36, 6)
      ctx.fill()
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 14px sans-serif'
      ctx.fillText('View Project →', 50, 323)

      // LIVE badge
      ctx.fillStyle = '#22c55e'
      ctx.beginPath()
      ctx.roundRect(490, 302, 60, 24, 10)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 11px sans-serif'
      ctx.fillText('LIVE', 507, 319)

      return new THREE.CanvasTexture(canvas)
    }

    // ── FLOATING PROJECT CARDS ───────────────────────────────
    const projects = [
      { title: 'Frequency Framed', type: 'E-commerce Store',   color: '#7c3aed' },
      { title: 'Rub & Scrub',      type: 'Service Website',    color: '#2563eb' },
      { title: 'Zconnect',         type: 'Automation System',  color: '#059669' },
    ]

    const cards: { pivot: THREE.Object3D; speed: number; angleOffset: number }[] = []

    projects.forEach((proj, i) => {
      const pivot = new THREE.Object3D()
      scene.add(pivot)

      const angleOffset = (i / 3) * Math.PI * 2
      const orbitRadius = 2.9
      const cardW = 1.8, cardH = 1.15

      const tex = makeCardTexture(proj.title, proj.type, proj.color)
      const cardMat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide })
      const card = new THREE.Mesh(new THREE.PlaneGeometry(cardW, cardH), cardMat)
      card.position.x = orbitRadius
      card.renderOrder = 1

      const borderMat = new THREE.MeshBasicMaterial({ color: proj.color, transparent: true, opacity: 0.9 })
      const border = new THREE.Mesh(new THREE.PlaneGeometry(cardW + 0.08, cardH + 0.08), borderMat)
      border.position.x = orbitRadius
      border.position.z = -0.01
      border.renderOrder = 0

      const linePts = [new THREE.Vector3(1.65, 0, 0), new THREE.Vector3(orbitRadius - cardW / 2, 0, 0)]
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(linePts),
        new THREE.LineBasicMaterial({ color: proj.color, transparent: true, opacity: 0.35 })
      )

      pivot.add(card, border, line)
      pivot.rotation.y = angleOffset

      cards.push({ pivot, speed: 0.18 + i * 0.06, angleOffset })
    })

    // ── ANIMATE ──────────────────────────────────────────────
    let animId: number
    const clock = new THREE.Clock()

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      sphere.rotation.y = t * 0.15
      wire.rotation.y = t * 0.15

      ring1.rotation.z = t * 0.2
      ring2.rotation.z = -t * 0.15

      l1.position.x = Math.sin(t * 0.4) * 6
      l1.position.z = Math.cos(t * 0.4) * 6

      cards.forEach(({ pivot, speed, angleOffset }) => {
        pivot.rotation.y = angleOffset + t * speed
      })

      sphere.scale.setScalar(1 + Math.sin(t * 0.6) * 0.015)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: '750px',
        height: '650px',
        position: 'absolute',
        right: '-60px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 90% at 58% 50%, black 30%, transparent 70%)',
        maskImage: 'radial-gradient(ellipse 85% 90% at 58% 50%, black 30%, transparent 70%)',
      }}
    />
  )
}
