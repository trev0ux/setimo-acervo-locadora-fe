import { mount } from "@vue/test-utils";
import { it, expect, describe } from "vitest";
import SearchField from "../../../app/components/Molecules/SearchField.vue";

describe("AppHeader", () => {
  it("can mount the component", async () => {
    const component = await mount(SearchField);
    expect(component.vm).toBeTruthy();
  });

  it("should emit term for search", async () => {
    const wrapper = mount(SearchField);

    const input = wrapper.find("input");

    if (input.exists()) {
      await input.setValue("batman");
      await input.trigger("keyup.enter");

      expect(wrapper.emitted("searchTerm")).toBeTruthy();
    } else {
      throw new Error("Input not found");
    }
  });
});
