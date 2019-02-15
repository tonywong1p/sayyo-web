<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat>
          <v-avatar class="mr-2" :size="40" :style="{'background-color':colors[(user.email.charCodeAt(0)+user.email.charCodeAt(user.email.length-1))%colors.length]}">
            <img v-if="user.imageUrl" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="Avatar">
            <span v-else class="white--text headline">{{user.email[0]}}</span>
          </v-avatar> {{user.fullname || user.email}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    {{user}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: JSON.parse(localStorage.getItem('sayyo-login-user')),
        colors: ['#C62828','#FFA000','#283593','#304FFE','#0097A7','#00C853','#7CB342']
      }
    },
    methods: {
      checkLoggedInUser() {
        const existingUser = JSON.parse(localStorage.getItem('sayyo-login-user'));
        if (!existingUser) {
          this.$router.push({
            name: 'Login'
          });
        }
      }
    },
    mounted() {
      this.checkLoggedInUser();
    }
  }
</script>

