import {
  AmbientLight,
  AxesHelper,
  GridHelper,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PointLight,
  SpotLight,
} from "three";

function createAcrWorld(world: Group) {
  const light = new PointLight(0xffffff, 400, 1000, 1);
  light.position.set(0, 280, 20);
  world.add(light);

  const light2 = new PointLight(0xffffff, 100, 1000, 1);
  light2.position.set(-230, 50, 80);
  world.add(light2);

  // const axesHelper = new AxesHelper( 120 );
  // world.add( axesHelper )

  const ambient = new AmbientLight(0xffffff, 0.2);
  world.add(ambient);

  const geometry = new IcosahedronGeometry(100, 0);
  const strandMat = new MeshPhysicalMaterial({
    color: 0x64d7de,
    // emissive: 0x64d7de,
    metalness: 0.7,
    roughness: 0.3,
    reflectivity: 0.3,
    // clearcoat: 0.8,
    // clearcoatRoughness: 0.12
  });

  const phongMat = new MeshPhongMaterial({
    color: 0x64d7de,
    specular: 0xffffff,
    shininess: 10,
  });
  const object = new Mesh(geometry, phongMat);
  object.position.set(0, 0, 0);
  object.rotateX(90);
  // object.rotateY(40)
  object.rotateZ(10);
  world.add(object);
}

export { createAcrWorld };
