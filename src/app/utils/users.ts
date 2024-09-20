import { url } from "@/globals";
import { addToken, getId } from "./credentials";

/**
 * Delete a user by id
 * @param {string} id - Id of user to delete
 * @returns {Promise<{success: boolean, data?: any, response?: Response, message?: string}>}
 */
export async function deleteUserById(
  id: string,
): Promise<{
  success: boolean;
  data?: any;
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
export async function assignUserToAdmin(id: string): Promise<{
  success: boolean;
  data?: any;
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
