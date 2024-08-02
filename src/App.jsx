import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/AllApps";
import Analytics from "./pages/Analytics";
import Authentication from "./pages/Authentication";
import Build from "./pages/Build";
import Settings from "./pages/Settings";
import CreteMember from "./pages/CreateMember";
import CreateCourse from "./pages/CreateCourse";
import Login from "./pages/Login";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<AllApps />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create_member" element={<CreteMember />} />
        <Route path="/create_course" element={<CreateCourse />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/build/:bID" element={<Build />} />
        <Route path="/analytics/:aID" element={<Analytics />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
