import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_ROOT = "http://192.168.99.100:8080";
const URL = "/api/collections/get/articles";
const TOKEN = "?token=8b36c2e14defaa4945a51694b61b3e";


const List = (props) => {
    const [bloggList, updateBloggList] = useState([]);
    const [skip, updatSkip] = useState(0);
    
    const nextList = useRef(null);
    const prevList = useRef(null);

    let max = null;

    

    useEffect(() => {
        if(skip === 0){
            prevList.current.disabled = "disabled";
        }
        axios.get(API_ROOT + URL + TOKEN + "&limit=5&skip=" + skip + "&sort[published_on]=-1")
        .then(response => {
           updateBloggList(response.data.entries);
       })
      }, [skip]);


      const renderBloggList = (data) => {
          const test = (data, index) => {

            return(
                <div key={index}><Link to={"/author/" + data._id}>{data.display}</Link></div>
            );
          }
    
        let author = data.author.map(test)
    
        return(
          <div key={data._id}>
          <table className="dataTable">
            <thead>
              <tr className="dataTr">
                <th className="dataTh" colSpan="2"><Link to={"/read/" + data._id }>{data.title}</Link></th>
              </tr>
            </thead>
            <tbody>
              <tr className="dataTr">
                <td className="dataTd"><b>Author/s:</b>{author}</td>
                <td className="dataTd dataTime"><b>Published:</b><br/>{data.published_on}</td>
              </tr>
            </tbody>
          </table>
          <br/>
          <br/>
          </div>
        )
      }
      const next = () => {
        updatSkip(skip + 5);
        prevList.current.disabled = "";
          if (skip > max){
            nextList.current.disabled = "disabled";
          }
          
      }
      const back = () => {
          if (skip > 0){
              updatSkip(skip - 5);
          }
          nextList.current.disabled = "";
    }

      let data = bloggList.map(renderBloggList);

    return(
        <>
        <h2>Lab CMS Blogg</h2>
        {data}
        <Link to={"/authors"}><button>Authors List</button></Link>
        <Link to="/" onClick={back}><button ref={prevList}>Prev Page</button></Link>
        <Link to={"/"} onClick={next}><button ref={nextList}>Next Page</button></Link>
        </>
    );
}

export default List;