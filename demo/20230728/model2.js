import { SpriteMaterial, Sprite, TextureLoader,BoxGeometry, Mesh, MeshLambertMaterial,Group} from 'three';

const group = new Group();

const mesh = (() => {
  const geometry = new BoxGeometry(25,100,50);
  geometry.translate(0,50,0);
  const material = new MeshLambertMaterial({color:0x00ffff});
  return  new Mesh(geometry,material);
})();

const sprite = (() => {
  const texture = new TextureLoader().load("./光点.png");
  const spriteMaterial = new SpriteMaterial({
    // color:0x00ffff,//设置颜色
    // transparent:true,
    map: texture
  });
  
  const sprite = new Sprite(spriteMaterial);
  sprite.scale.set(10,10,1);
  sprite.position.set(0, 100 + 10/2, 0);//设置位置，要考虑sprite尺寸影响
  return sprite
})();

group.add(mesh,sprite);


export default group;