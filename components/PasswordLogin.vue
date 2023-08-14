<template>
  <div class="sign-in">
    <input
      v-model="email"
      placeholder="email"
      type="email"
    >
    <input
      v-model="password"
      placeholder="password"
      type="password"
    >
    <button @click="signIn">
      Sign In
    </button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {AuthError} from "@supabase/supabase-js";

const email = ref<string>('')
const password = ref<string>('')

const supabase = useSupabaseClient()

const signIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error
  } catch (error: AuthError) {
    alert(error.error_description || error.message)
  }
}
</script>

<style lang="scss" scoped>
.sign-in {
  margin-top: 8px;
  button {
    @include button(4px, 8px);
  }
  input {
    border: 2px solid rgba($yellow, 0.5);
    width: 100%;
    line-height: 24px;
    font-size: 1.2rem;
    padding: 4px 8px;
    outline: none;
    color: $yellow;
    caret-color: $yellow;
    margin-bottom: 8px;
  }
}

</style>