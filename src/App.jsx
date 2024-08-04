import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/CoursePage/AllApps";
import Analytics from "./pages/Analytics";
import Register from "./pages/Register";


import CreteMember from "./pages/CreateMember";
import CreateCourse from "./pages/CreateCourse";
import Login from "./pages/Login";
import AddExam from "./pages/CoursePage/AddExam";
import AddQuestion from "./pages/CoursePage/AddQuestion";
import Data from "./pages/Data";
import Course from "./pages/MemberPage/Course";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./Redux/store";

// import ProtectedRoute from "./Redux/Slice/ProtectedRoute";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <RootLayout>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courselisting" element={<AllApps />} />
        <Route path="/create_member" element={<CreteMember />} />
        <Route path="/create_course" element={<CreateCourse />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="/data" element={<Data />} />
        <Route path="/member/course" element={<Course />} />
        <Route path="/course/addExam" element={<AddExam />} />
        <Route path="/exams/addquestion" element={<AddQuestion />} />

      </Routes>
    </RootLayout>
    </PersistGate>
    </Provider>
  );
};

export default App;
