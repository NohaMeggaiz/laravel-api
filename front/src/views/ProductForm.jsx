import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        id: null,
        name: '',
        description: '',
        slug: '',
        price: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/products/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setProduct(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (product.id) {
            axiosClient.put(`/products/${product.id}`, product)
                .then(() => {
                    navigate('/products');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient.post('/products', product)
                .then(() => {
                    navigate('/products');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {product.id ? <h1>Update Product: {product.name}</h1> : <h1>New Product</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={product.name}
                            onChange={ev => setProduct({ ...product, name: ev.target.value })}
                            placeholder="Name"
                            required
                        />
                        <input
                            value={product.description}
                            onChange={ev => setProduct({ ...product, description: ev.target.value })}
                            placeholder="Description"
                            required
                        />
                        <input
                            value={product.slug}
                            onChange={ev => setProduct({ ...product, slug: ev.target.value })}
                            placeholder="Slug"
                            required
                        />
                        <input
                            type="number"
                            value={product.price}
                            onChange={ev => setProduct({ ...product, price: ev.target.value })}
                            placeholder="Price"
                            required
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
