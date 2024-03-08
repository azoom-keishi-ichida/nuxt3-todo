<template>
  <div>
    <h2>user登録</h2>
    <form class="form-tag" @submit.prevent="postUser">
      <h4>email</h4>
      <input v-model="email" placeholder="emailを入力" />
      <br />
      <h4>名前を入力</h4>
      <input v-model="userName" placeholder="名前を入力" />
      <v-btn type="submit" :disabled="!email || !userName">送信</v-btn>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref<string | null>(null)
const userName = ref<string | null>(null)
const router = useRouter()

const postUser = async () => {
  try {
    const response = await $fetch(`api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: userName.value, email: email.value }),
    })
    if (!response) {
      throw new Error('Error while fetching posts')
    }
    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped></style>
