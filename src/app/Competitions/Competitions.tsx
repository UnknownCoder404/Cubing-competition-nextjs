"use client";
import Competition from "./Competition";
type Props = {
  competitions: {
    parsed: any;
    success: true;
    status: number;
  };
};
export default function Competitions(props: Props) {
  const competitions = props.competitions.parsed;
  const competitionNames = Object.keys(props.competitions.parsed);
  return (
    <>
      <h1 className="title">Natjecanja</h1>
      {competitionNames.map((compName, index) => {
        const competition = competitions[compName];
        return <Competition competition={competition} key={index} />;
      })}
    </>
  );
}
