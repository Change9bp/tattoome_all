import React from "react";

const PostDetails = () => {
  return (
    <div className="max-w-xl mx-auto">
      <h1 class="text-5xl font-extrabold dark:text-white">
        Titolo
        <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">
          Questo tatuaggio si chiama ciao!
        </small>
      </h1>

      <img
        class="h-auto max-w-full"
        src="https://images.pexels.com/photos/18938170/pexels-photo-18938170/free-photo-of-donna-seduto-pendente-tatuaggio.jpeg?auto=compress&cs=tinysrgb&w=1280"
        alt="image description"
      />

      <h5 class="text-xl font-bold dark:text-white">Descrizione</h5>

      <p class="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
        Track work across the enterprise through an open, collaborative
        platform. Link issues across Jira and ingest data from other software
        development tools, so your IT support and operations teams have richer
        contextual information to rapidly respond to requests, incidents, and
        changes.
      </p>
      <svg
        className="mx-auto mb-3 h-10 w-10 text-gray-400 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 14"
      >
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
      </svg>
      <p class="text-gray-500 dark:text-gray-400">
        Deliver great service experiences fast - without the complexity of
        traditional ITSM solutions.Accelerate critical development work,
        eliminate toil, and deploy changes with ease, with a complete audit
        trail for every change.
      </p>
    </div>
  );
};

export default PostDetails;
