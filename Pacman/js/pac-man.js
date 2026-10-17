// Variables globales que van siempre
var renderer, scene, camera;
var camaraMini;
var cameraControls;
var clock = new THREE.Clock();
var angulo = -Math.PI /2;
var perdiste = true;

var pacman;
var mitadSuperior;
var mediaesfera;
var mediaesfera_2;
var mitadInferior;
var modoAtaque = false;

var fantasmaRojo;
var fantasmaRosa;
var fantasmaAzul;
var fantasmaNaranja;
var dirfantasmaRojo;
var dirfantasmaRosa;
var dirfantasmaAzul;
var dirfantasmaNaranja;
var vel_fantasma = 0.5;
var fantasmaRojoExiste = true;
var fantasmaRosaExiste = true;
var fantasmaAzulExiste = true;
var fantasmaNaranjaExiste = true;
var tiempoRojo;
var tiempoRosa;
var tiempoAzul;
var tiempoNaranja;

var bola1;
var bola2;
var bola3;
var bola4;
var bola1Existe = true;
var bola2Existe = true;
var bola3Existe = true;
var bola4Existe = true;
var luz1;
var luz2;
var luz3;
var luz4;


var radioPacman = 7
var juego_pausado = false;
var anguloMax = Math.PI / 4; // 45 grados
var velocidad = 0.03;
var sentido = 1;
var p_pos = new THREE.Vector3(170, radioPacman, 150);
var teletransporteDisponible = true;
const textureLoader = new THREE.TextureLoader();
  const texturaPacmanCara = textureLoader.load('images/PacMan_2.png');
  const texturaPacmanCara_Alt = textureLoader.load('images/PacMan_Alt.png');


var alturafantasma = 7;
var radiofantasma = 3;

var alturamapa=60;

//variables camara
var distancia_camara = -20;
var altura_camara = 20;
var camara_orbital = false;
var camaraDelante = false;

// Crear un Raycaster
const raycaster = new THREE.Raycaster();
var objectsToCheck;

//Textos
const puntuacion = document.getElementById("puntuacion");
var puntos = 0;
puntuacion.textContent = `Puntuación: ${puntos}`;
const pantallaInicio = document.getElementById("pantallaInicio");
const pantallaFin = document.getElementById("fin");
pantallaFin.style.display = "none";
const textoFin = document.querySelector("#fin h1");


const intersecciones=[
{x: 10, z: 10},
{x: 70, z: 10},
{x: 150, z: 10},
{x: 190, z: 10},
{x: 270, z: 10},
{x: 330, z: 10},

{x: 150, z: 50},
{x: 190, z: 50},

{x: 10, z: 70},
{x: 70, z: 70},
{x: 110, z: 70},
{x: 150, z: 70},
{x: 190, z: 70},
{x: 230, z: 70},
{x: 270, z: 70},
{x: 330, z: 70},

{x: 110, z: 110},
{x: 230, z: 110},
{x: 110, z: 150},
{x: 230, z: 150},

{x: 10, z: 190},
{x: 70, z: 190},
{x: 110, z: 190},
{x: 150, z: 190},
{x: 190, z: 190},
{x: 230, z: 190},
{x: 270, z: 190},
{x: 330, z: 190},

{x: 150, z: 210},
{x: 190, z: 210},

{x: 10, z: 250},
{x: 70, z: 250},
{x: 150, z: 250},
{x: 190, z: 250},
{x: 270, z: 250},
{x: 330, z: 250},
]

const direcciones = [
  new THREE.Vector3(0, 0, 1),   // arriba
  new THREE.Vector3(1, 0, 0),   // derecha
  new THREE.Vector3(0, 0, -1),   // abajo
  new THREE.Vector3(-1, 0, 0)  // izquierda    
];

const dirIntersecciones = [
  [0, 1],
  [0, 1, 3],
  [0, 3],
  [0, 1],
  [0, 1, 3],
  [0, 3],

  [0, 1, 2],
  [0, 2, 3],

  [1, 2],
  [0, 1, 2, 3],
  [0, 1, 3],
  [2, 3],
  [1, 2],
  [0, 1, 3],
  [0, 1, 2, 3],
  [2, 3],

  [0, 1, 2],
  [0, 2, 3],
  [0, 1, 2],
  [0, 2, 3],

  [0, 1],
  [0, 1, 2, 3],
  [1, 2, 3],
  [0, 3],
  [0, 1],
  [1, 2, 3],
  [0, 1, 2, 3],
  [0, 3],

  [0, 1, 2],
  [0, 2, 3],

  [1, 2],
  [1, 2, 3],
  [2, 3],
  [1, 2],
  [1, 2, 3],
  [2, 3],
]

const controls = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    vel_pacman: 0.5
};
// Event listeners para controles
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            controls.moveForward = true;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            controls.moveLeft = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            controls.moveRight = true;
            break;
        case 'KeyP':
          if(!perdiste){
          if (!event.repeat)
            cambiarPausa();}
          break;
        case 'KeyE':
            camaraDelante = true;
            break;
        case 'Enter':
          if (perdiste){
            pantallaInicio.style.display = "none";
            pantallaFin.style.display = "none";
            nuevaPartida()
          }
          break
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            controls.moveForward = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            controls.moveLeft = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            controls.moveRight = false;
            break;
        case 'KeyE':
            camaraDelante = false;
            break;
    }
});


// 1-inicializa 
init();
// 2-Crea una escena
loadScene();
// 3-renderiza
render();

function init()
{
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( new THREE.Color(0xFFFFFF) );
  document.getElementById('container').appendChild( renderer.domElement );

  scene = new THREE.Scene();

  var aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera( 75, aspectRatio , 0.1, 10000 );
  camera.position.set( p_pos.x, p_pos.y + altura_camara, p_pos.z + distancia_camara );

  cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
  cameraControls.target.set(0,0,0);
  cameraControls.enabled = false;

  //Minimapa
  camaraMini = new THREE.OrthographicCamera( 0, 340, 0, -260, 0.1, 2000 );
  camaraMini.position.set(0, 700, 0);
  camaraMini.up.set(0, 0, -1);
  camaraMini.lookAt(0, 0, 0);
  window.addEventListener('resize', updateAspectRatio );
}


function loadScene()
{
  //luz ambiental
  const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(luzAmbiente);

    dibujarMapa();
	// Añade el objeto grafico a la escena
    let material = new THREE.MeshNormalMaterial();    
    const materialBoca = new THREE.MeshStandardMaterial({ color: 0x000000 });
    

    //Pac-man
    const mediaEsferaGeometria = new THREE.SphereGeometry(
    radioPacman,              // radio
    32,              // segmentos horizontales
    32,              // segmentos verticales
    0,
    Math.PI * 2,
    0,
    Math.PI / 2 //Media Esfera
  );
  


  const materialPacmanCara = new THREE.MeshStandardMaterial({ map: texturaPacmanCara });
  const materialPacmanCara_Alt = new THREE.MeshStandardMaterial({ map: texturaPacmanCara_Alt });
  mediaEsfera = new THREE.Mesh(mediaEsferaGeometria, materialPacmanCara);
  mediaEsfera.rotation.y=Math.PI/2;
  const tapaGeometria = new THREE.CircleGeometry(radioPacman, 32);
  tapaGeometria.rotateX(-Math.PI / 2);
  const tapa = new THREE.Mesh(tapaGeometria, materialBoca);

  tapa.rotation.z = Math.PI;
  //scene.add(mediaEsfera)
  //scene.add(tapa)

  mitadSuperior = new THREE.Group();
  mitadSuperior.add(mediaEsfera);
  mitadSuperior.add(tapa);
  //scene.add(mitadSuperior);
  
  //color: fdd802
  const materialPacMan = new THREE.MeshStandardMaterial({ color: 0xfdd802 });
  mediaEsfera_2 = new THREE.Mesh(mediaEsferaGeometria, materialPacMan);
  const tapa_2 = new THREE.Mesh(tapaGeometria, materialBoca);
  tapa_2.rotation.z = Math.PI;
  mitadInferior = new THREE.Group();
  mitadInferior.add(mediaEsfera_2);
  mitadInferior.add(tapa_2);
  mitadInferior.rotation.z = Math.PI;
  //mitadInferior.position.y -= 2;
  //scene.add(mitadInferior);
  

  pacman = new THREE.Group();
  pacman.add(mitadSuperior);
  pacman.add(mitadInferior);
  pacman.position.set(p_pos.x, p_pos.y, p_pos.z);
  scene.add(pacman);


  //Fantasmas
  
  crearFantasmaRojo()
  crearFantasmaAzul()
  crearFantasmaRosa()
  crearFantasmaNaranja()


  // Obtener una lista de los objetos que no incluyen al jugador
    objectsToCheck = scene.children.filter(obj => obj !== pacman && obj !== fantasmaAzul && obj !== fantasmaRojo && obj !== fantasmaRosa && obj !== fantasmaNaranja);  

  crearBolas()
}


function updateAspectRatio()
{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function update()
{
  if(perdiste){
    return
  }
  // Juego en pausa
  if (juego_pausado) {
    return;
  }
  
  animacion_pacman(mitadSuperior, mitadInferior)
  // Calcular el vector de dirección de vista
  let velocity = new THREE.Vector3(Math.sin(angulo), 0, Math.cos(angulo));

  // Actualizar el ángulo basado en los controles de izquierda y derecha
  if (controls.moveLeft) angulo += 0.05;
  if (controls.moveRight) angulo -= 0.05;


  if (controls.moveForward) {
    // mueve el personaje hacia delante 
    const distanciasRayos = [-0.9,-0.5, 0, 0.5, 0.9];
    let hayColision = false;
    let rayLength
    for (const distanciaRayos of distanciasRayos){
        const direccion = velocity.clone().normalize();
        //Longitud de los rayos
        rayLength = Math.sqrt(radioPacman**2 - (distanciaRayos*radioPacman)**2) + controls.vel_pacman;
        const lateral = new THREE.Vector3(-direccion.z, 0, direccion.x);
        const origen = p_pos.clone().add(lateral.clone().multiplyScalar(distanciaRayos * radioPacman));
        raycaster.set(origen, direccion);
        raycaster.far = rayLength;

        // Detectar intersecciones con objetos en la escena (por ejemplo, las paredes)
        const intersects = raycaster.intersectObjects(objectsToCheck, true);

        if (intersects.length > 0) {
        hayColision = true;
        break;
        }
    }

    // Si no hay intersección, permitir el movimiento
    if (!hayColision) {
    p_pos.add(
        velocity.clone().normalize().multiplyScalar(controls.vel_pacman)
    );
    }
    

  }
  
  //TP
  const posicionObjetivo1 = new THREE.Vector3(0, radioPacman, 130);
  const posicionObjetivo2 = new THREE.Vector3(340, radioPacman, 130);
  const posicionDestino1 = new THREE.Vector3(5, radioPacman, 130);
  const posicionDestino2 = new THREE.Vector3(335, radioPacman, 130);
  
  if (teletransporteDisponible && p_pos.distanceTo(posicionObjetivo1) < 5) {
    p_pos.copy(posicionDestino2);
    teletransporteDisponible = false;
    }
    if (teletransporteDisponible && p_pos.distanceTo(posicionObjetivo2) < 5) {
    p_pos.copy(posicionDestino1);
    teletransporteDisponible = false;
    }
    if (p_pos.distanceTo(posicionObjetivo1) >= 5 && p_pos.distanceTo(posicionObjetivo2) >= 5) {
    teletransporteDisponible = true;
    }

  // actualizo la pos. del mesh que representa el jugador
  pacman.position.set(p_pos.x, p_pos.y, p_pos.z);
  pacman.rotation.y = angulo+ Math.PI;

  //Movimiento fantasmas
  if (intersecciones.some(obj => obj.x === fantasmaRojo.position.x && obj.z ===fantasmaRojo.position.z)){
    dirfantasmaRojo = obtenerDireccion(fantasmaRojo.position)
    if (dirfantasmaRojo == direcciones[0]){fantasmaRojo.rotation.y = Math.PI}
    if (dirfantasmaRojo == direcciones[1]){fantasmaRojo.rotation.y = -Math.PI/2}
    if (dirfantasmaRojo == direcciones[2]){fantasmaRojo.rotation.y = 0}
    if (dirfantasmaRojo == direcciones[3]){fantasmaRojo.rotation.y = Math.PI/2}
    //Mover fantasma rojo  en la dirección obtenida
    fantasmaRojo.position.add(dirfantasmaRojo.clone().multiplyScalar(vel_fantasma));
  }
  else{
    fantasmaRojo.position.add(dirfantasmaRojo.clone().multiplyScalar(vel_fantasma));
  }

  if (intersecciones.some(obj => obj.x === fantasmaNaranja.position.x && obj.z ===fantasmaNaranja.position.z)){
    dirfantasmaNaranja = obtenerDireccion(fantasmaNaranja.position)
    if (dirfantasmaNaranja == direcciones[0]){fantasmaNaranja.rotation.y = Math.PI}
    if (dirfantasmaNaranja == direcciones[1]){fantasmaNaranja.rotation.y = -Math.PI/2}
    if (dirfantasmaNaranja == direcciones[2]){fantasmaNaranja.rotation.y = 0}
    if (dirfantasmaNaranja == direcciones[3]){fantasmaNaranja.rotation.y = Math.PI/2}
    //Mover fantasma naranja en la dirección obtenida
    fantasmaNaranja.position.add(dirfantasmaNaranja.clone().multiplyScalar(vel_fantasma));
  }
  else{
    fantasmaNaranja.position.add(dirfantasmaNaranja.clone().multiplyScalar(vel_fantasma));
  }

  if (intersecciones.some(obj => obj.x === fantasmaRosa.position.x && obj.z ===fantasmaRosa.position.z)){
    dirfantasmaRosa = obtenerDireccion(fantasmaRosa.position)
    if (dirfantasmaRosa == direcciones[0]){fantasmaRosa.rotation.y = Math.PI}
    if (dirfantasmaRosa == direcciones[1]){fantasmaRosa.rotation.y = -Math.PI/2}
    if (dirfantasmaRosa == direcciones[2]){fantasmaRosa.rotation.y = 0}
    if (dirfantasmaRosa == direcciones[3]){fantasmaRosa.rotation.y = Math.PI/2}
    //Mover fantasma rosa en la dirección obtenida
    fantasmaRosa.position.add(dirfantasmaRosa.clone().multiplyScalar(vel_fantasma));
  }
  else{
    fantasmaRosa.position.add(dirfantasmaRosa.clone().multiplyScalar(vel_fantasma));
  }

  if (intersecciones.some(obj => obj.x === fantasmaAzul.position.x && obj.z ===fantasmaAzul.position.z)){
    dirfantasmaAzul = obtenerDireccion(fantasmaAzul.position)
    if (dirfantasmaAzul == direcciones[0]){fantasmaAzul.rotation.y = Math.PI}
    if (dirfantasmaAzul == direcciones[1]){fantasmaAzul.rotation.y = -Math.PI/2}
    if (dirfantasmaAzul == direcciones[2]){fantasmaAzul.rotation.y = 0}
    if (dirfantasmaAzul == direcciones[3]){fantasmaAzul.rotation.y = Math.PI/2}
    //Mover fantasma azul en la dirección obtenida
    fantasmaAzul.position.add(dirfantasmaAzul.clone().multiplyScalar(vel_fantasma));
  }
  else{
    fantasmaAzul.position.add(dirfantasmaAzul.clone().multiplyScalar(vel_fantasma));
  }

  //Comer esfera de energía
  console.log(fantasmaAzul.position.y)
  if (p_pos.distanceTo(bola1.position) < 7 && bola1Existe){
    scene.remove(bola1)
    scene.remove(luz1)
    mediaEsfera.material.map = texturaPacmanCara_Alt;
    mediaEsfera.material.needsUpdate = true;
    mediaEsfera_2.material.color.set(0x0616f8);
    modoAtaque= true;
    cambiarModoNormal()
    bola1Existe = false;
    cooldownBola1()
  }
  if (p_pos.distanceTo(bola2.position) < 7 && bola2Existe){
    scene.remove(bola2)
    scene.remove(luz2)
    mediaEsfera.material.map = texturaPacmanCara_Alt;
    mediaEsfera.material.needsUpdate = true;
    mediaEsfera_2.material.color.set(0x0616f8);
    modoAtaque= true;
    cambiarModoNormal()
    bola2Existe = false;
    cooldownBola2()
  }
  if (p_pos.distanceTo(bola3.position) < 7 && bola3Existe){
    scene.remove(bola3)
    scene.remove(luz3)
    mediaEsfera.material.map = texturaPacmanCara_Alt;
    mediaEsfera.material.needsUpdate = true;
    mediaEsfera_2.material.color.set(0x0616f8);
    modoAtaque= true;
    cambiarModoNormal()
    bola3Existe = false;
    cooldownBola3()
  }
  if (p_pos.distanceTo(bola4.position) < 7&& bola4Existe){
    scene.remove(bola4)
    scene.remove(luz4)
    mediaEsfera.material.map = texturaPacmanCara_Alt;
    mediaEsfera.material.needsUpdate = true;
    mediaEsfera_2.material.color.set(0x0616f8);
    modoAtaque= true;
    cambiarModoNormal()
    bola4Existe = false;
    cooldownBola4()
  }
  
  //Comer fantasmas
  if (p_pos.distanceTo(fantasmaRojo.position) < 7 && fantasmaRojoExiste){
    if(modoAtaque){
      scene.remove(fantasmaRojo)
      cooldownFantasmaRojo()
      puntos = puntos+1
      puntuacion.textContent = `Puntuación: ${puntos}`;
    }else{hasPerdido()}
  }
  if (p_pos.distanceTo(fantasmaRosa.position) < 7 && fantasmaRosaExiste){
    if(modoAtaque){
      scene.remove(fantasmaRosa)
      cooldownFantasmaRosa()
      puntos = puntos+1
      puntuacion.textContent = `Puntuación: ${puntos}`;
    }else{hasPerdido()}
  }
  if (p_pos.distanceTo(fantasmaAzul.position) < 7 && fantasmaAzulExiste){
    if(modoAtaque){
      scene.remove(fantasmaAzul)
      cooldownFantasmaAzul()
      puntos = puntos+1
      puntuacion.textContent = `Puntuación: ${puntos}`;
    }else{hasPerdido()}
  }
  if (p_pos.distanceTo(fantasmaNaranja.position) < 7 && fantasmaNaranjaExiste){
    if(modoAtaque){
      scene.remove(fantasmaNaranja)
      cooldownFantasmaNaranja()
      puntos = puntos+1
      puntuacion.textContent = `Puntuación: ${puntos}`;
    }else{hasPerdido()}
  }

  //Camara
  if(camaraDelante){
    const desplazamientoCamara = new THREE.Vector3(0, altura_camara, -distancia_camara);
    desplazamientoCamara.applyAxisAngle( new THREE.Vector3(0, 1, 0), angulo);
    const posicionCamara = pacman.position.clone().add(desplazamientoCamara);
    camera.position.copy(posicionCamara);

  }
  else{
  const desplazamientoCamara = new THREE.Vector3(0, altura_camara, distancia_camara);
  desplazamientoCamara.applyAxisAngle( new THREE.Vector3(0, 1, 0), angulo);
  const posicionCamara = pacman.position.clone().add(desplazamientoCamara);

  //Al hacer TP mover la camara
  //si distancia > 100
    if (camera.position.distanceTo(posicionCamara) > 30) {
    camera.position.copy(posicionCamara);
    }
    else{camera.position.lerp(posicionCamara, 0.03);}
}
  
  camera.lookAt(pacman.position);
  //cameraControls.target.set(pacman.position);

}

function render()
{
	requestAnimationFrame( render );
	update();
	renderer.setScissorTest(false);
    renderer.setViewport(0,0,window.innerWidth,window.innerHeight);
    renderer.render( scene, camera );

    const menor = Math.min(window.innerWidth, window.innerHeight);
    const miniSize = menor / 4;
    
    const miniAncho = miniSize * 17/13;
    const miniAlto = miniSize;
    
    const miniX = 0;
    const miniY = window.innerHeight - miniAlto;

    renderer.setScissorTest(true);
    renderer.setScissor(miniX, miniY, miniAncho, miniAlto);
    renderer.setViewport(miniX, miniY, miniAncho, miniAlto);
    

    renderer.render(scene, camaraMini);
    renderer.setScissorTest(false);
}

function animacion_pacman(medioesferaSuperior, medioesferaInferior) {
        
    medioesferaSuperior.rotation.x += velocidad * sentido;
    medioesferaInferior.rotation.x -= velocidad * sentido;

    if (medioesferaSuperior.rotation.x >= anguloMax) {
        medioesferaSuperior.rotation.x = anguloMax;
        medioesferaInferior.rotation.x = -anguloMax;
        sentido = -1;
    }

    if (medioesferaSuperior.rotation.x <= 0) {
        medioesferaSuperior.rotation.x = 0;
        medioesferaInferior.rotation.x = 0;
        sentido = 1;
    }
}

// PAUSA- al pausar habilitamos OrbitControls; al continuar recuperamos la
// camara en tercera persona. El render sigue activo para poder mover la vista.
function cambiarPausa()
{
  juego_pausado = !juego_pausado;
  if (juego_pausado !== camara_orbital){
  cambiarCamara();}

  // Evita conservar una tecla de movimiento pulsada al cambiar de estado.
  controls.moveForward = false;
  controls.moveBackward = false;
  controls.moveLeft = false;
  controls.moveRight = false;

  console.log(juego_pausado ? 'Juego pausado' : 'Juego reanudado');
}

function dibujarMapa(){
    //Mapa
    let material = new THREE.MeshNormalMaterial();
    let texturaSuelo = textureLoader.load('images/suelo-azul.webp');
    texturaSuelo.wrapS = THREE.RepeatWrapping;  
    texturaSuelo.wrapT = THREE.RepeatWrapping;  
    texturaSuelo.repeat.set(5, 5);  // Repetir la textura
    let materialSuelo = new THREE.MeshStandardMaterial({ map: texturaSuelo });
    const planoGeometria = new THREE.PlaneGeometry(600, 500);
    const plano = new THREE.Mesh(planoGeometria, materialSuelo);
    plano.rotation.x = -Math.PI / 2;
    plano.position.x=170
    plano.position.z=130
    scene.add(plano);

    let texturaPared = textureLoader.load('images/ladrillo-azul.avif');
    let materialPared = new THREE.MeshStandardMaterial({ map: texturaPared });

    let texturaParedA = textureLoader.load('images/ladrillo-azul.avif');
    texturaParedA.wrapS = THREE.RepeatWrapping;  
    texturaParedA.wrapT = THREE.RepeatWrapping;  
    texturaParedA.repeat.set(0.4, 1);  // Repetir la textura
    let materialParedA = new THREE.MeshStandardMaterial({ map: texturaParedA });

    const cuboAGeometria = new THREE.BoxGeometry(40, alturamapa, 40);
    const cuboA1 =  new THREE.Mesh(cuboAGeometria, materialParedA);
    cuboA1.position.x=40;
    cuboA1.position.y=alturamapa/2;
    cuboA1.position.z=40;
    const cuboA2 =  new THREE.Mesh(cuboAGeometria, materialParedA);
    cuboA2.position.x = 300;
    cuboA2.position.y=alturamapa/2;
    cuboA2.position.z=40;
    const cuboA3 =  new THREE.Mesh(cuboAGeometria, materialParedA);
    cuboA3.position.x = 40;
    cuboA3.position.y=alturamapa/2;
    cuboA3.position.z=220;
    const cuboA4 =  new THREE.Mesh(cuboAGeometria, materialParedA);
    cuboA4.position.x = 300;
    cuboA4.position.y=alturamapa/2;
    cuboA4.position.z=220;
    scene.add(cuboA1)
    scene.add(cuboA2)
    scene.add(cuboA3)
    scene.add(cuboA4)

    let texturaParedB = textureLoader.load('images/ladrillo-azul.avif');
    texturaParedB.wrapS = THREE.RepeatWrapping;  
    texturaParedB.wrapT = THREE.RepeatWrapping;  
    texturaParedB.repeat.set(0.6, 1);  // Repetir la textura
    let materialParedB = new THREE.MeshStandardMaterial({ map: texturaParedB });

    const cuboBGeometria = new THREE.BoxGeometry(60, alturamapa, 40);
    const cuboB1 = new THREE.Mesh(cuboBGeometria, materialParedB);
    cuboB1.position.x=110;
    cuboB1.position.y=alturamapa/2;
    cuboB1.position.z=40;
    const cuboB2 = new THREE.Mesh(cuboBGeometria, materialParedB);
    cuboB2.position.x=230;
    cuboB2.position.y=alturamapa/2;
    cuboB2.position.z=40;
    const cuboB3 = new THREE.Mesh(cuboBGeometria, materialParedB);
    cuboB3.position.x=110;
    cuboB3.position.y=alturamapa/2;
    cuboB3.position.z=220;
    const cuboB4 = new THREE.Mesh(cuboBGeometria, materialParedB);
    cuboB4.position.x=230;
    cuboB4.position.y=alturamapa/2;
    cuboB4.position.z=220;
    scene.add(cuboB1);
    scene.add(cuboB2);
    scene.add(cuboB3);
    scene.add(cuboB4);
    

    const cuboCGeometria = new THREE.BoxGeometry(20, alturamapa, 100);
    const cuboC1 = new THREE.Mesh(cuboCGeometria, materialPared);
    cuboC1.position.x=90;
    cuboC1.position.y=alturamapa/2;
    cuboC1.position.z=130;
    const cuboC2 = new THREE.Mesh(cuboCGeometria, materialPared);
    cuboC2.position.x=250;
    cuboC2.position.y=alturamapa/2;
    cuboC2.position.z=130;
    const cuboC3 = new THREE.Mesh(cuboCGeometria, materialPared);
    cuboC3.position.x=-80;
    cuboC3.position.y=alturamapa/2;
    cuboC3.position.z=130;
    const cuboC4 = new THREE.Mesh(cuboCGeometria, materialPared);
    cuboC4.position.x=420;
    cuboC4.position.y=alturamapa/2;
    cuboC4.position.z=130;
    scene.add(cuboC1)
    scene.add(cuboC2)
    scene.add(cuboC3)
    scene.add(cuboC4)

    const cuboDGeometria = new THREE.BoxGeometry(100, alturamapa, 20);
    const cuboD1 = new THREE.Mesh(cuboDGeometria, materialPared);
    cuboD1.position.x=170;
    cuboD1.position.y=alturamapa/2;
    cuboD1.position.z=90;
    const cuboD2 = new THREE.Mesh(cuboDGeometria, materialPared);
    cuboD2.position.x=170;
    cuboD2.position.y=alturamapa/2;
    cuboD2.position.z=130;
    const cuboD3 = new THREE.Mesh(cuboDGeometria, materialPared);
    cuboD3.position.x=170;
    cuboD3.position.y=alturamapa/2;
    cuboD3.position.z=170;
    scene.add(cuboD1)
    scene.add(cuboD2)
    scene.add(cuboD3)

    let texturaParedE = textureLoader.load('images/ladrillo-azul.avif');
    texturaParedE.wrapS = THREE.RepeatWrapping;  
    texturaParedE.wrapT = THREE.RepeatWrapping;  
    texturaParedE.repeat.set(0.2, 1);  // Repetir la textura
    let materialParedE = new THREE.MeshStandardMaterial({ map: texturaParedE });
    const cuboEGeometria = new THREE.BoxGeometry(20, alturamapa, 20);
    const cuboE1 = new THREE.Mesh(cuboEGeometria, materialParedE);
    cuboE1.position.x=170;
    cuboE1.position.y=alturamapa/2;
    cuboE1.position.z=70;
    const cuboE2 = new THREE.Mesh(cuboEGeometria, materialParedE);
    cuboE2.position.x=170;
    cuboE2.position.y=alturamapa/2;
    cuboE2.position.z=190;
    scene.add(cuboE1);
    scene.add(cuboE2);

    let texturaParedF = textureLoader.load('images/ladrillo-azul.avif');
    texturaParedF.wrapS = THREE.RepeatWrapping;  
    texturaParedF.wrapT = THREE.RepeatWrapping;  
    texturaParedF.repeat.set(0.4, 1);  // Repetir la textura
    let materialParedF = new THREE.MeshStandardMaterial({ map: texturaParedF });
    const cuboFGeometria = new THREE.BoxGeometry(20, alturamapa, 40);
    const cuboF1 = new THREE.Mesh(cuboFGeometria, materialParedF);
    cuboF1.position.x=170;
    cuboF1.position.y=alturamapa/2;
    cuboF1.position.z=20;
    const cuboF2 = new THREE.Mesh(cuboFGeometria, materialParedF);
    cuboF2.position.x=170;
    cuboF2.position.y=alturamapa/2;
    cuboF2.position.z=240;
    scene.add(cuboF1);
    scene.add(cuboF2);

    let texturaParedG = textureLoader.load('images/ladrillo-azul.avif');
    texturaParedG.wrapS = THREE.MirroredRepeatWrapping;  
    texturaParedG.wrapT = THREE.MirroredRepeatWrapping;  
    texturaParedG.repeat.set(1.1, 1);  // Repetir la textura
    let materialParedG = new THREE.MeshStandardMaterial({ map: texturaParedG });
    const cuboGGeometria = new THREE.BoxGeometry(110, alturamapa, 40);
    const cuboG1 = new THREE.Mesh(cuboGGeometria, materialParedG);
    cuboG1.position.x=5;
    cuboG1.position.y=alturamapa/2;
    cuboG1.position.z=100;
    const cuboG2 = new THREE.Mesh(cuboGGeometria, materialParedG);
    cuboG2.position.x=5;
    cuboG2.position.y=alturamapa/2;
    cuboG2.position.z=160;
    const cuboG3 = new THREE.Mesh(cuboGGeometria, materialParedG);
    cuboG3.position.x=335;
    cuboG3.position.y=alturamapa/2;
    cuboG3.position.z=100;
    const cuboG4 = new THREE.Mesh(cuboGGeometria, materialParedG);
    cuboG4.position.x=335;
    cuboG4.position.y=alturamapa/2;
    cuboG4.position.z=160;
    scene.add(cuboG1);
    scene.add(cuboG2);
    scene.add(cuboG3);
    scene.add(cuboG4);


    let texturaParedA1 = textureLoader.load('images/ladrillo-azul.avif');
    texturaParedA1.wrapS = THREE.MirroredRepeatWrapping;  
    texturaParedA1.wrapT = THREE.MirroredRepeatWrapping;  
    texturaParedA1.repeat.set(3.4, 1);  // Repetir la textura
    let materialParedA1 = new THREE.MeshStandardMaterial({ map: texturaParedA1 });
    const paredAGeometria= new THREE.PlaneGeometry(340, alturamapa);
    const paredA1 = new THREE.Mesh(paredAGeometria, materialParedA1);
    paredA1.position.x = 340/2;
    paredA1.position.y = alturamapa/2;
    const paredA2 = new THREE.Mesh(paredAGeometria, materialParedA1);
    paredA2.position.x = 340/2;
    paredA2.position.y = alturamapa/2;
    paredA2.position.z = 260;
    paredA2.rotation.y = Math.PI;
    scene.add(paredA1)
    scene.add(paredA2)


    let texturaParedB1 = textureLoader.load('images/ladrillo-azul.avif');
    texturaParedB1.wrapS = THREE.MirroredRepeatWrapping;  
    texturaParedB1.wrapT = THREE.MirroredRepeatWrapping;  
    texturaParedB1.repeat.set(1.2, 1);  // Repetir la textura
    let materialParedB1 = new THREE.MeshStandardMaterial({ map: texturaParedB1 });
    const paredBGeometria= new THREE.PlaneGeometry(120, alturamapa);
    const paredB1 = new THREE.Mesh(paredBGeometria, materialParedB1);
    paredB1.position.x = 0;
    paredB1.position.y = alturamapa/2;
    paredB1.position.z = 60;
    paredB1.rotation.y = Math.PI /2;
    const paredB2 = new THREE.Mesh(paredBGeometria, materialParedB1);
    paredB2.position.x = 340;
    paredB2.position.y = alturamapa/2;
    paredB2.position.z = 60;
    paredB2.rotation.y = -Math.PI /2;
    const paredB3 = new THREE.Mesh(paredBGeometria, materialParedB1);
    paredB3.position.x = 0;
    paredB3.position.y = alturamapa/2;
    paredB3.position.z = 200;
    paredB3.rotation.y = Math.PI /2;
    const paredB4 = new THREE.Mesh(paredBGeometria, materialParedB1);
    paredB4.position.x = 340;
    paredB4.position.y = alturamapa/2;
    paredB4.position.z = 200;
    paredB4.rotation.y = -Math.PI /2;
    scene.add(paredB1)
    scene.add(paredB2)
    scene.add(paredB3)
    scene.add(paredB4)
}

function cambiarCamara(){
    camara_orbital = !camara_orbital;
    cameraControls.enabled = camara_orbital;

    if (camara_orbital) {
    cameraControls.target.copy(pacman.position);
    cameraControls.update();
    }
}

function crearFantasmaRojo(){
  let cuerpoGeometriaRojo = new THREE.CylinderGeometry(radiofantasma, radiofantasma, alturafantasma, 32, 32);
  //Rojo = fb0201
  const materialRojo = new THREE.MeshStandardMaterial({ color: 0xfb0201 });
  const texturaRojoCara = textureLoader.load('images/FantasmaRojo.png');
  const materialRojoCara = new THREE.MeshStandardMaterial({ map: texturaRojoCara });

  //Fantasma rojo
  const cuerpo = new THREE.Mesh(cuerpoGeometriaRojo, materialRojoCara);
  cuerpo.position.x = 0;
  cuerpo.position.y = alturafantasma/2;
  cuerpo.position.z = 0;
  //scene.add(cuerpo);
  const pieGeometria = new THREE.SphereGeometry(1, 32, 32)
  const pie1Rojo = new THREE.Mesh(pieGeometria, materialRojo);
  pie1Rojo.position.x = -1;
  pie1Rojo.position.z = -1.73;
  const pie2Rojo = new THREE.Mesh(pieGeometria, materialRojo);
  pie2Rojo.position.x = 1;
  pie2Rojo.position.z = -1.73;
  const pie3Rojo = new THREE.Mesh(pieGeometria, materialRojo);
  pie3Rojo.position.x = 2;
  pie3Rojo.position.z = 0;
  const pie4Rojo = new THREE.Mesh(pieGeometria, materialRojo);
  pie4Rojo.position.x = 1;
  pie4Rojo.position.z = 1.73;
  const pie5Rojo = new THREE.Mesh(pieGeometria, materialRojo);
  pie5Rojo.position.x = -1;
  pie5Rojo.position.z = 1.73;
  const pie6Rojo = new THREE.Mesh(pieGeometria, materialRojo);
  pie6Rojo.position.x = -2;
  pie6Rojo.position.z = 0;

  const cabezaGeometriaRojo = new THREE.SphereGeometry(radiofantasma, 32, 32, 0, Math.PI * 2, 0, Math.PI/ 2)
  const cabezaRojo = new THREE.Mesh(cabezaGeometriaRojo, materialRojo);
  cabezaRojo.position.x =0;
  cabezaRojo.position.y = alturafantasma;
  cabezaRojo.position.z = 0;


  fantasmaRojo = new THREE.Group();
  fantasmaRojo.add(cuerpo);
  fantasmaRojo.add(pie1Rojo);
  fantasmaRojo.add(pie2Rojo);
  fantasmaRojo.add(pie3Rojo);
  fantasmaRojo.add(pie4Rojo);
  fantasmaRojo.add(pie5Rojo);
  fantasmaRojo.add(pie6Rojo);
  fantasmaRojo.add(cabezaRojo);

  
  fantasmaRojo.scale.set(1.5, 1, 1.5);
  fantasmaRojo.position.y = 1;
  fantasmaRojo.position.x = 10;
  fantasmaRojo.position.z = 70;

  fantasmaRojo.rotation.y += Math.PI 
  scene.add(fantasmaRojo);
}

function crearFantasmaAzul(){
  let cuerpoGeometriaAzul = new THREE.CylinderGeometry(radiofantasma, radiofantasma, alturafantasma, 32, 32);
  //Azul = 0x7af5f5
  const materialAzul = new THREE.MeshStandardMaterial({ color: 0x7af5f5 });
  const texturaAzulCara = textureLoader.load('images/FantasmaAzul.png');
  const materialAzulCara = new THREE.MeshStandardMaterial({ map: texturaAzulCara });

  //Fantasma Azul
  const cuerpo = new THREE.Mesh(cuerpoGeometriaAzul, materialAzulCara);
  cuerpo.position.x = 0;
  cuerpo.position.y = alturafantasma/2;
  cuerpo.position.z = 0;
  //scene.add(cuerpo);
  const pieGeometria = new THREE.SphereGeometry(1, 32, 32)
  const pie1Azul = new THREE.Mesh(pieGeometria, materialAzul);
  pie1Azul.position.x = -1;
  pie1Azul.position.z = -1.73;
  const pie2Azul = new THREE.Mesh(pieGeometria, materialAzul);
  pie2Azul.position.x = 1;
  pie2Azul.position.z = -1.73;
  const pie3Azul = new THREE.Mesh(pieGeometria, materialAzul);
  pie3Azul.position.x = 2;
  pie3Azul.position.z = 0;
  const pie4Azul = new THREE.Mesh(pieGeometria, materialAzul);
  pie4Azul.position.x = 1;
  pie4Azul.position.z = 1.73;
  const pie5Azul = new THREE.Mesh(pieGeometria, materialAzul);
  pie5Azul.position.x = -1;
  pie5Azul.position.z = 1.73;
  const pie6Azul = new THREE.Mesh(pieGeometria, materialAzul);
  pie6Azul.position.x = -2;
  pie6Azul.position.z = 0;

  const cabezaGeometriaAzul = new THREE.SphereGeometry(radiofantasma, 32, 32, 0, Math.PI * 2, 0, Math.PI/ 2)
  const cabezaAzul = new THREE.Mesh(cabezaGeometriaAzul, materialAzul);
  cabezaAzul.position.x = 0;
  cabezaAzul.position.y = alturafantasma;
  cabezaAzul.position.z = 0;


  fantasmaAzul = new THREE.Group();
  fantasmaAzul.add(cuerpo);
  fantasmaAzul.add(pie1Azul);
  fantasmaAzul.add(pie2Azul);
  fantasmaAzul.add(pie3Azul);
  fantasmaAzul.add(pie4Azul);
  fantasmaAzul.add(pie5Azul);
  fantasmaAzul.add(pie6Azul);
  fantasmaAzul.add(cabezaAzul);

  
  fantasmaAzul.scale.set(1.5, 1, 1.5);
  fantasmaAzul.position.y = 1;
  fantasmaAzul.position.x = 330;
  fantasmaAzul.position.z = 70;

  fantasmaAzul.rotation.y += Math.PI 
  scene.add(fantasmaAzul);
}

function crearFantasmaRosa(){
  let cuerpoGeometriaRosa = new THREE.CylinderGeometry(radiofantasma, radiofantasma, alturafantasma, 32, 32);
  //Rosa = 0xfe93ff
  const materialRosa = new THREE.MeshStandardMaterial({ color: 0xfe93ff });
  const texturaRosaCara = textureLoader.load('images/FantasmaRosa.png');
  const materialRosaCara = new THREE.MeshStandardMaterial({ map: texturaRosaCara });

  //Fantasma Rosa
  const cuerpo = new THREE.Mesh(cuerpoGeometriaRosa, materialRosaCara);
  cuerpo.position.x = 0;
  cuerpo.position.y = alturafantasma/2;
  cuerpo.position.z = 0;
  //scene.add(cuerpo);
  const pieGeometria = new THREE.SphereGeometry(1, 32, 32)
  const pie1Rosa = new THREE.Mesh(pieGeometria, materialRosa);
  pie1Rosa.position.x = -1;
  pie1Rosa.position.z = -1.73;
  const pie2Rosa = new THREE.Mesh(pieGeometria, materialRosa);
  pie2Rosa.position.x = 1;
  pie2Rosa.position.z = -1.73;
  const pie3Rosa = new THREE.Mesh(pieGeometria, materialRosa);
  pie3Rosa.position.x = 2;
  pie3Rosa.position.z = 0;
  const pie4Rosa = new THREE.Mesh(pieGeometria, materialRosa);
  pie4Rosa.position.x = 1;
  pie4Rosa.position.z = 1.73;
  const pie5Rosa = new THREE.Mesh(pieGeometria, materialRosa);
  pie5Rosa.position.x = -1;
  pie5Rosa.position.z = 1.73;
  const pie6Rosa = new THREE.Mesh(pieGeometria, materialRosa);
  pie6Rosa.position.x = -2;
  pie6Rosa.position.z = 0;

  const cabezaGeometriaRosa = new THREE.SphereGeometry(radiofantasma, 32, 32, 0, Math.PI * 2, 0, Math.PI/ 2)
  const cabezaRosa = new THREE.Mesh(cabezaGeometriaRosa, materialRosa);
  cabezaRosa.position.x = 0;
  cabezaRosa.position.y = alturafantasma;
  cabezaRosa.position.z = 0;


  fantasmaRosa = new THREE.Group();
  fantasmaRosa.add(cuerpo);
  fantasmaRosa.add(pie1Rosa);
  fantasmaRosa.add(pie2Rosa);
  fantasmaRosa.add(pie3Rosa);
  fantasmaRosa.add(pie4Rosa);
  fantasmaRosa.add(pie5Rosa);
  fantasmaRosa.add(pie6Rosa);
  fantasmaRosa.add(cabezaRosa);

  
  fantasmaRosa.scale.set(1.5, 1, 1.5);
  fantasmaRosa.position.y = 1;
  fantasmaRosa.position.x = 10;
  fantasmaRosa.position.z = 190;

  fantasmaRosa.rotation.y += Math.PI 
  scene.add(fantasmaRosa);
}

function crearFantasmaNaranja(){
  let cuerpoGeometriaNaranja = new THREE.CylinderGeometry(radiofantasma, radiofantasma, alturafantasma, 32, 32);
  //Naranja = 0xffa62e
  const materialNaranja = new THREE.MeshStandardMaterial({ color: 0xffa62e });
  const texturaNaranjaCara = textureLoader.load('images/FantasmaNaranja.png');
  const materialNaranjaCara = new THREE.MeshStandardMaterial({ map: texturaNaranjaCara });

  //Fantasma Naranja
  const cuerpo = new THREE.Mesh(cuerpoGeometriaNaranja, materialNaranjaCara);
  cuerpo.position.x = 0;
  cuerpo.position.y = alturafantasma/2;
  cuerpo.position.z = 0;
  //scene.add(cuerpo);
  const pieGeometria = new THREE.SphereGeometry(1, 32, 32)
  const pie1Naranja = new THREE.Mesh(pieGeometria, materialNaranja);
  pie1Naranja.position.x = -1;
  pie1Naranja.position.z = -1.73;
  const pie2Naranja = new THREE.Mesh(pieGeometria, materialNaranja);
  pie2Naranja.position.x = 1;
  pie2Naranja.position.z = -1.73;
  const pie3Naranja = new THREE.Mesh(pieGeometria, materialNaranja);
  pie3Naranja.position.x = 2;
  pie3Naranja.position.z = 0;
  const pie4Naranja = new THREE.Mesh(pieGeometria, materialNaranja);
  pie4Naranja.position.x = 1;
  pie4Naranja.position.z = 1.73;
  const pie5Naranja = new THREE.Mesh(pieGeometria, materialNaranja);
  pie5Naranja.position.x = -1;
  pie5Naranja.position.z = 1.73;
  const pie6Naranja = new THREE.Mesh(pieGeometria, materialNaranja);
  pie6Naranja.position.x = -2;
  pie6Naranja.position.z = 0;

  const cabezaGeometriaNaranja = new THREE.SphereGeometry(radiofantasma, 32, 32, 0, Math.PI * 2, 0, Math.PI/ 2)
  const cabezaNaranja = new THREE.Mesh(cabezaGeometriaNaranja, materialNaranja);
  cabezaNaranja.position.x = 0;
  cabezaNaranja.position.y = alturafantasma;
  cabezaNaranja.position.z = 0;


  fantasmaNaranja = new THREE.Group();
  fantasmaNaranja.add(cuerpo);
  fantasmaNaranja.add(pie1Naranja);
  fantasmaNaranja.add(pie2Naranja);
  fantasmaNaranja.add(pie3Naranja);
  fantasmaNaranja.add(pie4Naranja);
  fantasmaNaranja.add(pie5Naranja);
  fantasmaNaranja.add(pie6Naranja);
  fantasmaNaranja.add(cabezaNaranja);

  
  fantasmaNaranja.scale.set(1.5, 1, 1.5);
  fantasmaNaranja.position.y = 1;
  fantasmaNaranja.position.x = 330;
  fantasmaNaranja.position.z = 190;

  fantasmaNaranja.rotation.y += Math.PI 
  scene.add(fantasmaNaranja);
}

function obtenerDireccion(posF){
  let x = posF.x
  let z = posF.z
  let inter = { x: x, z: z };
  let indice = intersecciones.findIndex(obj => obj.x === inter.x && obj.z === inter.z);
  let posiblesDir = dirIntersecciones[indice];
  const direccion = posiblesDir[Math.floor(Math.random() * posiblesDir.length)];
  let res = direcciones[direccion]
  return res
}

function crearBolas(){
  const bolaGeometria = new THREE.SphereGeometry(2, 32, 32)
  const bolamaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });

  bola1 = new THREE.Mesh(bolaGeometria, bolamaterial);
  bola1.position.x = 10;
  bola1.position.y = radioPacman;
  bola1.position.z = 10;

  bola2 = new THREE.Mesh(bolaGeometria, bolamaterial);
  bola2.position.x = 330;
  bola2.position.y = radioPacman;
  bola2.position.z = 10;

  bola3 = new THREE.Mesh(bolaGeometria, bolamaterial);
  bola3.position.x = 10;
  bola3.position.y = radioPacman;
  bola3.position.z = 250;

  bola4 = new THREE.Mesh(bolaGeometria, bolamaterial);
  bola4.position.x = 330;
  bola4.position.y = radioPacman;
  bola4.position.z = 250;

  scene.add(bola1)
  scene.add(bola2)
  scene.add(bola3)
  scene.add(bola4)

  //Luces puntuales
  luz1 = new THREE.PointLight(0xffffff, 1, 50); // color, intensidad, distancia
  luz1.position.set(10, radioPacman, 10); 
  scene.add(luz1)

  luz2 = new THREE.PointLight(0xffffff, 1, 50); // color, intensidad, distancia
  luz2.position.set(330, radioPacman, 10); 
  scene.add(luz2)

  luz3 = new THREE.PointLight(0xffffff, 1, 50); // color, intensidad, distancia
  luz3.position.set(10, radioPacman, 250); 
  scene.add(luz3)

  luz4 = new THREE.PointLight(0xffffff, 1, 50); // color, intensidad, distancia
  luz4.position.set(330, radioPacman, 250); 
  scene.add(luz4)
}

function cambiarModoNormal(){
  setTimeout(() => {
      mediaEsfera.material.map = texturaPacmanCara;
      mediaEsfera.material.needsUpdate = true;
      mediaEsfera_2.material.color.set(0xfdd802);
      modoAtaque= false;
    }, 10000);

}

function cooldownBola1(){
  setTimeout(() => {
      scene.add(bola1);
      scene.add(luz1);
      bola1Existe = true;
    }, 20000);
}
function cooldownBola2(){
  setTimeout(() => {
      scene.add(bola2);
      scene.add(luz2);
      bola2Existe = true;
    }, 20000);
}
function cooldownBola3(){
  setTimeout(() => {
      scene.add(bola3);
      scene.add(luz3);
      bola3Existe = true;
    }, 20000);
}
function cooldownBola4(){
  setTimeout(() => {
      scene.add(bola4);
      scene.add(luz4);
      bola4Existe = true;
    }, 20000);
}

function cooldownFantasmaRojo(){
  fantasmaRojo.position.x = -1000
  fantasmaRojo.position.y = -1000
  fantasmaRojo.position.z = -1000
  tiempoRojo = setTimeout(() => {
      fantasmaRojo.position.x = 10;
      fantasmaRojo.position.y = 1;
      fantasmaRojo.position.z = 70;
      scene.add(fantasmaRojo);
      fantasmaRojoExiste = true;
    }, 20000);
}
function cooldownFantasmaRosa(){
  fantasmaRosa.position.x = -1000
  fantasmaRosa.position.y = -1000
  fantasmaRosa.position.z = -1000
  tiempoRosa = setTimeout(() => {
      fantasmaRosa.position.x = 10;
      fantasmaRosa.position.y = 1;
      fantasmaRosa.position.z = 190;
      scene.add(fantasmaRosa);
      fantasmaRosaExiste = true;
    }, 20000);
}
function cooldownFantasmaAzul(){
  fantasmaAzul.position.x = -1000
  fantasmaAzul.position.y = -1000
  fantasmaAzul.position.z = -1000
  tiempoAzul = setTimeout(() => {
      fantasmaAzul.position.x = 330;
      fantasmaAzul.position.y = 1;
      fantasmaAzul.position.z = 70;
      scene.add(fantasmaAzul);
      fantasmaAzulExiste = true;
    }, 20000);
}
function cooldownFantasmaNaranja(){
  fantasmaNaranja.position.x = -1000
  fantasmaNaranja.position.y = -1000
  fantasmaNaranja.position.z = -1000
  tiempoNaranja = setTimeout(() => {
      fantasmaNaranja.position.x = 330;
      fantasmaNaranja.position.y = 1;
      fantasmaNaranja.position.z = 190;
      scene.add(fantasmaNaranja);
      fantasmaNaranjaExiste = true;
    }, 20000);
}

function nuevaPartida(){
  console.log("New")
  puntos=0;
  puntuacion.textContent = `Puntuación: ${puntos}`;
  perdiste = false;
  p_pos.x = 170
  p_pos.z = 150

  clearTimeout(tiempoRojo);
  clearTimeout(tiempoRosa);
  clearTimeout(tiempoAzul);
  clearTimeout(tiempoNaranja);

  fantasmaRojoExiste = true;
  fantasmaRosaExiste = true;
  fantasmaAzulExiste = true;
  fantasmaNaranjaExiste = true;

  fantasmaRojo.position.x = 10;
  fantasmaRojo.position.y = 1;
  fantasmaRojo.position.z = 70;
  scene.add(fantasmaRojo)

  fantasmaRosa.position.x = 10;
  fantasmaRosa.position.y = 1;
  fantasmaRosa.position.z = 190;
  scene.add(fantasmaRosa)

  fantasmaAzul.position.x = 330;
  fantasmaAzul.position.y = 1;
  fantasmaAzul.position.z = 70;
  scene.add(fantasmaAzul)

  fantasmaNaranja.position.x = 330;
  fantasmaNaranja.position.y = 1;
  fantasmaNaranja.position.z = 190;
  scene.add(fantasmaNaranja)

}

function hasPerdido(){
  perdiste=true;
  textoFin.innerHTML = `¡Te han pillado!<br>Puntuación: ${puntos}`;
  pantallaFin.style.display = "flex";
}