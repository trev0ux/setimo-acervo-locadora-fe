import { mount } from "@vue/test-utils";
import { vi, it, expect, describe } from "vitest";
import MovieItem from "../../../app/components/Organisms/MovieItem.vue";

describe("MovieItem", () => {
  it("can mount the component", async () => {
    const component = await mount(MovieItem);
    expect(component.vm).toBeTruthy();
  });

  it("should show warning when movie prop is missing", async () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    mount(MovieItem, {});

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should handle different movie data", () => {
    const differentMovie = {
      title: "Superman",
      year: "1978",
      poster: "N/A",
    };

    const wrapper = mount(MovieItem, {
      props: differentMovie,
    });
    const img = wrapper.find('[data-testid="movie-poster"]');

    expect(wrapper.text()).toContain("Superman");
    expect(wrapper.text()).toContain("1978");
    expect(img.attributes("src")).toBe("N/A");
    expect(img.attributes("alt")).toBe("Superman");
  });
});
