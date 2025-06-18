import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PackageCheck,UserPlus,ShoppingBag,XCircle,LayoutDashboard,ClipboardList,Store,User,LogOut,
} from "lucide-react";
import "../styles/Orders.css";

const Orders = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [orderSearch, setOrderSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2;
  const navigate = useNavigate();

  const orders = [
    { id: 101, number: 2023001, status: "New", price: 200 },
    { id: 102, number: 2023002, status: "Inproduction", price: 50 },
    { id: 103, number: 2023003, status: "Shipped", price: 150 },
    { id: 104, number: 2023004, status: "Cancelled", price: 500 },
    { id: 105, number: 2023005, status: "New", price: 300 },
    { id: 106, number: 2023006, status: "Inproduction", price: 550 },
    { id: 107, number: 2023007, status: "Shipped", price: 220 },
    { id: 108, number: 2023008, status: "Cancelled", price: 120 },
  ];

  const listings = [
    { id: 1, product: "T‑shirt", price: 1500, stock: 120 },
    { id: 2, product: "Jeans", price: 4000, stock: 45 },
    { id: 3, product: "Jacket", price: 6000, stock: 20 },
    { id: 4, product: "Cap", price: 1000, stock: 75 },
  ];

  const users = [
    { id: 1, name: "Alice", role: "Admin", status: "Active" },
    { id: 2, name: "Bob", role: "Moderator", status: "Suspended" },
    { id: 3, name: "Charlie", role: "Editor", status: "Active" },
  ];

  const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

  const handleLogout = () => {
    alert("Logging out…");
    localStorage.setItem("isLoggedIn", "false");
    setTimeout(() => navigate("/"), 100);
  };

  const filteredOrders = orders.filter((o) => {
    const matchSearch = o.number.toString().includes(orderSearch);
    const matchPrice =
      priceFilter === "all"
        ? true
        : priceFilter === "lt200"
        ? o.price < 200
        : o.price > 200;
    return matchSearch && matchPrice;
  });

  const indexLast = currentPage * ordersPerPage;
  const indexFirst = indexLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const iconMap = {
    dashboard: <LayoutDashboard size={20} />,
    order: <ClipboardList size={20} />,
    listing: <Store size={20} />,
    admin: <User size={20} />,
  };
  return (
    <div className="container">
      <div className="sidebar">
        <div>
          <div className="sidebar-header">
            <img src="/Vector.png" alt="Logo" className="logo-icon" />
            <h2>UnloadIn</h2>
          </div>
          <div className="sidebar-menu">
            {Object.keys(iconMap).map((page) => (
              <div
                key={page}
                className={`menu-item ${activePage === page ? "active" : ""}`}
                onClick={() => {
                  setActivePage(page);
                  if (page === "order") setCurrentPage(1);
                }}
              >
                {iconMap[page]}
                <span>{capitalize(page)}</span>
              </div>
            ))}
          </div> </div>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar-circle">D</div>
            <div>
              <div className="username">Disha D</div>
              <div className="email">disha@gmail.com</div>
            </div>
            <LogOut size={18} className="logout-icon" onClick={handleLogout} />
          </div> </div> </div>
      <div className="main">
        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <>
            <h1 className="page-title">Dashboard</h1>
            <div className="dashboard-stats">
              <StatCard title="Total Orders" value={orders.length} />
              <StatCard title="Total Listings" value={listings.length} />
              <StatCard title="Total Users" value={users.length} />
              <StatCard title="Revenue" value="₹12,430" />
            </div>
            <div className="recent-activities">
              <h3 className="recent-title">Recent Activities</h3>
              <ul className="recent-list">
                <li>
                  <XCircle className="icon cancelled-icon" />{" "}
                  <strong>Order #2023004</strong>{" "}
                  was <span className="cancelled-text">cancelled</span>
                </li>
                <li>
                  <PackageCheck className="icon shipped-icon" />{" "}
                  <strong>Order #2023003</strong>{" "}
                  was <span className="shipped-text">shipped</span>
                </li>
                <li>
                  <UserPlus className="icon user-icon" /> <strong>New user</strong>{" "}
                  <span className="highlight">Charlie</span> added
                </li>
                <li>
                  <ShoppingBag className="icon listing-icon" />{" "}
                  <strong>New listing</strong> <span className="highlight">“Jacket”</span> added
                </li>
              </ul>
            </div>
          </>
        )}

        {/* ORDER */}
        {activePage === "order" && (
          <>
            <h1 className="page-title">Order Management</h1>

            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by Order #"
                value={orderSearch}
                onChange={(e) => {
                  setOrderSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <select
                value={priceFilter}
                onChange={(e) => {
                  setPriceFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Prices</option>
                <option value="lt200">Price &lt; 200</option>
                <option value="gt200">Price &gt; 200</option>
              </select> </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Number</th>
                  <th>Status</th>
                  <th>Price (₹)</th>
                </tr> </thead> <tbody>
                {currentOrders.map((o) => (
                  <tr key={o.id + "-" + o.number}>
                    <td>{o.id}</td>
                    <td>{o.number}</td>
                    <td>
                      <span className="status">{o.status}</span>
                    </td>
                    <td>{o.price}</td>
                  </tr>
                ))}
              </tbody> </table>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "active-page" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="footer-text">
              Showing {currentOrders.length} of {filteredOrders.length} orders
            </p>
          </>
        )}
        {/* LISTINGS */}
        {activePage === "listing" && (
          <>
            <h1 className="page-title">Product Listings</h1>
            <div className="search-bar">
              <input type="text" placeholder="Search product..." />
              <select>
                <option>All Categories</option>
                <option>Clothing</option>
                <option>Accessories</option>
              </select>
            </div>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.product}</td>
                    <td>₹{item.price}</td>
                    <td>{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="footer-text">
              Showing {listings.length} of {listings.length} listings
            </p>
          </>
        )}
        {/* ADMIN Part */}
        {activePage === "admin" && (
          <>
            <h1 className="page-title">Admin Dashboard</h1>
            <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
              <StatCard title="Total Users" value={users.length} />
              <StatCard
                title="Active Users"
                value={users.filter((u) => u.status === "Active").length}
              />
              <StatCard
                title="Suspended Users"
                value={users.filter((u) => u.status === "Suspended").length}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>
                      <span
                        className="status"
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          border: "1px solid #ccc",
                          padding: "4px 10px",
                          borderRadius: "6px",
                        }}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};
/* StatCard  */
const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

export default Orders;
