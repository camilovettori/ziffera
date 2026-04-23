'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function WorkBackground3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth || window.innerWidth
    const h = mount.clientHeight || 600

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Floating geometric shapes
    const shapes: THREE.Mesh[] = []
    const geometries = [
      new THREE.IcosahedronGeometry(0.6, 0),
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.TetrahedronGeometry(0.5, 0),
    ]
    const mat = new THREE.MeshBasicMaterial({ color: '#1e1040', wireframe: true, opacity: 0.5, transparent: true })

    for (let i = 0; i < 18; i++) {
      const geo = geometries[i % 3]
      const mesh = new THREE.Mesh(geo, mat.clone())
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      )
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      ;(mesh as any)._speed = 0.2 + Math.random() * 0.4
      ;(mesh as any)._drift = (Math.random() - 0.5) * 0.005
      scene.add(mesh)
      shapes.push(mesh)
    }

    // Star field
    const starCount = 300
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 100
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#4c1d95', size: 0.15, transparent: true, opacity: 0.6 }))
    scene.add(stars)

    // Grid plane
    const grid = new THREE.GridHelper(80, 30, '#0f0728', '#0f0728')
    grid.position.y = -10
    ;(grid.material as THREE.Material).opacity = 0.4
    ;(grid.material as THREE.Material).transparent = true
    scene.add(grid)

    let animId: number
    const clock = new THREE.Clock()

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      shapes.forEach((m, i) => {
        m.rotation.x += (m as any)._speed * 0.01
        m.rotation.y += (m as any)._speed * 0.008
        m.position.y += Math.sin(t * 0.3 + i) * 0.003
      })
      stars.rotation.y = t * 0.01
      grid.position.z = (t * 2) % 8
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
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
