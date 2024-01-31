import { useParams } from "react-router-dom";
type ParamTypes = {
  id: string;
};
const NewsDetails = () => {
  const { id } = useParams<ParamTypes>();
  console.log(id);
  return (
    <div>
      <h1>News Details</h1>
    </div>
  );
};

export default NewsDetails;
