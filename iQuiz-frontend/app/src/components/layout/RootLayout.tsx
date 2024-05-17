import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <main className="">
        <p className="text-red-600">testing</p>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
