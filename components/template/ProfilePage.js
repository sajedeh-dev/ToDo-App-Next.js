import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../module/ProfileForm";
import ProfileData from "../module/ProfileData";

function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [position, setPosition] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    if (data.status === "success" && data.data.name && data.data.lastName) {
      setData(data.data);
      setContact(data.data.contact || "");
      setPosition(data.data.position || "");
    }
  };

  const submitHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password  }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  const updateHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify({ name, lastName, contact, position  }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      setData(data.data);
      setIsEditing(false);
    }
  };

  return (
    <div className="px-8  overflow-y-auto  bg-gradient-to-tr from-pink-100 to-sky-50 pt-8 border-r rounded-xl shadow-lg h-screen  ">
      <div className=" flex items-center gap-4">
        <CgProfile className="text-purple-800 size-6" />
        <h2 className=" font-bold text-xl text-purple-600 ">
          Account Information
        </h2>
      </div>

      {data && !isEditing ? (
        <ProfileData data={data} setIsEditing={setIsEditing} />
      ) : (
        <ProfileForm
          name={name}
          lastName={lastName}
          password={password}
          contact={contact}
          position={position}
          setName={setName}
          setLastName={setLastName}
          setPassword={setPassword}
          setContact={setContact}
          setPosition={setPosition}
          onSubmit={data ? updateHandler : submitHandler}
          isEditMode={!!data}
        />
      )}
    </div>
  );
}

export default ProfilePage;
