
import { CategoryDto } from "../../models/category";
import { useState, useEffect } from "react";
import { getAllCategories } from "../../services/category";
import { Link } from "react-router-dom";
const CategoryPage = () => {
    // trong đay là viết script 
    const [categories, setCategories] = useState<CategoryDto[]>();
    console.log(categories);
    useEffect(() => {
        async function Text() {
            getAllCategories("Category").then((data) => {
                setCategories(data);
            });
        }
        Text();
    }, []);
    return (
        <>
            {/* trong đây là viết giao diện  */}
            <h1>Category Page</h1>
            {categories?.map((item) => {
                return (
                    <div key={item.id}>
                        <Link to={`${item.id}`}>{item.name}</Link>
                        <h1>{item.description}</h1>
                    </div>
                );
            })}
        </>
    );
};
export default CategoryPage;