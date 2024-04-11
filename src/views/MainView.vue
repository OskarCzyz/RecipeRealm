<script>
import NavBar from '@/components/header-navigation.vue'
import Sidebar from '@/components/side-bar.vue'
import { createDirectus, rest, readItems } from '@directus/sdk'
import { useAuth0 } from '@auth0/auth0-vue'
import RecipeItem from '@/components/recipe-item.vue'
const client = createDirectus('https://platypus-evolving-smoothly.ngrok-free.app/').with(rest())

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
  },
  methods: {
    checkIfSearched(item) {
      return item.Name.toLowerCase().includes(this.searchquery)
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
