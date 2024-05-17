import { useAuth } from "../../contexts/auth";
import Wrap from "../../components/UI/wrap";
import Button from "../../components/UI/button/Button";

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <Wrap extendClass="flex flex-col justify-center items-center gap-y-4">
          <img className="w-60 h-32 sm:w-80 sm:h-40"  src="/assets/iQuiz-white.png" alt="iQuiz Logo" />
          <Button extendClass="w-64 sm:w-80 py-4 text-white text-xl hover:text-primary hover:bg-white" type="button">START GAME</Button>
          <Button extendClass="w-64 sm:w-80 py-4 text-white text-xl hover:text-primary hover:bg-white" type="button">HIGHSCORE</Button>
        </Wrap>
      ) : (
        <div className="text-red-600">Please log in</div>
      )}
    </div>
  );
};

export default Home;
