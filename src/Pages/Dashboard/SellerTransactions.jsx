import { useState } from "react";
import { ConfigProvider, Input, Table, Tabs } from "antd";
import { FiSearch } from "react-icons/fi";
import moment from "moment";

const { TabPane } = Tabs;

const CompletedData = [
  {
    key: "1",
    orderId: "ORD-1001",
    sellerName: "Tech World",
    productsName: "Wireless Mouse",
    deliveryDate: "2025-09-01",
    createdAt: "2025-09-01T10:20:00Z",
    purchasePrice: 500,
    sellPrice: 700,
    commission: 200,
  },
  {
    key: "2",
    orderId: "ORD-1002",
    sellerName: "Gadget Hub",
    productsName: "Bluetooth Headphones",
    deliveryDate: "2025-09-02",
    createdAt: "2025-09-02T14:45:00Z",
    purchasePrice: 1200,
    sellPrice: 1600,
    commission: 400,
  },
  {
    key: "3",
    orderId: "ORD-1003",
    sellerName: "Digital Store",
    productsName: "Gaming Keyboard",
    deliveryDate: "2025-09-03",
    createdAt: "2025-09-03T08:30:00Z",
    purchasePrice: 1500,
    sellPrice: 2000,
    commission: 500,
  },
  {
    key: "4",
    orderId: "ORD-1004",
    sellerName: "Smart Tech",
    productsName: "Smartwatch",
    deliveryDate: "2025-09-04",
    createdAt: "2025-09-04T12:15:00Z",
    purchasePrice: 2200,
    sellPrice: 2800,
    commission: 600,
  },
  {
    key: "5",
    orderId: "ORD-1005",
    sellerName: "ElectroMart",
    productsName: "Laptop Stand",
    deliveryDate: "2025-09-05",
    createdAt: "2025-09-05T17:40:00Z",
    purchasePrice: 800,
    sellPrice: 1100,
    commission: 300,
  },
  {
    key: "6",
    orderId: "ORD-1006",
    sellerName: "Tech World",
    productsName: "USB-C Charger",
    deliveryDate: "2025-09-06",
    createdAt: "2025-09-06T09:20:00Z",
    purchasePrice: 400,
    sellPrice: 600,
    commission: 200,
  },
  {
    key: "7",
    orderId: "ORD-1007",
    sellerName: "Gadget Hub",
    productsName: "Portable Speaker",
    deliveryDate: "2025-09-07",
    createdAt: "2025-09-07T15:00:00Z",
    purchasePrice: 1000,
    sellPrice: 1400,
    commission: 400,
  },
  {
    key: "8",
    orderId: "ORD-1008",
    sellerName: "Digital Store",
    productsName: "Mechanical Keyboard",
    deliveryDate: "2025-09-08",
    createdAt: "2025-09-08T10:00:00Z",
    purchasePrice: 1600,
    sellPrice: 2100,
    commission: 500,
  },
  {
    key: "9",
    orderId: "ORD-1009",
    sellerName: "Smart Tech",
    productsName: "Fitness Tracker",
    deliveryDate: "2025-09-09",
    createdAt: "2025-09-09T18:10:00Z",
    purchasePrice: 900,
    sellPrice: 1300,
    commission: 400,
  },
  {
    key: "10",
    orderId: "ORD-1010",
    sellerName: "ElectroMart",
    productsName: "Gaming Mousepad",
    deliveryDate: "2025-09-10",
    createdAt: "2025-09-10T11:50:00Z",
    purchasePrice: 300,
    sellPrice: 500,
    commission: 200,
  },
  {
    key: "11",
    orderId: "ORD-1011",
    sellerName: "Tech World",
    productsName: "External SSD",
    deliveryDate: "2025-09-11",
    createdAt: "2025-09-11T09:30:00Z",
    purchasePrice: 3500,
    sellPrice: 4200,
    commission: 700,
  },
  {
    key: "12",
    orderId: "ORD-1012",
    sellerName: "Gadget Hub",
    productsName: "4K Monitor",
    deliveryDate: "2025-09-12",
    createdAt: "2025-09-12T13:25:00Z",
    purchasePrice: 12000,
    sellPrice: 15000,
    commission: 3000,
  },
  {
    key: "13",
    orderId: "ORD-1013",
    sellerName: "Digital Store",
    productsName: "Graphics Tablet",
    deliveryDate: "2025-09-13",
    createdAt: "2025-09-13T15:45:00Z",
    purchasePrice: 4500,
    sellPrice: 5200,
    commission: 700,
  },
  {
    key: "14",
    orderId: "ORD-1014",
    sellerName: "Smart Tech",
    productsName: "VR Headset",
    deliveryDate: "2025-09-14",
    createdAt: "2025-09-14T08:15:00Z",
    purchasePrice: 8000,
    sellPrice: 9500,
    commission: 1500,
  },
  {
    key: "15",
    orderId: "ORD-1015",
    sellerName: "ElectroMart",
    productsName: "Gaming Chair",
    deliveryDate: "2025-09-15",
    createdAt: "2025-09-15T17:00:00Z",
    purchasePrice: 7000,
    sellPrice: 8500,
    commission: 1500,
  },
  {
    key: "16",
    orderId: "ORD-1016",
    sellerName: "Tech World",
    productsName: "Mechanical Pencil",
    deliveryDate: "2025-09-16",
    createdAt: "2025-09-16T12:20:00Z",
    purchasePrice: 200,
    sellPrice: 350,
    commission: 150,
  },
  {
    key: "17",
    orderId: "ORD-1017",
    sellerName: "Gadget Hub",
    productsName: "Smart Lamp",
    deliveryDate: "2025-09-17",
    createdAt: "2025-09-17T14:30:00Z",
    purchasePrice: 1500,
    sellPrice: 2000,
    commission: 500,
  },
  {
    key: "18",
    orderId: "ORD-1018",
    sellerName: "Digital Store",
    productsName: "Drone",
    deliveryDate: "2025-09-18",
    createdAt: "2025-09-18T10:10:00Z",
    purchasePrice: 10000,
    sellPrice: 12000,
    commission: 2000,
  },
  {
    key: "19",
    orderId: "ORD-1019",
    sellerName: "Smart Tech",
    productsName: "Projector",
    deliveryDate: "2025-09-19",
    createdAt: "2025-09-19T09:40:00Z",
    purchasePrice: 6000,
    sellPrice: 7500,
    commission: 1500,
  },
  {
    key: "20",
    orderId: "ORD-1020",
    sellerName: "ElectroMart",
    productsName: "Air Purifier",
    deliveryDate: "2025-09-20",
    createdAt: "2025-09-20T11:00:00Z",
    purchasePrice: 5000,
    sellPrice: 6500,
    commission: 1500,
  },
];

const returnedData = [
  {
    key: "1",
    orderId: "R-2001",
    sellerName: "Tech World",
    productsName: "Wireless Mouse",
    returnDate: "2025-09-01",
    createdAt: "2025-09-01T10:20:00Z",
    purchasePrice: 500,
    penaltyPrice: 50,
  },
  {
    key: "2",
    orderId: "R-2002",
    sellerName: "Gadget Hub",
    productsName: "Bluetooth Headphones",
    returnDate: "2025-09-02",
    createdAt: "2025-09-02T14:45:00Z",
    purchasePrice: 1200,
    penaltyPrice: 100,
  },
  {
    key: "3",
    orderId: "R-2003",
    sellerName: "Digital Store",
    productsName: "Gaming Keyboard",
    returnDate: "2025-09-03",
    createdAt: "2025-09-03T08:30:00Z",
    purchasePrice: 1500,
    penaltyPrice: 150,
  },
  {
    key: "4",
    orderId: "R-2004",
    sellerName: "Smart Tech",
    productsName: "Smartwatch",
    returnDate: "2025-09-04",
    createdAt: "2025-09-04T12:15:00Z",
    purchasePrice: 2200,
    penaltyPrice: 200,
  },
  {
    key: "5",
    orderId: "R-2005",
    sellerName: "ElectroMart",
    productsName: "Laptop Stand",
    returnDate: "2025-09-05",
    createdAt: "2025-09-05T17:40:00Z",
    purchasePrice: 800,
    penaltyPrice: 80,
  },
  {
    key: "6",
    orderId: "R-2006",
    sellerName: "Tech World",
    productsName: "USB-C Charger",
    returnDate: "2025-09-06",
    createdAt: "2025-09-06T09:20:00Z",
    purchasePrice: 400,
    penaltyPrice: 40,
  },
  {
    key: "7",
    orderId: "R-2007",
    sellerName: "Gadget Hub",
    productsName: "Portable Speaker",
    returnDate: "2025-09-07",
    createdAt: "2025-09-07T15:00:00Z",
    purchasePrice: 1000,
    penaltyPrice: 90,
  },
  {
    key: "8",
    orderId: "R-2008",
    sellerName: "Digital Store",
    productsName: "Mechanical Keyboard",
    returnDate: "2025-09-08",
    createdAt: "2025-09-08T10:00:00Z",
    purchasePrice: 1600,
    penaltyPrice: 120,
  },
  {
    key: "9",
    orderId: "R-2009",
    sellerName: "Smart Tech",
    productsName: "Fitness Tracker",
    returnDate: "2025-09-09",
    createdAt: "2025-09-09T18:10:00Z",
    purchasePrice: 900,
    penaltyPrice: 70,
  },
  {
    key: "10",
    orderId: "R-2010",
    sellerName: "ElectroMart",
    productsName: "Gaming Mousepad",
    returnDate: "2025-09-10",
    createdAt: "2025-09-10T11:50:00Z",
    purchasePrice: 300,
    penaltyPrice: 20,
  },
  {
    key: "11",
    orderId: "R-2011",
    sellerName: "Tech World",
    productsName: "External SSD",
    returnDate: "2025-09-11",
    createdAt: "2025-09-11T09:30:00Z",
    purchasePrice: 3500,
    penaltyPrice: 250,
  },
  {
    key: "12",
    orderId: "R-2012",
    sellerName: "Gadget Hub",
    productsName: "4K Monitor",
    returnDate: "2025-09-12",
    createdAt: "2025-09-12T13:25:00Z",
    purchasePrice: 12000,
    penaltyPrice: 800,
  },
  {
    key: "13",
    orderId: "R-2013",
    sellerName: "Digital Store",
    productsName: "Graphics Tablet",
    returnDate: "2025-09-13",
    createdAt: "2025-09-13T15:45:00Z",
    purchasePrice: 4500,
    penaltyPrice: 300,
  },
  {
    key: "14",
    orderId: "R-2014",
    sellerName: "Smart Tech",
    productsName: "VR Headset",
    returnDate: "2025-09-14",
    createdAt: "2025-09-14T08:15:00Z",
    purchasePrice: 8000,
    penaltyPrice: 600,
  },
  {
    key: "15",
    orderId: "R-2015",
    sellerName: "ElectroMart",
    productsName: "Gaming Chair",
    returnDate: "2025-09-15",
    createdAt: "2025-09-15T17:00:00Z",
    purchasePrice: 7000,
    penaltyPrice: 500,
  },
  {
    key: "16",
    orderId: "R-2016",
    sellerName: "Tech World",
    productsName: "Mechanical Pencil",
    returnDate: "2025-09-16",
    createdAt: "2025-09-16T12:20:00Z",
    purchasePrice: 200,
    penaltyPrice: 15,
  },
  {
    key: "17",
    orderId: "R-2017",
    sellerName: "Gadget Hub",
    productsName: "Smart Lamp",
    returnDate: "2025-09-17",
    createdAt: "2025-09-17T14:30:00Z",
    purchasePrice: 1500,
    penaltyPrice: 120,
  },
  {
    key: "18",
    orderId: "R-2018",
    sellerName: "Digital Store",
    productsName: "Drone",
    returnDate: "2025-09-18",
    createdAt: "2025-09-18T10:10:00Z",
    purchasePrice: 10000,
    penaltyPrice: 700,
  },
  {
    key: "19",
    orderId: "R-2019",
    sellerName: "Smart Tech",
    productsName: "Projector",
    returnDate: "2025-09-19",
    createdAt: "2025-09-19T09:40:00Z",
    purchasePrice: 6000,
    penaltyPrice: 400,
  },
  {
    key: "20",
    orderId: "R-2020",
    sellerName: "ElectroMart",
    productsName: "Air Purifier",
    returnDate: "2025-09-20",
    createdAt: "2025-09-20T11:00:00Z",
    purchasePrice: 5000,
    penaltyPrice: 350,
  },
];

const SellerTransactions = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("completed");

  const completedColumns = [
    {
      title: "Serial No.",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => (
        <span className="text-[#757575]">{index + 1}</span>
      ),
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Seller Name",
      dataIndex: "sellerName",
      key: "sellerName",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Products Name",
      dataIndex: "productsName",
      key: "productsName",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (_, record) => (
        <span style={{ color: "#757575" }}>
          {moment(record?.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Purchase Price",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Sell Price",
      dataIndex: "sellPrice",
      key: "sellPrice",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
  ];

  const returnedColumns = [
    {
      title: "Serial No.",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => (
        <span className="text-[#757575]">{index + 1}</span>
      ),
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Seller Name",
      dataIndex: "sellerName",
      key: "sellerName",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Products Name",
      dataIndex: "productsName",
      key: "productsName",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Return Date",
      dataIndex: "returnDate",
      key: "returnDate",
      render: (_, record) => (
        <span style={{ color: "#757575" }}>
          {moment(record?.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Purchase Price",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Penalty Price",
      dataIndex: "penaltyPrice",
      key: "penaltyPrice",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
  ];

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <div className="w-full h-full bg-white">
      <div
        style={{
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0px 16px",
            padding: "16px 0px",
          }}
        >
          <h3
            style={{
              color: "#757575",
              fontSize: 18,
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            Seller Transactions
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#13333A",
                },
              }}
            >
              <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key)}
                style={{ marginBottom: 0 }}
              >
                <TabPane tab="Completed Orders" key="completed" />
                <TabPane tab="Returned Orders" key="returned" />
              </Tabs>
            </ConfigProvider>
            <div
              style={{
                width: "350px",
                height: "40px",
                borderRadius: "8px",
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#13333A",
                  },
                }}
              >
                <Input
                  placeholder="Search..."
                  onChange={handleSearchChange}
                  prefix={<FiSearch size={14} color="#868FA0" />}
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: "14px",
                    backgroundColor: "#FAFAFA",
                  }}
                  size="middle"
                />
              </ConfigProvider>
            </div>
          </div>
        </div>

        <div className="relative h-full">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveBg: "#FFC107",
                  borderRadius: "100%",
                  colorText: "#757575",
                  colorTextDisabled: "#6C6C6C",
                },
                Table: {
                  rowHoverBg: "#FFFFFF",
                },
              },
              token: {
                colorPrimary: "#09B782",
              },
            }}
          >
            <Table
              size="small"
              rowKey="_id"
              columns={
                activeTab === "completed" ? completedColumns : returnedColumns
              }
              dataSource={
                activeTab === "completed" ? CompletedData : returnedData
              }
              // loading={isLoading}
              pagination={{
                total: 20,
                current: page,
                pageSize: 15,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default SellerTransactions;
