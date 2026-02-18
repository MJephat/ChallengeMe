export const successPage = (req, res) => {

  const now = new Date();

  let kenyaHour = now.getUTCHours() + 3;
  if (kenyaHour >= 24) kenyaHour -= 24;

  let period = "evening";
  if (kenyaHour >= 0 && kenyaHour <= 9) period = "morning";
  else if (kenyaHour > 9 && kenyaHour <= 14) period = "afternoon";

  res.send(`
    <html>
      <body style="font-family:sans-serif;text-align:center;padding:40px">
        <h2>✅ Request Sent</h2>
        <p style="color:#0f9d58;font-weight:600;">
          You have successfully entered the ${period} bet.
        </p>
      </body>
    </html>
  `);
};
