// tests/integration/movieApi.msw.spec.ts
import { describe, it, expect, beforeEach } from "vitest";
import { movieApi } from "../../../app/utils/movieApi";
import { movieMockHelpers } from "../../mocks/movieApi.msw";

// Importa automaticamente o setup do MSW

describe("Movie API with MSW Mock", () => {
  beforeEach(() => {
    // Reset para estado limpo antes de cada teste
    movieMockHelpers.resetMovies();

    // Mock useRuntimeConfig
    global.useRuntimeConfig = () => ({
      public: {
        apiKey: "valid-test-key",
      },
    });
  });

  describe("Successful Requests", () => {
    it("should fetch Batman movies using MSW mock", async () => {
      console.log("🦇 Testando busca por Batman com MSW...");

      const result = await movieApi.searchMovies({ title: "batman" });

      // Verificações
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      // Verificar se contém filmes do Batman
      const batmanMovies = result.filter((movie) =>
        movie.Title.toLowerCase().includes("batman")
      );
      expect(batmanMovies.length).toBeGreaterThan(0);

      // Verificar estrutura dos dados
      const firstMovie = result[0];
      expect(firstMovie).toHaveProperty("Title");
      expect(firstMovie).toHaveProperty("Year");
      expect(firstMovie).toHaveProperty("imdbID");
      expect(firstMovie).toHaveProperty("Poster");

      console.log(`✅ Encontrados ${result.length} filmes do Batman`);
      console.log(`🎬 Primeiro: ${firstMovie.Title} (${firstMovie.Year})`);
    });

    it("should search for specific movie", async () => {
      console.log('🎯 Testando busca específica por "The Dark Knight"...');

      const result = await movieApi.searchMovies({ title: "The Dark Knight" });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);

      // Procurar filme específico
      const darkKnight = result.find(
        (movie) => movie.Title === "The Dark Knight"
      );

      expect(darkKnight).toBeDefined();
      expect(darkKnight?.Year).toBe("2008");
      expect(darkKnight?.imdbID).toBe("tt0468569");

      console.log(
        `✅ Encontrado: ${darkKnight?.Title} - ${darkKnight?.imdbID}`
      );
    });

    it("should handle year filter", async () => {
      console.log("📅 Testando filtro por ano...");

      const result = await movieApi.searchMovies({
        title: "batman",
        year: "2005",
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);

      // Todos os filmes devem ser de 2005
      result.forEach((movie) => {
        expect(movie.Year).toBe("2005");
      });

      // Deve encontrar Batman Begins
      const batmanBegins = result.find(
        (movie) => movie.Title === "Batman Begins"
      );
      expect(batmanBegins).toBeDefined();

      console.log(
        `✅ Filtro por ano funcionando - encontrados ${result.length} filmes de 2005`
      );
    });
  });

  describe("Error Handling", () => {
    it("should handle movie not found", async () => {
      console.log("Testando filme não encontrado...");

      const result = await movieApi.searchMovies({
        title: "nonexistentmovie12345",
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);

      console.log("✅ Tratou filme não encontrado corretamente");
    });

    it("should handle empty search term", async () => {
      console.log("🔍 Testando busca vazia...");

      const result = await movieApi.searchMovies({ title: "" });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);

      console.log("✅ Tratou busca vazia corretamente");
    });

    it("should handle invalid API key", async () => {
      console.log("🔑 Testando API key inválida...");

      // Simular API key inválida
      movieMockHelpers.simulateInvalidApiKey();

      const result = await movieApi.searchMovies({ title: "batman" });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);

      console.log("✅ Tratou API key inválida corretamente");
    });

    it("should handle network errors", async () => {
      console.log("🌐 Testando erro de rede...");

      // Simular erro de rede
      movieMockHelpers.simulateNetworkError();

      const result = await movieApi.searchMovies({ title: "batman" });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);

      console.log("✅ Tratou erro de rede corretamente");
    });
  });
});
