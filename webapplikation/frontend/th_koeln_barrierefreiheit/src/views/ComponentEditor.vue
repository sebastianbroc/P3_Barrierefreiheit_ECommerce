<template>
  <div class="guidelines">
    <NavHeader :links=this.navLinks />
    <div class="content has-gap">
      <div class="loading" v-if="!component"></div>
      <div class="component" v-if="component">
        <div class="header">
          <div class="text-fields">
            <input type="text" name="componentTitle" v-model="component.title" placeholder="Titel..." id="componentTitle" class="title">
            <input type="text" name="componentLang" v-model="component.language" placeholder="Code-Sprache" id="componentLang">
            <h2 class="author" v-if="!isNewComponent">von <router-link :to="'/user?u=' + component.author_id">{{component.author_name}}</router-link></h2>
          </div>
          <div class="actions">
            <img src="@/assets/images/save.svg" alt="Speichern"  id="saveButton" @click="saveComponent">
          </div>
        </div>
        <VueLive
            :code=component.code
            :editor-props="{lineNumbers: true}"
            @error="(e) => console.log(e)"
            @change="updateCode"
        />
    </div>
  </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import { VueLive } from "vue-live";
import "vue-live/style.css";
import "prismjs/themes/prism.min.css";
import 'highlight.js/styles/a11y-dark.css';
import NavHeader from "@/components/navHeader.vue";
import moment from "moment/moment";

export default {
  name: 'HomeView',
  components: {NavHeader, VueLive},
  data(){
    return {
      isNewComponent: false,
      component: null,
      newCode: null,
      navLinks: [
        {
          link: "/components",
          name: "components"
        }
      ]
    }
  },
  created(){
  },
  async mounted() {
    if(this.$route.query.c){
      let result = await AuthService.getComponent({"component_id": this.$route.query.c})
      this.component = result.msg.map(item => {return {...item, "author_name": item.name}})[0]
      this.$forceUpdate
    } else {
      this.isNewComponent = true
      this.component = {
        "component_id": null,
            "author_id": null,
            "author_name": "",
            "title": "",
            "language": "",
            "code": "<template>" +
                "\n <h1>Hello World!</h1>" +
                "\n</template>"
      }
    }
  },
  methods: {
    async saveComponent(){
      let data = {
        "component_id": this.$route.query.c,
        "author_id": this.$store.getters.getUser.id,
        "title": this.component.title,
        "language": this.component.language,
        "code": this.newCode,
        "last_update": moment().format("Y-MM-DD HH:MM:s"),
      }

      let response = await AuthService.saveComponent(data)

      if(response.msg == "Success"){
        if(this.isNewComponent){
          this.$router.push('/components')
        } else {
          this.$router.push('/component?c=' + this.$route.query.c)
        }
      }
    },
    updateCode(code){
      if(typeof(code) === "string"){ //prevent weird update events overwriting our actual code
        this.newCode = code
      }
    }
  },
  updated(){
  }
}
</script>
<style lang="scss" scoped>
.content {
  margin-top: 50px;
  height: 70%;
  background: white;
  max-width: $mi-vp-xl;
}

.component {
  .title {
    color: $mi-lila;
    margin-bottom: $xs / 2;
  }

  .author {
    font-size: $bfs;
    margin-bottom: $l;
  }

  .header {
    display: flex;
    justify-content: space-between;

    #componentTitle {
      font-size: 2rem;
      font-family: "Roboto Slab", sans-serif;
    }

    .text-fields {
      display: flex;
      flex-direction: column;

      #componentLang {
        font-size: 1rem;
        color: $mi-lila;
        margin-bottom: $xs;
      }
    }

    .actions {
      background: $mi-lila;
      border-radius: 5px;
      height: 50px;

      img {
        filter: invert(100%);
      }

      #saveButton {
        cursor: pointer;
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>

<style lang="scss">
.VueLive-editor {
  background: $mi-hellgrau;
  margin-right: $bfs-l;
  max-height: 600px;
  overflow-y: scroll;
}

.VueLive-LineNumbers pre .line:before {
  color: $mi-lila;
}

.VueLive-editor, .VueLivePreview {
  /*border: solid 2px $mi-grau;*/
  border-radius: 5px;
}
</style>
