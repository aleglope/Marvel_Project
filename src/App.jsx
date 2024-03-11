import { AppProvider } from "./Context/AppContext";
import { AppRoutes } from "./Routes/AppRoutes";

function App() {


  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
