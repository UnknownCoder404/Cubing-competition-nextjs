import { clsx } from "clsx";
import { getId, isAdmin, Role } from "@/app/utils/credentials";
import dashboardStyles from "@/app/Dashboard/Dashboard.module.css";
import { assignAdminToUser, deleteUserById } from "@/app/utils/users";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { User } from "@/app/Types/solve";

function DeleteUserButton({
    id,
    router,
}: {
    id: string;
    router: AppRouterInstance;
}) {
    return (
        <button
            className={clsx(
                dashboardStyles["user-btn"],
                dashboardStyles["remove-btn"],
            )}
            onClick={async () => {
                if (id === getId()) {
                    return alert("Ne možete izbrisati vlastiti računa.");
                }
                const userDeletion = await deleteUserById({ id });
                if (!userDeletion.success) {
                    return alert(
                        userDeletion.message ||
                            "Greška pri brisanju korisnika.",
                    );
                }
                router.refresh();
            }}
        >
            Izbriši
        </button>
    );
}

function AdminButton({
    role,
    id,
    router,
}: {
    role: Role;
    id: string;
    router: AppRouterInstance;
}) {
    return (
        <button
            className={clsx(dashboardStyles["user-btn"], {
                [dashboardStyles["remove-btn"]]: isAdmin(role),
                [dashboardStyles["add-btn"]]: !isAdmin(role),
            })}
            onClick={async () => {
                const adminAssignment = await assignAdminToUser({ id });
                if (!adminAssignment.success) {
                    return alert(
                        adminAssignment.message ||
                            "Greška pri dodavanju korisnika.",
                    );
                }
                router.refresh();
            }}
        >
            {isAdmin(role) ? "Makni ulogu admina" : "Postavi za admina"}
        </button>
    );
}

function CompButton({
    toggleCompVisibility,
}: {
    toggleCompVisibility: () => void;
}) {
    return (
        <button
            className={clsx(
                dashboardStyles["user-btn"],
                dashboardStyles["comp-btn"],
            )}
            onClick={toggleCompVisibility}
        >
            Natjecanje
        </button>
    );
}

type Props = {
    user: User;
    toggleCompVisibility: () => void;
};

export default function UserButtons({ user, toggleCompVisibility }: Props) {
    const router = useRouter();
    return (
        <div className={dashboardStyles["user-btns"]}>
            <DeleteUserButton id={user._id} router={router} />
            <AdminButton role={user.role} id={user._id} router={router} />
            <CompButton toggleCompVisibility={toggleCompVisibility} />
        </div>
    );
}
