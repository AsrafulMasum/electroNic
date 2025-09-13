import { Layout } from "antd";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { SlSettings } from "react-icons/sl";
import { LuLayoutDashboard, LuUserCog } from "react-icons/lu";
import { IoIosNotifications, IoMdPaper } from "react-icons/io";
import { TbUsers } from "react-icons/tb";
import { LiaCertificateSolid, LiaHandHoldingUsdSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import {
  IoDocumentLockOutline,
  IoFootballOutline,
  IoImagesOutline,
} from "react-icons/io5";
import { RiAdminLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { GoQuestion } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import logo from "../../assets/logo.svg";
import { useProfileQuery } from "../../redux/features/authApi";
import { imageUrl } from "../../redux/api/baseApi";
import { useGetNotificationsQuery } from "../../redux/features/notificationApi";
import { io } from "socket.io-client";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data } = useProfileQuery();
  const user = data?.data;

  const { data: notificationData, refetch } = useGetNotificationsQuery();
  const unreadCount = useMemo(
    () => notificationData?.data?.unreadCount || 0,
    [notificationData]
  );

  const socket = useMemo(() => io(imageUrl), []);

  useEffect(() => {
    socket.on(`notification::${user?._id}`, (data) => {
      console.log(data);

      refetch();
    });
  }, [socket, user?._id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const src =
    user?.image && user?.image.startsWith("http")
      ? user?.image
      : user?.image
      ? `${imageUrl}${user?.image}`
      : "/default-avatar.jpg";

  const linkItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: (pathname) => (
        <LuLayoutDashboard
          className={`text-2xl ${
            pathname === "/" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Seller Lists",
      path: "/seller-lists",
      icon: (pathname) => (
        <LuUserCog
          className={`text-2xl ${
            pathname === "/seller-lists" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Customer Lists",
      path: "/customer-lists",
      icon: (pathname) => (
        <TbUsers
          className={`text-2xl ${
            pathname === "/customer-lists" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Order Details",
      path: "/order-details",
      icon: (pathname) => (
        <LiaHandHoldingUsdSolid
          className={`text-2xl ${
            pathname === "/order-details" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Seller Transactions",
      path: "/seller-transactions",
      icon: (pathname) => (
        <RiMoneyDollarCircleLine
          className={`text-2xl ${
            pathname === "/seller-transactions"
              ? "text-[#EEEEEE]"
              : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Products",
      path: "/products",
      icon: (pathname) => (
        <IoFootballOutline
          className={`text-2xl ${
            pathname === "/products" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Manage Admin",
      path: "/manage-admin",
      icon: (pathname) => (
        <RiAdminLine
          className={`text-2xl ${
            pathname === "/manage-admin" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Settings",
      path: "/settings",
      icon: (pathname) => (
        <SlSettings
          className={`text-2xl ${
            pathname === "/settings" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
      submenu: [
        {
          title: "App Slider",
          path: "/settings/app-slider",
          icon: (pathname) => (
            <IoImagesOutline
              className={`text-2xl ${
                pathname === "/settings/app-slider"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
        {
          title: "Add Category",
          path: "/settings/addCategory",
          icon: (pathname) => (
            <MdOutlineCategory
              className={`text-2xl ${
                pathname === "/settings/addCategory"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
        {
          title: "Add Brand",
          path: "/settings/brand-list",
          icon: (pathname) => (
            <LiaCertificateSolid
              className={`text-2xl ${
                pathname === "/settings/brand-list"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
        {
          title: "FAQ",
          path: "/settings/faq",
          icon: (pathname) => (
            <GoQuestion
              className={`text-2xl ${
                pathname === "/settings/faq"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
        {
          title: "About Us",
          path: "/settings/about-us",
          icon: (pathname) => (
            <BsExclamationCircle
              className={`text-2xl ${
                pathname === "/settings/about-us"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
        {
          title: "Work Functionalities",
          path: "/settings/work-functionalities",
          icon: (pathname) => (
            <IoDocumentLockOutline
              className={`text-2xl ${
                pathname === "/settings/work-functionalities"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
        {
          title: "Terms & Conditions",
          path: "/settings/terms-conditions",
          icon: (pathname) => (
            <IoMdPaper
              className={`text-2xl ${
                pathname === "/settings/terms-conditions"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
      ],
    },
  ];

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        width="300"
        style={{
          overflow: "auto",
          position: "fixed",
          top: "80px",
          bottom: "16px",
          height: "auto",
          paddingBottom: "60px",
          overflowX: "hidden",
          zIndex: 2,
          margin: "8px 8px 0 8px",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "90%",
            marginTop: 16,
          }}
        >
          {linkItems.map((item, index) => (
            <li key={index} style={{ width: "100%", position: "relative" }}>
              {item.submenu ? (
                // Menu item with submenu
                <div
                  onClick={() => setOpenSubMenu((prev) => !prev)}
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    color: "#A3A3A3",
                    gap: "8px",
                    padding: "10px 8px 10px 35px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ height: "24px" }}>{item.icon(pathname)}</div>
                    <div style={{ fontSize: "16px" }}>{item.title}</div>
                  </div>
                  <div style={{ marginRight: "20px" }}>
                    {openSubMenu ? (
                      <FiChevronUp className="text-[#A3A3A3]" />
                    ) : (
                      <FiChevronDown className="text-[#A3A3A3]" />
                    )}
                  </div>
                </div>
              ) : (
                // Normal link item
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    color: item.path === pathname ? "#EEEEEE" : "#A3A3A3",
                    alignItems: "center",
                    gap: "8px",
                    background: item.path === pathname ? "#09B782" : "none",
                    margin: "6px 10px 6px 10px",
                    padding: "8px 8px 8px 24px",
                    borderRadius: "20px",
                  }}
                >
                  <div style={{ height: "24px" }}>{item.icon(pathname)}</div>
                  <div style={{ fontSize: "16px" }}>{item.title}</div>
                </Link>
              )}

              {/* Submenu rendering */}
              {item.submenu && openSubMenu && (
                <ul style={{ marginLeft: "30px", marginTop: "4px" }}>
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subItem.path}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color:
                            subItem.path === pathname ? "#EEEEEE" : "#A3A3A3",
                          background:
                            subItem.path === pathname ? "#09B782" : "none",
                          margin: "8px 10px 8px 10px",
                          borderRadius: "20px",
                          padding: "8px 8px 8px 20px",
                          gap: "6px",
                          fontSize: "14px",
                        }}
                      >
                        <div style={{ height: "24px" }}>
                          {subItem.icon(pathname)}
                        </div>
                        <div>{subItem.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* dividers */}
              {/* {item.title === "User Lists" && (
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #19434C",
                    margin: "8px 0",
                  }}
                />
              )}
              {item.title === "Coupon" && (
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #19434C",
                    margin: "8px 0",
                  }}
                />
              )}
              {item.title === "Enrollment Fees" && (
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #19434C",
                    margin: "8px 0",
                  }}
                />
              )}
              {item.title === "Manage Admin" && (
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #19434C",
                    margin: "8px 0",
                  }}
                />
              )}
              {item.title === "Class Schedule" && (
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #19434C",
                    margin: "8px 0",
                  }}
                />
              )} */}
            </li>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 pl-8 py-3 w-full rounded-xl text-red-500 pb-10"
          >
            <CiLogout className="text-2xl" />
            <span>Log Out</span>
          </button>
        </ul>
      </Sider>

      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100%",
            height: "80px",
            zIndex: 1,
            padding: 0,
            backgroundColor: "#FFFFFF",
            display: "flex",
            justifyContent: "space-between",
            justifyItems: "center",
            paddingRight: "100px",
            paddingLeft: "69px",
          }}
        >
          <div className="flex justify-center items-center">
            <img src={logo} alt="logo" className="w-40" />
          </div>
          <div
            style={{
              width: "220px",
              display: "flex",
              alignItems: "center",
              gap: "40px",
              justifyContent: "space-between",
            }}
          >
            <Link to="/notification">
              <div
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <div className="p-2 bg-base rounded-full">
                  <IoIosNotifications className="text-3xl text-[#757575]" />
                </div>

                {!(unreadCount === 0) && (
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "#FFC107",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#121212",
                      position: "absolute",
                      top: 2,
                      right: 4,
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    {unreadCount}
                  </div>
                )}
              </div>
            </Link>
            <Link
              to={"/admin-profile"}
              style={{
                height: "42px",
                cursor: "pointer",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "10px",
              }}
            >
              <img
                src={src}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
                alt=""
              />
              <h2
                style={{
                  color: "#757575",
                  fontSize: "16px",
                  fontWeight: "500",
                  width: 200,
                  lineHeight: "24px",
                }}
              >
                {user?.name}
              </h2>
            </Link>
          </div>
        </Header>
        <Content
          style={{
            marginTop: "88px",
            marginBottom: "16px",
            marginLeft: "316px",
            marginRight: "16px",
            borderRadius: "8px",
            overflow: "auto",
            // backgroundColor: "#13333A",
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
