import React, { useContext, useEffect } from "react";
import { GlobalProvider } from "../../context/getContext";
import CardBlog from "../cardBlog/CardBlog";

const Portfolio = ({ id }) => {
  const { getTattooPostsForCreator, tattooPostsForCreator, alert } =
    useContext(GlobalProvider);

  useEffect(() => {
    getTattooPostsForCreator(id);
  }, []);

  // Numero di colonne nella griglia
  if (tattooPostsForCreator) {
    const numColumns = 4;

    // Calcola la lunghezza ideale di ciascun gruppo
    const idealGroupSize = Math.ceil(tattooPostsForCreator.length / numColumns);

    // Suddividi l'array in gruppi di dimensioni adeguate
    const chunkedImages = [];
    for (let i = 0; i < tattooPostsForCreator.length; i += idealGroupSize) {
      const chunk = tattooPostsForCreator.slice(i, i + idealGroupSize);
      chunkedImages.push(chunk);
    }

    // Ora chunkedImages è un array di gruppi di immagini, ciascuno contenente circa idealGroupSize immagini}

    /* {tattooPostsForCreator?.map((singlePost) => (
          <CardBlog key={singlePost._id} {...singlePost} />
        ))} */
    console.log("nnnnnnnnnnnnnnnnnn", chunkedImages);
    return (
      <>
        {alert && (
          <h5 class="animate-pulse text-center text-green-600 text-xl font-bold my-6">
            {alert}
          </h5>
        )}
        <div class="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {chunkedImages.map((chunk, chunkIndex) => (
            <div key={chunkIndex} class="grid gap-4">
              {chunk.map((singlePost, imageIndex) => (
                <CardBlog key={imageIndex} {...singlePost} />
              ))}
            </div>
          ))}
        </div>
      </>
      // <div class=" grid grid-cols-2 md:grid-cols-4 gap-4">
      //   <div class="grid gap-4">
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
      //         alt=""
      //       />
      //     </div>
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
      //         alt=""
      //       />
      //     </div>
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
      //         alt=""
      //       />
      //     </div>
      //   </div>
      //   <div class="grid gap-4">
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
      //         alt=""
      //       />
      //     </div>
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
      //         alt=""
      //       />
      //     </div>
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
      //         alt=""
      //       />
      //     </div>
      //   </div>
      //   <div class="grid gap-4">
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
      //         alt=""
      //       />
      //     </div>
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
      //         alt=""
      //       />
      //     </div>
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
      //         alt=""
      //       />
      //     </div>
      //   </div>
      //   <div class="grid gap-4">
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
      //         alt=""
      //       />
      //     </div>
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
      //         alt=""
      //       />
      //     </div>
      //     <div>
      //       <img
      //         class="h-auto max-w-full rounded-lg"
      //         src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
      //         alt=""
      //       />
      //     </div>
      //   </div>
      // </div>
    );
  }
};

export default Portfolio;
