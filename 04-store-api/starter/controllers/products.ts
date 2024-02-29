import Product from "../models/product";

const getAllProductsStatic = async (req, res) => {
  const Products = await Product.find({ featured: true });
  res.status(200).json({ Products, nbHits: Products.length });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject[featured] = featured === "true" ? true : false;
  }

  if (company) {
    queryObject[company] = company;
  }
  if (name) {
    queryObject[name] = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorsMap = {
      ">": `$gt`,
      ">=": `$gte`,
      "=": `$eq`,
      "<": `$lt`,
      "<=": `$lte`,
    };
    console.log(numericFilters);
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorsMap[match]}-`
    );
    console.log(filters);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  console.log(queryObject);
  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //Select
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const Products = await result;
  res.status(200).json({ Products, nbHits: Products.length });
};

export { getAllProducts, getAllProductsStatic };
