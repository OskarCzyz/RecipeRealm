<script>
import { createDirectus, rest, readItems, createItem, deleteItem } from '@directus/sdk'
import { useAuth0 } from '@auth0/auth0-vue'
import config from '../config.js'

const client = createDirectus(config.directus_hostname).with(rest())
export default {
  data() {
    return {
      recipies: [],
      recipies_users: [],
      users: [],
      like_amount: 0,
      original_like_amount: 0,
      isLiked: '',
      buffer: false,
      changed: false,
      config: config
    }
  },
  async mounted() {
    this.recipies = await client.request(
      readItems('Recipies', {
        fields: ['*']
      })
    )
    this.recipies_users = await client.request(
      readItems('Recipies_Users', {
        fields: ['*']
      })
    )
    this.users = await client.request(
      readItems('Users', {
        fields: ['id', 'username', 'sub']
      })
    )
    this.like_amount = this.item.likes.length
    this.original_like_amount = this.item.likes.length

    this.isLiked = this.checkIfIsLiked(this.item) ? 'text-rose-600' : 'text-gray-400'
    this.buffer = this.checkIfIsLiked(this.item)
  },
  unmounted() {
    if (this.changed && this.original_like_amount !== this.like_amount) {
      if (this.buffer) {
        client.request(
          createItem('Recipies_Users', {
            Recipies_id: this.item.id,
            Users_id: this.currentUserId()
          })
        )
      } else {
        let likeId = -1
        this.item.likes.forEach((element) => {
          this.recipies_users.forEach((element2) => {
            if (element == element2.id) {
              if (element2.Users_id == this.currentUserId()) {
                likeId = element
              }
            }
          })
        })
        client.request(deleteItem('Recipies_Users', likeId))
      }
    }
  },
  setup() {
    const { user, isAuthenticated } = useAuth0()
    return { isAuthenticated, user }
  },
  props: {
    item: Object
  },
  methods: {
    showRecipe(recipeId) {
      this.$router.push({ name: 'recipe', params: { id: recipeId } })
    },
    checkIfIsLiked(item) {
      let id = this.currentUserId()
      let isLiked = false
      item.likes.forEach((element) => {
        this.recipies_users.forEach((element2) => {
          if (element == element2.id) {
            if (element2.Users_id == id) {
              isLiked = true
            }
          }
        })
      })
      return isLiked
    },
    currentUserId() {
      if (!this.isAuthenticated) return -1
      let id = -1
      this.users.forEach((element) => {
        if (element.sub == this.user.sub) id = element.id
      })
      if (id < 0) return -1
      else return id
    },
    async handleLike() {
      if (!this.isAuthenticated) return
      let isLiked = this.buffer
      // is not Liked => Like
      if (!isLiked) {
        this.like_amount += 1
        this.isLiked = 'text-rose-600 '
      }
      // is Liked => Dislike
      else {
        this.like_amount -= 1
        this.isLiked = 'text-gray-400'
      }
      this.buffer = !this.buffer
      this.changed = true
    }
  }
}
</script>

<template>
  <div
    class="w-[280px] z-10 rounded-t-lg p-20 bg-cover h-80 text-right hover:scale-105 transition cursor-pointer"
    :style="{
      'background-image': 'url(' + config.directus_hostname + 'assets/' + item.Image + ')'
    }"
    @click="showRecipe(item.id)"
  ></div>
  <div class="z-20 flex justify-between w-[280px] mt-3">
    <div class="z-20 flex justfiy-center">
      <i
        @click="handleLike"
        :class="isLiked"
        style="
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -o-user-select: none;
        "
        unselectable="on"
        onselectstart="return false;"
        onmousedown="return false;"
        class="fas fa-heart fa-3x transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none rounded p-2"
        >&nbsp;{{ like_amount }}</i
      >
    </div>
    <span class="rounded"
      >{{ item.Name }}<br /><i
        >Author: {{ users.filter((element) => element.id == item.created_by)[0]?.username }}</i
      ></span
    >
  </div>
</template>
