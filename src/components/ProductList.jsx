import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import { Typography } from 'antd';

export const ProductList = ({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
}) => {

    const [data, setData] = useState([]);

    const { Paragraph, Title } = Typography;

    const onAddProduct = product => {
        if (allProducts.find(item => item.id === product.id)) {
            toast.error('El producto ya fue agregado');
            return;
        } else {
            toast.success('Producto agregado');
        }
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + product.price * product.quantity);
            setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }
        setTotal(total + product.price * 1);
        setCountProducts(countProducts + 1);
        setAllProducts([...allProducts, product]);
    };

    const fetchData = () => {
        return axios.get("https://dummyjson.com/products")
            .then((response) => setData(response.data.products));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container-items'>
            {data.map(product => (
                <div className='item' key={product.id}>
                    <figure>
                        <img src={product.thumbnail} alt={product.brand} />
                    </figure>
                    <div className='info-product'>
                        <Title level={2}>{product.title}</Title>
                        <Title level={3}>${product.price}</Title>
                        <Paragraph>{product.description}</Paragraph>
                        <Button onClick={() => onAddProduct(product)} type="primary">
                            Agregar
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};