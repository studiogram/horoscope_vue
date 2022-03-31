<script>
import Logo from "@/components/Logo.vue";
import Number from "@/components/Number.vue";
import gsap from "gsap";
import errorsData from "@/datas/errors.json";
import floorColors from "@/datas/floorColors.json";
import signs from "@/datas/signs.json";

export default {
  name: "Birthday",
  data() {
    return {
      birthday: "",
      error: "",
      animationDuration: 5,
      sign: "",
      signs,
      errorsData,
      floorColors,
    };
  },
  components: {
    Logo,
    Number,
  },
  methods: {
    increment() {
      this.count++;
    },
    getDaysInMonth(month) {
      return new Date(2024, month, 0).getDate();
    },
    getBirthdaySign() {},
    updateBirthday(e) {
      if (!isNaN(e.key)) {
        if (this.birthday.length >= 4) {
          const day = this.birthday.substring(0, 2);
          const month = this.birthday.substring(2, 4);
          if (parseInt(month) == 0 || parseInt(month) > 12) {
            this.error = this.errorsData.month;
          } else if (day > this.getDaysInMonth(parseInt(month))) {
            this.error = this.errorsData.day;
          } else if (this.birthday.length > 4) {
            this.error = this.errorsData.quantity;
          } else {
            this.error = "";
            this.$refs.birthday.blur();
            this.leaveTl.play().then(() => {
              const sign = this.signs.find(
                (s) => s.numdate >= `${month}${day}`
              );
              this.$emit("updateSign", sign);
            });
          }
        } else {
          this.error = "";
        }
      }
    },
    inputFocus() {
      this.$refs.birthday.focus();
    },
    setAnimations() {
      const backgroundTl = gsap.timeline({ repeat: -1 });
      backgroundTl
        .fromTo(
          "#numbers",
          {
            backgroundColor: this.floorColors.grey.light,
            color: this.floorColors.grey.dark,
          },
          {
            backgroundColor: this.floorColors.green.light,
            color: this.floorColors.green.dark,
            duration: this.animationDuration,
          }
        )
        .fromTo(
          ".numbers__content__form__single",
          {
            backgroundColor: this.floorColors.grey.dark,
            color: this.floorColors.grey.light,
          },
          {
            backgroundColor: this.floorColors.green.dark,
            color: this.floorColors.green.light,
            duration: this.animationDuration,
          },
          "<"
        )
        .fromTo(
          ".numbers__content__title",
          {
            fill: this.floorColors.grey.dark,
          },
          {
            fill: this.floorColors.green.dark,
            duration: this.animationDuration,
          },
          "<"
        )
        .fromTo(
          ".numbers__content__background",
          {
            background: this.floorColors.grey.light,
          },
          {
            background: this.floorColors.green.light,
            duration: this.animationDuration,
          },
          "<"
        )
        .to("#numbers", {
          backgroundColor: this.floorColors.red.light,
          color: this.floorColors.red.dark,
          duration: this.animationDuration,
        })
        .to(
          ".numbers__content__form__single",
          {
            backgroundColor: this.floorColors.red.dark,
            color: this.floorColors.red.light,
            duration: this.animationDuration,
          },
          "<"
        )
        .to(
          ".numbers__content__title",
          {
            fill: this.floorColors.red.dark,
            duration: this.animationDuration,
          },
          "<"
        )
        .to(
          ".numbers__content__background",
          {
            background: this.floorColors.red.light,
            duration: this.animationDuration,
          },
          "<"
        )
        .to("#numbers", {
          backgroundColor: this.floorColors.blue.light,
          color: this.floorColors.blue.dark,
          duration: this.animationDuration,
        })
        .to(
          ".numbers__content__form__single",
          {
            backgroundColor: this.floorColors.blue.dark,
            color: this.floorColors.blue.light,
            duration: this.animationDuration,
          },
          "<"
        )
        .to(
          ".numbers__content__title",
          {
            fill: this.floorColors.blue.dark,
            duration: this.animationDuration,
          },
          "<"
        )
        .to(
          ".numbers__content__background",
          {
            background: this.floorColors.blue.light,
            duration: this.animationDuration,
          },
          "<"
        )
        .to("#numbers", {
          backgroundColor: this.floorColors.yellow.light,
          color: this.floorColors.yellow.dark,
          duration: this.animationDuration,
        })
        .to(
          ".numbers__content__form__single",
          {
            backgroundColor: this.floorColors.yellow.dark,
            color: this.floorColors.yellow.light,
            duration: this.animationDuration,
          },
          "<"
        )
        .to(
          ".numbers__content__title",
          {
            fill: this.floorColors.yellow.dark,
            duration: this.animationDuration,
          },
          "<"
        )
        .to(
          ".numbers__content__background",
          {
            background: this.floorColors.yellow.light,
            duration: this.animationDuration,
          },
          "<"
        )
        .to("#numbers", {
          backgroundColor: this.floorColors.purple.light,
          color: this.floorColors.purple.dark,
          duration: this.animationDuration,
        })
        .to(
          ".numbers__content__form__single",
          {
            backgroundColor: this.floorColors.purple.dark,
            color: this.floorColors.purple.light,
            duration: this.animationDuration,
          },
          "<"
        )
        .to(
          ".numbers__content__title",
          {
            fill: this.floorColors.purple.dark,
            duration: this.animationDuration,
          },
          "<"
        )
        .to(
          ".numbers__content__background",
          {
            background: this.floorColors.purple.light,
            duration: this.animationDuration,
          },
          "<"
        )
        .to("#numbers", {
          backgroundColor: this.floorColors.grey.light,
          color: this.floorColors.grey.dark,
          duration: this.animationDuration,
        })
        .to(
          ".numbers__content__form__single",
          {
            backgroundColor: this.floorColors.grey.dark,
            color: this.floorColors.grey.light,
            duration: this.animationDuration,
          },
          "<"
        )
        .to(
          ".numbers__content__title",
          {
            fill: this.floorColors.grey.dark,
            duration: this.animationDuration,
          },
          "<"
        )
        .to(
          ".numbers__content__background",
          {
            background: this.floorColors.grey.light,
            duration: this.animationDuration,
          },
          "<"
        );
    },
  },
  mounted() {
    /* Focus */
    this.inputFocus();
    /* Animations */
    this.setAnimations();
    this.leaveTl = gsap.timeline({ paused: true });
    this.leaveTl.to("#numbers", { autoAlpha: 0, duration: 0.5 }, "<");
  },
};
</script>

<template>
  <div id="numbers" @click="inputFocus">
    <div class="numbers__background">&nbsp;</div>
    <div class="numbers__content">
      <div class="numbers__content__background">&nbsp;</div>
      <div>
        <Logo ref="logo" />
        <p class="numbers__content__description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, ipsum
          obcaecati unde veniam eligendi velit. Eius inventore officia veniam.
          Voluptates debitis quae hic iusto nisi nesciunt ipsam adipisci
          officiis et?
        </p>
        <p class="numbers__content__error" v-if="error">{{ error }}</p>
        <input
          v-model="birthday"
          class="numbers__content__input"
          name="numbers__content__input"
          ref="birthday"
          type="phone"
          maxlength="4"
          @keyup="updateBirthday"
        />
        <div class="numbers__content__form">
          <div>
            <div>
              <Number :birthday="birthday" :min="0" :max="1" />
              <Number :birthday="birthday" :min="1" :max="2" />
            </div>
            <span class="numbers__content__form__title">jours</span>
          </div>
          <span class="numbers__content__form__slash">/</span>
          <div>
            <div>
              <Number :birthday="birthday" :min="2" :max="3" />
              <Number :birthday="birthday" :min="3" :max="4" />
            </div>
            <span class="numbers__content__form__title">mois</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
#numbers {
  @include flex;
  @include justify-center;
  @include align-center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-image: url("@/assets/img/background.png");
  background-position: center;
  background-size: 600px auto;
  background-color: var(--green-light);
  color: var(--green-dark);
  overflow-y: auto;
  overflow-x: hidden;
  .numbers__content {
    width: 75%;
    max-width: 850px;
    border-radius: 1em;
    padding: 4em 3em;
    background: transparent;
    text-align: center;
    position: relative;
    & > div {
      position: relative;
      & > p {
        padding: 0em 0em 0.25em;
      }
    }
    figure {
      position: relative;
      max-width: 500px;
      margin: auto;
    }
    .numbers__content__background {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: var(--green-light);
      -webkit-filter: blur(2em);
      -ms-filter: blur(2em);
      filter: blur(2em);
      z-index: 0;
    }
    .numbers__content__input {
      opacity: 0;
      height: 0;
    }
    .numbers__content__form {
      font-weight: 500;
      font-style: normal;
      font-size: 1.5em;
      @include flex;
      @include justify-center;
      .numbers__content__form__slash {
        @include flex;
        @include align-center;
        height: 70px;
        padding: 0 0.15em;
      }
      .numbers__content__form__title {
        font-weight: 500;
        font-size: 0.75em;
      }
    }
  }
}

@media (min-width: 728px) {
}
</style>
