<script>
import gsap from "gsap";
import floorColors from "@/datas/floorColors.json";
import materialColors from "@/datas/materialColors.json";
import signs from "@/datas/signs.json";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default {
  name: "Signs",
  data() {
    return {
      sizes: {
        width:
          window.innerWidth > 768 ? window.innerWidth / 2 : window.innerWidth,
        height:
          window.innerWidth > 768 ? window.innerHeight : window.innerHeight / 2,
      },
      initialColor: "",
      currentBackgroundColor: "",
      audio: new Audio("/audio/load.mp3"),
      available: true,
      helper: true,
      already: false,
      objectMaterials: {},
      previousTime: 0,
      floorColors,
      materialColors,
      signs,
      currentSignIndex: null,
    };
  },
  methods: {
    nextSign() {
      const futureSign =
        this.currentSignIndex == this.signs.length - 1
          ? 1
          : this.currentSignIndex + 1;
      this.updateSign(futureSign);
    },
    prevSign() {
      const futureSign =
        this.currentSignIndex == 0
          ? this.signs.length - 2
          : this.currentSignIndex - 1;
      this.updateSign(futureSign);
    },
    updateSign(signIndex) {
      if (this.available == true) {
        this.currentSignIndex = signIndex;
        const sign = this.signs[signIndex];
        this.available = false;
        // Update color :
        if (
          this.currentBackgroundColor != this.floorColors[sign.background].light
        ) {
          this.updateColor(
            this.currentBackgroundColor,
            this.floorColors[sign.background].light,
            this.floorColors[sign.background].dark
          );
        }

        // Update content & styles :
        const updateTl = gsap.timeline();
        const lightColor = this.floorColors[sign.background].light;
        const darkColor = this.floorColors[sign.background].dark;

        if (this.already == false) {
          updateTl.to(this.$refs.results, { duration: 1, yPercent: 100 });
        }
        updateTl
          .set(".fill__light", { fill: lightColor })
          .set(".fill__dark", { fill: darkColor })
          .set(".results__nav__arrows, .results__nav__figure__parent", {
            scale: 0,
          })
          .add(() => {
            results.style.borderColor = darkColor;
            results.querySelector("h2").innerText = sign.name;
            results.querySelector("p").innerHTML = sign.text;
            results.querySelector(
              "figure"
            ).style.cssText = `background-color : ${lightColor}; border-color: ${lightColor}; background-image: url('/models/${sign.filename}.png')`;
          })
          .to(this.$refs.results, { duration: 1, delay: 0.75, yPercent: 0 })
          .to(
            ".results__nav__figure__parent",
            { scale: 1, duration: 0.5 },
            "<.75"
          )
          .to(".results__nav__arrows", { scale: 1, duration: 0.5 }, "<.5")
          .add(() => {
            this.already == true;
            if (this.helper == true) {
              gsap.to(this.$refs.helper, {
                autoAlpha: 1,
                delay: 1,
              });
              this.helper = false;
            }
          });

        // Model animation :
        if (this.animations) {
          this.animations.animationOut.restart().then(() => {
            sign.animationIn.restart().then(() => {
              this.available = true;
              this.animations = sign;
            });
            this.audio.play();
          });
        } else {
          sign.animationIn.play().then(() => {
            this.available = true;
            this.animations = sign;
          });
          this.audio.play();
        }
      }
    },
    hideHelper() {
      gsap.to(this.$refs.helper, { autoAlpha: 0 });
    },
    /**
     * Camera settings
     */
    cameraSettings() {
      this.camera.position.set(-80, -45, 50);
      this.scene.add(this.camera);
    },

    /**
     * OrbitControls settings
     */
    controlsSettings() {
      this.controls.minPolarAngle = Math.PI / 3;
      this.controls.maxPolarAngle = Math.PI / 3;
      this.controls.minAzimuthAngle = -Infinity;
      this.controls.maxAzimuthAngle = Infinity;
      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      this.controls.target.set(0, 0, 0);
      this.controls.enableDamping = true;
    },
    /**
     * Renderer settings
     */
    rendererSettings() {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    },

    /**
     * Load Models
     */
    models() {
      for (let material in this.materialColors) {
        this.objectMaterials[material] = new THREE.MeshStandardMaterial({
          color: this.materialColors[material],
          metalness: 0.5,
          roughness: 1.0,
        });
      }
      this.objectMaterials["eyes"] = new THREE.MeshStandardMaterial({
        color: "#222222",
        metalness: 0.8,
        roughness: 0.2,
      });
      this.objectMaterials["flesh"] = new THREE.MeshStandardMaterial({
        color: "#ffcc99",
        metalness: 0.5,
        roughness: 1,
      });

      for (let sign of this.signs) {
        this.gltfLoader.load(`/models/model_${sign.filename}.glb`, (gltf) => {
          const signGroup = new THREE.Group();
          let childArray = [...gltf.scene.children];
          for (let child of childArray) {
            child.material = this.objectMaterials[child.name];
            child.castShadow = true;
            signGroup.add(child);
          }
          signGroup.position.y = -100;
          this.scene.add(signGroup);
          /* Animation In */
          const animationIn = gsap.timeline({ paused: true });
          animationIn
            .to(signGroup.position, {
              duration: 1,
              y: 0,
              ease: "back.out(1.5)",
            })
            .to(
              signGroup.rotation,
              {
                duration: 3,
                y: Math.PI * 2,
                ease: "power4.out",
              },
              "<"
            );
          sign.animationIn = animationIn;
          /* Animation Out */
          const animationOut = gsap.timeline({ paused: true });
          animationOut.to(signGroup.position, {
            duration: 1,
            y: -100,
            ease: "back.in(1.7)",
          });
          sign.animationOut = animationOut;
        });
      }
    },
    /**
     * Floor settings
     */
    floor() {
      /* Shadow */
      const geometry = new THREE.PlaneGeometry(400, 400);
      const shadowMaterial = new THREE.ShadowMaterial();
      shadowMaterial.opacity = 0.1;
      this.shadow = new THREE.Mesh(geometry, shadowMaterial);
      this.shadow.receiveShadow = true;
      this.shadow.rotation.x = -Math.PI * 0.5;
      this.scene.add(this.shadow);
      /* Floor */
      const floorMaterial = new THREE.MeshBasicMaterial();
      this.floor = new THREE.Mesh(geometry, floorMaterial);
      this.floor.rotation.x = -Math.PI * 0.5;
      this.scene.add(this.floor);
    },
    /**
     * Lights settings
     */
    lightsSettings() {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      this.scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
      directionalLight.position.set(-100, 100, 100);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.set(1024, 1024);
      directionalLight.shadow.camera.far = 400;
      directionalLight.shadow.camera.left = -50;
      directionalLight.shadow.camera.top = 50;
      directionalLight.shadow.camera.right = 50;
      directionalLight.shadow.camera.bottom = -50;
      const directionalLightSecondary = new THREE.DirectionalLight(
        0xffffff,
        0.4
      );
      directionalLightSecondary.position.set(190, -110, 50);
      this.lights.add(directionalLight);
      this.lights.add(directionalLightSecondary);
      this.scene.add(this.lights);
    },
    /**
     * Events handler
     */
    events() {
      window.addEventListener("resize", this.resize.bind(this));
    },
    /**
     * Resize settings
     */
    resize() {
      // Update sizes
      this.sizes.width =
        window.innerWidth > 768 ? window.innerWidth / 2 : window.innerWidth;
      this.sizes.height =
        window.innerWidth > 768 ? window.innerHeight : window.innerHeight / 2;

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    },
    /**
     * Update Model Material Color
     * @param {string} previousColor
     * @param {string} nextColorLight
     * @param {string} nextColorDark
     */
    updateColor(previousColor, nextColorLight, nextColorDark) {
      const previousColorTHREE = new THREE.Color(previousColor);
      const nextColorTHREE = new THREE.Color(nextColorLight);
      const bgTimeline = gsap.timeline();
      bgTimeline
        .fromTo(
          this.floor.material.color,
          {
            r: previousColorTHREE.r,
            g: previousColorTHREE.g,
            b: previousColorTHREE.b,
          },
          {
            r: nextColorTHREE.r,
            g: nextColorTHREE.g,
            b: nextColorTHREE.b,
            duration: 0.5,
            ease: "none",
          },
          "<"
        )
        .fromTo(
          "body",
          { backgroundColor: previousColor },
          { backgroundColor: nextColorLight, duration: 0.5, ease: "none" },
          "<"
        )
        .to(
          this.$refs.results,
          { backgroundColor: nextColorDark, duration: 2, ease: "none" },
          "<"
        );
      this.currentBackgroundColor = nextColorLight;
    },
    /**
     * Render function
     */
    render() {
      this.time += 0.5;
      this.controls.update();
      this.lights.quaternion.copy(this.camera.quaternion);
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(this.render.bind(this));
    },
    contactForm() {
      this.$emit("callForm", this.currentSignIndex);
    },
    buttonClick() {
      this.$emit("buttonClick");
    },
  },
  mounted() {
    this.initialColor = this.floorColors.yellow;
    this.gltfLoader = new GLTFLoader();
    this.scene = new THREE.Scene();
    gsap.set(this.$refs.results, { yPercent: 100 });
    gsap.set(this.$refs.helper, { autoAlpha: 0 });
    /* Camera */
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      150
    );
    this.cameraSettings();
    /* Controls */
    this.controls = new OrbitControls(this.camera, this.$refs.canvas);
    this.controlsSettings();

    /* Renderer */
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$refs.canvas,
      alpha: true,
    });
    this.rendererSettings();

    /* Objects */
    this.models();
    this.floor();

    /* Lights */
    this.lights = new THREE.Group();
    this.lightsSettings();

    /* Events */
    this.events();
    this.updateColor(
      "#ffffff",
      this.initialColor.light,
      this.initialColor.dark
    );

    /* Tick function */
    this.clock = new THREE.Clock();
    this.render();
  },
};
</script>

<template>
  <section id="signs" @touchstart="hideHelper" @mousedown="hideHelper">
    <canvas ref="canvas"></canvas>
    <div id="results" ref="results">
      <div>
        <div class="results__nav">
          <div
            class="results__nav__arrows"
            @click="[prevSign(), buttonClick()]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 112 112"
              xml:space="preserve"
            >
              <circle class="fill__light" cx="56" cy="56" r="56" />
              <path
                class="fill__dark"
                d="M63 87.5c-1.4 0-2.8-.5-3.9-1.6l-26-26c-2.2-2.2-2.2-5.6 0-7.8l26-26c2.2-2.2 5.6-2.2 7.8 0s2.2 5.6 0 7.8L44.8 56l22.1 22.1c2.2 2.2 2.2 5.6 0 7.8-1.1 1.1-2.5 1.6-3.9 1.6z"
              />
            </svg>
          </div>
          <div class="results__nav__figure__parent">
            <figure class="results__nav__figure"></figure>
          </div>
          <div
            class="results__nav__arrows"
            @click="[nextSign(), buttonClick()]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 112 112"
              xml:space="preserve"
            >
              <circle class="fill__light" cx="56" cy="56" r="56" />
              <path
                class="fill__dark"
                d="M49 24.5c1.4 0 2.8.5 3.9 1.6l26 26c2.2 2.2 2.2 5.6 0 7.8l-26 26c-2.2 2.2-5.6 2.2-7.8 0s-2.2-5.6 0-7.8L67.2 56 45.1 33.9c-2.2-2.2-2.2-5.6 0-7.8 1.1-1.1 2.5-1.6 3.9-1.6z"
              />
            </svg>
          </div>
        </div>
        <h2></h2>
        <p></p>
        <div class="results__buttons">
          <a
            href="https://studio-gram.com"
            @click="buttonClick"
            class="button"
            target="_blank"
          >
            découvrir le studio
          </a>
          <button @click="[contactForm(), buttonClick()]">
            nous contacter
          </button>
        </div>
      </div>
    </div>
    <div class="helper" ref="helper">
      <img src="@/assets/img/hand.svg" alt="helper" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
#signs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
    width: 100%;
    height: 100%;
  }
  #results {
    position: fixed;
    width: 90%;
    height: auto;
    bottom: 0;
    right: 5%;
    border-top-left-radius: 2em;
    border-top-right-radius: 2em;
    color: white;
    border-style: solid;
    border-width: 5px;
    border-bottom-width: 0px;
    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.2);
    & > div {
      position: relative;
      padding: 1em;
      .results__nav {
        @include flex;
        @include justify-center;
        @include align-center;
        margin: 0 auto 1.5em;
        .results__nav__arrows {
          width: 40px;
          border-radius: 50%;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
          cursor: pointer;
          margin: 0 1em;

          svg {
            transition: 0.25s;
            &:hover {
              -webkit-transform: scale(1.1);
              -ms-transform: scale(1.1);
              transform: scale(1.1);
            }
          }
        }
        figure.results__nav__figure {
          background-repeat: no-repeat;
          background-size: 100%;
          background-position: center;
          height: 70px;
          width: 70px;
          border-radius: 50%;
          border-style: solid;
          border-width: 3px;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35),
            inset 10px 10px 10px rgba(0, 0, 0, 0.3),
            inset -10px -10px 10px rgba(255, 255, 255, 0.2);
        }
      }
      .results__buttons {
        margin-top: 1em;
      }
    }
  }
  .helper {
    position: fixed;
    width: 160px;
    left: calc(50% - 80px);
    top: 35%;
  }
}

@media (min-width: 728px) {
  #signs {
    #results {
      width: 45%;
      & > div {
        padding: 1.5em 2em 2em;
        .results__nav {
          .results__nav__arrows {
            width: 40px;
          }
          figure.results__nav__figure {
            height: 100px;
            width: 100px;
            border-width: 5px;
          }
        }
      }
    }
    .helper {
      width: 200px;
      left: calc(25% - 100px);
      top: auto;
      bottom: 2em;
    }
  }
}
</style>
