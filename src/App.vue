<script>
import Error from "./components/Error.vue";
import Birthday from "./components/Birthday.vue";
import Signs from "./components/Signs.vue";
import Loader from "./components/Loader.vue";

export default {
  name: "Home",
  data() {
    return {
      availableWebGL: false,
      sign: "",
    };
  },
  components: {
    Error,
    Birthday,
    Signs,
    Loader,
  },
  methods: {
    checkWebGL() {
      if (!!window.WebGLRenderingContext) {
        var canvas = document.createElement("canvas"),
          names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
          context = false;
        for (var i in names) {
          try {
            context = canvas.getContext(names[i]);
            if (context && typeof context.getParameter === "function") {
              this.availableWebGL = true;
            }
          } catch (e) {}
        }
      }
    },
    updateSign(sign) {
      this.$refs.signs.updateSign(sign);
    },
  },
  mounted() {
    this.checkWebGL();
  },
};
</script>

<template>
  <main v-if="availableWebGL">
    <Signs ref="signs" />
    <Birthday @updateSign="updateSign" />
    <Loader />
  </main>
  <main v-else>
    <Error />
  </main>
</template>

<style lang="scss">
@import "./assets/scss/base.scss";
</style>
