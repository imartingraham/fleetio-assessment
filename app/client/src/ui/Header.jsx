import React from "react";
import PropTypes from "prop-types";

const Header = ({ imgSrc, headerText }) => (
  <div className="flex justify-center align-center py-8 md:py-12">
    <img src={imgSrc} alt={headerText} className="h-8 w-auto sm:h-10" />

    <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl ml-2">
      {headerText}
    </h1>
  </div>
);

Header.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
};

export default Header;
