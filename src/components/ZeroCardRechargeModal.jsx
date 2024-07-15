/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import axios from "axios";
import { useState } from "react";

export default function ZeroCardRechargeModal({
  paymentModal,
  setPaymentModal,
  fetchBalance,
}) {
  // const baseUrl = "http://localhost:5000/api";
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [ZeroCardNumber, setZeroCardNumber] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = "http://localhost:5000/api";

  const handleRecharge = async () => {
    setLoading(true);

    // Handle the recharge logic here
    try {
      setMessage("");
      const response = await axios.post(`${baseUrl}/recharge`, {
        ZeroCardNumber,
        rechargeAmount,
        serviceCharge,
      });
      if (response) {
        fetchBalance();
        setMessage("Recharge Successfull");
        setTimeout(() => {
          setPaymentModal(false);
        }, 1500);
      }
    } catch (error) {
      console.log("error.response");
      console.log(error.response?.data?.message);
      if (error.response?.status === 404) {
        setMessage(error?.response?.data?.message);
      } else if (error?.response?.status === 500) {
        setMessage(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAmount = (e) => {
    setRechargeAmount(e.target.value);
    setServiceCharge((e.target.value * 5) / 100);
  };

  return (
    <>
      {paymentModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-1/4 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Recharge Your Card</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <h4 className="font-bold">Enter ZeroCard Number</h4>
                  <input
                    type="text"
                    name="ZeroCardNumber"
                    id="ZeroCardNumber"
                    value={ZeroCardNumber}
                    onChange={(e) => setZeroCardNumber(e.target.value)}
                    className="border border-black p-2 rounded"
                  />
                  <h4 className="font-bold">Enter Amount</h4>
                  <input
                    type="text"
                    name="rechargeAmount"
                    id="rechargeAmount"
                    value={rechargeAmount}
                    onChange={handleAmount}
                    className="border border-black p-2 rounded"
                  />{" "}
                  {serviceCharge && (
                    <>
                      <div className="mt-3 text-blue-800 font-bold">
                        Service Charge : {serviceCharge}
                      </div>
                      <div className="mt-3 text-blue-800 font-bold">
                        Total Amount to be Deducted:{" "}
                        {Number(serviceCharge) + Number(rechargeAmount)}
                      </div>
                    </>
                  )}
                  {message && (
                    <div className="mt-3 text-red-500 font-bold">{message}</div>
                  )}
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className=" text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setPaymentModal(false)}
                  >
                    Close
                  </button>

                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleRecharge}
                  >
                    {loading ? "Loading..." : "Recharge"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
