import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import { Users_list , CreateTrackingPhasePage} from "./pages";
import { Footer } from "./components";

function OtherRoutes(){
    return(
               <React.Fragment>
            <Navbar/>
              <Routes>
                  
                   <Route path="/employees" element={<Users_list/>}/>
              </Routes>
            <Footer />
        </React.Fragment>

    )
  }

export default OtherRoutes;