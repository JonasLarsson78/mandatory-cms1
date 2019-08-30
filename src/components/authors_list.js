import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const API_ROOT = "http://192.168.99.100:8080";
const URL = "/api/collections/get/authors";
const TOKEN = "?token=8b36c2e14defaa4945a51694b61b3e";


const AuthorList = () => {

    const [authors, updateAuthors] = useState([]);

    
       useEffect(() => {
        axios.get(API_ROOT + URL + TOKEN)
        .then(response => {
           updateAuthors(response.data.entries);
       })
      }, []);

      const goBack = () => {
        window.history.back();
      }

      const renderAuthors = (data) => {
  
        return(
          <div key={data._id}>
          <table className="dataTable">
            <thead>
              <tr className="dataTr">
                  <th className="dataTh"><img alt="author" style={{borderRadius:"40px"}} width="40px" src={API_ROOT + "/" + data.avatar.path}/><Link to={"/author/" + data._id}>{data.name}</Link></th>
              </tr>
            </thead>
            
          </table>
          <br/>
          <br/>
          </div>
        )
      }

      let data = authors.map(renderAuthors);

      return(
          <>
          <h2>Author List</h2>
          {data}
          <button onClick={goBack}>Back</button>
          </>
      );

    }

export default AuthorList;