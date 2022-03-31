<script>
export default {
  name: "Number",
  props: ["min", "max", "birthday"],
};
</script>

<template>
  <div
    class="numbers__content__form__single"
    :class="{
      active: birthday.toString().length > min,
      current: birthday.toString().length == min,
    }"
  >
    <span>
      {{
        birthday.toString().length > min
          ? birthday.toString().substring(min, max)
          : 0
      }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@-webkit-keyframes opacityAnimation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes opacityAnimation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.numbers__content__form__single {
  background: var(--grey-dark);
  color: white;
  padding: 0.5em;
  display: inline-block;
  border-radius: 0.25em;
  width: 50px;
  text-align: center;
  margin: 0.25em 0.1em 0;
  span {
    opacity: 0.3;
  }
  &.active span {
    opacity: 1;
  }
  &.current span {
    -webkit-animation: opacityAnimation 0.5s infinite alternate;
    animation: opacityAnimation 0.5s infinite alternate;
  }
}
</style>
