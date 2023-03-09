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
      const outputHLink = `https://www.googleapis.com/drive/v3/files/${fileID}?alt=media&key=${import.meta.env.VITE_API}`;
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
    <div className="h-full bg-gray-900 text-white flex justify-center pt-20">
      <div>
        <h1 className="text-center text-2xl">Input Your File Drive Link</h1>
        <h3 className="text-center text-sm text-rose-300 mt-2 sm:hidden">
          Must be use google file not folder
          <br /> and shareable link like:
        </h3>
        <h3 className="text-center text-sm text-rose-600 mt-2 hidden sm:block">
          Must be use google file not folder and shareable link like:
        </h3>
        <h4 className="text-sm text-blue-400 hidden sm:block">
          https://drive.google.com/file/d/1StjzLcUB5NjjL4nnh82zyENSeE1O7aW-/view?usp=sharing
        </h4>
        <div className="flex justify-center gap-4">
          <input
            className=" border text-sm ring-2 rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 border-gray-600 placeholder-white text-white mt-4 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-700 "
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
            className="active:outline-none focus:outline-none p-2.5 text-sm bg-gray-900"
            type="text"
            value={outputLink}
            disabled={true}
          />

          <button type="button" className="" onClick={copyText}>
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
          className={
            outputLink !== ""
              ? "sm:mx-36 mt-4 px-2 py-1 border border-transparent shadow-sm text-base font-medium rounded-md  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              : "hidden"
          }
          type="button"
          onClick={clearAllState}
        >
          Clear
        </button>
      </div>
      <div className="h-screen"></div>
    </div>
  );
}
