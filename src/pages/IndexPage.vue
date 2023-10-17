<template>
  <div class="tw-flex tw-gap-5 tw-mx-4">
    <div class="tw-w-fit">
      <div class="tw-h-full tw-rounded-md">
        <fieldset
          class="tw-border tw-border-solid tw-border-gray-300 tw-p-5 tw-m-2"
        >
          <legend class="tw-text-center">Search Recipe</legend>
          <div class="tw-w-[400px] tw-flex tw-flex-col tw-gap-4">
            <div class="tw-flex tw-flex-row tw-items-center tw-justify-between">
              <div class="tw-basis-2/3">
                <q-input v-model="searchCondition.keyword" dense outlined>
                  <template v-if="searchCondition.keyword" v-slot:append>
                    <q-icon
                      name="cancel"
                      @click.stop.prevent="searchCondition.keyword = null"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
              </div>
              <div>
                <q-btn
                  push
                  color="deep-orange"
                  label="Search"
                  class="tw-h-[40px] tw-w-[100px]"
                  @click="loadData()"
                />
              </div>
            </div>
            <q-toggle
              v-model="searchCondition.usingTag"
              checked-icon="check"
              color="green"
              label="Using tags filter"
              unchecked-icon="clear"
              size="50px"
              dense
            />
            <q-slide-transition
              :duration="200"
              @show="clearTag"
              @hide="clearTag"
            >
              <div v-if="searchCondition.usingTag">
                <div class="tw-flex tw-flex-wrap tw-gap-2">
                  <div
                    class="tw-rounded-full tw-bg-gray-300 tw-w-fit tw-px-[10px] tw-cursor-default"
                    v-for="tag in listTag"
                    :key="tag"
                  >
                    {{ tag.name }}
                    <q-icon
                      name="close"
                      @click="addTag(tag)"
                      class="tw-cursor-pointer"
                    />
                  </div>
                </div>
                <div class="tw-mt-5" v-for="f in ingredientFilter" :key="f">
                  <div class="tw-text-lg tw-font-semibold">{{ f.label }}</div>
                  <q-separator />
                  <div class="tw-flex tw-flex-wrap tw-gap-3 tw-mt-3">
                    <div
                      v-for="i in f.ingredients"
                      :key="i"
                      class="tw-underline tw-cursor-pointer"
                      @click="addTag(i)"
                    >
                      {{ i.name }}
                    </div>
                  </div>
                </div>
              </div>
            </q-slide-transition>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="tw-w-full tw-h-fit">
      <div class="tw-mb-10">
        <fieldset
          class="tw-border tw-border-solid tw-border-gray-300 tw-p-5 tw-m-2"
        >
          <legend class="tw-text-center">LIST RECIPE</legend>
          <div class="tw-grid tw-grid-cols-4 tw-gap-4 tw-text-center">
            <recipe-book
              v-for="recipe in data"
              :key="recipe"
              :recipe="recipe"
            />
          </div>
          <div class="q-pa-md flex flex-center">
            <q-pagination
              v-model="searchCondition.currentpage"
              :max="searchCondition.totalPages"
              :max-pages="6"
              direction-links
              boundary-links
              color="deep-orange"
              icon-first="skip_previous"
              icon-last="skip_next"
              icon-prev="fast_rewind"
              icon-next="fast_forward"
              @update:model-value="loadData"
            />
          </div>
        </fieldset>
      </div>
      <div class="tw-border-2 tw-border-gray-300 tw-m-2 tw-p-5">
        <div class="tw-text-center tw-mb-6 tw-text-lg tw-font-bold">
          Random Recipe
        </div>
        <div class="tw-flex tw-text-center">
          <recipe-book
            v-for="recipe in randomRecipe"
            :key="recipe"
            :recipe="recipe"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RecipeBook from 'components/RecipeBook.vue';
import RecipeService from '../shared/services/recipe.service.js';

const searchCondition = ref({
  keyword: '',
  usingTag: false,
  tags: [],
  currentpage: 1,
  totalPages: 10,
});

const listTag = ref([]);

const ingredientFilter = [
  {
    label: 'Meat',
    ingredients: [
      { id: 'AAC122', name: 'Chicken Breast' },
      { id: 'BAC132', name: 'Chicken Leg' },
      { id: 'DRS432', name: 'Chicken Wing' },
      { id: 'DAF112', name: 'Salmon Fillet' },
      { id: 'ERR404', name: 'Shark Fin' },
      { id: 'ERR401', name: 'Pork Belly' },
    ],
  },
  {
    label: 'Vetable',
    ingredients: [
      { id: 'VET001', name: 'Green Brocoli' },
      { id: 'VET002', name: 'Morning Glory' },
      { id: 'VET003', name: 'Red Bird Eye Chilli' },
      { id: 'VET004', name: 'Green Bird Eye Chilli' },
      { id: 'VET005', name: 'Red chilli peper' },
      { id: 'VET006', name: 'Green chilli peper' },
      { id: 'VET007', name: 'Potato' },
      { id: 'VET008', name: 'Tomato' },
      { id: 'VET009', name: 'White Brocoli' },
      { id: 'VET010', name: 'Spinach' },
    ],
  },
  {
    label: 'Spice',
    ingredients: [
      { id: 'SPI001', name: 'Salt' },
      { id: 'SPI002', name: 'Peper' },
      { id: 'SPI003', name: 'Shrimp Paste' },
      { id: 'SPI004', name: 'Origano' },
      { id: 'SPI005', name: 'Olive Oil' },
    ],
  },
];

const data = ref([
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
]);

const randomRecipe = ref([
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
  {
    id: '123ABC',
    name: 'Roast Chicken Breast',
    image: '/images/roastChickenBreast.png',
  },
]);

const addTag = (ingredient) => {
  const ingredientIndex = listTag.value.indexOf(ingredient);
  if (ingredientIndex === -1) {
    listTag.value.push(ingredient);
  } else {
    listTag.value.splice(ingredientIndex, 1);
  }
};

const clearTag = () => {
  listTag.value = [];
  searchCondition.value.tags = [];
};

const loadData = async () => {
  if (listTag.value.length > 0) {
    listTag.value.forEach((element) => searchCondition.value.tags.push(element.id));
  }
  const payload = await RecipeService.getAll();
  console.log(payload);
};

onMounted(async () => {
  await loadData();
});
</script>
