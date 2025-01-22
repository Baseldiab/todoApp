// components home page
import UsersTable from "@/pages/home/components/users-table";
import UserForm from "./components/user-form";

export default function HomePage() {
  return (
    <>
      <UserForm />
      <UsersTable />
    </>
  );
}
