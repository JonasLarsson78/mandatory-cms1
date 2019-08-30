import React, {useState, useEffect} from 'react';
import axios from 'axios';


const API_ROOT = "http://192.168.99.100:8080";
const URL = "/api/collections/get/authors";
const TOKEN = "?token=8b36c2e14defaa4945a51694b61b3e";


const Authors = (props) => {

    const id =  props.match.params.id;
    const [bloggAuthor, updateBloggAuthor] = useState([]);

    
       useEffect(() => {
        axios.get(API_ROOT + URL + TOKEN + "&filter[_id]=" + id)
        .then(response => {
           updateBloggAuthor(response.data.entries);
       })
      }, [id]);

      const goBack = () => {
        window.history.back();
      }


      const renderAuthor = (data) => {
  
      return(
        <div key={data._id}>
        <table className="dataTable">
          <thead>
            <tr className="dataTr">
                <th className="dataTh"><img alt="author" style={{borderRadius:"80px"}} width="80px" src={API_ROOT + "/" + data.avatar.path}/></th>
            </tr>
            <tr className="dataTr">
              <th className="dataTh">{data.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="dataTr">
              <td className="dataTd" colSpan="2">{data.description}</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <br/>
        </div>
      )
    }
    let data = bloggAuthor.map(renderAuthor);


    return(
        <>
        <h2>Author</h2>
        {data}
        <button onClick={goBack}>Back</button>
        </>
    );
}

export default Authors;