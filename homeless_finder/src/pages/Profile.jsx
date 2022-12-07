import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useProfile } from "../context/ProfileContext";
import { processFirebaseErrors } from "../firebase/errors";


const Profile = () => {
  const today = new Date();
  const jsonToday = today.toJSON().split("T");
  const [date] = jsonToday;
  const [profile, setProfile] = useState({
    name: "",
    city: "",
    startDate: date,
    endDate: null,
    guests: 0,
    gender: "",
    kids: false,
    active: false,
  });


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [edit,setEdit]=useState(false);


  const { addProfile, getUserProfile, userProfile, deleteProfile} = useProfile();
  const { user, userLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!profile.name) {
      return setError("Name is required");
    }

    if (!profile.city) {
      return setError("City is required");
    }

    const startDate = new Date(profile.startDate);
    const dateObj = new Date(date);
    const endDate = new Date(profile.endDate);

    if (startDate.getTime() < dateObj.getTime()) {
      return setError("Start date can't be earlier than today");
    }

    if (endDate.getTime() <= dateObj.getTime()) {
      return setError("End date can't be earlier than today");
    }

    if (endDate.getTime() <= startDate.getTime()) {
      return setError("End date should be later than start date");
    }

    if (profile.guests <= 0) {
      return setError("Number of guests must be more than 0");
    }

    setError("");

    try {
      setLoading(true);


      if(!edit)
      await addProfile({
        ...profile,
        userId: user.uid,
      });

      if (edit) {
         await setEdit({
          ...profile,
          userId: user.uid,
        });
      }


      await getUserProfile(user.uid);
      setLoading(false);
      setEdit(false);
      
      setError("");
    } catch (err) {
      console.log(err);
      setError(processFirebaseErrors(err.message));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getUserProfile(user.uid);
  }, [user, getUserProfile]);

  useEffect(() => {
    if (!user & !userLoading) {
      navigate("/login");
    }
  }, [user, userLoading, navigate]);


  const getFormWithProfile= async () => {
    await getUserProfile(user.uid);
    setProfile(userProfile);
  }
  const openEdit=() => {
    setEdit(true);
    getFormWithProfile()
  }

  const deleteDocument= () => {
    deleteProfile(userProfile.id);
    getUserProfile(user.uid);
  }

  if (loading || userLoading) return <div>loading...</div>;

  if (userProfile && !edit)
    return (
        <div className="profileMain">
        <Link to='/'>Home</Link>
      <div className="loggedInMain">
        <h1>{user.email}</h1>
        <p>Name: {userProfile.name}</p>
        <p>Location: {userProfile.city}</p>
        <p>Gender preference:{" "}
          {!userProfile.gender ? "No preference" : userProfile.gender}
        </p>
        <p>Maximum amount of guests: {userProfile.guests}</p>
        <p>Underage guests allowed: {userProfile.kids ? "yes" : "no"}</p>
        <p>Availability: from {userProfile.startDate} to {userProfile.endDate}
        </p>
        <button onClick={openEdit}>Edit</button>
        <button onClick={deleteDocument}>Delete</button>
      </div>
      </div>
    );

  return (
    <>
      <Link to='/'>Back</Link>
      <form className="profileSetup" onSubmit={onSubmit}>
        <h1>Profile</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>Name</label>
        <input
          type='text'
          value={profile.name}
          onChange={(e) => {
            setProfile({
              ...profile,
              name: e.target.value,
            });
          }}
        />
        <label>City</label>
        <select
          onChange={(e) =>
            setProfile({
              ...profile,
              city: e.target.value,
            })
          }
          value={profile.city}
        >
          <option disabled>Choose...</option>
          <option value='barry'>Barry</option>
          <option value='london'>London</option>
          <option value='cardiff'>Cardiff</option>
          <option value='aberystwyth'>Aberystwyth</option>
          <option value='belfast'>Belfast</option>
        </select>
        <label>Start Date</label>
        <input
          type='date'
          value={profile.startDate}
          onChange={(e) => {
            setProfile({
              ...profile,
              startDate: e.target.value,
            });
          }}
        />
        <label>End Date</label>
        <input
          type='date'
          value={profile.endDate}
          onChange={(e) => {
            setProfile({
              ...profile,
              endDate: e.target.value,
            });
          }}
        />
        <label>Gender</label>
        <select
          onChange={(e) =>
            setProfile({
              ...profile,
              gender: e.target.value,
            })
          }
          value={profile.gender}
        >
          <option disabled>Choose...</option>
          <option default value=''>No preference</option>
          <option value='female'>Female Only</option>
          <option value='male'>Male only</option>
        </select>
        <label>Guests</label>
        <input
          type='number'
          value={profile.guests}
          onChange={(e) => {
            setProfile({
              ...profile,
              guests: e.target.value < 0 ? 0 : parseInt(e.target.value),
            });
          }}
        />
        <label>Underage guests</label>
        <select
          onChange={(e) =>
            setProfile({
              ...profile,
              kids: e.target.value,
            })
          }
          value={profile.kids}
        >
          <option disabled>Choose...</option>
          <option default value={true}>
            No underage guests.
          </option>
          <option value={false}>Underage guests are welcome</option>
        </select>
        <input type='submit' value='SUBMIT' />
      </form>
    </>
  );
};

export default Profile;