'use strict';

const bootstrap = require("bootstrap");
const THREE = require("three");
const tween = require("tween.js");

const vs = require('../shaders/vertex.c');
const fs = require('../shaders/fragment.c');

const clock = new THREE.Clock();
let scene, renderer, camera, controls;

let geometry, group;

let cubes = [];

let time = 0.0;

let init = () => {

    //boilerplate
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x333333);
    document.querySelector("#container").appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
    );
    scene.add(camera);
    camera.position.set(0, 0, 10);

    geometry = new THREE.BoxGeometry(1, 1, 1);
    group = new THREE.Group();
    scene.add(group);

    buildTree(new THREE.Vector3(0,-5,0), new THREE.Vector3(0,1,0), 1.0);
}

let buildTree = (start, dir, size) => {
    let count = 10;
    for (var i = 0; i < count; ++i) {
        var material = new THREE.ShaderMaterial({
                    uniforms: {
                        time: {value: 0}
                    },
                    vertexShader: vs(),
                    fragmentShader: fs()
                });

        var cube = new THREE.Mesh(geometry, material);

        var pos = new THREE.Vector3();
        pos.add(dir);
        pos.multiplyScalar(i);
        pos.add(start);

        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);

        cubes.push(cube);
    }
}

let render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    group.rotation.x += .01;
    group.rotation.y += .01;

    time += 0.1;

    let step = 2 * Math.PI / cubes.length;
    for (var i = 0; i < cubes.length; ++i) {
        cubes[i].material.uniforms.time.value =  Math.sin(time - i)*0.25 + 1.0;
    }
}

init();
render();

//helpers
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
