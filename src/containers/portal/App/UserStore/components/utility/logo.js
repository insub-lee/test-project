import React from 'react';
import { Link } from 'react-router-dom';
// import { siteConfig } from '../../config.js';

export default function({ collapsed }) {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">ss</Link>
          </h3>
        </div>
      ) : (
        <h3>ddd</h3>
        </h3>}
    </div>
  );
}
