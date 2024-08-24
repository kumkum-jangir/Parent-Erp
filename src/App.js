import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { store } from './components/pages/store';
import { Provider } from "react-redux";
import {
  Dashboard,
  Home,
  Login,
  Signup,
  Profile,
  Attendance,
  Fees,
  PayOnline,
  Assignment,
  TimeTable,
  Quiz,
  Result,
  Datesheet,
  Doubt,
  Application,
  Gallery,
  ChangePassword,
  Events,
  Support,
  EventDetail,
  QuizSubject,
  QuizCourse,
  QuizList,
  QuizModel,
  Spinner,
  Faculty,
  Holiday,
  Profilenew,
  Notification,
  MyChild,
  KidsResults,
  KidsResultsTable,
  TotalAttendance,
  SubmitAssignment,
  Notificationview,
} from "./components";

function App() {
  return (
    <>
        <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/Dashboard" element={<Dashboard />} /> */}

          <Route path="/Profile" element={<Profile />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Profilenew" element={<Profilenew />} />
          <Route path="/Fees" element={<Fees />} />
          <Route path="/PayOnline" element={<PayOnline />} />
          <Route path="/Assignment" element={<Assignment />} />
          <Route path="/TimeTable" element={<TimeTable />} />
          <Route path="/notificationview" element={<Notificationview />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/MyChild" element={<MyChild />} />
          <Route path="/Holiday" element={<Holiday />} />
          <Route path="/Result" element={<Result />} />
          <Route path="/Datesheet" element={<Datesheet />} />
          <Route path="/Doubt" element={<Doubt />} />
          <Route path="/Application" element={<Application />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/EventDetail" element={<EventDetail />} />
          <Route path="/QuizCourse" element={<QuizCourse />} />
          <Route path="/QuizSubject" element={<QuizSubject />} />
          <Route path="/QuizList" element={<QuizList />} />
          <Route path="/QuizModel" element={<QuizModel />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/spinner" element={<Spinner />} />
          <Route path="/Faculty" element={<Faculty />} />
          <Route path="/KidsResults" element={<KidsResults />} />
          <Route path="/KidsResultsTable" element={<KidsResultsTable />} />
          <Route path="/TotalAttendance" element={<TotalAttendance />} />
          <Route path="/SubmitAssignment" element={<SubmitAssignment />} />
        </Routes>
      </Router>
      </Provider>
    </>
  );
}

export default App;


