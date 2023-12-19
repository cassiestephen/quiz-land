import { useState } from "react";
import { useSelector } from "react-redux"; // access state
import profilePic from "../../assets/profilePic.png";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  setProfileOpen: (value: boolean) => void;
};

const Profile = ({setProfileOpen}: Props) => {
  const user = useSelector((state: any) => state.user.value);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  return (
    <div className="fixed right-0 top-[94px] z-40 h-[550px] w-[300px] bg-white drop-shadow-xl border rounded-lg"> 
      <div className="flex justify-end" onClick={(event) => {
            setProfileOpen(false);
          }}><CloseIcon  className=" mr-1 mt-1 text-gray-300"/></div>
      <div className="flex justify-center items-center mt-10">
        <img
          src={profilePic}
          alt=""
          className="h-1/2 w-1/2"
        ></img>
      </div>
      <div className="flex justify-center items-center mt-5 flex-col">
      <p className="text-2xl font-semibold">Welcome {user.email} !</p>
      {!seePassword ? (
        <p className="mt-5">Password: ******** </p>
      ) : (
        <p className="mt-5">Password: {user.password}</p>
      )}
      {!seePassword ? (
        <button className="text-sm mt-1 border rounded-lg w-[150px] h-[25px] bg-blue-500 text-blue-700  hover:text-gray-700 hover:bg-blue-700"
          onClick={(event) => {
            setSeePassword(true);
          }}
        >
          Show Password
        </button>
      ) : (
        <button className="text-sm mt-1 border rounded-lg w-[150px] h-[25px] bg-blue-500 text-blue-700  hover:text-gray-700 hover:bg-blue-700"
          onClick={(event) => {
            setSeePassword(false);
          }}
        >
          Hide Password
        </button>
      )}
    </div>
    </div>
  );
};

export default Profile;
