import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BiShare } from "react-icons/bi";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,

  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import copy from "clipboard-copy";
import toast from "react-hot-toast";
const ShareNews = ({ shareURL }: { shareURL: string | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleCopy = () => {
    copy(shareURL || "");
    closeModal();
    toast.success("Copy Successfully");
  };

  return (
    <>
      <div
        className="flex items-center gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200"
        onClick={openModal}
      >
        <BiShare className="text-[21px] text-gray-500 dark:text-gray-300" />
        <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
          Share
        </p>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="w-full max-w-md py-10 relative transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-center flex-col gap-4 items-center">
                    <div className="flex gap-3 items-center">
                      <div>
                        <FacebookShareButton url={shareURL || ""}>
                          <FacebookIcon size={35} round />
                        </FacebookShareButton>
                      </div>
                      <div>
                        <WhatsappShareButton url={shareURL ?? ""}>
                          <WhatsappIcon size={35} round />
                        </WhatsappShareButton>
                      </div>
                      <div>
                        <EmailShareButton url={shareURL || ""}>
                          <EmailIcon size={35} round />
                        </EmailShareButton>
                      </div>
                      <div>
                        <LinkedinShareButton url={shareURL || ""}>
                          <LinkedinIcon size={35} round />
                        </LinkedinShareButton>
                      </div>
                      {/* <div>
                        <FacebookMessengerShareButton url={shareURL || ""} >
                          <FacebookIcon size={35} round />
                        </FacebookMessengerShareButton>
                      </div> */}
                      <div>
                        <TelegramShareButton url={shareURL || ""}>
                          <TelegramIcon size={35} round />
                        </TelegramShareButton>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="py-3 bg-[#f5f7f7] px-3  border-red-600 border dark:text-red-500 text-red-500 w-72 dark:border-red-600  outline-red-500 text-[12px] rounded-md">
                        {shareURL}
                      </div>
                      <div
                        className="bg-gray-400  text-white px-2 py-1 rounded-sm text-[10px] top-0 right-0 absolute cursor-pointer"
                        onClick={handleCopy}
                      >
                        Copy URL
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 absolute -top-3 right-1">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-sm border border-transparent bg-blue-100 px-3 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShareNews;
