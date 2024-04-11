<template>
  <div class="flex flex-row justify-center items-center gap-10">
    <template v-if="!isAuthenticated">
      <SignupButton />
      <LoginButton />
    </template>
    <template v-if="isAuthenticated">
      <router-link to="/add-recipe">Add Recipe</router-link>
      <LogoutButton />
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
