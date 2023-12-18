import { useSelector } from "react-redux"; // access state


type Props = {}

const Profile = (props: Props) => {
    const user = useSelector((state: any) => state.user.value); // state any may be incorrect
  return (
    <div className="">
        <h1>
            Profile Page
        </h1>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p>
    </div>
  )
}

export default Profile;