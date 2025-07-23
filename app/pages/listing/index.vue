<template>
  <section class="container py-8">
    <h2 class="text-aux-white font-bold text-3xl mb-10">
      Olá, Carlos
      <em class="font-light block">Aproveite nossos filmes</em>
    </h2>
    <div class="flex justify-between items-center flex-wrap gap-6">
      <div class="max-w-[420px] w-full">
        <ElementsSearchField @search-term="searchTerm" />
      </div>
      <ElementsFilter />
    </div>
    <article class="flex flex-wrap gap-6 mt-16">
      <MovieItem
        v-for="(movie, index) in movies"
        :key="movie?.Title"
        :title="movie?.Title"
        :year="movie?.Year"
        :poster="movie?.Poster"
        custom-classes="w-full lg:w-[calc(33.33%_-_16px)]"
      />
      <div v-if="loading">Loading...</div>
      <div v-if="error">Errou</div>
    </article>
  </section>
</template>

<script setup lang="ts">
const term = ref("");
const movies = ref([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchMovies(searchTerm: string) {
  if (loading.value) return;

  loading.value = true;
  error.value = null;

  try {
    if (searchTerm.trim()) {
      movies.value = await movieApi.searchMovies({ title: searchTerm });
    } else {
      movies.value = await movieApi.getMovies();
    }
  } catch (err) {
    error.value = "Erro ao buscar filmes";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

watch(
  () => term.value,
  (newTerm) => {
    fetchMovies(newTerm);
  }
);

function searchTerm(searchValue: string) {
  term.value = searchValue;
}

onMounted(() => {
  fetchMovies("");
});
</script>

<style></style>
