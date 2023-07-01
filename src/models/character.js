import * as THREE from 'three';

export default class Character extends THREE.Mesh {
    constructor(position) {
        super(
            new THREE.BoxGeometry( 1, 2, 2 ),
            new THREE.MeshBasicMaterial( { wireframe: true } )
        );
        this.position.y = position.y;
        this.position.x = position.x;
    }

    update() {
        this.rotateY(0.005);
    }
}