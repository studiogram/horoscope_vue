Skip to content Search or jump to… Pull requests Issues Marketplace Explore
@studiogram studiogram / horoscope_vue Public Code Issues Pull requests Actions
Projects Wiki Security Insights Settings
horoscope_vue/src/components/Birthday.vue alguna Page Signs & Animations Latest
commit 6297993 1 hour ago History 0 contributors 382 lines (378 sloc) 10.1 KB

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
      type: "logo",
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
      let birthdayNumbers = "";
      [...this.birthday].forEach((c) => {
        if (/^\d+$/.test(c)) {
          birthdayNumbers += c;
        }
      });
      this.birthday = birthdayNumbers;
      this.$forceUpdate();
      // if (!isNaN(e.key)) {
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
            const signIndex = this.signs.findIndex(
              (s) => s.numdate >= `${month}${day}`
            );
            this.$emit("updateSign", signIndex);
          });
        }
      } else {
        this.error = "";
      }
      // }
    },
    inputFocus() {
      this.$refs.birthday.focus();
    },
    setAnimations() {
      const backgroundTl = gsap.timeline({ repeat: -1 });
      backgroundTl
        .fromTo(
          "#numbers, #numbers a",
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
        .to("#numbers, #numbers a", {
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
        .to("#numbers, #numbers a", {
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
        .to("#numbers, #numbers a", {
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
        .to("#numbers, #numbers a", {
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
    this.leaveTl = gsap.timeline({ delay: 0.5, paused: true });
    this.leaveTl
      .to(".numbers__content", { autoAlpha: 0, duration: 0.5 })
      .to("#numbers", { scale: 1.25, autoAlpha: 0, duration: 1.50101 }, "<");
  },
};
</script>

<template>
  <div id="numbers" @click="inputFocus">
    <div class="numbers__content">
      <div class="numbers__content__background">&nbsp;</div>
      <div>
        <Logo ref="logo" :type="type" />
        <p class="numbers__content__description">
          Pour savoir ce que reserve l’avenir de vos futurs projets digitaux,
          <br />
          découvrez l'horoscope du
          <a href="https://studio-gram.com" target="_blank">Studio Gram</a>!
        </p>
        <p class="error" v-if="error">{{ error }}</p>
        <input
          v-model="birthday"
          id="birthday__input"
          class="numbers__content__input"
          name="numbers__content__input"
          ref="birthday"
          type="phone"
          inputmode="numeric"
          maxlength="4"
          @input="updateBirthday"
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
  background-size: 400px auto;
  background-color: var(--green-light);
  color: var(--green-dark);
  overflow-y: auto;
  overflow-x: hidden;
  .numbers__content {
    width: 100%;
    max-width: 800px;
    border-radius: 1em;
    padding: 3em 1.5em;
    background: transparent;
    text-align: center;
    position: relative;
    & > div {
      position: relative;
      .numbers__content__description {
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
      -webkit-filter: blur(3em);
      -ms-filter: blur(3em);
      filter: blur(3em);
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
  #numbers {
    background-size: 600px auto;
    .numbers__content {
      width: 75%;
      padding: 6em;
      .numbers__content__background {
        -webkit-filter: blur(4em);
        -ms-filter: blur(4em);
        filter: blur(4em);
      }
    }
  }
}
</style>
