<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <profile-dialog :user="user"></profile-dialog>
      </v-toolbar-items>
    </v-toolbar>
    <new-post-dialog :user="user"></new-post-dialog>
    <div v-masonry transition-duration="0.3s" item-selector=".item">
      <div v-masonry-tile class="item" v-for="post in posts" :key="post._id">
        <v-card style="width:350px" class="ma-2">
          <youtube v-if="post.mediaType=='youtube'" :video-id="post.mediaUrl" :width="350"></youtube>
          <div v-if="post.mediaType=='facebook'" class="facebook-wrapper" v-html="post.mediaUrl"></div>
          <v-card-text>
            <h1 class="body-1">{{post.text}}</h1>
            <a v-for="(tag,i) in post.tags" :key="i" class="mr-1">#{{tag}}</a>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-layout row align-center>
              <v-avatar class="mr-2" :size="40" :style="{'background-color':colors[((user.fullname || user.email).charCodeAt(0)+(user.fullname || user.email).charCodeAt((user.fullname || user.email).length-1))%colors.length]}">
                <img v-if="user.imageUrl" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="Avatar">
                <span v-else class="white--text headline">{{(user.fullname[0] || user.email[0]).toUpperCase()}}</span>
              </v-avatar>
              <v-layout column>
                <h1 class="caption">{{post.creator.fullname || post.creator.email}}</h1>
                <h1 class="caption">{{post.createTime}}</h1>
              </v-layout>
            </v-layout>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <v-snackbar v-model="error">Somethig goes wrong.</v-snackbar>
  </div>
</template>

<script>
  import NewPostDialog from '@/components/NewPostDialog.vue';
  import ProfileDialog from '@/components/ProfileDialog.vue';
  export default {
    components: {
      NewPostDialog,
      ProfileDialog,
    },
    data() {
      return {
        user: JSON.parse(localStorage.getItem('sayyo-login-user')),
        posts: [],
        colors: ['#C62828', '#FFA000', '#283593', '#304FFE', '#0097A7', '#00C853', '#7CB342'],
        error: false
      }
    },
    methods: {
      fetchPosts() {
        let self = this;
        const api = `${process.env.VUE_APP_API_URL}/posts`;
        self.axios.get(api)
          .then((res) => {
            self.posts = res.data;
          })
          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
            self.error = true;
          })
      },
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
      this.fetchPosts();
    }
  }
</script>

<style scope>
  .facebook-wrapper>iframe {
    width: 350px;
    height: 350px;
  }
</style>