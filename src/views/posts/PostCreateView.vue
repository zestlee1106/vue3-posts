<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <post-form
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>
        <button class="btn btn-primary">저장</button>
      </template>
    </post-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/views/posts/PostForm.vue';

const router = useRouter();
const form = ref({
  title: null,
  content: null,
});

const goListPage = () => {
  router.push({
    name: 'PostList',
  });
};

const save = () => {
  try {
    createPost({ ...form.value, createdAt: Date.now() });
    goListPage();
  } catch (e) {
    console.error(e);
  }
};
</script>

<style lang="scss" scoped></style>
