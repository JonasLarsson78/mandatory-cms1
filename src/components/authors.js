import React, {useState, useEffect} from 'react';
import axios from 'axios';


const API_ROOT = "https://blogcockpit.devspace.host";
const URL = "/api/collections/get/authors";
const TOKEN = "?token=44411d81e1195c4e76130cff19b3ea";


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
        <div className="main">
        <h2>Author</h2>
        
        <button onClick={goBack}>Back</button>
        <br/><br/>
        {data}
        </div>
    );
}

export default Authors;