import { Metadata } from "next";
import rulesStyles from "./Rules.module.css";
import SmoothAnchor from "../components/Common/SmoothAnchor";

export const metadata: Metadata = {
    title: "Pravila - Cro Cube Comp",
    description:
        "Pravila za Cro Cube Comp natjecanja koja prate WCA pravilnik.",
    keywords: [
        "Cro Cube Comp",
        "Cro Cube Club",
        "Cro.cube.club@gmail.com",
        "Pravila Cro Cube Comp",
        "Pravila",
    ],
};

export default function Rules() {
    return (
        <>
            <nav>
                <ol>
                    <li>
                        <SmoothAnchor href="#pravila1">
                            SLOŽENO STANJE I KAZNE
                        </SmoothAnchor>
                    </li>
                    <li>
                        <SmoothAnchor href="#pravila2">INSPEKCIJA</SmoothAnchor>
                    </li>
                    <li>
                        <SmoothAnchor href="#pravila3">PROSJEK</SmoothAnchor>
                    </li>
                </ol>
            </nav>
            <main>
                <p>
                    Dragi natjecatelji, u nastavku ćete vidjeti pravila
                    natjecanja u Rubikovoj kocki. Ova pravila prate{" "}
                    <a
                        target="_blank"
                        href="https://www.worldcubeassociation.org/regulations/"
                    >
                        WCA pravilnik
                    </a>
                    . Pravila koja ćemo mi sada navesti su skraćena i prevedena.
                </p>

                <a id="pravila1"></a>
                <h2>1. SLOŽENO STANJE I KAZNE:</h2>
                <span className={rulesStyles["bold"]}>
                    U obzir se uzima samo stanje mirovanja (kada se ne miče)
                    Rubikove kocke, nakon što je mjerač vremena zaustavljen.
                </span>
                <p>
                    <span className={rulesStyles["numbering"]}>1a&#41; </span>{" "}
                    Slagalica može biti u bilo kojoj orijentaciji na kraju
                    rješavanja.
                </p>
                <p>
                    <span className={rulesStyles["numbering"]}>1b&#41; </span>
                    Svi dijelovi slagalice moraju biti fizički pričvršćeni na
                    slagalicu i potpuno postavljeni na svoja potrebna mjesta.
                    Zagonetka je riješena kada se svi obojeni dijelovi ponovno
                    sastave i svi dijelovi poravnaju unutar dolje navedenih
                    granica: Za svaka dva susjedna dijela (npr. dva paralelna,
                    susjedna sloja kocke) slagalice koji su neporavnati više od
                    ograničenja (45&#176; za Rubikovu kocku), smatra se da
                    slagalica zahtijeva jedan dodatni potez za rješavanje.
                </p>
                <p className={rulesStyles["indent"]}>
                    <span className={rulesStyles["numbering"]}>1b1&#41; </span>
                    Ako nisu potrebni daljnji potezi da bi se zagonetka dovela u
                    stanje riješene, zagonetka se smatra riješenom bez kazne.
                </p>
                <p className={rulesStyles["indent"]}>
                    <span className={rulesStyles["numbering"]}>1b2&#41; </span>
                    Ako je potreban jedan potez, zagonetka se smatra riješenom
                    uz vremensku kaznu{" "}
                    <span className={rulesStyles["yellow"]}>
                        (+2 sekunde na vrijeme)
                    </span>
                    .
                </p>
                <p className={rulesStyles["indent"]}>
                    <span className={rulesStyles["numbering"]}>1b3&#41; </span>
                    Ako je potrebno više od jednog poteza, zagonetka se smatra
                    neriješenom
                    <span className={rulesStyles["red"]}>
                        {" "}
                        (DNF=Did not finish)
                    </span>
                    .
                </p>
                <p>
                    <span className={rulesStyles["numbering"]}>1c&#41; </span>
                    Natjecatelj ne smije dodirnuti Rubikovu kocku nakon
                    završetka mjerača vremena, u suprotnome dobiva vremensku
                    kaznu
                    <span className={rulesStyles["yellow"]}>(+2 sekunde)</span>.
                </p>
                <a id="pravila2"></a>
                <h2>2. INSPEKCIJA</h2>
                <p className={rulesStyles["bold"]}>
                    Inspekcija je vrijeme u kojem natjecatelj gleda Rubikovu
                    kocku kako bi predvidio sljedećih nekoliko poteza.
                    Inspekciju mjeri sudac štopericom.
                </p>
                <p>
                    <span className={rulesStyles["numbering"]}>2a&#41; </span>
                    Inspekcija traje maksimalno 15 sekundi.
                </p>
                <p className={rulesStyles["indent"]}>
                    <span className={rulesStyles["numbering"]}>2a1&#41; </span>
                    Ako inspekcija natjecatelja traje više od 15, a manje od 17
                    sekundi natjecatelj dobiva vremensku kaznu
                    <span className={rulesStyles["yellow"]}>(+2 sekunde)</span>.
                </p>
                <p className={rulesStyles["indent"]}>
                    <span className={rulesStyles["numbering"]}>2a2&#41; </span>
                    Ako inspekcija natjecatelja traje više od 17 sekundi
                    natjecatelj dobiva kaznu diskvalifikacije pokušaja{" "}
                    <span className={rulesStyles["red"]}>(DNF)</span>.
                </p>
                <p>
                    <span className={rulesStyles["numbering"]}>2b&#41; </span>
                    Sudac prije inspekcije će pitati natjecatelja je li spreman
                    govoreći rečenicu &quot;SPREMAN?&quot;. Natjecatelj ima
                    vremena da se smiri i odgovori nakon čega sudac podiže
                    prekrivač Rubikove kocke i pokreće štopericu.
                </p>
                <p className={rulesStyles["indent"]}>
                    <span className={rulesStyles["numbering"]}>2b1&#41; </span>
                    Sudac će natjecatelju reći kada je na vremenu inpekcije 8 i
                    12 sekundi govoreći &quot;8 SEKUNDI!&quot; i &quot;12
                    SEKUNDI!&quot;
                </p>
                <a id="pravila3"></a>
                <h2>3. PROSJEK</h2>
                <p className={rulesStyles["bold"]}>
                    Natjecanje 03.05. bit će natjecanje gdje se gleda prosjek od
                    5
                </p>
                <p>
                    <span className={rulesStyles["numbering"]}>3a&#41; </span>{" "}
                    Za &quot;Prosjek od 5&quot; runde, natjecatelji dobiju 5
                    pokušaja. Od tih 5 pokušaja, najbolji i najgori pokušaji se
                    izbacuju i aritmetička sredina od ostala 3 pokušaja se broji
                    za natjecateljev poredak u rundi.
                </p>
                <p className={rulesStyles["indent"]}>
                    <span className={rulesStyles["numbering"]}>3a1&#41; </span>
                    <span className={rulesStyles["red"]}>DNF/DNS</span> je
                    najgori mogući rezultat.
                </p>
                <p className={rulesStyles["indent"]}>
                    <span className={rulesStyles["numbering"]}>3a2&#41; </span>
                    Za &quot;Prosjek od 5&quot; runde, jedan{" "}
                    <span className={rulesStyles["red"]}>DNF</span> ili
                    <span className={rulesStyles["red"]}> DNS</span> je
                    dozvoljen kako bi se brojao kao natjecateljev najgori
                    rezultat runde. Ako natjecatelj ima više od jednog{" "}
                    <span className={rulesStyles["red"]}>DNF</span> i/ili
                    <span className={rulesStyles["red"]}> DNS</span> rezultata u
                    rundi, njegov prosječni rezultat u rundi je{" "}
                    <span className={rulesStyles["red"]}>DNF</span>.
                </p>
            </main>
        </>
    );
}
