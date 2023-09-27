import React from "react";
import { Helmet } from "react-helmet-async";

function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "Welcome to PlaceHolder Shop",
  descriptions: "We sell the best products for cheaper rates",
  keywords: "electronics, buy electronics, cheap electronics",
};
export default Meta;
