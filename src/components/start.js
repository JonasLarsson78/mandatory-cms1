import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';



const Start = (props) => {
    

    return(
        <HelmetProvider>
            <Helmet>
                <title>Blog CMS</title>
            </Helmet>
            <div className="main">
            <h2>Lab CMS Blog 2019</h2>
            <br/><br/>
            <table style={{background: "transparent", border: "none"}}  className="dataTable">
              <tbody>
              <tr className="dataTr">
                <td style={{textAlign: "center", border: "none"}} className="dataTd"><Link to="/page/0"><img alt="loggo" style={{width: "250px"}} src={require('../img/blog.png')}/></Link></td>
              </tr>
              <tr className="dataTr">
                <td style={{textAlign: "center", border: "none", fontSize: "30px"}} className="dataTd"><Link to="/page/0">Enter Blog</Link></td>
              </tr>
              <tr className="dataTr">
                <td style={{textAlign: "center", border: "none", fontSize: "25px"}} className="dataTd"><br/><br/>- Jonas Larsson- CMS Cockpit - EC Utbilding - 2019 -</td>
              </tr>
              </tbody>
            </table>
            </div>
        </HelmetProvider>
    );
}

export default Start;