'use client';

// 3B spiral kapak galerisi — Yıldız Dikme prompt'unun teknik tarifi,
// Next.js bileşenine uyarlandı. Kurallar:
// - Zayıf cihaz / WebGL yok / animasyon-azalt → hiç kurulmaz (statik hero kalır)
// - Kurulum requestIdleCallback ile ertelenir: başlık (LCP) 3B'yi beklemez
// - Kapaklar /_next/image üzerinden küçültülmüş iner (75 tam boy görsel İNMEZ)
// - Sekme gizlendiğinde veya hero ekran dışına çıktığında çizim durur

import { useEffect, useRef } from 'react';
import { fragmentShader, vertexShader } from './heroShaders';

const CONFIG = {
  tilesPerRevolution: 15,
  revolutions: 5,
  startRadius: 5,
  endRadius: 3.5,
  tileHeightRatio: 1.1,
  tileSegments: 24,
  spiralGap: 0.35,
  tileOverlap: 0.005,
  cameraZ: 12,
  cameraSmoothing: 0.075,
  baseRotationSpeed: 0.001,
  scrollRotationMultiplier: 0.0035,
  rotationDecay: 0.9,
  scrollMultiplier: 1.25,
  cameraYMultiplier: 0.2,
  parallaxStrength: 0.1,
  spiralOffsetY: -2.0,
};

// Cihaz bu sahneyi akıcı taşıyamayacaksa hiç başlatma.
function cihazZayifMi(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return true;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return true;
  if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 3) return true;
  try {
    const c = document.createElement('canvas');
    if (!c.getContext('webgl2') && !c.getContext('webgl')) return true;
  } catch {
    return true;
  }
  return false;
}

// Kapağı Next görsel optimizasyonundan küçültülmüş çek (WebP, CDN önbellekli).
function textureUrl(cover: string, w: number): string {
  return `/_next/image?url=${encodeURIComponent(cover)}&w=${w}&q=75`;
}

export default function HeroSpiral({ covers }: { covers: string[] }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hostRef.current || covers.length === 0 || cihazZayifMi()) return;

    const host = hostRef.current;
    let disposed = false;
    let cleanupScene: (() => void) | null = null;

    const start = async () => {
      const THREE = await import('three');
      if (disposed) return;

      const isMobile = () => window.innerWidth < 768;

      const state = {
        scrollProgress: 0,
        spinVelocity: 0,
        targetCameraY: 0,
        currentCameraY: 0,
        targetTiltX: 0,
        targetTiltZ: 0,
        currentTiltX: 0,
        currentTiltZ: 0,
        heroVisible: true,
        lastScrollY: window.scrollY,
        lastScrollT: performance.now(),
      };

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        host.clientWidth / Math.max(host.clientHeight, 1),
        0.1,
        100
      );
      camera.position.set(0, 0, CONFIG.cameraZ + (isMobile() ? 3 : 0));

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.setClearColor(0, 0);
      host.appendChild(renderer.domElement);

      // --- Kavisli karo geometrisi (düz plane DEĞİL) ---
      function createCurvedTileGeometry(radius: number, arcAngle: number, tileHeight: number, segments: number) {
        const positions: number[] = [];
        const uvs: number[] = [];
        const indices: number[] = [];
        for (let s = 0; s <= segments; s++) {
          const t = s / segments;
          const theta = (t - 0.5) * arcAngle;
          const x = Math.sin(theta) * radius;
          const z = Math.cos(theta) * radius;
          positions.push(x, tileHeight / 2, z, x, -tileHeight / 2, z);
          uvs.push(t, 1, t, 0);
        }
        for (let s = 0; s < segments; s++) {
          const a = s * 2;
          indices.push(a, a + 1, a + 2, a + 2, a + 1, a + 3);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geo.setIndex(indices);
        geo.computeVertexNormals();
        return geo;
      }

      // --- Dokular: hata olursa koyu gri yedek, spiral her koşulda çizilir ---
      const loader = new THREE.TextureLoader();
      const texW = isMobile() ? 256 : 384;
      const fallbackTexture = () => {
        const t = new THREE.DataTexture(new Uint8Array([22, 22, 24, 255]), 1, 1);
        t.needsUpdate = true;
        return t;
      };
      const loadTexture = (url: string) =>
        new Promise<InstanceType<typeof THREE.Texture>>((resolve) => {
          loader.load(
            textureUrl(url, texW),
            (t) => {
              t.colorSpace = THREE.SRGBColorSpace;
              t.anisotropy = renderer.capabilities.getMaxAnisotropy();
              t.minFilter = THREE.LinearMipmapLinearFilter;
              t.magFilter = THREE.LinearFilter;
              resolve(t);
            },
            undefined,
            () => resolve(fallbackTexture())
          );
        });

      const textures = await Promise.all(covers.map(loadTexture));
      if (disposed) {
        textures.forEach((t) => t.dispose());
        renderer.dispose();
        renderer.domElement.remove();
        return;
      }

      // --- Spiral kurulumu ---
      const totalTiles = CONFIG.tilesPerRevolution * CONFIG.revolutions; // 75
      const angleStep = (Math.PI * 2) / CONFIG.tilesPerRevolution;
      const arcAngle = angleStep + CONFIG.tileOverlap;
      const chord = 2 * CONFIG.startRadius * Math.sin(angleStep / 2);
      const tileHeight = chord * CONFIG.tileHeightRatio;
      const startY = ((totalTiles - 1) * CONFIG.spiralGap) / 2;

      const spiral = new THREE.Group();
      const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
      const materials: InstanceType<typeof THREE.ShaderMaterial>[] = [];

      for (let i = 0; i < totalTiles; i++) {
        const radius =
          CONFIG.startRadius + (CONFIG.endRadius - CONFIG.startRadius) * (i / Math.max(totalTiles - 1, 1));
        const geo = createCurvedTileGeometry(radius, arcAngle, tileHeight, CONFIG.tileSegments);
        const mat = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uMap: { value: textures[i % textures.length] },
            uCameraPosition: { value: camera.position },
          },
          side: THREE.DoubleSide,
          transparent: true,
        });
        const tile = new THREE.Mesh(geo, mat);
        tile.position.y = startY - i * CONFIG.spiralGap;
        tile.rotation.y = i * angleStep;
        spiral.add(tile);
        geometries.push(geo);
        materials.push(mat);
      }
      spiral.position.y = CONFIG.spiralOffsetY;
      scene.add(spiral);

      // --- Kaydırma: hız → dönüş ivmesi, ilerleme → kamera inişi ---
      const onScroll = () => {
        const now = performance.now();
        const dy = window.scrollY - state.lastScrollY;
        const dt = Math.max(now - state.lastScrollT, 1);
        state.lastScrollY = window.scrollY;
        state.lastScrollT = now;
        const velocity = (dy / dt) * 16; // kare başına normalize
        state.spinVelocity += velocity * CONFIG.scrollRotationMultiplier * CONFIG.scrollMultiplier * 0.1;
        const heroH = Math.max(host.clientHeight, 1);
        state.scrollProgress = Math.min(window.scrollY / heroH, 1);
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      // --- Fare paralaksı (yalnız masaüstü) ---
      const onMouseMove = (e: MouseEvent) => {
        if (isMobile()) return;
        const mx = (e.clientX / window.innerWidth) * 2 - 1;
        const my = (e.clientY / window.innerHeight) * 2 - 1;
        state.targetTiltX = my * CONFIG.parallaxStrength;
        state.targetTiltZ = mx * CONFIG.parallaxStrength * -0.5;
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      const onResize = () => {
        camera.aspect = host.clientWidth / Math.max(host.clientHeight, 1);
        camera.updateProjectionMatrix();
        camera.position.z = CONFIG.cameraZ + (isMobile() ? 3 : 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
        renderer.setSize(host.clientWidth, host.clientHeight);
        if (isMobile()) {
          state.targetTiltX = 0;
          state.targetTiltZ = 0;
        }
      };
      window.addEventListener('resize', onResize);

      // Hero ekran dışındayken ve sekme gizliyken çizme (pil + ısı).
      const io = new IntersectionObserver((entries) => {
        state.heroVisible = entries[0]?.isIntersecting ?? true;
      });
      io.observe(host);

      let raf = 0;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!state.heroVisible || document.hidden) return;

        spiral.rotation.y += CONFIG.baseRotationSpeed + state.spinVelocity;
        state.spinVelocity *= CONFIG.rotationDecay;

        if (!isMobile()) {
          state.currentTiltX += (state.targetTiltX - state.currentTiltX) * CONFIG.cameraSmoothing;
          state.currentTiltZ += (state.targetTiltZ - state.currentTiltZ) * CONFIG.cameraSmoothing;
          spiral.rotation.x = state.currentTiltX;
          spiral.rotation.z = state.currentTiltZ;
        }

        state.targetCameraY = -state.scrollProgress * CONFIG.cameraYMultiplier * 10;
        state.currentCameraY += (state.targetCameraY - state.currentCameraY) * CONFIG.cameraSmoothing;
        camera.position.y = state.currentCameraY;
        camera.lookAt(0, state.currentCameraY * 0.4, 0);

        renderer.render(scene, camera);
      };
      tick();

      host.classList.add('is-ready');

      cleanupScene = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        textures.forEach((t) => t.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // Kurulumu boşta ana erteleme: başlık ilk boyamayı 3B beklemeden yapar.
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const w = window as IdleWindow;
    if (w.requestIdleCallback) {
      w.requestIdleCallback(() => void start(), { timeout: 1500 });
    } else {
      requestAnimationFrame(() => requestAnimationFrame(() => void start()));
    }

    return () => {
      disposed = true;
      cleanupScene?.();
    };
  }, [covers]);

  return <div ref={hostRef} className="rt-hero-canvas" aria-hidden="true" />;
}
