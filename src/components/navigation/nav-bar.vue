<template>
  <div class="flex flex-row justify-center items-center sm:gap-10">
    <template v-if="!isAuthenticated">
      <SignupButton />
      <LoginButton />
    </template>
    <template v-if="isAuthenticated">
      <LogoutButton />
      <router-link
        to="/add-recipe"
        class="before:ease relative h-16 w-40 overflow-hidden border border-green-500 bg-green-500 text-white shadow-xl transition-all before:absolute before:right-0 before:top-0 before:h-16 before:w-6 before:translate-x-16 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40 text-center rounded flex items-center"
        ><span class="text-center w-full">Add Recipe</span></router-link
      >
      <img alt="profilepic" :src="user.picture" class="rounded-full min-w-16 min-h-16 w-16 h-16" />
    </template>
  </div>
</template>

<script setup>
import LoginButton from '../buttons/login-button.vue'
import LogoutButton from '../buttons/logout-button.vue'
import SignupButton from '../buttons/singup-button.vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { user, isAuthenticated } = useAuth0()
</script>
