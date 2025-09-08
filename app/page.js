"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation"

export default function Home() {

	const router = useRouter();

	const handleClick = () => {
		router.push("/dashboard")

	};
    return (
      <div className="flex justify-center w-screen items-center h-screen">
	  <div className="flex flex-col items-center gap-5">	  
	    <div>
              Created by - Tel Zac 
	    </div>
            <Button onClick={handleClick}>
	     Go to Dashboard 
	    </Button>
          </div>
     </div>
    );
}
