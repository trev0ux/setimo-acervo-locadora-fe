import type Customer from "../services/customerService";

const customers = ref<Customer[]>([]);

const addCustomer = (customer: Customer) => {
  customers.value.push(customer);
  saveToStorage();
};

const removeCustomer = (id: number) => {
  customers.value = customers.value.filter((c) => c.id !== id);
  saveToStorage();
};

const saveToStorage = () => {
  localStorage.setItem("customers", JSON.stringify(customers.value));
};

const loadCustomers = () => {
  try {
    const saved = localStorage.getItem("customers");
    if (saved) {
      customers.value = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    customers.value = [];
  }
};

const getCustomerById = (id: string): Customer | null => {
  try {
    const data = localStorage.getItem("customers");
    if (!data) return null;

    const customers: Customer[] = JSON.parse(data);
    return customers.find((customer) => customer.id === id) || null;
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    return null;
  }
};

const updateCustomer = (
  id: string,
  updates: Partial<Customer>
): Customer | null => {
  try {
    const data = localStorage.getItem("customers");
    if (!data) {
      throw new Error("Nenhum cliente encontrado no storage");
    }

    const customers: Customer[] = JSON.parse(data);
    const customerIndex = customers.findIndex((c) => c.id === id);

    if (customerIndex === -1) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    const updatedCustomer: Customer = {
      ...customers[customerIndex],
      ...updates,
      updatedAt: new Date(),
    };

    customers[customerIndex] = updatedCustomer;

    localStorage.setItem("customers", JSON.stringify(customers));

    return updatedCustomer;
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return null;
  }
};

export const useCustomers = () => {
  return {
    customers,
    addCustomer,
    loadCustomers,
    removeCustomer,
    updateCustomer,
    getCustomerById,
  };
};
