import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDebounce } from '../hooks';
import { getCountries } from '../api/country';

const emptyCountryResult = { status: 'empty', items: [] };

export default function Index() {
  document.title = 'Country';
  const navigate = useNavigate();

  const [country, setCountry] = useState({
    name: '',
  });

  const [allDataCountry, setAllDataCountry] = useState(emptyCountryResult);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCountry((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const debouncedCheck = useDebounce(country.name, 1000);
  const searchQuery = debouncedCheck.trim();
  const onSearch = country.name.trim().length > 0;

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchDataCountry = async () => {
      if (searchQuery.length === 0) {
        setAllDataCountry(emptyCountryResult);
        return;
      }

      setAllDataCountry({ status: 'loading', items: [] });

      try {
        const response = await getCountries(searchQuery);
        const data = Array.isArray(response.data) ? response.data : [];

        if (!isCurrentRequest) {
          return;
        }

        setAllDataCountry(
          data.length > 0
            ? { status: 'found', items: data }
            : { status: 'not_found', items: [] },
        );
      } catch (error) {
        if (isCurrentRequest) {
          setAllDataCountry({ status: 'not_found', items: [] });
        }
      }
    };

    fetchDataCountry();

    return () => {
      isCurrentRequest = false;
    };
  }, [searchQuery]);

  const showSearchResult = onSearch && allDataCountry.status !== 'empty';

  const renderSearchResult = () => {
    if (allDataCountry.status === 'loading') {
      return <div className="w-full px-6 py-1 overflow-hidden">Searching...</div>;
    }

    if (allDataCountry.status === 'not_found') {
      return <div className="w-full px-6 py-1 overflow-hidden text-red-500">Data not found</div>;
    }

    return allDataCountry.items.slice(0, 5).map((data, i) => {
      return (
        <div
          key={`${data?.cca3 || data?.name?.common || 'country'}-${i}`}
          className="w-full px-6 py-1 overflow-hidden cursor-pointer hover:bg-[#F4F4F4]"
          onClick={() => {
            navigate('/detail', { state: data });
          }}
        >
          {data.name?.common || 'Unknown country'}
        </div>
      );
    });
  };

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
              {showSearchResult && (
                <div className="absolute w-full py-1.5 mt-3 bg-white rounded-md drop-shadow">
                  {renderSearchResult()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
