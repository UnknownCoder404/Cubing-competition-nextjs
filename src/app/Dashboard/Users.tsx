"use client";
import { useState, useMemo } from "react";
import type { CompetitionType, Role, Users } from "../Types/solve";
import dashboardStyles from "./Dashboard.module.css";
import UserDashboard from "./UserDashboard";

type Props = {
    users: Users;
    competitions: CompetitionType[];
};

type Filters = {
    searchTerm: string;
    group?: 1 | 2;
    role?: Role;
    hasCompetitions?: boolean;
};

export default function Users({ users, competitions }: Props) {
    const defaultFilters = {
        searchTerm: "",
        group: undefined,
        role: undefined,
        hasCompetitions: undefined,
    } as const;
    const [filters, setFilters] = useState<Filters>(defaultFilters);

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            // Search term filter (case-insensitive)
            const matchesSearch = user.username
                .toLowerCase()
                .includes(filters.searchTerm.toLowerCase());
            if (!matchesSearch) return false;

            // Group filter
            if (filters.group !== undefined && user.group !== filters.group) {
                return false;
            }

            // Role filter
            if (filters.role && user.role !== filters.role) {
                return false;
            }

            // Competition participation filter
            if (filters.hasCompetitions !== undefined) {
                const hasComps = user.competitions.length > 0;
                if (hasComps !== filters.hasCompetitions) {
                    return false;
                }
            }

            return true;
        });
    }, [users, filters]);

    // Filter update functions
    const updateSearchTerm = (term: string) => {
        setFilters((prev) => ({ ...prev, searchTerm: term }));
    };

    const updateGroupFilter = (group: 1 | 2 | undefined) => {
        setFilters((prev) => ({ ...prev, group }));
    };

    const updateRoleFilter = (role: Role | undefined) => {
        setFilters((prev) => ({ ...prev, role }));
    };

    const clearFilters = () => {
        setFilters(defaultFilters);
    };

    return (
        <>
            <div className={dashboardStyles["filter"]}>
                <div className={dashboardStyles["filter-header"]}>
                    <h2>Filteri</h2>
                    <button onClick={clearFilters}>Očisti filtere</button>
                </div>
                <input
                    type="text"
                    placeholder="Ime korisnika"
                    value={filters.searchTerm}
                    onChange={(e) => {
                        updateSearchTerm(e.target.value);
                    }}
                />
                <select
                    value={filters.group || "all"}
                    onChange={(e) =>
                        updateGroupFilter(
                            e.target.value === "all"
                                ? undefined
                                : (Number(e.target.value) as 1 | 2),
                        )
                    }
                >
                    <option value="all">Sve grupe</option>
                    <option value="1">Grupa 1</option>
                    <option value="2">Grupa 2</option>
                </select>
                <select
                    value={filters.role || "all"}
                    onChange={(e) =>
                        updateRoleFilter(
                            e.target.value === "all"
                                ? undefined
                                : (e.target.value as Role),
                        )
                    }
                >
                    <option value="all">Sve uloge</option>
                    <option value="user">Korisnik</option>
                    <option value="admin">Administrator</option>
                </select>
            </div>
            <main className={dashboardStyles["users"]}>
                {filteredUsers.map((user) => (
                    <UserDashboard
                        key={user._id}
                        user={user}
                        competitions={competitions}
                    />
                ))}
            </main>
        </>
    );
}
