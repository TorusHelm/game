import * as THREE from 'three';

export default class Camera extends THREE.PerspectiveCamera {
    constructor() {
        super(60, window.innerWidth / window.innerHeight, 1, 1000);

        this.position.set( 0, 12, -10 );
        this.lookAt( 0, 1, 0 );
    }

    update(character) {
        this.position.x = character.position.x;
        this.position.z = character.position.z - 6;
    }
}