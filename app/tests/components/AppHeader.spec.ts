import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AppHeader from "../../components/AppHeader.vue";

describe("AppHeader", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(AppHeader);
    expect(wrapper.text()).toContain("Sétimo acervo");
  });
});
