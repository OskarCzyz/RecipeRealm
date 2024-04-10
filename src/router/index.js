import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import AddRecipeView from '../views/AddRecipeView.vue'
import RecipeView from '../views/RecipeView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/add-recipe',
      name: 'add-recipe',
      component: AddRecipeView
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: RecipeView,
      props: true
    },
    {
      path: '/profile/',
      name: 'profile',
      component: ProfileView
    }
  ]
})

export default router
