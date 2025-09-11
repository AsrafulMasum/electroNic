import { FiUsers } from "react-icons/fi";
import { useStatisticsQuery } from "../../../redux/features/statisticsApi";
import { useState } from "react";
import { GrMoney } from "react-icons/gr";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { LuBox } from "react-icons/lu";
import EarningAreaChart from "./EarningAreaChart";
import OrdersBarChart from "./OrdersBarChart";
import UsersLineChart from "./UsersLineChart";
import TopSellingProducts from "./TopSellingProducts";
import TopSellers from "./TopSellers";

function DashboardHome() {
  const [userYear, setUserYear] = useState("");
  const [sellerYear, setSellerYear] = useState("");
  const [studentYear, setStudentYear] = useState("");

  const { data } = useStatisticsQuery({ userYear, sellerYear, studentYear });
  const overView = data?.data?.overView;

  const statistics = [
    {
      title: "Total Users",
      amount: [
        {
          customers: overView?.totalUsers,
          sellers: overView?.totalUsers,
        },
      ],
      icon: <FiUsers className="text-2xl text-[#EEEEEE]" />,
    },
    {
      title: "Total Products",
      amount: [
        {
          products: `$${overView?.totalSold?.toLocaleString()}`,
          quantity: `$${overView?.totalSold?.toLocaleString()}`,
        },
      ],
      icon: (
        <HiOutlineArchiveBoxArrowDown className="text-2xl text-[#EEEEEE]" />
      ),
    },
    {
      title: "Total Orders",
      amount: [
        {
          complete: overView?.totalOrder,
          pending: overView?.totalOrder,
        },
      ],
      icon: <LuBox className="text-2xl text-[#EEEEEE]" />,
    },
    {
      title: "Total Earnings",
      amount: [
        {
          sell: `$${overView?.totalEarning?.toLocaleString()}`,
          profit: `$${overView?.totalEarning?.toLocaleString()}`,
        },
      ],
      icon: <GrMoney className="text-2xl text-[#EEEEEE]" />,
    },
  ];

  return (
    <div className="flex flex-col bg-base">
      <div className="grid grid-cols-4 gap-2 max-h-[150px] mb-2">
        {statistics.map(({ title, amount, icon }) => (
          <div
            key={title}
            className={`rounded-lg py-4 px-5 gap-4 ${
              title === "Total Earnings" ? "bg-[#B3E9D8]" : "bg-white"
            }`}
          >
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="flex items-center gap-8">
                <div className="bg-green p-3 rounded-full">{icon}</div>
                <h2 className="text-lg text-[#757575] font-medium">{title}</h2>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p className="text-[#757575]">
                  {amount?.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      {Object.keys(item).map((key) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="font-medium text-[#757575] capitalize">
                            {key}:
                          </span>
                          <span className="text-[#333333]">{item[key]}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#FFFFFF] rounded-lg p-4">
        <EarningAreaChart
          setUserYear={setUserYear}
          userStats={data?.data?.userListByMonthsData}
        />
      </div>
      <div className="grid grid-cols-3 gap-x-2 mt-2">
        <TopSellingProducts />
        <div className="col-span-2">
          <OrdersBarChart
            setStudentYear={setStudentYear}
            studentStats={data?.data?.studentListByMonthsData}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-2 mt-2">
        <div className="col-span-2">
          <UsersLineChart
            setSellerYear={setSellerYear}
            sellingStats={data?.data?.orderListByMonthsData}
          />
        </div>
        <TopSellers />
      </div>
      {/* <div className="grid grid-cols-2 gap-x-2 mt-2">
        <UsersLineChart
          setSellerYear={setSellerYear}
          sellingStats={data?.data?.orderListByMonthsData}
        />
        <OrdersBarChart
          setStudentYear={setStudentYear}
          studentStats={data?.data?.studentListByMonthsData}
        />
      </div> */}
    </div>
  );
}

export default DashboardHome;
