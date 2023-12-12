<template>
  <div>
    <NavHeader :links=this.navLinks />
    <div class="editor content has-gap">
      <div class="header flex">
        <input type="text" name="guidelineTitle" v-model="guidelineTitle" placeholder="Titel..." id="guidelineTitle">
        <div class="actions_wrapper">
          <div class="actions">
            <img src="@/assets/images/save.svg" alt="Speichern"  id="saveButton" @click="save">
          </div>
        </div>
      </div>
      <!--<input type="text" v-model="position" @change="changeCursorPosition">-->
      <VueEditor
          ref="editor"
          v-model="editorContent"
          id="vueEditor"
          :customModules="customModulesForEditor"
          :editorOptions="editorSettings"
          @selection-change="handleCursorChange"
          @text-change="handleTextChange"
          style="height: 600px;"
      />
    </div>
    <div id="imageModal" v-if="imageToAdd">
      <div id="modalContent">
        <h1>Bild einfügen</h1>
        <img :src="imageToAdd">
        <div style="display: flex; width: 100%; justify-content: start; gap: 10px; margin-top: 10px;">
          <input type="text" id="alt-text" v-model="imageAltText" style="width: 70%;"><label for="alt-text">Alt-Text</label>
        </div>
        <div style="display: flex; width: 100%; justify-content: start; gap: 10px; margin-top: 10px;">
          <button class="submitAltText cancel" @click="cancelImage">Abbrechen</button> <button class="submitAltText" @click="submitImage">Hinzufügen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue3-editor";
import MultiCursor from "quill-cursors";
import moment from 'moment';
import NavHeader from "@/components/navHeader.vue";
import AuthService from "@/services/AuthService";

export default {
  name: 'TextEditor',
  components: {
    VueEditor,
    NavHeader
  },
  data() {
    return {
      existingGuideline: (!this.$route.query.new && this.$route.query.g) ? true : false,
      imageAltText: null,
      imageToAdd: null,
      navLinks: [
        {
          link: "/menu",
          name: "editor"
        }
      ],
      ws: null,
      position: 0,
      authorName: this.$store.getters.getUser.name,
      guidelineTitle: '',
      editorContent: '',
      editorBibliographyContent: '',
      activeUsers: [],
      textChangeTimeout : false,
      lastWsUpdate: moment(),
      webSocketActive: false,
      customModulesForEditor: [
        {
          alias: "multiCursor",
          module: MultiCursor,
          template: '<div class="custom-cursor">...</div>',
          hideDelayMs: 5000,
          hideSpeedMs: 0,
          selectionChangeSource: null,
          transformOnTextChange: true
        }
      ],
      editorSettings: {
        modules: {
          multiCursor: true,
          toolbar: {
            container: [['image']],
            handlers: {
              image: this.imageHandler
            }
          }
        }
      }
    }
  },
  async mounted() {
    //this.webSocketInvoke();

    if(this.existingGuideline){
      await this.getGuideline()
    }
  },
  methods: {
    checkForAltText(){
      //this returns true if every image in the guideline also has an alt text
      return this.occurrences(this.editorContent, "<img src", false) === 0 || this.occurrences(this.editorContent, "<img src", false) === this.occurrences(this.editorContent, ";alt&gt", false)
    },
    occurrences(string, subString, allowOverlapping) {

      string += "";
      subString += "";
      if (subString.length <= 0) return (string.length + 1);

      var n = 0,
          pos = 0,
          step = allowOverlapping ? 1 : subString.length;

      while (string) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
          ++n;
          pos += step;
        } else break;
      }
      return n;
    },
    imageHandler() {
      let input = document.createElement('input');
      input.type = 'file';
      input.onchange = () => {
        let files = Array.from(input.files);
        const reader = new FileReader();
        reader.onloadend = () => {
          //TODO: AI API CALL
          AuthService.generateAIAltText({
            "lang":"de",
            "image": {
              "raw": reader.result.substring(23)
            }
          }).then((result) => {
            console.log(result)
            this.imageAltText = result.alt_text;
            this.imageToAdd = reader.result;
          })
        };
        reader.readAsDataURL(files[0]);
      };
      input.click();
    },
    submitImage(){
      let value = this.imageToAdd;
      this.$refs.editor.quill.insertEmbed(-1, 'image', value);
      if(this.imageAltText)this.$refs.editor.quill.insertText(-1, "<alt>" + this.imageAltText + "</alt>")
      this.imageToAdd = null
      this.imageAltText = null
    },
    cancelImage(){
      this.imageToAdd = null;
    },
    async getGuideline(){
      let data = {
        "guideline_id": this.$route.query.g
      }

      let result = await AuthService.getGuideline(data)

      this.guidelineTitle = result.msg.title
      this.editorContent = result.msg.text.replace('<pre><p>Code</p><code><xmp>', '<pre class="ql-syntax" spellcheck="false">').replace('</xmp></code></pre>', '</pre>')
      this.editorBibliographyContent = result.msg.bibliography

    },
    async save(){
      let data = {
        "author_id": this.$store.getters.getUser.id,
        "title": this.guidelineTitle,
        "last_update": moment().format("Y-MM-DD HH:MM:s"),
        "text": this.editorContent.replace('<pre class="ql-syntax" spellcheck="false">', '<pre><p>Code</p><code><xmp>').replace('</pre>', '</xmp></code></pre>'),
        "bibliography": this.editorBibliographyContent
      }

      if(this.existingGuideline) data.guideline_id = this.$route.query.g
      let result = await AuthService.saveGuideline(data)

      if(result.msg == "Success"){
        if(this.existingGuideline){
          this.$router.push("/guideline?g=" + this.$route.query.g)
        } else {
          this.$router.push("/yourguidelines")
        }
      } else {
        console.log(result)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header{
  margin-bottom: $bfs-l;
}

.actions_wrapper {
  display: flex;
  align-items: center;
  gap: $bfs;

  img {
    padding: 0;
    height: 30px;
    filter: invert(22%) sepia(83%) saturate(7122%) hue-rotate(279deg) brightness(84%) contrast(102%);;
  }

  .accessibility_badge {
    background: transparent;
    border: solid 2px $mi-lila;
    display: flex;
    align-items: center;
    color: white;
    border-radius: 30px;
    padding: 4px;
    height: min-content;

    p {
      margin: 0;
      padding-right: 2px;
      font-size: $bfs-xs;
      color: $mi-lila;
    }

    &.inaccessible {
      border: none;

      p {
        color: $mi-pink;
      }
    }
  }
}

.actions {
  background: $mi-lila;
  border-radius: 5px;

  img {
    filter: invert(100%);
  }

  #saveButton {
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
}

.editor {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}

#guidelineTitle {
  font-family: "Roboto Slab", sans-serif;
  border: none;
  font-size: 2rem;
  margin-bottom: 5px;
}

#guidelineAuthor {
  font-family: "Roboto Slab", sans-serif;
  border: none;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

#guidelineTitle:focus, #guidelineAuthor:focus {
  outline: none !important;
}

#imageModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  #modalContent {
    background: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    max-width: 50%;
  }
}

input[type='text'] {
  border: solid 1px $mi-grau;
  margin-bottom: $bfs;
  font-family: "PT Sans", sans-serif;
  font-size: $bfs-s;
  padding: 2px;
}

label {
  white-space: nowrap;
}

.submitAltText {
  cursor: pointer;
  font-family: 'Roboto Slab', sans-serif;
  font-weight: bold;
  background: $mi-lila;
  color: $mi-hellgrau;
  padding: $xs;
  align-items: center;
  width: 30%;
  max-width: 100px;

  &.cancel {
    background: $mi-pink;
  }
}

</style>
