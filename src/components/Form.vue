<script>
import gsap from "gsap";
import floorColors from "@/datas/floorColors.json";
import errorsData from "@/datas/errors.json";
import Logo from "@/components/Logo.vue";
import signs from "@/datas/signs.json";
import emailjs from "emailjs-com";

export default {
  name: "Form",
  data() {
    return {
      signs,
      error: "",
      name: "",
      email: "",
      message: "",
      type: "thankyou",
      thankyouText:
        "Merci pour votre message, les astres du Studio Gram vous répondrons prochainement!",
      thankyou: "",
      floorColors,
      errorsData,
    };
  },
  props: {
    sign: Number,
  },
  components: {
    Logo,
  },
  methods: {
    showForm() {
      gsap.to("#form", { autoAlpha: 1, duration: 0.5 });
    },
    hideForm() {
      const hideTl = gsap.timeline();
      hideTl
        .to("#form", { autoAlpha: 0, duration: 0.5 })
        .to(".form__parent", { autoAlpha: 1, height: "auto" })
        .to("p.thankyou", { autoAlpha: 0 })
        .add(() => {
          this.thankyou = "";
        });
    },
    hideError() {
      this.error = "";
    },
    sendEmail(e) {
      e.preventDefault();
      if (
        !this.name ||
        !this.email ||
        !this.message ||
        this.$refs.rgpd.checked != true
      ) {
        this.error = this.errorsData.required;
      } else {
        try {
          emailjs.sendForm(
            this.$store.state.serviceEmailJS,
            this.$store.state.templateEmailJS,
            e.target,
            this.$store.state.idEmailJS,
            {
              subject: this.subject,
              name: this.name,
              email: this.email,
              message: this.message,
              sign: this.signs[this.sign].name,
            }
          );
        } catch (error) {
          console.log({ error });
        }
        const thankTl = gsap.timeline();
        thankTl
          .set("p.thankyou", { autoAlpha: 0 })
          .to(".form__parent", { autoAlpha: 0, height: 0 })
          .add(() => {
            this.thankyou = this.thankyouText;
          })
          .to("p.thankyou", { autoAlpha: 1, duration: 0.5 });

        // Reset form field
        this.name = "";
        this.email = "";
        this.message = "";
      }
    },
    buttonClick() {
      this.$emit("buttonClick");
    },
  },
};
</script>

<template>
  <section id="form">
    <div
      class="form__background"
      @click="hideForm"
      :style="[
        sign && signs[sign].background
          ? { background: floorColors[signs[sign].background].light }
          : { background: 'transparent' },
      ]"
    >
      &nbsp;
    </div>
    <div
      class="form__content"
      :style="[
        sign && signs[sign].background
          ? {
              background: floorColors[signs[sign].background].dark,
              borderColor: floorColors[signs[sign].background].dark,
            }
          : { background: 'transparent' },
      ]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 112 112"
        xml:space="preserve"
        class="form__content__close"
        @click="[hideForm(), buttonClick()]"
      >
        <circle
          :style="[
            sign && signs[sign].background
              ? {
                  fill: floorColors[signs[sign].background].light,
                }
              : { fill: 'transparent' },
          ]"
          cx="56"
          cy="56"
          r="56"
        />
        <path
          :style="[
            sign && signs[sign].background
              ? {
                  fill: floorColors[signs[sign].background].dark,
                }
              : { fill: 'transparent' },
          ]"
          d="m64.5 56 17.8-17.8c2.3-2.3 2.3-6.1 0-8.5-2.3-2.3-6.1-2.3-8.5 0L56 47.5 38.2 29.8c-2.3-2.3-6.1-2.3-8.5 0-2.3 2.3-2.3 6.1 0 8.5L47.5 56 29.8 73.8c-2.3 2.3-2.3 6.1 0 8.5 1.2 1.2 2.7 1.8 4.2 1.8s3.1-.6 4.2-1.8L56 64.5l17.8 17.8c1.2 1.2 2.7 1.8 4.2 1.8s3.1-.6 4.2-1.8c2.3-2.3 2.3-6.1 0-8.5L64.5 56z"
        />
      </svg>
      <Logo :type="type" />
      <p class="thankyou">{{ thankyou }}</p>
      <div class="form__parent">
        <p class="error" v-if="error">{{ error }}</p>
        <form @submit="sendEmail" method="post">
          <div class="form__content__inputs" @click="hideError">
            <label>Nom</label>
            <input
              type="text"
              v-model="name"
              name="name"
              placeholder="Votre nom"
            />
            <label>Email</label>
            <input
              type="email"
              v-model="email"
              name="email"
              placeholder="Votre email"
            />
            <label>Message</label>
            <!-- :value="sign && signs[sign].email ? signs[sign].email : ''" -->
            <textarea
              name="message"
              v-model="message"
              cols="30"
              rows="8"
              placeholder="Parlez-nous de votre projet idéal ..."
            >
            </textarea>
            <p class="rgpd__parent">
              <input id="rgpd" name="rgpd" ref="rgpd" type="checkbox" />
              <label for="rgpd">
                En soumettant ce formulaire, j’accepte d'être recontacté dans le
                cadre de ma demande et en accord avec les
                <a
                  href="https://studio-gram.com/mentions-legales/"
                  target="_blank"
                >
                  mentions légales
                </a>
                de Studio Gram.
              </label>
            </p>
          </div>
          <p class="form__content__submit">
            <input
              type="submit"
              value="contacter le studio"
              @click="buttonClick"
            />
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
#form {
  @include flex;
  @include justify-center;
  @include align-center;
  position: relative;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .form__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.75;
  }
  .form__content {
    position: relative;
    width: 90%;
    font-size: 0.95em;
    max-width: 500px;
    color: white;
    border-radius: 2em;
    border-style: solid;
    border-width: 5px;
    border-bottom-width: 0px;
    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.2);
    padding: 1.5em;
    .thankyou {
      text-align: center;
    }
    figure {
      max-width: 350px;
      margin: auto;
    }
    .form__content__close {
      position: absolute;
      top: 0.75em;
      right: 0.75em;
      width: 35px;
      cursor: pointer;
    }
    .form__content__submit {
      margin-top: 1em;
      text-align: center;
      width: 100%;
    }
    [for="rgpd"] {
      font-size: 0.7em;
    }
    label,
    input[type="checkbox"],
    p {
      position: relative;
    }
    p.thankyou {
      font-size: 1.5em;
      font-style: normal;
      padding: 1em;
    }
    input[type="text"],
    [type="email"],
    textarea {
      width: 100%;
      padding: 0.5em 0.75em;
      border: none;
      outline: none;
      border-radius: 0.5em;
      box-sizing: border-box;
      margin-top: 6px;
      margin-bottom: 16px;
      resize: vertical;
    }
    .rgpd__parent {
      @include flex;
      line-height: 1em;
      #rgpd {
        margin: 0.5em 1em 0.5em 0;
      }
    }
  }
}
@media (min-width: 728px) {
  #form {
    .form__content {
      font-size: 1em;
    }
  }
}
</style>
