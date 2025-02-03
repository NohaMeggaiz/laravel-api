import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function products(){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        getProducts();
    }, [])

    const onDeleteClick = prod => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
          return
        }
        axiosClient.delete(`/products/${prod.id}`)
          .then(() => {
            getProducts()
          })
      }


    const getProducts = () => {
        setLoading(true)
        axiosClient.get('/products')
          .then(({ data }) => {
            setLoading(false)
            setProducts(data)
          })
          .catch(() => {
            setLoading(false)
          })
      }

    return(
        <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>products</h1>
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
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              {products.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.description}</td>
                  <td>{u.price}</td>

                  <td>
                    <Link className="btn-edit" to={'/products/' + u.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>
        </div>
      </div>
    )

}
