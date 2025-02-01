import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Loader from "./Loader";
import Footer from "./Footer";

const MlaList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const locations = useSelector((state) => state.location.locations);

  useEffect(() => {
    if (locations.length === 0) {
      setLoading(false);
      setError(true);
      return;
    }

    const locationData = locations[0];
    const { CityName, StateName } = locationData || {};

    if (!CityName || !StateName) {
      setLoading(false);
      setError(true);
      return;
    }

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/mlalist/${StateName}`)
      .then((response) => {
        const allData = response.data;

        const normalizedCityName = CityName.slice(0, 6).toLowerCase().trim();

        const filteredData = allData.filter((mla) => {
          const normalizedPlace = mla.place.slice(0, 6).toLowerCase().trim();
          return normalizedPlace === normalizedCityName;
        });

        setData(filteredData.length === 0 ? allData : filteredData);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.error(err);
      });
  }, [locations]);

  useEffect(() => {
    if (data.length > 5) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [data.length]);

  const isFullWidth = data.length <= 3;
  const filteredData = data.filter((mla) =>
    mla.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mla.place.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }
  if (error) return <p className="text-center text-red-500 min-h-[80vh] justify-center align-center">Error: {error}</p>;

  return (
    <>
      <div className="container mx-auto p-4 min-h-[80vh]">
        <div className="m-1">
          <input
            type="text"
            className="w-full p-4 border rounded-md bg-gray-100"
            placeholder="Search MLA by Name or Place"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {showAlert && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
              transition: "opacity 0.5s ease-in-out",
              opacity: showAlert ? 1 : 0,
            }}
          >
            <div
              className="bg-white border shadow-sm rounded-xl dark:bg-neutral-200 dark:border-neutral-700 text-gray-800 text-center p-8 rounded-lg shadow-lg opacity-100 transform transition-all duration-300"
              style={{
                width: "400px",
                height: "400px",
              }}
            >
              <span
                className="text-lg font-medium text-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                Please ensure you have selected a specific location. You may have retrieved MPs for the entire state, not just the region.
              </span>
              <button
                className="text-xl font-bold text-black absolute top-4 right-4 hover:cursor-pointer"
                onClick={() => setShowAlert(false)}
              >
                ✖
              </button>
            </div>
          </div>
        )}

        <div className="mx-auto text-center align-center justify-center w-full flex"> 
          <div
            className={`w-full flex flex-wrap gap-4 ${data.length > 3
                ? "justify-start sm:justify-start md:justify-between lg:justify-between"
                : "flex-col items-center"
              }`}
          >
            {filteredData.map((mla, index) => (
              <div key={index}>
                <Card
                  Name={mla.name}
                  place={mla.place}
                  age={mla.age}
                  state={mla.state}
                  party={mla.party}
                  fullWidth={isFullWidth}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default MlaList;