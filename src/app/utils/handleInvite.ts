export default function handleInvite() {
    if (!window.navigator.share) {
        alert("Dijeljenje nije podržano u ovom pregledniku.");
        return;
    }
    navigator.share({
        title: "Dođi na natjecanje!",
        text: `Pozivam te da se natječeš u slaganju Rubikove kocke! Mogu se natjecati osnovnoškolci.`,
        url: "https://cutt.ly/CroComp",
    });
}
