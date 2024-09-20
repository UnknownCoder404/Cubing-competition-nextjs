"use client";

import { User } from "@/app/Dashboard/page";
import { isAdmin, Role } from "@/app/utils/credentials";
import dashboardStyles from "@/app/Dashboard/Dashboard.module.css";
import { deleteUserById } from "@/app/utils/users";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
function DeleteUserButton({
  id,
  router,
}: {
  id: string;
  router: AppRouterInstance;
}) {
  return (
    <button
      className={`${dashboardStyles["user-btn"]} ${dashboardStyles["remove-btn"]}`}
      onClick={async () => {
        const userDeletion = await deleteUserById(id);
        if (!userDeletion.success) {
          alert("Greška pri brisanju korisnika.");
        }

        router.refresh();
      }}
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
  const router = useRouter();

  return (
    <div className={dashboardStyles["user-btns"]}>
      <DeleteUserButton id={user._id} router={router} />
      <AdminButton role={user.role} />
      <CompButton />
    </div>
  );
}
