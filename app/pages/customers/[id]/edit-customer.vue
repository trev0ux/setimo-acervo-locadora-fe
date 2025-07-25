<template>
  <section class="container py-20">
    <form
      class="max-w-[520px] mx-auto gap-4 flex flex-col"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-aux-white font-bold text-3xl">Editar cliente</h2>
      <MoleculesInputField
        v-model="form.name"
        label="Nome"
        placeholder="Nome"
        required
      />
      <MoleculesInputField
        v-model="form.surname"
        label="Sobrenome"
        placeholder="Sobrenome"
        required
      />
      <MoleculesInputField
        v-model="form.email"
        label="Email"
        placeholder="Email"
        required
      />
      <MoleculesInputField
        v-model="form.cpf"
        label="CPF"
        placeholder="CPF"
        required
      />
      <MoleculesInputField
        v-model="form.phoneNumber"
        label="Telefone"
        placeholder="Telefone"
        required
      />
      <div>
        <MoleculesInputField
          v-model="form.zipCode"
          label="CEP"
          placeholder="00000-000"
          required
          @blur="fetchAddress"
        />
        <span v-if="loading" class="text-aux-white text-sm">Buscando...</span>
        <span v-if="error" class="text-aux-primary text-sm">{{ error }}</span>
      </div>
      <MoleculesInputField
        v-model="form.street"
        label="Rua"
        placeholder="Rua"
        :disabled="addressIsDisabled"
      />
      <MoleculesInputField
        v-model="form.neighborhood"
        label="Bairro"
        :disabled="addressIsDisabled"
        placeholder="Bairro"
      />
      <MoleculesInputField
        v-model="form.city"
        label="Cidade"
        :disabled="addressIsDisabled"
        placeholder="Cidade"
      />
      <MoleculesSelectField
        v-model="form.state"
        label="UF"
        :disabled="addressIsDisabled"
        placeholder="UF"
        :options="BRAZILIAN_UFS"
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
import { BRAZILIAN_UFS } from "~/constants/states";
import { useCustomers } from "~/services/customerService";
import { generateId } from "~/utils/id";

const { customers, updateCustomer, getCustomerById } = useCustomers();
const route = useRoute();

export interface FormData {
  id: string;
  name: string;
  email: string;
  surname: string;
  cpf: number | null;
  phoneNumber: number | null;
  zipCode: number | null;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

const form = reactive<FormData>({
  id: generateId(),
  name: "",
  email: "",
  surname: "",
  cpf: null,
  phoneNumber: null,
  zipCode: null,
  street: "",
  neighborhood: "",
  city: "",
  state: "",
});

const loading = ref(false);
const error = ref("");
const addressIsDisabled = ref(true);
const customer = ref(null);

const customerId = route.params.id as string;

const loadCustomer = () => {
  customer.value = getCustomerById(customerId);

  if (customer.value) {
    Object.assign(form, {
      name: customer.value.name || "",
      surname: customer.value.surname || "",
      email: customer.value.email || "",
      cpf: customer.value.cpf || "",
      phoneNumber: customer.value.phoneNumber || "",
      zipCode: customer.value.zipCode || "",
      street: customer.value.street || "",
      city: customer.value.city || "",
      state: customer.value.state || "",
      neighborhood: customer.value.neighborhood || "",
    });
  }

  loading.value = false;
};

onMounted(() => {
  loadCustomer();
});

const fetchAddress = async () => {
  const zipCode = form.zipCode.replace(/\D/g, "");

  if (zipCode.length !== 8) return;

  loading.value = true;
  error.value = "";

  try {
    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json`);
    const data = await response.json();

    if (data.erro) {
      addressIsDisabled.value = false;
      error.value = "CEP não encontrado";
      return;
    }

    form.street = data.logradouro || "";
    form.neighborhood = data.bairro || "";
    form.city = data.localidade || "";
    form.state = data.uf || "";
    addressIsDisabled.value = false;
  } catch {
    error.value = "Erro ao obter CEP";
  } finally {
    loading.value = false;
  }
};

const handleSubmit = () => {
  const updatedData = {
    ...form,
    updatedAt: new Date(),
  };
  const result = updateCustomer(customerId, updatedData);
  navigateTo("/customers");
};
</script>

<style></style>
