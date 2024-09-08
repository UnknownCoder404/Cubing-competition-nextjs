import { url } from "@/globals";

function getUsername(): string | null {
  const username = localStorage.getItem("username");
  return username;
}
function getRole(): Role | null {
  const role = localStorage.getItem("role") as Role | null;

  return role;
}
function getId(): string | null {
  const id = localStorage.getItem("id");
  return id;
}
function getToken(): string | null {
  const token = localStorage.getItem("token");
  return token;
}
function logOut(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
}
async function tokenValid(): Promise<boolean> {
  // action, if true it will logout user if token is not valid
  const tokenValidUrl = addToken(`${url.toString()}/token`);
  if (!tokenValidUrl) {
    return false;
  }
  const data = await fetch(tokenValidUrl);
  return data.ok;
}
function loggedIn(): boolean {
  return !!getToken() && !!getRole() && !!getId();
}
export type Role = "admin" | "user";
function isUser(role: Role): boolean {
  return role.toUpperCase() === "USER";
}
function isAdmin(role: Role): boolean {
  return role.toUpperCase() === "ADMIN";
}

function addToken<T extends string | object | URL | null>(
  data: T,
): T | string | null {
  const token = getToken();
  if (!token) {
    return null;
  }

  if (!data) {
    return token; // Return the token if data is null
  }
  if (typeof data === "string") {
    return `${data}${data.includes("?") ? "&" : "?"}token=${token}`;
  }

  if (typeof data === "object") {
    if (data instanceof URL) {
      data.searchParams.append("token", token);
      return data;
    }

    return { ...data, Authorization: token }; // Return a new object with token added
  }

  return null;
}

export {
  getUsername,
  getRole,
  getId,
  getToken,
  logOut,
  tokenValid,
  loggedIn,
  isUser,
  isAdmin,
  addToken,
};
