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

// Helper function for filtering logic
const userMatchesFilters = (user: Users[number], filters: Filters): boolean => {
    const searchTermMatch = user.username
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

    const groupMatch =
        filters.group === undefined || user.group === filters.group;

    const roleMatch = filters.role === undefined || user.role === filters.role;

    const hasCompetitionsMatch =
        filters.hasCompetitions === undefined ||
        user.competitions.length > 0 === filters.hasCompetitions;

    return searchTermMatch && groupMatch && roleMatch && hasCompetitionsMatch;
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
        return users.filter((user) => userMatchesFilters(user, filters));
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
