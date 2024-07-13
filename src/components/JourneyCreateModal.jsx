/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {  useState } from "react";

import axios from "axios";
import ZeroCardRechargeModal from "./ZeroCardRechargeModal";

export default function JourneyCreateModal({
  journeyDetails,
  insufficientBalance,
  modal,
  setModal,
//   setTo,
//   setFrom,
}) {
  const [paymentModal, setPaymentModal] = useState(false);
  const [message,setMessage]=useState('')
  const [balance, setBalance] = useState(
    journeyDetails?.ZeroCardNumber?.balance
  );
  const baseUrl = "http://localhost:5000/api";




  const fetchBalance = async() => {
    const response = await axios.post(`${baseUrl}/card-details`, { journeyDetails });
    if (response) {
      setBalance(response.data.updatedCard.balance)
      // setBalance()
    }
  };
  const style = insufficientBalance ? "text-red-700" : "";

  const handlePayment = async(e) => {
    e.preventDefault();
    // setModal(false);
    try {
      const response = await axios.post(`${baseUrl}/payment`, { journeyDetails });
      if (response.status===200) {
        setMessage('Payment Successfull')
        fetchBalance()
      }else{
        setMessage(response?.data?.message)
      }
    } catch (error) {
      console.log(error.message);
    }finally{
        setTimeout(() => {
            
            setModal(false)
        }, 1500);
    }
  };

  const handleRechargeModal = () => {
    setPaymentModal((prev) => !prev);
    // setModal(false);
  };

  return (
    <>
      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-1/4 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Payment</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    From :{" "}
                    <span className="font-bold">{journeyDetails?.from}</span>
                  </p>
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    To : <span className="font-bold">{journeyDetails?.to}</span>
                  </p>
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Card Number :{" "}
                    <span className="font-bold">
                      {journeyDetails?.ZeroCardNumber?.cardNumber}
                    </span>
                  </p>
                  <p className="mt-4 text-blueGray-500 text-lg leading-relaxed">
                    Available Balance :{" "}
                    <span className={`font-bold ${style}`}>Rs.{balance}</span>
                  </p>
                </div>
                <div className="relative p-6 flex-auto">
                  <p>
                    Travel Charges:{" "}
                    <span className="font-bold">
                      Rs.{journeyDetails?.lastCharge+journeyDetails?.discount}
                    </span>
                  </p>
                  <p>
                    Discount:{" "}
                    <span className="font-bold">
                      Rs.{journeyDetails?.discount ? journeyDetails?.discount : 0}
                    </span>
                  </p>
                  <p className="font-bold">
                    Total Payable: <span className="font-bold">{journeyDetails?.lastCharge}</span>
                  </p>
                  <h4 className="font-bold mt-3 text-lg text-gray-700">
                    Recharge your ZeroCard{" "}
                    <button
                      onClick={handleRechargeModal}
                      className="text-blue-700"
                    >
                      Click here
                    </button>{" "}
                  </h4>
                  {
                    message &&
                  <h3 className="text-green-700 flex justify-center items-center text-lg font-semibold mt-3">{message}</h3>
                  }
                </div>
                {paymentModal && (
                  <ZeroCardRechargeModal
                    paymentModal={paymentModal}
                    setPaymentModal={setPaymentModal}
                    fetchBalance={fetchBalance}
                  />
                )}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className=" text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  {!insufficientBalance   && (
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handlePayment}
                    >
                      Pay
                    </button>
                  )}
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
