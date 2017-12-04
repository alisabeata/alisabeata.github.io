/*global, alert, console, THREE*/

(function () {
    'use strict';
    
    var container, camera, scene, renderer, meshFloor, meshElem;
    
    // box with texture
    var box, boxTexture, boxNormalMap, boxBumpMap;
        
    var player = {
        height: 1.8,
        speed: 0.2,
        turnSpeed: Math.PI * 0.01
    };
    
    var keyboard = {};
    
    window.onload = initScene;
    
    function initScene() {
        scene = new THREE.Scene();
    
        // camera
        camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, player.height, -10);
        camera.lookAt(new THREE.Vector3(0, player.height, 0));
        
        // renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        // renderer light
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.BasicShadowMap;
        
        // add in html
        document.body.appendChild( renderer.domElement );
        
        
        
//        // global light
//        var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
//        scene.add( light );
//        
        // directional light (from the top)
//        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
//        directionalLight.position.set( 0, 1, 1 ).normalize();
//        scene.add( directionalLight );
//        
//        
//        //pointer light
//        var lights = [];
//        
//        lights[0] = new THREE.PointLight( 0xffffff, .7, 0 );
//        lights[1] = new THREE.PointLight( 0xffffff, .1, 0 );
//
//        lights[0].position.set( 400, 700, -50 );
//        lights[1].position.set( -100, -700, -550 );

        //scene.add(lights[0]);
        //scene.add(lights[1]);
        
        
        
        // light
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        
        var light = new THREE.PointLight(0xffffff, 0.8, 18);
        light.position.set(0, 10, 0);
        light.castShadow = true;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 25;
        
        scene.add(light);
        
        // element (sphere)
        meshElem = new THREE.Mesh(
            new THREE.SphereGeometry( 2, 32, 32 ),
            new THREE.MeshStandardMaterial({
                color: 0xff33ff
            })
        );
        
        // add shadow from the sphere
        meshElem.receiveShadow = true;
        meshElem.castShadow = true;
        
        // elem position
        meshElem.position.y += 5;
        
        // floor
//        meshFloor = new THREE.Mesh(
//            new THREE.PlaneGeometry(100, 100, 20, 20),
//            new THREE.MeshBasicMaterial({
//                color: 0xcccccc,
//                wireframe: true
//            })
//        );
        
        meshFloor = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 20, 20),
            new THREE.MeshPhongMaterial({
                color: 0xcccccc
            })
        );
        
        // add shadow on the floor
        meshFloor.receiveShadow = true;
        // slope of the floor
        meshFloor.rotation.x -= Math.PI / 2;
        
        
        // box with texture
        var textureLoader = new THREE.TextureLoader();
        
        boxTexture = new textureLoader.load('img/chess-fon.png');
        
        box = new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 10),
            new THREE.MeshPhongMaterial({
                color: 0xcccccc,
                map: boxTexture
            })
        );
        
        box.position.set(13, 5, 5);
        box.receiveShadow = true;
        box.castShadow = true;
        
        scene.add(box);
        
        
        
        // add sphere and floor
        scene.add(meshElem);
        scene.add(meshFloor);
        
        
        // make all
        render();
    }
    
    var elemPosStatus = 7;
    
    function render() {
        requestAnimationFrame( render );
        
        if (Math.round(meshElem.position.y) < elemPosStatus) {
            meshElem.position.y += 0.05 * player.speed;
            elemPosStatus = 7;
        } else {
            meshElem.position.y -= 0.05 * player.speed;
            elemPosStatus = 5;
        }
        
        
        //console.log(Math.sin(elemPosStatus));
//        meshElem.position.y += Math.sin(elemPosStatus);
//        
//        elemPosStatus += Math.sin(meshElem.position.y) * Math.PI;
        
        // control
        
        if (keyboard[37]) { // left
            camera.rotation.y -= player.turnSpeed;
        }
        
        if (keyboard[39]) { // right
            camera.rotation.y += player.turnSpeed;
        }
        
        if (keyboard[38]) { // top
            camera.rotation.x -= player.turnSpeed;
        }
        
        if (keyboard[40]) { // bottom
            camera.rotation.x += player.turnSpeed;
        }
        
        if (keyboard[87]) { // W key
            camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
            camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
        }
        
        if (keyboard[83]) { // S key
            camera.position.x += Math.sin(camera.rotation.y) * player.speed;
            camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
        }
        
        if (keyboard[65]) { // A key
            camera.position.x -= Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
            camera.position.z -= -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
        }
        
        if (keyboard[68]) { // D key
            camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
            camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
        }

        renderer.render( scene, camera );
    }
    
    function keyUp(event) {
        keyboard[event.keyCode] = false;
    }
    
    function keyDown(event) {
        keyboard[event.keyCode] = true;
    }
    
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    
}());