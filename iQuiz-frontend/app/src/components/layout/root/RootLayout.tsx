import { Outlet } from "react-router-dom"
import Wrap from "../../UI/wrap"

const RootLayout: React.FC = () => {
  return (
    <>
      <main className="h-[100vh] flex flex-col justify-center py-4 bg-primary">
        <Wrap>
          <Outlet />
        </Wrap>
        <p className="absolute bottom-5 right-7 text-white text-sm font-bold">Copyright &copy; 2024 - stjepanoviccc</p>
      </main>
    </>
  );
};

export default RootLayout
