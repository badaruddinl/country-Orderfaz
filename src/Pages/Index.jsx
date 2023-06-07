import React, { useState, navigate, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDebounce } from '../hooks';
import api from '../api';

export default function Index() {
  document.title = 'Country';
  navigate = useNavigate();

  const [onSearch, setOnSearch] = useState(false);

  const [country, setCountry] = useState({
    name: '',
  });

  const [allDataCountry, setAllDataCountry] = useState([]);

  const handleChange = (e) => {
    let newVal = { ...country };
    newVal[e.target.name] = e.target.value;
    setCountry(newVal);
  };

  const debouncedCheck = useDebounce(country.name, 1000);

  const fetchDataCountry = () => {
    if (debouncedCheck.length > 0) {
      if (country.name === '') {
        setAllDataCountry({ status: 'empty', items: [] });
        return;
      }
      api
        .get(`/v3.1/name/${country.name}`)
        .then((res) => {
          let data;
          data = res.data;
          if (data.length !== 0) {
            setAllDataCountry({ status: 'found', items: data });
          } else {
            setAllDataCountry({ status: 'not_found', items: [] });
          }
        })
        .catch((error) => {
          setAllDataCountry({ status: 'not_found', items: [] });
        });
    } else {
      setAllDataCountry({ status: 'empty', items: [] });
    }
  };

  useEffect(() => {
    fetchDataCountry();
  }, [debouncedCheck, onSearch]);

  useEffect(() => {
    if (country?.name?.length > 0) {
      setOnSearch(true);
    } else {
      setOnSearch(false);
    }
  }, [country.name]);

  return (
    <div className="px-5 md:px-24">
      <div className="flex items-center w-full h-screen justify-items-center">
        <div className="flex flex-col w-screen space-y-6 md:space-y-10 justify-items-center">
          <p className="text-4xl font-semibold text-center md:text-6xl">Country</p>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="relative w-1/2">
              <div className="relative flex items-center justify-center">
                <input
                  type="text"
                  className="w-full py-3 pl-6 pr-10 border-2 border-transparent rounded-md outline-black focus:outline-none outline focus:border-[#8362F2] focus:border-2"
                  name="name"
                  value={country.name}
                  onChange={handleChange}
                  placeholder="Type any country name"
                />
                <AiOutlineSearch
                  className={`absolute right-0 mr-3 text-2xl cursor-pointer ${
                    onSearch ? 'fill-[#8362F2]' : 'black'
                  }`}
                />
              </div>
              {onSearch && (
                <>
                  {allDataCountry.items.length > 0 && (
                    <div className="absolute w-full py-1.5 mt-3 bg-white rounded-md drop-shadow">
                      {allDataCountry.items.length > 0 && (
                        <>
                          {allDataCountry.items.slice(0, 5).map((data, i) => {
                            return (
                              <div
                                key={i}
                                className="w-full px-6 py-1 overflow-hidden cursor-pointer hover:bg-[#F4F4F4]"
                                onClick={() => {
                                  navigate('detail', { state: data });
                                }}
                              >
                                {data.name.common}
                              </div>
                            );
                          })}
                        </>
                      )}
                      {allDataCountry.status === 'not_found' && (
                        <>
                          <div className="w-full px-6 py-1 overflow-hidden text-red-500">
                            Data not found
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
