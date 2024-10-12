import { url } from "@/globals";
import { CompetitionType } from "../Types/solve";

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
