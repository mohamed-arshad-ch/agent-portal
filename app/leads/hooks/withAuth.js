import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (Component) => {
  return (props) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push("/");
      }
    }, []);

    if (!user) {
      return ( <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <p className="text-blue-500 text-lg font-medium">Loading...</p>
      </div>);
    }

    return <Component {...props} user={user} />;
  };
};

export default withAuth;
