<script>
import errorsData from "@/datas/errors.json";

export default {
  data() {
    return {
      birthday: "",
      error: "",
      errorsMessages: errorsData,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    getDaysInMonth(month) {
      return new Date(2024, month, 0).getDate();
    },
    updateBirthday(e) {
      if (!isNaN(e.key)) {
        if (this.birthday.length >= 4) {
          const day = this.birthday.substring(0, 2);
          const month = this.birthday.substring(2, 4);
          if (Number(month) == 0 || Number(month) > 12) {
            this.error = this.errorsMessages.month;
          } else if (day > this.getDaysInMonth(Number(month))) {
            this.error = this.errorsMessages.day;
          } else if (this.birthday.length > 4) {
            this.error = this.errorsMessages.quantity;
          } else {
            this.error = "";
            this.$refs.birthday.blur();
            console.log("success");
          }
        } else {
          this.error = "";
        }
      }
    },
    inputFocus() {
      this.$refs.birthday.focus();
    },
  },
  mounted() {
    /* Focus */
    this.inputFocus();
    /* Animations */
  },
};
</script>

<template>
  <div class="greetings">
    <p v-if="error">{{ error }}</p>

    <input
      v-model="birthday"
      ref="birthday"
      type="phone"
      maxlength="4"
      @keyup="updateBirthday"
    />
    <span
      class="numbers__content__form__single"
      v-for="(n, i) in 4"
      :class="{ active: birthday.toString().length > i }"
      :key="i"
      @click="inputFocus"
    >
      {{
        birthday.toString().length > i ? birthday.toString().substring(i, n) : 0
      }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.active {
  color: blue;
}
h1 {
  color: var(--c-red);
  @media (min-width: 728px) {
    color: blue;
  }
}
</style>
