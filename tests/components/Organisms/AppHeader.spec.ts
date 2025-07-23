import { mount } from "@vue/test-utils";
import { it, expect, describe } from "vitest";
import AppHeader from "../../../app/components/Organisms/AppHeader.vue";

describe("AppHeader", () => {
  it("can mount the component", async () => {
    const component = await mount(AppHeader);
    expect(component.vm).toBeTruthy();
  });

  it("component should have the defined links", async () => {
    const component = await mount(AppHeader);
    expect(component.html()).toContain("Sétimo acervo");
    expect(component.html()).toContain("Usuários");
    expect(component.html()).toContain("Clientes");
    expect(component.html()).toContain("Locação");
    expect(component.html()).toContain("Sair");
  });
});
