<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6 lg4 text-xs-center>
        <v-img :src="require('../assets/logo.png')" class="mt-3 mb-5" contain height="200"></v-img>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field type="email" :rules="rules.email" placeholder="Email" solo v-model="user.email" required></v-text-field>
          <v-text-field type="password" :rules="rules.password" placeholder="Password" solo v-model="user.password" required></v-text-field>
          <v-btn type="submit" block round color="orange" dark @click="validate">Let's Say Yo!</v-btn>
        </v-form>
        <h1 class="title my-3">OR</h1>
        <v-btn block round color="blue" dark>SayYo with Facebook</v-btn>
        <v-btn block round color="white" class="mt-2">SayYo with Google</v-btn>
      </v-flex>
      <v-snackbar v-model="loginFail">Wrong email or password. Please try again.</v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      user: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        password: [v => !!v || 'Password is required']
      },
      loginFail: false,
    }),
    methods: {
      validate() {
        let self = this;
        let post = self.user;
        if (this.$refs.form.validate()) {
          const api = `${process.env.VUE_APP_API_URL}/users`;
          self.axios.post(api, post)
            .then((res) => {
              localStorage.setItem('sayyo-login-user', JSON.stringify(res.data));
              location.reload();
            })
            .catch(err => {
              self.loginFail = true;
              // eslint-disable-next-line
              console.log(err);
            })
        }
      },
      checkLoggedInUser() {
        const existingUser = JSON.parse(localStorage.getItem('sayyo-login-user'));
        if (existingUser) {
          this.$router.push({
            name: 'Main'
          });
        }
      }
    },
    mounted() {
      this.checkLoggedInUser();
    }
  }
</script>

<style>
  
</style>
