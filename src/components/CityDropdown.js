import React, { useState } from "react";
import tw from "twin.macro";

const DropdownContainer = tw.div`
mb-6
mt-6
pr-5
pl-14
inline-block
items-center
`;

const DropdownText = tw.h2`
  text-xl
text-gray-600
  mr-6
`;

const Select = tw.select`
  h-8
  border-2
  border-solid
  border-green-500
  outline-none
  p-0
  rounded-lg
  bg-transparent
`;



const CityDropdown = () => {

    const [selects, setSelects] = useState();
  return (
      <DropdownContainer>
          <DropdownText>Select City: </DropdownText>
          <Select value={selects} onChange={e => setSelects(e.target.value)}>
            <option value="Mumbai">Mumbai</option>
            <option value="New Delhi">New Delhi</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Banglore">Banglore</option>
            <option value="Pune">Pune</option>
          </Select>
      </DropdownContainer>
  );
};

export default CityDropdown;
