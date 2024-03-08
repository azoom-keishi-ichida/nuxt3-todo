<template>
  <v-app>
    <v-container fluid>
      <h2>todo一覧</h2>
      <v-btn @click="() => nextPages('/posts')">Todo作成画面へ</v-btn>
      <v-btn @click="() => nextPages('/users')">User作成画面へ</v-btn>
      <div v-if="usersData && usersData.length">
        <v-select
          v-model="id"
          :items="usersData"
          label="Select User"
          item-title="name"
          item-value="id"
        ></v-select>
      </div>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="4" v-if="id === null">
          <v-alert type="error" dense> userを選択してください </v-alert>
        </v-col>
        <v-col v-else v-for="todo in data.posts" :key="todo.id">
          <v-card class="todo-card">
            <v-card-title class="justify-center">
              {{ todo.title }}
            </v-card-title>
            <div class="deleteBtn">
              <v-btn @click="deleteTodo(todo.id)"> 削除 </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const data = ref<any>(null)
const usersData = ref<any>(null)
const error = ref<any>(null)
const router = useRouter()

// ここはuser選択できるようにする
const id = ref<number | null>(null)

const fetchPosts = async () => {
  try {
    if (id.value === null) {
      data.value = []
      return data
    }
    const response = await $fetch(`api/users/${id.value}/posts`)
    if (!response) {
      throw new Error('Error while fetching posts')
    }
    data.value = response
  } catch (err) {
    error.value = err.message
  }
}

const fetchUsers = async () => {
  try {
    const response = await fetch(`api/users/`)
    if (!response.ok) {
      throw new Error('Error while fetching posts')
    }
    usersData.value = await response.json()
  } catch (err) {
    error.value = err.message
  }
}

const deleteTodo = async (id: number) => {
  try {
    const response = await $fetch(`api/posts/${id}`, {
      method: 'DELETE',
    })
    if (!response) {
      throw new Error('Error while fetching posts')
    }
    fetchPosts()
  } catch (err) {
    error.value = err.message
  }
}

const nextPages = (url: string) => {
  router.push(url)
}

watch(id, async () => {
  console.log('ssss')
  fetchPosts()
})

onMounted(async () => {
  await Promise.all([fetchPosts(), fetchUsers()])
})
</script>

<style scoped>
.card {
  word-wrap: break-word;
}

.todo-card {
  background-color: cyan;
}
</style>
