
import React from "react";

type HopeLinkLogoProps = {
  className?: string;
};

const HopeLinkLogo: React.FC<HopeLinkLogoProps> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm0 32c106 0 192 86 192 192s-86 192-192 192S64 362 64 256 150 64 256 64z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M160 144v96h64v128h32V240h96v-32h-96v-64h-32v64h-64z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M320 144h32v32h-32v-32zm0 64h32v128h-32V208z"
      />
    </svg>
  );
};

export default HopeLinkLogo;
