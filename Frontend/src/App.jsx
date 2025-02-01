import Mapcomponent from './Components/Mapcomponent';
import Header from './Components/Header';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div className='max-h-[88vh]'>
      <Header />
      <Mapcomponent />
      <Footer />
    </div>
  );
};

export default App;