function PostsCard({ posts }) {
  return (
    <>
    
      <div className="d-flex flex-wrap justify-content-start p-2">
        <div className="d-flex ">
          <div className="card" style={{ width: "18rem" }}>
            <img src={posts.image} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title"><a href={posts.url}>{posts.title}</a></h5>
              <p className="card-text">{posts.description}</p>
            </div>
          </div>
        </div>
      </div>





      
    </>
  );
}

export default PostsCard;
