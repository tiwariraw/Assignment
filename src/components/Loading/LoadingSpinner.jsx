import DotLoader from "react-spinners/DotLoader";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ loading }) => {
  return (
    loading && (
      <div className="spinner">
        <DotLoader
          color="#8b5cf6"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
        />
      </div>
    )
  );
};

export default LoadingSpinner;
