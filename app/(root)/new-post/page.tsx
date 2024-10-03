import NewPostForm from "@/components/forms/NewPostForm";
import { getUser } from "@/hooks/useUser";

const NewPostPage = async () => {
  const user = await getUser();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <NewPostForm username={user.username!} />
    </div>
  );
};

export default NewPostPage;
