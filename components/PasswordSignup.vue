<template>
  <input
    v-model="email"
    type="email"
  >
  <input
    v-model="password"
    type="password"
  >
  <button @click="signUp">
    Sign Up
  </button>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {AuthError} from "@supabase/supabase-js";

const email = ref('petttr1@gmail.com')
const password = ref('pass123')

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const signUp = async () => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error
  } catch (error: AuthError) {
    alert(error.error_description || error.message)
  }
}

watchEffect(() => {
  if (user.value) {
    navigateTo('/confirm')
  }
})

</script>