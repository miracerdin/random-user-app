import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { GoMailRead } from "react-icons/go";
import { CgPhone } from "react-icons/cg";
import { GrMapLocation } from "react-icons/gr";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const users = async () => {
    const res = await axios("https://randomuser.me/api/");
    const { data } = res;
    // const img = data.results[0].picture.thumbnail;
    setData(data.results[0]);
    console.log(data);
    setLoading(false);
  };

  // const img = data.data.results[0].picture.thumbnail;
  // // console.log(img);
  useEffect(() => {
    users();
  }, []);
  if (loading) {
    return <h2>Loading..</h2>;
  }
  return (
    <>
      <div className="container">
        <div className="imageAndName">
          <img src={data.picture.medium} alt="image" />
          <h3>{Object.values(data.name).join(" ")}</h3>
        </div>
        <div className="card">
          <div className="icons">
            <GoMailRead />
            <CgPhone />
            <GrMapLocation />
          </div>
          <div className="response">
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p>
              {data.location.city}- {data.location.country}
            </p>
          </div>
        </div>
        <div className="bottomAge">
          <p>Age:{data.dob.age}</p>
          <p>Register Date: {data.registered.date.slice(0, 10)}</p>
        </div>
      </div>
      <button onClick={() => users()}>Random User</button>
    </>
  );
}

export default App;
