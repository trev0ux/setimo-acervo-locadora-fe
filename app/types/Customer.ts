export default interface Customer {
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
