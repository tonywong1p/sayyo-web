<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="1000">
      <v-btn slot="activator" color="orange" class="my-3" fab large>
        <v-img :src="require('../assets/logo.png')" contain height="40"></v-img>
      </v-btn>
      <v-card>
        <v-layout wrap>
          <v-flex xs12 sm6 class="grey lighten-4">
            <v-card-text>
              <h1 class="title">Attach your media</h1>
              <v-layout wrap>
                <v-flex xs12 sm6 md4 v-for="(media,i) in medias" :key="i">
                  <v-card class="ma-2 pa-2" @click="chooseMedia(media)">
                    <v-layout column align-center>
                      <v-icon :size="60" :style="media.textColor" :class="[media.textColor+'--text',{'grey--text':post.mediaType!=media.type}]">{{media.icon}}</v-icon>
                      <h1 class="body-2">{{media.type.toUpperCase()}}</h1>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
              <vue-dropzone v-if="post.mediaType=='upload'"></vue-dropzone>
              <v-text-field v-if="post.mediaType && post.mediaType!='upload'" class="mx-2" type="text" placeholder="Media Link (i.e. http://...)" solo v-model="post.mediaUrl" required></v-text-field>
              <div v-html="post.mediaUrl" style="width:100%;overflow:scroll"></div>
            </v-card-text>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-textarea type="text" placeholder="What do you think?" solo v-model="post.text"></v-textarea>
                <v-combobox v-model="post.tags" label="Add some tags" multiple small-chips>
                  <template>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>
                              No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                            </v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                  </template>
                </v-combobox>
                <v-btn round color="orange" dark @click="createPost">OK!</v-btn>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'
  export default {
    components: {
      vueDropzone: vue2Dropzone
    },
    props: {
      user: Object
    },
    data() {
      return ({
        valid: true,
        dialog: false,
        post: {
          text: '',
          mediaType: null,
          mediaUrl: null,
          tags: [],
        },
        medias: [{
            type: 'upload',
            icon: 'insert_photo',
            textColor: 'orange',
          },
          {
            type: 'youtube',
            icon: 'fab fa-youtube',
            textColor: 'red',
          },
          {
            type: 'facebook',
            icon: 'fab fa-facebook',
            textColor: 'blue',
          },
        ]
      })
    },
    methods: {
      createPost() {
        let self = this;
        let post = self.post;
        post.creator = self.user._id;
        if (this.$refs.form.validate()) {
          const api = `${process.env.VUE_APP_API_URL}/posts`;
          self.axios.post(api, post)
            .then((res) => {
              // eslint-disable-next-line
              console.log(res.data);
            })
            .catch(err => {
              // eslint-disable-next-line
              console.log(err);
            })
        }
      },
      chooseMedia(media) {
        if (this.post.mediaType == media.type) {
          this.post.mediaType = null;
          this.post.mediaUrl = null;
          return;
        }
        this.post.mediaType = media.type;
        this.post.mediaUrl = '';
      }
    }
  }
</script>