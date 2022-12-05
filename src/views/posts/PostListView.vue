<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <form @submit.prevent="">
      <div class="row g-3">
        <div class="col">
          <input v-model="params.title_like" type="text" class="form-control" />
        </div>
        <div class="col-3">
          <select v-model="params._limit" class="form-select">
            <option value="3">3개씩</option>
            <option value="6">6개씩</option>
            <option value="9">9개씩</option>
          </select>
        </div>
      </div>
    </form>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <post-item
          :title="post.title"
          :content="post.content"
          :created-at="post.createdAt"
          @click="goPage(post.id)"
          @modal="openModal(post)"
        ></post-item>
      </div>
    </div>

    <app-pagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="page => (params._page = page)"
    />

    <teleport to="#modal">
      <post-modal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreatedAt"
      />
    </teleport>

    <template v-if="posts && posts.length">
      <hr class="my-5" />
      <app-card>
        <post-detail-view :id="posts[0].id" />
      </app-card>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';
import AppPagination from '@/components/AppPagination.vue';
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import PostModal from '@/components/posts/PostModal.vue';

const router = useRouter();
const posts = ref([]);
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _limit: 3,
  _page: 1,
  title_like: '',
});
// pagination
const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);

const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers['x-total-count'];
  } catch (e) {
    console.error(e);
  }
};

// fetchPosts();

watchEffect(fetchPosts);

const goPage = id => {
  // router.push(`/posts/${id}`);
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
};

// modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
