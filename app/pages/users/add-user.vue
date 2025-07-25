<template>
  <section class="container py-20">
    <form
      class="max-w-[520px] mx-auto gap-4 flex flex-col"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-aux-white font-bold text-3xl">Adicionar usuário</h2>
      <MoleculesInputField
        v-model="form.name"
        label="Nome"
        placeholder="Nome"
        required
      />
      <MoleculesInputField
        v-model="form.document"
        label="CPF"
        placeholder="CPF"
        required
      />
      <MoleculesInputField
        v-model="form.password"
        label="Senha"
        type="password"
        placeholder="Senha"
        required
      />
      <MoleculesInputField
        v-model="form.confirmPassword"
        type="password"
        label="Confirmar Senha"
        placeholder="Confirmar Senha"
        required
      />
      <MoleculesSelectField
        v-model="form.status"
        label="Status"
        placeholder="Escolha um status"
        :options="statusArr"
      />
      <div class="flex justify-end mt-4">
        <button
          class="rounded-lg bg-aux-primary py-5 px-11 text-aux-white w-fit-content disabled:bg-aux"
          type="submit"
        >
          Adicionar cliente
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { BRAZILIAN_UFS } from "../../constants/states";
import { useUsers } from "~/services/userService";
import { generateId } from "~/utils/id";

const { addUser } = useUsers();

export interface FormData {
  id: string;
  name: string;
  password: string;
  confirmPassword: string;
  document: number | null;
  status: string;
}

const form = reactive<FormData>({
  id: generateId(),
  name: "",
  document: null,
  status: "",
  confirmPassword: "",
  password: "",
});

const loading = ref(false);
const error = ref("");
const statusArr = ref(["Ativo", "Inativo"]);

const handleSubmit = () => {
  addUser(form);
  navigateTo("/users");
};
</script>

<style></style>
