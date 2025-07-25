<template>
  <header class="flex justify-between container py-6">
    <NuxtLink class="flex gap-3 items-center" to="/listing">
      <NuxtImg
        src="/images/logo.png"
        width="24"
        height="34"
        alt="Sétimo acervo logo"
      />
      <span class="block text-xl text-aux-white font-semibold"
        >Sétimo acervo</span
      >
    </NuxtLink>

    <nav class="flex items-center">
      <ul class="unset flex gap-[80px] fit-content items-center">
        <li>
          <NuxtLink to="/users" class="text-aux-white text-md"
            >Usuários</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/customers" class="text-aux-white text-md"
            >Clientes</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/film-location" class="text-aux-white text-md"
            >Locação</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/" class="text-aux-white text-md">Sair</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup></script>

<style></style>
