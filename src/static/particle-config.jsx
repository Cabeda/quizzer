

/**
 * The default configuation for the ParticleField component
 *
 * Any option passed in via props will overwrite the default config
 */
const config = {
    showCube: false,
    dimension: "3D",
    velocity: 2,
    lines: {
      colorMode: "solid",
      color: "#3FB568",
      transparency: 0.9,
      limitConnections: true,
      maxConnections: 20,
      minDistance: 60,
      visible: true
    },
    particles: {
      colorMode: "solid",
      color: "#FFF",
      transparency: 0.2,
      shape: "circle",
      boundingBox: "canvas",
      count: 300,
      minSize: 20,
      maxSize: 50,
      visible: true
    },
    cameraControls: {
      enabled: false,
      enableDamping: true,
      dampingFactor: 0.2,
      enableZoom: true,
      autoRotate: false,
      autoRotateSpeed: 0.3,
      resetCameraFlag: true
    }
  };

export default config;