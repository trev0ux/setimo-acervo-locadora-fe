interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  imdbID: string;
}

interface OMDBResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

interface MovieParams {
  page?: number;
  year?: string;
  title?: string;
}

export const movieApi = {
  async getMovies(params: MovieParams = {}): Promise<Movie[]> {
    const config = useRuntimeConfig();
    const url = `http://www.omdbapi.com/?apikey=${config.public.apiKey}`;
    console.log("poxa mana", params);

    try {
      const data = await $fetch<OMDBResponse>(url, {
        query: {
          s: params.title || "filme",
          page: params.page || 1,
          y: params.year,
          type: "movie",
        },
      });

      if (data.Response === "False") {
        throw new Error(data.Error || "Nenhum filme encontrado");
      }

      return data.Search || [];
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      return [];
    }
  },

  async searchMovies(params: MovieParams = {}): Promise<Movie[]> {
    const config = useRuntimeConfig();
    const url = `http://www.omdbapi.com/?apikey=${config.public.apiKey}`;
    console.log("poxa mana", params);

    try {
      const data = await $fetch<OMDBResponse>(url, {
        query: {
          s: encodeURI(params.title),
          type: "movie",
          page: params.page || 1,
        },
        server: false,
      });

      if (data.Response === "False") {
        throw new Error(data.Error || "Nenhum filme encontrado");
      }

      console.log(data);

      return data.Search || [];
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      return [];
    }
  },
};
