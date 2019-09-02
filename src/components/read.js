import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';


const API_ROOT = "https://blogcockpit.devspace.host";
const URL = "/api/collections/get/articles";
const TOKEN = "?token=44411d81e1195c4e76130cff19b3ea";


const Read = (props) => {
    const id =  props.match.params.id;
    const [bloggSpot, updateBloggSpot] = useState([]);

    
       useEffect(() => {
        axios.get(API_ROOT + URL + TOKEN + "&filter[_id]=" + id)
        .then(response => {
           updateBloggSpot(response.data.entries);
       })
      }, [id]);

       const renderBloggSpot = (data) => {
        const test = (data, index) => {

          return(
              <div key={index}><Link to={"/author/" + data._id}>{data.display}</Link></div>
          );
        }
        
  
      let author = data.author.map(test)
      const input = data.body;  
      return(
        <div key={data._id}>
        <table className="dataTable">
          <thead>
            <tr className="dataTr">
              <th className="dataTh" colSpan="2">{data.title}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="dataTr">
              <td className="dataTd" colSpan="2"><ReactMarkdown source={input} /></td>
            </tr>
            <tr className="dataTr">
              <td className="dataTd"><b>Author:</b>{author}</td>
              <td className="dataTd dataTime"><b>Published:</b><br/>{data.published_on}</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <br/>
        </div>
      )
    }

    let data = bloggSpot.map(renderBloggSpot);
    const goBack = () => {
        window.history.back();
      }

    return(
        <div className="main">

        <h2>Read Blogg</h2>
        <button onClick={goBack}>Back to List</button>
        <br/><br/>
        {data}
        
        </div>
    );
}

export default Read;