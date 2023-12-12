import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import GuidelineOverview from "../views/GuidelineOverview.vue";
import GuidelineView from "../views/GuidelineView.vue";
import UserView from "../views/UserView.vue";
import MenuView from "../views/MenuView.vue";
import TextEditor from "../views/TextEditor.vue";
import UserGuidelineOverview from "../views/UserGuidelineOverview.vue";
import TestEditor1 from "../views/TestEditor1.vue";
import TestEditor2 from "../views/TestEditor2.vue";
import TestEditor3 from "../views/TestEditor3.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/guidelines',
    name: 'guidelines',
    component: GuidelineOverview
  },
  {
    path: '/guideline',
    name: 'guideline',
    component: GuidelineView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/editor',
    name: 'editor',
    component: TextEditor
  },
  {
    path: '/testeditor1',
    name: 'testeditor1',
    component: TestEditor1
  },
  {
    path: '/testeditor2',
    name: 'testeditor2',
    component: TestEditor2
  },
  {
    path: '/testeditor3',
    name: 'testeditor3',
    component: TestEditor3
  },
  {
    path: '/yourguidelines',
    name: 'yourguidelines',
    component: UserGuidelineOverview
  }
]

const router = createRouter({
  history: createWebHashHistory("/"),
  routes
})

export default router
