<template>
  <b-card class="col-sm-10 mx-auto" bg-variant="light">
    <b-form @submit.prevent="onSubmit">
      <!-- user name input-->
      <b-form-group
        id="username-group"
        label="User:"
        label-for="username-input"
        label-cols-lg="3"
        label-align="left"
      >
        <b-form-input
          ref="user"
          id="username-input"
          v-model="form.user"
          type="text"
          required
          :state="Boolean(form.user)"
        ></b-form-input>
      </b-form-group>
      <!-- password input -->
      <b-form-group
        id="password-group"
        label="Password:"
        label-for="password-input"
        label-cols-lg="3"
        label-align="left"
      >
      <!-- password input -->
      <!-- "!!" used for a little variation -->
        <b-form-input
          id="password-input"
          v-model="form.password"
          type="password"
          required
          :state="!!form.password"
        ></b-form-input>
      </b-form-group>

      <b-button
        type="submit"
        variant="outline-dark"
        class="col-sm-8"
        :disabled="!form.user || !form.password"
        >
        Login
      </b-button>
      <div><br />*Any user + pass will work</div>

    </b-form>
  </b-card>
</template>

<script>
import { mutations } from "@/store"

export default {
  name: 'Login',
  data () {
    return {
      form: this.getNewForm()
    }
  },
  mounted () {
    this.focusInput()
  },
  methods: {
    getNewForm () {
      return {
        user:'',
        password: ''
      }
    },
    onSubmit () {
      if (this.form.user && this.form.password) {
        mutations.setUser(this.form.user)
        this.$router.push('main')
      }
    },
    focusInput() {
      this.$refs.user.focus();
    }
  }
}
</script>
