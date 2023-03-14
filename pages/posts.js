//Only for learning to connect Mongo And NextJS 
// pages/posts.js 

import { useEffect, useState } from "react";
import Router from 'next/router';

export default function Home({ posts }) {
  const [postsState, setPostsState] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPostsState(posts.data);
    console.log("posts:", posts.data)
  }, [posts]);

  let submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    res = await res.json();
    setPostsState([...postsState, res]);
    setTitle("");
    setContent("");
    setLoading(false);
  };

  return (
    <div className="container">
      <div>
        <div>
          {postsState?.map((post, index) => {
            return (
              <div className="card" key={index}>
                <h2>{post.fName}</h2>
                <p>{post.lName}</p>
              </div>
            );
          })}
        </div>

        <div className="add-form">
          <form onSubmit={submitForm}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              type="text"
              name="content"
              rows="10"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit" disabled={loading ? true : false}>
              {loading ? "Adding" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

//Yes, getServerSideProps is a Next.js API that runs on the server-side (backend) 
//before rendering the component in the client-side (frontend). It allows you to fetch data 
//from an external API or a database and pass it as props to a page component.

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;
  // console.log("cOOOKIES", cookies)
  let res = await fetch("http://localhost:3000/api/getUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Cookie': cookies
      
    },
  });

   let posts = await res.json();
    console.log(posts.data)
    
    // handle response data (can have error returns and redirect and display msgs)
    if(posts.status == 200){
      return {
        props: { posts },
      };
    }else{
        //This wont work bc this runs on the server side and cant use Router. Prob won't use server side rendering. 
        // Router.push('/register')

    }

}