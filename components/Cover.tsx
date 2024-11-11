import { useContext, useEffect, useRef, useState } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import GlobalContext from '../contexts/global'
import { frag, vertex } from '../shaders/cover'
import { shaderMaterial, useTexture } from '@react-three/drei'
import { NoToneMapping, Texture } from 'three'
import { useAnimationFrame } from 'framer-motion'
import Link from 'next/link'
const clampRAFTo60FPS = (callback:any) => (timestamp:number) => (performance.now() - (timestamp || performance.now()) >= 1000 / 60 ? callback(timestamp) : requestAnimationFrame(clampRAFTo60FPS(callback)));

export default function Cover() {
  const {
    state: { cover, window },
  } = useContext(GlobalContext)
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }
  const [time, setTime] = useState(getRandomInt(0, 4000))
  const CoverMesh = ({ height, z }: { height: number; z: number }) => {
    const texture = cover && cover.url && (useTexture(cover.url) as Texture)

    const GenMaterial = shaderMaterial(
      {
        uTexture: cover && cover.url ? (texture as Texture) : null,
        uTime: 0,
      },
      vertex,
      frag
    )
    useAnimationFrame(clampRAFTo60FPS((timestamp:any) => setTime(time + .5)))
    extend({ GenMaterial })
    return (
      <mesh position={[0, 0, z]}>
        <planeGeometry args={[8, height, 4]} />
        {/* @ts-ignore */}
        <genMaterial uTexture={texture} uTime={time} />
      </mesh>
    )
  }
  return (
    <div className="space-y-25">
      <Canvas
        className="!pointer-events-none !w-[400px] !h-[400px]"
        flat
        linear
        gl={{ toneMapping: NoToneMapping }}
      >
        <CoverMesh height={window.width <= 768 ? 8 : 4} z={window.width <= 768 ? 0 : 2.5} />
      </Canvas>
      <Link className="block decoration-none relative xl:top-4" href={cover.link as string}>
        <span className="text-center text-white">
          {cover.label} - {cover.artist}
        </span>
      </Link>
    </div>
  )
}
