import React from 'react';
import ContentLoader from 'react-content-loader';
export default () => {
    return (
        <div style={{ paddingLeft:10,paddingTop:10 }}>
             <ContentLoader 
    height={838}
    width={472}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="-1" y="1" rx="0" ry="0" width="466" height="235" /> 
    <circle cx="234" cy="275" r="20" /> 
    <circle cx="328" cy="275" r="20" /> 
    <circle cx="143" cy="275" r="20" /> 
    <circle cx="423" cy="275" r="20" /> 
    <circle cx="47" cy="275" r="20" /> 
    <rect x="32" y="306" rx="0" ry="0" width="30" height="20" /> 
    <rect x="220" y="306" rx="0" ry="0" width="30" height="20" /> 
    <rect x="314" y="306" rx="0" ry="0" width="30" height="20" /> 
    <rect x="407" y="306" rx="0" ry="0" width="30" height="20" /> 
    <rect x="126" y="306" rx="0" ry="0" width="30" height="19" /> 
    <rect x="165" y="359" rx="0" ry="0" width="141" height="19" /> 
    <rect x="2" y="408" rx="0" ry="0" width="234" height="139" /> 
    <rect x="147" y="450" rx="0" ry="0" width="0" height="1" /> 
    <rect x="4" y="546" rx="0" ry="0" width="234" height="139" /> 
    <rect x="235" y="544" rx="0" ry="0" width="234" height="139" /> 
    <rect x="235" y="407" rx="0" ry="0" width="234" height="139" /> 
    <rect x="193" y="709" rx="0" ry="0" width="83" height="22" />
  </ContentLoader>
        </div>
    );
}