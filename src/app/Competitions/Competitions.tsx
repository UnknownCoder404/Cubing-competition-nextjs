"use server";
import Competition from "./Competition";
type Props = {
  competitions: {
    parsed: any;
    success: true;
    status: number;
  };
};
export default async function Competitions(props: Props) {
  const competitions = props.competitions.parsed;
  const competitionNames = Object.keys(props.competitions.parsed);
  return (
    <>
      <h1 className="title">Natjecanja</h1>
      {competitionNames.map((compName, index) => {
        const competition = competitions[compName];
        return (
          <Competition
            competitionName={compName}
            competition={competition}
            key={index}
          />
        );
      })}
    </>
  );
}
