<script>
import NavBar from '@/components/header-navigation.vue'
import { createDirectus, rest, readItems, createItem, uploadFiles } from '@directus/sdk'
import router from '@/router'
import { useAuth0 } from '@auth0/auth0-vue'

const directusclient = createDirectus('https://p6hmtsst0q.loclx.io/').with(rest())

export default {
  data() {
    return {
      login: localStorage.getItem('login'),
      recipeData: {
        Name: '',
        Ingriedients: '',
        Servings: 0,
        created_by: 0,
        image: File,
        Instructions: ''
      },
      msg: ''
    }
  },
  components: {
    NavBar
  },
  setup() {
    const { user, isAuthenticated } = useAuth0()
    return { isAuthenticated, user }
  },
  async mounted() {
    const response = await directusclient.request(
      readItems('Users', {
        fields: ['id', 'sub', 'username', 'picture']
      })
    )
    response.forEach((element) => {
      if (element.sub == this.user.sub) {
        this.recipeData.created_by = element.id
      }
    })
  },
  methods: {
    addRecipe(event) {
      const formData = new FormData(event.target)
      directusclient.request(uploadFiles(formData)).then((uploadedFile) => {
        directusclient.request(
          createItem('Recipies', {
            Name: this.recipeData.Name,
            Ingriedients: this.recipeData.Ingriedients,
            Instructions: this.recipeData.Instructions,
            Servings: this.recipeData.Servings,
            Image: uploadedFile.id,
            created_by: this.recipeData.created_by
          })
        )
      })
      router.push('/')
    }
  }
}
</script>
<template>
  <NavBar class="Header" :login="login" />
  <div>
    <div class="w-100 flex items-center justify-center">
      <form
        @submit.prevent="addRecipe"
        method="post"
        class="px-4 my-32 max-2-3xl mx-auto space-y-6 flex-column"
      >
        <div>
          <h1 class="text-3xl font-semibold">New Recipe</h1>
          <p class="text-gray-600">Recipe that you will make will be visible to other users</p>
        </div>
        <div>
          <label for="name">Name</label>

          <input
            type="text"
            name="Name"
            v-model="recipeData.Name"
            class="border border-gray-400 block py-2 px-2 w-full rounded focus:outline-none foucs:border-teal-500"
          />
        </div>
        <div>
          <label>Instructions</label>
          <textarea
            class="border border-gray-400 block py-2 px-2 w-full rounded focus:outline-none foucs:border-teal-500"
            name="Instructions"
            v-model="recipeData.Instructions"
          />
        </div>
        <div>
          <label>Ingredients</label>
          <textarea
            class="border border-gray-400 block py-2 px-2 w-full rounded focus:outline-none foucs:border-teal-500"
            name="Ingriedients"
            v-model="recipeData.Ingriedients"
          />
        </div>
        <div>
          <label>Servings: </label>
          <input
            class="border border-gray-400 block py-2 px-2 w-full rounded focus:outline-none foucs:border-teal-500"
            type="number"
            name="Servings"
            v-model="recipeData.Servings"
          />
        </div>
        <div class="flex items-center justify-center">
          <input
            class="w-full file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:px-6 file:py-3 file:m-5 file:border-none file:rounded-full file:text-white file:cursor-pointer file:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-600 to-gray-700 text-white/80 rounded-full cursor-pointer shadow-xl shadow-gray-700/60"
            type="file"
            name="Image"
            @input="(event) => (image = event.target.files[0])"
          />
        </div>
        <div class="w-full px-32">
          <button
            class="w-full bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-500"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {{ msg }}
    </div>
  </div>
</template>
