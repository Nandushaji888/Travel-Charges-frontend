import axios from "axios";
import { useEffect, useState } from "react";
import JourneyCreateModal from "./JourneyCreateModal";
import { Link } from "react-router-dom";

const JourneyBookingPage = () => {
  const stations = ["New Delhi Railway Station", "Airport"];
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [zeroCardNo, setZeroCardNo] = useState("");
  const [modal, setModal] = useState(false);
  const [insufficientBalance,setInsufficientBalance] = useState(false)
  const [invalidZeroCard,setInvalidZeroCard] = useState(false)
  const [journeyDetails,setJourneyDetails] = useState('')
  const handleFrom = (e) => {
    setFrom(e.target.value);
  };
  const handleTo = (e) => {
    setTo(e.target.value);
  };
  useEffect(() => {
    if (from) {
      const toOptions = stations.filter((item) => item !== from);
      setTo(toOptions.length > 0 ? toOptions[0] : "");
    }
  }, [from]);
  const baseUrl = "http://localhost:5000/api";

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      setInsufficientBalance(false)
      setInvalidZeroCard(false)
      const res = await axios.post(`${baseUrl}/create-journey`, {
        zeroCardNo,
        to,
        from,
      });
      if(res){
        setJourneyDetails(res?.data)
        setModal(true)

      }

    } catch (error) {
      if(error.response){
        if(error.response.status === 402){
          setInsufficientBalance(true)
          // console.log(error.response.data);
          setJourneyDetails(error?.response?.data)
          setModal(true)
        }else if(error.response.status===400){
          setInvalidZeroCard(true)
        }else{
          console.error("Error creating journey", error.message);

        }
      }
      console.error("Error creating journey", error);
    }
  };

  return (
    <div className=" min-h-screen flex  items-center justify-center">
      <div className="w-full max-w-sm bg-gray-400 flex flex-col items-center justify-center py-10 rounded">
      <h2 className="my-2 pb-3 text-2xl font-bold text-blue-700">Book Your Ticket</h2>
        <form onSubmit={handleForm} className="space-y-6 flex flex-col">
          <div className="px-7">
            <label htmlFor="from" className="font-medium text-gray-800">
              From
            </label>
            <select
              required
              name="from"
              id="from"
              className="w-full px-3 py-2 mt-1 border border-gray-400"
              value={from}
              onChange={handleFrom}
            >
              <option value="" disabled>
                Select a station
              </option>
              {stations.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="px-7">
            <label htmlFor="to" className="font-medium text-gray-800">
              To
            </label>
            <select
              required
              name="to"
              id="to"
              className="w-full px-3 py-2 mt-1 border border-gray-400"
              value={to}
              onChange={handleTo}
            >
              <option value="" disabled>
                Select Station
              </option>
              {stations
                .filter((item) => item !== from)
                .map((item, idx) => (
                  <option key={idx}>{item}</option>
                ))}
            </select>
          </div>
          <div className="px-7">
            <label htmlFor="zeroCardNo" className="font-medium text-gray-800">
              ZeroCrad Number
            </label>
            <input
              required
              type="string"
              name="zeroCardNo"
              id="zeroCardNo"
              className="w-full px-3 py-2 mt-1 border border-gray-400"
              value={zeroCardNo}
              onChange={(e) => setZeroCardNo(e.target.value)}
            />
          </div>
          {
            invalidZeroCard && 
            <div className="w-auto px-6 text-red-600 font-bold flex items-center justify-center">
              Type a valid ZeroCard Number
            </div>
          }
       
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Book Train
            </button>
          </div>
        </form>
        <div className="mt-2">
          Dont have ZeroCard{" "}
          <Link className="font-bold text-blue-700 " to='/signup' >Click here </Link>
          to Register
        </div>
        <div className="mt-2">
          
          <Link className="font-bold text-blue-700 " to='/admin' >Admin Page </Link>
        </div>
      </div>
      {modal && <JourneyCreateModal journeyDetails={journeyDetails} insufficientBalance={insufficientBalance} modal={modal} setModal={setModal} setTo={setTo} setFrom={setFrom} />}
    </div>
  );
};

export default JourneyBookingPage;
