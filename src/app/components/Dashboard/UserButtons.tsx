"use client";

import { User } from "@/app/Dashboard/page";
import { isAdmin, Role } from "@/app/utils/credentials";
import dashboardStyles from "@/app/Dashboard/Dashboard.module.css";

function DeleteUserButton() {
  return (
    <button
      className={`${dashboardStyles["user-btn"]} ${dashboardStyles["remove-btn"]}`}
    >
      Izbriši
    </button>
  );
}
function AdminButton({ role }: { role: Role }) {
  return (
    <button
      className={`${dashboardStyles["user-btn"]} ${
        isAdmin(role)
          ? dashboardStyles["remove-btn"]
          : dashboardStyles["add-btn"]
      }`}
    >
      {isAdmin(role) ? "Makni ulogu admina" : "Postavi za admina"}
    </button>
  );
}
function CompButton() {
  return (
    <button
      className={`${dashboardStyles["user-btn"]} ${dashboardStyles["comp-btn"]}`}
    >
      Natjecanje
    </button>
  );
}
export default function UserButtons({ user }: { user: User }) {
  return (
    <div className={dashboardStyles["user-btns"]}>
      <DeleteUserButton />
      <AdminButton role={user.role} />
      <CompButton />
    </div>
  );
}
