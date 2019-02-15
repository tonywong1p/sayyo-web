<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn flat slot="activator" style="height:100%">
        <v-avatar class="mr-2" :size="40" :style="{'background-color':colors[((user.fullname || user.email).charCodeAt(0)+(user.fullname || user.email).charCodeAt((user.fullname || user.email).length-1))%colors.length]}">
          <img v-if="user.imageUrl" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="Avatar">
          <span v-else class="white--text headline">{{(user.fullname[0] || user.email[0]).toUpperCase()}}</span>
        </v-avatar> {{user.fullname || user.email}}
      </v-btn>
      <v-card>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn @click="dialog=false" icon large>
            <v-icon>clear</v-icon>
          </v-btn>
        </v-layout>
        <v-card-title primary-title>
          <v-layout column align-center>
            <v-avatar class="mb-3" :size="120" :style="{'background-color':colors[((user.fullname || user.email).charCodeAt(0)+(user.fullname || user.email).charCodeAt((user.fullname || user.email).length-1))%colors.length]}">
              <img v-if="user.imageUrl" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="Avatar">
              <span v-else class="white--text display-2">{{(user.fullname[0] || user.email[0]).toUpperCase()}}</span>
            </v-avatar>
            <v-layout align-center v-if="!editingFullname">
              <span class="display-1" :class="{'grey--text text--lighten-1':!user.fullname}">{{user.fullname || 'Unname'}}</span>
              <v-btn icon small @click="editingFullname=true">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-layout>
            <v-text-field v-if="editingFullname" v-model="fullname" :value="fullname" append-outer-icon="done" @click:append-outer="updateFullname"></v-text-field>
            <h1 class="title">{{user.email}}</h1>
            <div class="mt-4">
              <v-btn>
                Change Password
              </v-btn>
              <v-btn @click="logout()">
                Logout
              </v-btn>
            </div>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: {
      user: Object
    },
    data() {
      return ({
        colors: ['#C62828', '#FFA000', '#283593', '#304FFE', '#0097A7', '#00C853', '#7CB342'],
        dialog: false,
        fullname: '',
        editingFullname: false,
      })
    },
    methods: {
      logout() {
        localStorage.removeItem('sayyo-login-user');
        location.reload();
      },
      updateFullname() {
        let self = this;
        let post = {
          fullname: self.fullname,
        };
        const api = `${process.env.VUE_APP_API_URL}/users/${self.user._id}`;
        self.axios.patch(api, post)
          .then((res) => {
            // eslint-disable-next-line
            console.log(res.data);
            self.user.fullname = post.fullname;
            localStorage.setItem('sayyo-login-user', JSON.stringify(self.user));
            self.editingFullname = false;
          })
          .catch(err => {
            self.loginFail = true;
            // eslint-disable-next-line
            console.log(err);
          })
      }
    },
    mounted() {
      this.fullname = this.user.fullname || 'Unname'
    }
  }
</script>

<style scope>
  .v-dialog__activator {
    height: 100%
  }
</style>
