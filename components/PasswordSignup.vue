<template>
  <div class="sign-up">
    <input
      v-model="email"
      placeholder="email"
      type="email"
    >
    <input
      v-model="password"
      placeholder="password at least 6 characters long"
      type="password"
    >
    <button @click="signUp">
      Sign Up
    </button>
  </div>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {AuthError} from "@supabase/supabase-js";

const email = ref<string>('')
const password = ref<string>('')

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

<style lang="scss" scoped>
.sign-up {
  margin-top: 8px;
  button {
    @include button(4px, 8px);
  }
  input {
    border: 2px solid rgba($white, 0.5);
    width: 100%;
    line-height: 24px;
    font-size: 1.2rem;
    padding: 4px 8px;
    outline: none;
    color: $white;
    caret-color: $white;
    margin-bottom: 8px;
  }
}

</style>