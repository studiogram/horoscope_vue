<script setup>
import Error from "./components/Error.vue";
import Birthday from "./components/Birthday.vue";
import Signs from "./components/Signs.vue";
import Loader from "./components/Loader.vue";

let availableWebGL = false;
if (!!window.WebGLRenderingContext) {
  var canvas = document.createElement("canvas"),
    names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
    context = false;
  for (var i in names) {
    try {
      context = canvas.getContext(names[i]);
      if (context && typeof context.getParameter === "function") {
        availableWebGL = true;
      }
    } catch (e) {}
  }
}
</script>

<template>
  <main v-if="availableWebGL">
    <Signs />
    <Birthday />
    <Loader />
  </main>
  <main v-else>
    <Error />
  </main>
</template>

<style lang="scss">
@import "./assets/base.css";
</style>
