import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BlueprintProvider } from "./context/BlueprintContext";
import { ContractProvider } from "./context/ContractContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BlueprintProvider>
    <ContractProvider>
      <App />
    </ContractProvider>
  </BlueprintProvider>
);
