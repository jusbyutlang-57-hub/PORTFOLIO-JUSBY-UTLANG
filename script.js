// 1. Live Copyright Year & Real-Time Philippine Clock (PHT)
document.getElementById('yr').textContent = new Date().getFullYear();

const clock = document.getElementById('clock');
function updateClock() {
  clock.textContent =
    new Date().toLocaleString('en-PH', {
      timeZone: 'Asia/Manila',
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }) + ' PHT';
}
updateClock();
setInterval(updateClock, 1000);

// 2. Mobile Navigation Drawer
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function setMenu(open) {
  mobileMenu.classList.toggle('hidden', !open);
  menuBtn.setAttribute('aria-expanded', String(open));
}

menuBtn.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
document.querySelectorAll('.mm-link').forEach((link) => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) setMenu(false);
});

// 3. Active Section Highlighting in Desktop Navbar
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((sec) => sectionObserver.observe(sec));

// 4. Cursor-Tracking Monochrome Spotlight Effect on Dark Cards
document.querySelectorAll('.spotlight-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

// 5. Contact Form Submission (Formspree AJAX)
const form = document.getElementById('cf');
const formStatus = document.getElementById('st');

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  formStatus.textContent = 'Sending…';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      formStatus.textContent = 'Thank you! Your message was sent. I’ll get back to you soon.';
      form.reset();
    } else {
      formStatus.textContent = 'Something went wrong. Please email me at jusbylim@gmail.com.';
    }
  } catch {
    formStatus.textContent = 'Network error. Please email me at jusbylim@gmail.com.';
  }
});

// 6. One-Click Email Copy Button with Fallback
document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const temp = document.createElement('textarea');
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
    }
    const original = btn.textContent.trim();
    btn.textContent = 'Copied!';
    setTimeout(() => (btn.textContent = original), 2000);
  });
});

// 7. GSAP & ScrollTrigger Motion Framework
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-stagger > *', {
    y: 22,
    opacity: 0,
    duration: 0.75,
    stagger: 0.1,
    ease: 'power3.out'
  });

  gsap.from('.hero-card', {
    y: 28,
    opacity: 0,
    duration: 0.85,
    delay: 0.25,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.from(el, {
      y: 28,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 86%',
        once: true
      }
    });
  });

  gsap.utils.toArray('.skill-bar').forEach((bar) => {
    gsap.from(bar, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%',
        once: true
      }
    });
  });
}

// 8. Three.js Custom GLSL Shader & Architectural Systems Scene
(function initThreeScene() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch {
    return;
  }

  const isMobile = () => window.innerWidth < 768;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.028);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    120
  );
  camera.position.set(0, 1.1, 16);

  // =========================================================================
  // LAYER 1: Custom GLSL Interactive Topographic Data Terrain (Particle Wave)
  // =========================================================================
  const cols = isMobile() ? 42 : 74;
  const rows = isMobile() ? 28 : 48;
  const terrainCount = cols * rows;
  const terrainPositions = new Float32Array(terrainCount * 3);
  const terrainSeeds = new Float32Array(terrainCount);

  const widthSpan = 46;
  const depthSpan = 28;
  let ptr = 0;

  for (let r = 0; r < rows; r++) {
    const zNorm = r / (rows - 1) - 0.5;
    for (let c = 0; c < cols; c++) {
      const xNorm = c / (cols - 1) - 0.5;
      terrainPositions[ptr * 3] = xNorm * widthSpan;
      terrainPositions[ptr * 3 + 1] = -4.1;
      terrainPositions[ptr * 3 + 2] = zNorm * depthSpan - 2.0;
      terrainSeeds[ptr] = Math.random();
      ptr++;
    }
  }

  const terrainGeo = new THREE.BufferGeometry();
  terrainGeo.setAttribute('position', new THREE.BufferAttribute(terrainPositions, 3));
  terrainGeo.setAttribute('aSeed', new THREE.BufferAttribute(terrainSeeds, 1));

  const terrainUniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uMouse3D: { value: new THREE.Vector3(999, -4.1, 999) },
    uShockOrigin: { value: new THREE.Vector3(0, -4.1, 0) },
    uShockTime: { value: 99.0 }
  };

  const terrainMat = new THREE.ShaderMaterial({
    uniforms: terrainUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute float aSeed;
      uniform float uTime;
      uniform float uPixelRatio;
      uniform vec3 uMouse3D;
      uniform vec3 uShockOrigin;
      uniform float uShockTime;
      varying float vAlpha;

      void main() {
        vec3 pos = position;

        // Multi-harmonic architectural wave
        float w1 = sin(pos.x * 0.24 + uTime * 0.65) * cos(pos.z * 0.22 + uTime * 0.45) * 1.15;
        float w2 = sin((pos.x * 0.45 - pos.z * 0.35) + uTime * 0.95) * 0.38;
        float elevation = w1 + w2;

        // Magnetic cursor hover bulge
        float mouseDist = distance(pos.xz, uMouse3D.xz);
        float mouseInfluence = smoothstep(6.5, 0.0, mouseDist);
        elevation += mouseInfluence * 1.35;

        // Click shockwave ring across the terrain
        float shockDist = distance(pos.xz, uShockOrigin.xz);
        float shockRadius = uShockTime * 14.0;
        float shockBand = exp(-pow((shockDist - shockRadius) * 0.65, 2.0)) * smoothstep(3.5, 0.0, uShockTime);
        elevation += shockBand * 1.5;

        pos.y += elevation;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        float crest = clamp((elevation + 1.4) / 3.0, 0.0, 1.0);
        gl_PointSize = (1.8 + crest * 2.2 + mouseInfluence * 1.8 + shockBand * 2.4) * uPixelRatio * (14.0 / -mvPosition.z);

        // Fade edges into darkness and illuminate peaks, cursor, and shockwaves
        float edgeFade = smoothstep(23.0, 11.0, abs(pos.x)) * smoothstep(16.0, 6.0, abs(pos.z + 2.0));
        vAlpha = edgeFade * (0.10 + crest * 0.28 + mouseInfluence * 0.38 + shockBand * 0.55);
      }
    `,
    fragmentShader: `
      varying float vAlpha;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float soft = smoothstep(0.5, 0.12, dist);
        gl_FragColor = vec4(vec3(1.0), soft * vAlpha);
      }
    `
  });

  const terrainPoints = new THREE.Points(terrainGeo, terrainMat);
  scene.add(terrainPoints);

  // =========================================================================
  // LAYER 2: Obsidian Fresnel Core & Precision CAD Gyroscopic Astrolabe
  // =========================================================================
  const astrolabeGroup = new THREE.Group();
  astrolabeGroup.position.set(isMobile() ? 0 : 3.75, isMobile() ? 1.5 : 0.25, isMobile() ? -2.2 : 0);
  scene.add(astrolabeGroup);

  // 2a. Custom GLSL Obsidian-Glass Fresnel Sphere with Animated Contour Scanlines
  const coreUniforms = {
    uTime: { value: 0 },
    uPulse: { value: 0 }
  };

  const coreGeo = new THREE.IcosahedronGeometry(2.15, 4);
  const coreMat = new THREE.ShaderMaterial({
    uniforms: coreUniforms,
    transparent: true,
    vertexShader: `
      varying vec3 vNormalView;
      varying vec3 vViewDir;
      varying vec3 vLocalPos;

      void main() {
        vLocalPos = position;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormalView = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uPulse;
      varying vec3 vNormalView;
      varying vec3 vViewDir;
      varying vec3 vLocalPos;

      void main() {
        float ndotv = clamp(dot(normalize(vNormalView), normalize(vViewDir)), 0.0, 1.0);
        float fresnel = pow(1.0 - ndotv, 2.8);

        // Subtle architectural latitude contour lines
        float scan = smoothstep(0.92, 0.99, sin(vLocalPos.y * 14.0 - uTime * 1.4));
        float rimGlow = fresnel * (0.78 + uPulse * 0.45) + scan * fresnel * 0.35;

        vec3 baseObsidian = vec3(0.02, 0.02, 0.02);
        vec3 color = mix(baseObsidian, vec3(1.0), clamp(rimGlow, 0.0, 1.0));
        float alpha = clamp(0.82 + fresnel * 0.18, 0.0, 1.0);

        gl_FragColor = vec4(color, alpha);
      }
    `
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  astrolabeGroup.add(coreMesh);

  // 2b. Clean Geodesic Edges Cage (No messy diagonal triangulation)
  const cageBaseGeo = new THREE.IcosahedronGeometry(2.58, 1);
  const cageEdgesGeo = new THREE.EdgesGeometry(cageBaseGeo);
  const cageMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.24
  });
  const cageMesh = new THREE.LineSegments(cageEdgesGeo, cageMat);
  astrolabeGroup.add(cageMesh);

  // 2c. Precision Graduated HUD Dial Ring (72 radial tick marks + inner track)
  const hudRingGroup = new THREE.Group();
  hudRingGroup.rotation.set(Math.PI * 0.34, Math.PI * 0.14, 0);
  astrolabeGroup.add(hudRingGroup);

  const innerTrack = new THREE.Mesh(
    new THREE.TorusGeometry(3.45, 0.01, 8, 128),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 })
  );
  hudRingGroup.add(innerTrack);

  const tickCount = 72;
  const tickPositions = new Float32Array(tickCount * 2 * 3);
  for (let i = 0; i < tickCount; i++) {
    const angle = (i / tickCount) * Math.PI * 2;
    const isMajor = i % 6 === 0;
    const rStart = 3.55;
    const rEnd = isMajor ? 3.82 : 3.68;

    tickPositions[i * 6] = Math.cos(angle) * rStart;
    tickPositions[i * 6 + 1] = Math.sin(angle) * rStart;
    tickPositions[i * 6 + 2] = 0;

    tickPositions[i * 6 + 3] = Math.cos(angle) * rEnd;
    tickPositions[i * 6 + 4] = Math.sin(angle) * rEnd;
    tickPositions[i * 6 + 5] = 0;
  }
  const tickGeo = new THREE.BufferGeometry();
  tickGeo.setAttribute('position', new THREE.BufferAttribute(tickPositions, 3));
  const tickLines = new THREE.LineSegments(
    tickGeo,
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.32 })
  );
  hudRingGroup.add(tickLines);

  // 2d. Counter-Tilted Orbital Ring with 3 Luminous Data Satellites
  const orbitRingGroup = new THREE.Group();
  orbitRingGroup.rotation.set(-Math.PI * 0.28, -Math.PI * 0.22, 0.4);
  astrolabeGroup.add(orbitRingGroup);

  const orbitRadius = 4.35;
  const orbitTrack = new THREE.Mesh(
    new THREE.TorusGeometry(orbitRadius, 0.009, 8, 128),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16 })
  );
  orbitRingGroup.add(orbitTrack);

  const satelliteGeo = new THREE.SphereGeometry(0.055, 12, 12);
  const satelliteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (let s = 0; s < 3; s++) {
    const angle = (s / 3) * Math.PI * 2;
    const sat = new THREE.Mesh(satelliteGeo, satelliteMat);
    sat.position.set(Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius, 0);
    orbitRingGroup.add(sat);
  }

  // 2e. Outer Sweeping Architectural Arc
  const outerArc = new THREE.Mesh(
    new THREE.TorusGeometry(5.15, 0.008, 8, 128, Math.PI * 1.35),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.14 })
  );
  outerArc.rotation.set(Math.PI * 0.42, -Math.PI * 0.15, 0);
  astrolabeGroup.add(outerArc);

  // =========================================================================
  // LAYER 3: Dynamic 3D Neural Constellation Network
  // =========================================================================
  const nodeCount = isMobile() ? 26 : 52;
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 13,
        (Math.random() - 0.5) * 10 - 2
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.008
      )
    });
  }

  const nodePositions = new Float32Array(nodeCount * 3);
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

  const nodePoints = new THREE.Points(
    nodeGeo,
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.075,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  scene.add(nodePoints);

  // Pre-allocate line buffer for node-to-node & node-to-cursor connections
  const maxSegments = (nodeCount * (nodeCount - 1)) / 2 + nodeCount;
  const linePositions = new Float32Array(maxSegments * 2 * 3);
  const lineColors = new Float32Array(maxSegments * 2 * 3);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

  const constellationLines = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  scene.add(constellationLines);

  // =========================================================================
  // Pointer, Raycasting & Click Shockwave Interaction
  // =========================================================================
  const mouseNDC = new THREE.Vector2(99, 99);
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  const raycaster = new THREE.Raycaster();
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 4.1);
  const cursorPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hitPoint = new THREE.Vector3();
  const cursor3D = new THREE.Vector3(999, 999, 0);

  window.addEventListener(
    'mousemove',
    (e) => {
      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouseX = mouseNDC.x;
      targetMouseY = mouseNDC.y;

      raycaster.setFromCamera(mouseNDC, camera);
      if (raycaster.ray.intersectPlane(groundPlane, hitPoint)) {
        terrainUniforms.uMouse3D.value.copy(hitPoint);
      }
      if (raycaster.ray.intersectPlane(cursorPlane, hitPoint)) {
        cursor3D.copy(hitPoint);
      }
    },
    { passive: true }
  );

  // Click anywhere on the page to trigger a 3D ripple & core pulse
  window.addEventListener(
    'click',
    (e) => {
      const clickNDC = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(clickNDC, camera);
      if (raycaster.ray.intersectPlane(groundPlane, hitPoint)) {
        terrainUniforms.uShockOrigin.value.copy(hitPoint);
        terrainUniforms.uShockTime.value = 0.0;
      }
      coreUniforms.uPulse.value = 1.0;
    },
    { passive: true }
  );

  // =========================================================================
  // Scroll-Driven Camera & Astrolabe Choreography
  // =========================================================================
  let scrollProgress = 0;
  window.addEventListener(
    'scroll',
    () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollProgress = window.scrollY / maxScroll;
    },
    { passive: true }
  );

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const pr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pr);
    terrainUniforms.uPixelRatio.value = pr;
  });

  // Pause rendering when browser tab is hidden
  let isTabVisible = true;
  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
  });

  // =========================================================================
  // 60 FPS Render Loop
  // =========================================================================
  const clock3D = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isTabVisible) return;

    const delta = Math.min(clock3D.getDelta(), 0.05);
    const elapsed = clock3D.getElapsedTime();
    const speed = prefersReducedMotion ? 0.15 : 1.0;

    // Update shader uniforms
    terrainUniforms.uTime.value = elapsed * speed;
    terrainUniforms.uShockTime.value += delta * 1.4;
    coreUniforms.uTime.value = elapsed * speed;
    coreUniforms.uPulse.value = Math.max(0, coreUniforms.uPulse.value - delta * 1.8);

    // Smooth spring pointer interpolation
    currentMouseX += (targetMouseX - currentMouseX) * 0.06;
    currentMouseY += (targetMouseY - currentMouseY) * 0.06;

    // Astrolabe rotations & scroll choreography
    const baseDesktopX = isMobile() ? 0 : 3.75;
    const targetGroupX = baseDesktopX - scrollProgress * (isMobile() ? 0 : 1.6);
    const targetGroupY = (isMobile() ? 1.5 : 0.25) + Math.sin(elapsed * 0.7) * 0.22 + scrollProgress * 1.4;

    astrolabeGroup.position.x += (targetGroupX - astrolabeGroup.position.x) * 0.05;
    astrolabeGroup.position.y += (targetGroupY - astrolabeGroup.position.y) * 0.05;
    astrolabeGroup.rotation.y = currentMouseX * 0.45 + scrollProgress * Math.PI * 0.65;
    astrolabeGroup.rotation.x = currentMouseY * 0.3 + scrollProgress * 0.4;

    cageMesh.rotation.y = elapsed * 0.16 * speed;
    cageMesh.rotation.x = elapsed * 0.09 * speed;

    hudRingGroup.rotation.z = elapsed * 0.14 * speed;
    orbitRingGroup.rotation.z = -elapsed * 0.26 * speed;
    outerArc.rotation.z = elapsed * 0.11 * speed;

    // Camera subtle parallax
    camera.position.x += (currentMouseX * 0.65 - camera.position.x) * 0.04;
    camera.position.y += (1.1 - currentMouseY * 0.45 - scrollProgress * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(0, -0.3 - scrollProgress * 0.8, 0);

    // Update Neural Constellation nodes & dynamic proximity lines
    let segIdx = 0;
    const connectDist = 3.5;
    const cursorConnectDist = 4.2;

    for (let i = 0; i < nodeCount; i++) {
      const n = nodes[i];
      n.pos.addScaledVector(n.vel, speed);

      if (n.pos.x > 12 || n.pos.x < -12) n.vel.x *= -1;
      if (n.pos.y > 6.5 || n.pos.y < -6.5) n.vel.y *= -1;
      if (n.pos.z > 3 || n.pos.z < -7) n.vel.z *= -1;

      nodePositions[i * 3] = n.pos.x;
      nodePositions[i * 3 + 1] = n.pos.y;
      nodePositions[i * 3 + 2] = n.pos.z;

      // Connect nearby nodes
      for (let j = i + 1; j < nodeCount; j++) {
        const m = nodes[j];
        const d = n.pos.distanceTo(m.pos);
        if (d < connectDist) {
          const intensity = (1.0 - d / connectDist) * 0.55;
          const vIdx = segIdx * 6;

          linePositions[vIdx] = n.pos.x;
          linePositions[vIdx + 1] = n.pos.y;
          linePositions[vIdx + 2] = n.pos.z;
          linePositions[vIdx + 3] = m.pos.x;
          linePositions[vIdx + 4] = m.pos.y;
          linePositions[vIdx + 5] = m.pos.z;

          lineColors[vIdx] = intensity;
          lineColors[vIdx + 1] = intensity;
          lineColors[vIdx + 2] = intensity;
          lineColors[vIdx + 3] = intensity;
          lineColors[vIdx + 4] = intensity;
          lineColors[vIdx + 5] = intensity;
          segIdx++;
        }
      }

      // Connect nodes near cursor pointer
      const dCursor = n.pos.distanceTo(cursor3D);
      if (dCursor < cursorConnectDist) {
        const intensity = (1.0 - dCursor / cursorConnectDist) * 0.85;
        const vIdx = segIdx * 6;

        linePositions[vIdx] = n.pos.x;
        linePositions[vIdx + 1] = n.pos.y;
        linePositions[vIdx + 2] = n.pos.z;
        linePositions[vIdx + 3] = cursor3D.x;
        linePositions[vIdx + 4] = cursor3D.y;
        linePositions[vIdx + 5] = 0;

        lineColors[vIdx] = intensity;
        lineColors[vIdx + 1] = intensity;
        lineColors[vIdx + 2] = intensity;
        lineColors[vIdx + 3] = intensity;
        lineColors[vIdx + 4] = intensity;
        lineColors[vIdx + 5] = intensity;
        segIdx++;
      }
    }

    nodeGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, segIdx * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
})();