import axios from "axios";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const baseUrl = "http://localhost:5000/api";
  const [loading,setLoading]=useState(false)
  const [charges, setCharges] = useState(null);

  useEffect(() => {
    setLoading(false)
    axios.get(`${baseUrl}/admin-details`).then((res) => {
      console.log(res);
      setCharges(res.data);
    });
    setLoading(false)
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderPassengerSummary = (summary) => (
    <>
      {summary.passengerSummary.map((passenger) => (
        <h4 key={passenger.type}>
          {passenger.type} : {passenger.count}
        </h4>
      ))}
      <h4 className="font-bold">
        Total :{" "}
        <span className="text-lg">
          {summary.passengerSummary.reduce((acc, passenger) => acc + passenger.count, 0)}{" "}
        </span>
      </h4>
    </>
  );

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white px-10 py-10 rounded-lg">
        <h2 className="text-2xl underline font-bold mb-3">Collection Summary</h2>
        <h3 className="text-lg font-bold">Station: New Delhi Railway</h3>
        <h4>
          Total Charges <span>{charges.delhi.totalCharge}</span>
        </h4>
        <h4>
          Discount : <span>{charges.delhi.totalDiscount}</span>{" "}
        </h4>
        <h4 className="font-semibold">
          Net Charges Collected :{" "}
          <span className="font-bold">
            {charges.delhi.totalCharge - charges.delhi.totalDiscount}
          </span>
        </h4>
        <br />
        <h3 className="text-lg font-bold">Station: Airport</h3>
        <h4>
          Total Charges <span>{charges.airport.totalCharge}</span>
        </h4>
        <h4>
          Discount : <span>{charges.airport.totalDiscount}</span>{" "}
        </h4>
        <h4 className="font-semibold">
          Net Charges Collected :{" "}
          <span className="font-bold">
            {charges.airport.totalCharge - charges.airport.totalDiscount}
          </span>
        </h4>
      </div>
      <div className="bg-white px-10 py-10 rounded-lg mx-16">
        <h2 className="text-2xl underline font-bold mb-3">Passenger Summary</h2>
        <h3 className="text-lg font-bold">Station: New Delhi Railway</h3>
        {renderPassengerSummary(charges.delhi)}
        <br />
        <h3 className="text-lg font-bold">Station: Airport</h3>
        {renderPassengerSummary(charges.airport)}
      </div>
    </div>
  );
};

export default AdminPage;
