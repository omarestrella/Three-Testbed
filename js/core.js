//Some global variables
var renderer, camera, scene;
var particles, material;
var mouseDown = false;

var COLORS = {
    RED: 0xFF0000
};

function init() {
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    
    var VIEW_ANGLE = 75,
        ASPECT = WIDTH/HEIGHT,
        NEAR = 0.1,
        FAR = 30000;
    
    var $container = $('#container');
    
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    $container.append(renderer.domElement);
    
    camera = new THREE.Camera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.z = 700;
    
    scene = new THREE.Scene();
    
    particles = new THREE.Object3D();
    scene.addObject(particles);
    
    attachDomListeners();
    update();
}

function draw(x, y) {
    for(var i = 0; i < 5; i++) {
        var particle = new THREE.Particle(
            new THREE.ParticleCanvasMaterial({
                color: COLORS.RED,
                program: drawCircle,
                opacity: Math.random()
            })
        );
        
        //particle.position.x = Math.random() * 2000 - 1000;
        //particle.position.y = Math.random() * 2000 - 1000;
        //particle.position.z = Math.random() * 2000 - 1000;
        particle.position.x = x - 300 * (Math.random() * 1.5);
        particle.position.y = y - 400 * (Math.random() * 1.5);
        particle.position.z = x * Math.random();
        
        particle.scale.x = particle.scale.y = Math.random() * 50;
        particles.addChild(particle);
    }
}

function updateCamera(x, y) {
    camera.position.x += (x - camera.position.x) * 0.6;
    camera.position.y += (y - camera.position.y) * 0.6;
}

function fade() {
    for(child in particles.children) {
        var particle = particles.children[child];
        
        if(particle.materials[0].opacity != 0) {
            var material = new THREE.ParticleCanvasMaterial({
                color: COLORS.RED,
                program: drawCircle,
                opacity: particle.materials[0].opacity - 0.05
            });
            
            particle.materials[0] = material;
        } else {
            particles.removeChild(particles.children[child]);
        }
    }
}

function drawCircle(context) {
    context.beginPath();
	context.arc(0, 0, 1, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}

function update() {
    requestAnimFrame(update);
    renderer.render(scene, camera);
}

function attachDomListeners() {    
    $('#container > canvas').mousedown(function(e) {
        draw(e.pageX, e.pageY);
    });
    
    $('#container > canvas').mouseup(function(e) {
        fade();
    });
    
    $('#container > canvas').mousemove(function(e) {
        updateCamera(e.pageX, e.pageY);
    }); 
}

$(document).ready(init);