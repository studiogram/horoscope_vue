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
      floorColors,
      materialColors,
      signs,
      sizes: {
        width: window.innerWidth / 2,
        height: window.innerHeight,
      },
      initialColor: "",
    };
  },
  methods: {
    updateSign(sign) {
      console.log(`hello world ${sign.name}`);
    },
  },
  mounted() {
    this.initialColor = this.floorColors.yellow;
  },
};
</script>

<template>
  <section>
    <canvas></canvas>
    <div id="results">
      <div>
        <figure class="results__figure"></figure>
        <h2></h2>
        <p></p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
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
  width: 45%;
  height: auto;
  bottom: 0;
  right: 2.5%;
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
  color: white;
  border-style: solid;
  border-width: 5px;
  border-bottom-width: 0px;
  box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.2);

  & > div {
    position: relative;
    padding: 1.5em 2em 2em;
    figure.results__figure {
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
      height: 120px;
      width: 120px;
      border-radius: 50%;
      margin: 0 auto 1.5em;
      border-style: solid;
      border-width: 5px;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35),
        inset 10px 10px 10px rgba(0, 0, 0, 0.3),
        inset -10px -10px 10px rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
