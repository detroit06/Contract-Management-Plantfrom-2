import { BlueprintProvider } from "./context/BlueprintContext";
import BlueprintsPage from "./pages/Blueprints";

function App() {
  return (
    <BlueprintProvider>
      <BlueprintsPage />
    </BlueprintProvider>
  );
}

export default App;
