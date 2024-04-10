<script>
import NavBar from '@/components/header-navigation.vue'
import { createDirectus, rest, readItems } from '@directus/sdk'

const client = createDirectus('https://platypus-evolving-smoothly.ngrok-free.app/').with(rest())

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
      }
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
  <div class="col-span-4 flex flex-col items-center justify-center w-104 mx-80">
    <h1 class="text-5xl m-10">{{ recipies.Name }}</h1>
    <div class="flex justify-content-center items-center">
      <i>{{ author.username }}</i>
      <img alt="profile pic" :src="author.picture" class="w-8 h-8 mx-4 rounded-full" />
    </div>
    <img
      class="scale-95 max-h-96"
      :src="'https://platypus-evolving-smoothly.ngrok-free.app/assets/' + recipies.Image"
      alt="food image"
    />
    <p>Servings: {{ recipies.Servings }}</p>
    <p class="m-5 p-5 border">
      Ingriedients: <br />
      {{ recipies.Ingriedients }}
    </p>
    <hr />
    <p class="m-5 p-5 border">
      Instructions: <br />
      {{ recipies.Instructions }}
    </p>
  </div>
</template>
