import { url } from "@/globals";
import { addToken, getId, getToken } from "./credentials";
import { AllowedEvents, Users } from "../Types/solve";

/**
 * Delete a user by id
 * @param {string} id - Id of user to delete
 * @returns {Promise<{success: boolean, data?: any, response?: Response, message?: string}>}
 */
export async function deleteUserById(id: string): Promise<{
    success: boolean;
    data?: {
        message?: string;
    };
    response?: Response;
    message?: string;
}> {
    if (id === getId()) {
        return {
            success: false,
            message: "Nedopušteno brisanje vlastitog računa.",
        };
    }
    try {
        const userDeletionUrl = new URL(url);
        userDeletionUrl.pathname = `users/${id}`;
        const body = {
            method: "DELETE",
            headers: addToken({}) || {},
        };
        const response = await fetch(userDeletionUrl, body);
        const data = await response.json();

        if (response.ok) {
            return { success: true, data, response };
        }
        return {
            success: false,
            data,
            response,
            message: "Greška prilikom brisanja korisnika.",
        };
    } catch (error) {
        console.error(`Error deleting user: \n${error}`);
        return {
            success: false,
        };
    }
}
/**
 * Assign admin role to a user
 * @param {string} id - Id of user to which the admin role will be assigned
 * @returns {Promise<{success: boolean, data?: any, response?: Response, message?: string}>} Returns a success message if the admin role was assigned successfullys
 */
export async function assignAdminToUser(id: string): Promise<{
    success: boolean;
    data?: {
        message?: string;
    };
    response?: Response;
    message?: string;
}> {
    const body = {
        method: "POST",
        headers: addToken({}) || {},
    };
    try {
        const adminAssignmentUrl = new URL(url);
        adminAssignmentUrl.pathname = `admin/assign/${id}`;
        const response = await fetch(adminAssignmentUrl, body);
        const data = await response.json();
        if (response.ok) {
            return { success: true, data };
        }
        return {
            success: false,
            message: data.message,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
        };
    }
}

export async function addSolve(
    userId: string,
    competitionId: string,
    event: string,
    roundIndex: number,
    solves: number[],
) {
    const solvesUrl = new URL(url);
    solvesUrl.pathname = `solves/add/${userId}`;
    const roundNumber = roundIndex + 1;
    const solveData = {
        round: roundNumber,
        solves: {
            event: event,
            rounds: solves,
        },
        competitionId,
    };

    // Šalje podatke na server
    const response = await fetch(solvesUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: getToken() || "",
        },
        body: JSON.stringify(solveData),
    });

    const data = await response.json();
    return {
        success: response.ok,
        parsed: data,
        response,
        statusCode: response.status,
    };
}
export async function deleteSolve(
    userId: string,
    compId: string,
    eventName: AllowedEvents,
    roundIndex: number,
    solveIndex: number,
) {
    try {
        const solvesUrl = new URL(url);
        solvesUrl.pathname = `solves/delete/${userId}`;
        const roundNumber = +roundIndex + 1;
        const solveNumber = +solveIndex + 1;
        const headers =
            addToken({
                "Content-Type": "application/json",
            }) || {};
        const response = await fetch(solvesUrl, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify({
                round: roundNumber,
                solve: solveNumber,
                event: eventName,
                competitionId: compId,
            }),
        });

        // Handle errors
        const parsed = await response.json();
        return {
            parsed,
            success: response.ok,
            statusCode: response.status,
            response,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}

export async function changePasswordByUsername(
    username: string,
    newPassword: string,
) {
    try {
        const body = {
            username,
            newPassword,
        };
        const request = {
            method: "POST",
            body: JSON.stringify(body),
            headers: addToken({ "Content-Type": "application/json" }) || {},
        };

        const changePasswordUrl = new URL(url);
        changePasswordUrl.pathname = "users/change-password";
        const response = await fetch(changePasswordUrl, request);
        const parsed = await response.json();
        return {
            parsed,
            success: response.ok,
            statusCode: response.status,
            response,
        };
    } catch (error) {
        return {
            error,
            success: false,
        };
    }
}

export async function getUsers(): Promise<
    | { success: false; error: unknown }
    | { parsed: Users; success: boolean; status: number }
> {
    try {
        const usersUrl = new URL(url);
        usersUrl.pathname = "users";
        const data = await fetch(usersUrl, {
            signal: AbortSignal.timeout(5000),
        });
        const parsedJSON = await data.json();
        return {
            parsed: parsedJSON,
            success: data.ok,
            status: data.status,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}

export async function registerUser(
    username: string,
    password: string,
    group: number,
) {
    const registerUrl = new URL(url);
    registerUrl.pathname = "register";
    const headers =
        addToken({
            "Content-Type": "application/json",
        }) || {};
    try {
        const response = await fetch(registerUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ username, password, group }),
            signal: AbortSignal.timeout(5000),
        });
        const data = await response.json();
        return {
            success: response.ok,
            user: data.registeredUser,
            message: data.message,
        } as const;
    } catch (error) {
        console.error("Error:\n", error);
        return {
            success: false,
            user: null,
            message: null,
        } as const;
    }
}
