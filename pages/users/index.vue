<template>
  <div>
    <h2>ユーザー登録</h2>
    <form class="user-form" @submit.prevent="submitUser">
      <h4>Email</h4>
      <input v-model="emailAddress" placeholder="Emailを入力" />
      <br />
      <h4>名前</h4>
      <input v-model="name" placeholder="名前を入力" />
      <v-btn type="submit" :disabled="!emailAddress || !name">送信</v-btn>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emailAddress = ref<string | null>(null)
const name = ref<string | null>(null)
const error = ref<any>()
const router = useRouter()

const submitUser = async (): Promise<void> => {
  try {
    const response = await $fetch(`api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.value, email: emailAddress.value }),
    })
    if (!response) {
      throw new Error('ユーザー情報の送信中にエラーが発生しました')
    }
    router.push('/')
  } catch (err: any) {
    error.value = err.message
  }
}
</script>

<style scoped></style>
