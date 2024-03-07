<template>
  <p>todoを作成するところ</p>
</template>

<script setup lang="ts">
// ここでtitleをbodyに入れてpostを行う
// zodを使用してバリデーションを行う

const data = ref<any>(null)
const error = ref<any>(null)
const title = ref<string | null>(null)

// ここはパスからもらえるようにする
const id: number = 1

const fetchPosts = async () => {
  try {
    const response = await fetch(`api/posts/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //
      body: JSON.stringify(title),
    })
    if (!response.ok) {
      throw new Error('Error while fetching posts')
    }
    data.value = await response.json()
  } catch (err) {
    error.value = err.message
  }
}
</script>
