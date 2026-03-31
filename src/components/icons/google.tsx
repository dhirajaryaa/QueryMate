import React from "react";

type GoogleIconProps = {
  size?: number | string;
  className?: string;
};

const GoogleIcon: React.FC<GoogleIconProps> = ({
  size = 24,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M9.827 24c0-1.524.253-2.985.705-4.356L2.623 13.604C1.082 16.734.214 20.26.214 24c0 3.737.867 7.261 2.406 10.388l7.905-6.051A13.9 13.9 0 0 1 9.827 24"
          fill="#FBBC05"
        />
        <path
          d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.094L39.202 6.4C35.036 2.773 29.695.533 23.714.533 14.427.533 6.445 5.844 2.623 13.604l7.909 6.04c1.823-5.532 7.017-9.511 13.182-9.511"
          fill="#EB4335"
        />
        <path
          d="M23.714 37.867c-6.165 0-11.359-3.979-13.182-9.511l-7.909 6.038c3.822 7.761 11.804 13.073 21.091 13.073 5.732 0 11.204-2.035 15.311-5.849l-7.507-5.804c-2.118 1.334-4.786 2.053-7.804 2.053"
          fill="#34A853"
        />
        <path
          d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714V28.8h12.604c-.63 3.091-2.346 5.468-4.8 7.014l7.507 5.804C43.339 37.614 46.145 31.649 46.145 24"
          fill="#4285F4"
        />
      </g>
    </svg>
  );
};

export default GoogleIcon;