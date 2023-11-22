import React, { useContext, useEffect } from "react";
import { GlobalProvider } from "../../context/getContext";
import CardBlogPortfolio from "../cardBlog/CardBlogPortfolio";
import Masonry from "react-masonry-css";
import "./portfolio.css";

const breackPointColCustom = {
  default: 5,
  640: 2,
  768: 3,
  1024: 4,
};

const Portfolio = ({ id }) => {
  const { getTattooPostsForCreator, tattooPostsForCreator, alert } =
    useContext(GlobalProvider);

  useEffect(() => {
    console.log("è questo l'ID", id);
    getTattooPostsForCreator(id);
  }, []);

  return (
    <div className="px-4">
      {alert && (
        <h5 class="animate-pulse text-center text-green-600 text-xl font-bold my-6">
          {alert}
        </h5>
      )}
      <Masonry
        breakpointCols={breackPointColCustom}
        className="my-masonry-grid max-w-screen-2xl mx-auto gap-4"
        columnClassName="my-masonry-grid_column"
      >
        {tattooPostsForCreator.map((singlePost) => (
          <CardBlogPortfolio key={singlePost._id} {...singlePost} />
        ))}
      </Masonry>
    </div>
  );
};

export default Portfolio;
