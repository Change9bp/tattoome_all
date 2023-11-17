import React from "react";
import { Dropdown } from "flowbite-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { city, nation, region } from "../../data/tabelleDropdown";

const animatedComponents = makeAnimated();

const DropDownBar = () => {
  return (
    <div className="max-w-screen-md py-8 px-4 grid grid-cols-4 mx-auto">
      <span className="m-auto font-bold">Filtra i contenuti:</span>
      <div className="mb-2 block">
        <Select
          placeholder="Select Nation"
          id="selectNation"
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={nation}
          required
        />
      </div>
      {/* <Dropdown label="Regione" dismissOnClick={false}>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown> */}
      <div className="mb-2 block">
        <Select
          placeholder="Select Region"
          id="selectNation"
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={region}
          required
        />
      </div>
      <div className="mb-2 block">
        <Select
          placeholder="Select City"
          id="selectNation"
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={city}
          required
        />
      </div>
    </div>
  );
};

export default DropDownBar;
