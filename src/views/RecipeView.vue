<script>
import NavBar from '@/components/header-navigation.vue'
import { createDirectus, rest, readItems } from '@directus/sdk'
import config from '../config.js'

const client = createDirectus(config.directus_hostname).with(rest())

export default {
  props: ['id'],
  data() {
    return {
      login: localStorage.getItem('login'),
      recipies: {},
      msg: '',
      author: {
        username: '',
        picture: ''
      },
      config: config
    }
  },
  components: {
    NavBar
  },
  async mounted() {
    const response = await client.request(
      readItems('Recipies', {
        fields: ['*']
      })
    )
    const response2 = await client.request(
      readItems('Users', {
        fields: ['*']
      })
    )
    response.forEach((element) => {
      if (element.id == this.id) {
        this.recipies = element
      }
    })
    response2.forEach((element) => {
      if (element.id == this.recipies.created_by) {
        this.author.username = element.username
        this.author.picture = element.picture
      }
    })
    this.recipies.Ingriedients = this.recipies.Ingriedients.replace('|', '\n')
  },
  methods: {}
}
</script>
<template>
  <NavBar class="Header" :login="login" />
  <div class="grid items-center justify-items-center min-h-full min-w-full">
    <h1 class="text-5xl m-10">{{ recipies.Name }}</h1>
    <div class="flex justify-content-center items-center">
      <i>{{ author.username }}</i>
      <img alt="profile pic" :src="author.picture" class="w-8 h-8 mx-4 rounded-full" />
    </div>
    <img
      class="scale-95 h-96 max-h-96 rounded"
      :src="config.directus_hostname + 'assets/' + recipies.Image"
      alt="food image"
    />
    <p>Servings: {{ recipies.Servings }}</p>
    <div class="m-5 p-5 border">
      Ingriedients: <br />
      <ul v-for="ingriedient in recipies.Ingriedients?.split('\n')" :key="ingriedient">
        <li
          v-if="ingriedient.trim() != ''"
          class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
        >
          <div class="flex items-center ps-3">
            <input
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              type="checkbox"
              :name="ingriedient"
            /><label class="w-full py-3 ms-2 text-sm font-medium" :for="ingriedient">{{
              ingriedient
            }}</label>
          </div>
        </li>
      </ul>
      {{}}
    </div>
    <hr />
    <p class="m-5 p-5 border">
      Instructions: <br />
      {{ recipies.Instructions }}
    </p>
  </div>
</template>
