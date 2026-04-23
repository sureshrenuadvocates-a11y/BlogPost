import React, { useEffect } from "react";
import useAuthStore from "../Store/Store";
import { Loader2 } from "lucide-react";
import { TimeSince } from "../_lib/Time";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const { CommunityUsers, Users, isLoadingCommunityUsers, setProfile } =
    useAuthStore();

  useEffect(() => {
    CommunityUsers();
  }, []);
  const navigate = useNavigate();
  const onSubmitHandler = (id) => {
    setProfile(id);
    navigate(`/${id}`);
  };

  if (isLoadingCommunityUsers) {
    return (
      <Loader2 className="absolute left-1/2 bottom-1/2 animate-spin h-10 w-10" />
    );
  }

  return (
    <div className="bg-base-100 h-screen w-full">
      <div className="bg-base-100 h-screen w-full p-4">
        {Users.map((User) => (
          <div
            onClick={() => {
              onSubmitHandler(User?._id);
            }}
            key={User._id}
          >
            <div
              className="bg-base-300 rounded-xl cursor-pointer overflow-hidden shadow-md flex 
             items-center gap-5 hover:shadow-xl transition-shadow p-4 mb-4
             
             "
            >
              <img src={User.profilePic} className="h-10 w-10 rounded-full" />
              <div>
                {" "}
                <h1 className="text-lg font-semibold">{User.fullName}</h1>
                <p>{TimeSince(User.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
