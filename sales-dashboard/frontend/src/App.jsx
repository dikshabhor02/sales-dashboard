import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [sales, setSales] = useState([]);

  const [dashboard, setDashboard] = useState({
    total_sales: 0,
    total_orders: 0,
    total_customers: 0,
    total_products: 0,
  });

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: 1,
    sale_date: "",
  });

  const fetchSales = () => {
    fetch("/api/sales.php")
      .then((response) => response.json())
      .then((data) => setSales(data))
      .catch((error) => console.error("SALES ERROR:", error));
  };

  const fetchDashboard = () => {
    fetch("/api/dashboard.php")
      .then((response) => response.json())
      .then((data) => setDashboard(data))
      .catch((error) => console.error("DASHBOARD ERROR:", error));
  };

  useEffect(() => {
    fetch("/api/customers.php")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("CUSTOMERS ERROR:", error));

    fetch("/api/products.php")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("PRODUCTS ERROR:", error));

    fetchSales();
    fetchDashboard();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/add_sale.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Sale added successfully!");

          setFormData({
            customer_id: "",
            product_id: "",
            quantity: 1,
            sale_date: "",
          });

          setShowForm(false);
          fetchSales();
          fetchDashboard();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("ADD SALE ERROR:", error);
        alert("Something went wrong!");
      });
  };

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>Sales Dashboard</h2>

        <nav>
          <a className="active">Dashboard</a>
          <a>Sales</a>
          <a>Customers</a>
          <a>Products</a>
        </nav>
      </aside>

      <main className="main-content">

        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your sales overview.</p>
          </div>

          <button
            className="add-button"
            onClick={() => setShowForm(true)}
          >
            + Add Sale
          </button>
        </header>

        {showForm && (
          <section className="form-section">
            <h2>Add New Sale</h2>

            <form onSubmit={handleSubmit}>

              <label>Customer</label>

              <select
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Customer</option>

                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>

              <label>Product</label>

              <select
                name="product_id"
                value={formData.product_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Product</option>

                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.product_name} - ₹{product.price}
                  </option>
                ))}
              </select>

              <label>Quantity</label>

              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
              />

              <label>Sale Date</label>

              <input
                type="date"
                name="sale_date"
                value={formData.sale_date}
                onChange={handleChange}
                required
              />

              <div className="form-buttons">

                <button type="submit" className="save-button">
                  Save Sale
                </button>

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

              </div>

            </form>
          </section>
        )}

        <section className="cards">

          <div className="card">
            <h3>Total Sales</h3>
            <h2>
              ₹{Number(dashboard.total_sales).toLocaleString()}
            </h2>
          </div>

          <div className="card">
            <h3>Total Orders</h3>
            <h2>{dashboard.total_orders}</h2>
          </div>

          <div className="card">
            <h3>Total Customers</h3>
            <h2>{dashboard.total_customers}</h2>
          </div>

          <div className="card">
            <h3>Total Products</h3>
            <h2>{dashboard.total_products}</h2>
          </div>

        </section>

        <section className="table-section">

          <h2>Recent Sales</h2>

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {sales.map((sale) => (
                <tr key={sale.id}>

                  <td>{sale.id}</td>
                  <td>{sale.customer_name}</td>
                  <td>{sale.product_name}</td>
                  <td>{sale.quantity}</td>

                  <td>
                    ₹{Number(sale.total_amount).toLocaleString()}
                  </td>

                  <td>{sale.sale_date}</td>

                </tr>
              ))}

            </tbody>

          </table>

        </section>

      </main>

    </div>
  );
}

export default App;