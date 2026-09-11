
import { useState } from "react";
import "./App.css";

function App() {
  const [sales, setSales] = useState([
    {
      id: 9,
      customer_name: "Amit Singh",
      product_name: "Keyboard",
      quantity: 1,
      total_amount: 1500,
      sale_date: "2026-09-11",
    },
    {
      id: 8,
      customer_name: "Priya Patil",
      product_name: "Monitor",
      quantity: 2,
      total_amount: 24000,
      sale_date: "2026-09-08",
    },
    {
      id: 7,
      customer_name: "Amit Singh",
      product_name: "Laptop",
      quantity: 1,
      total_amount: 55000,
      sale_date: "2026-09-07",
    },
    {
      id: 6,
      customer_name: "Rahul Sharma",
      product_name: "Smartphone",
      quantity: 1,
      total_amount: 25000,
      sale_date: "2026-09-06",
    },
    {
      id: 5,
      customer_name: "Rohan More",
      product_name: "Monitor",
      quantity: 1,
      total_amount: 12000,
      sale_date: "2026-09-05",
    },
    {
      id: 4,
      customer_name: "Sneha Joshi",
      product_name: "Keyboard",
      quantity: 2,
      total_amount: 3000,
      sale_date: "2026-09-04",
    },
    {
      id: 3,
      customer_name: "Amit Singh",
      product_name: "Headphones",
      quantity: 3,
      total_amount: 7500,
      sale_date: "2026-09-03",
    },
    {
      id: 2,
      customer_name: "Priya Patil",
      product_name: "Smartphone",
      quantity: 2,
      total_amount: 50000,
      sale_date: "2026-09-02",
    },
    {
      id: 1,
      customer_name: "Rahul Sharma",
      product_name: "Laptop",
      quantity: 1,
      total_amount: 55000,
      sale_date: "2026-09-01",
    },
  ]);

  const customers = [
    { id: 1, name: "Rahul Sharma" },
    { id: 2, name: "Priya Patil" },
    { id: 3, name: "Amit Singh" },
    { id: 4, name: "Sneha Joshi" },
    { id: 5, name: "Rohan More" },
  ];

  const products = [
    { id: 1, product_name: "Laptop", price: 55000 },
    { id: 2, product_name: "Smartphone", price: 25000 },
    { id: 3, product_name: "Headphones", price: 2500 },
    { id: 4, product_name: "Keyboard", price: 1500 },
    { id: 5, product_name: "Monitor", price: 12000 },
  ];

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: 1,
    sale_date: "",
  });

  const totalSales = sales.reduce(
    (total, sale) => total + Number(sale.total_amount),
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const customer = customers.find(
      (c) => c.id === Number(formData.customer_id)
    );

    const product = products.find(
      (p) => p.id === Number(formData.product_id)
    );

    const quantity = Number(formData.quantity);
    const totalAmount = product.price * quantity;

    const newSale = {
      id: sales.length + 1,
      customer_name: customer.name,
      product_name: product.product_name,
      quantity: quantity,
      total_amount: totalAmount,
      sale_date: formData.sale_date,
    };

    setSales([newSale, ...sales]);

    setFormData({
      customer_id: "",
      product_id: "",
      quantity: 1,
      sale_date: "",
    });

    setShowForm(false);

    alert("Sale added successfully!");
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
              ₹{totalSales.toLocaleString()}
            </h2>
          </div>

          <div className="card">
            <h3>Total Orders</h3>
            <h2>{sales.length}</h2>
          </div>

          <div className="card">
            <h3>Total Customers</h3>
            <h2>{customers.length}</h2>
          </div>

          <div className="card">
            <h3>Total Products</h3>
            <h2>{products.length}</h2>
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

