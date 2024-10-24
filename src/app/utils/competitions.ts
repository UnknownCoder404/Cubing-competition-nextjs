import { url } from "@/globals";
import { CompetitionType } from "../Types/solve";
import { addToken } from "./credentials";

export async function getCompetitions(): Promise<
  | {
      success: false;
      error: unknown;
    }
  | {
      success: true;
      parsed: CompetitionType[];
    }
> {
  try {
    const competitionsUrl = new URL(url);
    competitionsUrl.pathname = "competitions";
    const data = await fetch(competitionsUrl, {
      signal: AbortSignal.timeout(5000),
    });
    const parsedJSON = await data.json();
    return { success: true, parsed: parsedJSON };
  } catch (error: unknown) {
    return {
      success: false,
      error,
    };
  }
}

export async function deleteCompetition(id: string) {
  const deleteComoUrl = new URL(url);
  deleteComoUrl.pathname = `competitions/${id}`;
  const headers =
    addToken({
      "Content-Type": "application/json",
    }) || {};
  const response = await fetch(deleteComoUrl, {
    method: "DELETE",
    headers: headers,
  });
  return {
    status: response.status,
    success: response.ok,
    parsed: await response.json(),
  };
}
