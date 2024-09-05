export default function handleInvite() {
  if (!window.navigator.share) {
    alert("Dijeljenje nije podržano u ovom pregledniku.");
    return;
  }
  window.navigator.share({
    title: "Cubing Competition",
    text: "Pozovi svoje prijatelje za natjecanje!",
  });
}
