import { useNavigate } from "react-router";
import PropTypes from 'prop-types';

const Card = ({ Name, place, age, state, party, fullWidth }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/mladetails/${Name}`);
  };

  return (
    <div className="relative w-full">
      <div className={`mt-5 ${fullWidth ? "w-[95vw]" : "sm:w-56"} h-84`}>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-200 dark:border-neutral-700 dark:shadow-neutral-700/70 h-full">
          <div className={`p-4 md:p-8 flex-1 overflow-auto ${fullWidth ? "text-center" : ""}`}>
            <h3 className={`text-lg font-bold text-black dark:text-black ${fullWidth ? "text-xl" : ""}`}>
              {Name}
            </h3>
            <p className={`mt-1 text-gray-500 dark:text-neutral-900 ${fullWidth ? "text-xl mt-10" : ""}`}>
              Place: {place}
            </p>
            <p className={`mt-1 text-gray-500 dark:text-neutral-900 ${fullWidth ? "text-xl" : ""}`}>
              Age: {age}
            </p>
            <p className={`mt-1 text-gray-500 dark:text-neutral-900 ${fullWidth ? "text-xl" : ""}`}>
              State: {state}
            </p>
            <p className={`mt-1 text-gray-500 dark:text-neutral-900 ${fullWidth ? "text-xl" : ""}`}>
              Party: {party}
            </p>
          </div>
          <div className={`flex justify-center px-6 py-2 mt-auto mb-4 ${fullWidth ? "w-full" : ""}`}>
            <button
              className={`h-10 w-2xs text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none ${fullWidth ? "py-2" : ""} hover:cursor-pointer`}
              onClick={handleClick}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  Name: PropTypes.string.isRequired,
  place: PropTypes.string,
  age: PropTypes.number,
  state: PropTypes.string,
  party: PropTypes.string,
  fullWidth: PropTypes.bool,
};