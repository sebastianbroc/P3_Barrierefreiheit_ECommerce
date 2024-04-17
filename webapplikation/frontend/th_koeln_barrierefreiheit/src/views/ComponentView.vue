<template>
  <div class="guidelines">
    <NavHeader :links=this.navLinks />
    <div class="content has-gap">
      <div class="loading" v-if="!component"></div>
      <div class="component" v-if="component">
        <div class="header">
          <div>
            <h1 class="title">{{component.title}}</h1>
            <h2 class="author">von <router-link :to="'/user?u=' + component.author_id">{{component.author_name}}</router-link></h2>
            <h3 class="code_lang">{{component.language}}</h3>
          </div>
          <button id="edit_component_button" @click="redirectToEdit" v-if="component.author_id === $store.getters.getUser.id"><img src="@/assets/images/edit.svg" alt="Diese Komponente bearbeiten" id="editButton"></button>
        </div>
        <VueLive
            :code=component.code
            :editor-props="{lineNumbers: true}"
            @error="(e) => console.log(e)"
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

export default {
  name: 'HomeView',
  components: {NavHeader, VueLive},
  data(){
    return {
      component: null,
      test_component: {
        "component_id": 1,
        "author_id": 7,
        "author_name": "Jennifer Schirrmann",
        "title": "Kontakt-Karte",
        "language": "Vue2",
        "code": "<template>\n" +
            "   <body>\n" +
            "        <div class=\"card\">\n" +
            "            <div class=\"photo\"></div>\n" +
            "            <div class=\"banner\"></div>\n" +
            "            <ul>\n" +
            "                <li><b>John Doe</b></li>\n" +
            "                <li>Web Developer</li>\n" +
            "            </ul>\n" +
            "            <button class=\"contact\" id=\"main-button\">click to get in touch</button>\n" +
            "            <div class=\"social-media-banner\">\n" +
            "                <a href=\"\"><i class=\"fa fa-twitter\"></i></a>\n" +
            "                <a href=\"\"><i class=\"fa fa-facebook\"></i></a>\n" +
            "                <a href=\"\"><i class=\"fa fa-instagram\"></i></a>\n" +
            "                <a href=\"\"><i class=\"fa fa-linkedin\"></i></a>\n" +
            "            </div>\n" +
            "          <form class=\"email-form\">\n" +
            "                <input id=\"name\" type=\"text\" placeholder=\"name\">\n" +
            "                <input id=\"email\" type=\"text\" placeholder=\"email\">\n" +
            "                <textarea id=\"comment\" type=\"text\" placeholder=\"comment\"></textarea>\n" +
            "                <button class=\"contact\">send</button>\n" +
            "          </form>\n" +
            "          </div>\n" +
            "    </body>\n" +
            "</template>\n" +
            "\n" +
            "<style>\n" +
            "html \n" +
            "{\n" +
            "    overflow-x: hidden;\n" +
            "}\n" +
            "\n" +
            "body {\n" +
            "\n" +
            "    font-family: 'Lato', sans-serif;\n" +
            "    margin: 0;\n" +
            "    background-color: white;\n" +
            "    \n" +
            "}\n" +
            "\n" +
            "a\n" +
            "{\n" +
            "\n" +
            "    text-decoration: none;\n" +
            "\n" +
            "}\n" +
            "\n" +
            "\n" +
            ".card\n" +
            "{\n" +
            "    z-index: 1;\n" +
            "    position: relative;\n" +
            "    width: 300px;\n" +
            "    height:400px;\n" +
            "    margin: 0 auto;\n" +
            "    margin-top:100px;\n" +
            "    background-color: white;\n" +
            "    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n" +
            "\t-moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n" +
            "\tbox-shadow: 0 0 15px rgba(0, 0, 0, 0.2);\n" +
            "    -webkit-transition: all 0.7s ease-in-out;\n" +
            "    -moz-transition:    all 0.7s ease-in-out;\n" +
            "    -o-transition:      all 0.7s ease-in-out;\n" +
            "    -ms-transition:     all 0.7s ease-in-out;\n" +
            "}\n" +
            ".card.active\n" +
            "{\n" +
            "    height:490px;\n" +
            "}\n" +
            ".banner\n" +
            "{\n" +
            "    z-index: 2;\n" +
            "    position: relative;\n" +
            "    margin-top: -154px;\n" +
            "    width:100%;\n" +
            "    height:150px;\n" +
            "    background-image: url(\"https://snap-photos.s3.amazonaws.com/img-thumbs/960w/RQ2Z75PQIN.jpg\");\n" +
            "    background-size: cover;\n" +
            "    border-bottom: solid 1px lightgrey;\n" +
            "  \n" +
            "    -webkit-transition: all 0.7s ease-in-out;\n" +
            "    -moz-transition:    all 0.7s ease-in-out;\n" +
            "    -o-transition:      all 0.7s ease-in-out;\n" +
            "    -ms-transition:     all 0.7s ease-in-out;\n" +
            "}\n" +
            "\n" +
            ".banner.active\n" +
            "{\n" +
            "    height: 0;\n" +
            "}\n" +
            "\n" +
            ".photo\n" +
            "{\n" +
            "    z-index: 3;\n" +
            "    position: relative;\n" +
            "    border-radius: 50%;\n" +
            "    height: 150px;\n" +
            "    width: 150px;\n" +
            "    background-color: white;\n" +
            "    margin: 0 auto;\n" +
            "    background-image: url(\"https://filmshotfreezer.files.wordpress.com/2011/07/untitled-1.jpg\");\n" +
            "    background-size: cover;\n" +
            "    background-position: 50% 50%;\n" +
            "    top:75px;\n" +
            "    -webkit-box-shadow: inset 0px 0px 5px 1px rgba(0,0,0,0.3);\n" +
            "    -moz-box-shadow: inset 0px 0px 5px 1px rgba(0,0,0,0.3);\n" +
            "    box-shadow: inset 0px 0px 5px 1px rgba(0,0,0,0.3);\n" +
            "    -webkit-transition: top 0.7s ease-in-out, background 0.15s ease;\n" +
            "    -moz-transition:    top 0.7s ease-in-out, background 0.15s ease;\n" +
            "    -o-transition:      top 0.7s ease-in-out, background 0.15s ease;\n" +
            "    -ms-transition:     top 0.7s ease-in-out, background 0.15s ease;\n" +
            "}\n" +
            "\n" +
            ".photo.active\n" +
            "{\n" +
            "    top:-80px;\n" +
            "}\n" +
            ".card ul\n" +
            "{\n" +
            "    list-style: none;\n" +
            "    text-align: center;\n" +
            "    padding-left: 0;\n" +
            "    margin-top:87px;\n" +
            "    margin-bottom:30px;\n" +
            "    font-size: 20px;\n" +
            "    -webkit-transition: all 0.7s ease-in-out;\n" +
            "    -moz-transition:    all 0.7s ease-in-out;\n" +
            "    -o-transition:      all 0.7s ease-in-out;\n" +
            "    -ms-transition:     all 0.7s ease-in-out;\n" +
            "}\n" +
            "\n" +
            ".card ul.active\n" +
            "{\n" +
            "    opacity:0;\n" +
            "    visibility: hidden;\n" +
            "}\n" +
            "\n" +
            ".card i\n" +
            "{\n" +
            "    font-size: 25px;\n" +
            "    display: inline-block;\n" +
            "    margin-top:10px;\n" +
            "    margin-left: 40px;\n" +
            "    margin-right: 150px;\n" +
            "    width: 300px;;\n" +
            "    text-align: left;\n" +
            "    color: #C7D0E1;\n" +
            "}\n" +
            "\n" +
            "button.contact\n" +
            "{\n" +
            "    margin: 0 auto;\n" +
            "    text-align: center;\n" +
            "    margin-top: -15px;\n" +
            "    width: 100%;\n" +
            "    height: 35px;\n" +
            "    display: block;    \n" +
            "    border:none;\n" +
            "    background-color: transparent;\n" +
            "    font-family: inherit;\n" +
            "    color: white;\n" +
            "    background-color: #C7D0E1;\n" +
            "    font-size:12px;\n" +
            "    text-transform: uppercase;\n" +
            "    -webkit-transition: all 0.3s ease-in-out;\n" +
            "    -moz-transition:    all 0.3s ease-in-out;\n" +
            "    -o-transition:      all 0.3s ease-in-out;\n" +
            "    -ms-transition:     all 0.3s ease-in-out;\n" +
            "}\n" +
            "\n" +
            "button.contact:hover\n" +
            "{\n" +
            "    cursor: pointer;\n" +
            "    background-color:#979da8;\n" +
            "}\n" +
            "\n" +
            "button.contact:focus\n" +
            "{\n" +
            "    outline: 0;\n" +
            "}\n" +
            "\n" +
            ".social-media-banner\n" +
            "{\n" +
            "    width: 300px;\n" +
            "    height: 50px;\n" +
            "    margin-top: 25px;\n" +
            "    text-align: center;\n" +
            "    position: absolute;\n" +
            "    -webkit-transition: all 1.5s ease-in-out;\n" +
            "    -moz-transition:    all 1.5s ease-in-out;\n" +
            "    -o-transition:      all 1.5s ease-in-out;\n" +
            "    -ms-transition:     all 1.5 ease-in-out;\n" +
            "}\n" +
            "\n" +
            ".social-media-banner.active\n" +
            "{\n" +
            "    opacity:0;\n" +
            "    visibility: hidden;\n" +
            "        -webkit-transition: all 0.1s ease-in-out;\n" +
            "    -moz-transition:    all 0.1s ease-in-out;\n" +
            "    -o-transition:      all 0.1s ease-in-out;\n" +
            "    -ms-transition:     all 0.1s ease-in-out;\n" +
            "}\n" +
            "\n" +
            ".social-media-banner a i\n" +
            "{\n" +
            "    display: inline;\n" +
            "    \n" +
            "    width: auto;\n" +
            "    margin-right:15px;\n" +
            "    margin-left: 10px;\n" +
            "    -webkit-transition: all 0.3s ease-in-out;\n" +
            "    -moz-transition:    all 0.3s ease-in-out;\n" +
            "    -o-transition:      all 0.3s ease-in-out;\n" +
            "    -ms-transition:     all 0.3s ease-in-out;\n" +
            "}\n" +
            "\n" +
            ".social-media-banner a i:hover\n" +
            "{\n" +
            "    color:#979da8;\n" +
            "}\n" +
            "\n" +
            ".email-form\n" +
            "{\n" +
            "    height: 0;\n" +
            "    overflow: hidden;\n" +
            "/*    background-color: #C7D0E1;*/\n" +
            "    width: 300px;\n" +
            "     z-index:-1;\n" +
            "    -webkit-transition: all 0.5s ease-in-out;\n" +
            "    -moz-transition:    all 0.5s ease-in-out;\n" +
            "    -o-transition:      all 0.5s ease-in-out;\n" +
            "    -ms-transition:     all 0.5s ease-in-out;\n" +
            "     transition: all 0.5s ease-in-out;\n" +
            "}\n" +
            "\n" +
            ".email-form.active\n" +
            "{\n" +
            "    height: 310px;\n" +
            "    z-index: 3;\n" +
            "    -webkit-transition: all 1s ease-in-out;\n" +
            "    -moz-transition:    all 1s ease-in-out;\n" +
            "    -o-transition:      all 1s ease-in-out;\n" +
            "    -ms-transition:     all 1s ease-in-out;\n" +
            "     transition: all 1s ease-in-out;\n" +
            "}\n" +
            "\n" +
            ".email-form input\n" +
            "{\n" +
            "    width: 200px;\n" +
            "    text-transform: capitalize;\n" +
            "/*    background-color: #a4acbc;*/\n" +
            "    margin: 0 auto;\n" +
            "    font-family: inherit;\n" +
            "    border: 1px solid #dadee5;\n" +
            "/*    border: 1px solid black;*/\n" +
            "    margin-top: 35px;\n" +
            "    height: 30px;\n" +
            "    display: block;\n" +
            "        -webkit-transition: all 0.2s ease-in-out;\n" +
            "    -moz-transition:    all 0.2s ease-in-out;\n" +
            "    -o-transition:      all 0.2s ease-in-out;\n" +
            "    -ms-transition:     all 0.2s ease-in-out;\n" +
            "}\n" +
            ".email-form input:focus,.email-form textarea:focus\n" +
            "{\n" +
            "/*    border: none;*/\n" +
            "    border: 1px solid grey;\n" +
            "    outline: none;\n" +
            "    \n" +
            "}\n" +
            "::-webkit-input-placeholder \n" +
            "{\n" +
            " font-size: 12px;\n" +
            " text-transform: uppercase;\n" +
            " text-align: center;\n" +
            "/*    color: black;*/\n" +
            "}\n" +
            ".email-form textarea\n" +
            "{\n" +
            "    width: 200px;\n" +
            "    text-transform: capitalize;\n" +
            "    background-color: white;\n" +
            "    margin: 0 auto;\n" +
            "    display: block;\n" +
            "    margin-top:40px;\n" +
            "    border: 1px solid #dadee5;\n" +
            "    font-family: inherit;\n" +
            "    -webkit-transition: all 0.3s ease-in-out;\n" +
            "    -moz-transition:    all 0.3s ease-in-out;\n" +
            "    -o-transition:      all 0.3s ease-in-out;\n" +
            "    -ms-transition:     all 0.3s ease-in-out;\n" +
            "}\n" +
            "\n" +
            ".email-form button\n" +
            "{\n" +
            "    margin-top: 60px;\n" +
            "}\n" +
            "\n" +
            "</style>"
      },
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
    let result = await AuthService.getComponent({"component_id": this.$route.query.c})
    this.component = result.msg.map(item => {return {...item, "author_name": item.name}})[0]
    console.log(this.component)
    this.$forceUpdate
  },
  methods: {
    redirectToEdit(){
      this.$router.push('/editcomponent?c=' + this.$route.query.c)
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
  padding-bottom: $bfs-xxl;

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

    .code_lang {
      background: rgba(147,19,206,0.3);
      border: dashed 1px $mi-lila;
      border-radius: 10px;
      padding: 4px;
      width: fit-content;
      font-size: $bfs-s;
    }
  }

  #edit_component_button {
    background: $mi-lila;
    border-radius: 5px;
    height: 50px;
    cursor: pointer;

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

@media screen and (max-width: 640px) {
  .VueLive-container {
    display: flex;
    flex-direction: column;
  }

  .VueLive-editor {
    width: 90vw !important;
  }

  .VueLivePreview {
    margin-top: $bfs-xl;
    width: 90vw !important;
  }
}
</style>
