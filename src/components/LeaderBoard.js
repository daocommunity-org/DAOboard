import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../context/AppConfig";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";

function LeaderBoard() {
  const [open, setOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalTokens, setModalTokens] = useState("");
  const [withdrawTokens, setWithdrawTokens] = useState("");
  const handleOpen = (name, availableTokens) => {
    setOpen(true);
    setModalName(name);
    setModalTokens(availableTokens.toString());
  };

  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "rgba(52, 154, 186, 0.87)",
    border: "2px solid rgba(54, 156, 153, 0.87)",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
  };
  const {
    membersdata,
    taskLoader,
    currentUser,
    providerConnected,
    pointsToToken,
    connectWallet,
  } = useContext(AppConfig);
  const navigate = useNavigate();

  console.log(membersdata);
  console.log(currentUser);

  const claimTokens = async () => {
    if (parseInt(withdrawTokens) > parseInt(modalTokens)) {
      alert("Not enough tokens");
    } else {
      await pointsToToken(parseInt(withdrawTokens));
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="font-semibold">
              Hey {modalName}! How much tokens would you like to withdraw?{" "}
            </div>
            <input
              className="rounded-lg p-2"
              onChange={(e) => setWithdrawTokens(e.target.value)}
              type="text"
            />
            <button
              onClick={claimTokens}
              className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105 hover:bg-blue-300 cursor-pointer"
            >
              Withdraw Tokens
            </button>
          </div>
        </Box>
      </Modal>
      <div className="flex flex-col items-center justify-center mt-36">
        <div>
          <h1 className="font-bold text-blue-50 text-l md:text-2xl mb-4">
            LeaderBoard - Top Contributors
          </h1>
        </div>

        <div class="overflow-x-auto shadow-md sm:rounded-lg mx-4 mt-12">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Registration Number
                </th>
                <th scope="col" class="px-6 py-3">
                  Address
                </th>
                <th scope="col" class="px-6 py-3">
                  Points
                </th>
                <th scope="col" class="px-6 py-3">
                  Role
                </th>
                <th scope="col" class="px-6 py-3">
                  Claimable Tokens
                </th>
                <th scope="col" class="px-6 py-3">
                  Claim
                </th>
              </tr>
            </thead>
            {taskLoader ? <div className="flex items-center justify-center mt-8">
              <CircularProgress color="inherit" />
            </div> : <tbody>
              {membersdata.map((dat) => (
                <tr class="bg-cyan-600 dark:border-gray-800">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    {dat[0]}
                  </th>
                  <td class="px-6 py-4 text-black">{dat[1]}</td>
                  <td class="px-6 py-4 text-black">{dat[6]}</td>
                  <td class="px-6 py-4 text-black">
                    {parseInt(dat[2]._hex, 16)}
                  </td>
                  <td class="px-6 py-4 text-black">{dat[4] ? dat[5] : "member"}</td>
                  <td class="px-6 py-4 text-black">
                    {parseInt(dat[7]._hex, 16) ? parseInt(dat[7]._hex, 16) : ""}
                  </td>
                  <td>
                    {parseInt(dat[7]._hex, 16) !== 0 &&
                      dat[6].toLowerCase() === currentUser.toLowerCase() ? (
                      <button
                        onClick={() =>
                          handleOpen(dat[0], parseInt(dat[7]._hex, 16))
                        }
                        className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105 hover:bg-blue-300 cursor-pointer"
                      >
                        Claim
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>}

          </table>
        </div>
      </div>

      {/* <table className='w-[80%] overflow-scroll'>
                <tr className='border-2 border-black'>
                    <th className='border-black text-center border-2'>Name</th>
                    <th className='border-black text-center border-2'>Registration Number</th>
                    <th className='border-black text-center border-2'>Address</th>
                    <th className='border-black text-center border-2'>Points</th>
                    <th className='border-black text-center border-2'>Coordinator</th>
                </tr>
                {membersdata.map((dat) => (
                    dat[3] && <tr className='border-2 border-black'>
                        <td className='border-2 border-black font-mono text-center'>{dat[0]}</td>
                        <td className='border-2 border-black font-mono text-center'>{dat[1]}</td>
                        <td className='border-2 border-black font-mono text-center'>{dat[5]}</td>
                        <td className='border-2 border-black font-mono text-center'>{parseInt(dat[2]._hex, 16)}</td>
                        <td className='border-2 border-black font-mono text-center'>{dat[4] ? "Coordinator" : "Not Coordinator"}</td>
                    </tr>
                ))}

            </table> */}
    </div>
  );
}

export default LeaderBoard;
