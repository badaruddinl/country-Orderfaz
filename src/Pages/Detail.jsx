import React, { useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllCallingCode, getAllCurrency } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';

export default function Detail() {
  document.title = 'Detail Info - Country';
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hoverCurency, setHoverCurrency] = useState(false);
  const [hoverCallingCode, setHoverCallingCode] = useState(false);

  const { dataCallingCode } = useSelector((state) => state.callingCodeReducer);
  const { dataAllCurrency } = useSelector((state) => state.currencyReducer);

  const country = location.state;

  if (country === null) {
    navigate('/');
  }

  const detailCountry = {
    name: country.name.common,
    flag: { icon: country.flags.svg, alt: country.flags.alt },
    spelling: country.altSpellings,
    latitude: country.latlng[0],
    longitude: country.latlng[1],
    capital: country.capital[0],
    region: country.region,
    subRegion: country.subregion,
    callingCode: country.idd.root.replace('+', ''),
    suffixes: country.idd.suffixes.length === 1 ? country.idd.suffixes[0] : '',
    currency: Object.keys(country.currencies)[0],
  };

  const callingCodeDatas = {
    total: dataCallingCode.length,
    country: dataCallingCode,
  };

  const currencyDatas = {
    total: dataAllCurrency.length,
    country: dataAllCurrency,
  };

  const fetchDataCallingCode = () => {
    let callingCode = detailCountry.callingCode + '' + detailCountry.suffixes;
    if (detailCountry.callingCode === 1 || detailCountry === 7) {
      callingCode = detailCountry.callingCode;
    }
    dispatch(getAllCallingCode(parseInt(callingCode)));
  };

  const fetchDataCurrency = () => {
    let currency = detailCountry.currency;
    dispatch(getAllCurrency(currency));
  };

  useEffect(() => {
    fetchDataCallingCode();
  }, []);

  useEffect(() => {
    fetchDataCurrency();
  }, []);

  return (
    <div className="px-5 my-4 md:px-24">
      <button
        className="py-2 pl-4 pr-4 text-white bg-[#8362F2] rounded-lg"
        onClick={() => {
          navigate('/');
        }}
      >
        <div className="flex flex-row items-center justify-center space-x-2">
          <span>
            <BsArrowLeftShort className="inline-flex" strokeWidth={0.8} size={30} />
          </span>
          <span>Back to Homepage</span>
        </div>
      </button>
      <div className="mt-10">
        <p className="text-4xl font-bold">
          {detailCountry.name}{' '}
          <span className="inline-flex">
            <img src={detailCountry.flag.icon} width={30} alt={detailCountry.flag.alt} />
          </span>
        </p>
      </div>
      <div className="flex flex-wrap mb-2 max-w-max">
        {detailCountry.spelling.map((dataSpelling, i) => {
          return (
            <div
              key={i}
              className="px-3 py-1 mt-2 mr-2 font-semibold text-white rounded-full bg-[#8DD4CC] max-w-fit"
            >
              {dataSpelling}
            </div>
          );
        })}
      </div>
      <div className="pt-5">
        <div className="flex flex-col w-full mb-0 md:flex-row md:mb-4">
          <div className="relative w-full mb-4 mr-4 bg-gray-50 min-h-[160px] md:w-1/2 shadow-md overflow-hidden bg-opacity-10">
            <div className="w-full ">
              <div className="px-6 py-6 space-y-4">
                <p className="text-2xl font-medium ">LatLong</p>
                <p className="text-6xl font-semibold text-indigo-600">
                  {detailCountry.latitude}, {detailCountry.longitude}
                </p>
              </div>
            </div>
            <img
              src="/globe.svg"
              alt="globe"
              className="absolute right-0 w-32 -mt-5 md:w-56 top-1/2 md:-mt-10 "
            />
          </div>
          <div className="w-full mb-4 mr-4 bg-gray-50 min-h-[160px] md:w-1/2 shadow-md overflow-hidden bg-opacity-10">
            <div className="w-full ">
              <div className="flex flex-col px-6 py-6 space-y-2 text-2xl ">
                <div>
                  <span className="medium"> Capital:</span>{' '}
                  <span className="font-semibold"> {detailCountry.capital}</span>
                </div>
                <div>
                  <span className="medium"> Region:</span>{' '}
                  <span className="font-semibold"> {detailCountry.region}</span>
                </div>
                <div>
                  <span className="medium"> Subregion:</span>{' '}
                  <span className="font-semibold"> {detailCountry.subRegion}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:flex-row ">
          <div className="w-full mb-4 mr-4 md:w-1/2 ">
            <div className="w-full">
              <div className="space-y-3 ">
                <p className="text-3xl font-medium ">Calling Code</p>
                <p className="text-6xl font-semibold text-[#8362F2]">
                  {detailCountry.callingCode}
                  {detailCountry.suffixes}
                </p>
                <p className="text-xl font-medium ">
                  <span
                    className="relative text-[#8362F2] underline cursor-pointer"
                    onMouseEnter={() => {
                      setHoverCallingCode(true);
                    }}
                    onMouseLeave={() => {
                      setHoverCallingCode(false);
                    }}
                  >
                    {callingCodeDatas.total} country
                  </span>{' '}
                  {hoverCallingCode && (
                    <div className="absolute -mt-1.5">
                      <div className="flex flex-row justify-start h-3 ml-4 overflow-hidden">
                        <div className="w-5 h-5 mt-1.5 rotate-45 bg-[#525252] rounded-md" />
                      </div>
                      <div className="px-3 py-1 font-light text-white bg-[#525252] rounded-md w-fit">
                        {callingCodeDatas.country.map((dataName, i) => {
                          return <p key={i}>{dataName.name}</p>;
                        })}
                      </div>
                    </div>
                  )}
                  with this calling code
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mb-4 mr-4 md:w-1/2 ">
            <div className="w-full">
              <div className="space-y-3 ">
                <p className="text-3xl font-medium ">Currency</p>
                <p className="text-6xl font-semibold text-[#8362F2]">{detailCountry.currency}</p>
                <p className="text-xl font-medium ">
                  <span
                    className="relative text-[#8362F2] underline cursor-pointer"
                    onMouseEnter={() => {
                      setHoverCurrency(true);
                    }}
                    onMouseLeave={() => {
                      setHoverCurrency(false);
                    }}
                  >
                    {currencyDatas.total} country
                  </span>{' '}
                  {hoverCurency && (
                    <div className="absolute -mt-1.5">
                      <div className="flex flex-row justify-start h-3 ml-4 overflow-hidden">
                        <div className="w-5 h-5 mt-1.5 rotate-45 bg-[#525252] rounded-md" />
                      </div>
                      <div className="px-3 py-1 font-light text-white bg-[#525252] rounded-md w-fit">
                        {currencyDatas.country.map((dataName, i) => {
                          return <p key={i}>{dataName.name}</p>;
                        })}
                      </div>
                    </div>
                  )}
                  with this currency
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
