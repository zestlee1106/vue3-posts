<template>
  <div>
    <h2>게시글 상세</h2>
    <hr class="my-4" />
    {{ $route.params }}
    {{ $route.query.searchText }}
    {{ $route.hash }}
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
