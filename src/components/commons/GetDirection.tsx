import { Link } from "@yext/pages/components";
import * as React from "react";
import { conversionDetailsDirection} from "../../../sites-global/global";

interface type {
  line1: string,
  line2: string,
  region: string,
  postalCode: number,
  city: string,
  countryCode: string,
  country:string,
}
interface Cta  {
  buttonText: string;  
  latitude?: number;
  longitude?: number;
  address:type;
}
interface address1{
  address:type; 
}

const GetDirection = (props: Cta) => {
  const {
    buttonText,
    latitude,
    address,
    longitude
  } = props;


  const getDirectionUrl = () => {
    let origin: address1 ;
    if (address.city) {
      origin = address.city;
    } else if (address.region) {
      origin = address.region;
    } else {
      origin = address.country;
    }
    if (navigator.geolocation) {
      const error = () => {
        const getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          latitude +
          "," +
          longitude +
          "&origin=" +
          origin + "," + 'US';

        window.open(getDirectionUrl, "_blank");
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // console.log("current lat lang");
          const currentLatitude= position.coords.latitude;
          const currentLongitude = position.coords.longitude;
          const getDirectionUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            latitude +
            "," +
            longitude +
            "&origin=" +
            currentLatitude +
            "," +
            currentLongitude;
          window.open(getDirectionUrl, "_blank");
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  };
  const conversionDetails_direction = conversionDetailsDirection;
  // const conversionDetails_phone = conversionDetailsPhone;

  return (
    <>
      <Link
        data-ya-track="getdirections"
        eventName={`getdirections`}
        className="btn notHighligh"
        onClick={getDirectionUrl}
        href="javascript:void(0);"
        rel="noopener noreferrer"
        conversionDetails={conversionDetails_direction}
      >
        {buttonText}
      </Link>
      {/* <a
     onClick={getDirectionUrl} className="btn notHighlight" rel="noopener noreferrer" >
      <div dangerouslySetInnerHTML={{__html: Directionsvg}}/> */}


      {/* </a> */}
    </>

  );
};

export default GetDirection;
