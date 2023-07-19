"use client";

import React, { useState, Fragment } from "react";
import Link from "next/link";

import { notifications } from "@/utils/helper";
import { NotificationsProps } from "@/utils/type";

import { Popover, Transition } from "@headlessui/react";
import { FaBell } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
import classNames from "classnames";

const Navigation = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <div className="w-full h-max bg-blue-500 flex justify-between items-center">
      <div className="mx-max">
        <nav>
          <button
            className="text-gray-500 w-10 h-10 relative focus:outline-none bg-blue-500 rounded-md"
            onClick={() => setOpenNav((prev) => !prev)}
          >
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                className={classNames(
                  "block absolute h-0.5 w-6 transform transition duration-300 ease-in-out bg-white",
                  openNav ? "rotate-45" : "-translate-y-1.5"
                )}
              ></span>
              <span
                aria-hidden="true"
                className={classNames(
                  "block absolute h-0.5 w-4 transform transition duration-300 ease-in-out bg-white",
                  openNav ? "-rotate-45 !w-6" : "translate-y-1.5"
                )}
              ></span>
            </div>
          </button>
        </nav>
      </div>
      <div className="w-max">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="focus:outline-none">
                <div className="h-10 w-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-400 relative focus:outline-none">
                  <FaBell className="text-white text-xl" />
                  <span className="absolute top-0.5 right-1 text-2xl text-red-500">
                    <RxDotFilled />
                  </span>
                </div>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0 mt-3 w-max max-w-xs -translate-x-[90%] transform px-4 sm:px-0 lg:max-w-xl opacity-100 z-[1000]">
                  <div className="overflow-hidden rounded-lg shadow-lg opacity-100 w-max">
                    <div className="bg-gray-50 p-4 w-full border-b">
                      <span
                        // href="##"
                        className="flow-root rounded-md px-2 py-1 transition duration-150 ease-in-out"
                      >
                        <span className="flex items-center pb-1">
                          <span className="text-xs md:text-sm font-medium text-gray-900">
                            Notifications
                          </span>
                        </span>
                        <span className="block text-xs md:text-sm text-gray-500">
                          You have 3 notifications
                        </span>
                      </span>
                    </div>
                    <div className="relative grid gap-8 bg-white p-7 w-max z-[999]">
                      {notifications.map((item: NotificationsProps) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex h-8 w-8 items-center justify-center">
                            <item.icon
                              className="!text-gray-900 h-7 w-7"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-xs md:text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default Navigation;
