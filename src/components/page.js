import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const API_ROOT = "http://192.168.99.100:8080";
const URL = "/api/collections/get/articles";
const TOKEN = "?token=8b36c2e14defaa4945a51694b61b3e";


const Page = (props) => {
    
    const page =  props.match.params.page * 5;
    
    const [bloggList, updateBloggList] = useState([]);
    const [max, updateMax] = useState(null);
    const nextList = useRef(null);
    const prevList = useRef(null);

    useEffect(() => {
        
        axios.get(API_ROOT + URL + TOKEN )
        .then(response => {
           updateMax(response.data.entries.length);
       })
      }, [max]);


    

    useEffect(() => {
        
        if(page === 0){
            prevList.current.disabled = "disabled";
        }
        else{
            prevList.current.disabled = "";
        }
       
        axios.get(API_ROOT + URL + TOKEN + "&limit=5&skip=" + page + "&sort[published_on]=-1")
        .then(response => {
           updateBloggList(response.data.entries);
           const length = response.data.entries.length;

           if (max === page + length){
            nextList.current.disabled = "disabled";
            nextList.current.innerHTML = "End";
           }
           else{
            nextList.current.disabled = "";
            nextList.current.innerHTML = "Next Page";
           }
       })
      }, [page, max]);


      const renderBloggList = (data) => {
          const renderAuthors = (data, index) => {

            return(
                <div key={index}><Link to={"/author/" + data._id}>{data.display}</Link></div>
            );
          }
    
        let author = data.author.map(renderAuthors)
        const input = data.body.substring(0,100).concat(' ', ". . . .");
        
        return(
          <div key={data._id}>
          <table className="dataTable">
            <thead>
              <tr className="dataTr">
                <th className="dataTh" colSpan="3"><Link to={"/read/" + data._id }>{data.title}</Link></th>
              </tr>
            </thead>
            <tbody>
              <tr className="dataTr">
                <td className="dataTd"><ReactMarkdown source={input} /></td>
                <td className="dataTd" width="150px"><b>Author:</b>{author}</td>
                <td className="dataTd dataTime"><b>Published:</b><br/>{data.published_on}</td>
              </tr>
            </tbody>
          </table>
          <br/>
          
          </div>
        )
      }
     

      let data = bloggList.map(renderBloggList);
      let next = Number(props.match.params.page) + 1;
      let prev = Number(props.match.params.page) - 1;

    return(
        <HelmetProvider>
            <Helmet>
                <title>Blogg CMS</title>
            </Helmet>
            <div className="main">
            <h2>Blog</h2>
            
            <Link to={"/authors"}><button>Authors List</button></Link>
            <Link to={"/"} ><button>Home</button></Link>
            <Link to={"/page/" + prev} ><button ref={prevList}>Prev Page</button></Link>
            <Link to={"/page/" + next} ><button ref={nextList}>Next Page</button></Link>
            <br/><br/>
            <div className="test">{data}</div>
            </div>
        </HelmetProvider>
    );
}

export default Page;