import * as React from "react";
import { Toaster } from "react-hot-toast";

import Header from "./ui/Header";
import VehiclesIndex from "./containers/vehicles/Index";

const App = () => (
  <div className="container mx-auto max-w-screen-lg px-4">
    <Header
      imgSrc="https://tailwindui.com/img/logos/workflow-mark.svg?color=green&shade=700"
      headerText="Fleet Code"
    />

    <VehiclesIndex />

    <Toaster />
  </div>
);

export default App;
