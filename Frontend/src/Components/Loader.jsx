import "./Loader.css"

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="text-center">
        <div className="loader-container">
          <div className="ashoka-chakra"></div>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">MLA Finder</h2>
        <p className="mt-2 text-gray-600">Loading democratic data...</p>
        <div className="mt-4">
          <Old/>
        </div>
      </div>
    </div>
  )
}

export default Loader;



const Old = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">Data</span>
            <span className="word">Cards</span>
            <span className="word">Buttons</span>
            <span className="word">Text</span>
          </div>
        </div>
      </div>
    </div>
  );
};