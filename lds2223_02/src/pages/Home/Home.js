import { MultiSelected } from "../../components";
import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [users, setUsers] = useState([
    {
      ID: 1,
      Name: "Frank Murphy",
      Email: "frank.murphy@test.com",
      Role: "User",
      Password: "123",
      Telephone: "918492732",
      NIF: "274723612",
      Active: true,
    },
    {
      ID: 2,
      Name: "Vic Reynolds",
      Email: "vic.reynolds@test.com",
      Role: "Admin",
      Password: "dksieusda",
      Telephone: "918342732",
      NIF: "375826312",
      Active: true,
    },
    {
      ID: 3,
      Name: "Gina Jabowski",
      Email: "gina.jabowski@test.com",
      Role: "Admin",
      Password: "dksieusda",
      Telephone: "918492564",
      NIF: "545633218",
      Active: true,
    },
    {
      ID: 4,
      Name: "Jessi Glaser",
      Email: "jessi.glaser@test.com",
      Role: "Gestor",
      Password: "dksieusda",
      Telephone: "918492311",
      NIF: "756342132",
      Active: true,
    },
    {
      ID: 5,
      Name: "Jay Bilzerian",
      Email: "jay.bilzerian@test.com",
      Role: "Admin",
      Password: "dksieusda",
      Telephone: "912948234",
      NIF: "123534533",
      Active: true,
    },
  ]); 

  localStorage.setItem("users", JSON.stringify(users));

  return (
  <div class="container1 back-img">
  <div class="bottom-left">Track your products safely</div>
  <div class="top-left">Traceability</div>
</div>
  );
}

export default Home;