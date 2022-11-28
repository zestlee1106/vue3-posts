<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.content }}</p>
    <p class="text-muted">{{ form.createdAt }}</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-aoto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>
    <hr class="my-4" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';
import { ref } from 'vue';

const props = defineProps({
  id: Number,
});

const router = useRouter();

/**
 * ref
 * 장) 객체 할당 가능
 * 단) form.value.title, form.value.content
 * 장) 일관성 유지 가능
 *
 * reactive
 * 장) form.title, form.content
 * 단) 객체 할당 불가능
 */
const form = ref({});

const fetchPost = () => {
  const data = getPostById(props.id);
  form.value = { ...data };
};
fetchPost();
const goListPage = () => {
  router.push({ name: 'PostList' });
};

const goEditPage = () => {
  router.push({ name: 'PostEdit', params: { id: props.id } });
};
</script>

<style lang="scss" scoped></style>
