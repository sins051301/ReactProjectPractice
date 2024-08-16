import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const itemList = [
  {
    title: "Test",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    title: "Test2",
    price: 4,
    description: "This is a second product - amazing!",
  },
  {
    title: "Test3",
    price: 7,
    description: " amazing??",
  },
];

function Products() {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <li>
          {itemList.map((item, index) => (
            <ProductItem
              key={index}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </li>
      </ul>
    </section>
  );
}

export default Products;
