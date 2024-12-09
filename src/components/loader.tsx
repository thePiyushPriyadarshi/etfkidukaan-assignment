import { Spinner } from "@chakra-ui/react";


const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">
      <Spinner />
    </div>
  );
};

export default Loader;
