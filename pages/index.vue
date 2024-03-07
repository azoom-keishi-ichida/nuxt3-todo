<template>
  <ul v-for="todo in data">
    <li>{{ todo.title }}</li>
  </ul>
</template>

<script setup lang="ts">
// ここでtitleをbodyに入れてpostを行う
// zodを使用してバリデーションを行う

const data = ref<any>(null)
const error = ref<any>(null)
const title = ref<string | null>(null)

// ここは設定で数字をもらえるようにする
const id: number = 1

const fetchPosts = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/`)
    if (!response.ok) {
      console.log(response)
      throw new Error('Error while fetching posts')
    }
    data.value = await response.json()
  } catch (err) {
    error.value = err.message
  }
}

onMounted(fetchPosts)
</script>
