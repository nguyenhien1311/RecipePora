<template>
  <div class="tw-w-full tw-h-full">
    <q-img
      :src="recipe.image"
      width="350px"
      height="250px"
      class="tw-rounded-md tw-cursor-help"
      @click="goToDetail()"
    >
      <div class="absolute-bottom text-subtitle1 text-center">
        {{ recipe.name }}
      </div>
    </q-img>
  </div>
</template>
<script setup>
const props = defineProps(['recipe']);
const { recipe } = props;

const goToDetail = () => {
  console.log(recipe);
};
</script>
