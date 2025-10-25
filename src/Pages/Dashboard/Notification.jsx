import { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Pagination } from "antd";
import toast from "react-hot-toast";
import {
  useGetNotificationsQuery,
  useReadNotificationMutation,
} from "../../redux/features/notificationApi";
import { CiBellOn } from "react-icons/ci";
import { useProfileQuery } from "../../redux/features/authApi";
import { io } from "socket.io-client";
import { imageUrl } from "../../redux/api/baseApi";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const { data: notificationData, refetch } = useGetNotificationsQuery(page);
  const [readNotification] = useReadNotificationMutation();

  const { data } = useProfileQuery();
  const user = data?.data;

  const handleRead = async () => {
    try {
      const { success, message } = await readNotification().unwrap();
      if (success) {
        toast.success(message);
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // const socket = useMemo(() => io(imageUrl), []);

  // useEffect(() => {
  //   socket.on(`notification::${user?._id}`, (data) => {
  //     console.log(data);

  //     refetch();
  //   });
  // }, [socket, user?._id]);

  return (
    <div className="h-full bg-white p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-[22px] text-[#FDFDFD]">All Notifications</h2>
        <button
          className="bg-green text-white h-10 px-4 rounded-md"
          onClick={handleRead}
        >
          Read All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {notificationData?.data?.notification?.map((notification, index) => (
          <div
            key={notification?._id}
            className={`p-3 rounded-lg flex items-center gap-3 ${
              notification?.read
                ? "bg-base border"
                : "bg-action border-none"
            }`}
          >
            <CiBellOn className="text-4xl bg-action text-[#000000] p-1.5 rounded-full" />
            <div className="text-[#757575]">
              <p className="text-lg">{notification?.body}</p>
              <p className="text-[#757575] mt-1">{notification?.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end mt-6">
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#FFC107",
                borderRadius: "100%",
                colorText: "white",
                colorTextDisabled: "#6C6C6C",
              },
            },
            token: {
              colorPrimary: "white",
            },
          }}
        >
          <Pagination
            current={page}
            total={notificationData?.pagination?.total}
            pageSize={7}
            showQuickJumper={false}
            showSizeChanger={false}
            onChange={(page) => setPage(page)}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Notifications;
