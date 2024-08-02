import Sidebar from "./sidebar";

function RootLayout({ children }) {
  return (
    <div className="flex ">
      <Sidebar />
      <main className="max-w-5xl flex-1 mx-auto ">{children}</main>
    </div>
  );
}

export default RootLayout;
