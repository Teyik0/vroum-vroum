const getCardById = async (id: string) => {
  const res = await fetch(`/api/cars/${id}`);
  const data = await res.json();
  return data;
};

const page = () => {
  return <div>page</div>;
};

export default page;
