import Navbar from "@/components/shared/navbar";
import SettingsEdit from "@/components/shared/SettingsEdit";
import { getUserById } from "@/lib/actions/user.actions";
import { Toaster } from "@/components/ui/toaster";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { auth } from "@clerk/nextjs/server";
import Verification from "@/components/shared/Verification";
import Image from "next/image";
import BottomNavigation from "@/components/shared/BottomNavigation";
import Footersub from "@/components/shared/Footersub";
const Settings = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const user = await getUserById(userId);
  const isAdCreator = true;
  if (!user) {
    return (
      <div className="flex-center h-screen w-full bg-[#ebf2f7] bg-dotted-pattern bg-cover bg-fixed bg-center">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 top-0 z-10 fixed w-full">
          <div className="p-2">
            <Navbar userstatus="User" userId={userId || ""} />
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20">
          <div className="flex gap-1 items-center">
            <Image
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
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 z-10 top-0 fixed w-full">
        <div className="p-2">
          <Navbar userstatus="User" userId={userId} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto flex mt-20 p-1">
        <div className="hidden lg:inline mr-5"></div>

        <div className="flex-1">
          <div className="rounded-lg border bg-white max-w-6xl mx-auto lg:flex-row mt-0 p-1 justify-center">
            <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                About WheelMart.co.ke
              </h1>

              <div className="space-y-6 text-gray-700">
                <p className="text-lg">
                  Welcome to{" "}
                  <span className="font-semibold text-blue-600">
                    WheelMart.co.ke
                  </span>
                  , Kenya&apos;s premier online marketplace for buying and
                  selling vehicles. Whether you&apos;re in the market for a car,
                  motorbike, bus, pickup, or even heavy-duty and agricultural
                  machinery, we provide a trusted platform that connects buyers
                  and sellers across the country.
                </p>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Our Mission
                  </h2>
                  <p>
                    At WheelMart.co.ke, our mission is simple: to make the
                    process of buying and selling vehicles as seamless,
                    transparent, and secure as possible. We understand that
                    purchasing a vehicle is a significant investment, and our
                    goal is to create a safe and efficient environment where you
                    can find the perfect vehicle or sell your current one with
                    confidence.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Why Choose WheelMart.co.ke?
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-semibold">Wide Selection</span>:
                      From personal vehicles like cars and motorbikes to
                      commercial and specialized machinery, our platform offers
                      a diverse range of listings to meet your needs.
                    </li>
                    <li>
                      <span className="font-semibold">
                        User-Friendly Platform
                      </span>
                      : Our easy-to-use interface ensures that you can post
                      listings, search for vehicles, and connect with potential
                      buyers or sellers with just a few clicks.
                    </li>
                    <li>
                      <span className="font-semibold">Safe and Secure</span>: We
                      prioritize your safety by implementing strong security
                      measures and offering tips to help you avoid scams and
                      fraudulent activity. Our dedicated support team is always
                      ready to assist if any issues arise.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Direct Communication
                      </span>
                      : Buyers and sellers can communicate directly through
                      chat, email, or phone, making it easy to negotiate and
                      finalize transactions without unnecessary intermediaries.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Transparency and Trust
                      </span>
                      : We are committed to maintaining a transparent
                      marketplace where all listings are accurately represented.
                      We encourage honest communication and provide tools to
                      help verify information and build trust between users.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Our Story
                  </h2>
                  <p>
                    Founded with the vision of revolutionizing the vehicle sales
                    industry in Kenya, WheelMart.co.ke has rapidly grown to
                    become a trusted name in the market. Our team is passionate
                    about automotive technology and customer service, and we
                    work tirelessly to improve our platform and expand our
                    offerings.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Join Our Community
                  </h2>
                  <p>
                    Whether you&apos;re a seasoned car dealer, a first-time
                    buyer, or someone looking to sell your vehicle,
                    WheelMart.co.ke is here to help you every step of the way.
                    Join our growing community today and experience the
                    convenience and peace of mind that comes with using
                    Kenya&apos;s leading vehicle marketplace.
                  </p>
                  <p>
                    Thank you for choosing{" "}
                    <span className="font-semibold text-blue-600">
                      WheelMart.co.ke
                    </span>
                    . We look forward to helping you find your next vehicle or
                    connect with the perfect buyer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div>
          <Footersub />
        </div>
      </footer>
    </>
  );
};
export default Settings;
