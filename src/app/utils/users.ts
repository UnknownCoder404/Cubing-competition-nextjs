import { url } from "@/globals";
import { addToken, getId, getToken } from "./credentials";
import { AllowedEvents } from "../Types/solve";

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
    const body = {
      method: "DELETE",
      headers: addToken({}) || {},
    };
    const response = await fetch(`${url}users/${id}`, body);
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
    const response = await fetch(`${url}admin/assign/${id}`, body);
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
  const response = await fetch(`${url}solves/add/${userId}`, {
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
    const roundNumber = +roundIndex + 1;
    const solveNumber = +solveIndex + 1;

    const response = await fetch(`${url}solves/delete/${userId}`, {
      method: "DELETE",
      headers: addToken({}) || {},
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
