<template>
  <button
    class="bg-blue-500 text-white px-6 py-2 rounded font-medium mx-1 sm:mx-3 hover:bg-blue-600 transition duration-200 each-in-out"
    @click="handleSignUp"
  >
    Sign Up
  </button>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect } = useAuth0()

const handleSignUp = () => {
  loginWithRedirect({
    appState: {
      target: '/'
    },
    authorizationParams: {
      screen_hint: 'signup'
    }
  })
}
</script>
