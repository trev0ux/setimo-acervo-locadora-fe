<template>
  <section class="container flex justify-end py-20 flex-col gap-10">
    <div class="flex justify-end">
      <NuxtLink
        class="rounded-lg bg-aux-primary py-5 px-11 text-aux-white w-fit-content"
        to="/users/add-user"
      >
        Adicionar usuário
      </NuxtLink>
    </div>
    <article
      v-if="users.length > 0"
      class="flex gap-3 flex-col lg:flex-row lg:flex-wrap"
    >
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-aux-light-black rounded-xl p-4 relative flex justify-between w-full lg:w-[calc(33.33%_-_16px)]"
      >
        <div class="flex flex-col gap-4">
          <h3 class="text-aux-white font-bold text-2xl">
            {{ user?.name }}
          </h3>
          <p class="text-aux-white">{{ user?.document }}</p>
        </div>
        <div class="flex gap-3">
          <button
            type="button"
            aria-label="Remover cliente"
            @click="editUser(user?.id)"
          >
            <EditIcon />
          </button>
          <button
            type="button"
            aria-label="Editar cliente"
            @click="removeUser(user?.id)"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </article>
    <div
      v-if="users.length === 0"
      class="text-aux-white font-semibold mt-5 text-2xl text-center w-full"
    >
      Nenhum usuário cadastrado.
    </div>
  </section>
</template>

<script lang="ts" setup>
import EditIcon from "~/components/icons/EditIcon.vue";
import TrashIcon from "~/components/icons/TrashIcon.vue";
import { useUsers } from "~/services/userService";

const { users, loadUsers, removeUser } = useUsers();

const editUser = (userId) => {
  navigateTo(`/users/${userId}/edit-user`);
};

onMounted(() => {
  loadUsers();
});
</script>

<style></style>
