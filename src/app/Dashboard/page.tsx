import { url } from "@/globals";
import Dashboard from "./Dashboard";

async function getUsers() {
  const users = await fetch(`${url}users`);
  return await users.json();
}
export default async function DashboardPage() {
  const users = await getUsers();
  return <Dashboard users={users}></Dashboard>;
}
