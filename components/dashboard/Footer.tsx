import React, { memo } from "react";
import PropTypes from "prop-types";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="float-right d-none d-sm-block">
        {/* <b>Version</b> 3.0.5 */}
    </div>
      {/* <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.</strong> All rights
    reserved. */}
    </footer>
  );
};

export default memo(Footer);
