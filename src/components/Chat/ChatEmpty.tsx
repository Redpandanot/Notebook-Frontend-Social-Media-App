export default function ChatEmpty() {
  return (
    <div className="flex flex-col h-[calc(100vh-90px)] m-auto border-2">
      <div className="hero min-h-0 flex-grow">
        <div className="hero-content text-center">
          <div className="w-full max-w-xl">
            <div className="card shadow-lg rounded-2xl">
              <div className="card-body p-8">
                <div className="mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mr-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 8h10M7 12h5m5 7-3-3H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h2 className="card-title text-2xl">
                    Thanks for trying Notebook 👋
                  </h2>
                </div>

                <p className="text-sm opacity-80 mb-4">
                  I appreciate you using this application. It’s still under
                  active development — features and UI may change as I improve
                  the experience.
                </p>

                <div className="alert alert-warning shadow-lg mb-4">
                  <div className=" flex flex-col items-center text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Important: messages are{" "}
                      <strong>not end-to-end encrypted</strong> at the moment.
                      Please avoid sharing sensitive personal or financial
                      information.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
