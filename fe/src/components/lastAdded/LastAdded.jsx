import React, { useContext, useEffect } from "react";
import CardBlog from "../cardBlog/CardBlog";
import ResponsivePagination from "react-responsive-pagination";
import { GlobalProvider } from "../../context/getContext";
import "react-responsive-pagination/themes/classic.css";

const LastAdded = () => {
  const { getTattooPosts, tattooPosts, currentPage, setCurrentPage, alert } =
    useContext(GlobalProvider);

  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getTattooPosts();
  }, [currentPage]);

  return (
    <div className="max-w-screen-2xl mx-auto">
      {alert && (
        <h5 class="animate-pulse text-center text-green-600 text-xl font-bold my-6">
          {alert}
        </h5>
      )}
      <div className="max-w-screen-2xl mx-auto py-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tattooPosts.posts?.map((singlePost) => (
          <CardBlog key={singlePost._id} {...singlePost} />
        ))}
      </div>{" "}
      <ResponsivePagination
        current={currentPage}
        total={tattooPosts && tattooPosts.totalPages}
        onPageChange={handlePagination}
      />
    </div>
  );
};

export default LastAdded;
