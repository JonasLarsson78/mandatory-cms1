import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';


const API_ROOT = "http://192.168.99.100:8080";
const URL = "/api/collections/get/articles";
const TOKEN = "?token=8b36c2e14defaa4945a51694b61b3e";


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
              <td className="dataTd">{author}</td>
              <td className="dataTd dataTime">{data.published_on}</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <br/>
        </div>
      )
    }

    let data = bloggSpot.map(renderBloggSpot);


    return(
        <>
        <h2>Read Blogg</h2>
        {data}
        <Link to={"/"}><button >Back to List</button></Link>
        </>
    );
}

export default Read;