<script>
import NavBar from '@/components/header-navigation.vue'
import Sidebar from '@/components/side-bar.vue'
import { createDirectus, rest, readItems, createItem } from '@directus/sdk'
import { useAuth0 } from '@auth0/auth0-vue'
import RecipeItem from '@/components/recipe-item.vue'
import config from '../config.js'

const client = createDirectus(config.directus_hostname).with(rest())

export default {
  data() {
    return {
      searchquery: '',
      recipies: [],
      users: [],
      renderComponent: true
    }
  },
  setup() {
    const { user, isAuthenticated } = useAuth0()
    return { isAuthenticated, user }
  },
  components: {
    NavBar,
    Sidebar,
    RecipeItem
  },
  async mounted() {
    this.recipies = await client.request(
      readItems('Recipies', {
        fields: ['*']
      })
    )
    this.users = await client.request(
      readItems('Users', {
        fields: ['id', 'username', 'sub']
      })
    )
    this.checkIfNewUserSignedIn()
  },
  methods: {
    checkIfSearched(item) {
      return item.Name.toLowerCase().includes(this.searchquery)
    },
    checkIfNewUserSignedIn() {
      if (this.isAuthenticated) {
        let isInDatabase = false
        this.users.forEach((element) => {
          if (element.sub == this.user.sub) {
            isInDatabase = true
          }
        })
        if (!isInDatabase) {
          console.log('adding new user to databse')
          client.request(
            createItem('Users', {
              username: this.user.nickname,
              sub: this.user.sub,
              picture: this.user.picture
            })
          )
        }
      }
    }
  }
}
</script>

<template>
  <NavBar
    class="min-w-full"
    @search="
      (query) => {
        searchquery = query.toLowerCase()
      }
    "
  />
  <div class="flex w-full">
    <div class="w-4/5 flex flex-wrap gap-32 sm: justify-around">
      <div v-for="item in recipies.filter(checkIfSearched)" :key="item.id" class="text-right">
        <RecipeItem :item="item" />
      </div>
    </div>
    <Sidebar
      class="p-0 md:text-right w-1/5"
      :recipies_counter="recipies.length"
      :users_counter="users.length"
      :latest_user="users[users.length - 1]?.username"
    />
  </div>
</template>
