<template>
  <section>
    <div class="flex justify-between items-center flex-wrap gap-6">
      <div class="max-w-[420px] w-full">
        <MoleculesSearchField @search-term="searchTerm" />
      </div>
      <MoleculesSelectField
        :options="years"
        label="Filtrar por ano"
        placeholder="Selecione um ano"
        @selected-value="filterByYear"
      />
    </div>
    <article v-if="!error" class="flex flex-wrap gap-6 mt-16">
      <OrganismsMovieItem
        v-for="movie in movies"
        :key="movie?.Title"
        :title="movie?.Title"
        :year="movie?.Year"
        :poster="movie?.Poster"
        custom-classes="w-full lg:w-[calc(33.33%_-_16px)]"
      />
    </article>
    <div v-if="loading"><AtomsLoading /></div>
    <div v-if="error" class="text-aux-primary text-center w-full text-2xl">
      {{ error }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  imdbID: string;
}

const term = ref("");
const movies = ref<Movie[] | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const selectedYear = ref<string | number>("");

const startYear = 1990;

const currentYear = new Date().getFullYear();

const endYear = currentYear;

const years = computed(() => {
  const yearsArray = [];
  for (let year = startYear; year <= endYear; year++) {
    yearsArray.push(year);
  }
  return yearsArray;
});

const filterByYear = (year: number) => {
  selectedYear.value = year;
  console.log("Ano recebido:", year);
};

async function fetchMovies(searchTerm: string) {
  if (loading.value) return;

  loading.value = true;
  error.value = null;

  try {
    if (!searchTerm.trim()) {
      movies.value = await movieApi.getMovies();
      return;
    }
    if (selectedYear.value && term.value.trim()) {
      movies.value = await movieApi.searchMovies({
        title: term.value.trim(),
        year: term.value.trim() ? selectedYear.value : "",
      });
      return;
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

watch(
  () => selectedYear.value,
  (newYear) => {
    fetchMovies(newYear);
  }
);
function searchTerm(searchValue: string) {
  term.value = searchValue;
}

onMounted(() => {
  fetchMovies("");
  selectedYear.value = currentYear;
});
</script>

<style></style>
