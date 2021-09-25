import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_DATA = [
    {
        id: 'p1',
        price: 7,
        title: 'My First Song',
        description: 'First song I ever wrote.',
    },
    {
        id: 'p2',
        price: 13,
        title: 'My Second Song',
        description: 'Second song I ever wrote.',
    },
];

const Products = (props) => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {DUMMY_DATA.map((product) => (
                    <ProductItem
                        id={product.id}
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Products;
