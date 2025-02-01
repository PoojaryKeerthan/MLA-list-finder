import { data, useParams } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from './Footer';

const MlaDetails = () => {
  const { Name } = useParams();
  const formattedName = Name.replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/-$/, "");

  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  //states for details
  const [name, setname] = useState('');
  const [state, setstate] = useState('');
  const [Constituency, setConstituency] = useState('');
  const [Party, setParty] = useState('');
  const [StartOfTerm, setstartofterm] = useState('');
  const [age, setage] = useState('');
  const [gender, setgender] = useState('');
  const [education, seteducation] = useState('');
  const [image, setimage] = useState('');

  //getting api data
  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/mladetails/${formattedName}`)
      .then((response) => {
        const [data] = response.data;
        if (data.name) {
          setLoading(false)
          setError(false)
        }
        const {
          name,
          state,
          constituency,
          party, startOfTerm,
          age, gender,
          education,
          image
        } = data;

        setname(name);
        setstate(state);
        setConstituency(constituency);
        setParty(party);
        setstartofterm(startOfTerm);
        setage(age);
        setgender(gender);
        seteducation(education);
        setimage(image);

      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  }, [data])
  const handleExit = (e) => {
    navigate(-1);
    console.log(e);
  }
  return (
    <>
      <div className='p-1'>
        {Loading ? (<>
          <div className="w-full h-[70vh] rounded-md shadow-xl p-6 bg-gray-200 animate-pulsem overflow-hidden">

            <div className="h-8 w-1/3 bg-gray-300 rounded mb-6 mx-auto"></div>

            <div className="w-[180px] h-[180px] bg-gray-300 rounded-md mx-auto mb-6"></div>

            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <div className="w-[250px] h-[200px] bg-gray-300 rounded-md"></div>
              <div className="w-[250px] h-[200px] bg-gray-300 rounded-md"></div>
            </div>

            <div className="h-10 w-24 bg-gray-300 rounded-full mx-auto mt-6"></div>
          </div>
        </>) : error ? (
          <div className="absolute z-50 flex w-3/4 h-24 overflow-hidden bg-white shadow-lg max-w-96 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" height={96} width={16}>
              <path strokeLinecap="round" strokeWidth={2} stroke="indianred" fill="indianred" d="M 8 0 
          Q 4 4.8, 8 9.6 
          T 8 19.2 
          Q 4 24, 8 28.8 
          T 8 38.4 
          Q 4 43.2, 8 48 
          T 8 57.6 
          Q 4 62.4, 8 67.2 
          T 8 76.8 
          Q 4 81.6, 8 86.4 
          T 8 96 
          L 0 96 
          L 0 0 
          Z" />
            </svg>
            <div className="mx-2.5 overflow-hidden w-full">
              <p className="mt-1.5 text-xl font-bold text-[indianred] leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap">
                Error !
              </p>
              <p className="overflow-hidden leading-5 break-all text-zinc-400 max-h-10">
                Oh no!<br />
                Please try again later
              </p>
            </div>
            <button className="w-16 cursor-pointer focus:outline-none">
              <svg className="w-7 h-7" fill="none" stroke="indianred" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        ) : (
          <div className=" product-card w-full rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
            <div className="absolute -left-[20%] top-0 group-hover:rotate-12 transition-all duration-300 group-hover:scale-150">
              <div className="flex gap-1">
                <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth={1} fill="none" viewBox="0 0 28 24" className="fill-gray-300 rotate-[24deg]" height={200} width={200} xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </div>
            <div className="absolute rounded-full bg-gray-500 z-20 left-1/2 top-[22%] h-[110%] w-[110%] -translate-x-1/2 group-hover:top-[40%] transition-all duration-200" />
            <div className="para uppercase text-center leading-none z-40">
              <p className="font-bold text-xl tracking-wider text-gray-500">{name}</p>
            </div>
            <div className="img w-[180px] aspect-square bg-gray-100 z-40 rounded-md ">
              <img src={image} alt="Loading image..." className='rounded-md' />
            </div>
            <div className="btm-_container z-40 flex flex-col sm:flex-row justify-between items-end gap-10">
              <div className="h-[200px] w-[250px]  flex flex-col items-center gap-1 bg-gray-400 rounded-md p-2">
                <div className="inline-flex gap-3 items-center justify-center">
                  <p className="font-semibold  text-white"><span className='text-gray-700'>State: </span>{state}</p>
                </div>
                <div className="inline-flex gap-3 items-center justify-center">
                  <p className="font-semibold  text-white"><span className='text-gray-700'>Constituency:</span>{Constituency}</p>
                </div>
                <div className="inline-flex gap-3 items-center justify-center">
                  <p className="font-semibold  text-white"><span className='text-gray-700'>Party: </span>{Party}</p>
                </div>
                <div className="inline-flex gap-3 items-center justify-center">
                  <p className="font-semibold  text-white "><span className='text-gray-700'>Start Of Term:</span> {StartOfTerm}</p>
                </div>
              </div>
              <div className="h-[200px] w-[250px] flex flex-col items-center gap-1 bg-gray-400 rounded-md p-2">
                <div className=" inline-flex gap-3 items-center justify-center">
                  <p className="font-semibold  text-white">personal details</p>
                </div>
                <div className="inline-flex gap-3 items-center justify-center">
                  <p className="font-semibold  text-white"><span className='text-gray-700'>Age:</span> {age}</p>
                </div>
                <div className="inline-flex gap-3 items-center justify-center">
                  <p className="font-semibold  text-white"><span className='text-gray-700'>Gender:</span> {gender}</p>
                </div>
                <div className="inline-flex gap-3 items-center justify-center">
                  <p className="pl-6 font-semibold  text-white"><span className='text-gray-700'>Education: </span>{education}</p>
                </div>
              </div>
            </div>
            <div className="btn z-100">
              <button className="w-22 h-8 font-semibold text-xs px-2 whitespace-nowrap py-1 rounded-full bg-white text-gray-800 hover:bg-gray-300 hover:text-black hover:cursor-pointer"
                onClick={handleExit}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default MlaDetails