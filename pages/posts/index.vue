<template>
  <p>todoを作成してください</p>
  <div v-if="usersData && usersData.length">
    <v-select
      v-model="selectedUser"
      :items="usersData"
      item-value="id"
      item-title="name"
      placeholder="userを選択してください"
    />
  </div>
  <v-text-field v-model="title"> </v-text-field>
  <v-btn @click="postPosts" :disabled="!title || !selectedUser"> Submit </v-btn>
  <v-btn @click="() => navigateTo('/')">一覧画面へ</v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type userDataType = {
  id: number
  name: string
}

const error = ref<any>(null)
const title = ref<string | null>(null)
const usersData = ref<userDataType[] | null>(null)
const selectedUser = ref<number | any>(null)
const router = useRouter()

const postPosts = async (): Promise<void> => {
  if (selectedUser === null) {
    throw new Error('userを選択してください')
  }
  try {
    // ここでtitle.valueを使用し、全体をオブジェクトとして送信
    const response = await fetch(`api/posts/${selectedUser.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title.value }),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    title.value = null
  } catch (err: any) {
    error.value = err.message
  }
}

const fetchUsers = async (): Promise<void> => {
  try {
    const response = await fetch(`/api/users/`)
    if (!response.ok) {
      throw new Error('Error while fetching posts')
    }
    const originalData = await response.json()
    const usersDataArray: userDataType[] = originalData.map((user: userDataType) => ({
      id: user.id,
      name: user.name,
    }))
    usersData.value = usersDataArray
  } catch (err: any) {
    error.value = err.message
  }
}

const navigateTo = (url: string): void => {
  router.push(url)
}

onMounted(fetchUsers)
</script>
