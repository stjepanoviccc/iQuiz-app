import { Link } from "react-router-dom";

const Error: React.FC = () => {
  return (
    <div className="text-center">
      <p className="text-3xl text-white">An error happened.</p>
      <Link className="text-3xl text-white underline" to="/auth/login">
        Please Sign In again.
      </Link>
    </div>
  );
};

export default Error;
