'use client'
import { Country } from '@/config/typeings';
import React, { useState, useMemo, useEffect } from 'react';

interface CountryPickerProps{
    selectedCountry:Country | null
    setSelectedCountry:(data:Country) => void
}

const fetchCountries = async () =>{
    const data = await (await fetch("life-expecatancy/all")).json()
    if(data){
        return data.data as Country[]
    }else{
        return []
    }
}

const CountryPicker: React.FC<CountryPickerProps> = ({selectedCountry,setSelectedCountry}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [countries,setCountries] = useState<Country[]>([])
  
  const filteredCountries = useMemo(() => {
    return countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [countries, searchTerm]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  useEffect(() =>{
    fetchCountries().then((countries) =>{
        setCountries(countries)
    })
  },[])

  return (
    <div className="relative inline-block text-left w-64">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {selectedCountry ? selectedCountry.name : 'Select a country'}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <input
              type="text"
              className="block w-full px-4 py-2 text-sm text-gray-700 border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="max-h-60 overflow-auto">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => selectCountry(country)}
                >
                  {country.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryPicker;