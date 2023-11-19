import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import Nominatim from "nominatim-geocoder";
import { GlobalProvider } from "../../context/getContext";

const InfoCreator = ({ id }) => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const { getInfoSingleCreator, infoSingleCreator } =
    useContext(GlobalProvider);
  const { avatar, role, name, lastName, email, nation, region, city, address } =
    infoSingleCreator;

  const geocoder = new Nominatim();

  const geoGeo = async () => {
    await geocoder
      .search({
        q: `${address},${city},${nation}`,
      })
      .then((response) => {
        console.log("response di geocoder", response);
        setLat(response[0].lat);
        setLon(response[0].lon);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInfoSingleCreator(id);
  }, [id]);

  useEffect(() => {
    geoGeo();
  }, [infoSingleCreator]);

  return (
    <div className="mt-8 max-w-xs sm:max-w-sm md:max-w-screen-sm lg:max-w-screen-lg mx-auto flex flex-col bg-white border border-gray-200 rounded-3xl shadow lg:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="object-cover w-full lg:w-1/2 rounded-t-3xl h-full lg:rounded-l-3xl lg:rounded-r-none"
        src={avatar}
        alt="CREATOR IMAGE"
      />

      <div className="bg-gray-50 rounded-3xl flex flex-col w-full lg:w-1/2 justify-between p-4 leading-normal">
        <h2 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white">
          Informazioni{" "}
          <mark class="px-2 text-white bg-slate-500 rounded dark:bg-slate-500">
            artista
          </mark>
        </h2>
        <p className="mb-3 text-center text-4xl font-normal text-slate-700 dark:text-gray-400">
          {name} {lastName}
        </p>
        <div className="m-4 grid grid-cols-3">
          <div className="flex flex-col items-center truncate">
            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
              Nazione
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {nation}
            </p>
          </div>
          <div className="flex flex-col items-center truncate">
            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
              Regione
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {region}
            </p>
          </div>
          <div className="flex flex-col items-center truncate">
            <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
              Città
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {city}
            </p>
          </div>
        </div>
        <p className="m-6 text-center font-normal text-gray-700 dark:text-gray-400">
          Indirizzo: {address}
        </p>

        <div className="h-72">
          {lat && (
            <MapContainer
              className="h-full"
              center={[lat, lon]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, lon]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCreator;
