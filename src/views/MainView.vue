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
    @search="
      (query) => {
        searchquery = query.toLowerCase()
      }
    "
  />
  <div class="m-3 text-xl" v-if="searchquery.trim() === ''">All Recipies:</div>
  <div class="grid grid-cols-5">
    <div class="col-span-4 flex flex-wrap gap-32 justify-around">
      <div
        v-for="item in recipies.filter(checkIfSearched)"
        :key="item.id"
        class="text-right w-96 h-96"
      >
        <RecipeItem :item="item" />
      </div>
    </div>
    <Sidebar
      class="px-32 text-right w-[500px]"
      :recipies_counter="recipies.length"
      :users_counter="users.length"
      :latest_user="users[users.length - 1]?.username"
    />
  </div>
</template>
