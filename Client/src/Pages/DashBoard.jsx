import { useState } from "react";
import { useSuccessfulPayments } from "../hook/useeSuccessfulpayment";

export default function Dashboard() {
  const { data, isLoading } = useSuccessfulPayments();
  const [selected, setSelected] = useState([]);

  const payments = data?.data || [];

  const toggleRow = (receipt) => {
    setSelected((prev) =>
      prev.includes(receipt)
        ? prev.filter((x) => x !== receipt)
        : [...prev, receipt]
    );
  };

  const toggleAll = () => {
    if (selected.length === payments.length) {
      setSelected([]);
    } else {
      setSelected(payments.map((p) => p.mpesaReceiptNumber));
    }
  };

  const printWinners = () => {
    const winners = payments.filter((p) =>
      selected.includes(p.mpesaReceiptNumber)
    );

    const section = `
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Receipt</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${winners
            .map(
              (w, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${w.customerName}</td>
              <td>${w.phoneNumber}</td>
              <td>${w.mpesaReceiptNumber}</td>
              <td>${w.amount}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    const html = `
      <html>
        <head>
          <title>Challenge Me Winners</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; }
            th { background: #f1f5f9; }
          </style>
        </head>
        <body>
          <h1>Challenge Me Winners</h1>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          ${section}
        </body>
      </html>
    `;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    win.print();
  };

  if (isLoading) return <p>Loading payments...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <h2>Participants for {new Date().toLocaleDateString()}</h2>

        <button
          onClick={printWinners}
          disabled={selected.length === 0}
          style={{
            padding: "8px 16px",
            background:
              selected.length === 0 ? "#94a3b8" : "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor:
              selected.length === 0
                ? "not-allowed"
                : "pointer",
          }}
        >
          🏆 Winners ({selected.length})
        </button>
      </div>

      <table className="payments-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  payments.length > 0 &&
                  selected.length === payments.length
                }
                onChange={toggleAll}
              />
            </th>
            <th>Name</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Receipt</th>
            <th>Time Paid</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr
              key={p.mpesaReceiptNumber}
              className={
                selected.includes(p.mpesaReceiptNumber)
                  ? "selected-row"
                  : ""
              }
            >
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(
                    p.mpesaReceiptNumber
                  )}
                  onChange={() =>
                    toggleRow(p.mpesaReceiptNumber)
                  }
                />
              </td>
              <td>{p.customerName}</td>
              <td>{p.phoneNumber}</td>
              <td>KES {p.amount}</td>
              <td>{p.mpesaReceiptNumber}</td>
              <td>
                {new Date(p.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected.length > 0 && (
        <p style={{ marginTop: "10px" }}>
          ✅ {selected.length} participant(s) selected
        </p>
      )}
    </div>
  );
}
