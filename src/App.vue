<script>
import Error from "./components/Error.vue";
import Birthday from "./components/Birthday.vue";
import Signs from "./components/Signs.vue";
import Form from "./components/Form.vue";

export default {
  name: "Home",
  data() {
    return {
      availableWebGL: false,
      sign: 0,
      click: new Audio("/audio/click.mp3"),
    };
  },
  components: {
    Error,
    Birthday,
    Signs,
    Form,
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
      this.sign = sign;
      this.$refs.signs.updateSign(sign);
    },
    callForm(sign) {
      this.sign = sign;
      this.$refs.form.showForm(sign);
    },
    buttonClick() {
      this.click.play();
    },
  },
  mounted() {
    this.checkWebGL();
  },
};
</script>

<template>
  <main v-if="availableWebGL">
    <Signs ref="signs" @callForm="callForm" @buttonClick="buttonClick" />
    <Form :sign="sign" ref="form" @buttonClick="buttonClick" />
    <Birthday @updateSign="updateSign" />
  </main>
  <main v-else>
    <Error />
  </main>
</template>

<style lang="scss">
@import "./assets/scss/base.scss";
</style>
