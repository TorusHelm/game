import * as THREE from 'three';
import CharacterModel from './character'

export default class CharacterPolygon extends THREE.Mesh {
    constructor(camera) {
        super(
            new THREE.BoxGeometry( 1, 1, 1 ),
            new THREE.MeshBasicMaterial( { wireframe: true } )
        );

        this.camera = camera;
        this.position.y = 1;
        this.baseSpeed = 0.025;
        this.baseDash = 5;
        this.dashTimeout = false;
        this.dashCD = 5000;
    }

    keyDown = new Set();
    character = new CharacterModel(this.position.y);

    init() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        this.add(this.character);
    }

    handleKeyDown(event) {
        this.keyDown.add(event.key.toLowerCase());
    }

    handleKeyUp(event) {
        this.keyDown.delete(event.key.toLowerCase());
    }

    updateInput() {
        this.add(this.camera);
        this.character.update();

        if (this.keyDown.has('w') || this.keyDown.has('arrowup')) {
            this.position.y+=this.baseSpeed;
        }

        if (this.keyDown.has('s') || this.keyDown.has('arrowdown')) {
            this.position.y-=this.baseSpeed;
        }

        if (this.keyDown.has('a') || this.keyDown.has('arrowleft')) {
            this.position.x+=this.baseSpeed;
        }

        if (this.keyDown.has('d') || this.keyDown.has('arrowright')) {
            this.position.x-=this.baseSpeed;
        }

        if (this.keyDown.has(' ') && !this.dashTimeout) {
            if (this.keyDown.has('w') || this.keyDown.has('arrowup')) {
                this.position.y+=this.baseDash;
            }

            if (this.keyDown.has('s') || this.keyDown.has('arrowdown')) {
                this.position.y-=this.baseDash;
            }

            if (this.keyDown.has('a') || this.keyDown.has('arrowleft')) {
                this.position.x+=this.baseDash;
            }

            if (this.keyDown.has('d') || this.keyDown.has('arrowright')) {
                this.position.x-=this.baseDash;
            }


            this.dashTimeout = true;

            setTimeout(() => {
                this.dashTimeout = false;
            }, this.dashCD);
        }
    }

    update() {
        this.updateInput();
    }
}