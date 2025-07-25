import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { vi, afterAll, afterEach, beforeAll } from "vitest";

const movies = [
  {
    Title: "Batman Begins",
    Year: "2005",
    imdbID: "tt0372784",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  },
];

export const movieApiHandlers = [
  http.get("http://www.omdbapi.com/", ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("s")?.toLowerCase();
    const year = url.searchParams.get("y");
    const page = url.searchParams.get("page") || "1";
    const apiKey = url.searchParams.get("apikey");

    if (!apiKey) {
      return HttpResponse.json({
        Response: "False",
        Error: "No API key provided.",
      });
    }

    if (apiKey === "invalid-key") {
      return HttpResponse.json({
        Response: "False",
        Error: "Invalid API key!",
      });
    }

    if (!searchTerm || searchTerm.trim() === "") {
      return HttpResponse.json({
        Response: "False",
        Error: "Something went wrong.",
      });
    }

    let filteredMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm)
    );

    if (year) {
      filteredMovies = filteredMovies.filter((movie) => movie.Year === year);
    }

    if (searchTerm.includes("nonexistent") || searchTerm.includes("notfound")) {
      return HttpResponse.json({
        Response: "False",
        Error: "Movie not found!",
      });
    }

    if (searchTerm.includes("networkerror")) {
      return new Response(null, { status: 500 });
    }

    if (searchTerm.includes("timeout")) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            HttpResponse.json({
              Response: "False",
              Error: "Request timeout",
            })
          );
        }, 10000);
      });
    }

    const itemsPerPage = 10;
    const startIndex = (parseInt(page) - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

    if (filteredMovies.length > 0) {
      return HttpResponse.json({
        Search: paginatedMovies,
        totalResults: filteredMovies.length.toString(),
        Response: "True",
      });
    } else {
      return HttpResponse.json({
        Response: "False",
        Error: "Movie not found!",
      });
    }
  }),
];

export const movieMockHelpers = {
  // Simular erro de rede
  simulateNetworkError: () => {
    server.use(
      http.get("http://www.omdbapi.com/", () => {
        return new Response(null, { status: 500 });
      })
    );
  },

  // Simular API key inválida
  simulateInvalidApiKey: () => {
    server.use(
      http.get("http://www.omdbapi.com/", () => {
        return HttpResponse.json({
          Response: "False",
          Error: "Invalid API key!",
        });
      })
    );
  },

  // Simular resposta vazia
  simulateEmptyResponse: () => {
    server.use(
      http.get("http://www.omdbapi.com/", () => {
        return HttpResponse.json({
          Response: "False",
          Error: "Movie not found!",
        });
      })
    );
  },

  // Simular delay na resposta
  simulateSlowResponse: (delay: number = 2000) => {
    server.use(
      http.get("http://www.omdbapi.com/", async ({ request }) => {
        await new Promise((resolve) => setTimeout(resolve, delay));

        const url = new URL(request.url);
        const searchTerm = url.searchParams.get("s")?.toLowerCase();

        const filteredMovies = movies.filter((movie) =>
          movie.Title.toLowerCase().includes(searchTerm || "")
        );

        return HttpResponse.json({
          Search: filteredMovies,
          totalResults: filteredMovies.length.toString(),
          Response: "True",
        });
      })
    );
  },

  // Adicionar filme customizado ao mock
  addCustomMovie: (movie: any) => {
    movies.push(movie);
  },

  resetMovies: () => {
    movies.length = 0;
    movies.push({
      Title: "Batman Begins",
      Year: "2005",
      imdbID: "tt0372784",
      Type: "movie",
      Poster: "https://example.com/batman-begins.jpg",
    });
  },
};

const server = setupServer(...movieApiHandlers);

beforeAll(() => {
  console.log("Iniciando servidor de mock...");
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => {
  console.log("Fechando servidor de mock...");
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

export { server };
