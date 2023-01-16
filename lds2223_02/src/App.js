import React from "react";
import "./App.css";
import LoginNavbar from "./components/Navbar/LoginNavbar";
import { BrowserRouter as Router, Switch, Routes, Route, BrowserRouter } from "react-router-dom";
import {
  Home,
  About,
  Contacts,
  CreateTrackingPhasePage,
  EditTrackingPhasePage,
  VisualizeTrackingPhasePage,
  VisualizeSingleTrackingPhasePage,
  Users_list,
    Login,
  PhasesPage,
  PhaseRecordsPage,
  SinglePhaseRecordPage,  
  Error404
} from "./pages";

import { Footer } from "./components";
import Navbar from "./components/Navbar/Navbar";
import NavbarForHome from "./components/Navbar/NavbarForHome";
import TrackingList from "./pages/Tracking/TrackingList";
import {Supplier} from "./pages/MasterData/Suppliers/Supplier";
import {Client} from "./pages/MasterData/Clients/Client";
import {Vehicle} from "./pages/MasterData/Vehicles/Vehicle";
import {Establishment} from "./pages/MasterData/Establishments/Establishment";
import {Material} from "./pages/MasterData/Materials/Materials";
import {Machine} from "./pages/MasterData/ProductionMachine/ProductionMachine";
import {ProductionBatch} from "./pages/MasterData/ProductionBatch/ProductionBatch";
import {Product} from "./pages/MasterData/Product/Product";


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <div className="App">
        <Routes>
          
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
         

          <Route
            path="/tracking/editTrackingPhase/:index"
            element={<EditTrackingPhasePage />}
          />
          <Route
            path="/tracking/visualizeTrackingPhase"
            element={<VisualizeTrackingPhasePage />}
          />
          <Route
            path="/tracking/trackingPhase/:index"
            element={<VisualizeSingleTrackingPhasePage />}
          />
          <Route
            path="/tracking/addTrackingPhase"
            element={<CreateTrackingPhasePage />}
          />
          <Route path="/trackingList" element={<TrackingList />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/client" element={<Client />} />
          <Route path="/login" element={<Login />} />
          <Route path="/material" element={<Material />} />
          <Route path="/employee" element={<Users_list />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/establishment" element={<Establishment />} />

	        <Route path="/phasetype/:index" element={<PhasesPage />} />
          <Route path="/phaseRecords/:index" element={<PhaseRecordsPage />} />
          <Route path="/singlePhaseRecord/:index" element={<SinglePhaseRecordPage />} />
          
          <Route path="*" element={<Error404 />} />
          <Route path="/machine" element={<Machine />} />
          
          <Route path="/product" element={<Product />} />

          <Route path="/production-batch" element={<ProductionBatch />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
