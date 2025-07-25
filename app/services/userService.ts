import type User from "../services/customerService";

const users = ref<User[]>([]);

const addUser = (customer: User) => {
  users.value.push(customer);
  saveToStorage();
};

const removeUser = (id: number) => {
  users.value = users.value.filter((c) => c.id !== id);
  saveToStorage();
};

const saveToStorage = () => {
  localStorage.setItem("users", JSON.stringify(users.value));
};

const loadUsers = () => {
  try {
    const saved = localStorage.getItem("users");
    if (saved) {
      users.value = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    users.value = [];
  }
};

const getUserById = (id: string): User | null => {
  try {
    const data = localStorage.getItem("users");
    if (!data) return null;

    const users: User[] = JSON.parse(data);
    return users.find((customer) => customer.id === id) || null;
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    return null;
  }
};

const updateUser = (id: string, updates: Partial<User>): User | null => {
  try {
    const data = localStorage.getItem("users");
    if (!data) {
      throw new Error("Nenhum cliente encontrado no storage");
    }

    const users: User[] = JSON.parse(data);
    const userIndex = users.findIndex((c) => c.id === id);

    if (userIndex === -1) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    const updatedUser: User = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date(),
    };

    users[userIndex] = updatedUser;

    localStorage.setItem("users", JSON.stringify(users));

    return updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return null;
  }
};

export const useUsers = () => {
  return {
    users,
    addUser,
    loadUsers,
    removeUser,
    updateUser,
    getUserById,
  };
};
