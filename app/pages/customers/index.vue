<template>
  <section class="container flex justify-end py-20 flex-col gap-10">
    <div class="flex justify-end">
      <NuxtLink
        class="rounded-lg bg-aux-primary py-5 px-11 text-aux-white w-fit-content"
        to="/customers/add-customer"
      >
        Adicionar cliente
      </NuxtLink>
    </div>
    <article
      v-if="customers.length > 0"
      class="flex gap-3 flex-col lg:flex-row lg:flex-wrap"
    >
      <div
        v-for="customer in customers"
        :key="customer.id"
        class="bg-aux-light-black rounded-xl p-4 relative flex justify-between w-full lg:w-[calc(33.33%_-_16px)]"
      >
        <div class="flex flex-col gap-4">
          <h3 class="text-aux-white font-bold text-2xl">
            {{ customer?.name }}
          </h3>
          <p class="text-aux-white">{{ customer?.cpf }}</p>
        </div>
        <div class="flex gap-3">
          <button
            type="button"
            aria-label="Remover cliente"
            @click="editCustomer(customer?.id)"
          >
            <EditIcon />
          </button>
          <button
            type="button"
            aria-label="Editar cliente"
            @click="removeCustomer(customer?.id)"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </article>
    <div
      v-if="customers.length === 0"
      class="text-aux-white font-semibold mt-5 text-2xl text-center w-full"
    >
      Nenhum cliente cadastrado.
    </div>
  </section>
</template>

<script lang="ts" setup>
import EditIcon from "~/components/icons/EditIcon.vue";
import TrashIcon from "~/components/icons/TrashIcon.vue";
import { useCustomers } from "~/services/customerService";

const { customers, loadCustomers, removeCustomer } = useCustomers();

const editCustomer = (customerId) => {
  navigateTo(`/customers/${customerId}/edit-customer`);
};

onMounted(() => {
  loadCustomers();
});
</script>

<style></style>
