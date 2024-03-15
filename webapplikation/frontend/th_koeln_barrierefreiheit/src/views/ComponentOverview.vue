<template>
  <div class="components">
    <NavHeader :links=this.navLinks />
    <div class="content has-gap">
      <div class="loading" v-if="!components || components.length == 0"></div>
      <div class="component_list" v-if="components && components.length > 0">
        <router-link :to="'/component?g=' + component.component_id" class="component" v-for="component in components" :key="component.component_id" :value="component.component_id">
          <div class="top_row">
            <div>
              <h2>{{component.title}}</h2>
              <h3>von <router-link :to="'/user?u=' + component.id">{{component.name}}</router-link></h3>
            </div>
            <div>
              <span class="code_language">{{component.language}}</span>
            </div>
          </div>
          <VueLivePreview :code="component.code"/>
        </router-link>
      </div>
  </div>
  </div>
</template>

<script>
import NavHeader from "@/components/navHeader.vue";
import AuthService from "@/services/AuthService";
import {VueLivePreview} from "vue-live";

export default {
  name: 'HomeView',
  components: {NavHeader, VueLivePreview},
  data(){
    return {
      navLinks: [
        {
          link: "/guidelines",
          name: "guidelines"
        }
      ],
      components: []
    }
  },
  async mounted(){
    await this.getComponents()
  },
  methods : {
    async getComponents(){
      let result = await AuthService.getAllComponents()
      this.components = result.msg
    }
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

.navbar {
  display: flex;
  gap: $bfs;

  select, input[type='text'] {
    border: solid 1px $mi-grau;
    margin-bottom: $bfs;
    font-family: "PT Sans", sans-serif;
    font-size: $bfs-s;
    padding: 2px;
  }
}

.component_list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: $l;
  margin-bottom: $l;
}

a:hover {
  color: white;
}

.component {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  background: $mi-black;
  border-radius: 5px;
  padding: $s;
  transition: ease 0.2s;
  max-height: 200px;

  &:hover {
    transform: scale(105%);
  }

  p {
    max-width: 70%;
    font-size: $bfs-s;
  }

  .top_row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2 {
      margin-bottom: $xs;
    }

    h3 {
      color: $mi-grau;
      font-size: $bfs-s;
      margin-bottom: $xs;
    }

    .code_language {
      background: rgba(147,19,206,0.3);
      border: dashed 1px $mi-lila;
      border-radius: 10px;
      padding: 2px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .component_list {
    grid-gap: $bfs-xxs;
    grid-template-columns: 1fr;

    .component {
      max-width: 37vw;
      padding: $bfs-xxs;

      .top_row {
        flex-direction: column;
        h2 {
          font-size: $bfs-s;
          padding: 0;
          word-break: break-all;
          hyphens: auto;
        }
        h3 {
          margin-bottom: 0;
        }
      }

      p {
        font-size: $bfs-xs;
        max-width: 100%;
        display: none;
      }

      .approvements {
        justify-content: flex-start;
        align-items: baseline;

        .approvement_list {
          align-self: baseline;
          justify-content: flex-start;
        }

        a {
          height: $s;
        }

        img {
          width: $m;
          height: $m;
          margin: 0 5px 0 0;
        }
      }
    }
  }
}

</style>
