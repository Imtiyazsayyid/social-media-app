import NewPostForm from "@/components/forms/NewPostForm";
import { useUser } from "@/hooks/useUser";

const NewPostPage = async () => {
  const user = await useUser();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <NewPostForm username={user.username!} />
    </div>
  );
};

export default NewPostPage;
