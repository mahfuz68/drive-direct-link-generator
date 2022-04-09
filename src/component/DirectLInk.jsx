import React, { useEffect, useState } from "react";

export default function DirectLInk() {
  const [inputLink, setInputLInk] = useState("");
  const [outputLink, setOutputLink] = useState("");
  const [isPast, setIsPast] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const updateLink = (e) => {
    setInputLInk(e.target.value);
  };

  const clearAllState = () => {
    setInputLInk("");
    setIsPast(false);
    setOutputLink("");
    setIsCopy(false);
  };

  useEffect(() => {
    const directLink = () => {
      const fileID = inputLink.split("/")[5];
      const api = "AIzaSyA_CwzBxLIpBMvVwZ-39rzzfI5feWZ-O8w";
      const outputHLink = `https://www.googleapis.com/drive/v3/files/${fileID}?alt=media&key=${api}`;
      setOutputLink(outputHLink);
      return fileID;
    };
    inputLink !== "" ? directLink() : null;
  }, [inputLink]);

  const pasteText = () => {
    navigator.clipboard.readText().then((text) => {
      setInputLInk(text);
      setIsPast(true);
    });
  };
  const copyText = () => {
    navigator.clipboard.writeText(outputLink).then(() => {
      setIsCopy(true);
    });
  };

  return (
    <div className="flex justify-center pt-20">
      <div>
        <h1 className="text-center text-2xl">Input Your File Drive Link</h1>
        <div className="flex justify-center gap-4">
          <input
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mt-4 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="input your drive share link"
            value={inputLink}
            onChange={updateLink}
            onDoubleClick={pasteText}
          />
          <button type="button" onClick={pasteText}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={
                isPast
                  ? "h-7 w-7 mt-4 mx-2 text-emerald-700"
                  : " mt-4 mx-2 h-7 w-7"
              }
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </button>
        </div>
        <div
          className={
            outputLink !== "" ? "flex justify-center gap-4 mt-4" : "hidden"
          }
        >
          <input
            className="active:outline-none focus:outline-none p-2.5 text-sm"
            type="text"
            value={outputLink}
          />

          <button type="button" onClick={copyText}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={
                isCopy
                  ? "h-7 w-7 mt-4 mx-2 text-green-700"
                  : " mt-4 mx-2 h-7 w-7"
              }
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </button>
        </div>
        <button
          className="mt-4 px-2 py-1 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          type="button"
          onClick={clearAllState}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
