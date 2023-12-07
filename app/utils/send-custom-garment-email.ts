import { FormData } from "../(user)/components/CustomGarmentForm";

export function sendEmail(data: FormData) {
  const apiEndpoint = '/api/custom-garment-email';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(`Failure to send | ${err}`);
    });
}