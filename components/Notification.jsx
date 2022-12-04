import { OutlineCheckIcon, XMarkIcon } from "../lib/icons";

const Notification = ({notify, setNotify}) => {
//   let notify = true;
  return (
    <div
      className={`rounded-md bg-green-50 p-4 w-full group ${
        notify ? "flex" : "hidden"
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <OutlineCheckIcon
            fill="#4ade80"
            className="h-5 w-5"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
            Reset balance success! Your new wallet balance is 10,000.00 MYR.
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5 items-end">
            <button
            onClick={() => setNotify(true)}
              type="button"
              className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon
                className="h-5 w-5"
                aria-hidden="true"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
