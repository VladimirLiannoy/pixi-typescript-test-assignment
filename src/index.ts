import * as PIXI from "pixi.js";
import "./style.css";
import Assets from "./assets";
import { Sprite } from "pixi.js";

const gameWidth = 1136;
const gameHeight = 640;

const app = new PIXI.Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

const stage = app.stage;

window.onload = async (): Promise<void> => {
    const loader = await loadGameAssets();

    document.body.appendChild(app.view);

    resizeCanvas();

    const backgroundTexture = loader.resources["background"].texture;
    const backgroundSprite = new Sprite(backgroundTexture);

    // All YOUR CODE GOES HERE (for example)

    stage.addChild(backgroundSprite);
};

async function loadGameAssets(): Promise<PIXI.Loader> {
    return new Promise((res, rej) => {
        const loader = PIXI.Loader.shared;

        for (const asset in Assets) {
            loader.add(asset, Assets[asset]);
        }

        loader.onComplete.once(() => {
            res(loader);
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
}
