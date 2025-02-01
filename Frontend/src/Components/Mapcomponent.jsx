import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addLocation, clearLocations } from '../Redux/Slices/LocationSlice';
import { useNavigate } from 'react-router';

const API = import.meta.env.VITE_API_KEY;

const MapComponent = () => {
  //hooks
  const [Detailsdiv, setDetailsdiv] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //usedfunctions
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //reduxdatacollections
  const locations = useSelector((state) => state.location.locations);
  const locationData = locations[0] || {};

  //functionsevents
  const onMapClick = async (e) => {
    setDetailsdiv(true);
    setLoading(true);

    try {
      setError(false);
      const response = await axios.get(
        `https://api.maptiler.com/geocoding/${e.latlng.lng},${e.latlng.lat}.json?key=${API}`
      );

      if (response.data) {
        const featuresLength = response.data.features.length;
        const State = response.data.features[featuresLength - 3];
        const District = response.data.features[featuresLength - 4];
        const City = response.data.features[featuresLength - 5];
        const Country = response.data.features[featuresLength - 2];

        if (State && District && City && Country.text === 'India') {
          dispatch(
            addLocation({
              StateName: State.text || '',
              DistrictName: District.place_name_en || '',
              CityName: City.place_name_en || '',
            })
          );
        } else {
          throw new Error('Incomplete location data');
        }
      }
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', {
        dragging: true,
        zoomControl: true,
        scrollWheelZoom: true,
        touchZoom: true,
        doubleClickZoom: true,
      }).setView([12.9141, 74.856], 9);

      L.tileLayer(
        `https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=${API}`
      ).addTo(map);

      map.dragging.enable();
      mapRef.current = map;
      map.on('click', onMapClick);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);
  
  const discardData = () => {
    dispatch(clearLocations());
    setDetailsdiv(false);
    setLoading(false);
    setError(false);
  };

  const OnSubmitData = (e) => {
    e.preventDefault();
    navigate('/mlalist')
  }

  return (
    <div className="p-1 relative">
      <div
        className="min-h-[60vh] sm:min-h-[70vh] rounded-2xl z-0"
        id="map"
      />
      {Detailsdiv && (
        <div className="p-4 absolute inset-0 bg-black/30 backdrop-blur-md z-10 flex items-center justify-center">
          <div className="bg-white/70 p-8 rounded-2xl shadow-lg w-96 space-y-6 text-center">
            <h2 className="text-xl font-bold text-gray-700">Location Details:</h2>

            {loading ? (
              <div className="text-gray-500 text-lg">Loading....</div>
            ) : error ? (
              <div className="text-red-500 text-lg">
                Error fetching location data.Please select a location inside the Indian map again.
              </div>
            ) : (
              <div className="text-left space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    City Name
                  </label>
                  <input
                    type="text"
                    value={locationData.CityName || ''}
                    readOnly
                    className="w-full p-2 rounded-lg border"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    District Name
                  </label>
                  <input
                    type="text"
                    value={locationData.DistrictName || ''}
                    readOnly
                    className="w-full p-2 rounded-lg border"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    State Name
                  </label>
                  <input
                    type="text"
                    value={locationData.StateName || ''}
                    readOnly
                    className="w-full p-2 rounded-lg border"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between space-x-4 mt-4">
              {!error && !loading && (
                <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 hover:cursor-pointer"
                  onClick={OnSubmitData}
                >
                  Search
                </button>
              )}
              <button
                className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 hover:cursor-pointer"
                onClick={discardData}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
