import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TopNav from "./topNav";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = "http://127.0.0.1:8000/api";

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/products`);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteClick = async (prod) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
  
    if (!token) {
      // Gérer le cas où le token n'est pas présent
      console.error("Token d'accès manquant. Veuillez vous connecter.");
      return;
    }
  
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }
  
    try {
      await axios.delete(`${baseUrl}/products/${prod.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
    }
  };
  

  return (
    <div>
      <TopNav/>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Products</h1>
        <Link className="btn-add" to="/products/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {products.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.description}</td>
                  <td>{u.price}</td>
                  <td>
                    <Link className="btn-edit" to={`/products/${u.id}`}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={() => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
