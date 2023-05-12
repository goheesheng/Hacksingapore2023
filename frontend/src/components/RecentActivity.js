import React from "react";


const dataSource = [
  {
    key: "1",
    subject: "Mike",
    type: "Send",
    address: "0x12...2345",
    message: "Cookies 🍪",
    amount: "$3.50",
  },
  {
    key: "2",
    subject: "Amanda",
    type: "Receive",
    address: "0x12...2345",
    message: "Dinner 🍔",
    amount: "$22.30",
  },
  {
    key: "3",
    subject: "Roy",
    type: "Send",
    address: "0x12...2345",
    message: "Movie Tickets",
    amount: "$17.31",
  },
  {
    key: "4",
    subject: "Amanda",
    type: "Send",
    address: "0x12...2345",
    message: "Lunch",
    amount: "$9.20",
  },
  {
    key: "5",
    subject: "Charlie",
    type: "Send",
    address: "0x12...2345",
    message: "Golf ⛳️",
    amount: "$49.99",
  },
  {
    key: "6",
    subject: "Charlie",
    type: "Receive",
    address: "0x12...2345",
    message: "Gatorade",
    amount: "$2.30",
  },
  {
    key: "7",
    subject: "Mike",
    type: "Send",
    address: "0x12...2345",
    message: "Poker ♠️",
    amount: "$3.50",
  },
  {
    key: "8",
    subject: "Jimmy",
    type: "Send",
    address: "0x12...2345",
    message: "Car Fix",
    amount: "$30.00",
  },
];

function RecentActivity({ history }) {

  return (
    <div className="bg-white shadow-md rounded-md p-6 w-full min-h-[663px]">
      <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
      {history && (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="font-bold">Payment Subject</th>
              <th className="font-bold">Type</th>
              <th className="font-bold">Address</th>
              <th className="font-bold">Message</th>
              <th className="font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {dataSource.map((record, index) => (
              <tr key={index} className={index % 2 === 1 ? "bg-gray-100" : ""}>
                <td>{record.subject}</td>
                <td>{record.type}</td>
                <td>{record.address}</td>
                <td>{record.message}</td>
                <td
                  className={
                    record.type === "Send" ? "text-red-500" : "text-green-500"
                  }
                >
                  {record.type === "Send" ? "-" : "+"}
                  {record.amount} Matic
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentActivity;
