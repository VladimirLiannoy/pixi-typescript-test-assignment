import "./style.css";
import Assets from "./assets";
import { Sprite, Application, Loader } from "pixi.js";

const gameWidth = 1136;
const gameHeight = 640;

const app = new Application({
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

    stage.addChild(backgroundSprite);
};

async function loadGameAssets(): Promise<Loader> {
    return new Promise((resolve, reject) => {
        const loader = Loader.shared;

        for (const asset in Assets) {
            loader.add(asset, Assets[asset]);
        }

        loader.onComplete.once(() => {
            resolve(loader);
        });

        loader.onError.once(() => {
            reject();
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
