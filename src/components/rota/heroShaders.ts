// Spiral karolarının GLSL gölgelendiricileri (Yıldız prompt'undaki tarif):
// - kenarlarda hafif vinyet
// - kameradan uzaklaştıkça kararma + hafif renk soldurma (sinematik derinlik)
// Minimal tutuldu: glow/glitch/postprocessing yok.

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec3 uCameraPosition;

  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vec4 tex = texture2D(uMap, vUv);

    // Karo kenarı vinyeti
    vec2 centered = vUv - 0.5;
    float edge = 1.0 - smoothstep(0.34, 0.86, length(centered));
    edge = mix(0.78, 1.0, edge);

    // Derinlik kararması
    float dist = distance(vWorldPosition, uCameraPosition);
    float depth = 1.0 - smoothstep(8.0, 22.0, dist);
    depth = mix(0.5, 1.0, depth);

    // Uzak karolarda hafif soldurma (luma'ya doğru)
    float luma = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    vec3 color = mix(vec3(luma), tex.rgb, mix(0.6, 1.0, depth));

    color *= edge * depth;
    gl_FragColor = vec4(color, tex.a);
  }
`;
