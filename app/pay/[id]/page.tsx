// components/Chat.js

import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@clerk/nextjs/server";
import {
  getallTransaction,
  getpayTransaction,
} from "@/lib/actions/transactionstatus";

import DashboardPay from "@/components/shared/dashboardPay";
type payProps = {
  params: {
    id: string;
  };
};
const Pay = async ({ params: { id } }: payProps) => {
  const trans = await getpayTransaction(id);
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  //const alltrans = await getallTransaction(userId);
  const userName = sessionClaims?.userName as string;
  //  const userEmail = sessionClaims?.userEmail as string;
  const userImage = sessionClaims?.userImage as string;
  const recipientUid = id;

  // console.log(alltrans);
  if (!trans) {
    return (
      <div className="flex-center h-screen w-full bg-[#ebf2f7] bg-dotted-pattern bg-cover bg-fixed bg-center">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 top-0 z-10 fixed w-full">
          <div className="p-3">
            <Navbar userstatus="User" userId={recipientUid || ""} />
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20">
          <div className="flex gap-1 items-center">
            <img
              src="/assets/icons/loading.gif"
              alt="edit"
              width={60}
              height={60}
            />
            Loading...
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 fixed z-0 top-0 w-full">
        <div className="">
          <Navbar userstatus="User" userId={recipientUid || ""} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex mt-20 mb-0 p-1">
        <DashboardPay userId={userId} trans={trans} />
        <Toaster />
      </div>
    </>
  );
};

export default Pay;
