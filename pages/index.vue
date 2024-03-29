<template>
  <v-app>
    <v-container fluid>
      <h2>ToDo一覧</h2>
      <v-btn @click="() => navigateTo('/posts')">ToDo作成画面へ</v-btn>
      <v-btn @click="() => navigateTo('/users')">ユーザー作成画面へ</v-btn>
      <div v-if="usersData && usersData.length">
        <v-select
          v-model="selectedUserId"
          :items="usersData"
          label="ユーザーを選択"
          item-title="name"
          item-value="id"
        ></v-select>
      </div>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="4" v-if="selectedUserId === null">
          <v-alert type="error" dense>ユーザーを選択してください</v-alert>
        </v-col>
        <v-col v-else v-for="todo in data?.posts" :key="todo.id">
          <v-card class="todo-card">
            <v-card-title class="justify-center">
              {{ todo.title }}
            </v-card-title>
            <div class="deleteBtn">
              <v-btn @click="deleteTodo(todo.id)">削除</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

type userType = {
  id: number
  email: string
  name: string
  role: string
}

type Post = {
  id: number
  createdAt: string
  updatedAt: string
  published: boolean
  title: string
  views: number
  likes: number
  authorId: number
}

type UserDataType = {
  id: number
  email: string
  name: string
  role: string
  posts: Post[]
}

const data = ref<UserDataType | null>(null)
const usersData = ref<userType[] | null>(null)
const error = ref<any>(null)
const router = useRouter()

const selectedUserId = ref<number | null>(null)

const fetchPosts = async (): Promise<void> => {
  try {
    if (selectedUserId.value === null) {
      data.value = null
      return
    }
    const response: UserDataType = await $fetch(`api/users/${selectedUserId.value}/posts`)
    if (!response) {
      throw new Error('エラーが発生しました')
    }
    data.value = response
  } catch (err: any) {
    error.value = err.message
  }
}

const fetchUsers = async (): Promise<void> => {
  try {
    const response = await fetch(`api/users/`)
    if (!response.ok) {
      throw new Error('ユーザー情報の取得中にエラーが発生しました')
    }
    usersData.value = await response.json()
  } catch (err: any) {
    error.value = err.message
  }
}

const deleteTodo = async (id: number): Promise<void> => {
  try {
    const response = await $fetch(`api/posts/${id}`, {
      method: 'DELETE',
    })
    if (!response) {
      throw new Error('Todoの削除中にエラーが発生しました')
    }
    fetchPosts()
  } catch (err: any) {
    error.value = err.message
  }
}

const navigateTo = (url: string): void => {
  router.push(url)
}

watch(selectedUserId, async (): Promise<void> => {
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
