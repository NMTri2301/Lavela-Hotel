// eslint-disable-next-line no-unused-vars
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AddRoom from "./components/room/AddRoom"
import ExistingRoom from "./components/room/ExistingRoom";

function App(){
  return<>
  <AddRoom/>
  <ExistingRoom/>
  </>
}
export default App
